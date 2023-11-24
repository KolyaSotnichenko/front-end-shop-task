"use client";

import { FC } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image, { StaticImageData } from "next/image";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useActions } from "@/hooks/useActions";
import { useCart } from "@/hooks/useCart";

interface IProductCard {
  id: string;
  title: string;
  description: string;
  image: string | StaticImageData;
  price: string;
  period?: string | undefined;
}

const ProductCard: FC<IProductCard> = ({
  title,
  description,
  image,
  price,
  period,
  id,
}) => {
  const { addItem, increaseCountItem } = useActions();
  const { items } = useCart();

  const handleAddToCart = (
    id: string,
    title: string,
    count: number,
    price: string
  ) => {
    const isAdded = items && items.find((item: any) => item.id === id);

    const isSubsc = items && items.some((item: any) => period);

    if (isAdded && !isSubsc) {
      return increaseCountItem({
        id,
        title,
        count: count++,
        isSubscription: isSubsc,
        price,
      });
    }

    if (isAdded && isSubsc) {
      return addItem({
        id,
        title,
        count: count++,
        isSubscription: isSubsc,
        price,
        period,
      });
    }

    if (period === undefined) {
      return addItem({
        id,
        title,
        count: count,
        isSubscription: false,
        price,
      });
    }

    if (period) {
      return addItem({
        id,
        title,
        count,
        isSubscription: true,
        price,
        period,
      });
    }
  };

  return (
    <Card className="w-[240px] h-[240px] relative">
      <div className="flex flex-col justify-around">
        <Image
          className=" flex-1 absolute  w-full h-[40%] top-0"
          src={image}
          width={50}
          height={50}
          priority
          alt="Product image"
        />
        <div className="flex flex-col flex-1 absolute bottom-0 w-full">
          <div className="flex items-center justify-between h-12">
            <CardHeader>
              <CardTitle className="text-lg">{title}</CardTitle>
              {/* <CardDescription>{description}</CardDescription> */}
            </CardHeader>
            <CardContent className="pt-6 text-slate-500">${price}</CardContent>
          </div>
          {period && (
            <Badge
              variant="destructive"
              className="text-[10px] absolute top-[-100%] right-2"
            >
              Period: {period}
            </Badge>
          )}
          <CardFooter>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => handleAddToCart(id, title, 1, price)}
            >
              Buy
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
