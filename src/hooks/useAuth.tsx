"use client";

import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { User as CustomUser } from "@/types/type";

type AuthContextType = {
  user: User | null;
  userDetails: CustomUser | null;
  loading: boolean;
  refreshUserDetails: () => Promise<boolean>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  userDetails: null,
  loading: true,
  refreshUserDetails: async () => false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async (userId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from("User")
        .select("*")
        .eq("id", userId)
        .single();

      if (error || !data) {
        console.error(error);
        setUserDetails(null);
        return false;
      }

      const userWithDates: CustomUser = {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };

      setUserDetails(userWithDates);

      // 承認されていないユーザーは自動的にログアウト
      if (userWithDates.status !== "approved") {
        await supabase.auth.signOut();
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
    if (user?.id) {
      return await fetchUserDetails(user.id);
    }
    return false;
  };

  useEffect(() => {
    // 初期セッション取得
    const initializeAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser?.id) {
        await fetchUserDetails(currentUser.id);
      }

      setLoading(false);
    };

    initializeAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser?.id) {
          await fetchUserDetails(currentUser.id);
        } else {
          setUserDetails(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, userDetails, loading, refreshUserDetails }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
