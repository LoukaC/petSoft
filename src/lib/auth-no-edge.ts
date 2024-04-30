import NextAuth, { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./server-utils";
import { authSchema } from "./validation";
import { nextAuthConfig } from "./auth-edge";

const config = {
  ...nextAuthConfig,
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
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
