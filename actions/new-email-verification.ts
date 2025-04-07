"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/email-verification-token";
import { prisma } from "@/lib/prisma";

export const newEmailVerification = async (token: string) => {
  const exisitingToken = await getVerificationTokenByToken(token);

  if (!exisitingToken) {
    return { error: "Token does not exist" };
  }

  const hasExpired = new Date(exisitingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const exisitingUser = await getUserByEmail(exisitingToken.email);

  if (!exisitingUser) {
    return { error: "Email does not exist" };
  }

  await prisma.user.update({
    where: {
      id: exisitingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: exisitingToken.email,
    },
  });

  await prisma.verificationToken.delete({
    where: {
      id: exisitingToken.id,
    },
  });

  return { success: "Email verified successfully" };
};
