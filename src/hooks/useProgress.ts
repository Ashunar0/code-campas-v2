"use client";

// hooks/useProgress.ts
import { useEffect, useState } from "react";
import { getUserProgress } from "@/lib/progress";
import { Materials } from "@/app/(dashboard)/contents/article";

interface ProgressData {
  totalMaterials: number;
  readMaterials: number;
  overallProgress: number;
  loading: boolean;
  error: string | null;
}

export function useProgress(userId: string | null) {
  const [progressData, setProgressData] = useState<ProgressData>({
    totalMaterials: 0,
    readMaterials: 0,
    overallProgress: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!userId) {
      setProgressData({
        totalMaterials: 0,
        readMaterials: 0,
        overallProgress: 0,
        loading: false,
        error: null,
      });
      return;
    }

    const fetchProgress = async () => {
      try {
        setProgressData((prev) => ({ ...prev, loading: true, error: null }));

        const userProgress = await getUserProgress(userId);
        const totalMaterials = Materials.length;

        // ユーザーの進捗データに基づいて読み終わった記事数を計算
        const readMaterials = Materials.filter(
          (material) => userProgress[material.slug] === true
        ).length;

        const overallProgress =
          totalMaterials > 0
            ? Math.round((readMaterials / totalMaterials) * 100)
            : 0;

        setProgressData({
          totalMaterials,
          readMaterials,
          overallProgress,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error fetching progress:", error);
        setProgressData((prev) => ({
          ...prev,
          loading: false,
          error: "進捗データの取得に失敗しました",
        }));
      }
    };

    fetchProgress();
  }, [userId]);

  return progressData;
}
