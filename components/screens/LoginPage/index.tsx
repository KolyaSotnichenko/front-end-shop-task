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
import { IAuthInput } from "../AuthPage/auth.interface";
import Link from "next/link";

const LoginPage = () => {
  const { login } = useActions();

  const {
    register: registerInput,
    handleSubmit,
    reset,
  } = useForm<IAuthInput>({
    mode: "onChange",
  });

  const handleLoginSubmit = (data: IAuthInput) => {
    login(data);
    localStorage.setItem("currency", "usd");
    reset();
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <div className="w-full m-auto bg-white lg:max-w-lg">
        <form onSubmit={handleSubmit(handleLoginSubmit)}>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Sign in</CardTitle>
              <CardDescription className="text-center">
                Enter your email and password to login
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
                Login
              </Button>
              <div className="flex gap-x-10">
                <p>Don't have an account?</p>
                <Link className="text-blue-500" href="/sign-up">
                  register
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
