import { LoginButton } from "@/components/auth/LoginButton/LoginButton";
import { RegisterButton } from "@/components/auth/RegisterButton/RegisterButton";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Hello Auth!</h1>

      <div className={styles.authButtons}>
        <LoginButton />
        <RegisterButton />
      </div>
    </div>
  );
}
