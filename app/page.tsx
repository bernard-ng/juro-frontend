import PromptInput from "@/components/PromptInput";
import Card from "@/components/tailus-ui/Card";
import { CreativeCommons, Lightbulb } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-2xl w-full mx-auto">
        <div className="size-fit">
          <img src="/icon.svg" className="size-9" />
          </div>
        <div className="mt-6">
          <h1 className="text-2xl text-gray-950 dark:text-white">
            Bonjour, Je suis <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-400">Juro.</span> <span className="text-gray-600 dark:text-gray-400">Votre assistant juriste, je réponds à toutes vos questions sur le droit</span></h1>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-4">
          <Card className="p-1 aspect-square hover:scale-105 transition-[transform,box-shadow] hover:shadow-xl group dark:hover:bg-gray-800/50" variant="elevated">
            <div className="flex flex-col justify-between h-full p-[--card-padding] rounded-[calc(var(--card-border-radius)-0.25rem)] bg-gradient-to-b from-transparent to-primary-50 dark:to-transparent">
              <div className="rounded-full size-10 bg-primary-50 flex dark:bg-gray-800 dark:text-white">
                <Lightbulb className="size-5 m-auto" />
              </div>
              <p className="text-primary-950 dark:text-gray-200 line-clamp-3">To install the button follow these steps</p>
            </div>
          </Card>
          <Card className="p-1 aspect-square" variant="elevated">
            <div className="flex flex-col justify-between h-full p-[--card-padding] rounded-[calc(var(--card-border-radius)-0.25rem)] bg-gradient-to-b from-transparent to-secondary-50 dark:to-transparent">
              <div className="rounded-full size-10 bg-secondary-50 flex dark:bg-gray-800 dark:text-white">
                <Lightbulb className="size-5 m-auto" />
              </div>
              <p className="text-secondary-950 dark:text-gray-200">To install the button follow these steps</p>
            </div>
          </Card>
          <Card className="p-1 aspect-square" variant="elevated">
            <div className="flex flex-col justify-between h-full p-[--card-padding] rounded-[calc(var(--card-border-radius)-0.25rem)] bg-gradient-to-b from-transparent to-accent-50 dark:to-transparent">
              <div className="rounded-full size-10 bg-accent-50 flex dark:bg-gray-800 dark:text-white">
                <Lightbulb className="size-5 m-auto" />
              </div>
              <p className="text-accent-950 dark:text-gray-200">To install the button follow these steps</p>
            </div>
          </Card>
        </div>
      </div>
        <PromptInput />
    </main>
  );
}
