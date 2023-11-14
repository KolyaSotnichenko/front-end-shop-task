import { FC } from "react";
import { UserNav } from "../UserNav";
import Link from "next/link";

const Header: FC<{ logo: string; homePage: string }> = ({ logo, homePage }) => {
  return (
    <div className="flex items-center justify-between space-y-2 p-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          <Link href={homePage}>{logo}</Link>
        </h2>
      </div>
      <div className="flex items-center space-x-2">
        <UserNav />
      </div>
    </div>
  );
};

export default Header;
