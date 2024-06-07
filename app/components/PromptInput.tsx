"use client";
import React, {useState, useEffect} from "react"

import Card from "@tailus-ui/Card"
import { Button } from "@tailus-ui/Button"
import { cn } from "@lib/utils"
import {useIdea} from "@lib/contexts/IdeaContext";

interface PromptInputProps {
    handleSubmit: (prompt: string) => void
}

const PromptInput = ({handleSubmit}: PromptInputProps) => {
    const idea = useIdea();
    const [promptValue, setPromptValue] = useState(idea);

    // yes this is shit !!! I've to fix this later
    const handlePromptSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const input = e.currentTarget.querySelector('textarea') as HTMLTextAreaElement
        input.value = ""
        input.blur()
        handleSubmit(promptValue)
        setPromptValue("")
        input.style.height = 'auto'
        input.style.height = `${input.scrollHeight}px`
    }

    const updateInputHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
        setPromptValue(e.target.value);
    }

    useEffect(() => {
        setPromptValue(idea);
        updateInputHeight({target: document.getElementById('prompt') as HTMLTextAreaElement} as React.ChangeEvent<HTMLTextAreaElement>)
    },[idea])

    const isOnlySpaces = (str:string) => {
        return str.trim() === '';
    }

    return (
        <div className="fixed bottom-0 inset-x-0 md:px-0 mx-auto w-full max-w-3xl">
            <div aria-hidden className="h-12 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-925" />
            <div className="pb-2 px-3 bg-gray-50 dark:bg-gray-925">
                <form onSubmit={handlePromptSubmit} method="post">
                    <Card variant="soft" className="bg-gray-200 rounded-[2rem] p-2.5 max-w-2xl mx-auto justify-between">
                        <div className="grid gap-3 items-end [grid-template-columns:1fr_auto]">
                            <textarea
                                autoFocus={true}
                                onChange={updateInputHeight}
                                className={cn("min-h-9 ml-4 py-1.5 flex h-full w-full max-h-56 resize-none bg-transparent outline-none transition-[height] placeholder-gray-500 text-gray-950 dark:text-white")}
                                placeholder="Votre question..."
                                name="prompt"
                                id="prompt"
                                rows={1}
                            />
                            <Button disabled={isOnlySpaces(promptValue)} colorVariant="primary" variant="solid"
                                    size="md" icon="only" label="Send"
                                    className="disabled:bg-transparent dark:disabled:bg-transparent">
                                <svg className="translate-x-0.5" xmlns="http://www.w3.org/2000/svg" width="1em"
                                     height="1em" viewBox="0 0 32 32">
                                    <path fill="currentColor"
                                          d="M4.176 2.164C2.988 1.57 1.671 2.7 2.077 3.965l2.858 8.883a1 1 0 0 0 .787.68l11.869 1.979c.557.093.557.893 0 .986L5.723 18.471a1 1 0 0 0-.788.68l-2.858 8.886c-.407 1.265.91 2.395 2.099 1.801L29.17 17.343c1.106-.553 1.106-2.13 0-2.684z"/>
                                </svg>
                            </Button>
                        </div>
                    </Card>
                </form>
                <p className="dark:text-white mt-2 text-center text-xs">Juro peut se tromper. vérifiez les informations importantes</p>
            </div>
        </div>
    )
}

export default PromptInput;