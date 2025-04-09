"use client";

import styles from "./LoginButton.module.css";
import { useRouter } from "next/navigation";

export const LoginButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
  };

  return (
    <button className={styles.loginButton} onClick={handleClick}>
      Sign In
    </button>
  );
};
