export interface User {
  uid: string;
  name: string;
  email: string;
  period: number;
  status: "pending" | "approved" | "rejected";
  permission: "admin" | "mentor" | "student";
  createdAt: Date;
  updatedAt: Date;
  progress?: ProgressRecord[];
}

export interface ProgressRecord {
  id: string;
  userId: string;
  articleSlug: string;
  isRead: boolean;
  updatedAt: Date;
}

export interface Material {
  slug: string;
  title: string;
  chapter: string;
  chapterTitle: string;
  readingTime: number;
  isRead?: boolean;
}

export interface Progress {
  userId: string;
  overall: number;
  byChapter: Record<string, number>;
  recentMaterials: string[];
  unreadCount: number;
}

export interface Chapter {
  id: string;
  title: string;
  materialsCount: number;
  completedCount: number;
}
