"use client"

import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

type AuthFormBtnProps = {
  type: "login" | "signup";
};

export default function AuthFormBtn({ type }: AuthFormBtnProps) {

    const {pending} = useFormStatus()

  return (
    <Button disabled={pending} className="capitalize">
      {type === "login" ? "Log in" : "Sign up"}
    </Button>
  );
}
