import ProductTable from "@/components/ProductTable";
import { UserNav } from "@/components/UserNav";

const AdminDashBoard = () => {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">Products</p>
        </div>
        <div className="flex items-center space-x-2">
          <UserNav />
        </div>
      </div>
      <ProductTable />
    </div>
  );
};

export default AdminDashBoard;
