"use client";

import { FC } from "react";
import Link from "next/link";
import { UserNav } from "../UserNav";
import { ShoppingBasket, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem } from "@/store/cart.slice";

const UserHeader: FC<{ logo: string; homePage: string }> = ({
  logo,
  homePage,
}) => {
  const dispatch = useDispatch();
  const items = useSelector((state: any) => state.cart.items);

  const handleCheckout = () => {
    dispatch(clearCart());
  };

  const totalPrice = items.reduce((total: any, curVal: any) => {
    return Number(total) + Number(curVal.price);
  }, 0);

  return (
    <div className="flex items-center justify-between space-y-2 p-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          <Link href={homePage}>{logo}</Link>
        </h2>
      </div>
      <div className="flex items-center space-x-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full relative">
              <ShoppingBasket />
              {items && (
                <p className="text-sm absolute top-0 right-3 text-slate-400">
                  {items.length}
                </p>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            {/* <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  You products: 0
                </p>
              </div>
            </DropdownMenuLabel> */}
            {items.length === 0 && (
              <div className="flex flex-col items-center justify-center min-h-[200px]">
                <p className="text-center text-gray-400">No products!</p>
              </div>
            )}
            {items.length > 0 && (
              <div className="flex flex-col mb-4 min-h-[200px]">
                {items.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 border-b border-blue-300"
                  >
                    <p className="flex-1 w-full text-gray-900">{item.title}</p>
                    <div className="flex items-center gap-x-3">
                      <p className="flex-1 w-full text-right text-sm text-gray-400">
                        ${item.price}
                      </p>
                      <Trash2
                        className="w-4 h-4 cursor-pointer"
                        onClick={() => dispatch(removeItem(item))}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            <p className="text-sm">
              Total price: ${totalPrice ? totalPrice : 0}
            </p>
            <Button onClick={handleCheckout} className="h-8 w-full">
              Checkout
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
        <UserNav />
      </div>
    </div>
  );
};

export default UserHeader;
