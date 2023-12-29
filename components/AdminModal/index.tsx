import { FC } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import { ICreateProduct } from "@/shared/types/product.types";
import { useProducts } from "../../hooks/useProducts";
import { useSubscriptions } from "../../hooks/useSubscriptions";
import { ICreateSubscription } from "@/shared/types/subscription.types";
import { PlusCircle } from "lucide-react";
import UploadField from "./UploadField";

const AdminModal: FC<{ type: "product" | "subscription" }> = ({ type }) => {
  const { createProductAsync } = useProducts();
  const { createSubscriptionAsync } = useSubscriptions();

  const {
    register: createInput,
    handleSubmit,
    reset,
    control,
  } = useForm<ICreateProduct | ICreateSubscription>({
    mode: "onChange",
  });

  const handleCreateSubmit = (data: ICreateProduct | ICreateSubscription) => {
    if (type === "product") {
      createProductAsync(data as ICreateProduct);
    } else if (type === "subscription") {
      createSubscriptionAsync(data as ICreateSubscription);
    }
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger>
        <PlusCircle />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "product"
              ? "Create new product"
              : "Create new subscription"}
          </DialogTitle>
          <DialogDescription>
            <form
              className="flex flex-col gap-5 mt-4"
              onSubmit={handleSubmit(handleCreateSubmit)}
            >
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder=""
                  {...createInput("title")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Description</Label>
                <Input
                  id="description"
                  type="text"
                  {...createInput("description")}
                />
              </div>
              <div className="grid gap-2">
                <Controller
                  control={control}
                  name="image"
                  defaultValue="Select file"
                  render={({ field: { onChange } }) => (
                    <UploadField
                      onChange={onChange}
                      // value={value}
                      folder={type === "product" ? "products" : "subscriptions"}
                      placeholder="Image"
                    />
                  )}
                  rules={{
                    required: "Photo is required!",
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price-usd">Price USD</Label>
                <Input
                  id="price-usd"
                  type="text"
                  {...createInput("price.usd")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price-eur">Price EUR</Label>
                <Input
                  id="price-eur"
                  type="text"
                  {...createInput("price.eur")}
                />
              </div>
              {type === "subscription" && (
                <div className="grid gap-2">
                  <Label htmlFor="period">Period</Label>
                  <Input id="period" type="text" {...createInput("period")} />
                </div>
              )}
              <DialogClose asChild>
                <Button className="w-full" type="submit">
                  Create
                </Button>
              </DialogClose>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AdminModal;
