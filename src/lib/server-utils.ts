import "server-only"; // only import this module in server side
import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function checkAuth() {
  // check if user is logged in, authentification
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return session;
}
