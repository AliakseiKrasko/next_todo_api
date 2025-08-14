import { configureStore } from "@reduxjs/toolkit"
import authReducer, { hydrate, type AuthState } from "@/features/auth/model/authSlice"

export const makeStore = () =>
    configureStore({
        reducer: {
            auth: authReducer,
        },
    })

export const store = makeStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Сохранение состояния в localStorage
export const persistAuthToStorage = () => {
    if (typeof window === "undefined") return
    try {
        const state = store.getState()
        localStorage.setItem("auth_state", JSON.stringify({ auth: state.auth }))
    } catch (error) {
        console.error(error)
    }
}

// Загрузка состояния из localStorage
export const loadAuthFromStorage = () => {
    if (typeof window === "undefined") return
    try {
        const raw = localStorage.getItem("auth_state")
        if (raw) {
            const parsed = JSON.parse(raw) as { auth: AuthState }
            localStorage.setItem("auth_state", JSON.stringify(parsed.auth))
            store.dispatch(hydrate(parsed.auth))
        }
    } catch (error) {
        console.error(error)
    }
}
