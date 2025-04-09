"use client";

import styles from "./ResetPasswordForm.module.css";
import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema } from "@/schemas";
import { BsExclamationTriangle } from "react-icons/bs";
import { BsCheckCircle } from "react-icons/bs";
import { resetPassword } from "@/actions/reset-password";
import { BackToLoginButton } from "@/components/auth/BackToLoginButton/BackToLoginButton";

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
    <div className={styles.resetPasswordForm}>
      <h1>Forgot your password?</h1>
      <p>Verify your email and reset password</p>

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
            <span>{form.formState.errors.email.message}</span>
          )}
        </div>

        {error ? (
          <span className={styles.error}>
            <BsExclamationTriangle size={16} /> {error}
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

        <button
          className={styles.resetButton}
          disabled={isPending}
          type="submit"
        >
          Send reset email
        </button>
      </form>

      <BackToLoginButton />
    </div>
  );
};
