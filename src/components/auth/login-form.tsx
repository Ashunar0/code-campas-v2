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

// Schema
import { loginSchema } from "@/lib/schema";

// Zod
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Supabase
import { supabase } from "@/lib/supabase";

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error("ログインに失敗しました");
        return;
      }

      console.log(data);

      toast.success("ログインが完了しました");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("予期せぬエラーが発生しました。");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>ログイン</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

              {/* パスワード */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>パスワード</FormLabel>
                      <Link
                        href="#"
                        className="text-xs text-gray-500 hover:underline underline-offset-4"
                      >
                        パスワードを忘れた方はこちら
                      </Link>
                    </div>
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
                        onClick={handleTogglePassword}
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

              {/* ログインボタン */}
              <Button type="submit" className="w-full cursor-pointer">
                ログイン
              </Button>

              {/* アカウント案内 */}
              <div className="mt-4 text-center text-sm">
                アカウントをお持ちでない方は{" "}
                <Link
                  href="/register"
                  className="underline underline-offset-4 hover:text-blue-500"
                >
                  アカウントを作成
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
