"use client"
import Link from "next/link";
import { PlusIcon} from "lucide-react";
import { ChatLink, ChatLinkProps } from "./ChatLink";

const links: ChatLinkProps[] = [
  {
    href: "/chat1",
    title: "Chat 1",
  },
  {
    href: "/chat2",
    title: "Chat 2",
  },
  {
    href: "/chat3",
    title: "Chat 3",
  },    
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 px-4 pt-20 inset-y-0 border-r w-64 bg-white dark:bg-gray-950 dark:border-gray-800">
        <Link href="/" className="h-9 rounded-[--btn-border-radius] flex gap-3 items-center font-normal px-3 text-sm border shadow-sm shadow-gray-950/5 text-gray-950 hover:bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-900 dark:text-white dark:border-gray-800">
            <PlusIcon className="size-4" />
            <span>Nouveau chat</span>
        </Link>

        <div className="mt-6">
            <span className="block ml-4 text-gray-600 dark:text-gray-400 text-sm">Récents</span>
            <div className="space-y-px mt-2">
              {
                links.map((link, index) => (
                  <ChatLink key={index} href={link.href} title={link.title} />
                ))
              }
            </div>
        </div>
    </aside>
  );
}