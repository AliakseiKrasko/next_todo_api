import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface AuthState {
    isAuthenticated: boolean
    user: null | { email: string }
    error: string | null
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    error: null,
}

export const DEMO_CREDENTIALS = {
    email: "demo@acme.io",
    password: "password123",
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginRequested(state) {
            state.error = null
        },
        loginSucceeded(state, action: PayloadAction<{ email: string }>) {
            state.isAuthenticated = true
            state.user = { email: action.payload.email }
            state.error = null
        },
        loginFailed(state, action: PayloadAction<string>) {
            state.error = action.payload
            state.isAuthenticated = false
            state.user = null
        },
        logout(state) {
            state.isAuthenticated = false
            state.user = null
            state.error = null
        },
        hydrate(state, action: PayloadAction<AuthState>) {
            return action.payload
        },
    },
})

export const { loginRequested, loginSucceeded, loginFailed, logout, hydrate } = authSlice.actions
export default authSlice.reducer
