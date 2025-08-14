import Link from "next/link"

export default function Home() {
    return (
        <main className="grid place-items-center min-h-dvh p-6">
            <div className="max-w-md w-full text-center space-y-6">
                <h1 className="text-3xl font-semibold">Добро пожаловать 👋</h1>
                <p className="text-gray-600">Это приложение для упарвления задачами</p>
                <Link
                    href="/login"
                    className="inline-flex items-center justify-center rounded-lg border px-4 py-2 hover:bg-gray-100"
                >
                    Перейти к авторизации
                </Link>
            </div>
        </main>
    )
}
