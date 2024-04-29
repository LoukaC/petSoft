"use client";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function AccessAppBtn() {
  const { data: session, update, status } = useSession();
  const router = useRouter();

  return (
    <Button
      disabled={status === "loading" || session?.user.hasAccess}
      onClick={async () => {
        await update(true); // update session with hasAccess: true new web token
        router.push("/app/dashboard"); // redirect to dashboard
      }}
    >
      Access PetSoft
    </Button>
  );
}
