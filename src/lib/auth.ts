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

      if (!isLoggedIn && isTryingToAccessApp) {
        // if user is not logged in and trying to access /app
        return false;
      }

      if (isLoggedIn && isTryingToAccessApp) {
        // if user is logged in and trying to access /app
        return true;
      }

      if (isLoggedIn && !isTryingToAccessApp) {
        // if user is logged in and not trying to access /app
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      }

      if (!isLoggedIn && !isTryingToAccessApp) {
        // if user is not logged in and not trying to access /app
        return true;
      }

      return false;
    },
    jwt: ({ token, user }) => {
      if (user) {
        // only on login
        token.userId = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.userId;

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth(config);
