import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";

export default async function Todos() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }
  const name = user?.user_metadata?.name;

  const { data: todos } = await supabase
    .from("todos")
    .select()
    .order("created_at", { ascending: false });

  return (
    <div className="w-screen h-[calc(100vh-57px)] flex flex-col items-center px-6">
      <h1 className="text-3xl font-semibold mb-8 mt-24">
        Hi <span className="text-emerald-950">{name}, </span> your todo list
      </h1>
      <AddTodo />
      <TodoList todos={todos ?? []} />
    </div>
  );
}
