"use client";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import PetForm from "./pet-form";
import { useState } from "react";

type PetButtonProps = {
  children?: React.ReactNode;
  actionType: "add" | "edit" | "checkout";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

export default function PetButton({
  children,
  actionType,
  className,
  disabled,
  onClick,
}: PetButtonProps) {
  // state pour controller the opening of the Dialog
  const [isOpen, setIsOpen] = useState(false);

  if (actionType === "checkout") {
    return (
      <Button variant="secondary" onClick={onClick} disabled={disabled} >
        {children}
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {actionType === "add" ? (
          <Button size="icon" className={cn(className)}>
            <PlusIcon className="w-6 h-6" />
          </Button>
        ) : (
          <Button variant="secondary" className={cn(className)}>
            {children}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {actionType === "add" ? "Add a new pet" : "Edit pet details"}
          </DialogTitle>
        </DialogHeader>

        <PetForm
          actionType={actionType}
          onSubmitForm={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
