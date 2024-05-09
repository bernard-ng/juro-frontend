import Card from "@/components/tailus-ui/Card";
import Image from "next/image";
import type {Metadata} from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Inscription | Juro",
    description: "Profiter de tous les avantages de Juro en vous inscrivant !",
};

export default function Register() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Card className="max-w-md w-full p-0 bg-gray-50" variant="mixed">
                <Card className="-m-px">
                    <div className="mx-auto max-w-[18rem] w-full py-4">
                        <a href="" className="w-fit mx-auto block mb-6">
                            <Image src="/icon.svg" width={10} height={10} alt="Juro Logo" className="size-9"/>
                        </a>
                        <h1 className="text-center text-2xl font-semibold text-gray-950 dark:text-white">Rejoignez-nous</h1>
                        <p className="text-center text-gray-700 dark:text-gray-400">Profiter de tous les avantages de Juro en vous inscrivant !</p>
                    </div>
                </Card>
                <div className="py-4">
                    <p className="text-center text-sm text-gray-700 dark:text-gray-300">
                        Vous avez un compte ?
                        <Link href="/login" className="ml-2 text-info-600 font-medium hover:underline dark:text-info-400">
                            Connecte-vous
                        </Link>
                    </p>
                    <p className="mx-auto mt-2 text-sm text-gray-700 dark:text-gray-300 text-center">
                        En poursuivant, vous acceptez nos <br/>
                        <a href="#" className="ml-2 text-info-600 font-medium hover:underline dark:text-info-400">
                            Conditions d'utilisation
                        </a>
                    </p>
                </div>
            </Card>
        </main>
    );
}
