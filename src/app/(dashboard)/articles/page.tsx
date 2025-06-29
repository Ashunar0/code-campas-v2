"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  BookOpen,
  CheckCircle,
  Circle,
  Clock,
  Filter,
  BookMarked,
} from "lucide-react";
import { mockMaterials, mockChapters, mockProgress } from "@/lib/mockData";
import Link from "next/link";
import { CircularProgress } from "@/components/dashboard/circular-progress";

export default function MaterialList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "read" | "unread">(
    "all"
  );
  const [filterChapter, setFilterChapter] = useState<string>("all");

  const filteredMaterials = mockMaterials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.chapterTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "read" && material.isRead) ||
      (filterStatus === "unread" && !material.isRead);

    const matchesChapter =
      filterChapter === "all" || material.chapter.toString() === filterChapter;

    return matchesSearch && matchesStatus && matchesChapter;
  });

  const groupedMaterials = mockChapters.reduce((acc, chapter) => {
    const chapterMaterials = filteredMaterials.filter(
      (m) => m.chapter === chapter.id
    );
    if (chapterMaterials.length > 0) {
      acc[chapter.id] = {
        chapter,
        materials: chapterMaterials,
      };
    }
    return acc;
  }, {} as Record<number, { chapter: (typeof mockChapters)[0]; materials: typeof mockMaterials }>);

  const totalMaterials = mockMaterials.length;
  const readMaterials = mockMaterials.filter((m) => m.isRead).length;
  const overallProgress = Math.round((readMaterials / totalMaterials) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">記事一覧</h1>
        </div>

        {/* Progress Overview Card */}
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
      </div>

      {/* Search and Filters */}
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

      {/* Materials by Chapter */}
      {Object.keys(groupedMaterials).length > 0 ? (
        <Accordion
          type="multiple"
          defaultValue={Object.keys(groupedMaterials)}
          className="space-y-4"
        >
          {Object.entries(groupedMaterials).map(
            ([chapterId, { chapter, materials }]) => {
              const chapterProgress = mockProgress.byChapter[chapter.id] || 0;

              return (
                <AccordionItem key={chapterId} value={chapterId}>
                  <Card>
                    <AccordionTrigger className="px-6 py-2 hover:no-underline">
                      <div className="flex items-center justify-between w-full mr-4">
                        <div className="flex items-center space-x-4 py-2">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <BookOpen className="h-6 w-6 text-primary" />
                            </div>
                          </div>
                          <div className="text-left">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {chapter.title}
                            </h3>
                            <p className="text-sm text-gray-600 hidden md:block">
                              {chapter.description}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <CircularProgress
                            percentage={chapterProgress}
                            size={60}
                          />
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="px-6 pb-4">
                        <div className="grid gap-3">
                          {materials.map((material) => (
                            <Link
                              key={material.id}
                              href={`/articles/${material.id}`}
                              className="block"
                            >
                              <Card className="hover:shadow-md transition-shadow duration-200 border-gray-200 hover:border-primary/50">
                                <CardContent className="px-6 py-1">
                                  <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                      {material.isRead ? (
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                      ) : (
                                        <Circle className="h-5 w-5 text-gray-400" />
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                      <h4 className="font-semibold text-gray-900">
                                        {material.title}
                                      </h4>
                                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                                        <div className="flex items-center">
                                          <Clock className="h-4 w-4 mr-1" />
                                          {material.readingTime} min read
                                        </div>
                                        {material.isRead && (
                                          <Badge
                                            variant="secondary"
                                            className="text-xs"
                                          >
                                            Completed
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              );
            }
          )}
        </Accordion>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No materials found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find what
              you&apos;re looking for.
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
      )}
    </div>
  );
}
