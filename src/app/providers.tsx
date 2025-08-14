"use client";

import { Provider } from "react-redux";
import { store, loadAuthFromStorage, persistAuthToStorage } from "@/lib/store";
import { useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
    // Восстановим состояние и подпишемся на изменения
    useEffect(() => {
        loadAuthFromStorage();
        const unsub = store.subscribe(persistAuthToStorage);
        return () => unsub();
    }, []);

    return <Provider store={store}>{children}</Provider>;