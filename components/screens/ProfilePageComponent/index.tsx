"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useUsers } from "../AdminUsersPage/useUsers";

const ProfilePageComponent = () => {
  const { profileData, updateProfileAsync } = useUsers();

  const {
    register: updateInput,
    handleSubmit,
    reset,
  } = useForm<{
    email: string;
    password: string;
    organization: string;
    address: string;
    currency: string;
  }>({
    mode: "onChange",
  });

  const handleUpdate = (data: {
    email?: string;
    password?: string;
    organization?: string;
    address?: string;
    currency?: string;
  }) => {
    updateProfileAsync(data);
    reset();
  };

  return (
    <div className="relative flex justify-center items-center h-full">
      <div className="w-full m-auto bg-white lg:max-w-lg">
        <form onSubmit={handleSubmit(handleUpdate)}>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Profile</CardTitle>
              <CardDescription className="text-center">
                You can update your info here!
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={profileData.data?.data.email}
                  {...updateInput("email")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="text" {...updateInput("password")} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" type="text" {...updateInput("address")} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  type="text"
                  {...updateInput("organization")}
                />
              </div>
              <div className="grid gap-2">
                <div className="items-top flex space-x-2">
                  <select
                    className="w-full cursor-pointer"
                    {...updateInput("currency")}
                  >
                    <option value="">Select currency...</option>
                    <option value="eur">EUR</option>
                    <option value="usd">USD</option>
                    <option value="uah">UAH</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-x-10">
              <Button className="w-full" type="submit">
                Update
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default ProfilePageComponent;
