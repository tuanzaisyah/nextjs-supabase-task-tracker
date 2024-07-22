import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash } from "lucide-react";
import { EditItem } from "./EditItem";

export default async function TaskItem({ todo }: { todo: string }) {
  return (
    <Card className="rounded-xl">
      <CardContent className="w-[350px] md:w-[500px] flex items-start justify-between  gap-3 p-4">
        <div className="flex flex-row items-center gap-2">
          <span className="size-10 flex items-center justify-center">
            <Checkbox />
          </span>
          <p className="">{todo}</p>
        </div>
        <div className="flex flex-row gap-2">
          <EditItem />
          <Button variant="ghost" size="icon">
            <Trash className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
