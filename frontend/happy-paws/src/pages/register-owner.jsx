import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import SuccessDialog from "../components/pages-components/RegisterSuccessDialog";
import { useState } from "react";

const ownerSchema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    shelterName: z.string().min(1, "Shelter name is required "),
    shelterOwnerName: z.string().min(1, "Owner name is required"),
    shelterPhoneNumber: z
      .string()
      .regex(/^\d{10,}$/, "Please enter a valid phone number (08XXXXXXX)"),
    shelterAddress: z.string().min(1, "Address is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterOwner() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ownerSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.post("/api/shelters/insertShelter", {
        owner_name: data.shelterOwnerName,
        email: data.email,
        password: data.password,
        shelter_name: data.shelterName,
        phone_number: data.shelterPhoneNumber,
        address: data.shelterAddress,
      });

      const result = response.data;

      await axios.post("/api/email/email_register_all", {
        email: data.email,
      });

      await axios.post("/api/email/email_register_owner");

      if (result.error) {
        throw new Error(result.message || "Failed to create account");
      }

      setShowSuccess(true);
      reset();
    } catch (error) {
      console.error("Error creating shelter:", error);
      const message =
        error?.response?.data?.message || error?.message || "Unknown error";

      if (message.includes("email")) {
        setError("email", {
          type: "manual",
          message: "Email is already registered.",
        });
      } else if (message.includes("phone_number")) {
        setError("shelterPhoneNumber", {
          type: "manual",
          message: "Phone Number is already registered.",
        });
      } else if (message.includes("shelter_name")) {
        setError("shelterName", {
          type: "manual",
          message: "Shelter name is already taken.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Register Owner Shelter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-2">
                    <Input {...register("email")} placeholder="Email" />
                    {errors.email && (
                      <p className="text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    )}

                    <Input
                      type="password"
                      placeholder="Password"
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="text-sm text-destructive">
                        {errors.password.message}
                      </p>
                    )}

                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-destructive">
                        {errors.confirmPassword.message}
                      </p>
                    )}

                    <Input
                      placeholder="Shelter Name"
                      {...register("shelterName")}
                    />
                    {errors.shelterName && (
                      <p className="text-sm text-destructive">
                        {errors.shelterName.message}
                      </p>
                    )}

                    <Input
                      placeholder="Owner Name"
                      {...register("shelterOwnerName")}
                    />
                    {errors.shelterOwnerName && (
                      <p className="text-sm text-destructive">
                        {errors.shelterOwnerName.message}
                      </p>
                    )}

                    <Input
                      placeholder="Phone Number (ex: 08XXXXXXX)"
                      inputMode="numeric"
                      {...register("shelterPhoneNumber")}
                    />
                    {errors.shelterPhoneNumber && (
                      <p className="text-sm text-destructive">
                        {errors.shelterPhoneNumber.message}
                      </p>
                    )}

                    <Input
                      placeholder="Shelter Address"
                      {...register("shelterAddress")}
                    />
                    {errors.shelterAddress && (
                      <p className="text-sm text-destructive">
                        {errors.shelterAddress.message}
                      </p>
                    )}

                    <Button
                      type="submit"
                      className="w-full mt-2 flex items-center justify-center gap-2"
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      )}
                      {isLoading ? "Registering..." : "Register"}
                    </Button>
                  </div>
                </form>
                <div className="text-sm flex mt-2 items-center justify-center gap-1">
                  Already have an account?
                  <Link to="/login" className="text-orange-500 hover:underline">
                    Login
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <SuccessDialog
        open={showSuccess}
        onOpenChange={(open) => {
          setShowSuccess(open);
          if (!open) {
            navigate("/login");
          }
        }}
      />
    </>
  );
}
