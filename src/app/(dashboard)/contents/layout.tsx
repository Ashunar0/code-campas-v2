"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { BreadCrumb } from "@/components/articles/detail/bread-crumb";
import { ArticleNotFound } from "@/components/articles/detail/article-not-found";
import { ArticleHeader } from "@/components/articles/detail/article-header";
import { CompleteConfirm } from "@/components/articles/detail/complete-comfirm";
import { Materials } from "@/app/(dashboard)/contents/article";
import { useAuth } from "@/hooks/useAuth";
import { getArticleReadStatus, markArticleAsRead } from "@/lib/progress";

export default function ContentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isCompleting, setIsCompleting] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // pathnameから/contents/プレフィックスを除去してslugを取得
  const slug = pathname.replace("/contents/", "");
  const material = Materials.find((m) => m.slug === slug);
  const currentIndex = Materials.findIndex((m) => m.slug === slug);
  const previousMaterial =
    currentIndex > 0 ? Materials[currentIndex - 1] : null;
  const nextMaterial =
    currentIndex < Materials.length - 1 ? Materials[currentIndex + 1] : null;

  // ページを開いた時にisRead情報を取得
  useEffect(() => {
    const fetchReadStatus = async () => {
      if (!user?.uid || !material) {
        setLoading(false);
        return;
      }

      try {
        const readStatus = await getArticleReadStatus(user.uid, material.slug);
        setIsRead(readStatus);
      } catch (error) {
        console.error("Error fetching read status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReadStatus();
  }, [user?.uid, material]);

  if (!material) {
    return <ArticleNotFound />;
  }

  const handleMarkAsUnderstood = async () => {
    if (!user?.uid) {
      toast.error("ログインが必要です。");
      return;
    }

    setIsCompleting(true);

    try {
      const success = await markArticleAsRead(user.uid, material.slug);
      if (success) {
        setIsRead(true);
        toast.success("完了としてマークしました。");

        if (nextMaterial) {
          router.push("/articles");
        }
      } else {
        toast.error("エラーが発生しました。");
      }
    } catch (error) {
      console.error("Error marking as read:", error);
      toast.error("エラーが発生しました。");
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <BreadCrumb material={material} />

      {/* Header */}
      <ArticleHeader material={material} />

      {/* Content */}
      <Card>
        <CardContent className="p-8">
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css"
            rel="stylesheet"
          />
          <article className="prose prose-sm md:prose-base mx-auto max-w-4xl !prose-pre:text-[0.9rem] !prose-code:text-[0.9rem] !prose-pre:leading-7">
            {children}
          </article>
        </CardContent>
      </Card>

      {/* Understanding Confirmation */}
      {!loading && !isRead && (
        <CompleteConfirm
          handleMarkAsUnderstood={handleMarkAsUnderstood}
          isCompleting={isCompleting}
        />
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <div>
          {previousMaterial && (
            <Link href={`/contents/${previousMaterial.slug}`}>
              <Button variant="outline" className="cursor-pointer">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Prev: {previousMaterial.title}
              </Button>
            </Link>
          )}
        </div>

        <div>
          {nextMaterial && (
            <Link href={`/contents/${nextMaterial.slug}`}>
              <Button className="cursor-pointer">
                Next: {nextMaterial.title}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      <Separator className="my-8" />
    </div>
  );
}
