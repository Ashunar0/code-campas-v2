"use client";

import { useState, useEffect } from "react";
import { SearchAndFilter } from "./search-filter";
import { ArticlesByChapter } from "./articles-by-chapter";
import { ArticlesNotFound } from "./articles-not-found";
import { Materials, buildChapters } from "@/app/(dashboard)/contents/article";
import { supabase } from "@/lib/supabase";
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
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUserId(data.user.id);
    });
  }, []);

  // ユーザー進捗取得
  useEffect(() => {
    if (!userId) return;

    (async () => {
      const { data, error } = await supabase
        .from("progress")
        .select("article_slug, is_read")
        .eq("user_id", userId);

      if (error) {
        console.error("Error fetching progress:", error);
        return;
      }

      const progressMap = data.reduce((acc, row) => {
        acc[row.article_slug] = row.is_read;
        return acc;
      }, {} as Record<string, boolean>);

      setProgress(progressMap);
      setChapters(buildChapters(progressMap)); // Chaptersを動的生成
      setIsLoading(false);
    })();
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
      // チャプター情報を取得（chapters配列から検索）
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
      {/* Search and Filters */}
      <SearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      {/* Materials by Chapter */}
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
