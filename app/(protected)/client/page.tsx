"use client";

import { UserInfo } from "@/components/protected/UserInfo/UserInfo";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const ClientPage = () => {
  const user = useCurrentUser();

  return (
    <div>
      <UserInfo user={user} label="Client component" />
    </div>
  );
};

export default ClientPage;
