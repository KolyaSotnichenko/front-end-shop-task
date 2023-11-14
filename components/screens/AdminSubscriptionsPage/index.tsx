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
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome!</h2>
        </div>
        <div className="flex items-center space-x-2">
          <UserNav />
        </div>
      </div>
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
