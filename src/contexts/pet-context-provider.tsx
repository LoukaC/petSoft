"use client";

import { Pet } from "@/lib/types";
import React, { createContext, useState } from "react";

type PetContextProviderProps = {
  children: React.ReactNode;
  data: Pet[];
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: String | null; // id of the selected pet
  handleChangeSelectedPetId: (id: string) => void;
  selectedPet: Pet | undefined;
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

  //event handlers / actions
  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };

  return (
    // Provide the context and the values
    <PetContext.Provider
      value={{ pets, selectedPetId, handleChangeSelectedPetId, selectedPet }}
    >
      {children}
    </PetContext.Provider>
  );
}
