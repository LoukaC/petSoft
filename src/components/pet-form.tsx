"use client";

import { usePetContext } from "@/lib/hooks";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Pet } from "@/lib/types";

type PetFormProps = {
  actionType: "add" | "edit";
  onSubmitForm: () => void;
};

export default function PetForm({ actionType, onSubmitForm }: PetFormProps) {
  const { handleAddPet } = usePetContext();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const petToAdd = {
      name: formData.get("name") as string,
      imageUrl:
        formData.get("imageUrl") as string ||
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      ownerName: formData.get("ownerName") as string,
      age: +(formData.get("age") as string), // convert the string for the form to a number to match the type Pet
      notes: formData.get("notes") as string,
    };

    handleAddPet(petToAdd)
    onSubmitForm()
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" name="name" required />
        </div>

        <div className="space-y-1">
          <Label htmlFor="ownerName" className="capitalize">
            Owner name
          </Label>
          <Input type="text" id="ownerName" name="ownerName" required/>
        </div>

        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input type="text" id="imageUrl" name="imageUrl" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input type="number" id="age" name="age" required/>
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" rows={3} name="notes" required/>
        </div>
      </div>

      <Button type="submit" className="mt-5 self-end">
        {actionType === "add" ? "Add pet" : "Edit pet"}
      </Button>
    </form>
  );
}
