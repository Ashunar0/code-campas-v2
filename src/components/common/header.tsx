"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookOpen, LayoutDashboard, LogOut, Code } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Badge } from "../ui/badge";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { user, userDetails } = useAuth();
  const router = useRouter();

  const navItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/articles", icon: BookOpen, label: "Articles" },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("ログアウトしました");
    router.push("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 h-16">
      <div className="w-full mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="#" className="md:flex items-center space-x-2 hidden">
              <Code className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-gray-900">
                CodeCampas
              </span>
            </Link>

            <nav className="hidden md:flex space-x-2">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {userDetails?.permission === "admin" && (
                <Link
                  href="/admin"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === "/admin"
                      ? "text-primary"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <span>Admin</span>
                </Link>
              )}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10 cursor-pointer">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {userDetails?.name
                        ? userDetails.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                        : user?.email?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center justify-start gap-2 p-2 pt-4">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="text-sm font-semibold text-gray-900">
                      {userDetails?.name || user?.email}
                    </p>
                    <p className="w-[200px] truncate text-sm text-gray-500">
                      {user?.email}
                    </p>
                    {userDetails && (
                      <Badge className="bg-gray-50 text-gray-800">
                        {userDetails.permission}
                      </Badge>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
