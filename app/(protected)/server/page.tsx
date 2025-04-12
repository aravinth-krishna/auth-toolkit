import styles from "./page.module.css";
import { UserInfo } from "@/components/protected/UserInfo/UserInfo";
import { currentUser } from "@/lib/auth";

const ServerPage = async () => {
  const user = await currentUser();

  return (
    <div className={styles.page}>
      <UserInfo user={user} label="Server component" />
    </div>
  );
};

export default ServerPage;
