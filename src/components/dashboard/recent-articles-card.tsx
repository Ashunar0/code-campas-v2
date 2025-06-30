import { Material } from "@/types/type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock } from "lucide-react";
import { RecentArticles } from "./recent-articles";

export function RecentArticlesCard({
  recentMaterials,
}: {
  recentMaterials: Material[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          最近の記事
        </CardTitle>
        <CardDescription>最近アクセスした記事</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentMaterials.length > 0 ? (
            recentMaterials.map((material) => (
              <RecentArticles key={material.id} material={material} />
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              No recent materials. Start reading to see your progress!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
