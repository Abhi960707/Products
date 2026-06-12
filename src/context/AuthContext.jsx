import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/axiosInstance'
import { useDispatch } from 'react-redux'
import { loginSuccess, logout as reduxLogout } from '../redux/slices/authSlice'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const dispatch = useDispatch()
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem('user')
            return savedUser ? JSON.parse(savedUser) : null
        } catch (e) {
            return null
        }
    })
    const [loading, setLoading] = useState(true) // prevents flash of redirect on refresh

    //Fetch user profile also token changes
    useEffect(() => {
        const fetchProfile = async () => {

            if (!token) {
                setUser(null)
                setLoading(false)
                return
            }

            try {
                  console.log("TOKEN =", token)
                  
                const res = await api.get('/auth/profile')
                setUser(res.data)
                localStorage.setItem('user', JSON.stringify(res.data))
                localStorage.setItem('role', res.data.role)
                dispatch(loginSuccess({
                    user: res.data,
                    token,
                    role: res.data.role
                }))
                console.log("User Data:", res.data)
                console.log("Role:", res.data.role)

            } catch (error) {

                // Token invalidorexpire
                console.error('Profile fetch failed:', error.message)
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                localStorage.removeItem('role')
                dispatch(reduxLogout())
                setToken(null)
                setUser(null)
                
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()

    }, [token, dispatch])

    //Login store token
    const login = (newToken, newUser) => {

        localStorage.setItem('token', newToken)
        if (newUser) {
            localStorage.setItem('user', JSON.stringify(newUser))
            localStorage.setItem('role', newUser.role)
            setUser(newUser)
            dispatch(loginSuccess({
                user: newUser,
                token: newToken,
                role: newUser.role
            }))
        }
        setToken(newToken)
        setLoading(false)

    }

    // Logout: clear token and user state
    const logout = () => {

        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('role')
        dispatch(reduxLogout())
        setToken(null)
        setUser(null)

    }

    const role = user?.role || null
    return (

        <AuthContext.Provider value={{ token, user, role, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
