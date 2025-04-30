import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import logo from "../assets/logo-hp.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const forgotPasswordLinkSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords do not match",
  });

export default function ForgotPasswordLink() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordLinkSchema),
  });

  const onSubmit = (data) => {
    console.log("Submitted: ", data);
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 ">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <div className="flex justify-center">
                <img src={logo} alt="Logo" className="h-20 w-auto mb-2" />
              </div>
              <CardTitle className="text-2xl text-center">
                Forgot Password ?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2">
                  <div className="grid gap-2">
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="New Password"
                      {...register("newPassword")}
                    />
                    {errors.newPassword && (
                      <p className="text-sm text-red-500">
                        {errors.newPassword.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Input
                      id="confirmNewPassword"
                      type="password"
                      placeholder="Confirm New Password"
                      {...register("confirmNewPassword")}
                    />
                    {errors.confirmNewPassword && (
                      <p className="text-sm text-red-500">
                        {errors.confirmNewPassword.message}
                      </p>
                    )}
                  </div>
                  <Button variant="default" type="submit" className="w-full ">
                    Change Password
                  </Button>
                </div>
              </form>
              <div className="text-sm flex mt-2 gap-1">
                Already have an account ?
                <Link to="/login" className="text-orange-500 hover:underline">
                  Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
