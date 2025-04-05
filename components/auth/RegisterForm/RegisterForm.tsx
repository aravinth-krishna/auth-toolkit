"use client";

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

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <div>
      <h2>Create your Account</h2>

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
            <p>{form.formState.errors.name.message}</p>
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
          Register
        </button>
      </form>

      <Social />
      <span>
        Already have an Account? <Link href={"/login"}>Sign In</Link>
      </span>
    </div>
  );
};
