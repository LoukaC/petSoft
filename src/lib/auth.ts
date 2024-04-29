import NextAuth, { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./server-utils";
import { authSchema } from "./validation";

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

        // validate the object formDataObject with zod validation
        const validatedFormDataObject = authSchema.safeParse(credentials);
        if (!validatedFormDataObject.success) {
          return null;
        }

        // extract values
        const { email, password } = validatedFormDataObject.data;

        // get user from database by email
        const user = await getUserByEmail(email);

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

      if (isLoggedIn && isTryingToAccessApp && !auth?.user.hasAccess) {
        // if user is logged in and trying to access /app
        return Response.redirect(new URL("/payment", request.nextUrl));
      }
      if (isLoggedIn && isTryingToAccessApp && auth?.user.hasAccess) {
        // if user is logged in and trying to access /app
        return true;
      }

      if (isLoggedIn && !isTryingToAccessApp) {
        // if user is logged in and not trying to access /app

        if (
          request.nextUrl.pathname.includes("/login" || "/signup") &&
          !auth?.user.hasAccess
        ) {
          return Response.redirect(new URL("/payment", request.nextUrl));
        }

        return true;
      }

      if (!isLoggedIn && !isTryingToAccessApp) {
        // if user is not logged in and not trying to access /app
        return true;
      }

      return false;
    },
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        // type of token and user in next-auth.d.ts
        // only on login
        token.userId = user.id;
        token.email = user.email;
        token.hasAccess = user.hasAccess;
      }

      if (trigger === "update") {
        //(update session with hasAccess: true)
        // on every request
        const userFromDb = await getUserByEmail(token.email);
        if (userFromDb) {
          token.hasAccess = userFromDb.hasAccess;
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      // type of session in next-auth.d.ts
      session.user.id = token.userId;
      session.user.hasAccess = token.hasAccess;

      return session;
    },
  },
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
