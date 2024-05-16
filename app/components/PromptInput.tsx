"use client";
import React, { useState, useContext, useEffect } from "react"
import { Paperclip, X } from "lucide-react"
import { softIconButton } from "@tailus/themer-button"
import Image from "next/image"

import Card from "@/app/components/tailus-ui/Card"
import { Button } from "@/app/components/tailus-ui/Button"
import { cn } from "@/app/lib/utils"
import { IdeaContext } from "@/app/lib/contexts"

const PromptInput = () => {
    const {idea} = useContext(IdeaContext)
    const [imageSrc, setImageSrc] = useState('')
    const [promptValue, setPromptValue] = useState(idea)

    const updateInputHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
        setPromptValue(e.target.value)
    }

    useEffect(() => {
        setPromptValue(idea);
        updateInputHeight({target: document.getElementById('prompt') as HTMLTextAreaElement} as React.ChangeEvent<HTMLTextAreaElement>)
    },[idea])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            setImageSrc(url);
        } else {
            console.error('No file selected');
        }
    }

    const handleRemoveImage = () => {
        setImageSrc('');
    }

    const isOnlySpaces = (str:string) => {
        return str.trim() === '';
    }

    return (
        <div className="fixed bottom-0 inset-x-0 mx-auto w-full max-w-3xl">
            <div aria-hidden className="h-12 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-950" />
            <div className="pb-6 bg-gray-50 dark:bg-gray-950">
                <form action="" method="post">
                    <Card variant="mixed" className="max-w-2xl mx-auto grid [grid-template-columns:1fr_auto] gap-4 items-end justify-between dark:bg-gray-900"> 
                        <textarea
                            onChange={updateInputHeight}
                            className={cn("min-h-6 flex h-full w-full mb-1 max-h-56 resize-none bg-transparent outline-none transition-[height] placeholder-gray-500 text-gray-950 dark:text-white")}
                            placeholder="Poser une question..."
                            name="prompt"
                            id="prompt"
                            rows={1}
                        >
                            
                        </textarea>
                        <div className="flex gap-2 ml-auto">
                            <div className={imageSrc && "-my-1 h-fit flex p-0.5 gap-px w-fit border rounded-full bg-white dark:bg-gray-800 dark:border-white/5"}>
                                <label className={cn(softIconButton.gray.md, "cursor-pointer focus-within:outline-2")} htmlFor="prompt-file">
                                    <Paperclip className={softIconButton.icon.md} />
                                    <input id="prompt-file" className="size-0" type="file" accept="image/png, image/jpeg, image/jpg, image/webp" onChange={handleImageChange} />
                                </label>
                                {
                                    imageSrc && (
                                        <div className="relative size-max">
                                            <Image
                                                id="prompt-img-preview"
                                                className="size-9 object-cover border rounded-[--btn-border-radius] border-gray-950/5 dark:border-white/5"
                                                alt="prompt image"
                                                src={imageSrc}
                                            />
                                            <Button
                                                id="remove-img"
                                                icon="only"
                                                size="xs"
                                                variant="soft"
                                                colorVariant="gray"
                                                className="absolute top-0 right-0 size-4 rounded-full dark:bg-gray-700 dark:hover:bg-gray-800"
                                                onClick={handleRemoveImage}
                                            >
                                                <X className="!size-2.5" />
                                            </Button>
                                        </div>
                                    )
                                }
                            </div>
                            <Button disabled={ isOnlySpaces(promptValue) } colorVariant="primary" variant="solid" size="md" icon="only" label="Send" className="disabled:bg-transparent dark:disabled:bg-transparent">
                                <svg className="translate-x-0.5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
                                    <path fill="currentColor" d="M4.176 2.164C2.988 1.57 1.671 2.7 2.077 3.965l2.858 8.883a1 1 0 0 0 .787.68l11.869 1.979c.557.093.557.893 0 .986L5.723 18.471a1 1 0 0 0-.788.68l-2.858 8.886c-.407 1.265.91 2.395 2.099 1.801L29.17 17.343c1.106-.553 1.106-2.13 0-2.684z" />
                                </svg>
                            </Button>
                        </div>
                    </Card>
                </form>
            </div>
        </div>
    )
}

export default PromptInput
