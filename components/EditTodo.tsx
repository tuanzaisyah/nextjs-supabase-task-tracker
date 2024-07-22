import { updateTodo } from "@/app/todos/actions";
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
import { Todo } from "@/types/custom";
import { Pencil } from "lucide-react";
import { FormEvent, useState } from "react";
import { useToast } from "./ui/use-toast";

export function EditTodo({ todo }: { todo: Todo }) {
  const { toast } = useToast();
  const [task, setTask] = useState(todo.task || "");
  const [openDialog, setOpenDialog] = useState(false);

  const handleUpdateTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateTodo({ ...todo, task });
      setOpenDialog(false);
      toast({
        variant: "default",
        title: "Success",
        description: "Successfully update task",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh Oh! Something went wrong",
        description: "Error update task",
      });
    }
  };
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
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
        <form onSubmit={handleUpdateTodo}>
          <div className="flex flex-col items-center gap-4">
            <Label htmlFor="name" className="text-start text-lg">
              Task
            </Label>
            <Input
              id="task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className=""
            />
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit" className="w-full">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
