"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { Calendar, Mail, User, Shield } from "lucide-react";

export const UserProfileCard: React.FC = () => {
  const { userDetails, loading } = useAuth();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>ユーザー情報</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!userDetails) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>ユーザー情報</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            ユーザー情報を取得できませんでした
          </p>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPermissionColor = (permission: string) => {
    switch (permission) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "mentor":
        return "bg-blue-100 text-blue-800";
      case "student":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          ユーザー情報
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {userDetails.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{userDetails.name}</h3>
            <div className="flex gap-2 mt-1">
              <Badge className={getStatusColor(userDetails.status)}>
                {userDetails.status === "approved" && "承認済み"}
                {userDetails.status === "pending" && "承認待ち"}
                {userDetails.status === "rejected" && "拒否済み"}
              </Badge>
              <Badge className={getPermissionColor(userDetails.permission)}>
                {userDetails.permission === "admin" && "管理者"}
                {userDetails.permission === "mentor" && "メンター"}
                {userDetails.permission === "student" && "学生"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">メール:</span>
            <span>{userDetails.email}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">受講期:</span>
            <span>{userDetails.period}期</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">権限:</span>
            <span>
              {userDetails.permission === "admin" && "管理者"}
              {userDetails.permission === "mentor" && "メンター"}
              {userDetails.permission === "student" && "学生"}
            </span>
          </div>
        </div>

        <div className="pt-3 border-t">
          <div className="text-xs text-muted-foreground">
            <p>登録日: {userDetails.createdAt.toLocaleDateString("ja-JP")}</p>
            <p>最終更新: {userDetails.updatedAt.toLocaleDateString("ja-JP")}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
