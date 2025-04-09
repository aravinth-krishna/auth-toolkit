import { RegisterForm } from "@/components/auth/RegisterForm/RegisterForm";
import styles from "./page.module.css";

const RegisterPage = () => {
  return (
    <div className={styles.page}>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
