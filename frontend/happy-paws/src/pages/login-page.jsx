import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import logo from "../assets/logo-hp.png";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Alert, AlertDescription } from "../components/ui/alert";
import { useState } from "react";
import { TriangleAlert } from "lucide-react";

const API_BASE_URL = "https://happypaws-production.up.railway.app";
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/auth/login", data, {
        withCredentials: true,
      });

      localStorage.setItem("userType", response.data.userType);
      localStorage.setItem("userData", JSON.stringify(response.data.userData));

      const userType = response.data.userType;
      const userData = response.data.userData;

      if (userType === "superuser" && userData.role === "Superuser") {
        navigate("/shelter-management");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data.message;

        if (status === 403 && error.response.data.status === "New") {
          setError(
            "Your account is pending activation. Please wait for administrator approval."
          );
        } else if (
          status === 403 &&
          error.response.data.status === "Inactive"
        ) {
          setError(
            "Your account is inactive. Please contact the administrator."
          );
        } else {
          setError(
            message || "Failed to login. Please check your credentials."
          );
        }
      } else if (error.request) {
        setError("No response from server. Please try again later.");
      } else {
        setError("An error occured. Please try again.");
      }
      console.error("Login error: ", error);
    } finally {
      setLoading(false);
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
              <CardTitle className="text-2xl text-center">Welcome !</CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert className="mb-4 bg-destructive text-white">
                  <AlertDescription className="flex items-center gap-2">
                    <TriangleAlert className="w-5 h-5 text-white shrink-0" />
                    <span className="text-white">{error}</span>
                  </AlertDescription>
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
                      disabled={loading}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      {...register("password")}
                      disabled={loading}
                    />
                    {errors.password && (
                      <p className="text-sm text-destructive">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <Link
                      to="/forgot-password"
                      className="text-sm hover:underline mt-1"
                    >
                      Forgot Password ?
                    </Link>
                  </div>
                  <Button
                    variant="default"
                    type="submit"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </form>
              <div className="text-sm flex mt-2 gap-1">
                Don't have an account ?
                <Link
                  to="/Register"
                  className="text-orange-500 hover:underline"
                >
                  Register
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
