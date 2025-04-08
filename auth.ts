import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

import authConfig from "@/auth.config";
import { getUserById } from "./data/user";
import { Role } from "@prisma/client";
import { getTwoFactorAuthConfirmationByUserId } from "@/data/two-factor-auth-confirmation";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }

      if (user.id) {
        const existingUser = await getUserById(user.id);

        if (!existingUser?.emailVerified) {
          return false;
        }

        if (existingUser.twoFactorAuthEnabled) {
          const twoFactorAuthConfirmation =
            await getTwoFactorAuthConfirmationByUserId(existingUser.id);

          if (!twoFactorAuthConfirmation) {
            return false;
          }

          await prisma.twoFactorAuthConfirmation.delete({
            where: { id: twoFactorAuthConfirmation.id },
          });
        }
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }

      if (session.user) {
        session.user.twoFactorAuthEnabled =
          token.twoFactorAuthEnabled as boolean;
      }

      if (session.user) {
        session.user.name = token.name as string;
      }

      if (session.user) {
        session.user.email = token.email as string;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.twoFactorAuthEnabled = existingUser.twoFactorAuthEnabled;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
