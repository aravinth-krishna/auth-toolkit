import styles from "./page.module.css";
import { ErrorCard } from "@/components/auth/ErrorCard/ErrorCard";

const ErrorPage = () => {
  return (
    <div className={styles.page}>
      <ErrorCard />
    </div>
  );
};

export default ErrorPage;
