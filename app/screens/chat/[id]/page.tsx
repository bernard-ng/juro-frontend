import React from "react";
import PromptInput from "@/components/PromptInput"
import {Sidebar} from "@/components/Sidebar";
import {ChatsProvider} from "@lib/contexts/ChatsContext";

export default function Chat({ params }: { params: { id: number } }) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <ChatsProvider>
                    <Sidebar/>
                </ChatsProvider>
                <div className="max-w-2xl w-full mx-auto">
                    <div className="text-white">My chat: {params.id}</div>
                </div>
                <PromptInput/>
            </div>
        </main>
    )
}
