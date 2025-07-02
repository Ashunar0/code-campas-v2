import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { UserCheck, UserX } from "lucide-react";

interface BulkActionsProps {
  selectedUsers: string[];
  onBulkAction: (action: "approve" | "reject") => void;
}

export const BulkActions = ({
  selectedUsers,
  onBulkAction,
}: BulkActionsProps) => {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="px-6 py-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">
            {selectedUsers.length} user{selectedUsers.length > 1 ? "s" : ""} has
            been selected.
          </p>
          <div className="flex space-x-2">
            <Button
              size="sm"
              onClick={() => onBulkAction("approve")}
              disabled={selectedUsers.length === 0}
              className="h-8"
            >
              <UserCheck className="h-4 w-4 mr-1" />
              Approve All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction("reject")}
              disabled={selectedUsers.length === 0}
              className="h-8"
            >
              <UserX className="h-4 w-4 mr-1" />
              Reject All
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
