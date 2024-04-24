"use client";

import { addPet, deletePet, editPet } from "@/actions/actions";
import { Pet } from "@/lib/types";
import { createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";

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
  handleDeletePet: (id: string) => Promise<void>;
  handleAddPet: (newpet: Omit<Pet, "id">) => Promise<void>; // omit the id, id is not given by the user when adding a pet
  handleEditPet: (petId: string, newPetData: Omit<Pet, "id">) => Promise<void>;
};

// Create a context
export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  children,
  data,
}: PetContextProviderProps) {
  // State to follow
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, newPet) => {
      return [
        ...state,
        {
          ...newPet,
          id: Math.random().toString(), // create id to map over the pets before database updating
        },
      ];
    }
  ); // optimistic instant UI update
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  //derived state
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const petsNumber = optimisticPets.length;

  //event handlers / actions
  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };
  //delete a pet
  const handleDeletePet = async (petId: string) => {
    await deletePet(petId);
    setSelectedPetId(null); // reset the selected pet
  };
  //add a pet
  const handleAddPet = async (newPet: Omit<Pet, "id">) => {
    setOptimisticPets(newPet); // optimistic update (add the new pet to the list of pets
    const error = await addPet(newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };
  //edit a pet
  const handleEditPet = async (petId: string, newPetData: Omit<Pet, "id">) => {
    const error = await editPet(petId, newPetData);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  return (
    // Provide the context and the values
    <PetContext.Provider
      value={{
        pets: optimisticPets,
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
