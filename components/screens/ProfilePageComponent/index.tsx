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
  } = useForm<{ email: string; password: string }>({
    mode: "onChange",
  });

  const handleUpdate = (data: { email?: string; password?: string }) => {
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
                <Input
                  id="password"
                  type="password"
                  {...updateInput("password")}
                />
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
