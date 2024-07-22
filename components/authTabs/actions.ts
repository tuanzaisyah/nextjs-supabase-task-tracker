"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return redirect(
      `/?message=${encodeURIComponent(error.message)}&action=error`
    );
  }
  revalidatePath("/", "layout");
  return redirect("/todos?message=Login successful&action=success");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        name: formData.get("name") as string,
      },
    },
  };
  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return redirect(
      `/?message=${encodeURIComponent(error.message)}&action=error`
    );
  }

  revalidatePath("/", "layout");
  return redirect(
    "/?message=Please check your email for confirmation&action=success"
  );
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/");
}