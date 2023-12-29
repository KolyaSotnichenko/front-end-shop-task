import { FC } from "react";

import AdminActions from "./AdminActions/AdminActions";
import { IAdminTableItem } from "./admin-table.interface";
import Image from "next/image";

const AdminTableItem: FC<IAdminTableItem> = ({ removeHandler, tableItem }) => {
  return (
    <div className="flex items-center justify-between bg-gray-700 bg-opacity-20 mt-4 px-5 py-2 rounded-lg transition-colors hover:bg-opacity-50">
      {tableItem.items.map((value) => (
        <div className="flex-1" key={value}>
          {value.split("/")[1] === "uploads" ? (
            <Image
              src={`http:/localhost:4200${value}`}
              width={50}
              height={50}
              alt="Image"
            />
          ) : (
            value
          )}
        </div>
      ))}
      <AdminActions editId={tableItem._id} removeHandler={removeHandler} />
    </div>
  );
};

export default AdminTableItem;
