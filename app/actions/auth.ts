'use server'
import {LoginFormSchema, LoginFormState, RegisterFormSchema, RegisterFormState} from "@lib/defintions"
import {LoginRequestData, LoginResponseData, RegisterRequestData, Response, User} from "@lib/api/model"
import {fetchApi} from "@lib/api/api"
import {redirect} from "next/navigation"
import {createSession, deleteSession} from "@lib/session"
import Endpoints from "@lib/api/endpoints";
import {SafeParseReturnType} from "zod";

type RegisterFormData = {
    name: string,
    email: string,
    password: string
}

type LoginFormData = {
    username: string,
    password: string
}

export async function register(state: RegisterFormState,  formData: FormData): Promise<RegisterFormState> {
    const validatedFields = RegisterFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            success: false
        }
    }

    const response: Response<User> = await fetchApi<User>(Endpoints.register, {
        method: 'POST',
        body: JSON.stringify(validatedFields.data as RegisterRequestData),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (!response.success) {
        return {
            message: "Désolé une erreur s'est produite, veuillez réessayer.",
            success: false
        }
    }

    return {
        message: "Votre compte a été créé avec succès, veuillez vérifier votre boîte de réception pour activer votre compte.",
        success: true
    }
}

export async function login(state: LoginFormState,  formData: FormData): Promise<LoginFormState> {
    const validatedFields: SafeParseReturnType<LoginFormData, LoginFormData> = LoginFormSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const response: Response<LoginResponseData> = await fetchApi<LoginResponseData>(Endpoints.login, {
        method: 'POST',
        body: JSON.stringify(validatedFields.data as LoginRequestData),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (!response.success) {
        return {
            message: "Identifiants sont invalides ou compte non vérifié !",
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
