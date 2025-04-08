import { ExtendedUser } from "@/next-auth";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <div>
      <h2>{label}</h2>
      <div>
        <p>ID: {user?.id}</p>
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
        <p>Role: {user?.role}</p>
        <p>
          Two Factor Authentication: {user?.twoFactorAuthEnabled ? "ON" : "OFF"}
        </p>
      </div>
    </div>
  );
};
