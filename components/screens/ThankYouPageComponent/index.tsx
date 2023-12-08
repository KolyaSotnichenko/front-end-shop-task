"use client";

import { signal } from "@preact/signals-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useInvoices } from "../InvoicesPage/useInvoices";
import { useEffect, useRef } from "react";
import { getStoreLocal } from "@/lib/local-storage";

export const invoice = signal({});

export const userFullData = signal({});

const ThankYouPageComponent = () => {
  const router = useRouter();

  const { createInvoiceAsync } = useInvoices({ invoiceId: "" });

  const invoiceData = getStoreLocal("invoice");
  const totalPrice = getStoreLocal("totalPrice");

  const isEffectRun = useRef(false);

  useEffect(() => {
    if (!isEffectRun.current) {
      createInvoiceAsync({
        invoiceNumber: invoiceData.invoiceNumber,
        user: invoiceData.id,
        products: invoiceData.products,
        subscriptions: invoiceData.subscriptions,
        total: String(totalPrice),
        counts: invoiceData.counts,
        currency: invoiceData.currency,
      }).then(() => {
        localStorage.removeItem("invoice");
        localStorage.removeItem("totalPrice");
        localStorage.removeItem("products");
      });

      isEffectRun.current = true;
    }
  }, []);

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className=" flex flex-col items-center justify-center">
        <h1>Congratulations!</h1>
        <Button onClick={() => router.push("/dashboard")}>
          Go to dashboard
        </Button>
      </div>
    </div>
  );
};

export default ThankYouPageComponent;
