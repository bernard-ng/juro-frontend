import { LoginForm } from "@/components/LoginForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center lg:p-24">
      <div className="max-w-xs">
        <img src="/icon.svg" className="size-9 m-auto" />
        <div className="my-6 text-center">
          <h1 className="text-2xl text-gray-950 dark:text-white">Bon retour sur <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary-500 to-secondary-400">Juro</span></h1>
          <p className="mt-3 text-gray-600 dark:text-gray-400">Connectez-vous pour continuer à poser vos questions sur le droit Congolais</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
