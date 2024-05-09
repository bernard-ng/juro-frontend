"use client"
import Image from "next/image";
import type {Metadata} from "next";
import Link from "next/link";
import Card from "@/components/tailus-ui/Card";
import Form from "tailus-ui/Form";
import {Button} from "tailus-ui/Button";

export default function Login() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Card className="max-w-md w-full p-0 bg-gray-50" variant="mixed">
                <Card className="-m-px">
                    <div className="mx-auto max-w-[18rem] w-full py-4">
                        <a href="" className="w-fit mx-auto block mb-6">
                            <Image src="/icon.svg" width={10} height={10} alt="Juro Logo" className="size-9"/>
                        </a>
                        <h1 className="text-center text-2xl font-semibold text-gray-950 dark:text-white">Connectez-vous</h1>
                        <p className="text-center text-gray-700 dark:text-gray-400">Bon retour sur Juro, renseignez vos identifiants pour continuer !</p>

                        <Form.Root>
                            <div className="mb-6 mt-4 space-y-4">
                                <Form.Field name="email">
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
                                    <Form.Message intent="warning" match="valueMissing">
                                        Please enter your email
                                    </Form.Message>
                                    <Form.Message intent="danger" match="typeMismatch">
                                        Please provide a valid email
                                    </Form.Message>
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
                                    <Form.Message intent="warning" match="valueMissing">
                                        Please enter your password
                                    </Form.Message>
                                </Form.Field>
                            </div>
                            <Form.Submit asChild>
                                <Button className="w-full" size="lg" label="Se connecter"/>
                            </Form.Submit>
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
    );
}
