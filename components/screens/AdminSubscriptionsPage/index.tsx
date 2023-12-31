"use client";

import AdminHeader from "@/components/AdminHeader";
import AdminTable from "@/components/AdminTable/AdminTable/AdminTable";
import { FC } from "react";
import { useSubscriptions } from "../../../hooks/useSubscriptions";

const AdminSubscriptionsPage: FC = () => {
  const { searchTerm, isLoading, handleSearch, deleteAsync, data } =
    useSubscriptions();

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <AdminHeader
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        onClick={() => {}}
        textForModal="Create subscription"
        typeModel="subscription"
      />
      <AdminTable
        isLoading={isLoading}
        removeHandler={deleteAsync}
        headerItems={["Image", "Title", "Description", "Period", "USD", "EUR"]}
        tableItems={data || []}
      />
    </div>
  );
};

export default AdminSubscriptionsPage;
