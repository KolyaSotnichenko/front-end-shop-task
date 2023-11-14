"use client";

import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  console.log(pathname.split("/")[1]);

  useEffect(() => {
    if (user && !user.isAdmin) router.push("/dashboard");
    if (user && user.isAdmin && pathname === "/")
      router.push("/admin-dashboard");
    if (!user) router.push("/");
  }, [user]);

  return <>{children}</>;
};

export default AuthProvider;
