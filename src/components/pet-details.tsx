"use client";

import Image from "next/image";
import { usePetContext } from "@/lib/hooks";
import { Pet } from "@/lib/types";
import PetButton from "./pet-button";
import { deletePet } from "@/actions/actions";

export default function PetDetails() {
  const { selectedPet } = usePetContext();

  return (
    <section className="flex flex-col h-full w-full">
      {
        // if slected pet undifined render an other component

        !selectedPet ? (
          <EmptyView />
        ) : (
          <>
            <Topbar pet={selectedPet} />
            <OtherInfo pet={selectedPet} />
            <PetNote pet={selectedPet} />
          </>
        )
      }
    </section>
  );
}

function EmptyView() {
  return (
    <p className=" h-full flex justify-center items-center text-2xl font-medium">
      No pet selected
    </p>
  );
}

type PetProps = {
  pet: Pet;
};

function Topbar({ pet }: PetProps) {
  const { handleDeletePet } = usePetContext();

  return (
    <div className="flex items-center justify-between py-5 px-8 bg-white border-b border-light">
      <div className="flex items-center gap-4">
        <Image
          src={pet?.imageUrl}
          alt={`image of pet ${pet?.name}`}
          width={75}
          height={75}
          className="w-[75px] h-[75px] rounded-full object-cover"
        />
        <h2 className="font-semibold text-3xl leading-7">{pet?.name}</h2>
      </div>

      <div className="space-x-2">
        <PetButton actionType="edit">Edit</PetButton>
        <PetButton
          actionType="checkout"
          onClick={async() => await deletePet(pet.id)}
        >
          Checkout
        </PetButton>
      </div>
    </div>
  );
}

function OtherInfo({ pet }: PetProps) {
  return (
    <div className="flex justify-around px-5 py-10 text-center">
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700 tracking-tighter">
          Owner name
        </h3>
        <p className="mt-1 text-lg text-zinc-800">{pet?.ownerName}</p>
      </div>

      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700 tracking-tighter">
          Age
        </h3>
        <p className="mt-1 text-lg text-zinc-800">{pet?.age}</p>
      </div>
    </div>
  );
}

function PetNote({ pet }: PetProps) {
  return (
    <section className="bg-white px-7 py-5 rounded-md mx-8 mb-5 flex-1 border border-light">
      {pet?.notes}
    </section>
  );
}
