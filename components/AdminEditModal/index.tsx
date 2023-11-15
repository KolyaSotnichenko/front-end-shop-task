import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { ICreateProduct } from "@/shared/types/product.types";
import { useProducts } from "../screens/AdminProductsPage/useProducts";
import { useSubscriptions } from "../screens/AdminSubscriptionsPage/useSubscriptions";
import { ICreateSubscription } from "@/shared/types/subscription.types";
import { Edit } from "lucide-react";
import { IUpdateUser } from "@/shared/types/user.types";
import { useRouter } from "next/navigation";
import { useUsers } from "../screens/AdminUsersPage/useUsers";

const AdminEditModal: FC<{
  text?: string;
  type: "product" | "subscription" | "user";
}> = ({ text, type }) => {
  const { updateProductAsync } = useProducts();
  const { updateSubscriptionAsync } = useSubscriptions();
  const { updateUserAsync } = useUsers();

  const router = useRouter();

  const {
    register: updateInput,
    handleSubmit,
    reset,
  } = useForm<ICreateProduct | ICreateSubscription | IUpdateUser>({
    mode: "onChange",
  });

  const handleCreateSubmit = (
    data: ICreateProduct | ICreateSubscription | IUpdateUser
  ) => {
    if (type === "product") {
      updateProductAsync(data as ICreateProduct);
    } else if (type === "subscription") {
      updateSubscriptionAsync(data as ICreateSubscription);
    } else if (type === "user") {
      updateUserAsync(data as IUpdateUser);
    }
    reset();
    router.back();
  };

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogTrigger>
        <Edit />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {(type === "product" && "Update product") ||
              (type === "subscription" && "Update subscription") ||
              (type === "user" && "Update user")}
          </DialogTitle>
          <DialogDescription>
            <form
              className="flex flex-col gap-5 mt-4"
              onSubmit={handleSubmit(handleCreateSubmit)}
            >
              {type === "user" && (
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...updateInput("email")} />
                </div>
              )}
              {type === "user" && (
                <div className="grid gap-2">
                  <div className="items-top flex space-x-2">
                    <select
                      className="w-full cursor-pointer"
                      {...updateInput("isAdmin")}
                    >
                      <option value="">Select...</option>
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </div>
                </div>
              )}
              {(type === "product" || type === "subscription") && (
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" type="text" {...updateInput("title")} />
                </div>
              )}
              {(type === "product" || type === "subscription") && (
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    type="text"
                    {...updateInput("description")}
                  />
                </div>
              )}
              {(type === "product" || type === "subscription") && (
                <div className="grid gap-2">
                  <Label htmlFor="image">Image Url</Label>
                  <Input id="image" type="text" {...updateInput("image")} />
                </div>
              )}
              {(type === "product" || type === "subscription") && (
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" type="text" {...updateInput("price")} />
                </div>
              )}
              {type === "subscription" && (
                <div className="grid gap-2">
                  <Label htmlFor="period">Period</Label>
                  <Input id="period" type="text" {...updateInput("period")} />
                </div>
              )}
              <Button className="w-full" type="submit">
                Create
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AdminEditModal;
