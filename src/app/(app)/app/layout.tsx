import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/backgound-pattern";
import PetContextProvider from "@/contexts/pet-context-provider";
import { Pet } from "@/lib/types";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  // fetch pets data
  const resp = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets"
  );
  if (!resp.ok) {
    throw new Error("Failed to fetch pets");
  }
  const data: Pet[] = await resp.json();

  
  return (
    <>
      <BackgroundPattern />
      <div className="flex flex-col max-w-[1050px] mx-auto px-4 min-h-screen">
        <AppHeader />
        <PetContextProvider data={data} >{children}</PetContextProvider>
        <AppFooter />
      </div>
    </>
  );
}
