"use client";

import ProductCard from "@/components/ProductCard";
import { useProducts } from "../AdminProductsPage/useProducts";
import d from "@/app/test.png";

const UserProductsPage = () => {
  const { data } = useProducts();

  return (
    <div className="h-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-8 overflow-y-auto">
      {data &&
        data.map((item) => (
          <div key={item._id}>
            <ProductCard
              key={item._id}
              id={item._id}
              title={item.items[1]}
              description={item.items[2]}
              image={d}
              price={item.items[3]}
            />
          </div>
        ))}
    </div>
  );
};

export default UserProductsPage;
