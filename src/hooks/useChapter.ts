// hooks/useChapters.ts
import { useEffect, useState } from "react";
import { getUserProgress } from "@/lib/progress";
import { buildChapters } from "@/app/(dashboard)/contents/article";

export function useChapters(userId: string | null) {
  const [chapters, setChapters] = useState<
    {
      id: string;
      title: string;
      materialsCount: number;
      completedCount: number;
    }[]
  >([]);

  useEffect(() => {
    if (!userId) return;

    (async () => {
      const progress = await getUserProgress(userId);
      const chapters = buildChapters(progress);
      setChapters(chapters);
    })();
  }, [userId]);

  return chapters;
}
