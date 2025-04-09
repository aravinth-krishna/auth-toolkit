"use client";

import * as z from "zod";
import { settings } from "@/actions/settings";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { SettingsSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { BsCheckCircle, BsExclamationTriangle } from "react-icons/bs";
import { Role } from "@prisma/client";

const SettingsPage = () => {
  const user = useCurrentUser();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
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
    <div>
      <h2>Settings</h2>
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
        {user?.isOAuth === false && (
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
          <select
            id="role"
            disabled={isPending}
            defaultValue={user?.role || Role.USER}
            {...form.register("role")}
          >
            <option value={Role.USER}>USER</option>
            <option value={Role.ADMIN}>ADMIN</option>
          </select>

          {form.formState.errors.role && (
            <p>{form.formState.errors.role.message}</p>
          )}
        </div>
        {user?.isOAuth === false && (
          <div>
            <label htmlFor="isTwoFactorAuthEnabled">
              <input
                id="isTwoFactorAuthEnabled"
                disabled={isPending}
                defaultChecked={user?.twoFactorAuthEnabled}
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
        <button type="submit" disabled={isPending}>
          Save
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
