import { FC } from "react";

import AdminActions from "./AdminActions/AdminActions";
import { IAdminTableItem } from "./admin-table.interface";
import Image from "next/image";

const AdminTableItem: FC<IAdminTableItem> = ({ removeHandler, tableItem }) => {
  return (
    <div className="flex items-center justify-between bg-gray-700 bg-opacity-20 mt-4 px-5 py-2 rounded-lg transition-colors hover:bg-opacity-50">
      {tableItem.items.map((value) => (
        <div className="flex-1" key={value}>
          {value}
        </div>
      ))}

      {/* {tableItem.items.map((value, index) => {
        if (value.split("/")[0] === "https:") {
          return (
            <div className=" flex-1 w-4 h-4">
              <Image key={index} fill src={value} alt="Image" />
            </div>
          );
        } else {
          return (
            <div key={index} className="flex-1">
              {value}
            </div>
          );
        }
      })} */}
      <AdminActions editId={tableItem._id} removeHandler={removeHandler} />
    </div>
  );
};

export default AdminTableItem;
