import { Metadata } from "next";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "403 Forbidden | CodeCampas",
  description: "このページにアクセスする権限がありません",
};

export default function ForbiddenPage() {
  return (
    <div className="flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            403 Forbidden
          </CardTitle>
          <CardDescription className="text-gray-600">
            このページにアクセスする権限がありません。
            <br />
            管理者にお問い合わせください。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">エラーコード: 403 Forbidden</p>
          </div>
          <div className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                ダッシュボードに戻る
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
