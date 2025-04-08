"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { LogoutButton } from "@/components/auth/LogoutButton/LogoutButton";
import { FaUser } from "react-icons/fa";
import Image from "next/image";

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <div>
      <ul>
        <li>
          {user?.image ? (
            <>
              <Image
                src={user.image}
                alt="User avatar"
                height={100}
                width={100}
              />
            </>
          ) : (
            <FaUser />
          )}
        </li>
        <li>
          <LogoutButton>Sign Out</LogoutButton>
        </li>
      </ul>
    </div>
  );
};
