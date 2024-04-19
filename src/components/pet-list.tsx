import Image from "next/image";
import { Pet } from "../lib/types";

type PetListProps = {
  pets: Pet[];
};


export default function PetList({pets}: PetListProps) {
  return (
    <ul className="bg-white border-b border-black/10">
      {
        // map over pets
        pets.map((pet) => (
          <li key={pet.id}>
            <button className="flex h-[70px] w-full cursor-pointer items-center gap-3 px-5 text-base hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition">
              <Image
                src={pet.imageUrl}
                alt={`image of ${pet.name}`}
                width={45}
                height={45}
                className="w-[45px] h-[45px] rounded-full object-cover"
              />
              <p className="font-semibold">{pet.name}</p>
            </button>
          </li>
        ))
      }
    </ul>
  );
}