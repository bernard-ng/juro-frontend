'use client'
import {
    Chat,
    Message,
    Response,
    SuggestedPrompt,
    User
} from "@lib/api/model"
import Endpoints from "@lib/api/endpoints"
import {ChatLinkProps} from "@/components/ChatLink";

export function getRequestHeaders(token: string|undefined = undefined){
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'false'
    }

    if (token !== undefined) {
        headers['Authorization'] = `Bearer ${token}`
    }

    return new Headers(headers)
}

/**
 * the token should be stored in the local storage
 * after a successful login and removed after a logout
 */
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MTY0ODczNzQsImV4cCI6MTcxNjU3Mzc3NCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoibmdhbmR1YmVybmFyZEBnbWFpbC5jb20ifQ.Ix-PCa6NJRb2xaLr3xDM6XAKxkW4EUTfiXSvcfUDWMpxPLwuGAVppAMqP4iUL-57IoC71EdAdNurs5aNbirRXc9BAEqwFs05gULxTQsXOZ5SCpN-vqIPbSn5KZOlBSmZ7Vtk4RcDF0hkt-zGXRRbmQjmre39m4wuHawCsNXYPZDJKwdBhrIq4_jiPgzgvANsM_TRG4mLKWaznMY8BuYKYeIT7CmuFNs3B55MaQZ8bPWw5OZUQqsmqyvcewYV7M-n4NgR90R8G3zDRDG9-p84oT-MCVep96iigU3uFp5Wc8Y7-5TLNCdjpyB_LM3tVdJ8RBBKwDXxNPwIIdmIh5Ejiw"
const headers = getRequestHeaders(token as string)

export async function getProfile(): Promise<Response<User>> {
    console.log(token)
    return fetchApi<User>(Endpoints.me, {
        method: 'GET',
        headers
    })
}


export async function createChat(name: string | null = null): Promise<Response<Chat>> {
    return fetchApi<Chat>(Endpoints.chats, {
        method: 'POST',
        body: name !== null ? JSON.stringify({name}) : undefined,
        headers
    })
}

export async function updateChat(id: number, name: string): Promise<Response<Chat>> {
    const endpoint = `${Endpoints.chats}/${id}`
    headers.set('Content-Type', 'application/merge-patch+json');

    return fetchApi<Chat>(endpoint, {
        method: 'PATCH',
        body: JSON.stringify({id, name}),
        headers
    })
}

export async function getChats(): Promise<ChatLinkProps[]> {
    const response = await fetchApi<Chat[]>(Endpoints.chats, {
        method: 'GET',
        headers
    })

    if (response.success) {
        return response.data.map((chat: Chat)=> {
            return {
                id: chat.id,
                href: `/chat/${chat.id}`,
                title: chat.name
            } as ChatLinkProps
        })
    } else {
        throw new Error("Une erreur s'est produite lors de la récupération des chats, veuillez réactualiser la page.")
    }
}

export async function getChat(id: number): Promise<Response<Chat>> {
    const endpoint = `${Endpoints.chats}/${id}`
    return fetchApi<Chat>(endpoint, {
        method: 'GET',
        headers
    })
}

export async function deleteChat(id: number): Promise<Response<null>> {
    const endpoint = `${Endpoints.chats}/${id}`
    return fetchApi<null>(endpoint, {
        method: 'DELETE',
        headers
    }, true)
}

export async function getMessages(chatId: number): Promise<Response<Message[]>> {
    const endpoint = Endpoints.messages.replace('{chatId}', chatId.toString())
    return fetchApi<Message[]>(endpoint, {
        method: 'GET',
        headers
    })
}

export async function sendMessage(chatId: number, message: string): Promise<Response<Chat>> {
    const endpoint = Endpoints.messages.replace('{chatId}', chatId.toString())
    return fetchApi<Chat>(endpoint, {
        method: 'POST',
        body: JSON.stringify({message}),
        headers
    })
}

export async function getSuggestedPrompts(): Promise<Response<SuggestedPrompt[]>> {
    return fetchApi<SuggestedPrompt[]>(Endpoints.suggestedPrompts, {
        method: 'GET',
        headers
    })
}

export async function fetchApi<T>(url: string, options: RequestInit, noContent = false): Promise<Response<T>> {
    try {
        const response = await fetch(url, options)
        const data = noContent ? null as T : await response.json() as T;
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
