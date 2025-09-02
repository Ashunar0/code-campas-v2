export interface User {
  id: string;
  name: string;
  email: string;
  period: number;
  status: "pending" | "approved" | "rejected";
  permission: "admin" | "mentor" | "student";
  createdAt: Date;
  updatedAt: Date;
}

export interface Material {
  id: number;
  title: string;
  chapter: number;
  chapterTitle: string;
  path: string;
  isRead: boolean;
  readingTime: number;
}

export interface Progress {
  userId: string;
  overall: number;
  byChapter: Record<number, number>;
  recentMaterials: string[];
  unreadCount: number;
}

export interface Chapter {
  id: number;
  title: string;
  materialsCount: number;
  completedCount: number;
}
