import { Header } from "@/components/common/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 px-4 py-8 md:px-16 md:py-12 h-[calc(100vh-64px)] bg-gray-50 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
