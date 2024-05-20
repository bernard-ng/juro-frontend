import DropdownMenu from "@tailus-ui/DropdownMenu";
import { Button } from "@tailus-ui/Button";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils";
import { toast } from 'sonner'
import AlertDialog from "./tailus-ui/AlertDialog";
import Dialog from "./tailus-ui/Dialog";
import { FormInput } from "./tailus-ui/Form";

export type ChatLinkProps = {
    href: string;
    title: string;
}

export const ChatLink: React.FC<ChatLinkProps> = ({
    href,
    title
}) => {

    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [inputValue, setInputValue] = useState(title);

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
                            <DropdownMenu.Item onClick={() => setIsDialogOpen(true)}>
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
                <AlertDialog.Overlay className="bg-white/50 dark:bg-gray-950/65" />
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
            
        <Dialog.Root open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-white/50 dark:bg-gray-950/65" />
                <Dialog.Content className="p-6 dark:bg-gray-800">
                    <Dialog.Title className="text-lg">Renommer le Chat</Dialog.Title>
                    
                        <form
                            className="mt-4"
                            id="renameChatForm"
                            onSubmit={(e) => {
                                e.preventDefault();
                            }}
                        >
                        <FormInput
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            variant="outlined"
                            size="lg"
                            className="hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                        />  
                    </form>
                    
                    <Dialog.Actions className="gap-0">
                        <Dialog.Close asChild>
                            <Button label="Annuler" variant="ghost" colorVariant="primary" size="md"/>
                        </Dialog.Close>
                        <Button
                            type="submit"
                            form="renameChatForm"
                            label="Renommer"
                            variant="ghost"
                            colorVariant="primary"
                            size="md"
                            disabled={inputValue.trim() === title.trim()}
                            onClick={() => {
                                setIsDialogOpen(false);
                                toast.success(`Chat renommé à : "${inputValue}"`);
                                setInputValue(title);
                            }}
                        />
                    </Dialog.Actions>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
        </>
    )
}