import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";
import { CircularProgress } from "./circular-progress";
import { mockProgress } from "@/lib/mockData";
import { ChapterProgress } from "./chapter-progress";
import { mockChapters } from "@/lib/mockData";

export function ProgressCard() {
  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-blue-600";
    if (percentage >= 40) return "text-yellow-600";
    return "text-red-600";
  };

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
            percentage={mockProgress.overall}
            size={150}
            className={getProgressColor(mockProgress.overall)}
          />
        </div>

        <div className="space-y-8">
          {mockChapters.map((chapter) => {
            const progress = mockProgress.byChapter[chapter.id] || 0;
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
