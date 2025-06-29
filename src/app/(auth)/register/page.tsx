import { Metadata } from "next";
import { Code } from "lucide-react";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "新規登録 | CodeCampas",
  description: "新規登録ページ",
};

export default function RegisterPage() {
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
      <RegisterForm />
    </div>
  );
}
