import AccessAppBtn from "@/components/access-app-btn";
import CheckoutBtn from "@/components/checkout-btn";
import H1 from "@/components/h1";

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Page({ searchParams }: PageProps) {

  return (
    <main className="flex flex-col items-center space-y-10">
      <H1>PetSoft access requires payment</H1>

      {!searchParams.success && <CheckoutBtn />}
      {searchParams.success && (
        <>
          <AccessAppBtn />

          <p className="text-green-500 text-lg text-center ">
            Payment successful! <br />
            You now have lifetime access to PetSoft.
          </p>
        </>
      )}
      {searchParams.cancelled && (
        <p className="text-red-500 text-lg text-center ">
          Payment cancelled. <br />
          You can try again by clicking the button below.
        </p>
      )}
    </main>
  );
}
