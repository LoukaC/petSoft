import SearchForm from "@/components/search-form";
import Branding from "@/components/branding";
import ContentBlock from "@/components/content-block";
import PetDetails from "@/components/pet-details";
import PetList from "@/components/pet-list";
import Stats from "@/components/stats";

export default function page() {
  return (
    <main>
      <div className="flex justify-between items-center py-8 text-white">
        <Branding />
        <Stats />
      </div>

      <div className="grid md:grid-cols-3 md:grid-rows-[45px_1fr] grid-rows-[45px_300px_500px] gap-4 md:h-[500px]">
        <div className="md:col-start-1 md:col-span-1 md:row-start-1 md:row-span-1">
          <SearchForm />
        </div>

        <div className="md:col-start-1 md:col-span-1 md:row-start-2 md:row-span-full">
          <ContentBlock>
            <PetList />
          </ContentBlock>
        </div>

        <div className="md:col-start-2 md:col-span-2 md:row-start-1 md:row-span-full">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
}
