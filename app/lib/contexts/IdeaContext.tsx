'use client'
import React, {createContext, useContext, useState} from "react"

const IdeaContext = createContext("")
const IdeaDispatcherContext = createContext((idea: string): void => {})

export function useIdea(): string {
    return useContext(IdeaContext)
}

export function useIdeaDispatcher(): (idea: string) => void {
    return useContext(IdeaDispatcherContext)
}

export function IdeaProvider({ children, }: { children: React.ReactNode }) {
    const [idea, setIdea] = useState('')

    return (
        <IdeaContext.Provider value={idea}>
            <IdeaDispatcherContext.Provider value={setIdea}>
                {children}
            </IdeaDispatcherContext.Provider>
        </IdeaContext.Provider>
    )
}
