import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useNavigate } from "react-router-dom";

export default function CardLogin() {
  const [userType, setUserType] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    const storedUserData = localStorage.getItem("userData");

    if (storedUserType && storedUserData) {
      setUserType(storedUserType);
      setUserData(JSON.parse(storedUserData));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!userData) {
    return (
      <Card className="text-center w-auto h-auto gap-2 justify-center bg-primary/90 text-white">
        <CardHeader>
          <CardTitle className="text-xl">Loading...</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 justify-center">
          <div>Please wait</div>
        </CardContent>
      </Card>
    );
  }

  if (userType == "shelter") {
    return (
      <Card className="text-center w-auto h-auto gap-2 justify-center bg-primary/90 text-white ">
        <CardHeader>
          <CardTitle className="text-xl">
            {userData.owner_name || "User"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 justify-center">
          <div className="break-all text-center">{userData.email}</div>
          <div>{userData.role}</div>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card className="text-center w-auto h-auto gap-2 justify-center bg-primary/90 text-white ">
        <CardHeader>
          <CardTitle className="text-xl break-words">
            {userData.name || "User"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 justify-center break-words">
          <div className="break-all text-center">{userData.email}</div>
          <div>{userData.role}</div>
        </CardContent>
      </Card>
    );
  }
}
