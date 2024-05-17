import DropdownMenu from "@tailus-ui/DropdownMenu";
import { Button } from "@tailus-ui/Button";
import { EllipsisVertical, Pencil, Share, Trash } from "lucide-react";
import Link from "next/link";

export function ChatLink() {
    return (
        <div className="relative rounded-[--btn-border-radius] hover:bg-gray-100 h-9 dark:hover:bg-gray-900 has-[[data-state='open']]:bg-gray-100 dark:has-[[data-state='open']]:bg-gray-900">
            <Link href="" className="block rounded-[--btn-border-radius] h-full w-full flex items-center px-4 text-sm text-gray-700 dark:text-gray-300 focus-visible:outline outline-2 outline-primary-600">
            <span>Nom du chat</span>
            </Link>
            <div className="absolute inset-y-0.5 my-auto right-0.5">
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild className="data-[state=open]:bg-white dark:data-[state=open]:bg-gray-800">
                    <Button icon="only" size="sm" variant="ghost" colorVariant="gray" label="Menu du chat" className="focus-visible:outline outline-2 outline-primary-600 outline-offset-2">
                        <EllipsisVertical />
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                <DropdownMenu.Content variant="soft" className="*:py-3 *:gap-3 dark:bg-gray-800 dark:border-gray-700/75 min-w-fit">
                    <DropdownMenu.Item>
                        <Share className="size-4" />
                        Partager
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
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
        </div>
    )
}