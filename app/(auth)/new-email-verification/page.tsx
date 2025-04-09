import styles from "./page.module.css";
import { NewEmailVerificationForm } from "@/components/auth/NewEmailVerificationForm/NewEmailVerificationForm";

const NewEmailVerificationPage = () => {
  return (
    <div className={styles.page}>
      <NewEmailVerificationForm />
    </div>
  );
};

export default NewEmailVerificationPage;
