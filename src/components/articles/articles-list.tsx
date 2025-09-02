"use client";

import { SearchAndFilter } from "./search-filter";
import { ArticlesByChapter } from "./articles-by-chapter";
import { ArticlesNotFound } from "./articles-not-found";
import { Materials } from "@/app/(dashboard)/contents/article";
import { Chapters } from "@/app/(dashboard)/contents/article";
import { useState } from "react";

export function ArticlesList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "read" | "unread">(
    "all"
  );
  const [filterChapter, setFilterChapter] = useState<string>("all");

  const filteredMaterials = Materials.filter((material) => {
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

  const groupedMaterials = Chapters.reduce((acc, chapter) => {
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
  }, {} as Record<number, { chapter: (typeof Chapters)[0]; materials: typeof Materials }>);

  return (
    <>
      {/* Search and Filters */}
      <SearchAndFilter />

      {/* Materials by Chapter */}
      {Object.keys(groupedMaterials).length > 0 ? (
        <ArticlesByChapter groupedMaterials={groupedMaterials} />
      ) : (
        <ArticlesNotFound
          setSearchTerm={setSearchTerm}
          setFilterStatus={setFilterStatus}
          setFilterChapter={setFilterChapter}
        />
      )}
    </>
  );
}
