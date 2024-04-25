import NextAuth, { NextAuthConfig } from "next-auth";

const config = {
  pages: {
    signIn: "/login",
  },
  // session:{
  //     maxAge: 30 * 24 * 60 * 60, // duration of session in seconds (30 days)
  //     strategy: "jwt", // session management strategy jwt or database
  // },
  providers: [],
  callbacks: {
    authorized: async ({ request }) => {
      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app"); // check if user is trying to access /app
      if (isTryingToAccessApp) {
        return false; // if user is trying to access /app, return false, redirect to /login
      } else {
        return true;
      }
    },
  },
} satisfies NextAuthConfig;

export const { auth } = NextAuth(config);
