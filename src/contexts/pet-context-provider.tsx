"use client";

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
  handleAddPet: (pet: Pet) => void;
};

// Create a context
export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  children,
  data,
}: PetContextProviderProps) {
  // State to follow
  const [pets, setPets] = useState(data);
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
  const handleAddPet = (newPet: Pet) => {
    setPets((prev) => [...prev, newPet]);
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
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
