import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ArticlesNotFound({
  setSearchTerm,
  setFilterStatus,
  setFilterChapter,
}: {
  setSearchTerm: (searchTerm: string) => void;
  setFilterStatus: (filterStatus: "all" | "read" | "unread") => void;
  setFilterChapter: (filterChapter: string) => void;
}) {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No materials found
        </h3>
        <p className="text-gray-600 mb-4">
          Try adjusting your search terms or filters to find what you&apos;re
          looking for.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setSearchTerm("");
            setFilterStatus("all");
            setFilterChapter("all");
          }}
        >
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  );
}
