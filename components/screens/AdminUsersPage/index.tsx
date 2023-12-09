"use client";
import AdminHeader from "@/components/AdminHeader";
import { FC } from "react";
import { useUsers } from "../../../hooks/useUsers";
import AdminTable from "@/components/AdminTable/AdminTable/AdminTable";

const AdminUsersPage: FC = () => {
  const { handleSearch, isLoading, searchTerm, data, deleteAsync } = useUsers();

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <AdminHeader searchTerm={searchTerm} handleSearch={handleSearch} />
      <AdminTable
        isLoading={isLoading}
        removeHandler={deleteAsync}
        headerItems={["Email", "Admin", "Active"]}
        tableItems={data || []}
      />
    </div>
  );
};

export default AdminUsersPage;
