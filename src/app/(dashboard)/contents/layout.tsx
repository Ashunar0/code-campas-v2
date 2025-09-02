"use client";

import { useState } from "react";
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

export default function ContentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isCompleting, setIsCompleting] = useState(false);

  const material = Materials.find((m) => m.path === pathname);
  const currentIndex = Materials.findIndex((m) => m.path === pathname);
  const previousMaterial =
    currentIndex > 0 ? Materials[currentIndex - 1] : null;
  const nextMaterial =
    currentIndex < Materials.length - 1 ? Materials[currentIndex + 1] : null;

  if (!material) {
    return <ArticleNotFound />;
  }

  const handleMarkAsUnderstood = async () => {
    setIsCompleting(true);

    setTimeout(() => {
      toast.success("完了としてマークしました。");
      setIsCompleting(false);

      if (nextMaterial) {
        router.push("/articles");
      }
    }, 1000);
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
      {!material.isRead && (
        <CompleteConfirm
          handleMarkAsUnderstood={handleMarkAsUnderstood}
          isCompleting={isCompleting}
        />
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <div>
          {previousMaterial && (
            <Link href={previousMaterial.path}>
              <Button variant="outline" className="cursor-pointer">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Prev: {previousMaterial.title}
              </Button>
            </Link>
          )}
        </div>

        <div>
          {nextMaterial && (
            <Link href={nextMaterial.path}>
              <Button className="cursor-pointer">
                Next: {nextMaterial.title}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      <Separator className="my-8" />

      {/* Progress Indicator */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Material {currentIndex + 1} of {Materials.length}
            </span>
            <span className="text-gray-600">
              {Math.round(((currentIndex + 1) / Materials.length) * 100)}%
              through course
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / Materials.length) * 100}%`,
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
