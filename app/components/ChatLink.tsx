import DropdownMenu from "@tailus-ui/DropdownMenu";
import { Button } from "@tailus-ui/Button";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils";
import { toast } from 'sonner'
import AlertDialog from "./tailus-ui/AlertDialog";

export type ChatLinkProps = {
    href: string;
    title: string;
}

export const ChatLink: React.FC<ChatLinkProps> = ({
    href,
    title
}) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const pathname = usePathname()

    return (
        <>
        <div className="relative group rounded-[--btn-border-radius] hover:bg-gray-100 h-9 dark:hover:bg-gray-900 has-[[data-state='open']]:bg-gray-100 dark:has-[[data-state='open']]:bg-gray-900">
            <Link
                href={href}
                className={cn(
                        "rounded-[--btn-border-radius] h-full w-full flex items-center px-4 text-sm text-gray-700 dark:text-gray-300 focus-visible:outline outline-2 outline-primary-600 text-nowrap",
                        pathname.includes(href) && "bg-gray-100 dark:bg-gray-900"
                    )
                }
            >
                {title}
            </Link>
            <div className="absolute inset-y-0.5 my-auto right-0.5 hidden group-hover:block has-[[data-state='open']]:block">
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild className="data-[state=open]:bg-white dark:data-[state=open]:bg-gray-800">
                        <Button icon="only" size="sm" variant="ghost" colorVariant="gray" label="Menu du chat" className="focus-visible:outline outline-2 outline-primary-600 outline-offset-2">
                            <EllipsisVertical />
                        </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                        <DropdownMenu.Content variant="soft" intent="gray" className="*:py-3 *:gap-3 dark:bg-gray-800 min-w-fit">
                            <DropdownMenu.Item>
                                <Pencil className="size-4" />
                                Renommer
                            </DropdownMenu.Item>
                            <DropdownMenu.Separator className="!py-0 dark:bg-gray-700/75"/>
                            <DropdownMenu.Item intent="danger" onClick={() => setIsAlertOpen(true)}>
                                <Trash className="size-4"/>
                                Supprimer
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            </div>
        </div>
            
            <AlertDialog.Root variant="centred" open={isAlertOpen} onOpenChange={() => setIsAlertOpen(false)}>
                <AlertDialog.Portal>
                    <AlertDialog.Overlay onClick={() => setIsAlertOpen(false)} className="bg-white/50 dark:bg-gray-950/65" />
                    <AlertDialog.Content className="max-w-xs p-0 overflow-hidden dark:bg-gray-800">
                        <div className="p-6">
                            <AlertDialog.Title>
                                Supprimer le chat ?
                            </AlertDialog.Title>
                            <AlertDialog.Description className="mt-2 mb-0">
                                En supprimant ce chat, vous perdrez toutes les données associées.
                            </AlertDialog.Description>
                        </div>

                        <AlertDialog.Actions className="border-t divide-x gap-0 mt-0 dark:border-gray-700 dark:divide-gray-700">
                            <AlertDialog.Cancel asChild>
                                <Button className="w-1/2 justify-center rounded-none" size="lg" variant="ghost" colorVariant="gray" label="Annuler" />
                            </AlertDialog.Cancel>
                            <AlertDialog.Action asChild>
                                <Button className="w-1/2 justify-center rounded-none" size="lg" variant="ghost" colorVariant="danger" label="Supprimer" onClick={() => toast.success('Chat supprimé avec succès')} />
                            </AlertDialog.Action>
                        </AlertDialog.Actions>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        </>
    )
}