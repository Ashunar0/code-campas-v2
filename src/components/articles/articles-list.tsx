"use client";

import { useState, useEffect } from "react";
import { SearchAndFilter } from "./search-filter";
import { ArticlesByChapter } from "./articles-by-chapter";
import { ArticlesNotFound } from "./articles-not-found";
import { Materials, buildChapters } from "@/app/(dashboard)/contents/article";
import { getAuthInstance } from "@/lib/firebase";
import { getUserProgress } from "@/lib/progress";
import { ArticleIsLoading } from "./article-isloading";

export function ArticlesList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "read" | "unread">(
    "all"
  );

  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [chapters, setChapters] = useState<
    {
      id: string;
      title: string;
      materialsCount: number;
      completedCount: number;
    }[]
  >([]);

  // ログインユーザー取得
  useEffect(() => {
    // クライアントサイドでのみ実行
    if (typeof window === "undefined") return;
    
    const user = getAuthInstance().currentUser;
    if (user) setUserId(user.uid);
  }, []);

  // ユーザー進捗取得（decode 済みの progress を利用）
  useEffect(() => {
    if (!userId) return;

    const fetchProgress = async () => {
      try {
        const progressMap = await getUserProgress(userId);
        setProgress(progressMap);
        setChapters(buildChapters(progressMap));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching progress:", error);
        setProgress({});
        setChapters([]);
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, [userId]);

  // Materialsに進捗をマージ
  const materialsWithProgress = Materials.map((m) => ({
    ...m,
    isRead: !!progress[m.slug],
  }));

  // フィルター適用
  const filteredMaterials = materialsWithProgress.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.chapterTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "read" && material.isRead) ||
      (filterStatus === "unread" && !material.isRead);

    return matchesSearch && matchesStatus;
  });

  // チャプターごとにグループ化
  const groupedMaterials = filteredMaterials.reduce((acc, material) => {
    const chapterId = material.chapter;

    if (!acc[chapterId]) {
      const chapterInfo = chapters.find((c) => c.id === chapterId);
      if (chapterInfo) {
        acc[chapterId] = {
          chapter: chapterInfo,
          materials: [],
        };
      }
    }

    if (acc[chapterId]) {
      acc[chapterId].materials.push(material);
    }

    return acc;
  }, {} as Record<string, { chapter: (typeof chapters)[0]; materials: typeof materialsWithProgress }>);

  return (
    <>
      <SearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      {isLoading ? (
        <ArticleIsLoading />
      ) : Object.keys(groupedMaterials).length > 0 ? (
        <ArticlesByChapter groupedMaterials={groupedMaterials} />
      ) : (
        <ArticlesNotFound
          setSearchTerm={setSearchTerm}
          setFilterStatus={setFilterStatus}
        />
      )}
    </>
  );
}
