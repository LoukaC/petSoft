import prisma from "@/lib/db";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  const data = await request.json();
  const stripeSignature = request.headers.get("Stripe-Signature");

  // verify webhook comes from stripe
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      data,
      stripeSignature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    // return error response
    return Response.json(null, { status: 400 });
  }

  //fullfill the payment, update hasAccess
  switch (event.type) {
    case "checkout.session.completed":
      await prisma.user.update({
        where: {
          email: data.data.object.customer_email,
        },
        data: {
          hasAccess: true,
        },
      });
      break;

    default:
      return Response.json(null, { status: 200 });
  }

  // return ok response
  return Response.json(null, { status: 200 });
}
