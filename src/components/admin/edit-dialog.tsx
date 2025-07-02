"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Edit, Shield, Users, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { User as UserType } from "@/types/type";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import React, { useState } from "react";

interface EditDialogProps {
  user: UserType;
}

type FormValues = {
  name: string;
  email: string;
  period: number;
  status: "approved" | "pending" | "rejected";
  permission: "admin" | "mentor" | "student";
};

export const EditDialog = ({ user }: EditDialogProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      name: user.name,
      email: user.email,
      period: user.period,
      status: user.status,
      permission: user.permission,
    },
  });

  const onSubmit = async (values: FormValues) => {
    // フォームデータでユーザーを更新する
    try {
      const { error } = await supabase
        .from("User")
        .update(values)
        .eq("id", user.id);

      if (error) {
        console.error("ユーザー更新に失敗しました:", error);
      }

      console.log(values);

      toast.success("ユーザー更新が完了しました");
      setOpen(false); // 送信成功時にDialogを閉じる
    } catch (error) {
      console.error("ユーザー更新に失敗しました:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>編集</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>名前</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>メールアドレス</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="period"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>受講期</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ステータス</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-1/2">
                        <SelectValue placeholder="ステータスを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approved">承認済み</SelectItem>
                        <SelectItem value="pending">承認待ち</SelectItem>
                        <SelectItem value="rejected">拒否</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="permission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>権限</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-1/2">
                        <SelectValue placeholder="権限を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Admin
                          </div>
                        </SelectItem>
                        <SelectItem value="mentor">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Mentor
                          </div>
                        </SelectItem>
                        <SelectItem value="student">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Student
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  キャンセル
                </Button>
              </DialogClose>
              <Button type="submit">保存</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
