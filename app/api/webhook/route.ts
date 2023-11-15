import stripe from "@/config/stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: Request, res: any) {
  if (req.method === "POST") {
    let event;

    try {
      const body = await req.text();
      const signature = headers().get("Stripe-Signature") as string;

      event = stripe.webhooks.constructEvent(
        body.toString(),
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err: any) {
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    console.log("✅ Success:", event.id);

    if (event.type === "checkout.session.completed") {
      console.log(`💰  Payment received!`);
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    // res.json({ received: true });
    return new NextResponse(null, { status: 200 });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
