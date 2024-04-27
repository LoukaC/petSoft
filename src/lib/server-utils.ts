import "server-only"; // only import this module in server side
import { redirect } from "next/navigation";
import { auth } from "./auth";
import { Pet } from "@prisma/client";
import prisma from "./db";
import { User } from "next-auth";

export async function checkAuth() {
  // check if user is logged in, authentification
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return session;
}

export async function getUserByEmail(email: User["email"]) {
  // geting user data from prisma
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
}

export async function getPetById(petId: Pet["id"]) {
  // geting pet data from prisma
  const pet = await prisma.pet.findUnique({
    where: {
      id: petId,
    },
    select: {
      userId: true, // only get the userId from the database
    },
  });

  return pet;
}

export async function getPetsByUserId(userId: User["id"]) {
  // getting pets data from prisma for one user
  const pets = await prisma.pet.findMany({
    where: {
      userId,
    },
  });

  return pets;
}
