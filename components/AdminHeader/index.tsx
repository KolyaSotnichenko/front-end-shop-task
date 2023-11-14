import { ChangeEvent, FC } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import AdminModal from "../AdminModal";

interface IAdminHeader {
  onClick?: () => void;
  searchTerm: string;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AdminHeader: FC<IAdminHeader> = ({
  onClick,
  searchTerm,
  handleSearch,
}) => {
  return (
    <div className="flex items-center justify-center w-full] gap-x-5">
      <Input
        value={searchTerm}
        onChange={handleSearch}
        className="w-50"
        type="text"
        placeholder="Search..."
      />
      {onClick && <AdminModal text={"Create product"} />}
    </div>
  );
};

export default AdminHeader;
