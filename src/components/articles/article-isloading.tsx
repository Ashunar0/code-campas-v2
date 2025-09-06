import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import { Card, CardContent } from "../ui/card";
import { CircularProgress } from "../dashboard/circular-progress";
import { BookOpen } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export function ArticleIsLoading() {
  return (
    <Accordion type="multiple" defaultValue={["loading"]} className="space-y-4">
      <AccordionItem key="loading" value="loading">
        <Card>
          <AccordionTrigger className="px-6 py-2 hover:no-underline">
            <div className="flex items-center justify-between w-full mr-4">
              <div className="flex items-center space-x-4 py-2">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900">
                    <Skeleton className="h-4 w-32" />
                  </h3>
                </div>
              </div>

              <div className="text-right">
                <CircularProgress percentage={0} size={60} />
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-6 pb-4">
              <div className="grid gap-3">
                <Card className="hover:shadow-md transition-shadow duration-200 border-gray-200 hover:border-primary/50">
                  <CardContent className="px-6 py-1">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <h4 className="font-semibold text-gray-900">
                          <Skeleton className="h-4 w-32" />
                        </h4>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow duration-200 border-gray-200 hover:border-primary/50">
                  <CardContent className="px-6 py-1">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <h4 className="font-semibold text-gray-900">
                          <Skeleton className="h-4 w-32" />
                        </h4>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow duration-200 border-gray-200 hover:border-primary/50">
                  <CardContent className="px-6 py-1">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <h4 className="font-semibold text-gray-900">
                          <Skeleton className="h-4 w-32" />
                        </h4>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow duration-200 border-gray-200 hover:border-primary/50">
                  <CardContent className="px-6 py-1">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <h4 className="font-semibold text-gray-900">
                          <Skeleton className="h-4 w-32" />
                        </h4>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
}
