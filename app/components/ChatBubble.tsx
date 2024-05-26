import {Message} from "@/lib/api/model"
import Image from "next/image";
import React from "react";

export function ChatBubble({message} : {message: Message}) {
    
    const UserBubble = (message: Message) => {
        return (
            <div className="flex items-start justify-end gap-2.5 mb-8">
                <div className="flex flex-col gap-1 w-full max-w-[350px]">
                    <div className="flex flex-col leading-1.5 p-4 border-gray-200 rounded-xl bg-gray-100 dark:bg-gray-800">
                        <p className="text-sm font-normal text-gray-900 dark:text-white whitespace-break-spaces">{message.message}</p>
                    </div>
                </div>
            </div>
        )
    }

    const BotBubble = (message: Message) => {
        return (
            <div className="flex items-start gap-2.5 mb-8">
                <Image src="/icon.svg" width={8} height={8} alt="Juro Logo" className="size-6"/>
                <div className="flex flex-col gap-1 w-full max-w-full">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">Juro</span>
                    </div>
                    <div className="flex flex-col leading-1.5">
                        <p className="text-sm font-normal py-2 text-gray-900 dark:text-white whitespace-break-spaces">{message.message}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {message.sender === 'user' ? <UserBubble {...message} /> : <BotBubble {...message} />}
        </>
    )
}
