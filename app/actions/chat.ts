'use server'
import {fetchApi, getRequestHeaders} from "@lib/api/api";
import { cookies } from 'next/headers'
import {UpdateChatFormSchema, UpdateChatFormState} from "@lib/defintions";
import {Chat} from "@lib/api/model";
import Endpoints from "@lib/api/endpoints";

const token = cookies().get('token')?.value
const headers = getRequestHeaders(token as string)

export async function createChat() {
}

export async function updateChat(state: UpdateChatFormState, formData: FormData): Promise<UpdateChatFormState> {
    const validatedFields = UpdateChatFormSchema.safeParse({
        id: formData.get('id'),
        name: formData.get('name'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const endpoint = `${Endpoints.chat}/${validatedFields.data.id}`
    const response = await fetchApi<Chat>(endpoint, {
        method: 'PUT',
        body: JSON.stringify({name: validatedFields.data.name}),
        headers
    })

    if (!response.success) {
        return {
            success: false,
            message: "Désolé, une erreur s'est produite. Veuillez réessayer.",
        }
    }
    return {
        success: true,
        message: "Chat renommé avec succès"
    }
}

export async function deleteChat() {
}
