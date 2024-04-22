import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// sleep function to mimic  1ec time fetching
export async function sleep(ms: number | 1000): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, ms));
}