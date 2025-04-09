"use client";

import styles from "./RegisterButton.module.css";
import { useRouter } from "next/navigation";

export const RegisterButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/register");
  };

  return (
    <button className={styles.registerButton} onClick={handleClick}>
      Sign Up
    </button>
  );
};
