"use client";
import { BeatLoader } from "react-spinners";

import styles from "./NewEmailVerificationForm.module.css";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newEmailVerification } from "@/actions/new-email-verification";
import { BsExclamationTriangle, BsCheckCircle } from "react-icons/bs";
import { BackToLoginButton } from "@/components/auth/BackToLoginButton/BackToLoginButton";

export const NewEmailVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = useCallback(() => {
    if (!token) {
      setError("Missing Token");
      return;
    }
    newEmailVerification(token)
      .then((data) => {
        setError(data.error);
        setSuccess(data.success);
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }, [token]);

  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);

  return (
    <div className={styles.newEmailVerificationForm}>
      <h1>Confirming your Email</h1>

      {!error && !success && (
        <div className={styles.loader}>
          <BeatLoader size={16} />
        </div>
      )}
      {error ? (
        <span className={styles.error}>
          <BsExclamationTriangle size={16} /> {error}
        </span>
      ) : (
        ""
      )}
      {success ? (
        <span className={styles.success}>
          <BsCheckCircle size={16} /> {success}
        </span>
      ) : (
        ""
      )}

      <BackToLoginButton />
    </div>
  );
};
