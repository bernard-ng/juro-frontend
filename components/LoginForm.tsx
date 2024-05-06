"use client"
import { Button } from "@/components/tailus-ui/Button";
import Form from "@/components/tailus-ui/Form";


export const LoginForm = () => {
    return (
        <div className="mt-12">
            <Form.Root className="max-w-[18rem] mx-auto">
                <Form.Field name="username">
                    <Form.Label size="sm" className="sr-only">Nom d'utilisateur</Form.Label>
                    <Form.Control asChild>
                        <Form.Input variant="soft" size="lg" required type="text" placeholder="Nom d'utilisateur" className="bg-gray-200/50 placeholder-gray-500 dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700/50" />
                    </Form.Control>
                    <Form.Message intent="danger" match="valueMissing">
                        Entrez votre adresse email
                    </Form.Message>
                </Form.Field>
                <Form.Field name="password">
                    <Form.Label size="sm" className="sr-only">Mot de passe</Form.Label>
                    <Form.Control asChild>
                        <Form.Input variant="soft" size="lg" required type="password" placeholder="Mot de passe" className="bg-gray-200/50 placeholder-gray-500 dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700/50" />
                    </Form.Control>
                    <Form.Message intent="danger" match="valueMissing">
                        Entrez le mot de passe
                    </Form.Message>
                </Form.Field>
                <Form.Submit asChild>
                    <Button label="Se Connecter" className="mt-6 mx-auto w-full outline-2 outline-offset-2 outline-primary-600 focus-visible:outline font-normal" />
                </Form.Submit>
            </Form.Root>
        </div>
    )
}