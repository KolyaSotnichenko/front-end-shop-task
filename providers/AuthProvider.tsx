"use client";

import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user && user.isActive && !user.isAdmin && pathname === "/")
      router.push("/dashboard");
    if (user && user.isActive && user.isAdmin && pathname === "/")
      router.push("/admin-dashboard");
    if (!user) router.push("/");
  }, [user]);

  return <>{children}</>;
};

export default AuthProvider;
