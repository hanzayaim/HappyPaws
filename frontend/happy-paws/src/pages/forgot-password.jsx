import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import logo from "../assets/logo-hp.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export default function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const resetLink = `http://localhost:5173/forgot-password-link/${encodeURIComponent(
        data.email
      )}`;

      const response = await fetch(
        "http://localhost:3000/api/email/email_reset_password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            resetLink: resetLink,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Password reset link has been sent to your email address.",
        });
      } else {
        throw new Error(result.error || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Error sending reset link:", error);
      setSubmitStatus({
        type: "error",
        message: "Failed to send reset link. Please try again later.",
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
                Forgot Password?
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2">
                  <div className="grid gap-2">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      {...register("email")}
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="default"
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Reset Link"}
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
