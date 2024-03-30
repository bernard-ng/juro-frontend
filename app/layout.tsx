import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from 'geist/font/sans';
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Juro",
  description: "Assistant juriste",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={cn(GeistSans.className, "bg-gray-50 dark:bg-gray-950 selection:bg-secondary-500/50 selection:text-secondary-950 dark:selection:bg-secondary-300/10 dark:selection:text-white")}>
        {children}
      </body>
    </html>
  );
}
