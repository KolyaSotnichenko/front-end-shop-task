import UserHeader from "@/components/UserHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Generated by create next app",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <UserHeader logo="User" homePage="/dashboard" />
      {children}
    </div>
  );
}