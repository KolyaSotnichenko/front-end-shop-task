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
  const dispatch = useDispatch();

  const handleAddToCart = (id: string, title: string, price: string) => {
    dispatch(addItem({ id, title, price }));
  };

  return (
    <Card className="w-[240px] h-[240px] relative">
      <div className="flex flex-col justify-around">
        <Image
          className=" flex-1 absolute w-full h-[40%] top-0"
          src={image}
          width={50}
          height={50}
          alt="Product image"
        />
        <div className="flex flex-col flex-1 absolute bottom-0 w-full">
          <div className="flex items-center h-20">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              {/* <CardDescription>{description}</CardDescription> */}
            </CardHeader>
            <CardContent className="p-0">${price}</CardContent>
          </div>
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
