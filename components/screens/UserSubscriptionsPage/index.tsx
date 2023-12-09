"use client";

import ProductCard from "@/components/ProductCard";
import { useSubscriptions } from "../../../hooks/useSubscriptions";

const UserSubscriptionsPage = () => {
  const { data } = useSubscriptions();

  let currencyType: string = "";

  if (typeof window !== "undefined") {
    currencyType = localStorage.getItem("currency")!;
  }

  return (
    <div className=" flex items-center justify-center h-full w-full">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
        {data &&
          data.map((item) => (
            <div key={item._id}>
              <ProductCard
                id={item._id}
                title={item.items[1]}
                description={item.items[2]}
                image={item.items[0]}
                period={item.items[3]}
                price={currencyType === "usd" ? item.items[4] : item.items[5]}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserSubscriptionsPage;
