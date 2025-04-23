import {
  ClipboardPlus,
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
import { Link } from "react-router-dom";
import CardLogin from "./card-login";
import LogoFooter from "../../assets/logo-hp.png";
import { SidebarFooter } from "../ui/sidebar";

const items = [
  {
    title: "User Management",
    url: "#",
    icon: UserRoundCog,
  },
  {
    title: "Animal Management",
    url: "#",
    icon: PawPrint,
  },
  {
    title: "Finance Management",
    url: "#",
    icon: Landmark,
  },
  {
    title: "Medical Management",
    url: "#",
    icon: ClipboardPlus,
  },
  {
    title: "Inventory Management",
    url: "#",
    icon: Warehouse,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="flex flex-col justify-between h-full">
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="mt-3">
              <CardLogin />
            </div>
            <SidebarMenu className="mt-5">
              {items.map((item) => (
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
              <Button variant="alert" className="w-full justify-center mt-5">
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
