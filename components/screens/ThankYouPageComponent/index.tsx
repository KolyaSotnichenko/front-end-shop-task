"use client";

import { signal } from "@preact/signals-react";
import { Button } from "@/components/ui/button";
import { useInvoices } from "../InvoicesPage/useInvoices";
import { useEffect, useRef } from "react";
import { getStoreLocal } from "@/lib/local-storage";
import Link from "next/link";

export const invoice = signal({});

export const userFullData = signal({});

const ThankYouPageComponent = () => {
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
        <Link href="/dashboard">
          <Button>Go to dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPageComponent;
