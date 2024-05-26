import {Message} from "@/lib/api/model"
import Image from "next/image";
import React from "react";

export function ChatBubble({message} : {message: Message}) {
    
    const UserBubble = (message: Message) => {
        return (
            <div className="flex items-end gap-2.5 mb-8">
                <div className="flex flex-col w-full max-w-[400px] leading-1.5">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">Vous</span>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{message.created_at}</span>
                    </div>
                    <p className="text-sm font-normal py-2 text-gray-900 dark:text-white">{message.message}</p>
                </div>
            </div>
        )
    }

    const BotBubble = (message: Message) => {
        return (
            <div className="flex items-start gap-2.5 mb-8">
                <Image src="/icon.svg" width={10} height={10} alt="Juro Logo" className="size-9"/>
                <div className="flex flex-col gap-1 w-full max-w-[400px]">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">Juro</span>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{message.created_at}</span>
                    </div>
                    <div
                        className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        <p className="text-sm font-normal text-gray-900 dark:text-white">{message.message}</p>
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
