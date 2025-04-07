import { prisma } from "@/lib/prisma";

export const getTwoFactorAuthConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorAuthConfirmation =
      await prisma.twoFactorAuthConfirmation.findUnique({
        where: {
          userId,
        },
      });

    return twoFactorAuthConfirmation;
  } catch {
    return null;
  }
};
