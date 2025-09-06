"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { useProgress } from "@/hooks/useProgress";
import { Skeleton } from "@/components/ui/skeleton";

export function ProgressOverviewCard() {
  const { user } = useAuth();
  const { totalMaterials, readMaterials, overallProgress, loading, error } =
    useProgress(user?.id || null);

  if (loading) {
    return (
      <Card className="bg-white border-primary/50">
        <CardContent className="px-6 py-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-gray-900">進捗</h3>
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="text-right">
              <Skeleton className="h-8 w-12" />
              <Skeleton className="h-4 w-16 mt-1" />
            </div>
          </div>
          <Skeleton className="mt-4 h-2 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-white border-red-200">
        <CardContent className="px-6 py-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-gray-900">進捗</h3>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border-primary/50">
      <CardContent className="px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-gray-900">進捗</h3>
            <p className="text-sm text-gray-600">
              {readMaterials} / {totalMaterials} 完了
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">
              {overallProgress}%
            </div>
            <p className="text-sm text-gray-600">Complete</p>
          </div>
        </div>
        <Progress value={overallProgress} className="mt-4 h-2" />
      </CardContent>
    </Card>
  );
}
