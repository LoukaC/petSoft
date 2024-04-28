"use server";

import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { authSchema, petFormSchema, petIdSchenma } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { checkAuth, getPetById } from "@/lib/server-utils";
import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";

// --- user actions  -----

export async function logIn(prevState: unknown, formData: unknown) {
  // prevState is working with useFormState, prevState can be the errors form the server

  await sleep(1000);

  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data.",
    };
  }

  try {
    // try to sign in the user with the credentials
    await signIn("credentials", formData);
  } catch (error) {
    // handle error if email or password is incorrect
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return {
            message: "Invalid credentials.",
          };
        }
        default: {
          return {
            message: "Error. Failed to log in.",
          };
        }
      }
    }

    throw error; // next.js redirects throws error, so need to rethrow it
  }
  redirect("/app/dashboard"); // not mandatory beacause next.js redirect in the try{}
}

export async function signUp(prevState: unknown, formData: unknown) {
  // prevState is working with useFormState, prevState can be the errors form the server

  await sleep(1000);

  //check if formData is FormData type
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }

  // convert formData to object
  const formDataEntries = Object.fromEntries(formData.entries());

  // validate the form data with zod
  const validatedFormData = authSchema.safeParse(formDataEntries);
  if (!validatedFormData.success) {
    return {
      message: "Invalid form data",
    };
  }

  const { email, password } = validatedFormData.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
  } catch (error) {
    // handle error if email already exists
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          message: "Email already exists",
        };
      }
    }

    return {
      message: "Failed to sign up",
    };
  }

  // log in the user after sign up and generate a session with token
  await signIn("credentials", formData);
}

export async function logOut() {
  await sleep(1000);

  await signOut({
    redirectTo: "/",
  });
}

// --- pets actions  -----
export async function addPet(pet: unknown) {
  await sleep(1000);

  // check if user is logged in, authentification
  const session = await checkAuth();

  // validate the pet data in the server, because we can't trust the client/api (type unknown) with zod
  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) {
    return {
      message: "invalid pet data",
    };
  }

  //database mutation
  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
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

  // check authentification
  const session = await checkAuth();

  // validation with zod
  const validatedPetId = petIdSchenma.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(newPetData);

  if (!validatedPetId.success || !validatedPet.success) {
    return {
      message: "Invalid pet data",
    };
  }

  // authorization
  const pet = await getPetById(validatedPetId.data);

  if (!pet) {
    return {
      message: "Pet not found",
    };
  }
  if (pet.userId !== session.user.id) {
    return {
      message: "Not authorized",
    };
  }

  // database mutation
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

  // check if user is logged in (authentication)
  const session = await checkAuth();

  // validate the pet id with zod
  const validatedPetId = petIdSchenma.safeParse(petId);
  if (!validatedPetId.success) {
    return {
      message: "Invalid pet data",
    };
  }

  // authorization check (user can only delete their own pets)
  const pet = await getPetById(validatedPetId.data);

  if (!pet) {
    return {
      message: "Pet not found",
    };
  }
  if (pet.userId !== session.user.id) {
    return {
      message: "Not authorized",
    };
  }

  // database mutation
  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
      },
    });
  } catch (error) {
    return {
      message: "Failed to delete pet",
    };
  }
  // rerender the /app/layout to get the latest data from the database
  revalidatePath("/app", "layout");
}
