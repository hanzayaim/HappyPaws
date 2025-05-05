import { Link, useNavigate } from "react-router-dom";
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
import axios from "axios";
import { useState } from "react";
import SuccessDialog from "../components/pages-components/RegisterSuccessDialog";

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
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(employeeSchema),
  });

  const genderValue = watch("gender");
  const roleValue = watch("role");
  const shelterValue = watch("shelter");

  const onSubmit = async (data) => {
    try {
      const searchShelterIdRes = await axios.get(
        `http://localhost:3000/api/shelters/getShelterData`
      );

      const rawData = searchShelterIdRes.data;
      const shelterData = Array.isArray(rawData)
        ? rawData
        : rawData?.data || [];

      if (shelterData.error) {
        throw new Error(shelterData.error);
      }

      const matchedShelter = shelterData.find(
        (shelter) => shelter.shelter_name === data.shelter
      );

      if (!matchedShelter) {
        throw new Error("Shelter not found");
      }

      const shelterId = matchedShelter.id_shelter;
      const shelterEmail = matchedShelter.email;

      if (data.email === shelterEmail) {
        setError("email", {
          type: "manual",
          message: "Email cannot be the same as the shelter owner's email.",
        });
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/employees/insertEmployee",
        {
          id_shelter: shelterId,
          name: data.employeeName,
          email: data.email,
          password: data.password,
          role: data.role,
          gender: data.gender,
          shelter_name: data.shelter,
          phone_number: data.employeePhoneNumber,
          address: data.employeeAddress,
        }
      );

      await axios.post(" http://localhost:3000/api/email/email_register_all", {
        email: data.email,
      });

      await axios.post(
        " http://localhost:3000/api/email/email_register_employee",
        {
          email: shelterEmail,
        }
      );

      const result = response.data;

      if (result.error) {
        throw new Error(result.message || "Failed to create account");
      }

      setShowSuccess(true);
      reset();
    } catch (error) {
      console.error("Error creating employee:", error);
      const message =
        error?.response?.data?.message || error?.message || "Unknown error";

      if (message.includes("email")) {
        setError("email", {
          type: "manual",
          message: "Email is already registered.",
        });
      } else if (message.includes("phone_number")) {
        setError("employeePhoneNumber", {
          type: "manual",
          message: "Phone Number is already registered.",
        });
      }
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
