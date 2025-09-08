import { Material } from "@/types/type";

export const Materials: Omit<Material, "isRead">[] = [
  {
    slug: "01_JavaScript/01_variable",
    title: "変数",
    chapter: "01_JavaScript",
    chapterTitle: "JavaScript",
    readingTime: 20,
  },
  {
    slug: "01_JavaScript/02_array_and_object",
    title: "配列とオブジェクト",
    chapter: "01_JavaScript",
    chapterTitle: "JavaScript",
    readingTime: 20,
  },
  {
    slug: "01_JavaScript/03_function",
    title: "関数",
    chapter: "01_JavaScript",
    chapterTitle: "JavaScript",
    readingTime: 20,
  },
  {
    slug: "01_JavaScript/04_if_and_for",
    title: "if文とfor文",
    chapter: "01_JavaScript",
    chapterTitle: "JavaScript",
    readingTime: 20,
  },
  {
    slug: "02_React/01_what_is_react",
    title: "Reactとは",
    chapter: "02_React",
    chapterTitle: "React",
    readingTime: 25,
  },
  {
    slug: "02_React/02_counter",
    title: "Reactでカウンターをつくろう",
    chapter: "02_React",
    chapterTitle: "React",
    readingTime: 30,
  },
  {
    slug: "02_React/03_quiz",
    title: "Reactでクイズをつくろう",
    chapter: "02_React",
    chapterTitle: "React",
    readingTime: 40,
  },
  {
    slug: "02_React/04_todo_list",
    title: "ReactでTodoリストをつくろう",
    chapter: "02_React",
    chapterTitle: "React",
    readingTime: 40,
  },
];

export function buildChapters(progress: Record<string, boolean>) {
  return Materials.reduce((acc, m) => {
    const found = acc.find((c) => c.id === m.chapter);
    const isRead = !!progress[m.slug]; // ← Supabaseから渡される進捗で判定

    if (found) {
      found.materialsCount++;
      if (isRead) found.completedCount++;
    } else {
      acc.push({
        id: m.chapter,
        title: m.chapterTitle,
        materialsCount: 1,
        completedCount: isRead ? 1 : 0,
      });
    }
    return acc;
  }, [] as { id: string; title: string; materialsCount: number; completedCount: number }[]);
}
