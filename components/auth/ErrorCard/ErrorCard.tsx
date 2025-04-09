import styles from "./ErrorCard.module.css";
import { BackToLoginButton } from "@/components/auth/BackToLoginButton/BackToLoginButton";

export const ErrorCard = () => {
  return (
    <div className={styles.errorCard}>
      <h1>Something went wrong</h1>
      <p>Please try again or contact our support team</p>
      <BackToLoginButton />
    </div>
  );
};
