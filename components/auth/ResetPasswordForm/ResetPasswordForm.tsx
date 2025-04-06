"use client";

import Link from "next/link";
import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema } from "@/schemas";
import { BsExclamationTriangle } from "react-icons/bs";
import { BsCheckCircle } from "react-icons/bs";
import { resetPassword } from "@/actions/reset-password";

export const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      resetPassword(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <div>
      <h2>Forgot your password?</h2>

      <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
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
          Send reset email
        </button>
      </form>

      <button>
        <Link href={"/login"}>Back to Login</Link>
      </button>
    </div>
  );
};
