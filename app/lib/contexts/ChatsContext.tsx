'use client'
import React, {createContext, useContext, useReducer} from "react";
import {ChatLinkProps} from "@/components/ChatLink";

const ChatsContext = createContext([] as ChatLinkProps[])
const ChatsDispatcherContext = createContext(({}: ChatsReducerAction): void => {})

interface ChatsReducerAction {
    type: 'ADD_CHAT' | 'DELETE_CHAT' | 'UPDATE_CHAT' | 'SET_CHATS',
    payload: any
}

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

function chatsReducer(chats: ChatLinkProps[], action: ChatsReducerAction) {
    switch (action.type) {
        case 'ADD_CHAT':
            return [action.payload as ChatLinkProps, ...chats]
        case 'DELETE_CHAT':
            return chats.filter((chat: ChatLinkProps) => chat.id !== action.payload.id)
        case 'UPDATE_CHAT':
            return chats.map((chat: ChatLinkProps) => {
                if (chat.id === action.payload.id) {
                    chat.title = action.payload.title
                }
                return chat
            })
        case 'SET_CHATS':
            return action.payload as ChatLinkProps[]
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}
