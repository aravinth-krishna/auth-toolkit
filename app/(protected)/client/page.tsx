"use client";

import styles from "./page.module.css";
import { UserInfo } from "@/components/protected/UserInfo/UserInfo";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const ClientPage = () => {
  const user = useCurrentUser();

  if (!user) {
    return <div className={styles.page}>User not loaded yet</div>;
  }

  return (
    <div className={styles.page}>
      <UserInfo
        user={{
          name: user.name!,
          email: user.email!,
          role: user.role,
          twoFactorAuthEnabled: user.twoFactorAuthEnabled,
          isOAuth: user.isOAuth,
        }}
        label="Client component"
      />
    </div>
  );
};

export default ClientPage;
