"use client";

import Link from "next/link";
import { Social } from "@/components/auth/Social/Social";
import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { BsExclamationTriangle } from "react-icons/bs";
import { BsCheckCircle } from "react-icons/bs";
import { login } from "@/actions/login";
import { useSearchParams } from "next/navigation";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with a different provider"
      : "";

  const [showTwoFactorAuth, setShowTwoFactorAuth] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactorAuth) {
            setShowTwoFactorAuth(true);
          }
        })
        .catch(() => {
          setError("Something went wrong");
        });
    });
  };

  return (
    <div>
      <h2>Welcome Back!</h2>

      <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
        {showTwoFactorAuth && (
          <div>
            <label htmlFor="two_factor_code">2FA Code</label>
            <input
              id="two_factor_code"
              disabled={isPending}
              type="text"
              placeholder="123456"
              {...form.register("two_factor_code")}
            />
            {form.formState.errors.two_factor_code && (
              <p>{form.formState.errors.two_factor_code.message}</p>
            )}
          </div>
        )}

        {!showTwoFactorAuth && (
          <>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                disabled={isPending}
                type="email"
                placeholder="johndoe@example.com"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p>{form.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                disabled={isPending}
                type="password"
                placeholder="******"
                {...form.register("password")}
              />
              {form.formState.errors.password && (
                <p>{form.formState.errors.password.message}</p>
              )}
            </div>
          </>
        )}
        {error || urlError ? (
          <p>
            <BsExclamationTriangle /> {error || urlError}
          </p>
        ) : (
          ""
        )}
        {success ? (
          <p>
            <BsCheckCircle /> {success}
          </p>
        ) : (
          ""
        )}
        <button>
          <Link href={"/reset-password"}>Forgot password?</Link>
        </button>

        <button disabled={isPending} type="submit">
          {showTwoFactorAuth ? "Confirm" : "Login"}
        </button>
      </form>

      <Social />
      <span>
        Don&apos;t have an Account? <Link href={"/register"}>Sign Up</Link>
      </span>
    </div>
  );
};
