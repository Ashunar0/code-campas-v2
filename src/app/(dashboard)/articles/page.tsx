import { ArticlesList } from "@/components/articles/articles-list";
import { ProgressOverviewCard } from "@/components/articles/progress-overview-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "記事一覧 | CodeCampas",
  description: "記事一覧ページ",
};

export default function ArticlesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">記事一覧</h1>
      </div>

      {/* Progress Overview Card */}
      <ProgressOverviewCard />

      <ArticlesList />
    </div>
  );
}
