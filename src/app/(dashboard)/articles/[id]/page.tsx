"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  CheckCircle,
  Home,
} from "lucide-react";
import { mockMaterials } from "@/lib/mockData";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Material not found
          </h2>
          <p className="text-gray-600 mb-4">
            The material you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/articles">
            <Button className="cursor-pointer">Back to Articles</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleMarkAsUnderstood = async () => {
    setIsCompleting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Material marked as understood. Keep up the great work!");
      setIsCompleting(false);

      // Navigate to next material if available
      if (nextMaterial) {
        router.push(`/materials/${nextMaterial.id}`);
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
      <nav className="flex items-center space-x-2 text-sm text-gray-600">
        <Link href="/dashboard" className="hover:text-primary">
          <Home className="h-4 w-4" />
        </Link>
        <span>/</span>
        <Link href="/articles" className="hover:text-primary">
          Articles
        </Link>
        <span>/</span>
        <span className="text-gray-900">{material.chapterTitle}</span>
        <span>/</span>
        <span className="text-gray-900">{material.title}</span>
      </nav>

      {/* Header */}
      <Card>
        <CardContent className="px-6 py-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-4">
                <Badge variant="secondary">Chapter {material.chapter}</Badge>
                {material.isRead && (
                  <Badge
                    variant="default"
                    className="bg-green-100 text-green-800"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {material.title}
              </h1>
              <p className="text-gray-600 mb-4">{material.chapterTitle}</p>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {material.readingTime} min read
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Link href="/articles">
                <Button variant="outline" size="sm" className="cursor-pointer">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  一覧へ戻る
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

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
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="text-center">
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Did you understand this material?
              </h3>
              <p className="text-gray-600 mb-4">
                Mark this material as understood to track your progress and
                continue to the next topic.
              </p>
              <Button
                onClick={handleMarkAsUnderstood}
                disabled={isCompleting}
                size="lg"
                className="min-w-[200px]"
              >
                {isCompleting ? (
                  "Processing..."
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Mark as Understood
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
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
