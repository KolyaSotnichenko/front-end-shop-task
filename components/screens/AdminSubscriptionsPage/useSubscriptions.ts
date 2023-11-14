import { ITableItem } from "@/components/AdminTable/AdminTable/admin-table.interface";
import { getAdminUrl } from "@/config/url.config";
import { useDebounce } from "@/hooks/useDebounde";
import { toastError } from "@/lib/toast-error";
import { SubscriptionService } from "@/services/subscription.service";

import { ChangeEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";

export const useSubscriptions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const queryData = useQuery(
    ["subscriptions list", debouncedSearch],
    () => SubscriptionService.getAll(debouncedSearch),
    {
      select: ({ data }) =>
        data.map(
          (subscription): ITableItem => ({
            _id: subscription._id,
            editUrl: getAdminUrl(`subscription/edit/${subscription._id}`),
            items: [
              // product.image,
              subscription.title,
              subscription.description,
              subscription.price.toString(),
            ],
          })
        ),

      onError: (error) => {
        toastError(error, "Subscriptions list");
      },
    }
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const { mutateAsync: deleteAsync } = useMutation(
    "delete subscription",
    (subscriptionId: string) =>
      SubscriptionService.deleteProduct(subscriptionId),
    {
      onError: (error) => {
        toastError(error, "Subscription list");
      },

      onSuccess: () => {
        toastr.success("Delete subscription", "delete was successful");
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
    }),
    [queryData, searchTerm, deleteAsync]
  );
};
