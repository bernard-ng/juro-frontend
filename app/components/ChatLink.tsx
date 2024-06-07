'use client';
import DropdownMenu from "@tailus-ui/DropdownMenu";
import { Button } from "@tailus-ui/Button";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import React, {useState} from "react";
import {usePathname, useRouter} from 'next/navigation'
import { cn } from "@/lib/utils";
import { toast } from 'sonner'
import AlertDialog from "@tailus-ui/AlertDialog";
import Dialog from "@tailus-ui/Dialog";
import Form from "@tailus-ui/Form";
import {deleteChat, updateChat} from "@lib/api/api";
import {useChatsDispatcher} from "@lib/contexts/ChatsContext";
import {useBearerToken} from "@lib/contexts/AuthContext";

export type ChatLinkProps = {
    id: number,
    href: string;
    title: string;
}

export const ChatLink: React.FC<ChatLinkProps> = ({
    id,
    href,
    title
}) => {
    const token = useBearerToken()
    const router = useRouter()
    const pathname = usePathname()
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [renameInputValue, setRenameInputValue] = useState(title);
    const chatsDispatcher = useChatsDispatcher();

    const handleUpdateChat = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const response = await updateChat(id.toString(), renameInputValue)
        if (response.success) {
            setIsDialogOpen(false)
            setRenameInputValue(renameInputValue)
            chatsDispatcher({type: 'UPDATE_CHAT', payload: {id, href, title: renameInputValue}})
            toast.success(`Chat renommé avec succès à ${renameInputValue}`)
        } else {
            toast.error("Désolé, une erreur s'est produite. Veuillez réessayer.")
        }
    }

    const handleDeleteChat = async () => {
        const response = await deleteChat(id.toString())

        if (response.success) {
            setIsAlertOpen(false)
            chatsDispatcher({type: 'DELETE_CHAT', payload: {id, href, title}})
            toast.success('Chat supprimé avec succès')

            if (pathname == href) {
                router.replace('/chat')
            }
        } else {
            toast.error("Désolé, une erreur s'est produite. Veuillez réessayer.")
        }
    }

    return (
        <>
        <div className="relative group rounded-[--btn-border-radius] hover:bg-gray-100 h-9 dark:hover:bg-gray-800 has-[[data-state='open']]:bg-gray-100 dark:has-[[data-state='open']]:bg-gray-800">
            <Link
                href={href}
                className={cn(
                        "rounded-[--btn-border-radius] h-full w-full flex items-center px-4 text-sm text-gray-700 dark:text-gray-300 focus-visible:outline outline-2 outline-primary-600 text-nowrap truncate overflow-hidden",
                        (pathname == href) && "bg-gray-100 dark:bg-gray-800"
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
                        <DropdownMenu.Content sideOffset={5} variant="soft" intent="gray" className="*:py-3 *:gap-3 dark:bg-gray-800 min-w-fit">
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
                            <Button className="w-1/2 justify-center rounded-none" size="lg" variant="ghost" colorVariant="danger" label="Supprimer" onClick={handleDeleteChat} />
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
                    
                    <Form.Root className="mt-4" onSubmit={handleUpdateChat}>
                        <Form.Field name="name">
                            <Form.Input
                                type="text"
                                value={renameInputValue}
                                name="name"
                                variant="outlined"
                                size="lg"
                                className="hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRenameInputValue(e.target.value)}
                            />
                        </Form.Field>

                        <Dialog.Actions className="gap-0">
                            <Dialog.Close asChild>
                                <Button label="Annuler" variant="ghost" colorVariant="primary" size="md"/>
                            </Dialog.Close>
                            <Button
                                type="submit"
                                label="Renommer"
                                variant="ghost"
                                colorVariant="primary"
                                size="md"
                                disabled={renameInputValue.trim() === title.trim()}
                            />
                        </Dialog.Actions>
                    </Form.Root>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
        </>
    )
}
