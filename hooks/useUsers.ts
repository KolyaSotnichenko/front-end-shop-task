import { ITableItem } from "@/components/AdminTable/AdminTable/admin-table.interface";
import { getAdminUrl } from "@/config/url.config";
import { useAuth } from "@/hooks/useAuth";
import { useDebounce } from "@/hooks/useDebounde";
import { toastError } from "@/lib/toast-error";

import { UserService } from "@/services/user.service";
import { IUpdateUser } from "@/shared/types/user.types";
import { useSearchParams } from "next/navigation";

import { ChangeEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";

export const useUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const searchParams = useSearchParams();

  const { user } = useAuth();

  const userId = String(searchParams.get("id") || "");

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
      enabled: !!user?.isAdmin,
    }
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const { mutateAsync: updateUserAsync } = useMutation(
    "update user",
    (data: IUpdateUser) =>
      UserService.updateUser(userId, {
        email: data.email,
        isAdmin: data.isAdmin === "true" ? true : false,
        currency: data.currency,
        address: data.address,
        organization: data.organization,
        password: data.password,
      }),
    {
      onError: (error) => {
        toastError(error, "User list");
      },

      onSuccess: () => {
        toastr.success("Update user", "update was successful");
        queryData.refetch();
      },
    }
  );

  const { mutateAsync: addProductsAsync } = useMutation(
    "add products",
    (data: string[]) => UserService.addProduct(data),
    {
      onError: (error) => {
        toastError(error, "Add products ");
      },

      onSuccess: () => {
        toastr.success("Add products", "add was successful");
        queryData.refetch();
      },
    }
  );

  const userData = useQuery("user data", () => UserService.getById(userId), {
    enabled: !!userId,
  });

  const profileData = useQuery("profile data", () => UserService.getProfile());

  const { mutateAsync: updateProfileAsync } = useMutation(
    "update profile",
    (data: IUpdateUser) =>
      UserService.updateProfile({
        email: data.email,
        password: data.password,
        address: data.address,
        organization: data.organization,
        currency: data.currency,
      }),
    {
      onError: (error) => {
        toastError(error, "Profile");
      },

      onSuccess: () => {
        toastr.success("Update profile", "update was successful");
        queryData.refetch();
      },
    }
  );

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
      updateUserAsync,
      userData,
      profileData,
      updateProfileAsync,
      addProductsAsync,
    }),
    [
      queryData,
      searchTerm,
      deleteAsync,
      updateUserAsync,
      userData,
      profileData,
      updateProfileAsync,
      addProductsAsync,
    ]
  );
};
