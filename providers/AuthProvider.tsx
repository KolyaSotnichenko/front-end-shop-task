"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/dashboard");
    if (user?.isAdmin) router.push("/admin-dashboard");
    else {
      router.push("/");
    }
  }, [user]);

  return <>{children}</>;
};

export default AuthProvider;
