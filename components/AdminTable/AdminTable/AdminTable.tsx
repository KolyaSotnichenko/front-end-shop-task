import { FC } from "react";

import AdminTableHeader from "./AdminTableHeader";
import AdminTableItem from "./AdminTableItem";
import { ITableItem } from "./admin-table.interface";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";

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
  const { user } = useAuth();

  return (
    <div>
      <AdminTableHeader headerItems={headerItems} />

      {isLoading ? (
        <Skeleton />
      ) : tableItems.length ? (
        tableItems
          .filter((item) => !item.items.includes(user?.email!))
          .map((tableItem) => (
            <AdminTableItem
              key={tableItem._id}
              removeHandler={() => removeHandler(tableItem._id)}
              tableItem={tableItem}
            />
          ))
      ) : (
        <div className="text-lg text-black text-opacity-60 text-center py-3">
          Elements not found!
        </div>
      )}
    </div>
  );
};

export default AdminTable;
