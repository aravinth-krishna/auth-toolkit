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
