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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IAuthInput } from "./auth.interface";

const AuthPage = () => {
  const { login, register } = useActions();

  const [type, setType] = useState<"login" | "register">("login");

  const {
    register: registerInput,
    handleSubmit,
    reset,
  } = useForm<IAuthInput>({
    mode: "onChange",
  });

  const handleLoginSubmit = (data: IAuthInput) => {
    login(data);
    reset();
  };

  const handleRegisterSubmit = (data: IAuthInput) => {
    register(data);
    reset();
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <div className="w-full m-auto bg-white lg:max-w-lg">
        <form
          onSubmit={handleSubmit(
            type === "login" ? handleLoginSubmit : handleRegisterSubmit
          )}
        >
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">
                Sign in / Sign Up
              </CardTitle>
              <CardDescription className="text-center">
                Enter your email and password to login or register
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
            <CardFooter className="flex gap-x-10">
              <Button className="w-full" onClick={() => setType("login")}>
                Login
              </Button>
              <Button className="w-full" onClick={() => setType("register")}>
                Register
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
