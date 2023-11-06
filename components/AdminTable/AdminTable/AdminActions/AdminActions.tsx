import { useRouter } from "next/navigation";
import { FC } from "react";
import { Edit, Trash } from "lucide-react";

interface IAdminActions {
  editUrl: string;
  removeHandler: () => void;
}

const AdminActions: FC<IAdminActions> = ({ editUrl, removeHandler }) => {
  const { push } = useRouter();
  return (
    <div>
      <button
        className="outline-border-none bg-transparent text-xl text-primary opacity-80 transition-opacity hover:opacity-100 mr-4"
        onClick={() => push(editUrl)}
      >
        <Edit />
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
