"use client";

import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getAuthInstance, db } from "@/lib/firebase";
import { User as CustomUser } from "@/types/type";

type AuthContextType = {
  user: User | null;
  userDetails: CustomUser | null;
  loading: boolean;
  refreshUserDetails: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  userDetails: null,
  loading: true,
  refreshUserDetails: async () => false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async (uid: string): Promise<boolean> => {
    try {
      const ref = doc(db, "users", uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        setUserDetails(null);
        return false;
      }

      const data = snap.data();
      const userWithDates: CustomUser = {
        ...data,
        createdAt: data.createdAt?.toDate?.() ?? new Date(),
        updatedAt: data.updatedAt?.toDate?.() ?? new Date(),
      } as CustomUser;

      setUserDetails(userWithDates);

      // 承認されていない場合はログアウト
      if (userWithDates.status !== "approved") {
        await signOut(getAuthInstance());
        setUser(null);
        setUserDetails(null);
        return false;
      }

      return true;
    } catch (err) {
      console.error(err);
      setUserDetails(null);
      return false;
    }
  };

  const refreshUserDetails = async (): Promise<boolean> => {
    if (user?.uid) {
      return await fetchUserDetails(user.uid);
    }
    return false;
  };

  useEffect(() => {
    // クライアントサイドでのみ実行
    if (typeof window === "undefined") {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(getAuthInstance(), async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser?.uid) {
        await fetchUserDetails(firebaseUser.uid);
      } else {
        setUserDetails(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, userDetails, loading, refreshUserDetails }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
