import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default async function Header() {
  return (
    <header className="z-10 sticky top-0 w-full border-b border-border ">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold text-2xl">TodoNext</span>
          </a>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
