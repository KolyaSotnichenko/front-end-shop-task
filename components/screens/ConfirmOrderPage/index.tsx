"use client";

import Invoice from "@/components/Invoice";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { loadStripe } from "@stripe/stripe-js";

const ConfirmOrderPage = () => {
  const { items } = useCart();

  const redirectToCheckout = async () => {
    try {
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_TEST_STRIPE_PUBLISHABLE_KEY!
      );

      if (!stripe) throw new Error("Stripe failed to initialize.");

      const checkoutResponse = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      const { sessionId } = await checkoutResponse.json();
      const stripeError = await stripe.redirectToCheckout({ sessionId });

      if (stripeError) {
        console.error(stripeError);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Invoice />
      <div className="text-center mb-10">
        <Button onClick={redirectToCheckout}>Confirm</Button>
      </div>
    </>
  );
};

export default ConfirmOrderPage;
