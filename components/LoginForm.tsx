"use client"
import { Button } from "@/components/tailus-ui/Button";
import Form from "@/components/tailus-ui/Form";
import { useEffect, useState } from "react";

export const LoginForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    useEffect(() => {
        if (isSubmitting) {
            setTimeout(() => {
                setIsSubmitting(false);
            }, 3000);
        }
    }, [isSubmitting]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        fetch('http://15.237.198.160/api/login_check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
        .then(response => response.json())
        .then(data => {
            setIsSubmitting(false);
            if (data.token) {
                // Login was successful, do something with the token
                console.log('Token:', data.token);
            } else {
                // Login failed, do something with the error
                console.log('Error:', data);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            setIsSubmitting(false);
        });
    }

    return (
        <div className="mt-12">
            <Form.Root className="max-w-[18rem] mx-auto" onSubmit={handleSubmit}>
                <Form.Field name="username">
                    <Form.Label size="sm" className="sr-only">Nom d'utilisateur</Form.Label>
                    <Form.Control asChild>
                        <Form.Input
                            variant="soft"
                            size="lg"
                            required
                            type="text"
                            placeholder="Nom d'utilisateur"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-gray-200/50 placeholder-gray-500 dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700/50"
                        />
                    </Form.Control>
                    <Form.Message intent="danger" match="valueMissing">
                        Entrez votre adresse email
                    </Form.Message>
                </Form.Field>
                <Form.Field name="password">
                    <Form.Label size="sm" className="sr-only">Mot de passe</Form.Label>
                    <Form.Control asChild>
                        <Form.Input
                            variant="soft"
                            size="lg"
                            required
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-200/50 placeholder-gray-500 dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700/50"
                        />
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