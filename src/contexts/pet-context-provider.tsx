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

  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  }
  

  return (
    // Provide the context and the values
    <PetContext.Provider value={{ pets, selectedPetId, handleChangeSelectedPetId  }}>
      {children}
    </PetContext.Provider>
  );
}
