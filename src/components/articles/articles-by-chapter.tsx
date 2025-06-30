import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircularProgress } from "@/components/dashboard/circular-progress";
import { mockProgress } from "@/lib/mockData";
import { BookOpen, CheckCircle, Circle, Clock } from "lucide-react";
import Link from "next/link";
import { Chapter, Material } from "@/types/type";

export function ArticlesByChapter({
  groupedMaterials,
}: {
  groupedMaterials: {
    [key: string]: { chapter: Chapter; materials: Material[] };
  };
}) {
  return (
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
  );
}
