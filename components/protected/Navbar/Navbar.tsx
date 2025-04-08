"use client";

import { UserButton } from "@/components/auth/UserButton/UserButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav>
      <div>
        <button
          style={
            pathname === "/server"
              ? { background: "black", color: "white" }
              : { background: "white", color: "black" }
          }
        >
          <Link href={"/server"}>Server</Link>
        </button>
        <button
          style={
            pathname === "/client"
              ? { background: "black", color: "white" }
              : { background: "white", color: "black" }
          }
        >
          <Link href={"/client"}>Client</Link>
        </button>
        <button
          style={
            pathname === "/admin"
              ? { background: "black", color: "white" }
              : { background: "white", color: "black" }
          }
        >
          <Link href={"/admin"}>Admin</Link>
        </button>
        <button
          style={
            pathname === "/settings"
              ? { background: "black", color: "white" }
              : { background: "white", color: "black" }
          }
        >
          <Link href={"/settings"}>Settings</Link>
        </button>
      </div>
      <UserButton />
    </nav>
  );
};
