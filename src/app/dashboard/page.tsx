"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
    const router = useRouter()

    useEffect(() => {
        const isAuth = localStorage.getItem("isAuth")
        if (!isAuth) {
            router.push("/login")
        }
    }, [router])

    return (
        <div className="flex min-h-screen items-center justify-center">
            <h1 className="text-2xl font-bold">Добро пожаловать 🎉</h1>
        </div>
    )
}
