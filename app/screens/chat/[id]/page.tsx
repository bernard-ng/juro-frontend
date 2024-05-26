'use client'
import PromptInput from "@/components/PromptInput"
import {Sidebar} from "@/components/Sidebar";
import {ChatsProvider, useChatsDispatcher} from "@lib/contexts/ChatsContext";
import useSWR from "swr";
import {useBearerToken} from "@lib/contexts/AuthContext";
import {getMessages, sendMessage} from "@lib/api/api";
import {Message} from "@lib/api/model";
import {useEffect, useReducer} from "react";
import {messagesReducer} from "@lib/reducers/messages";
import {toast} from "sonner";

export default function Chat({ params }: { params: { id: number } }) {
    const bearerToken = useBearerToken()
    const [messages, messagesDispatcher] = useReducer(messagesReducer, [])
    const {data} = useSWR<Message[]>(
        [params.id, bearerToken],
        ([chatId, token]) => getMessages(chatId, token as string)
    )

    useEffect(() => {
        if (data) {
            messagesDispatcher({type: 'SET_MESSAGES', payload: data})
        }
    }, [data]);

    const handleSubmit = async (prompt: string) => {
        messagesDispatcher({
            type: 'ADD_MESSAGE',
            payload: {sender: 'user', message: prompt, created_at: (new Date()).toISOString()}
        })

        const response = await sendMessage(params.id, prompt, bearerToken)

        if (response.success) {
            messagesDispatcher({type: 'ADD_MESSAGE', payload: response.data})
        } else {
            toast.error("Désolé une erreur est survenue, veuillez réessayer !")
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <ChatsProvider>
                    <Sidebar/>
                </ChatsProvider>
                <div className="max-w-2xl w-full mx-auto">
                    {
                        messages.map((message: Message, index: number) => (
                            <div key={index}>
                                <p className="dark:text-white">{message.sender} : {message.message}, {message.created_at}</p>
                            </div>
                        ))
                    }
                </div>
                <PromptInput handleSubmit={prompt => handleSubmit(prompt)} />
            </div>
        </main>
    )
}
