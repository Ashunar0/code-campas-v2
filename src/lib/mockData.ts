import { User, Material, Progress, Chapter } from "@/types/type";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    period: 1,
    status: "approved",
    permission: "admin",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    period: 2,
    status: "pending",
    permission: "mentor",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    period: 1,
    status: "approved",
    permission: "mentor",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    period: 3,
    status: "pending",
    permission: "student",
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25"),
  },
];

export const mockChapters: Chapter[] = [
  {
    id: 1,
    title: "JavaScript",
    materialsCount: 8,
    completedCount: 6,
  },
  {
    id: 2,
    title: "React",
    materialsCount: 12,
    completedCount: 8,
  },
  {
    id: 3,
    title: "Next.js",
    materialsCount: 10,
    completedCount: 4,
  },
  {
    id: 4,
    title: "TypeScript",
    materialsCount: 15,
    completedCount: 2,
  },
  {
    id: 5,
    title: "Tailwind CSS",
    materialsCount: 9,
    completedCount: 0,
  },
  {
    id: 6,
    title: "Git",
    materialsCount: 18,
    completedCount: 0,
  },
];

export const mockMaterials: Material[] = [
  {
    id: 1,
    title: "変数",
    chapter: 1,
    chapterTitle: "JavaScript",
    path: "/contents/01_JavaScript/01_variable",
    isRead: true,
    readingTime: 5,
  },
  {
    id: 2,
    title: "配列とオブジェクト",
    chapter: 1,
    chapterTitle: "JavaScript",
    path: "/contents/01_JavaScript/02_array_and_object",
    isRead: true,
    readingTime: 7,
  },
  {
    id: 3,
    title: "制御フロー",
    chapter: 1,
    chapterTitle: "プログラミングの基本",
    path: "/contents/01_JavaScript/03_control_flow",
    isRead: false,
    readingTime: 8,
  },
  {
    id: 4,
    title: "配列の基本",
    chapter: 2,
    chapterTitle: "データ構造",
    path: "/contents/01_JavaScript/04_array",
    isRead: false,
    readingTime: 10,
  },
];

export const mockProgress: Progress = {
  userId: "1",
  overall: 70,
  byChapter: {
    1: 75,
    2: 66,
    3: 40,
    4: 15,
    5: 0,
    6: 0,
  },
  recentMaterials: ["1", "2", "4"],
  unreadCount: 24,
};

export const currentUser: User = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  period: 1,
  status: "approved",
  permission: "admin",
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date("2024-01-15"),
};
