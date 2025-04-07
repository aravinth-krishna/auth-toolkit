import { prisma } from "@/lib/prisma";

export const getTwoFactorAuthTokenByEmail = async (email: string) => {
  try {
    const twoFactorAuthToken = await prisma.twoFactorAuthToken.findFirst({
      where: {
        email,
      },
    });

    return twoFactorAuthToken;
  } catch {
    return null;
  }
};

export const getTwoFactorAuthTokenByToken = async (token: string) => {
  try {
    const twoFactorAuthToken = await prisma.twoFactorAuthToken.findUnique({
      where: {
        token,
      },
    });

    return twoFactorAuthToken;
  } catch {
    return null;
  }
};
