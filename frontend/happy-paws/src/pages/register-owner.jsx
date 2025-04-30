import { Link } from "react-router-dom";
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ownerSchema),
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
    reset();
  };

  return (
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

                  <Button type="submit" className="w-full mt-2">
                    Register
                  </Button>
                </div>
              </form>
              <div className="text-sm flex mt-2 items-center justify-center gap-1">
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
