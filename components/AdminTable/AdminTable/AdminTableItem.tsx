import { FC } from "react";

import AdminActions from "./AdminActions/AdminActions";
import { IAdminTableItem } from "./admin-table.interface";

const AdminTableItem: FC<IAdminTableItem> = ({ removeHandler, tableItem }) => {
  return (
    <div className="flex items-center justify-between bg-gray-700 bg-opacity-20 mt-4 px-5 py-2 rounded-lg transition-colors hover:bg-opacity-50">
      {tableItem.items.map((value) => (
        <div className="flex-1" key={value}>
          {value}
        </div>
      ))}
      <AdminActions editUrl={tableItem.editUrl} removeHandler={removeHandler} />
    </div>
  );
};

export default AdminTableItem;
