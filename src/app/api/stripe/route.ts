import prisma from "@/lib/db";

export async function POST(request: Request) {
  const data = await request.json();

  // verify webhook comes from stripe

  //fullfill the payment, update hasAccess
  await prisma.user.update({
    where: {
      email: data.data.object.customer_email,
    },
    data: {
      hasAccess: true,
    },
  });

  // return ok response
  return Response.json(null, { status: 200 });
}
