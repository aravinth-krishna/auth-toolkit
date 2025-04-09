import styles from "./page.module.css";
import { NewPasswordForm } from "@/components/auth/NewPasswordForm/NewPasswordForm";

const NewPasswordPage = () => {
  return (
    <div className={styles.page}>
      <NewPasswordForm />
    </div>
  );
};

export default NewPasswordPage;
