import { Metadata } from "next";
import React from "react";
import { BookOpen, TrendingUp } from "lucide-react";
import { mockProgress, mockMaterials, currentUser } from "@/lib/mockData";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { ProgressCard } from "@/components/dashboard/progress-card";
import { RecentArticlesCard } from "@/components/dashboard/recent-articles-card";
import { UnreadCard } from "@/components/dashboard/unread-card";

export const metadata: Metadata = {
  title: "ダッシュボード | CodeCampas",
  description: "ダッシュボードページ",
};

export default function Dashboard() {
  const recentMaterials = mockMaterials.filter((material) =>
    mockProgress.recentMaterials.includes(material.id)
  );

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
        <h1 className="text-lg font-bold text-gray-900 mb-2">
          おかえりなさい, {currentUser.name}さん！ 👋
        </h1>
        <p className="text-gray-600 text-md">
          プログラミングの旅を続けていきましょう！
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <DashboardCard
              title="完了した記事"
              value={mockMaterials.filter((m) => m.isRead).length}
              description={`${mockMaterials.length} 記事中`}
              icon={<BookOpen className="h-4 w-4 text-muted-foreground" />}
            />

            <DashboardCard
              title="連続勉強日数"
              value={`7日`}
              description="Keep it up! 🔥"
              icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
            />
          </div>

          <ProgressCard />
        </div>

        {/* Recent Activity */}
        <div className="space-y-6">
          <RecentArticlesCard recentMaterials={recentMaterials} />

          {mockProgress.unreadCount > 0 && <UnreadCard />}
        </div>
      </div>
    </div>
  );
}
