"use client";

import { useAuth } from "@/hooks/useAuth";

export const WelcomeSection = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
      <h1 className="text-lg font-bold text-gray-900 mb-2">
        おかえりなさい, {user?.user_metadata.name}さん！ 👋
      </h1>
      <p className="text-gray-600 text-md">
        プログラミングの旅を続けていきましょう！
      </p>
    </div>
  );
};
