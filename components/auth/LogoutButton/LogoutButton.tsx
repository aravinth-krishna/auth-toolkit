"use client";

import styles from "./LogoutButton.module.css";
import { logout } from "@/actions/logout";
import { IoMdExit } from "react-icons/io";

export const LogoutButton = () => {
  const handleClick = () => {
    logout();
  };

  return (
    <button className={styles.logoutButton} onClick={handleClick}>
      <IoMdExit />
      Sign Out
    </button>
  );
};
