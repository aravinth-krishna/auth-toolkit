import { getVerificationTokenByEmail } from "@/data/email-verification-token";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import crypto from "crypto";
import { getTwoFactorAuthTokenByEmail } from "@/data/two-factor-auth-token";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const exisitingToken = await getVerificationTokenByEmail(email);

  if (exisitingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: exisitingToken.id,
      },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateTwoFactorAuthToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getTwoFactorAuthTokenByEmail(email);

  if (existingToken) {
    await prisma.twoFactorAuthToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorAuthToken = await prisma.twoFactorAuthToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorAuthToken;
};
