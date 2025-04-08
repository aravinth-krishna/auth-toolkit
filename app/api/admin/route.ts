import { currentRole } from "@/lib/auth";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const role = await currentRole();

  if (role === Role.ADMIN) {
    return new NextResponse(null, { status: 200 });
  }

  return new NextResponse(null, { status: 403 });
}
