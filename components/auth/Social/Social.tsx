"use client";

import styles from "./Social.module.css";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

type Mode = "login" | "register";

interface SocialProps {
  mode: Mode;
}

export const Social = ({ mode }: SocialProps) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const verb = mode === "login" ? "Sign In" : "Sign Up";

  const handleClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className={styles.socialLinks}>
      <button onClick={() => handleClick("google")}>
        <FcGoogle size={16} />
        <span>{verb} with Google</span>
      </button>
      <button onClick={() => handleClick("github")}>
        <FaGithub size={16} />
        <span>{verb} with GitHub</span>
      </button>
    </div>
  );
};
