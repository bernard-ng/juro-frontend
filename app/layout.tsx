import React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { GeistSans } from 'geist/font/sans'
import { cn } from "@lib/utils"
import { Toaster } from "sonner"

export const metadata: Metadata = {
  title: "Juro | Assistant Juriste",
  description: "Je suis Juro. Votre assistant juriste, je réponds à toutes vos questions sur le Droit congolais",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={cn(GeistSans.className, "bg-gray-50 dark:bg-gray-950 selection:bg-secondary-500/50 selection:text-secondary-950 dark:selection:bg-secondary-300/10 dark:selection:text-white")}>
        {children}
        <Toaster toastOptions={
          {
            classNames: {
              toast: "bg-white dark:bg-gray-800 flex dark:border-gray-800 shadow-lg shadow-gray-950/5 dark:shadow-gray-950",
              title: "text-gray-950 dark:text-white",
              description: "text-gray-700 dark:text-gray-300",
              error: 'text-danger-600 dark:text-danger-400',
              success: 'text-success-600 dark:text-success-400',
              warning: 'text-warning-600 dark:text-warning-400',
              info: 'text-info-600 dark:text-info-400',
            }
          }
        }/>
      </body>
    </html>
  )
}
