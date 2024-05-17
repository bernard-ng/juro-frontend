"use client"
import React, { useState, useContext } from "react"

import { PromptIdea } from "@/components/PromptIdea"
import { IdeaContext } from "@lib/contexts"

type Idea = {
    value: string;
    previewValue: string;
    isActive: boolean;
    intent: "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "danger" | "gray";
}

const ideas: Idea[] = [
    {
        value: "Qu'est-ce qu'un contrat de travail et quels sont ses éléments essentiels, ses différents types et ses implications juridiques pour l'employeur et le salarié ?",
        previewValue: "Qu'est-ce qu'un contrat de travail?",
        isActive: false,
        intent: "primary"
    },
    {
        value: "Qu'est-ce qu'un contrat de travail à durée déterminée (CDD) et à durée indéterminée (CDI) ? Quelles sont les différences entre ces deux types de contrats de travail ?",
        previewValue: "Quelle est la différence entre CDD et CDI",
        isActive: false,
        intent: "secondary"
    },
    {
        value: "Quelles sont les conditions de validité d'un contrat de travail ? Quelles sont les mentions obligatoires à faire figurer dans un contrat de travail ?",
        previewValue: "Conditions de validité d'un contrat de travail",
        isActive: false,
        intent: "accent"
    }
]

export const PromptIdeas = () => {
    const [activeIndex, setActiveIndex] = useState(-1)
    const { setIdea } = useContext(IdeaContext)

    const handleIdeaClick = (index: number, idea: string) => {
        const textarea = document.getElementById('prompt') as HTMLTextAreaElement

        if (activeIndex === index) {
            setActiveIndex(-1)
            setIdea('')
            textarea.value = ''
        } else {
            setActiveIndex(index)
            setIdea(idea)
            textarea.value = ''
            textarea.value = idea
        }
    }
    return (
        <div className="mt-12 grid grid-cols-3 gap-4">
            {ideas.map((idea, index) => (
                <PromptIdea
                    key={index}
                    value={idea.value}
                    previewValue={idea.previewValue}
                    isActive={activeIndex === index}
                    intent={idea.intent}
                    onClick={() => handleIdeaClick(index, idea.value)}
                />
            ))}
        </div>
    )
}
