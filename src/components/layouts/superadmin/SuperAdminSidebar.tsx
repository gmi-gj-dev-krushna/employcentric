
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Building,
  ServerIcon,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  UserCircle,
  UserRound,
  ShieldCheck
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

interface SuperAdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

interface NavItem {
  label: string;
  icon: ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  {
    label: "System Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: "/superadmin",
  },
  {
    label: "Tenant Management",
    icon: <Building className="h-5 w-5" />,
    href: "/tenants",
  },
  {
    label: "Tenant Approvals",
    icon: <ShieldCheck className="h-5 w-5" />,
    href: "/tenant-approvals",
  },
  {
    label: "System Settings",
    icon: <ServerIcon className="h-5 w-5" />,
    href: "/system-settings",
  },
  {
    label: "Profile",
    icon: <UserRound className="h-5 w-5" />,
    href: "/profile",
  },
  {
    label: "Settings",
    icon: <Settings className="h-5 w-5" />,
    href: "/settings",
  },
];

export default function SuperAdminSidebar({ sidebarOpen, setSidebarOpen }: SuperAdminSidebarProps) {
  const { user } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="rounded-full"
        >
          {sidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-sidebar fixed inset-y-0 left-0 z-40 w-64 border-r border-sidebar-border transition-transform duration-300 ease-in-out",
          isMobile && !sidebarOpen && "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center justify-center border-b border-sidebar-border">
            <Link to="/superadmin" className="flex items-center gap-2">
              <div className="bg-primary rounded-lg p-1">
                <UserCircle className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-primary">
                EmployCentric
              </span>
            </Link>
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User menu */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>
                    {user?.name ? getInitials(user.name) : "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {user?.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
