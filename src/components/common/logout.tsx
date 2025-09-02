import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const Logout = () => {
  return (
    <Dialog>
      <DialogContent>
        <DialogTitle>セッションがタイムアウトしました</DialogTitle>
        <DialogDescription>
          もう一度ログインしてください。
          <Button variant="outline">ログイン</Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
