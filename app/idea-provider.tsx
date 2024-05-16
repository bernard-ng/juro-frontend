'use client'
import React, { useState } from "react"
import { IdeaContext } from "@/app/lib/contexts"

export default function IdeaProvider({ children, }: { children: React.ReactNode }) {
    const [idea, setIdea] = useState('')
    return (
        <IdeaContext.Provider value={{ idea, setIdea }}>
            {children}
        </IdeaContext.Provider>
    )
}
