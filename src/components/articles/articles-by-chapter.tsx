"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { CircularProgress } from "@/components/dashboard/circular-progress";
import { BookOpen } from "lucide-react";
import { Chapter, Material } from "@/types/type";
import { useAuth } from "@/hooks/useAuth";
import { useChapters } from "@/hooks/useChapter";
import { ArticleMaterial } from "./article-material";

export function ArticlesByChapter({
  groupedMaterials,
}: {
  groupedMaterials: {
    [key: string]: {
      chapter: Chapter;
      materials: (Material & { isRead: boolean })[];
    };
  };
}) {
  const { user } = useAuth();
  const chapters = useChapters(user?.uid || null);

  // チャプターごとの進捗率を計算
  const getChapterProgress = (chapterId: string) => {
    const chapter = chapters.find((c) => c.id === chapterId);
    if (!chapter || chapter.materialsCount === 0) return 0;
    return Math.round((chapter.completedCount / chapter.materialsCount) * 100);
  };

  return (
    <Accordion
      type="multiple"
      defaultValue={Object.keys(groupedMaterials)}
      className="space-y-4"
    >
      {Object.entries(groupedMaterials).map(
        ([chapterId, { chapter, materials }]) => {
          const chapterProgress = getChapterProgress(chapter.id);

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
                        <ArticleMaterial
                          key={material.slug}
                          material={material}
                        />
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
  );
}
