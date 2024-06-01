'use client'
import React, {useEffect} from "react"
import { useFormStatus, useFormState } from 'react-dom'
import Image from "next/image"
import Link from "next/link"

import Card from "@/components/tailus-ui/Card"
import Form from "@/components/tailus-ui/Form"
import {Button} from "@/components/tailus-ui/Button"
import {login} from "@/actions/auth"
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {useBearerTokenDispatcher} from "@lib/contexts/AuthContext";
import {ThreeDots} from "react-loader-spinner";

/**
 * @see https://react.dev/reference/react-dom/hooks/useFormStatus
 */
const FormSubmit = () => {
    const {pending} = useFormStatus()

    return (
        <Form.Submit asChild disabled={pending}>
            <Button className="w-full" size="lg">
                {pending ? <ThreeDots visible={true} height="40" width="40" color="#fff" radius="2" ariaLabel="three-dots-loading"/> : <span>Se connecter</span> }
            </Button>
        </Form.Submit>
    )
}

export default function Login() {
    const router = useRouter()
    const [state, action] = useFormState(login, undefined)
    const setToken = useBearerTokenDispatcher()

    useEffect(() => {
        if (state?.message) {
            toast.error(state.message)
        }

        if (state?.token) {
            setToken(state.token)
            toast.success('Connexion réussie')
            router.push('/chat')
        }
    }, [router, setToken, state]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Card className="max-w-md w-full p-0 bg-gray-50" variant="mixed">
                <Card className="-m-px">
                    <div className="mx-auto max-w-[18rem] w-full py-4">
                        <Link href="/public" className="w-fit mx-auto block mb-6">
                            <Image src="/icon.svg" width={10} height={10} alt="Juro Logo" className="size-9"/>
                        </Link>
                        <h1 className="text-center text-2xl font-semibold text-gray-950 dark:text-white">Connectez-vous</h1>
                        <p className="text-center text-gray-700 dark:text-gray-400">Bon retour sur Juro, renseignez vos identifiants pour continuer !</p>

                        <Form.Root action={action}>
                            <div className="mb-6 mt-4 space-y-4">
                                <Form.Field name="username">
                                    <Form.Control asChild>
                                        <Form.Input
                                            variant="outlined"
                                            type="email"
                                            size="lg"
                                            autoComplete="current-username"
                                            placeholder="Votre adresse email"
                                            aria-label="Email"
                                            required
                                        />
                                    </Form.Control>
                                    {state?.errors?.username && <Form.Message intent="danger">{state.errors.username}</Form.Message>}
                                </Form.Field>
                                <Form.Field name="password">
                                    <Form.Control asChild>
                                        <Form.Input
                                            variant="outlined"
                                            type="password"
                                            autoComplete="current-password"
                                            placeholder="votre mot de passe"
                                            aria-label="Mot de passe"
                                            size="lg"
                                            required
                                        />
                                    </Form.Control>
                                    {state?.errors?.password && <Form.Message intent="danger">{state.errors.password}</Form.Message>}
                                </Form.Field>
                            </div>
                            <FormSubmit />
                        </Form.Root>
                    </div>
                </Card>
                <div className="py-4">
                    <p className="text-center text-sm text-gray-700 dark:text-gray-300">
                        Nouveau Ici ?
                        <Link href="/register" className="ml-2 text-info-600 font-medium hover:underline dark:text-info-400">
                            Créer un compte
                        </Link>
                    </p>
                </div>
            </Card>
        </main>
    )
}
