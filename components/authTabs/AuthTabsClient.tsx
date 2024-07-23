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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams, useRouter } from "next/navigation";
import { login, signup, resetPasswordEmail } from "./actions";
import { useToast } from "../ui/use-toast";
import { useEffect, useState } from "react";

export default function AuthTabsClient() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message") || null;
  const action = searchParams.get("action");
  const { toast } = useToast();
  const router = useRouter();

  const [isResetPassword, setIsResetPassword] = useState<boolean>(false);

  useEffect(() => {
    if (message && action) {
      toast({
        variant: action === "error" ? "destructive" : "default",
        title: action === "error" ? "Error" : "Success",
        description: message,
      });
      router.replace("/", undefined);
    }
  }, [message, action, toast, router]);

  return (
    <>
      {isResetPassword ? (
        <Card className="w-[400px] h-[400px] flex flex-col justify-center">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              Enter your email to reset your password
            </CardDescription>
          </CardHeader>
          <form action={resetPasswordEmail}>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="reset-email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button type="submit" className="w-full">
                Reset Password
              </Button>
              <Button
                onClick={() => setIsResetPassword(false)}
                variant="outline"
                className="w-full"
              >
                Cancel
              </Button>
            </CardFooter>
          </form>
        </Card>
      ) : (
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card className="h-[400px] flex flex-col justify-center">
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
              </CardHeader>
              <form id="login-form">
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      minLength={6}
                      name="password"
                      id="password"
                      type="password"
                      required
                    />
                  </div>
                  <p
                    className="text-sm cursor-pointer hover:underline"
                    onClick={() => setIsResetPassword(true)}
                  >
                    Forgot password?
                  </p>
                </CardContent>
                <CardFooter>
                  <Button formAction={login} className="w-full">
                    Login
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card className="h-[400px] flex flex-col justify-center">
              <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Create your account</CardDescription>
              </CardHeader>
              <form id="signup-form">
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Cena"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john.cena@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      minLength={6}
                      name="password"
                      id="password"
                      type="password"
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button formAction={signup} className="w-full">
                    Sign Up
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </>
  );
}
