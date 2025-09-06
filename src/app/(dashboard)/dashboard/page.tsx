import { Metadata } from "next";
import { ProgressCard } from "@/components/dashboard/progress-card";
import { WelcomeSection } from "@/components/dashboard/welcome-section";

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
