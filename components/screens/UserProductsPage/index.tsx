"use client";

import ProductCard from "@/components/ProductCard";
import { useProducts } from "../AdminProductsPage/useProducts";

const UserProductsPage = () => {
  const { data } = useProducts();

  return (
    <div className="h-full grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 place-items-center overflow-y-auto">
      {data &&
        data.map((item) => (
          <div key={item._id}>
            <ProductCard
              key={item._id}
              id={item._id}
              title={item.items[1]}
              description={item.items[2]}
              image={item.items[0]}
              price={item.items[3]}
            />
          </div>
        ))}
    </div>
  );
};

export default UserProductsPage;
