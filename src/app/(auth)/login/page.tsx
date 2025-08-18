"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const mockUser = {
    email: "test@example.com",
    password: "123456",
}

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const router = useRouter()

    const handleLogin = () => {
        if (email === mockUser.email && password === mockUser.password) {
            localStorage.setItem("isAuth", "true")
            router.push("/dashboard")
        } else {
            setError("Invalid email or password")
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-80 p-6 bg-white rounded shadow">
                <h1 className="text-xl font-bold mb-4">Вход</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border mb-2 rounded"
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border mb-2 rounded"
                />
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Войти
                </button>
            </div>
        </div>
    )
}
