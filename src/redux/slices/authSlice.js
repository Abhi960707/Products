import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    user:
        JSON.parse(
            localStorage.getItem('user')
        ) || null,
    token:
        localStorage.getItem('token') || null,
    role:
        localStorage.getItem('role') || null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.role = action.payload.role

        },

        logout: (state) => {
            state.user = null
            state.token = null
            state.role = null

            
        }
    }
})

export const {
    loginSuccess, logout
} = authSlice.actions

export default authSlice.reducer

