import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";

const font = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TodoNext",
  description: "To do list web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Header />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
