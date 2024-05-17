'use server'
import {LoginFormSchema, LoginFormState, RegisterFormSchema, RegisterFormState} from "@lib/defintions"
import {LoginRequestData, LoginResponseData, RegisterRequestData, Response, User} from "@lib/api/model"
import {login as apiLogin, register as apiRegister} from "@lib/api/api"
import {redirect} from "next/navigation"
import {createSession, deleteSession} from "@lib/session"

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

    const response: Response<User> = await apiRegister(validatedFields.data as RegisterRequestData)
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

    const response: Response<LoginResponseData> = await apiLogin(validatedFields.data as LoginRequestData)
    if (!response.success) {
        return {
            message: "Invalid username or password.",
        }
    }

    await createSession(response.data.token)
    redirect('/')
}

export async function logout(): Promise<void> {
    deleteSession()
    redirect('/login')
}
