"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserProductsPage from "../UserProductsPage";
import UserSubscriptionsPage from "../UserSubscriptionsPage";
import { useUsers } from "../../../hooks/useUsers";
import { useEffect } from "react";

const DashboardPageComponent = () => {
  const { profileData } = useUsers();

  useEffect(() => {
    if (profileData)
      localStorage.setItem("currency", profileData.data?.data.currency!);
  }, [profileData]);

  return (
    <div className="flex items-center justify-center h-full w-full">
      <Tabs className="text-center" defaultValue="products">
        <TabsList className="mb-4">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <UserProductsPage />
        </TabsContent>
        <TabsContent value="subscriptions">
          <UserSubscriptionsPage />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPageComponent;
