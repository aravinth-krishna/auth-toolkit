"use client";

import styles from "./RegisterForm.module.css";
import Link from "next/link";
import { Social } from "@/components/auth/Social/Social";
import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import { BsExclamationTriangle } from "react-icons/bs";
import { BsCheckCircle } from "react-icons/bs";
import { register } from "@/actions/register";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  type FormValues = z.infer<typeof RegisterSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register({
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      }).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <div className={styles.registerForm}>
      <h1>Create your Account</h1>
      <p>Enter your information below to create an account</p>

      <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            disabled={isPending}
            type="text"
            placeholder="John Doe"
            {...form.register("name")}
          />
          {form.formState.errors.name && (
            <span>{form.formState.errors.name.message}</span>
          )}
        </div>

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

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            disabled={isPending}
            type="password"
            placeholder="******"
            {...form.register("confirmPassword")}
          />
          {form.formState.errors.confirmPassword && (
            <span>{form.formState.errors.confirmPassword.message}</span>
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
          className={styles.registerButton}
          disabled={isPending}
          type="submit"
        >
          Register
        </button>
      </form>

      <div className={styles.separator}>
        <span>or</span>
      </div>

      <Social />

      <div className={styles.toLoginLink}>
        <span>
          Already have an Account? <Link href={"/login"}>Sign In</Link>
        </span>
      </div>
    </div>
  );
};
