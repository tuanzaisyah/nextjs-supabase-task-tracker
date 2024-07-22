"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash } from "lucide-react";
import { EditTodo } from "./EditTodo";
import { Todo } from "@/types/custom";
import { MouseEventHandler, useState } from "react";
import { deleteTodo, updateTodo } from "@/app/todos/actions";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";

export default function TodoItem({ todo }: { todo: Todo }) {
  const { toast } = useToast();
  const [isChecked, setIsChecked] = useState(todo.is_complete);
  const [isPending, setIsPending] = useState(false);

  const handleDeleteTodo: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    try {
      setIsPending(true);
      await deleteTodo(todo.id);
      toast({
        variant: "default",
        title: "Success",
        description: "Successfully delete task",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh Oh! Something went wrong",
        description: "Error delete task",
      });
    }
    setIsPending(false);
  };

  const handleChecked = async (val: boolean) => {
    setIsChecked(val);
    try {
      await updateTodo({ ...todo, is_complete: val });
      toast({
        variant: "default",
        title: val ? "Hooray! You did it!" : "Ughh",
        description: val
          ? "You completed the task"
          : "Need to recheck something?",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh Oh! Something went wrong",
        description: "Error updating task",
      });
    }
  };

  return (
    <Card className={cn("rounded-xl", isPending && "opacity-50")}>
      <CardContent className="w-[350px] md:w-[500px] flex items-start justify-between  gap-3 p-4">
        <div className="flex flex-row items-center gap-2">
          <span className="size-10 flex items-center justify-center">
            <Checkbox
              checked={Boolean(isChecked)}
              onCheckedChange={handleChecked}
            />
          </span>
          <p className={cn({ "line-through": isChecked })}>{todo.task}</p>
        </div>
        <div className="flex flex-row gap-2">
          <EditTodo todo={todo} />
          <Button onClick={handleDeleteTodo} variant="ghost" size="icon">
            <Trash className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
