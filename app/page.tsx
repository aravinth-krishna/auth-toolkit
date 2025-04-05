import { LoginButton } from "@/components/auth/LoginButton/LoginButton";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>Hello Auth!</h1>
      <LoginButton>
        <button>Sign In</button>
      </LoginButton>

      <button>Sign Up</button>
    </div>
  );
}
