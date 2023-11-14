import { FC } from "react";
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

const AdminModal: FC<{ text: string }> = ({ text }) => {
  const { createAsync } = useProducts();

  const {
    register: createInput,
    handleSubmit,
    reset,
  } = useForm<ICreateProduct>({
    mode: "onChange",
  });

  const handleCreateSubmit = (data: ICreateProduct) => {
    createAsync(data);
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger>{text}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new product</DialogTitle>
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
                <Label htmlFor="image">Image Url</Label>
                <Input id="image" type="text" {...createInput("image")} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="text" {...createInput("price")} />
              </div>
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

export default AdminModal;
