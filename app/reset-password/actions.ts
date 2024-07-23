"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function resetPassword(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm-password") as string;
  const token_hash = formData.get("token_hash") as string;
  const type = formData.get("type") as string;

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  if (!token_hash || type !== "recovery") {
    return { error: "Invalid or missing reset token" };
  }

  const { error: verifyError } = await supabase.auth.verifyOtp({
    token_hash,
    type: "recovery",
  });

  if (verifyError) {
    return { error: "Unable to verify reset token. Link may have expired." };
  }

  const { error: updateError } = await supabase.auth.updateUser({ password });

  if (updateError) {
    console.error(updateError);
    return { error: "Unable to reset password. Please try again." };
  }

  return {
    success: "Your password has been reset successfully. You are logged in.",
  };
}
