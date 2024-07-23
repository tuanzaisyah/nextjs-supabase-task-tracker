"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { resetPassword } from "./actions";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message") || null;
  const action = searchParams.get("action");
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Reset Password page loaded");
    console.log("Search params:", Object.fromEntries(searchParams.entries()));

    if (message && action) {
      toast({
        variant: action === "error" ? "destructive" : "default",
        title: action === "error" ? "Error" : "Success",
        description: message,
      });
    }
  }, [message, action, toast, router]);

  const handleResetPassword = useCallback(
    async (formData: FormData) => {
      setIsLoading(true);
      formData.append("token_hash", searchParams.get("token_hash") || "");
      formData.append("type", searchParams.get("type") || "");

      const result = await resetPassword(formData);

      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
      } else if (result.success) {
        toast({
          variant: "default",
          title: "Success",
          description: result.success,
        });
        router.push("/");
      }
      setIsLoading(false);
    },
    [searchParams, toast, router]
  );

  return (
    <div className="w-screen h-[calc(100vh-57px)] flex flex-col items-center justify-center px-6">
      <Card className="w-[400px] h-[400px] flex flex-col justify-center">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>Enter your new password</CardDescription>
        </CardHeader>
        <form id="reset-password">
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="reset-email">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="reset-email">Confirm Password</Label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button formAction={handleResetPassword} className="w-full">
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="w-full"
            >
              Cancel
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
