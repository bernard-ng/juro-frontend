'use client'
import React, {createContext, useContext, useEffect, useState} from "react"

const BearerTokenContext = createContext('false')
const BearerTokenDispatcherContext = createContext((token: string): void => {})

export function AuthProvider({ children, }: { children: React.ReactNode }) {
    const [bearerToken, setBearerToken] = useState('false')

    // not perfect, but we can't get localStorage with SSR.
    useEffect(() => {
        if (bearerToken == 'false') {
            setBearerToken(localStorage.getItem('token') as string)
        }

        if (bearerToken != 'false') {
            localStorage.setItem('token', bearerToken)
        }
    }, [bearerToken]);

    return (
        <BearerTokenContext.Provider value={bearerToken}>
            <BearerTokenDispatcherContext.Provider value={setBearerToken}>
                {children}
            </BearerTokenDispatcherContext.Provider>
        </BearerTokenContext.Provider>
    )
}

export function useBearerToken(): string {
    return useContext(BearerTokenContext)
}

export function useBearerTokenDispatcher(): (idea: string) => void {
    return useContext(BearerTokenDispatcherContext)
}
