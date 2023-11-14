"use client";

import AdminHeader from "@/components/AdminHeader";
import AdminTable from "@/components/AdminTable/AdminTable/AdminTable";
import { UserNav } from "@/components/UserNav";
import { FC } from "react";
import { useSubscriptions } from "./useSubscriptions";

const AdminSubscriptionsPage: FC = () => {
  const { searchTerm, isLoading, handleSearch, deleteAsync, data } =
    useSubscriptions();

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <AdminHeader searchTerm={searchTerm} handleSearch={handleSearch} />
      <AdminTable
        isLoading={isLoading}
        removeHandler={deleteAsync}
        headerItems={["Title", "Description", "Price"]}
        tableItems={data || []}
      />
    </div>
  );
};

export default AdminSubscriptionsPage;
