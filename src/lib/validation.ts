import { z } from "zod";
import { DEFAULT_PET_IMAGE } from "./constants";

export const petIdSchenma= z.string().cuid()

export const petFormSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Name is required" }),
    ownerName: z
      .string()
      .trim()
      .min(1, { message: "Owner name is required" })
      .max(100),
    imageUrl: z.union([
      // union is used to allow empty string or valid URL
      z.literal(""),
      z.string().url({ message: "Invalid URL" }),
    ]),
    age: z.coerce.number().int().positive({ message: "Invalid age" }).max(99), // coerce is used to convert string to number
    notes: z.union([z.literal(""), z.string().trim().max(1000)]),
  })
  .transform((data) => ({
    // transform is used to set default value for imageUrl
    ...data,
    imageUrl: data.imageUrl || DEFAULT_PET_IMAGE,
  }));


export type TPetFrom = z.infer<typeof petFormSchema>; // type of petFormSchema


export const authSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().max(100),
});

export type TAuth = z.infer<typeof authSchema>; // type of authSchema