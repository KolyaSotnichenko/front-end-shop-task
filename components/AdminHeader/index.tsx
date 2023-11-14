import { ChangeEvent, FC } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import AdminModal from "../AdminModal";

interface IAdminHeader {
  onClick?: () => void;
  searchTerm: string;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  textForModal?: string;
  typeModel?: "product" | "subscription";
}

const AdminHeader: FC<IAdminHeader> = ({
  onClick,
  searchTerm,
  handleSearch,
  textForModal,
  typeModel,
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
      {onClick && <AdminModal text={textForModal!} type={typeModel!} />}
    </div>
  );
};

export default AdminHeader;
