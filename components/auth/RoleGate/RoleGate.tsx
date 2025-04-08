"use client";

import { useCurrentRole } from "@/hooks/useCurrentRole";
import { Role } from "@prisma/client";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: Role;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return <span>You do not have permission to view this content</span>;
  }

  return <>{children}</>;
};
