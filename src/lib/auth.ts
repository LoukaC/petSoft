import NextAuth, { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import prisma from "./db";
import bcrypt from "bcryptjs";

const config = {
  pages: {
    signIn: "/login",
  },
  // session:{
  //     maxAge: 30 * 24 * 60 * 60, // duration of session in seconds (30 days)
  //     strategy: "jwt", // session management strategy jwt or database
  // },
  providers: [
    // email and password provider
    credentials({
      async authorize(credentials) {
        // run on login
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          console.log("no user found");
          return null;
        }

        const passwordMatched = await bcrypt.compare(
          password,
          user.hashedPassword
        );
        if (!passwordMatched) {
          console.log("invvalids credentials");
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth, request }) => {
      // run on every request with middleware

      const isLoggedIn = Boolean(auth?.user); // check if user is logged in
      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app"); // check if user is trying to access /app

      if (!isLoggedIn && isTryingToAccessApp) {// if user is not logged in and trying to access /app
        return false;
      }

      if (isLoggedIn && isTryingToAccessApp) {// if user is logged in and trying to access /app
        return true;
      }

      if (!isTryingToAccessApp) { // if user is not trying to access /app (landing, login signup pages)
        return true;
      }
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn } = NextAuth(config);
