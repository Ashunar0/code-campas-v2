import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ArticleNotFound() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          記事が見つかりません
        </h2>
        <p className="text-gray-600 mb-4">お探しの記事は存在しません。</p>
        <Link href="/articles">
          <Button className="cursor-pointer">記事一覧へ戻る</Button>
        </Link>
      </div>
    </div>
  );
}
