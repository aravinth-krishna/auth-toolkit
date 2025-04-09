"use client";

import styles from "./NewPasswordForm.module.css";
import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/schemas";
import { BsExclamationTriangle } from "react-icons/bs";
import { BsCheckCircle } from "react-icons/bs";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";
import { BackToLoginButton } from "@/components/auth/BackToLoginButton/BackToLoginButton";

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
    <div className={styles.newPasswordForm}>
      <h1>Enter a new password</h1>
      <p>Set a new strong password</p>

      <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
        <div>
          <label htmlFor="password">New password</label>
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
          className={styles.changePasswordButton}
          disabled={isPending}
          type="submit"
        >
          Change password
        </button>
      </form>

      <BackToLoginButton />
    </div>
  );
};
