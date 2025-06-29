import { Code } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ログイン | CodeCampas",
  description: "ログインページ",
};

export default function LoginPage() {
  return (
    <div>
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary rounded-xl">
            <Code className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">CodeCampas</h1>
      </div>
      <LoginForm />
    </div>
  );
}
