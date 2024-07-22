import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AuthTabsClient from "./AuthTabsClient";

export default async function AuthTabs() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/todos");
  }

  return <AuthTabsClient />;
}
