import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";

export function EditItem() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Edit your task here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="flex flex-col items-center gap-4">
            <Label htmlFor="name" className="text-start text-lg">
              Task
            </Label>
            <Input id="name" className="" />
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
