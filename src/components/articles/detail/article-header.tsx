import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Material } from "@/types/type";

export function ArticleHeader({ material }: { material: Material }) {
  return (
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
  );
}
