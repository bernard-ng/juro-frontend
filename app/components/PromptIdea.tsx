import React from "react"
import { Lightbulb } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { elevatedVariant } from "@tailus/themer-card"

import CheckIcon from "./utilities/CheckIcon"
import { cn } from "@lib/utils"

const promptIdeaVariants = cva("flex flex-col justify-between h-full p-[--card-padding] rounded-[calc(var(--card-border-radius)-0.25rem)] bg-gradient-to-b from-transparent dark:to-transparent dark:text-gray-200", {
    variants: {
        intent: {
            primary: "to-primary-50 text-primary-950 first:*:bg-primary-50",
            secondary: "to-secondary-50 text-secondary-950 first:*:bg-secondary-50",
            accent: "to-accent-50 text-accent-950 first:*:bg-accent-50",
            info: "to-info-50 text-info-950 first:*:bg-info-50",
            success: "to-success-50 text-success-950 first:*:bg-success-50",
            warning: "to-warning-50 text-warning-950 first:*:bg-warning-50",
            danger: "to-danger-50 text-warning-950 first:*:bg-danger-50",
            gray: "to-gray-50 text-gray-950 first:*:bg-gray-50",
        }
    },
    defaultVariants: {
        intent: "gray"
    }
})

export interface PromptIdeaProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof promptIdeaVariants> {
    value: string
    isActive: boolean
    previewValue: string
}

export const PromptIdea: React.FC<PromptIdeaProps> = ({
    className,
    children,
    intent = "gray",
    value,
    isActive,
    previewValue,
    ...props
}) => {
    return (
        <button
            {...props}
            className={cn(elevatedVariant, "p-1 aspect-square transition-[box-shadow,transform] hover:shadow-xl hover:shadow-gray-700/10 group dark:hover:bg-gray-800 focus-visible:outline-2 outline-gray-950 outline-offset-2 rounded-[--card-border-radius] dark:outline-white  data-[state=on]:shadow-xl data-[state=on]:shadow-gray-700/10 data-[state=on]:scale-105 dark:data-[state=on]:bg-gray-800")}
            data-state={isActive ? "on" : "off"}
        >
            <div className={cn(promptIdeaVariants({ intent }), className)}>
                <div className="rounded-full size-10 flex items-center justify-center dark:!bg-gray-500/10 dark:text-white">
                    {
                        isActive ? <CheckIcon /> : <Lightbulb className="size-5 m-auto" />
                    }
                </div>
                <p className="text-left line-clamp-3">
                    {previewValue}
                </p>
            </div>
        </button>
    )
}
