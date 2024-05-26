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

export async function getProfile(token: string|undefined = undefined): Promise<Response<User>> {
    console.log(token)
    return fetchApi<User>(Endpoints.me, {
        method: 'GET',
        headers: getRequestHeaders(token)
    })
}


export async function createChat(name: string | null = null, token: string|undefined = undefined): Promise<Response<Chat>> {
    return fetchApi<Chat>(Endpoints.chats, {
        method: 'POST',
        body: name !== null ? JSON.stringify({name}) : undefined,
        headers: getRequestHeaders(token)
    })
}

export async function updateChat(id: number, name: string, token: string|undefined = undefined): Promise<Response<Chat>> {
    const endpoint = `${Endpoints.chats}/${id}`
    const headers = getRequestHeaders(token)
    headers.set('Content-Type', 'application/merge-patch+json');

    return fetchApi<Chat>(endpoint, {
        method: 'PATCH',
        body: JSON.stringify({id, name}),
        headers
    })
}

export async function getChats(token: string|undefined = undefined): Promise<ChatLinkProps[]> {
    const response = await fetchApi<Chat[]>(Endpoints.chats, {
        method: 'GET',
        headers: getRequestHeaders(token)
    })

    if (response.success) {
        return response.data.map((chat: Chat)=> {
            return {
                id: chat.id,
                href: `/chat/${chat.id}`,
                title: chat.name,
            } as ChatLinkProps
        })
    } else {
        throw new Error("Une erreur s'est produite lors de la récupération des chats, veuillez réactualiser la page.")
    }
}

export async function getChat(id: number, token: string|undefined = undefined): Promise<Response<Chat>> {
    const endpoint = `${Endpoints.chats}/${id}`
    return fetchApi<Chat>(endpoint, {
        method: 'GET',
        headers: getRequestHeaders(token)
    })
}

export async function deleteChat(id: number, token: string|undefined = undefined): Promise<Response<null>> {
    const endpoint = `${Endpoints.chats}/${id}`
    return fetchApi<null>(endpoint, {
        method: 'DELETE',
        headers: getRequestHeaders(token)
    }, true)
}

export async function getMessages(chatId: number, token: string|undefined = undefined): Promise<Message[]> {
    const endpoint = `${Endpoints.chats}/${chatId}/messages`
    const response =  await fetchApi<Message[]>(endpoint, {
        method: 'GET',
        headers: getRequestHeaders(token)
    })

    if (response.success) {
        return response.data
    } else {
        throw new Error("Une erreur s'est produite lors de la récupération des messages, veuillez réactualiser la page.")
    }
}

export async function sendMessage(chatId: number, message: string, token: string|undefined = undefined): Promise<Response<Chat>> {
    const endpoint = Endpoints.messages.replace('{chatId}', chatId.toString())
    return fetchApi<Chat>(endpoint, {
        method: 'POST',
        body: JSON.stringify({message}),
        headers: getRequestHeaders(token)
    })
}

export async function getSuggestedPrompts(token: string|undefined = undefined): Promise<Response<SuggestedPrompt[]>> {
    return fetchApi<SuggestedPrompt[]>(Endpoints.suggestedPrompts, {
        method: 'GET',
        headers: getRequestHeaders(token)
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
