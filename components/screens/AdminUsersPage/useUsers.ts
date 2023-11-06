import { ITableItem } from "@/components/AdminTable/AdminTable/admin-table.interface";
import { getAdminUrl } from "@/config/url.config";
import { useDebounce } from "@/hooks/useDebounde";
import { convertMongoDate } from "@/lib/convertMongoDate";
import { toastError } from "@/lib/toast-error";

import { UserService } from "@/services/user.service";

import { ChangeEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";

export const useUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const queryData = useQuery(
    ["users list", debouncedSearch],
    () => UserService.getAll(debouncedSearch),
    {
      select: ({ data }) =>
        data.map(
          (user): ITableItem => ({
            _id: user._id,
            editUrl: getAdminUrl(`user/edit/${user._id}`),
            items: [
              user.email,
              user.isAdmin.toString(),
              user.isActive.toString(),
            ],
          })
        ),

      onError: (error) => {
        toastError(error, "User list");
      },
    }
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const { mutateAsync: deleteAsync } = useMutation(
    "delete user",
    (userId: string) => UserService.deleteUser(userId),
    {
      onError: (error) => {
        toastError(error, "User list");
      },

      onSuccess: () => {
        toastr.success("Delete user", "delete was successful");
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
