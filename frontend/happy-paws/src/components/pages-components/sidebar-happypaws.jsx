import {
  ClipboardPlus,
  FolderSync,
  HeartHandshake,
  Landmark,
  LogOut,
  PawPrint,
  UserRoundCog,
  Warehouse,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import CardLogin from "./card-login";
import LogoFooter from "../../assets/logo-hp.png";
import { SidebarFooter } from "../ui/sidebar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AppSidebar() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    const storedUserData = localStorage.getItem("userData");

    if (storedUserType && storedUserData) {
      setUserType(storedUserType);
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout", { withCredentials: true });

      localStorage.removeItem("userType");
      localStorage.removeItem("userData");

      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getUserManagementUrl = () => {
    if (userType === "shelter" && userData?.role === "Owner") {
      return "/employee-management";
    } else if (userType === "superuser" && userData?.role === "Superuser") {
      return "/shelter-management";
    }
  };

  const getMenuItems = () => {
    const baseItems = [
      {
        title: "User Management",
        url: getUserManagementUrl(),
        icon: UserRoundCog,
      },
      {
        title: "Animal Management",
        url: "/animal-management",
        icon: PawPrint,
      },
      {
        title: "Finance Management",
        url: "/finance-management",
        icon: Landmark,
      },
      {
        title: "Medical Management",
        url: "/medical-management",
        icon: ClipboardPlus,
      },
      {
        title: "Adopter Management",
        url: "/adopter-management",
        icon: HeartHandshake,
      },
      {
        title: "Inventory Management",
        url: "/inventory-management",
        icon: Warehouse,
      },
      {
        title: "Data Convert",
        url: "/data-convert",
        icon: FolderSync,
      },
    ];

    if (userType === "superuser" && userData?.role === "Superuser") {
      return baseItems.filter((item) => item.title === "User Management");
    }

    if (userType === "shelter" && userData?.role === "Owner") {
      return baseItems;
    }

    if (userType === "employee" && userData?.role === "Finance") {
      return baseItems.filter((item) =>
        [
          "Medical Management",
          "Finance Management",
          "Inventory Management",
          "Data Convert",
        ].includes(item.title)
      );
    }

    if (userType === "employee" && userData?.role === "Administrator") {
      return baseItems.filter((item) =>
        [
          "Animal Management",
          "Adopter Management",
          "Inventory Management",
          "Data Convert",
        ].includes(item.title)
      );
    }

    if (userType === "employee" && userData?.role === "Medical") {
      return baseItems.filter((item) =>
        ["Medical Management", "Finance Management", "Data Convert"].includes(
          item.title
        )
      );
    }

    return [];
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar>
      <SidebarContent className="flex flex-col justify-between h-full">
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="mt-3">
              <CardLogin />
            </div>
            <SidebarMenu className="mt-5">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon className="!w-6 !h-6" strokeWidth={1.5} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <div>
              <Button
                variant="alert"
                className="w-full justify-center mt-5"
                onClick={handleLogout}
              >
                <LogOut />
                Sign Out
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
          <div className="flex flex-col items-center justify-center mt-4 mb-2">
            <img src={LogoFooter} alt="Logo" className="h-25 w-auto mb-1" />
            <p className="text-xs text-muted-foreground">
              &copy; 2025 HappyPaws. All rights reserved.
            </p>
          </div>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
