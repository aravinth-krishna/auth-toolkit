"use server";

import * as z from "zod";

import { signIn } from "@/auth";

import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

import {
  generateTwoFactorAuthToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendTwoFactorAuthTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { getTwoFactorAuthTokenByEmail } from "@/data/two-factor-auth-token";
import { prisma } from "@/lib/prisma";
import { getTwoFactorAuthConfirmationByUserId } from "@/data/two-factor-auth-confirmation";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, two_factor_code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return {
      success: "verification Email sent",
    };
  }

  if (existingUser.twoFactorAuthEnabled && existingUser.email) {
    if (two_factor_code) {
      const twoFactorAuthToken = await getTwoFactorAuthTokenByEmail(
        existingUser.email
      );

      if (!twoFactorAuthToken) {
        return { error: "Invalid code" };
      }

      if (twoFactorAuthToken.token !== two_factor_code) {
        return { error: "Invalid code" };
      }

      const hasExpired = new Date(twoFactorAuthToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Code has expired" };
      }

      await prisma.twoFactorAuthToken.delete({
        where: { id: twoFactorAuthToken.id },
      });

      const existingConfirmation = await getTwoFactorAuthConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await prisma.twoFactorAuthConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await prisma.twoFactorAuthConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorAuthToken = await generateTwoFactorAuthToken(
        existingUser.email
      );

      await sendTwoFactorAuthTokenEmail(
        twoFactorAuthToken.email,
        twoFactorAuthToken.token
      );

      return { twoFactorAuth: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };

        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
};
