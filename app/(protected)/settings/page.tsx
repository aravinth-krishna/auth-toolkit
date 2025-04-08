"use client";

import { logout } from "@/actions/logout";
import { settings } from "@/actions/settings";
import { useSession } from "next-auth/react";
import { useTransition } from "react";

const SettingsPage = () => {
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      settings({
        name: "R. Aravinth Krishna",
      }).then(() => {
        update();
      });
    });
  };

  const handleClick = () => {
    logout();
  };

  return (
    <div>
      <h2>Settings</h2>
      <button onClick={onClick} disabled={isPending}>
        Update Name
      </button>
      <button onClick={handleClick}>Sign Out</button>
    </div>
  );
};

export default SettingsPage;
