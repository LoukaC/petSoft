"use client";

import { Pet } from "@/lib/types";
import React, { createContext, useState } from "react";

type PetContextProviderProps = {
  children: React.ReactNode;
  data: Pet[];
};

type TPetContext = {
  pets: Pet[];
  selectedPet: String | null; // id of the selected pet
};

// Create a context
export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  children,
  data,
}: PetContextProviderProps) {
  // State to follow
  const [pets, setPets] = useState(data);
  const [selectedPet, setSelectedPet] = useState(null);

  return (
    // Provide the context and the values
    <PetContext.Provider value={{ pets, selectedPet }}>
      {children}
    </PetContext.Provider>
  );
}
