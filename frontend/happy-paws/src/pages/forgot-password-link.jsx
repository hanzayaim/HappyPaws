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

export default function ForgotPasswordLink() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setConfirmNewPasswordError(false);

    let hasError = false;

    if (confirmNewPassword !== newPassword) {
      setConfirmNewPasswordError(true);
      hasError = true;
    }

    if (hasError) return;
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
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                  <div className="grid gap-2">
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="New Password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Input
                      id="confirmNewPassword"
                      type="password"
                      placeholder="Confirm New Password"
                      required
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    {confirmNewPasswordError && (
                      <p className="text-sm text-red-500">
                        Passwords do not match.
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
