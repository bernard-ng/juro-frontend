import {
    Chat,
    Message,
    Response,
    SuggestedPrompt,
    User
} from "@lib/api/model"
import Endpoints from "@lib/api/endpoints"
import {ChatLinkProps} from "@/components/ChatLink";

export async function getProfile(): Promise<Response<User>> {
    return fetchApi<User>(Endpoints.me, {
        method: 'GET',
    })
}


export async function createChat(name: string | null = null): Promise<Response<Chat>> {
    return fetchApi<Chat>(Endpoints.chats, {
        method: 'POST',
        body: name !== null ? JSON.stringify({name}) : undefined,
    })
}

export async function updateChat(id: string, name: string): Promise<Response<Chat>> {
    const endpoint = `${Endpoints.chats}/${id}`

    return fetchApi<Chat>(endpoint, {
        method: 'PATCH',
        body: JSON.stringify({id, name}),
    })
}

export async function getChats(): Promise<ChatLinkProps[]> {
    const response = await fetchApi<Chat[]>(Endpoints.chats, {
        method: 'GET',
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

export async function getChat(id: string): Promise<Response<Chat>> {
    const endpoint = `${Endpoints.chats}/${id}`
    return fetchApi<Chat>(endpoint, {
        method: 'GET',
    })
}

export async function deleteChat(id: string): Promise<Response<null>> {
    const endpoint = `${Endpoints.chats}/${id}`
    return fetchApi<null>(endpoint, {
        method: 'DELETE',
    }, true)
}

export async function getMessages(chatId: string): Promise<Message[]> {
    const endpoint = `${Endpoints.chats}/${chatId}/messages`
    const response =  await fetchApi<Message[]>(endpoint, {
        method: 'GET',
    })

    if (response.success) {
        return response.data
    } else {
        throw new Error("Une erreur s'est produite lors de la récupération des messages, veuillez réactualiser la page.")
    }
}

export async function sendMessage(chatId: string, message: string): Promise<Response<Message>> {
    const endpoint = Endpoints.messages.replace('{chatId}', chatId)
    return fetchApi<Message>(endpoint, {
        method: 'POST',
        body: JSON.stringify({message}),
    })
}

export async function getSuggestedPrompts(): Promise<Response<SuggestedPrompt[]>> {
    return fetchApi<SuggestedPrompt[]>(Endpoints.suggestedPrompts, {
        method: 'GET',
    })
}

export async function fetchApi<T>(url: string, options: RequestInit, noContent = false): Promise<Response<T>> {
    try {
        const response = await fetch(url, {
            ...options,
            credentials: 'include',
            headers: {
                'Content-Type': options.method == 'PATCH' ? 'application/merge-patch+json' : 'application/json',
            }
        })
        const data = noContent ? null as T : await response.json() as T;
        return {
            data,
            success: response.ok,
            code: response.status,
            description: response.statusText
        } as Response<T>
    } catch (e: any) {
        return {
            data: null,
            success: false,
            code: e?.code || 500,
            description: "Désolé une erreur s'est produite, veuillez réessayer."
        } as Response<T>
    }
}
