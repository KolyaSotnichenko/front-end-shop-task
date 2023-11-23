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
import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { useActions } from "@/hooks/useActions";

interface IProductCard {
  id: string;
  title: string;
  description: string;
  image: string | StaticImageData;
  price: string;
  period?: string;
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
  const items = useSelector((state: any) => state.cart.items);

  const handleAddToCart = (
    id: string,
    title: string,
    count: number,
    price: string
  ) => {
    const isAdded = items.length && items.some((item: any) => item.id === id);

    if (isAdded) {
      return increaseCountItem({ id, title, count: count++, price });
    } else {
      return addItem({ id, title, count, price });
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
