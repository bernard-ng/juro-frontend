"use client";
import { useState, useContext, useEffect } from "react";
import Card from "@/components/tailus-ui/Card";
import { Button } from "@/components/tailus-ui/Button";
import { Paperclip, X } from "lucide-react";
import { ghostIconButton, outlinedIconButton } from "@tailus/themer-button";
import { cn } from "@/lib/utils";
import { IdeaContext } from "@/lib/contexts";

const PromptInput = () => {
    const {idea} = useContext(IdeaContext);
    const [fileSrc, setfileSrc] = useState('');
    const [promptValue, setPromptValue] = useState(idea);
    const [fileName, setFileName] = useState('');

    const updateInputHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
        setPromptValue(e.target.value);
    }

    useEffect(() => {
        setPromptValue(idea);
        updateInputHeight({target: document.getElementById('prompt') as HTMLTextAreaElement} as React.ChangeEvent<HTMLTextAreaElement>)
    },[idea])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFileName(file.name);
            const url = URL.createObjectURL(file);
            setfileSrc(url);
        } else {
            console.error('No file selected');
        }
    };

    const handleRemoveImage = () => {
        setfileSrc('');
    };

    const isOnlySpaces = (str:string) => {
        return str.trim() === '';
    }

    return (
        <div className="fixed bottom-0 inset-x-4 md:inset-x-0 mx-auto w-full max-w-3xl">
            <div aria-hidden className="h-12 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-950" />
            <div className="pb-6 bg-gray-50 dark:bg-gray-950">
                <form action="" method="post">
                    <Card variant="mixed" className="p-4 pb-2 max-w-2xl mx-auto justify-between dark:bg-gray-900"> 
                        <textarea
                            onChange={updateInputHeight}
                            className={cn("min-h-6 flex h-full w-full mb-4 max-h-56 resize-none bg-transparent outline-none transition-[height] placeholder-gray-500 text-gray-950 dark:text-white")}
                            placeholder="Entrer le prompt"
                            name="prompt"
                            id="prompt"
                            rows={1}
                        >
                            
                        </textarea>
                        <div className="-mx-2 flex gap-2 justify-between">
                            <div className="flex gap-2">
                                <label className={cn(ghostIconButton.gray.md, "dark:hover:bg-gray-800 cursor-pointer focus-within:outline-2")} htmlFor="prompt-file">
                                    <Paperclip className={outlinedIconButton.icon.md} />
                                    <input id="prompt-file" className="size-0" type="file" accept=".pdf" onChange={handleImageChange} />
                                </label>
                                {
                                    fileSrc && (
                                        <div className="h-full relative py-1 px-2 flex items-center size-max rounded-xl bg-gray-100 dark:bg-gray-800">
                                            <div className="flex gap-2 items-center max-w-36 sm:max-w-64 overflow-hidden">
                                                <div className="*:size-5 flex size-fit text-gray-600 dark:text-white">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M8.267 14.68c-.184 0-.308.018-.372.036v1.178c.076.018.171.023.302.023c.479 0 .774-.242.774-.651c0-.366-.254-.586-.704-.586m3.487.012c-.2 0-.33.018-.407.036v2.61c.077.018.201.018.313.018c.817.006 1.349-.444 1.349-1.396c.006-.83-.479-1.268-1.255-1.268"></path>
                                                        <path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM9.498 16.19c-.309.29-.765.42-1.296.42a2.23 2.23 0 0 1-.308-.018v1.426H7v-3.936A7.558 7.558 0 0 1 8.219 14c.557 0 .953.106 1.22.319c.254.202.426.533.426.923c-.001.392-.131.723-.367.948m3.807 1.355c-.42.349-1.059.515-1.84.515c-.468 0-.799-.03-1.024-.06v-3.917A7.947 7.947 0 0 1 11.66 14c.757 0 1.249.136 1.633.426c.415.308.675.799.675 1.504c0 .763-.279 1.29-.663 1.615M17 14.77h-1.532v.911H16.9v.734h-1.432v1.604h-.906V14.03H17zM14 9h-1V4l5 5z"></path>
                                                    </svg>
                                                </div>
                                                <span className="block w-max text-nowrap truncate text-xs text-gray-700 dark:text-gray-300">{fileName}</span>
                                            </div>
                                            <Button
                                                id="remove-img"
                                                icon="only"
                                                size="xs"
                                                variant="outlined"
                                                colorVariant="gray"
                                                className="absolute -top-1 -right-1 size-4 [border-width:1px] before:from-white rounded-full bg-white shadow dark:bg-gray-700 dark:hover:bg-gray-800"
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

export default PromptInput;