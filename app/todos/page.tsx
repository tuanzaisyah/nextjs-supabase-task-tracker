import TaskItem from "@/components/TaskItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export default async function Todos() {
  const todos = ["make dinner", "wash laundry"];
  return (
    <div className="w-screen h-[calc(100vh-57px)] flex flex-col items-center px-6">
      <h1 className="text-3xl font-semibold mb-8 mt-24">
        Hi <span className="text-emerald-950">name, </span> your todo list
      </h1>
      <div>
        <Card className="rounded-full">
          <CardContent className="md:w-[500px] p-4">
            <form className="flex gap-2 items-center">
              <Input
                minLength={3}
                name="todo"
                required
                placeholder="Add new task"
                className="text-lg h-12 rounded-full px-6"
              />
              <Button className="rounded-xl">
                <Send />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-4 mt-8">
        {todos.map((todo) => (
          <TaskItem key={todo} todo={todo} />
        ))}
      </div>
    </div>
  );
}
