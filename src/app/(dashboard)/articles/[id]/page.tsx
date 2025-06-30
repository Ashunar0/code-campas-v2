"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { mockMaterials } from "@/lib/mockData";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BreadCrumb } from "@/components/articles/detail/bread-crumb";
import { ArticleNotFound } from "@/components/articles/detail/article-not-found";
import { ArticleHeader } from "@/components/articles/detail/article-header";
import { CompleteConfirm } from "@/components/articles/detail/complete-comfirm";

export default function ArticleDetail() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [isCompleting, setIsCompleting] = useState(false);

  const material = mockMaterials.find((m) => m.id === id);
  const currentIndex = mockMaterials.findIndex((m) => m.id === id);
  const previousMaterial =
    currentIndex > 0 ? mockMaterials[currentIndex - 1] : null;
  const nextMaterial =
    currentIndex < mockMaterials.length - 1
      ? mockMaterials[currentIndex + 1]
      : null;

  if (!material) {
    return <ArticleNotFound />;
  }

  const handleMarkAsUnderstood = async () => {
    setIsCompleting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("完了としてマークしました。");
      setIsCompleting(false);

      // Navigate to next material if available
      if (nextMaterial) {
        router.push(`/articles/${nextMaterial.id}`);
      }
    }, 1000);
  };

  const formatContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      // Handle headers
      if (line.startsWith("# ")) {
        return (
          <h1
            key={index}
            className="text-3xl font-bold text-gray-900 mb-6 mt-8 first:mt-0"
          >
            {line.substring(2)}
          </h1>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-2xl font-semibold text-gray-800 mb-4 mt-8"
          >
            {line.substring(3)}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3
            key={index}
            className="text-xl font-semibold text-gray-800 mb-3 mt-6"
          >
            {line.substring(4)}
          </h3>
        );
      }

      // Handle code blocks
      if (line.startsWith("```")) {
        return null; // Handle separately
      }

      // Handle empty lines
      if (line.trim() === "") {
        return <br key={index} />;
      }

      // Handle regular paragraphs
      return (
        <p key={index} className="text-gray-700 mb-4 leading-relaxed">
          {line}
        </p>
      );
    });
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
          <div className="prose max-w-none">
            {formatContent(material.content)}
          </div>
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
            <Link href={`/articles/${previousMaterial.id}`}>
              <Button variant="outline" className="cursor-pointer">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Prev: {previousMaterial.title}
              </Button>
            </Link>
          )}
        </div>

        <div>
          {nextMaterial && (
            <Link href={`/articles/${nextMaterial.id}`}>
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
              Material {currentIndex + 1} of {mockMaterials.length}
            </span>
            <span className="text-gray-600">
              {Math.round(((currentIndex + 1) / mockMaterials.length) * 100)}%
              through course
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / mockMaterials.length) * 100}%`,
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
