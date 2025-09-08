"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  BookOpen,
  Code,
  LayoutDashboard,
  MenuIcon,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/articles", icon: BookOpen, label: "Articles" },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { userDetails } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="cursor-pointer">
        <MenuIcon className="size-6" />
      </SheetTrigger>
      <SheetContent className="w-[240px] sm:w-[400px]" side="left">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2 mt-8">
            <Code className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-gray-900">CodeCampas</span>
          </SheetTitle>
          <SheetDescription className="flex flex-col space-y-4 mt-4">
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
                  onClick={() => setOpen(false)}
                >
                  <item.icon className="size-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {userDetails?.permission !== "student" && (
              <Link
                href="/admin"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === "/admin"
                    ? "text-primary"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
                onClick={() => setOpen(false)}
              >
                <ShieldCheck className="size-4" />
                <span>Admin</span>
              </Link>
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
