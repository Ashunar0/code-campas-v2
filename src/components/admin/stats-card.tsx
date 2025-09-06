import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

export function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          {icon}
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {value !== undefined ? value : <Skeleton className="h-4 w-32" />}
            </div>
            <p className="text-sm text-gray-600">{title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
