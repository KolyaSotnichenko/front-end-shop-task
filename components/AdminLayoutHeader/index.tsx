import { FC } from "react";
import { AdminNav } from "../AdminNav";
import Link from "next/link";

const AdminLayoutHeader: FC<{ logo: string; homePage: string }> = ({
  logo,
  homePage,
}) => {
  return (
    <div className="flex items-center justify-between space-y-2 p-4 border-b mb-4 sticky top-0">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          <Link href={homePage}>{logo}</Link>
        </h2>
      </div>
      <div className="flex items-center space-x-2">
        <AdminNav />
      </div>
    </div>
  );
};

export default AdminLayoutHeader;
