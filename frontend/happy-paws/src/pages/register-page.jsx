import { UserRound, UsersRound } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card className="text-center w-full max-w-xl h-auto p-15 gap-6 justify-center">
            <CardHeader>
              <CardTitle className="text-2xl">Register</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4 justify-center">
              <Button
                variant="outline"
                className="flex flex-col justify-center gap-2 p-6 w-35 h-auto"
                onClick={() => navigate("./register-owner")}
              >
                <UserRound className="size-9" />
                <span className="text-base">Owner Shelter</span>
              </Button>

              <Button
                variant="outline"
                className="flex flex-col justify-center gap-2 p-6 w-35 h-auto"
                onClick={() => navigate("./register-employee")}
              >
                <UsersRound className="size-9" />
                <span className="text-base">Employee Shelter</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
