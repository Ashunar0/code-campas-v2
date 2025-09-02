import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle } from "lucide-react";

export function CompleteConfirm({
  handleMarkAsUnderstood,
  isCompleting,
}: {
  handleMarkAsUnderstood: () => void;
  isCompleting: boolean;
}) {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="p-6">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            この記事を完了としてマークしますか？
          </h3>
          <Button
            onClick={handleMarkAsUnderstood}
            disabled={isCompleting}
            size="lg"
            className="min-w-[200px]"
          >
            {isCompleting ? (
              "処理中..."
            ) : (
              <>
                <CheckCircle className="h-5 w-5 mr-2" />
                完了としてマーク
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
