import React from "react";
import { Metadata } from "next";
import { BookOpen, TrendingUp } from "lucide-react";
import { Materials } from "@/app/(dashboard)/contents/article";
import { mockProgress } from "@/lib/mockData";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { ProgressCard } from "@/components/dashboard/progress-card";
import { RecentArticlesCard } from "@/components/dashboard/recent-articles-card";
import { WelcomeSection } from "@/components/dashboard/welcome-section";
import { UserProfileCard } from "@/components/dashboard/user-profile-card";

export const metadata: Metadata = {
  title: "ダッシュボード | CodeCampas",
  description: "ダッシュボードページ",
};

export default function Dashboard() {
  const recentMaterials = Materials.filter((material) =>
    mockProgress.recentMaterials.includes(material.id.toString())
  );

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <WelcomeSection />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Overview */}
        <div className="lg:col-span-2 space-y-6">
          <ProgressCard />
        </div>

        {/* Recent Activity */}
        <div className="space-y-6">
          <DashboardCard
            title="完了した記事"
            value={Materials.filter((m) => m.isRead).length}
            description={`${Materials.length} 記事中`}
            icon={<BookOpen className="h-4 w-4 text-muted-foreground" />}
          />
          <UserProfileCard />
          <RecentArticlesCard recentMaterials={recentMaterials} />
        </div>
      </div>
    </div>
  );
}
