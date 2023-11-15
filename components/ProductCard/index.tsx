"use client";

import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image, { StaticImageData } from "next/image";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/cart.slice";

interface IProductCard {
  id: string;
  title: string;
  description: string;
  image: StaticImageData;
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
  const dispatch = useDispatch();

  // const handleAddToCart = ({
  //   id, title, price,
  // }:
  //   { id: string; title: string; price: string };
  // ) => {
  //   dispatch(addItem(product));
  // };

  const handleAddToCart = (id: string, title: string, price: string) => {
    dispatch(addItem({ id, title, price }));
  };

  return (
    <Card>
      <div className="flex justify-around">
        <Image
          className=" flex-1 w-full h-full"
          src={image}
          width={100}
          height={100}
          alt="Product image"
        />
        <div className="flex-1">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>${price}</CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => handleAddToCart(id, title, price)}
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
