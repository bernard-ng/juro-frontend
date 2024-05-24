"use client"
import Link from "next/link";
import {Info, LogOut, MenuIcon, PlusIcon} from "lucide-react";
import {ChatLink, ChatLinkProps} from "./ChatLink";
import {ghostLeadingIconButton} from "@tailus/themer-button";
import {useEffect, useState} from "react";
import {Button} from "@tailus-ui/Button";
import {cn} from "@/lib/utils";
import {useChats, useChatsDispatcher} from "@lib/contexts/ChatsContext";
import useSWR, {SWRResponse} from "swr";
import Endpoints from "@lib/api/endpoints";
import {getChats} from "@lib/api/api";

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(true)
    const {data}: SWRResponse<ChatLinkProps[], Error, boolean> = useSWR(Endpoints.chats, getChats)
    const chats = useChats()
    const chatsDispatcher = useChatsDispatcher()

    useEffect(() => {
        if (data) {
            chatsDispatcher({type: 'SET_CHATS', payload: data})
        }
    }, [data]);

    return (
        <aside
            className={cn("fixed flex flex-col left-0 px-4 duration-300 ease-in-out -translate-x-64 py-6 inset-y-0 border-r w-64 bg-white dark:bg-gray-900 dark:border-transparent darK:shadow-md dark:shadow-gray-950", isOpen && "translate-x-0")}>
            <div className="mb-6">
                <Button
                    className={cn("delay-75", !isOpen && "translate-x-64")} icon="only" label="Ouvrir la barre"
                    size="md" variant="ghost" colorVariant="gray"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <MenuIcon/>
                </Button>
            </div>
            <Link href="/chat"
                  className="h-9 rounded-[--btn-border-radius] flex gap-3 items-center font-normal px-3 text-sm border shadow-sm shadow-gray-950/5 text-gray-950 hover:bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-900 dark:text-white dark:border-gray-800">
                <PlusIcon className="size-4"/>
                <span>Nouveau chat</span>
            </Link>

            <div className="mt-6">
                <span className="block ml-4 text-gray-600 dark:text-gray-400 text-sm">Récents</span>
                <div className="space-y-px mt-2 max-h-96 overflow-y-auto">
                    {
                        chats.map((link: ChatLinkProps, index: number) => (
                            <ChatLink key={index} id={link.id} href={link.href} title={link.title}/>
                        ))
                    }
                </div>
            </div>

            <div className="mt-auto">
                <Link className={ghostLeadingIconButton.gray.md} href="/parametres">
                    <Info className="size-4"/>
                    <span className="text-sm ml-1">Paramètres</span>
                </Link>

                <Link className={ghostLeadingIconButton.gray.md} href="/logout">
                    <LogOut className="size-4"/>
                    <span className="text-sm ml-1">Déconnexion</span>
                </Link>
            </div>
        </aside>
    );
}
