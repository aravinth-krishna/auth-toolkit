"use client";

import { logout } from "@/actions/logout";
import { IoMdExit } from "react-icons/io";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const handleClick = () => {
    logout();
  };

  return (
    <button onClick={handleClick}>
      <IoMdExit />
      {children}
    </button>
  );
};
