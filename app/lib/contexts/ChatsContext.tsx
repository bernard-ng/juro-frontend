'use client'
import React, {createContext, useContext, useReducer} from "react";
import {ChatLinkProps} from "@/components/ChatLink";
import {chatsReducer, ChatsReducerAction} from "@lib/reducers/chats";

const ChatsContext = createContext([] as ChatLinkProps[])
const ChatsDispatcherContext = createContext(({}: ChatsReducerAction): void => {})

export function ChatsProvider({ children, }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(chatsReducer, [])

    return (
        <ChatsContext.Provider value={state}>
            <ChatsDispatcherContext.Provider value={dispatch}>
                {children}
            </ChatsDispatcherContext.Provider>
        </ChatsContext.Provider>
    )
}

export function useChats() {
    return useContext(ChatsContext)
}

export function useChatsDispatcher() {
    return useContext(ChatsDispatcherContext)
}
