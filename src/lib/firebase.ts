import { FirebaseApp, initializeApp, getApps } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import {
  Auth,
  getAuth,
  initializeAuth,
  inMemoryPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app: FirebaseApp = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

// Authの遅延初期化（SSR環境でのlocalStorageエラーを防ぐ）
let authInstance: Auth | null = null;

export function getAuthInstance(): Auth {
  // クライアントサイドでのみ初期化
  if (typeof window === "undefined") {
    throw new Error("Firebase Auth can only be used on the client side");
  }

  if (!authInstance) {
    try {
      authInstance = initializeAuth(app, {
        persistence: browserLocalPersistence,
      });
    } catch (e) {
      // 既に初期化されている場合はインスタンスを取得
      authInstance = getAuth(app);
    }
  }

  return authInstance;
}

export { app, db };
