import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Chapter } from "@/types/type";

export function ChapterProgress({
  chapter,
  progress,
}: {
  chapter: Chapter;
  progress: number;
}) {
  return (
    <div key={chapter.id} className="space-y-2">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-semibold text-gray-900">{chapter.title}</h4>
        </div>
        <Badge variant={progress > 0 ? "default" : "secondary"}>
          {progress}%
        </Badge>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}
