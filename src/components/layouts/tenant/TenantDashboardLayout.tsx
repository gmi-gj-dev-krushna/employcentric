
import { ReactNode, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import TenantSidebar from "./TenantSidebar";
import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

interface TenantDashboardLayoutProps {
  children: ReactNode;
}

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Employees",
    href: "/employees",
  },
  {
    label: "Attendance",
    href: "/attendance",
  },
  {
    label: "Leave Management",
    href: "/leave",
  },
  {
    label: "Payroll",
    href: "/payroll",
  },
  {
    label: "Recruitment",
    href: "/recruitment",
  },
];

export default function TenantDashboardLayout({ children }: TenantDashboardLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <TenantSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <main
        className={cn(
          "flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out",
          sidebarOpen ? "lg:ml-64" : "ml-0"
        )}
      >
        {/* Header */}
        <header className="h-16 border-b border-border bg-background/95 backdrop-blur sticky top-0 z-30 flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold">
            {navItems.find((item) => item.href === location.pathname)?.label ||
              "EmployCentric"}
          </h1>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Bell className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between px-4 py-2 border-b">
                  <span className="font-medium">Notifications</span>
                  <Button variant="ghost" size="sm">
                    Mark all as read
                  </Button>
                </div>
                <div className="py-2 px-4">
                  <p className="text-sm text-muted-foreground">
                    No new notifications
                  </p>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 h-9"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>
                      {user?.name ? getInitials(user.name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-block">
                    {user?.name?.split(" ")[0]}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-2 p-2">
                  <div className="flex flex-col space-y-0.5">
                    <span className="text-sm font-medium">{user?.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {user?.email}
                    </span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">
                    <UserRound className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 p-6 overflow-auto">{children}</div>
      </main>
    </div>
  );
}
