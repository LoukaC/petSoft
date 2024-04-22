import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type PetFormbtnProps = {
  actionType: "add" | "edit";
};

export default function PetFormBtn({ actionType }: PetFormbtnProps) {
  // useFormStatus can be used beacue this component is in a form using server action
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="mt-5 self-end">
      {pending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
      ) : actionType === "add" ? (
        "Add pet"
      ) : (
        "Edit pet"
      )}
    </Button>
  );
}
