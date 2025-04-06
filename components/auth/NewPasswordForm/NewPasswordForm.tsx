"use client";

import Link from "next/link";
import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/schemas";
import { BsExclamationTriangle } from "react-icons/bs";
import { BsCheckCircle } from "react-icons/bs";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";

export const NewPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <div>
      <h2>Enter a new password</h2>

      <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
        <div>
          <label htmlFor="password">Enter new password</label>
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

        {error ? (
          <p>
            <BsExclamationTriangle /> {error}
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

        <button disabled={isPending} type="submit">
          Change password
        </button>
      </form>

      <button>
        <Link href={"/login"}>Back to Login</Link>
      </button>
    </div>
  );
};
