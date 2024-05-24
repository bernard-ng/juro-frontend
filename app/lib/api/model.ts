export interface Response<T> {
    data: T,
    success: boolean,
    code?: number,
    description?: string
}

export interface User {
    id: number,
    email: string,
    created_at: string,
    updated_at: string
}

export interface Chat {
    id: number,
    name: string,
    created_at: string,
    updated_at: string,
    messages: Message[]
}

export interface Message {
    id: number,
    message: string,
    created_at: string,
    sender: "user" | "assistant" | "system"
}

export interface SuggestedPrompt {
    id: number,
    prompt: string,
    title?: string,
    created_at: string
}

export interface LoginRequestData {
    username: string,
    password: string
}

export interface LoginResponseData {
    token: string
}

export interface RegisterRequestData {
    email: string,
    password: string
    name: string
}
