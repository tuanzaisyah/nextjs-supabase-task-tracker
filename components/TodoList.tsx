import TodoItem from "@/components/TodoItem";
import { Todo } from "@/types/custom";

export default function TodoList({ todos }: { todos: Array<Todo> }) {
  return (
    <div className="flex flex-col gap-4 mt-8">
      {todos?.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
