"use client";

import { signal } from "@preact/signals-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useInvoices } from "../InvoicesPage/useInvoices";
import { useEffect } from "react";
import { getStoreLocal } from "@/lib/local-storage";

export const invoice = signal({});

export const userFullData = signal({});

const ThankYouPageComponent = () => {
  const router = useRouter();

  const { createInvoiceAsync } = useInvoices();

  const invoiceData = getStoreLocal("invoice");
  const totalPrice = getStoreLocal("totalPrice");

  useEffect(() => {
    createInvoiceAsync({
      invoiceNumber: invoiceData.invoiceNumber,
      user: invoiceData.id,
      products: invoiceData.products,
      subscriptions: invoiceData.subscriptions,
      total: String(totalPrice),
    }).then(() => {
      localStorage.removeItem("invoice");
      localStorage.removeItem("totalPrice");
      localStorage.removeItem("products");
    });
  }, []);

  return (
    <div>
      <h1>Congratulations!</h1>
      <Button onClick={() => router.push("/dashboard")}>Go to dashboard</Button>
    </div>
  );
};

export default ThankYouPageComponent;
