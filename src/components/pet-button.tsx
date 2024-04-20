import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type PetButtonProps = {
  children?: React.ReactNode;
  actionType: "add" | "edit" | "checkout";
  className?: string;
};

export default function PetButton({ children, actionType, className }: PetButtonProps) {
  if (actionType === "add") {
    return (
      <Button size="icon" className={cn(className)}>
        <PlusIcon className="w-6 h-6" />
      </Button>
    );
  }

  if (actionType === "edit") {
    return <Button variant="secondary">{children}</Button>;
  }

  if (actionType === "checkout") {
    return <Button variant="secondary">{children}</Button>;
  }
}
