'use client'
import { useState } from "react";
import { IdeaContext } from "@/lib/contexts"

export default function IdeaProvider({ children, }: { children: React.ReactNode }) {
    const [idea, setIdea] = useState('');
    return (
        <IdeaContext.Provider value={{ idea, setIdea }}>
            {children}
        </IdeaContext.Provider>
    );
}