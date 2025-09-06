"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";
import { CircularProgress } from "./circular-progress";
import { ChapterProgress } from "./chapter-progress";
import { useAuth } from "@/hooks/useAuth";
import { useProgress } from "@/hooks/useProgress";
import { useChapters } from "@/hooks/useChapter";
import { Skeleton } from "@/components/ui/skeleton";

export function ProgressCard() {
  const { user } = useAuth();
  const {
    overallProgress,
    loading: progressLoading,
    error: progressError,
  } = useProgress(user?.id || null);
  const chapters = useChapters(user?.id || null);

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-blue-600";
    if (percentage >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  if (progressLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            進捗
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center mb-8">
            <Skeleton className="h-[150px] w-[150px] rounded-full" />
          </div>
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-2 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (progressError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            進捗
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-red-600">
            <p>{progressError}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          進捗
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-8">
          <CircularProgress
            percentage={overallProgress}
            size={150}
            className={getProgressColor(overallProgress)}
          />
        </div>

        <div className="space-y-8">
          {chapters.map((chapter) => {
            const progress = Math.round(
              (chapter.completedCount / chapter.materialsCount) * 100
            );
            return (
              <ChapterProgress
                key={chapter.id}
                chapter={chapter}
                progress={progress}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
