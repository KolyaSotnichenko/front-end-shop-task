import stripe from "@/config/stripe";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(req: NextRequest, res: NextResponse) {
  const { session_id } = await req.json();

  try {
    if (!session_id.startsWith("cs_")) {
      throw Error("Incorrect CheckoutSession ID.");
    }
    const checkout_session = await stripe.invoiceItems.retrieve(session_id);

    return NextResponse.json(checkout_session);
  } catch (err) {
    return NextResponse.json({ error: "Error retrieve checkout session" });
  }
}
