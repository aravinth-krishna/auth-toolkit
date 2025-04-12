"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserAvatar } from "@/components/protected/UserAvatar/UserAvatar";

export const Navbar = () => {
  const pathname = usePathname();
  const user = useCurrentUser();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        <button className={pathname === "/server" ? styles.current : ""}>
          <Link href={"/server"}>Server</Link>
        </button>
        <button className={pathname === "/client" ? styles.current : ""}>
          <Link href={"/client"}>Client</Link>
        </button>
        <button className={pathname === "/admin" ? styles.current : ""}>
          <Link href={"/admin"}>Admin</Link>
        </button>
        <button
          className={pathname === "/settings" ? styles.current : styles.default}
        >
          <Link href={"/settings"}>Settings</Link>
        </button>
      </div>
      <div>
        <UserAvatar
          imageUrl={user?.image ?? undefined}
          userName={user?.name ?? undefined}
        />
      </div>
    </nav>
  );
};
