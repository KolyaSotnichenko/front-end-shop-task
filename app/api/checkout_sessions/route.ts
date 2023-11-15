import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import stripe from "@/config/stripe";

export async function POST(req: NextRequest, res: NextResponse) {
  const headersList = headers();
  const { items } = await req.json();

  const lineItems =
    items &&
    items.map((item: { id: string; title: string; price: string }) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
          },
          unit_amount: Number(item.price) * 100,
        },
        quantity: 1,
      };
    });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${headersList.get(
        "origin"
      )}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${headersList.get("origin")}/`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Error creating checkout session" });
  }
}
