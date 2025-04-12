"use client";

import * as z from "zod";
import { settings } from "@/actions/settings";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { SettingsSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BsCheckCircle, BsExclamationTriangle } from "react-icons/bs";
import { Role } from "@prisma/client";

export interface SettingsFormProps {
  user: {
    name: string;
    email: string;
    role: Role;
    twoFactorAuthEnabled: boolean;
    isOAuth: boolean;
  };
}

export const SettingsForm = ({ user }: SettingsFormProps) => {
  const { update } = useSession();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
      isTwoFactorAuthEnabled: user?.twoFactorAuthEnabled,
    },
  });

  const handleSubmit = (values: z.infer<typeof SettingsSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => {
          setError("Something went wrong");
        });
    });
  };

  return (
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

      {!user.isOAuth && (
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

          <div>
            <label htmlFor="newPassword">New password</label>
            <input
              id="newPassword"
              disabled={isPending}
              type="password"
              placeholder="******"
              {...form.register("newPassword")}
            />
            {form.formState.errors.newPassword && (
              <p>{form.formState.errors.newPassword.message}</p>
            )}
          </div>
        </>
      )}

      <div>
        <label htmlFor="role">Role</label>
        <select id="role" disabled={isPending} {...form.register("role")}>
          <option value={Role.USER}>USER</option>
          <option value={Role.ADMIN}>ADMIN</option>
        </select>
        {form.formState.errors.role && (
          <p>{form.formState.errors.role.message}</p>
        )}
      </div>

      {!user.isOAuth && (
        <div>
          <label htmlFor="isTwoFactorAuthEnabled">
            <input
              id="isTwoFactorAuthEnabled"
              disabled={isPending}
              type="checkbox"
              {...form.register("isTwoFactorAuthEnabled")}
            />
            Two Factor Authentication
          </label>
          {form.formState.errors.isTwoFactorAuthEnabled && (
            <p>{form.formState.errors.isTwoFactorAuthEnabled.message}</p>
          )}
        </div>
      )}

      {error && (
        <p>
          <BsExclamationTriangle /> {error}
        </p>
      )}
      {success && (
        <p>
          <BsCheckCircle /> {success}
        </p>
      )}

      <button type="submit" disabled={isPending}>
        Save
      </button>
    </form>
  );
};
