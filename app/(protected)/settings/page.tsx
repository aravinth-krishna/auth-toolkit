"use client";

import { settings } from "@/actions/settings";
import { useSession } from "next-auth/react";
import { useTransition } from "react";

const SettingsPage = () => {
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      settings({
        name: "Infamous Blue Wire",
      }).then(() => {
        update();
      });
    });
  };

  return (
    <div>
      <h2>Settings</h2>
      <button onClick={onClick} disabled={isPending}>
        Update Name
      </button>
    </div>
  );
};

export default SettingsPage;
