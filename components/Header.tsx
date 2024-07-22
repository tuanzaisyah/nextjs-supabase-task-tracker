import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { LogOut } from "lucide-react";
import { signOut } from "./authTabs/actions";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="z-10 sticky top-0 w-full border-b border-border ">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold text-2xl">TodoNext</span>
          </a>
        </nav>
        {user !== null ? (
          <form
            action={signOut}
            className="flex flex-1 items-center justify-end space-x-2"
          >
            <Button>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </form>
        ) : (
          ""
        )}
      </div>
    </header>
  );
}
