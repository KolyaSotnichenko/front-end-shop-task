import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import stripe from "@/config/stripe";

export async function POST(req: NextRequest, res: NextResponse) {
  const headersList = headers();
  const { items, customerEmail, customerAddress } = await req.json();

  const lineItems =
    items &&
    items.map(
      (item: {
        id: string;
        title: string;
        count: number;
        price: string;
        currencyType: string;
      }) => {
        return {
          price_data: {
            currency: String(item.currencyType),
            product_data: {
              name: item.title,
            },
            unit_amount: Number(item.price) * 100,
          },
          quantity: item.count,
        };
      }
    );

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${headersList.get(
        "origin"
      )}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${headersList.get("origin")}/`,
      // billing_address_collection: "required",
      customer_email: customerEmail,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Error creating checkout session" });
  }
}
