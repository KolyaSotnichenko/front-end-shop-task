"use client";

import { Button } from "@/components/ui/button";
import { shootFireworks } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

const ThankYouPageComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sessionId = searchParams.get("session_id");

  const { data, error } = useSWR(
    () => `/api/checkout_session/${sessionId}`,
    fetch
  );

  useEffect(() => {
    if (data) {
      console.log(data.json());
      // shootFireworks();
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center h-screen w-full justify-center">
      <h1 className="text-[32px]">Thank You!</h1>
      {/* <p>{productIds && productIds}</p> */}
      <Button onClick={() => router.push("/dashboard")}>Go to dashboard</Button>
    </div>
  );
};

export default ThankYouPageComponent;
