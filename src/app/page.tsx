"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl font-bold">Code Campas</h1>
      <p className="text-lg">
        Code Campas is a platform for learning and building web applications.
      </p>
      <Button className="cursor-pointer" onClick={() => router.push("/login")}>
        Get Started
      </Button>
    </div>
  );
}
