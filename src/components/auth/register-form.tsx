"use client";

// UI
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

// Toast
import { toast } from "sonner";

// Icons
import { EyeIcon, EyeOffIcon } from "lucide-react";

// Next
import Link from "next/link";
import { useRouter } from "next/navigation";

// React
import { useState } from "react";
import { useForm } from "react-hook-form";

// Zod
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Schema
import { registerSchema } from "@/lib/schema";

// Supabase
import { supabase } from "@/lib/supabase";

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      period: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const { email, password, name, period } = data;

      // 認証ユーザーの登録
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      console.log("signUpData", signUpData);

      if (signUpError) {
        toast.error(`登録に失敗しました: ${signUpError.message}`);
        return;
      }

      // サインアップ直後のユーザーIDを取得
      const userId = signUpData.user?.id;
      if (!userId) {
        toast.error("ユーザー情報の取得に失敗しました。");
        return;
      }

      // カスタムUserテーブルにレコード追加
      const { error: insertError } = await supabase.from("User").insert({
        id: userId, // 外部キーなどでauth.usersと紐付けたい場合
        name,
        period: parseInt(period),
        email,
        status: "approved",
        permission: "admin",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      if (insertError) {
        toast.error(`ユーザー情報の保存に失敗しました: ${insertError.message}`);
        return;
      }

      toast.success("登録が完了しました！");
      router.push("/login"); // メール確認ONならloginへ、OFFならdashboardでもOK
    } catch (error) {
      console.error(error);
      toast.error("予期せぬエラーが発生しました。");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>新規登録</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* 名前 */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>名前</FormLabel>
                    <FormControl>
                      <Input placeholder="山田太郎" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* メールアドレス */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>メールアドレス</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 受講期 */}
              <FormField
                control={form.control}
                name="period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>受講期</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="36" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* パスワード */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>パスワード</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 text-gray-500 hover:bg-transparent cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 登録ボタン */}
              <Button type="submit" className="w-full cursor-pointer">
                登録
              </Button>

              {/* ログイン案内 */}
              <div className="mt-4 text-center text-sm">
                アカウントをお持ちの方は{" "}
                <Link
                  href="/login"
                  className="underline underline-offset-4 hover:text-blue-500"
                >
                  ログイン
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
