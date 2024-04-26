"use server";

import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { petFormSchema, petIdSchenma } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

// --- user actions  -----

export async function logIn(formData: FormData) {
  await signIn("credentials", formData);
}

export async function signUp(formData: FormData) {
  const hashedPassword = await bcrypt.hash(
    formData.get("password") as string,
    10
  );

  await prisma.user.create({
    data: {
      email: formData.get("email") as string,
      hashedPassword,
    },
  });

  // log in the user after sign up and generate a session with token
  await signIn("credentials", formData);
}

export async function logOut() {
  await signOut({
    redirectTo: "/",
  });
}

// --- pets actions  -----
export async function addPet(pet: unknown) {
  await sleep(1000);

  // validate the pet data in the server, because we can't trust the client/api (type unknown)
  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) {
    return {
      message: "Invalid pet data",
    };
  }

  try {
    // add a pet to database
    await prisma.pet.create({
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "Failed to add pet",
    };
  }

  // rerender the /app/layout to get the lastest data from database
  revalidatePath("/app", "layout");
}

export async function editPet(petId: unknown, newPetData: unknown) {
  await sleep(1000);

  const validatedPetId = petIdSchenma.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(newPetData);
  if (!validatedPetId.success || !validatedPet.success) {
    return {
      message: "Invalid pet data",
    };
  }

  try {
    await prisma.pet.update({
      where: { id: validatedPetId.data },
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "Failed to edit pet",
    };
  }

  // rerender the /app/layout to get the lastest data from database
  revalidatePath("/app", "layout");
}

export async function deletePet(petId: unknown) {
  await sleep(1000);

  const validatedPetId = petIdSchenma.safeParse(petId);
  if (!validatedPetId.success) {
    return {
      message: "Invalid pet data",
    };
  }

  try {
    await prisma.pet.delete({
      where: { id: validatedPetId.data },
    });
  } catch (error) {
    return {
      message: "Failed to delete pet",
    };
  }
  // rerender the /app/layout to get the latest data from the database
  revalidatePath("/app", "layout");
}
