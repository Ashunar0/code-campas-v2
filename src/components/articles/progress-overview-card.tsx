import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Materials } from "@/app/(dashboard)/contents/article";

export function ProgressOverviewCard() {
  const totalMaterials = Materials.length;
  const readMaterials = Materials.filter((m) => m.isRead).length;
  const overallProgress = Math.round((readMaterials / totalMaterials) * 100);

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
