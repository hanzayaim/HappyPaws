import { useState, useEffect } from "react";
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
import crypto from "crypto-js";
import axios from "axios";

const SECRET_KEY = "H4ppYP4W5S3ss1OnS3Cr3t2025";

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
  const { email, expiry, signature } = useParams();
  const decodedEmail = decodeURIComponent(email);
  const decodedSignature = decodeURIComponent(signature);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const [linkValid, setLinkValid] = useState(false);
  const [linkChecked, setLinkChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordLinkSchema),
  });

  useEffect(() => {
    validateResetLink();
  }, []);

  const validateResetLink = () => {
    try {
      if (!email || !expiry || !signature) {
        setLinkValid(false);
        setLinkChecked(true);
        return;
      }

      const expiryTime = parseInt(expiry);
      if (isNaN(expiryTime) || Date.now() > expiryTime) {
        setLinkValid(false);
        setLinkChecked(true);
        return;
      }

      const dataToSign = `${decodedEmail}:${expiry}`;
      const expectedSignature = crypto
        .HmacSHA256(dataToSign, SECRET_KEY)
        .toString();

      if (decodedSignature === expectedSignature) {
        setLinkValid(true);
      } else {
        setLinkValid(false);
      }
    } catch (error) {
      console.error("Error validating reset link:", error);
      setLinkValid(false);
    }

    setLinkChecked(true);
  };

  const onSubmit = async (data) => {
    if (!linkValid) {
      setSubmitStatus({
        type: "error",
        message: "Invalid or expired password reset link",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const shelterCheck = await axios.post(
        `/api/shelters/getShelterPassByEmail`,
        { email: decodedEmail }
      );

      const shelterResult = shelterCheck.data;

      if (!shelterResult.error) {
        const updateResponse = await axios.post(
          `/api/shelters/updatePassword`,
          {
            email: decodedEmail,
            newPassword: data.newPassword,
          }
        );

        const updateResult = updateResponse.data;

        if (updateResponse.status !== 200 || updateResult.error) {
          throw new Error(
            updateResult.error || "Failed to update shelter password"
          );
        }
      } else {
        const employeeCheck = await axios.post(
          `/api/employees/getEmployeePassByEmail`,
          {
            email: decodedEmail,
          }
        );

        const employeeResult = employeeCheck.data;

        if (!employeeResult.error) {
          const updateResponse = await axios.post(
            `/api/employees/updatePassword`,
            {
              email: decodedEmail,
              newPassword: data.newPassword,
            }
          );

          const updateResult = updateResponse.data;

          if (updateResponse.status !== 200 || updateResult.error) {
            throw new Error(
              updateResult.error || "Failed to update employee password"
            );
          }
        } else {
          throw new Error("Email not found in any account");
        }
      }

      const emailResponse = await axios.post(
        `/api/emails/email_reset_password_success`,
        {
          email: decodedEmail,
        }
      );

      if (emailResponse.status !== 200) {
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

              {!linkChecked ? (
                <div className="text-center py-4">Validating reset link...</div>
              ) : linkValid ? (
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
                    Invalid or expired password reset link. Please request a new
                    one.
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
