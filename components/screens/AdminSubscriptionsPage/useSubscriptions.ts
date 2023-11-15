import { ITableItem } from "@/components/AdminTable/AdminTable/admin-table.interface";
import { getAdminUrl } from "@/config/url.config";
import { useDebounce } from "@/hooks/useDebounde";
import { toastError } from "@/lib/toast-error";
import { SubscriptionService } from "@/services/subscription.service";
import {
  ICreateSubscription,
  IUpdateSubscription,
} from "@/shared/types/subscription.types";
import { useSearchParams } from "next/navigation";

import { ChangeEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";

export const useSubscriptions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const searchParams = useSearchParams();

  const subscriptionId = String(searchParams.get("id"));

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
              subscription.image,
              subscription.title,
              subscription.description,
              subscription.period,
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

  const subscriptionData = useQuery("subscription data", () =>
    SubscriptionService.getById(subscriptionId)
  );

  const { mutateAsync: createSubscriptionAsync } = useMutation(
    "create subscription",
    (data: ICreateSubscription) => SubscriptionService.createSubscription(data),
    {
      onError: (error) => {
        toastError(error, "Subscription list");
      },

      onSuccess: () => {
        toastr.success("Create subscription", "create was successful");
        queryData.refetch();
      },
    }
  );

  const { mutateAsync: updateSubscriptionAsync } = useMutation(
    "update subscription",
    (data: IUpdateSubscription) =>
      SubscriptionService.updateSubscription(subscriptionId, data),
    {
      onError: (error) => {
        toastError(error, "Subscription list");
      },

      onSuccess: () => {
        toastr.success("Update subscription", "create was successful");
        queryData.refetch();
      },
    }
  );

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
      createSubscriptionAsync,
      updateSubscriptionAsync,
      subscriptionData,
    }),
    [
      queryData,
      searchTerm,
      deleteAsync,
      createSubscriptionAsync,
      updateSubscriptionAsync,
      subscriptionData,
    ]
  );
};
