"use client";

import { FC } from "react";
import Link from "next/link";
import { UserNav } from "../UserNav";
import { ShoppingBasket, Trash2 } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { useActions } from "@/hooks/useActions";

const UserHeader: FC<{ logo: string; homePage: string }> = ({
  logo,
  homePage,
}) => {
  const { increaseCountItem, decreaseCountItem, removeItem } = useActions();
  const items = useSelector((state: any) => state.cart.items);

  const totalPrice = items.reduce((total: any, curVal: any) => {
    return Number(total) + Number(curVal.price) * curVal.count;
  }, 0);

  const totalCartCount = items.reduce((total: any, curVal: any) => {
    return Number(total) + curVal.count;
  }, 0);

  const redirectToCheckout = async () => {
    try {
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_TEST_STRIPE_PUBLISHABLE_KEY as string
      );

      if (!stripe) throw new Error("Stripe failed to initialize.");

      const checkoutResponse = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      localStorage.setItem("products", JSON.stringify({ items }));

      const { sessionId } = await checkoutResponse.json();
      const stripeError = await stripe.redirectToCheckout({ sessionId });

      if (stripeError) {
        console.error(stripeError);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-between space-y-2 p-4 border-b mb-4 sticky top-0">
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
                  {totalCartCount}
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
                <div className="flex items-center justify-around text-xs border-b border-b-black">
                  <p>Title</p>
                  <p>Count</p>
                  <p>Price</p>
                </div>
                {items.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2 border-b border-blue-300"
                  >
                    <p className="flex-1 w-full text-gray-900 text-xs whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.title}
                    </p>
                    <div className="flex flex-1 items-center gap-2">
                      <Button
                        onClick={() => {
                          if (item.count < 2) {
                            removeItem(item);
                          } else {
                            decreaseCountItem(item);
                          }
                        }}
                        variant="ghost"
                        className="h-2 w-2"
                        disabled={item.count === 0}
                      >
                        -
                      </Button>
                      <p className="text-xs">{item.count}</p>
                      <Button
                        onClick={() => increaseCountItem(item)}
                        variant="ghost"
                        className="h-2 w-2"
                      >
                        +
                      </Button>
                    </div>
                    <div className="flex flex-1 items-center gap-x-2">
                      <p className="flex-1 w-full text-right text-xs text-gray-400">
                        ${item.price}
                      </p>
                      <Trash2
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeItem(item)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            <p className="text-sm">
              Total price: ${totalPrice ? totalPrice : 0}
            </p>
            <Button
              disabled={items.length === 0}
              onClick={redirectToCheckout}
              className="h-8 w-full"
            >
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
