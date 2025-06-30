import { Material } from "@/types/type";
import { Home } from "lucide-react";
import Link from "next/link";

export function BreadCrumb({ material }: { material: Material }) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600">
      <Link href="/dashboard" className="hover:text-primary">
        <Home className="h-4 w-4" />
      </Link>
      <span>/</span>
      <Link href="/articles" className="hover:text-primary">
        Articles
      </Link>
      <span>/</span>
      <span className="text-gray-900">{material.chapterTitle}</span>
      <span>/</span>
      <span className="text-gray-900">{material.title}</span>
    </nav>
  );
}
