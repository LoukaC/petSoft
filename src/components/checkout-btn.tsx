"use client";
import { createCheckoutSession } from "@/actions/actions";
import { Button } from "./ui/button";
import { useTransition } from "react";

export default function CheckoutBtn() {
  const [ispending, startTransition] = useTransition();

  return (
    <Button
      disabled={ispending}
      onClick={async () => {
        startTransition(async () => {
          await createCheckoutSession();
        });
      }}
    >
      Buy lifetime access for $299
    </Button>
  );
}
