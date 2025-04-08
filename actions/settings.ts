"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SettingsSchema } from "@/schemas";
import * as z from "zod";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  await prisma.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { success: "Settings Updated" };
};
