import { cn } from "@/lib/utils";

// shadcn
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// lucide
import { EyeIcon } from "lucide-react";

// next
import Link from "next/link";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>新規登録</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              {/* 名前 */}
              <div className="grid gap-3">
                <Label htmlFor="name">名前</Label>
                <Input id="name" type="text" placeholder="山田太郎" required />
              </div>

              {/* メールアドレス */}
              <div className="grid gap-3">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>

              {/* 受講期間 */}
              <div className="grid gap-3">
                <Label htmlFor="email">受講期</Label>
                <Input id="period" type="number" placeholder="36" required />
              </div>

              {/* パスワード */}
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">パスワード</Label>
                </div>
                <div className="relative">
                  <Input id="password" type="password" required />
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-gray-500 hover:bg-transparent cursor-pointer"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* ログインボタン */}
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  ログイン
                </Button>
              </div>
            </div>

            {/* アカウントをお持ちでない方はこちら */}
            <div className="mt-4 text-center text-sm">
              アカウントをお持ちの方は{" "}
              <Link
                href="/login"
                className="underline underline-offset-4 hover:text-blue-500"
              >
                新規登録
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
