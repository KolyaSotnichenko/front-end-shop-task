"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActions } from "@/hooks/useActions";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { IAuthInput } from "@/components/screens/AuthPage/auth.interface";

const LoginPage = () => {
  const { register } = useActions();

  const {
    register: registerInput,
    handleSubmit,
    reset,
  } = useForm<IAuthInput>({
    mode: "onChange",
  });

  const handleLoginSubmit = (data: IAuthInput) => {
    register(data);
    localStorage.setItem("currency", "usd");
    reset();
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <div className="w-full m-auto bg-white lg:max-w-lg">
        <form onSubmit={handleSubmit(handleLoginSubmit)}>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Sign up</CardTitle>
              <CardDescription className="text-center">
                Enter your email and password to register
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder=""
                  {...registerInput("email")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...registerInput("password")}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-y-7">
              <Button className="w-full" type="submit">
                Register
              </Button>
              <div className="flex gap-x-10">
                <p>Do you have an account?</p>
                <Link className="text-blue-500" href="/">
                  login
                </Link>
              </div>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
