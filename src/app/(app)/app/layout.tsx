import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/backgound-pattern";
import { Toaster } from "@/components/ui/sonner";
import PetContextProvider from "@/contexts/pet-context-provider";
import SearchContextProvider from "@/contexts/search-context-provider";
import { checkAuth, getPetsByUserId } from "@/lib/server-utils";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // checkin authentification
  const session = await checkAuth();
  // geting pets data from prsima for the connected user
  const pets = await getPetsByUserId(session.user.id);

  return (
    <>
      <BackgroundPattern />
      <div className="flex flex-col max-w-[1050px] mx-auto px-4 min-h-screen">
        <AppHeader />

        <SearchContextProvider>
          <PetContextProvider data={pets}>{children}</PetContextProvider>
        </SearchContextProvider>

        <AppFooter />
      </div>

      <Toaster position="top-right" />
    </>
  );
}
