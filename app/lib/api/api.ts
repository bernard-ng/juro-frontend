import {
    Chat,
    LoginRequestData,
    LoginResponseData,
    Message,
    RegisterRequestData,
    Response,
    SuggestedPrompt,
    User
} from "@/app/lib/api/model"
import Endpoints from "@/app/lib/api/endpoints"

/**
 * the token should be stored in the local storage
 * after a successful login and removed after a logout
 */
const token = "test"
const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
})
const headersWithAuthorization = new Headers({
    ...headers,
    'Authorization': `Bearer ${token}`
})

export async function login(payload: LoginRequestData): Promise<Response<LoginResponseData>> {
    return fetchApi<LoginResponseData>(Endpoints.login, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers
    })
}

export async function getProfile(): Promise<Response<User>> {
    console.log(token)
    return fetchApi<User>(Endpoints.me, {
        method: 'GET',
        headers: headersWithAuthorization
    })
}

export async function register(payload: RegisterRequestData): Promise<Response<User>> {
    return fetchApi<User>(Endpoints.register, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers
    })
}

export async function createChat(name: string | null = null): Promise<Response<Chat>> {
    return fetchApi<Chat>(Endpoints.chats, {
        method: 'POST',
        body: name !== null ? JSON.stringify({name}) : undefined,
        headers: headersWithAuthorization
    })
}

export async function updateChat(id: number, name: string): Promise<Response<Chat>> {
    const endpoint = Endpoints.chat.replace('{id}', id.toString())
    return fetchApi<Chat>(endpoint, {
        method: 'PUT',
        body: JSON.stringify({name}),
        headers: headersWithAuthorization
    })
}

export async function getChats(): Promise<Response<Chat[]>> {
    return fetchApi<Chat[]>(Endpoints.chats, {
        method: 'GET',
        headers: headersWithAuthorization
    })
}

export async function getChat(id: number): Promise<Response<Chat>> {
    const endpoint = Endpoints.chat.replace('{id}', id.toString())
    return fetchApi<Chat>(endpoint, {
        method: 'GET',
        headers: headersWithAuthorization
    })
}

export async function deleteChat(id: number): Promise<Response<Chat>> {
    const endpoint = Endpoints.chat.replace('{id}', id.toString())
    return fetchApi<Chat>(endpoint, {
        method: 'DELETE',
        headers: headersWithAuthorization
    })
}

export async function getMessages(chatId: number): Promise<Response<Message[]>> {
    const endpoint = Endpoints.messages.replace('{chatId}', chatId.toString())
    return fetchApi<Message[]>(endpoint, {
        method: 'GET',
        headers: headersWithAuthorization
    })
}

export async function sendMessage(chatId: number, message: string): Promise<Response<Chat>> {
    const endpoint = Endpoints.messages.replace('{chatId}', chatId.toString())
    return fetchApi<Chat>(endpoint, {
        method: 'POST',
        body: JSON.stringify({message}),
        headers: headersWithAuthorization
    })
}

export async function getSuggestedPrompts(): Promise<Response<SuggestedPrompt[]>> {
    return fetchApi<SuggestedPrompt[]>(Endpoints.suggestedPrompts, {
        method: 'GET',
        headers: headersWithAuthorization
    })
}

async function fetchApi<T>(url: string, options: RequestInit): Promise<Response<T>> {
    try {
        const response = await fetch(url, options)
        const data = await response.json() as T;
        return {
            data,
            success: response.ok,
            code: response.status,
            description: response.statusText
        } as Response<T>
    } catch (e: any) {
        console.log(e)
        return {
            data: null,
            success: false,
            code: e.response.code || 500,
            description: e.response.message || e.message
        } as Response<T>
    }
}
