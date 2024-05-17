"use client"
import Link from "next/link";
import { softLeadingIconButton } from "@tailus/themer-button";
import { PlusIcon} from "lucide-react";
import { cn } from "@lib/utils";
import { ChatLink } from "./ChatLink";

export function Sidebar() {
  return (
    <aside className="fixed left-0 px-4 pt-20 inset-y-0 border-r w-64 dark:border-gray-800">
            <Link href="/" className={cn(softLeadingIconButton.gray.md, "-mx-1 font-normal px-4 text-sm")}>
              <PlusIcon className="size-4" />
              <span>Nouveau chat</span>
            </Link>

            <div className="mt-6">
              <span className="block ml-4 text-gray-600 dark:text-gray-400 text-sm">Récents</span>
              <div className="space-y-px mt-2">
                    <ChatLink />
              </div>
            </div>
          </aside>
  );
}