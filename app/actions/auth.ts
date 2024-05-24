'use server'
import {LoginFormSchema, LoginFormState, RegisterFormSchema, RegisterFormState} from "@lib/defintions"
import {LoginRequestData, LoginResponseData, RegisterRequestData, Response, User} from "@lib/api/model"
import {fetchApi, getRequestHeaders} from "@lib/api/api"
import {redirect} from "next/navigation"
import {createSession, deleteSession} from "@lib/session"
import Endpoints from "@lib/api/endpoints";

const headers = getRequestHeaders()

export async function register(state: RegisterFormState,  formData: FormData): Promise<RegisterFormState> {
    const validatedFields = RegisterFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const response: Response<User> = await fetchApi<User>(Endpoints.register, {
        method: 'POST',
        body: JSON.stringify(validatedFields.data as RegisterRequestData),
        headers
    })

    if (!response.success) {
        console.log(response)
        return {
            message: "Something went wrong. Please try again.",
        }
    }

    redirect('/login')
}

export async function login(state: LoginFormState,  formData: FormData): Promise<LoginFormState> {
    const validatedFields = LoginFormSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const response = await fetchApi<LoginResponseData>(Endpoints.login, {
        method: 'POST',
        body: JSON.stringify(validatedFields.data as LoginRequestData),
        headers
    })

    if (!response.success) {
        return {
            message: "Vos identifiants sont invalides, veuillez réessayer.",
        }
    } else {
        await createSession(response.data.token);
        return {
            token: response.data.token
        }
    }
}

export async function logout(): Promise<void> {
    deleteSession()
    redirect('/login')
}
