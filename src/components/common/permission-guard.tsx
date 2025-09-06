"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { User } from "@/types/type";

interface PermissionGuardProps {
  children: React.ReactNode;
  allowedPermissions: User["permission"][];
  fallbackPath?: string;
}

export function PermissionGuard({
  children,
  allowedPermissions,
  fallbackPath = "/403",
}: PermissionGuardProps) {
  const { userDetails, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!userDetails) {
      router.push("/login");
      return;
    }

    if (!allowedPermissions.includes(userDetails.permission)) {
      router.push(fallbackPath);
      return;
    }
  }, [userDetails, loading, allowedPermissions, fallbackPath, router]);

  // ローディング中または権限がない場合は何も表示しない
  if (
    loading ||
    !userDetails ||
    !allowedPermissions.includes(userDetails.permission)
  ) {
    return null;
  }

  return <>{children}</>;
}

// 便利なラッパーコンポーネント
export function AdminOnly({ children }: { children: React.ReactNode }) {
  return (
    <PermissionGuard allowedPermissions={["admin"]}>{children}</PermissionGuard>
  );
}

export function MentorOrAdmin({ children }: { children: React.ReactNode }) {
  return (
    <PermissionGuard allowedPermissions={["admin", "mentor"]}>
      {children}
    </PermissionGuard>
  );
}

export function StudentOnly({ children }: { children: React.ReactNode }) {
  return (
    <PermissionGuard allowedPermissions={["student"]}>
      {children}
    </PermissionGuard>
  );
}
