"use client";

import AdminHeader from "@/components/AdminHeader";
import AdminTable from "@/components/AdminTable/AdminTable/AdminTable";
import { FC } from "react";
import { useProducts } from "./useProducts";

const AdminProductsPage: FC = () => {
  const { searchTerm, isLoading, handleSearch, deleteAsync, data } =
    useProducts();

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <AdminHeader
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          onClick={() => {}}
          textForModal="Create product"
          typeModel="product"
        />
        <AdminTable
          isLoading={isLoading}
          removeHandler={deleteAsync}
          headerItems={["Image", "Title", "Description", "USD", "EUR"]}
          tableItems={data || []}
        />
      </div>
    </>
  );
};

export default AdminProductsPage;
