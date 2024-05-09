"use client"
import Card from "@/components/tailus-ui/Card";
import Image from "next/image";
import Link from "next/link";
import Form from "@/components/tailus-ui/Form";
import {Button} from "@/components/tailus-ui/Button";

export default function Register() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-12">
            <Card className="max-w-md w-full p-0 bg-gray-50" variant="mixed">
                <Card className="-m-px">
                    <div className="mx-auto max-w-[18rem] w-full py-4">
                        <a href="" className="w-fit mx-auto block mb-6">
                            <Image src="/icon.svg" width={10} height={10} alt="Juro Logo" className="size-9"/>
                        </a>
                        <h1 className="text-center text-2xl font-semibold text-gray-950 dark:text-white">Rejoignez-nous</h1>
                        <p className="text-center text-gray-700 dark:text-gray-400">Profiter de tous les avantages de Juro</p>

                        <Form.Root>
                            <div className="mb-6 mt-4 space-y-4">
                                <Form.Field name="name">
                                    <Form.Control asChild>
                                        <Form.Input
                                            variant="outlined"
                                            type="text"
                                            size="lg"
                                            placeholder="Votre nom complet"
                                            aria-label="Nom complet"
                                            required
                                        />
                                    </Form.Control>
                                    <Form.Message intent="warning" match="valueMissing">Veuillez remplir votre nom</Form.Message>
                                </Form.Field>
                                <Form.Field name="email">
                                    <Form.Control asChild>
                                        <Form.Input
                                            variant="outlined"
                                            type="email"
                                            size="lg"
                                            autoComplete="new-username"
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
                                            type="text"
                                            size="lg"
                                            placeholder="Votre mot de passe"
                                            aria-label="Mot de passe"
                                            autoComplete="new-password"
                                            required
                                        />
                                    </Form.Control>
                                    <Form.Message intent="warning" match="valueMissing">Veuillez remplir ce champ</Form.Message>
                                </Form.Field>
                            </div>
                            <Form.Submit asChild>
                                <Button className="w-full" size="lg" label="S'incrire"/>
                            </Form.Submit>
                        </Form.Root>
                    </div>
                </Card>
                <div className="py-4">
                    <p className="text-center text-sm text-gray-700 dark:text-gray-300">
                        Vous avez un compte ?
                        <Link href="/login" className="ml-2 text-info-600 font-medium hover:underline dark:text-info-400">
                            Connecte-vous
                        </Link>
                    </p>
                    <p className="mx-auto mt-2 text-sm text-gray-700 dark:text-gray-300 text-center">
                        En poursuivant, vous acceptez nos <br/>
                        <a href="#" className="ml-2 text-info-600 font-medium hover:underline dark:text-info-400">
                            Conditions d'utilisation
                        </a>
                    </p>
                </div>
            </Card>
        </main>
    );
}
