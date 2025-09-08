"use client";

import { SearchFilter } from "./search-filter";
import { Users, CheckCircle, Clock, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { StatsCard } from "./stats-card";
import { User as UserType } from "@/types/type";
import { BulkActions } from "./bulk-actions";
import { UserTable } from "./user-table";

import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

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
    const usersRef = collection(db, "users");
    const q = query(usersRef, orderBy("period", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data: UserType[] = snapshot.docs.map((docSnap) => {
          const raw = docSnap.data() as any;
          return { ...raw, uid: raw?.uid ?? docSnap.id } as UserType;
        });
        setUsers(data);
      },
      (error) => {
        console.error("Error subscribing users:", error);
      }
    );

    return () => unsubscribe();
  }, []);

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
      const validUids = selectedUsers.filter(
        (id) => typeof id === "string" && id.length > 0
      );
      if (validUids.length === 0) {
        toast.error("対象ユーザーが選択されていません");
        return;
      }

      await Promise.all(
        validUids.map(async (uid) => {
          const userRef = doc(db, "users", uid);
          await updateDoc(userRef, {
            status: action === "approve" ? "approved" : "rejected",
          });
        })
      );

      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          selectedUsers.includes(u.uid)
            ? { ...u, status: action === "approve" ? "approved" : "rejected" }
            : u
        )
      );

      setSelectedUsers([]);
      toast.success(
        `${validUids.length}件のユーザーを${
          action === "approve" ? "承認" : "拒否"
        }しました`
      );
    } catch (error) {
      console.error(error);
      toast.error("ユーザーのステータス更新に失敗しました");
    }
  };

  const handleSelectUser = (uid: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers((prev) => [...prev, uid]);
    } else {
      setSelectedUsers((prev) => prev.filter((id) => id !== uid));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers.map((u) => u.uid));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleUserApprove = async (uid: string) => {
    try {
      if (!uid) {
        toast.error("ユーザーIDが不正です");
        return;
      }
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, { status: "approved" });

      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.uid === uid ? { ...u, status: "approved" } : u))
      );

      toast.success("ユーザー認証が完了しました");
    } catch (error) {
      console.error(error);
      toast.error("ユーザー認証に失敗しました");
    }
  };

  const handleUserReject = async (uid: string) => {
    try {
      if (!uid) {
        toast.error("ユーザーIDが不正です");
        return;
      }
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, { status: "rejected" });

      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.uid === uid ? { ...u, status: "rejected" } : u))
      );

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
