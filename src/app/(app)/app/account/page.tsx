import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <main>
      <H1 className="my-8 text-white">Your account</H1>

      <ContentBlock className="h-[500px] flex flex-col justify-center items-center gap-4">
        <p className="">Logged in as mail@mail.com</p>
        <Button>Log out</Button>
      </ContentBlock>
    </main>
  );
}
