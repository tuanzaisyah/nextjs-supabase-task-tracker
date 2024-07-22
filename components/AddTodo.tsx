"use client";
import { addTodo } from "@/app/todos/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { useToast } from "./ui/use-toast";

export default function AddTodo() {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const handleAddTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask = new FormData(formRef.current!);
    try {
      setIsPending(true);
      await addTodo(newTask);
      toast({
        variant: "default",
        title: "Success",
        description: "Successfully added new task",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh Oh! Something went wrong",
        description: "Error adding new task",
      });
    }
    formRef.current?.reset();
    setIsPending(false);
  };

  return (
    <div>
      <Card className="rounded-full">
        <CardContent className="md:w-[500px] p-4">
          <form
            ref={formRef}
            onSubmit={handleAddTodo}
            className="flex gap-2 items-center"
          >
            <Input
              minLength={3}
              name="todo"
              required
              placeholder="Add new task"
              className="text-lg h-12 rounded-full px-6"
              disabled={isPending}
            />
            <Button className="rounded-xl" disabled={isPending}>
              <Send />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
