import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type PetFormbtnProps = {
  actionType: "add" | "edit";
};

export default function PetFormBtn({ actionType }: PetFormbtnProps) {
  return (
    <Button type="submit" className="mt-5 self-end">
      {actionType === "add" ? "Add pet" : "Edit pet"}
    </Button>
  );
}
