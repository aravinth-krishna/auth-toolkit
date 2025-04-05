"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

const SALT_ROUNDS = 10;

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { name, email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use" };
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "Email sent" };
};
