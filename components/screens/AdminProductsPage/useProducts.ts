import { ITableItem } from "@/components/AdminTable/AdminTable/admin-table.interface";
import { getAdminUrl } from "@/config/url.config";
import { useDebounce } from "@/hooks/useDebounde";
import { toastError } from "@/lib/toast-error";
import { ProductService } from "@/services/product.service";
import { ICreateProduct, IUpdateProduct } from "@/shared/types/product.types";
import { useSearchParams } from "next/navigation";

import { ChangeEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";

export const useProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const searchParams = useSearchParams();

  const productId = String(searchParams.get("id"));

  const queryData = useQuery(
    ["products list", debouncedSearch],
    () => ProductService.getAll(debouncedSearch),
    {
      select: ({ data }) =>
        data.map(
          (product): ITableItem => ({
            _id: product._id,
            editUrl: getAdminUrl(`product/edit/${product._id}`),
            items: [
              product.image,
              product.title,
              product.description,
              product.price.toString(),
            ],
          })
        ),

      onError: (error) => {
        toastError(error, "Product list");
      },
    }
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const { mutateAsync: createProductAsync } = useMutation(
    "create product",
    (data: ICreateProduct) => ProductService.createProduct(data),
    {
      onError: (error) => {
        toastError(error, "Product list");
      },

      onSuccess: () => {
        toastr.success("Create product", "create was successful");
        queryData.refetch();
      },
    }
  );

  const { mutateAsync: updateProductAsync } = useMutation(
    "update product",
    (data: IUpdateProduct) => ProductService.updateProduct(productId, data),
    {
      onError: (error) => {
        toastError(error, "Product list");
      },

      onSuccess: () => {
        toastr.success("Update product", "create was successful");
        queryData.refetch();
      },
    }
  );

  const { mutateAsync: deleteAsync } = useMutation(
    "delete product",
    (productId: string) => ProductService.deleteProduct(productId),
    {
      onError: (error) => {
        toastError(error, "Product list");
      },

      onSuccess: () => {
        toastr.success("Delete product", "delete was successful");
        queryData.refetch();
      },
    }
  );

  return useMemo(
    () => ({
      handleSearch,
      ...queryData,
      searchTerm,
      deleteAsync,
      createProductAsync,
      updateProductAsync,
    }),
    [queryData, searchTerm, deleteAsync, createProductAsync, updateProductAsync]
  );
};
