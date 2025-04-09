import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import styles from "./BackToLoginButton.module.css";

export const BackToLoginButton = () => {
  return (
    <button className={styles.backButton}>
      <MdArrowBack size={16} />
      <Link href={"/login"}>Back to Login</Link>
    </button>
  );
};
