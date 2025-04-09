import styles from "./page.module.css";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm/ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <div className={styles.page}>
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordPage;
