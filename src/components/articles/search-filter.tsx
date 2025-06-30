import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, BookMarked } from "lucide-react";
import { mockChapters } from "@/lib/mockData";
import { useState } from "react";

export function SearchAndFilter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterChapter, setFilterChapter] = useState("all");

  return (
    <Card>
      <CardContent className="px-6 py-2">
        <p className="text-md font-semibold text-gray-900 mb-2">記事を検索</p>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="記事を検索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Select
              value={filterStatus}
              onValueChange={(value: "all" | "read" | "unread") =>
                setFilterStatus(value)
              }
            >
              <SelectTrigger className="w-[140px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterChapter} onValueChange={setFilterChapter}>
              <SelectTrigger className="w-[160px]">
                <BookMarked className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Chapters" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Chapters</SelectItem>
                {mockChapters.map((chapter) => (
                  <SelectItem key={chapter.id} value={chapter.id.toString()}>
                    Chapter {chapter.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
