'use client'
import PromptInput from "@/components/PromptInput"
import {Sidebar} from "@/components/Sidebar";
import {ChatsProvider, useChatsDispatcher} from "@lib/contexts/ChatsContext";
import useSWR from "swr";
import {useBearerToken} from "@lib/contexts/AuthContext";
import {getMessages} from "@lib/api/api";
import {Message} from "@lib/api/model";
import {useEffect, useReducer, useState} from "react";
import {messagesReducer} from "@lib/reducers/messages";

export default function Chat({ params }: { params: { id: number } }) {
    const [messages, messagesDispatcher] = useReducer(messagesReducer, [])
    const setChatLinkActive = useChatsDispatcher()
    const {data} = useSWR<Message[]>(
        [params.id, useBearerToken()],
        ([chatId, token]) => getMessages(chatId, token as string)
    )

    useEffect(() => {
        if (data) {
            messagesDispatcher({type: 'SET_MESSAGES', payload: data})
        }
    }, [data]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <ChatsProvider>
                    <Sidebar/>
                </ChatsProvider>
                <div className="max-w-2xl w-full mx-auto">
                    <div className="dark:text-white">My chat: {params.id}</div>
                    {
                        messages.map((message: Message) => (
                            <div key={message.id}>
                                <p className="dark:text-white">{message.sender} : {message.message}, {message.created_at}</p>
                            </div>
                        ))
                    }
                </div>
                <PromptInput/>
            </div>
        </main>
    )
}
