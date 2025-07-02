"use client";

import { SearchFilter } from "./seach-filter";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "../ui/table";
import {
  UserCheck,
  UserX,
  Mail,
  Trash2,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  Shield,
  User,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { toast } from "sonner";
import { mockUsers } from "@/lib/mockData";
import { StatsCard } from "./stats-card";

export const UserList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [periodFilter, setPeriodFilter] = useState<string>("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [users, setUsers] = useState(mockUsers);

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

  const pendingCount = users.filter((u) => u.status === "pending").length;
  const approvedCount = users.filter((u) => u.status === "approved").length;
  const rejectedCount = users.filter((u) => u.status === "rejected").length;

  const handleUserAction = (
    userId: string,
    action: "approve" | "reject" | "delete"
  ) => {
    setUsers((prevUsers) => {
      if (action === "delete") {
        return prevUsers.filter((u) => u.id !== userId);
      } else {
        return prevUsers.map((u) =>
          u.id === userId
            ? { ...u, status: action === "approve" ? "approved" : "rejected" }
            : u
        );
      }
    });

    const actionMessages = {
      approve: "User approved successfully",
      reject: "User rejected",
      delete: "User deleted",
    };

    toast.success(actionMessages[action]);
  };

  const handleBulkAction = (action: "approve" | "reject") => {
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        selectedUsers.includes(u.id)
          ? { ...u, status: action === "approve" ? "approved" : "rejected" }
          : u
      )
    );

    setSelectedUsers([]);
    toast.success(`${selectedUsers.length} users ${action}d`);
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-50 text-green-800">承認済み</Badge>;
      case "rejected":
        return <Badge className="bg-red-50 text-red-800">拒否済み</Badge>;
      default:
        return <Badge className="bg-yellow-50 text-yellow-800">承認待ち</Badge>;
    }
  };

  const getPermissionIcon = (permission: string) => {
    switch (permission) {
      case "admin":
        return <Shield className="h-4 w-4 text-red-600" />;
      case "mentor":
        return <Users className="h-4 w-4 text-blue-600" />;
      case "student":
        return <User className="h-4 w-4 text-green-600" />;
      default:
        return <User className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPermissionBadge = (permission: string) => {
    switch (permission) {
      case "admin":
        return <Badge className="bg-red-50 text-red-800">Admin</Badge>;
      case "mentor":
        return <Badge className="bg-blue-50 text-blue-800">Mentor</Badge>;
      case "student":
        return <Badge className="bg-green-50 text-green-800">Student</Badge>;
      default:
        return <Badge className="bg-gray-50 text-gray-800">User</Badge>;
    }
  };

  return (
    <div>
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
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">
                {selectedUsers.length} user{selectedUsers.length > 1 ? "s" : ""}{" "}
                selected
              </p>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={() => handleBulkAction("approve")}
                  className="h-8"
                >
                  <UserCheck className="h-4 w-4 mr-1" />
                  Approve All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction("reject")}
                  className="h-8"
                >
                  <UserX className="h-4 w-4 mr-1" />
                  Reject All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>ユーザー ({filteredUsers.length})</CardTitle>
          <CardDescription>
            ユーザーの管理と承認ステータスの管理
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        selectedUsers.length === filteredUsers.length &&
                        filteredUsers.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Permission</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={(checked) =>
                          handleSelectUser(user.id, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">Period {user.period}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(user.status)}
                        {getStatusBadge(user.status)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getPermissionIcon(user.permission)}
                        {getPermissionBadge(user.permission)}
                      </div>
                    </TableCell>
                    <TableCell>{user.createdAt.toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-1">
                        {user.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() =>
                                handleUserAction(user.id, "approve")
                              }
                              className="h-8 px-2"
                            >
                              <UserCheck className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleUserAction(user.id, "reject")
                              }
                              className="h-8 px-2"
                            >
                              <UserX className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-2"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUserAction(user.id, "delete")}
                          className="h-8 px-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Users not found
              </h3>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
