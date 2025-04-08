"use server";

import { currentRole } from "@/lib/auth";
import { Role } from "@prisma/client";

export const admin = async () => {
  const role = await currentRole();

  if (role === Role.ADMIN) {
    return { success: "allowed" };
  }

  return { error: "forbidden" };
};
