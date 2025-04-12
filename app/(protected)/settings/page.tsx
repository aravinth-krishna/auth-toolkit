import styles from "./page.module.css";
import { SettingsForm } from "@/components/protected/SettingsForm/SettingsForm";
import { currentUser } from "@/lib/auth";

const SettingsPage = async () => {
  const user = await currentUser();

  if (!user) {
    return <div className={styles.page}>Not signed in</div>;
  }

  return (
    <div className={styles.page}>
      <h1>Settings</h1>
      <SettingsForm
        user={{
          name: user.name!,
          email: user.email!,
          role: user.role,
          twoFactorAuthEnabled: user.twoFactorAuthEnabled,
          isOAuth: user.isOAuth,
        }}
      />
    </div>
  );
};

export default SettingsPage;
