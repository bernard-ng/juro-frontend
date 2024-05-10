"use client"
import { Button } from "@/components/tailus-ui/Button";
import Form from "@/components/tailus-ui/Form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/api";

export const LoginForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    
    useEffect(() => {
        if (isSubmitting) {
            setTimeout(() => {
                setIsSubmitting(false);
            }, 3000);
        }
    }, [isSubmitting]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await login({
                username: username,
                password: password,
            });

            if (response.success) {
                const data = await response.data;
                localStorage.setItem('token', data.token);
                router.push('/');
            } else {
                console.log('Error:', response.description);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
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
                    <Button disabled={isSubmitting} label="Se Connecter" className="mt-6 mx-auto w-full outline-2 outline-offset-2 outline-primary-600 focus-visible:outline font-normal" />
                </Form.Submit>
            </Form.Root>
        </div>
    )
}