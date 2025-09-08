"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import {
  UserCheck,
  UserX,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Shield,
  User,
} from "lucide-react";
import { EditDialog } from "./edit-dialog";
import { format } from "date-fns";
import { User as UserType } from "@/types/type";
import { Badge } from "../ui/badge";

interface UserTableProps {
  filteredUsers: UserType[];
  selectedUsers: string[];
  onSelectUser: (userId: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onApprove: (userId: string) => void;
  onReject: (userId: string) => void;
}

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
      return <Users className="h-4 w-4 text-green-600" />;
    case "student":
      return <User className="h-4 w-4 text-blue-600" />;
    default:
      return <User className="h-4 w-4 text-gray-600" />;
  }
};

const getPermissionBadge = (permission: string) => {
  switch (permission) {
    case "admin":
      return <Badge className="bg-red-50 text-red-800">Admin</Badge>;
    case "mentor":
      return <Badge className="bg-green-50 text-green-800">Mentor</Badge>;
    case "student":
      return <Badge className="bg-blue-50 text-blue-800">Student</Badge>;
    default:
      return <Badge className="bg-gray-50 text-gray-800">User</Badge>;
  }
};

export const UserTable = ({
  filteredUsers,
  selectedUsers,
  onSelectUser,
  onSelectAll,
  onApprove,
  onReject,
}: UserTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ユーザー ({filteredUsers.length})</CardTitle>
        <CardDescription>ユーザーの管理と承認ステータスの管理</CardDescription>
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
                    onCheckedChange={onSelectAll}
                    className="cursor-pointer"
                  />
                </TableHead>
                <TableHead>名前</TableHead>
                <TableHead>メールアドレス</TableHead>
                <TableHead>受講期</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>権限</TableHead>
                <TableHead>登録日</TableHead>
                <TableHead className="text-right">アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => {
                const createdAt: Date = user.createdAt as Date;
                const createdAtDate: Date = createdAt;
                const formatedDate = format(createdAtDate, "yyyy/MM/dd");
                return (
                  <TableRow key={user.uid}>
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.includes(user.uid)}
                        onCheckedChange={(checked) =>
                          onSelectUser(user.uid, checked as boolean)
                        }
                        className="cursor-pointer"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <p className="text-sm ">{user.period}期</p>
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
                    <TableCell>{formatedDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-1">
                        {user.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => onApprove(user.uid)}
                              className="h-8 px-2"
                            >
                              <UserCheck className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onReject(user.uid)}
                              className="h-8 px-2"
                            >
                              <UserX className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <EditDialog user={user} />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
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
  );
};
