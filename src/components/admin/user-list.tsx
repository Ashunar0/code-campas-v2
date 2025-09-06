"use client";

import { SearchFilter } from "./search-filter";

import { Users, CheckCircle, Clock, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { StatsCard } from "./stats-card";
import { supabase } from "@/lib/supabase";
import { User as UserType } from "@/types/type";
import { BulkActions } from "./bulk-actions";

import { UserTable } from "./user-table";

export const UserList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [periodFilter, setPeriodFilter] = useState<string>("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);

  const pendingCount = users.filter((u) => u.status === "pending").length;
  const approvedCount = users.filter((u) => u.status === "approved").length;
  const rejectedCount = users.filter((u) => u.status === "rejected").length;

  useEffect(() => {
    // supabaseからユーザーの一覧を取得
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("User")
        .select("*")
        .order("createdAt", { ascending: false });
      if (error) {
        console.error(error);
      }
      setUsers(data as UserType[]);
    };

    fetchUsers();
  }, [users]);

  // フィルター
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    const matchesPeriod =
      periodFilter === "all" || user.period.toString() === periodFilter;

    return matchesSearch && matchesStatus && matchesPeriod;
  });

  const handleBulkAction = async (action: "approve" | "reject") => {
    try {
      const { error } = await supabase
        .from("User")
        .update({ status: action === "approve" ? "approved" : "rejected" })
        .in("id", selectedUsers);

      if (error) {
        console.error(error);
        toast.error("ユーザーのステータス更新に失敗しました");
      }

      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          selectedUsers.includes(u.id)
            ? { ...u, status: action === "approve" ? "approved" : "rejected" }
            : u
        )
      );

      setSelectedUsers([]);
      toast.success(
        `${selectedUsers.length}件のユーザーを${
          action === "approve" ? "承認" : "拒否"
        }しました`
      );
    } catch (error) {
      console.error(error);
      toast.error("ユーザーのステータス更新に失敗しました");
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers((prev) => [...prev, userId]);
    } else {
      setSelectedUsers((prev) => prev.filter((id) => id !== userId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers.map((u) => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  // ユーザー認証
  // 対象のユーザーのstatusをapprovedにする
  const handleUserApprove = async (userId: string) => {
    try {
      const { error } = await supabase
        .from("User")
        .update({
          status: "approved",
        })
        .eq("id", userId);

      console.log("userId", userId);

      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === userId ? { ...u, status: "approved" } : u
        )
      );

      if (error) {
        console.error(error);
        toast.error("ユーザー認証に失敗しました：" + error.message);
      }

      toast.success("ユーザー認証が完了しました");
    } catch (error) {
      console.error(error);
      toast.error("ユーザー認証に失敗しました");
    }
  };

  // ユーザー拒否
  const handleUserReject = async (userId: string) => {
    try {
      const { error } = await supabase
        .from("User")
        .update({ status: "rejected" })
        .eq("id", userId);

      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === userId ? { ...u, status: "rejected" } : u
        )
      );
      if (error) {
        console.error(error);
        toast.error("ユーザー拒否に失敗しました：" + error.message);
      }
      toast.success("ユーザー拒否が完了しました");
    } catch (error) {
      console.error(error);
      toast.error("ユーザー拒否に失敗しました");
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="ユーザー数"
          value={users.length}
          icon={<Users className="h-8 w-8 text-blue-600" />}
        />

        <StatsCard
          title="承認待ち"
          value={pendingCount}
          icon={<Clock className="h-8 w-8 text-yellow-600" />}
        />

        <StatsCard
          title="承認済み"
          value={approvedCount}
          icon={<CheckCircle className="h-8 w-8 text-green-600" />}
        />

        <StatsCard
          title="拒否済み"
          value={rejectedCount}
          icon={<XCircle className="h-8 w-8 text-red-600" />}
        />
      </div>
      {/* Filters and Search */}
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        periodFilter={periodFilter}
        setPeriodFilter={setPeriodFilter}
      />

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <BulkActions
          selectedUsers={selectedUsers}
          onBulkAction={handleBulkAction}
        />
      )}

      {/* Users Table */}
      <UserTable
        selectedUsers={selectedUsers}
        onSelectUser={handleSelectUser}
        onSelectAll={handleSelectAll}
        filteredUsers={filteredUsers}
        onApprove={handleUserApprove}
        onReject={handleUserReject}
      />
    </div>
  );
};
