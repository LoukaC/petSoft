import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function page() {
  const session = await auth();
   if(!session?.user){
    redirect("/login")
   }

  return (
    <main>
      <H1 className="my-8 text-white">Your account</H1>

      <ContentBlock className="h-[500px] flex flex-col justify-center items-center gap-4">
        <p className="">Logged in as {session.user.email}</p>
        <Button>Log out</Button>
      </ContentBlock>
    </main>
  );
}
