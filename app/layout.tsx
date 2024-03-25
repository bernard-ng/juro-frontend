import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from 'geist/font/sans';
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Ng bot",
  description: "AI Chatbot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={cn(GeistSans.className, "bg-gray-100 dark:bg-gray-925")}>
        {children}
      </body>
    </html>
  );
}
