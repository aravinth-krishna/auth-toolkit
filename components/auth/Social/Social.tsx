"use client";

import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const handleClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div>
      <button onClick={() => handleClick("google")}>
        <FcGoogle />
      </button>
      <button onClick={() => handleClick("github")}>
        <FaGithub />
      </button>
    </div>
  );
};
