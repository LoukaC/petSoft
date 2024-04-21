import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type PetFormProps = {
  actionType: "add" | "edit";
};

export default function PetForm({ actionType }: PetFormProps) {
  return (
    <form className="flex flex-col">
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="ownerName" className="capitalize">
            Owner name
          </Label>
          <Input type="text" id="ownerName" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input type="text" id="imageUrl" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input type="number" id="age" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" rows={3} />
        </div>
      </div>

      <Button type="submit" className="mt-5 self-end">
        {actionType === "add" ? "Add pet" : "Edit pet"}
      </Button>
    </form>
  );
}
