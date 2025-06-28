import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CircularProgress } from "@/components/dashboard/circular-progress";
import {
  BookOpen,
  Clock,
  Target,
  CheckCircle,
  Circle,
  TrendingUp,
} from "lucide-react";
import {
  mockProgress,
  mockChapters,
  mockMaterials,
  currentUser,
} from "@/lib/mockData";
import { DashboardCard } from "@/components/dashboard/dashboard-card";

export default function Dashboard() {
  const recentMaterials = mockMaterials.filter((material) =>
    mockProgress.recentMaterials.includes(material.id)
  );

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-blue-600";
    if (percentage >= 40) return "text-yellow-600";
    return "text-red-600";
  };

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
          {/* Stats Overview */}
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

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                進捗
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center mb-8">
                <CircularProgress
                  percentage={mockProgress.overall}
                  size={150}
                  className={getProgressColor(mockProgress.overall)}
                />
              </div>

              <div className="space-y-4">
                {mockChapters.map((chapter) => {
                  const progress = mockProgress.byChapter[chapter.id] || 0;
                  return (
                    <div key={chapter.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {chapter.title}
                          </h4>
                        </div>
                        <Badge variant={progress > 0 ? "default" : "secondary"}>
                          {progress}%
                        </Badge>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                最近の記事
              </CardTitle>
              <CardDescription>最近アクセスした記事</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMaterials.length > 0 ? (
                  recentMaterials.map((material) => (
                    <div
                      key={material.id}
                      className="flex items-start space-x-3"
                    >
                      {material.isRead ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-400 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/articles/${material.id}`}
                          className="text-sm font-medium text-gray-900 hover:text-primary transition-colors"
                        >
                          {material.title}
                        </Link>
                        <p className="text-xs text-gray-500 mt-1">
                          {material.chapterTitle} • {material.readingTime} min
                          read
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No recent materials. Start reading to see your progress!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>クイックアクション</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/articles">
                <Button className="w-full" size="sm">
                  <BookOpen className="w-4 h-4 mr-2" />
                  記事を見る
                </Button>
              </Link>
              <Button variant="outline" className="w-full" size="sm">
                <Clock className="w-4 h-4 mr-2" />
                勉強スケジュール
              </Button>
            </CardContent>
          </Card>

          {mockProgress.unreadCount > 0 && (
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-primary">
                  新しい記事があります
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-3">
                  {mockProgress.unreadCount}件の未読記事があります。
                </p>
                <Link href="/articles">
                  <Button size="sm" className="w-full">
                    記事を読む
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
