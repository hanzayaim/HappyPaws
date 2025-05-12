import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import logo from "../assets/logo-hp.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

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
  const { email } = useParams();
  const decodedEmail = decodeURIComponent(email);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const [emailValid, setEmailValid] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordLinkSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const shelterCheck = await fetch(
        `${API_BASE_URL}/api/shelters/getShelterPassByEmail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: decodedEmail }),
        }
      );

      const shelterResult = await shelterCheck.json();

      if (!shelterResult.error) {
        const updateResponse = await fetch(
          `${API_BASE_URL}/api/shelters/updatePassword`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: decodedEmail,
              newPassword: data.newPassword,
            }),
          }
        );

        const updateResult = await updateResponse.json();

        if (!updateResponse.ok) {
          throw new Error(
            updateResult.error || "Failed to update shelter password"
          );
        }
      } else {
        const employeeCheck = await fetch(
          `${API_BASE_URL}/api/employees/getEmployeePassByEmail`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: decodedEmail }),
          }
        );

        const employeeResult = await employeeCheck.json();

        if (!employeeResult.error) {
          const updateResponse = await fetch(
            `${API_BASE_URL}/api/employees/updatePassword`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: decodedEmail,
                newPassword: data.newPassword,
              }),
            }
          );

          const updateResult = await updateResponse.json();

          if (!updateResponse.ok) {
            throw new Error(
              updateResult.error || "Failed to update employee password"
            );
          }
        } else {
          setEmailValid(false);
          throw new Error("Email not found in any account");
        }
      }

      const emailResponse = await fetch(
        "/api/emails/email_reset_password_success",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: decodedEmail }),
        }
      );

      if (!emailResponse.ok) {
        console.error("Failed to send success email, but password was reset");
      }

      setSubmitStatus({
        type: "success",
        message:
          "Password has been reset successfully. Redirecting to login...",
      });

      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: error.message || "Failed to reset password",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                Reset Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              {submitStatus.message && (
                <Alert
                  className={`mb-4 ${
                    submitStatus.type === "success"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  }`}
                >
                  <AlertDescription>{submitStatus.message}</AlertDescription>
                </Alert>
              )}

              {emailValid ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-2">
                    <div className="grid gap-2">
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="New Password"
                        {...register("newPassword")}
                        disabled={isSubmitting}
                      />
                      {errors.newPassword && (
                        <p className="text-sm text-destructive">
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
                        disabled={isSubmitting}
                      />
                      {errors.confirmNewPassword && (
                        <p className="text-sm text-destructive">
                          {errors.confirmNewPassword.message}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="default"
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "Change Password"}
                    </Button>
                  </div>
                </form>
              ) : (
                <Alert className="mb-4 bg-red-50 text-red-700 border-red-200">
                  <AlertDescription>
                    Invalid password reset link. Please request a new one.
                  </AlertDescription>
                </Alert>
              )}

              <div className="text-sm flex mt-2 gap-1">
                Remember your password?
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
