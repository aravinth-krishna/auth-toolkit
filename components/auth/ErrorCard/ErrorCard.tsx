import Link from "next/link";

export const ErrorCard = () => {
  return (
    <div>
      <h2>Something went wrong</h2>
      <Link href="/login">Back to Login</Link>
    </div>
  );
};
