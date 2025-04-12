"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import styles from "./UserAvatar.module.css";
import { LogoutButton } from "@/components/auth/LogoutButton/LogoutButton";

interface UserAvatarProps {
  imageUrl?: string | null;
  userName?: string;
}

export const UserAvatar = ({ imageUrl, userName }: UserAvatarProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className={styles.container} ref={ref}>
      <button
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={userName ? `${userName} avatar` : "User avatar"}
            width={32}
            height={32}
            className={styles.avatar}
          />
        ) : (
          <FaUserCircle className={styles.fallbackIcon} />
        )}
      </button>

      {open && (
        <ul className={styles.dropdown} role="menu">
          <li role="none" className={styles.item}>
            <Link href="/dashboard" role="menuitem">
              Dashboard
            </Link>
          </li>
          <li role="none" className={styles.item}>
            <LogoutButton />
          </li>
        </ul>
      )}
    </div>
  );
};
