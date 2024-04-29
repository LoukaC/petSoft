import { User } from "next-auth";

declare module "@auth/core/jwt" {
  interface JWT {
    // token type
    userId: string;
    hasAccess: boolean;
  }
}

declare module "next-auth" {
  interface User {
    // user type
    hasAccess: boolean;
    email: string;
  }

  interface Session {
    // session type
    user: User & {
      id: string;
    };
  }
}
