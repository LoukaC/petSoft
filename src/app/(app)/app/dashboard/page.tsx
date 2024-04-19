import SearchForm from "@/components/search-form";
import Branding from "@/components/branding";
import ContentBlock from "@/components/content-block";
import PetDetails from "@/components/pet-details";
import PetList from "@/components/pet-list";
import Stats from "@/components/stats";

export default async function page() {
  // fetch pets data
  const resp = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets"
  );
  if (!resp.ok) {
    throw new Error("Failed to fetch pets");
  }
  const data = await resp.json();

  console.log("pets:",data);

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
            <PetList pets={data} />
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
