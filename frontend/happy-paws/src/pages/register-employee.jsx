import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import GenderCombobox from "../components/pages-components/gender-combobox";
import RolesCombobox from "../components/pages-components/role-combobox";
import ShelterCombobox from "../components/pages-components/shelterlist-combobox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const employeeSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    employeeName: z.string().min(1, "Name is required"),
    employeePhoneNumber: z
      .string()
      .regex(/^\d{10,}$/, "Invalid phone number (08XXXXXXX)"),
    employeeAddress: z.string().min(1, "Address is required"),
    gender: z.string().min(1, "Gender is required"),
    role: z.string().min(1, "Role is required"),
    shelter: z.string().min(1, "Shelter is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterEmployee() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(employeeSchema),
  });

  const genderValue = watch("gender");
  const roleValue = watch("role");
  const shelterValue = watch("shelter");

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
                Register Employee Shelter
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
                    placeholder="Employee Name"
                    {...register("employeeName")}
                  />
                  {errors.employeeName && (
                    <p className="text-sm text-destructive">
                      {errors.employeeName.message}
                    </p>
                  )}

                  <Input
                    placeholder="Phone Number (ex: 08XXXXXXX)"
                    inputMode="numeric"
                    {...register("employeePhoneNumber")}
                  />
                  {errors.employeePhoneNumber && (
                    <p className="text-sm text-destructive">
                      {errors.employeePhoneNumber.message}
                    </p>
                  )}

                  <Input
                    placeholder="Employee Address"
                    {...register("employeeAddress")}
                  />
                  {errors.employeeAddress && (
                    <p className="text-sm text-destructive">
                      {errors.employeeAddress.message}
                    </p>
                  )}

                  <GenderCombobox
                    value={genderValue}
                    onChange={(val) => setValue("gender", val)}
                  />
                  {errors.gender && (
                    <p className="text-sm text-destructive">
                      {errors.gender.message}
                    </p>
                  )}

                  <RolesCombobox
                    value={roleValue}
                    onChange={(val) => setValue("role", val)}
                  />
                  {errors.role && (
                    <p className="text-sm text-destructive">
                      {errors.role.message}
                    </p>
                  )}

                  <ShelterCombobox
                    value={shelterValue}
                    onChange={(val) => setValue("shelter", val)}
                  />
                  {errors.shelter && (
                    <p className="text-sm text-destructive">
                      {errors.shelter.message}
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
