import React from "react";
import PromptInput from "@/components/PromptInput"

export default function Chat({ params }: { params: { id: number } }) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>My chat: {params.id}</div>
            <PromptInput/>
        </main>
    )
}
