import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// サインアップ（ユーザー作成 + Firestoreドキュメント）
export async function signUp(
  email: string,
  password: string,
  extraData: { name: string; period: number }
) {
  // 永続ログインに設定
  await setPersistence(auth, browserLocalPersistence);

  // Firebase Auth にユーザー作成
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  if (!user) throw new Error("ユーザー情報の取得に失敗しました");

  // Firestore にユーザー追加
  const userRef = doc(db, "users", user.uid);
  const existing = await getDoc(userRef);
  if (!existing.exists()) {
    // 新規作成時のみ初期ステータスを設定
    await setDoc(userRef, {
      uid: user.uid,
      email,
      ...extraData,
      status: "pending", // 初期は承認待ち
      permission: "student",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } else {
    // 既存の場合は上書きしない（特に status を保護）
    await setDoc(
      userRef,
      {
        uid: user.uid,
        email,
        ...extraData,
        updatedAt: new Date(),
      },
      { merge: true }
    );
  }

  return user;
}

// ログイン（ブラウザ閉じてもログイン状態を保持）
export async function logIn(email: string, password: string) {
  // 永続セッションを設定
  await setPersistence(auth, browserLocalPersistence);

  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
}

// ログアウト
export async function logOut() {
  await signOut(auth);
}

// Firestore のユーザー詳細取得
export async function fetchUserDetails(uid: string) {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return snap.data();
}
