import Header from "@/components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <Header logo="Admin" homePage="/admin-dashboard" />
      {children}
    </div>
  );
}
