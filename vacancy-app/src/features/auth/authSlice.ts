import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AuthState} from "../../types/interfaces/State.ts";

const token = localStorage.getItem('token')
const initialState: AuthState = {
    token: token || null,
    isAdmin: !!token,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<string>) => {
            state.token = action.payload
            state.isAdmin = true
            localStorage.setItem('token', action.payload)
        },
        logout: (state) => {
            state.token = null
            state.isAdmin = false
            localStorage.removeItem('token')
        }
    }
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
