import { Role } from "@prisma/client";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  two_factor_code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

const optionalStringMin6 = z.preprocess(
  (val) => {
    if (typeof val === "string" && val.trim() === "") return undefined;
    return val;
  },
  z.string().min(6, { message: "Minimum 6 characters required" }).optional()
);

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorAuthEnabled: z.optional(z.boolean()),
    role: z.enum([Role.ADMIN, Role.USER]),
    email: z.optional(z.string().email()),
    password: optionalStringMin6,
    newPassword: optionalStringMin6,
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required",
      path: ["password"],
    }
  );
