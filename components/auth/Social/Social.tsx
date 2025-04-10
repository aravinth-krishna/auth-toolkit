"use client";

import styles from "./Social.module.css";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const handleClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className={styles.socialLinks}>
      <button onClick={() => handleClick("google")}>
        <FcGoogle size={16} />
        <span>Sign In with Google</span>
      </button>
      <button onClick={() => handleClick("github")}>
        <FaGithub size={16} />
        <span>Sign In with GitHub</span>
      </button>
    </div>
  );
};
