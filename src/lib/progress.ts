// lib/progress.ts
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

// uidのユーザーの全進捗を取得
export async function getUserProgress(
  uid: string
): Promise<Record<string, boolean>> {
  const progressRef = collection(db, "users", uid, "progress");
  const snapshot = await getDocs(progressRef);

  const progress: Record<string, boolean> = {};
  snapshot.forEach((doc) => {
    const data = doc.data();
    // ドキュメントIDは encodeURIComponent されている可能性があるため decode
    const slug = decodeURIComponent(doc.id);
    progress[slug] = data.read ?? false; // readがtrueなら読了
  });

  return progress;
}

// 特定の記事の読了状態を取得
export async function getArticleReadStatus(
  uid: string,
  articleSlug: string
): Promise<boolean> {
  const safeId = encodeURIComponent(articleSlug);
  const docRef = doc(db, "users", uid, "progress", safeId);
  const snap = await getDoc(docRef);

  if (!snap.exists()) return false;

  const data = snap.data();
  return data.read ?? false;
}

// 記事を読了済みにマーク
export async function markArticleAsRead(
  uid: string,
  articleSlug: string
): Promise<boolean> {
  try {
    const safeId = encodeURIComponent(articleSlug);
    const docRef = doc(db, "users", uid, "progress", safeId);

    // 存在確認しなくても setDoc({ merge: true }) で更新 or 作成 両方可能
    await setDoc(
      docRef,
      {
        read: true,
        updatedAt: new Date(),
      },
      { merge: true } // 既存のデータを上書きせずに更新
    );

    return true;
  } catch (error) {
    console.error("Error marking article as read:", error);
    return false;
  }
}
