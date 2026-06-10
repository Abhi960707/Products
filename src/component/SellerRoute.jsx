import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const SellerRoute = ({ children }) => {
    const { user, loading } = useAuth()
    
    if (loading) {
        return (
            <div className='min-h-screen flex justify-center items-center bg-gray-100'>
                <h1 className='text-2xl font-bold text-blue-400 animate-pulse'>Loading...</h1>
            </div>
        )
    }
    

    if (!user || (user.role !== 'shopkeeper' && user.role !== 'admin')) {
        return <Navigate to='/Dashboard' replace />
    }

    return children
}

export default SellerRoute;
