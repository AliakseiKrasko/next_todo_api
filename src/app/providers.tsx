"use client"

import { Provider } from "react-redux"
import { useEffect } from "react"
import { loadAuthFromStorage, persistAuthToStorage, store } from "@/shared/store"

export default function Providers({ children }: { children: React.ReactNode }) {
    // Восстановим состояние и подпишемся на изменения
    useEffect(() => {
        loadAuthFromStorage()
        const unsub = store.subscribe(persistAuthToStorage)
        return () => unsub()
    }, [])

    return <Provider store={store}>{children}</Provider>
}
