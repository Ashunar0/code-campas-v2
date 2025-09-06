import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ArticlesNotFound({
  setSearchTerm,
  setFilterStatus,
}: {
  setSearchTerm: (searchTerm: string) => void;
  setFilterStatus: (filterStatus: "all" | "read" | "unread") => void;
}) {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          記事が見つかりません
        </h3>
        <p className="text-gray-600 mb-4">検索条件を調整してください。</p>
        <Button
          variant="outline"
          onClick={() => {
            setSearchTerm("");
            setFilterStatus("all");
          }}
        >
          検索条件をクリア
        </Button>
      </CardContent>
    </Card>
  );
}
