import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useState } from "react";

export default function RegisterOwner() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setPhoneNumberError(false);
    setConfirmPasswordError(false);

    let hasError = false;

    if (confirmPassword !== password) {
      setConfirmPasswordError(true);
      hasError = true;
    }

    if (phoneNumber.length < 10 || isNaN(phoneNumber)) {
      setPhoneNumberError(true);
      hasError = true;
    }

    if (hasError) return;
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
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                  <div className="grid gap-2">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {confirmPasswordError && (
                      <p className="text-sm text-red-500">
                        Passwords do not match.
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Input
                      id="shelterName"
                      type="text"
                      placeholder="Shelter Name"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Input
                      id="shelterOwnerName"
                      type="text"
                      placeholder="Owner Name"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Input
                      id="shelterPhoneNumber"
                      type="text"
                      placeholder="Phone Number (ex: 08XXXXXXX)"
                      required
                      pattern="[0-9]+"
                      inputMode="numeric"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    {phoneNumberError && (
                      <p className="text-sm text-red-500">
                        Please enter a valid phone number (08XXXXXXX).
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Input
                      id="shelterAddress"
                      type="text"
                      placeholder="Shelter Address"
                      required
                    />
                  </div>
                  <Button
                    variant="default"
                    type="submit"
                    className="w-full mt-2"
                  >
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
