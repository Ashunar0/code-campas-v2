import { Material } from "@/types/type";
import { CheckCircle, Circle } from "lucide-react";
import Link from "next/link";

export function RecentArticles({ material }: { material: Material }) {
  return (
    <div key={material.slug} className="flex items-start space-x-3">
      {material.isRead ? (
        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
      ) : (
        <Circle className="h-5 w-5 text-gray-400 mt-0.5" />
      )}
      <div className="flex-1 min-w-0">
        <Link
          href={`/articles/${material.slug}`}
          className="text-sm font-medium text-gray-900 hover:text-primary transition-colors"
        >
          {material.title}
        </Link>
        <p className="text-xs text-gray-500 mt-1">
          {material.chapterTitle} • {material.readingTime} min read
        </p>
      </div>
    </div>
  );
}
