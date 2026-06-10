import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AdminRoute = ({ children }) => {
    const { user,loading } = useAuth()
    if(loading){
        return <h1 className='text-2xl font-bold text-blue-400 animate-pulse'>Loading..</h1>
    }
    if(user?.role !== 'admin'){
        return <Navigate to='/Dashboard'/>
    }
    return children
}

export default AdminRoute