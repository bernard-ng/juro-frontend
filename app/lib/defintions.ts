import { z } from 'zod'

export const RegisterFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Le nom doit comporter au moins 2 caractères.' })
        .trim(),
    email: z.string().email({ message: 'Veuillez saisir un courriel valide.' }).trim(),
    password: z
        .string()
        .min(8, { message: 'Avoir une longueur d\'au moins 8 caractères' })
        .regex(/[a-zA-Z]/, { message: 'Contenir au moins une lettre.' })
        .regex(/[0-9]/, { message: 'Contenir au moins un chiffre.' })
        .regex(/[^a-zA-Z0-9]/, { message: 'contenir au moins un caractère spécial.'})
        .trim(),
})

export const LoginFormSchema = z.object({
    username: z.string().email({ message: 'Veuillez saisir un courriel valide.' }).trim(),
    password: z.string().min(8, { message: 'Avoir une longueur d\'au moins 8 caractères' }).trim(),
})

export type RegisterFormState =
    | {
    errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
    }
    message?: string
    success?: boolean
}
    | undefined

export type LoginFormState =
    | {
    errors?: {
        username?: string[]
        password?: string[]
    }
    message?: string
    token?: string
}
    | undefined