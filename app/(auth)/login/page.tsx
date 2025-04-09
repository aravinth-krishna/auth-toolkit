import styles from "./page.module.css";
import { LoginForm } from "@/components/auth/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <div className={styles.page}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
