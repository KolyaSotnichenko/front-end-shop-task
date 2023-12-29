"use client";

import { FC, useEffect, useState } from "react";

import AdminTableHeader from "./AdminTableHeader";
import AdminTableItem from "./AdminTableItem";
import { ITableItem } from "./admin-table.interface";
import { Skeleton } from "@/components/ui/skeleton";

interface IAdminTable {
  tableItems: ITableItem[];
  isLoading: boolean;
  headerItems: string[];
  removeHandler: (id: string) => void;
}

const AdminTable: FC<IAdminTable> = ({
  tableItems,
  isLoading,
  headerItems,
  removeHandler,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <div>
        <AdminTableHeader headerItems={headerItems} />

        {isLoading ? (
          <Skeleton />
        ) : tableItems.length ? (
          tableItems.map((tableItem) => (
            <AdminTableItem
              key={tableItem._id}
              removeHandler={() => removeHandler(tableItem._id)}
              tableItem={tableItem}
            />
          ))
        ) : (
          <p className="text-lg text-black text-opacity-60 text-center py-3">
            Elements not found!
          </p>
        )}
      </div>
    )
  );
};

export default AdminTable;
