import cn from "classnames";
import { FC } from "react";

import styles from "./AdminTable.module.scss";

const AdminTableHeader: FC<{ headerItems: string[] }> = ({ headerItems }) => {
  return (
    <div className="flex items-center justify-between bg-black mt-4 px-5 rounded-lg transition-colors">
      {headerItems.map((value) => (
        <div className="flex-1 text-white py-3" key={value}>
          {value}
        </div>
      ))}
      <div>Actions</div>
    </div>
  );
};

export default AdminTableHeader;
