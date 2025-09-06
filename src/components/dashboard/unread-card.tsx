import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export function UnreadCard() {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="text-primary">新しい記事があります</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 mb-3">件の未読記事があります。</p>
        <Link href="/articles">
          <Button size="sm" className="w-full">
            <BookOpen className="w-4 h-4 mr-2" />
            記事を読む
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
