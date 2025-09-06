"use client";

import { Header } from "@/components/common/header";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, userDetails, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
        return;
      }

      if (userDetails && userDetails.status !== "approved") {
        router.push("/login");
        return;
      }
    }
  }, [user, userDetails, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!user || (userDetails && userDetails.status !== "approved")) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 px-4 py-8 md:px-16 md:py-12 h-[calc(100vh-64px)] bg-gray-50 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
