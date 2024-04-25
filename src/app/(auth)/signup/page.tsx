import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <main>
      <H1 className="text-center mb-5"> Sign Up</H1>
      <AuthForm />
      <p className="mt-6 text-sm text-zinc-500">
        Already have an account yet? {""}
        <Link href="/login" className="font-medium underline">
          Log In
        </Link>
      </p>
    </main>
  );
}
