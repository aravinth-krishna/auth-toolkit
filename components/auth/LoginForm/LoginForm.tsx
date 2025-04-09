"use client";

import styles from "./LoginForm.module.css";
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
      two_factor_code: "",
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
    <div className={styles.loginForm}>
      {!showTwoFactorAuth && (
        <>
          <h1>Sign In</h1>
          <p>Enter your email below to login to your account</p>
        </>
      )}

      {showTwoFactorAuth && (
        <>
          <h1>Two-Factor Authentication</h1>
          <p>
            Enter your two factor authentication code received in your email
          </p>
        </>
      )}

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
              <span>{form.formState.errors.two_factor_code.message}</span>
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
                <span>{form.formState.errors.email.message}</span>
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
                <span>{form.formState.errors.password.message}</span>
              )}
            </div>
          </>
        )}
        {error || urlError ? (
          <span className={styles.error}>
            <BsExclamationTriangle size={16} /> {error || urlError}
          </span>
        ) : (
          ""
        )}
        {success ? (
          <span className={styles.success}>
            <BsCheckCircle size={16} /> {success}
          </span>
        ) : (
          ""
        )}

        {!showTwoFactorAuth && (
          <Link href={"/reset-password"} className={styles.forgotPasswordLink}>
            Forgot password?
          </Link>
        )}

        <button
          className={styles.loginButton}
          disabled={isPending}
          type="submit"
        >
          {showTwoFactorAuth ? "Confirm" : "Login"}
        </button>
      </form>

      <div className={styles.separator}>
        <span>or</span>
      </div>

      <Social />

      <div className={styles.toRegisterLink}>
        <span>
          Don&apos;t have an Account? <Link href={"/register"}>Sign Up</Link>
        </span>
      </div>
    </div>
  );
};
