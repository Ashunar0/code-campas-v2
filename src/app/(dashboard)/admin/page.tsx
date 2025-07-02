import { UserList } from "@/components/admin/user-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ユーザー管理 | CodeCampas",
  description: "ユーザー管理ページ",
};

export default function AdminUserManagement() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">ユーザー管理</h1>
      </div>

      <UserList />
    </div>
  );
}
