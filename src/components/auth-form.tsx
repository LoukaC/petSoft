import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { logIn, signUp } from "@/actions/actions";

type typeProps = {
  type: "login" | "signup";
};

export default function AuthForm({ type }: typeProps) {
  return (
    <form action={type === "login" ? logIn : signUp}>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" />
      </div>

      <div className="mt-2 mb-4 space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" />
      </div>

      <Button className="capitalize">
        {type === "login" ? "Log in" : "Sign up"}
      </Button>
    </form>
  );
}
