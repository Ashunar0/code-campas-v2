import { Material } from "@/types/type";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Clock } from "lucide-react";
import Link from "next/link";

export function ArticleMaterial({ material }: { material: Material }) {
  return (
    <Link
      key={material.slug}
      href={`/contents/${material.slug}`}
      className="block"
    >
      <Card className="hover:shadow-md transition-shadow duration-200 border-gray-200 hover:border-primary/50">
        <CardContent className="px-6 py-1">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              {material.isRead ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400" />
              )}
            </div>
            <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <h4 className="font-semibold text-gray-900">{material.title}</h4>
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {material.readingTime} min read
                </div>
                {material.isRead && (
                  <Badge variant="secondary" className="text-xs">
                    Completed
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
