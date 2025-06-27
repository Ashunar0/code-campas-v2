import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl font-bold">Code Campas</h1>
      <p className="text-lg">
        Code Campas is a platform for learning and building web applications.
      </p>
      <Button className="cursor-pointer">Get Started</Button>
    </div>
  );
}
