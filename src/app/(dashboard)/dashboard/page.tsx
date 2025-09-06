import React from "react";
import { Metadata } from "next";
import { BookOpen, TrendingUp } from "lucide-react";
import { Materials } from "@/app/(dashboard)/contents/article";
import { mockProgress } from "@/lib/mockData";
import { ProgressCard } from "@/components/dashboard/progress-card";
import { RecentArticlesCard } from "@/components/dashboard/recent-articles-card";
import { WelcomeSection } from "@/components/dashboard/welcome-section";
import { UserProfileCard } from "@/components/dashboard/user-profile-card";

export const metadata: Metadata = {
  title: "ダッシュボード | CodeCampas",
  description: "ダッシュボードページ",
};

export default function Dashboard() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Welcome Section */}
      <WelcomeSection />

      {/* Progress Overview */}
      <div className="lg:col-span-2 space-y-6">
        <ProgressCard />
      </div>
    </div>
  );
}
