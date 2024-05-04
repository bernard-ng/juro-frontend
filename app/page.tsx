import { PromptIdeas } from "@/components/PromptIdeas";
import PromptInput from "@/components/PromptInput";
import IdeaProvider from "./idea-provider";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <IdeaProvider>
        <div className="max-w-2xl w-full mx-auto">
          <div className="size-fit">
            <img src="/icon.svg" className="size-9" />
          </div>
          <div className="mt-6">
            <h1 className="text-2xl text-gray-950 dark:text-white">
              Bonjour, Je suis <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-400">Juro.</span> <span className="text-gray-600 dark:text-gray-400">Votre assistant juriste, je réponds à toutes vos questions sur le Droit congolais</span></h1>
          </div>
          <PromptIdeas />
        </div>
        <PromptInput />
      </IdeaProvider>
    </main>
  );
}
