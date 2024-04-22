"use client";

import { addPet } from "@/actions/actions";
import { Pet } from "@/lib/types";
import { createContext, useState } from "react";

type PetContextProviderProps = {
  children: React.ReactNode;
  data: Pet[];
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: String | null; // id of the selected pet
  selectedPet: Pet | undefined;
  petsNumber: number;
  handleChangeSelectedPetId: (id: string) => void;
  handleDeletePet: (id: string) => void;
  handleAddPet: (newpet: Omit<Pet, "id">) => void; // omit the id, id is not given by the user when adding a pet
  handleEditPet: (petId: string, newPetData: Omit<Pet, "id">) => void;
};

// Create a context
export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  children,
  data: pets,
}: PetContextProviderProps) {
  // State to follow
  
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  //derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const petsNumber = pets.length;

  //event handlers / actions
  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };
  //delete a pet
  const handleDeletePet = (id: string) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
    setSelectedPetId(null); // reset the selected pet
  };
  //add a pet
  const handleAddPet = async (newPet: Omit<Pet, "id">) => {
    // setPets((prev) => [
    //   ...prev,
    //   {
    //     ...newPet,
    //     id: Date.now().toString(), // add id to newPet added by the user
    //   },
    // ]);

    await addPet(newPet)
  };
  //edit a pet
  const handleEditPet = (petId: string, newPetData: Omit<Pet, "id">) => {
    setPets((prev) =>
      prev.map((pet) => (pet.id === petId ? { id: petId, ...newPetData } : pet))
    );
  };

  return (
    // Provide the context and the values
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        handleChangeSelectedPetId,
        selectedPet,
        petsNumber,
        handleDeletePet,
        handleAddPet,
        handleEditPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
