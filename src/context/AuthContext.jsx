import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/axiosInstance'

/**
 * AuthContext
 *
 * Provides authentication state and actions across the entire app.
 * - Fetches user profile from /api/profile on app load / token change
 * - Handles refresh-without-logout: if token valid → stay logged in
 */

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true) // prevents flash of redirect on refresh

    // ── Fetch user profile whenever token changes ────────
    useEffect(() => {

        const fetchProfile = async () => {

            if (!token) {
                setUser(null)
                setLoading(false)
                return
            }

            try {

                const res = await api.get('/profile')
                setUser(res.data)

            } catch (error) {

                // Token invalid or expired — clear it
                console.error('Profile fetch failed:', error.message)
                localStorage.removeItem('token')
                setToken(null)
                setUser(null)

            } finally {

                setLoading(false)

            }

        }

        fetchProfile()

    }, [token])

    // ── Login: store token, trigger profile fetch ────────
    const login = (newToken) => {

        localStorage.setItem('token', newToken)
        setToken(newToken)
        // useEffect above will fire and fetch profile

    }

    // ── Logout: clear token and user state ───────────────
    const logout = () => {

        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        // No window.location.reload() needed — state change triggers re-render

    }

    return (

        <AuthContext.Provider value={{ token, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>

    )

}

// Custom hook for convenience
export const useAuth = () => useContext(AuthContext)
