'use client'
import React, {useReducer} from "react";
import Image from 'next/image'

import { PromptIdeas } from "@/components/PromptIdeas"
import PromptInput from "@/components/PromptInput"
import { Sidebar } from "@/components/Sidebar";
import {IdeaProvider} from "@lib/contexts/IdeaContext";
import {ChatsProvider} from "@lib/contexts/ChatsContext";
import {sendMessage, createChat} from "@lib/api/api";
import {toast} from "sonner";
import {useBearerToken} from "@lib/contexts/AuthContext";
import {useRouter} from "next/navigation";
import {Chat} from "@lib/api/model";

export default function Home() {
    const router = useRouter()
    const bearerToken = useBearerToken()

    const handleSubmit = async (prompt: string) => {
        const createChatResponse = await createChat('Nouveau chat', bearerToken);
        if (createChatResponse.success) {
            const chat: Chat = createChatResponse.data
            const sendMessageResponse = await sendMessage(chat.id, prompt, bearerToken)

            if (sendMessageResponse.success) {
                router.replace(`/chat/${chat.id}`)
            } else {
                toast.error("Désolé une erreur est survenue, veuillez réessayer !")
            }
        } else {
            toast.error("Désolé une erreur est survenue, veuillez réessayer !")
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-6 pt-24 md:p-24">
            <div>
                <ChatsProvider>
                    <Sidebar/>
                </ChatsProvider>
                <IdeaProvider>
                    <div className="max-w-2xl w-full mx-auto">
                        <div className="size-fit">
                            <Image src="/icon.svg" width={10} height={10} alt="Juro Logo" className="size-9"/>
                        </div>
                        <div className="mt-6">
                            <h1 className="text-2xl text-gray-950 dark:text-white">
                                Bonjour, Je suis <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-400">Juro.</span> <br/>
                                <span className="text-gray-600 dark:text-gray-400">Votre assistant juriste, je réponds à toutes vos questions sur le Droit congolais</span>
                            </h1>
                        </div>
                        <PromptIdeas/>
                    </div>
                    <PromptInput handleSubmit={prompt => handleSubmit(prompt)} />
                </IdeaProvider>
            </div>
        </main>
    )
}
