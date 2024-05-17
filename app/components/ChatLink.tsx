import DropdownMenu from "@tailus-ui/DropdownMenu";
import { Button } from "@tailus-ui/Button";
import { EllipsisVertical, Pencil, Share, Trash } from "lucide-react";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils";

export type ChatLinkProps = {
    href: string;
    title: string;
}

export const ChatLink: React.FC<ChatLinkProps> = ({
    href,
    title
}) =>{
    const [isRenaming, setIsRenaming] = useState(false);
    const linkRef = useRef<HTMLAnchorElement>(null);
    const pathname = usePathname()

    useEffect(() => {

        if (isRenaming && linkRef.current) {
            linkRef?.current.focus();
        }

        const handleClickOutside = (e: MouseEvent) => {
            if (linkRef.current && !linkRef.current.contains(e.target as Node) && (e.target as Element).id !== 'saveButton') {
                setIsRenaming(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isRenaming]);

    return (
        <div
            className={
                cn(
                    "relative group rounded-[--btn-border-radius] hover:bg-gray-100 h-9 dark:hover:bg-gray-900 has-[[data-state='open']]:bg-gray-100 dark:has-[[data-state='open']]:bg-gray-900",
                    isRenaming && "z-10"
                )
            }
        >
            <Link
                ref={linkRef}
                href={href}
                contentEditable={isRenaming}
                onClick={(event) => {
                    if (isRenaming) {
                        event.preventDefault();
                    }
                }}
                className={
                    cn(
                        "rounded-[--btn-border-radius] h-full w-full flex items-center px-4 text-sm text-gray-700 dark:text-gray-300 focus-visible:outline outline-2 outline-primary-600 text-nowrap",
                        pathname.includes(href) && "bg-gray-100 dark:bg-gray-900"
                    )
                }>
                <span>{title}</span>
            </Link>
            {
                isRenaming &&
                <Button id="saveButton" icon="only" size="sm" variant="soft" colorVariant="primary" label="Enregistrer" className="absolute inset-y-0.5 right-0.5 dark:bg-gray-800 dark:text-primary-400">
                    <svg className="!size-5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M3 5a2 2 0 0 1 2-2h1v3.5A1.5 1.5 0 0 0 7.5 8h4A1.5 1.5 0 0 0 13 6.5V3h.379a2 2 0 0 1 1.414.586l1.621 1.621A2 2 0 0 1 17 6.621V15a2 2 0 0 1-2 2v-5.5a1.5 1.5 0 0 0-1.5-1.5h-7A1.5 1.5 0 0 0 5 11.5V17a2 2 0 0 1-2-2zm9-2H7v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5zm2 8.5V17H6v-5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5"></path></svg>
                </Button>
            }
            {
                !isRenaming &&
                <div className="absolute inset-y-0.5 my-auto right-0.5 hidden group-hover:block has-[[data-state='open']]:block">
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild className="data-[state=open]:bg-white dark:data-[state=open]:bg-gray-800">
                            <Button icon="only" size="sm" variant="ghost" colorVariant="gray" label="Menu du chat" className="focus-visible:outline outline-2 outline-primary-600 outline-offset-2">
                                <EllipsisVertical />
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                        <DropdownMenu.Content variant="soft" intent="gray" className="*:py-3 *:gap-3 dark:bg-gray-800 dark:border-gray-700/75 min-w-fit">
                            <DropdownMenu.Item>
                                <Share className="size-4" />
                                Partager
                            </DropdownMenu.Item>
                            <DropdownMenu.Item onClick={() => setIsRenaming(true)}>
                                <Pencil className="size-4" />
                                Renommer
                            </DropdownMenu.Item>
                            <DropdownMenu.Separator className="!py-0 dark:bg-gray-700/75"/>
                            <DropdownMenu.Item intent="danger">
                                <Trash className="size-4"/>
                                Supprimer
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                </div>
            }
        </div>
    )
}