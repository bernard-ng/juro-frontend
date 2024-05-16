import { createContext } from "react"

export const IdeaContext = createContext({
    idea: "",
    setIdea: (idea:string) => {},
})
