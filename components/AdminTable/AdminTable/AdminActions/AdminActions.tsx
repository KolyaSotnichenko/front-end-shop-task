import { FC } from "react";
import { Edit, Trash } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface IAdminActions {
  editId: string;
  removeHandler: () => void;
}

const AdminActions: FC<IAdminActions> = ({ editId, removeHandler }) => {
  const pathname = usePathname();

  return (
    <div>
      <button className="outline-border-none bg-transparent text-xl text-primary opacity-80 transition-opacity hover:opacity-100 mr-4">
        <Link
          href={{
            pathname: `${pathname}/${editId}`,
            query: { id: editId },
          }}
        >
          <Edit />
        </Link>
      </button>
      <button
        className="outline-border-none bg-transparent text-xl text-primary opacity-80 transition-opacity hover:opacity-100"
        onClick={removeHandler}
      >
        <Trash />
      </button>
    </div>
  );
};

export default AdminActions;
