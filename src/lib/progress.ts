// lib/progress.ts
import { supabase } from "@/lib/supabase";

export async function getUserProgress(userId: string) {
  const { data, error } = await supabase
    .from("progress")
    .select("article_slug, is_read")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching progress:", error);
    return {};
  }

  return data.reduce(
    (
      acc: Record<string, boolean>,
      row: { article_slug: string; is_read: boolean }
    ) => {
      acc[row.article_slug] = row.is_read;
      return acc;
    },
    {} as Record<string, boolean>
  );
}

export async function getArticleReadStatus(
  userId: string,
  articleSlug: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from("progress")
    .select("is_read")
    .eq("user_id", userId)
    .eq("article_slug", articleSlug)
    .maybeSingle();

  if (error) {
    console.error("Error fetching article read status:", {
      error,
      userId,
      articleSlug,
      errorMessage: error.message,
      errorDetails: error.details,
      errorHint: error.hint,
    });
    return false;
  }

  // レコードが存在しない場合はfalseを返す
  if (!data) {
    return false;
  }

  return data.is_read || false;
}

export async function markArticleAsRead(
  userId: string,
  articleSlug: string
): Promise<boolean> {
  // まず既存のレコードを確認
  const { data: existingRecord } = await supabase
    .from("progress")
    .select("id")
    .eq("user_id", userId)
    .eq("article_slug", articleSlug)
    .maybeSingle();

  let error;

  if (existingRecord) {
    // 既存のレコードを更新
    const { error: updateError } = await supabase
      .from("progress")
      .update({
        is_read: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existingRecord.id);
    error = updateError;
  } else {
    // 新しいレコードを作成（UUIDを明示的に生成）
    const { error: insertError } = await supabase.from("progress").insert({
      id: crypto.randomUUID(),
      user_id: userId,
      article_slug: articleSlug,
      is_read: true,
      updated_at: new Date().toISOString(),
    });
    error = insertError;
  }

  if (error) {
    console.error("Error marking article as read:", {
      error,
      userId,
      articleSlug,
      errorMessage: error.message,
      errorDetails: error.details,
      errorHint: error.hint,
    });
    return false;
  }

  return true;
}
