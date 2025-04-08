"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/RoleGate/RoleGate";
import { Role } from "@prisma/client";

const AdminPage = () => {
  const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        console.log("OK");
      } else {
        console.error("FORBIDDEN");
      }
    });
  };

  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.success) {
        console.log("OK");
      }

      if (data.error) {
        console.error("FORBIDDEN");
      }
    });
  };

  return (
    <div>
      <RoleGate allowedRole={Role.ADMIN}>
        <span>You are allowed to see this content</span>
      </RoleGate>
      <p>Admin only API route</p>
      <button onClick={onApiRouteClick}>Click to test</button>
      <p>Admin only Server Action</p>
      <button onClick={onServerActionClick}>Click to test</button>
    </div>
  );
};

export default AdminPage;
