"use client";
import { BeatLoader } from "react-spinners";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { BsExclamationTriangle, BsCheckCircle } from "react-icons/bs";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = useCallback(() => {
    if (!token) {
      setError("Missing Token");
      return;
    }
    newVerification(token)
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
    <div>
      <h2>Confirming your Email</h2>
      {!error && !success && <BeatLoader />}
      {error ? (
        <p>
          <BsExclamationTriangle /> {error}
        </p>
      ) : (
        ""
      )}
      {success ? (
        <p>
          <BsCheckCircle /> {success}
        </p>
      ) : (
        ""
      )}
      <Link href={"/login"}>Back to Login</Link>
    </div>
  );
};

export default NewVerificationForm;
