import React, { useState } from 'react'
import api from '../api/axiosInstance'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

import {
    FaUserCircle,
    FaEnvelope,
    FaIdBadge,
    // FaAuthedUser,
    FaSignOutAlt,
    FaArrowLeft,
    FaKey,
    FaStore,
    FaBox,
    FaUser,
    FaCartPlus
} from 'react-icons/fa'

const Profile = () => {

    const navigate = useNavigate()
    const [openSidebar, setOpenSidebar] = useState(false)
    const { user, logout } = useAuth()
    const { cartCount } = useCart()

    const [showPopup, setShowPopup] = useState(false)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleLogout = () => {

        logout() // clears token + user state, no reload needed
        navigate('/login')

    }

    const changePassword = async () => {

        try {

            if (
                !currentPassword ||
                !newPassword ||
                !confirmPassword
            ) {

                alert('Please Fill All Fields')
                return

            }

            if (newPassword.length < 4) {

                alert('Password Must Be At Least 4 Characters')
                return

            }

            if (newPassword !== confirmPassword) {

                alert('Passwords Not Match')
                return

            }

            const res = await api.put(

                '/auth/change-password',

                {
                    currentPassword,
                    newPassword
                }

            )

            alert(res.data.message)

            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')

            setShowPopup(false)

        }
        catch (error) {

            alert(
                error.response?.data?.message
                || 'Server Error'
            )

        }

    }

    return (

        <>

            <div className='bg-gray-200 min-h-screen pb-24'>
                <div
                    onClick={() =>
                        openSidebar && setOpenSidebar(false)
                    }
                    className={`transition-all duration-300
${openSidebar ? 'ml-[75%] sm:ml-64' : 'ml-0'}`}
                >
                    <nav className='bg-gradient-to-r from-slate-300 to-slate-600 text-white px-4 sm:px-8 py-3 sm:py-4 flex justify-between items-center shadow-lg sticky top-0 z-50'>
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                setOpenSidebar(!openSidebar)
                            }}
                            className='text-3xl font-bold text-gray-700 cursor-pointer mb-1 ml-2'
                        >
                            ☰
                        </button>

                        <Sidebar
                            openSidebar={openSidebar}
                            setOpenSidebar={setOpenSidebar}
                        />

                        <h1 className='text-xl sm:text-3xl font-bold'>
                            Profile Details
                        </h1>

                    </nav>
                    <button
                        onClick={() => navigate('/home')}
                        className=' cursor-pointer text-blue-500 px-4 py-0.5 rounded-2xl to-transparent mt-1'
                    >

                        <FaArrowLeft className='inline mr-2 ' />
                        Back to Home

                    </button>
                    <div className='flex justify-center items-center p-1'>

                        <div className='bg-white w-full max-w-7xl rounded-3xl p-8 sm:p-9 h-[74vh]'>

                            <div className='flex flex-col items-center'>

                                <div className='p-3 rounded-full'>

                                    <FaUserCircle className='text-7xl text-blue-300' />

                                </div>

                                <h1 className='text-3xl font-bold  text-gray-700'>
                                    My Profile
                                </h1>

                            </div>

                            <div className='mt-2 space-y-5'>

                                <div className='bg-gray-100 p-2 rounded-2xl flex items-center gap-4'>

                                    <FaIdBadge className='text-2xl text-blue-300' />

                                    <div>

                                        <h1 className='text-gray-500 text-sm'>
                                            Name
                                        </h1>

                                        <h1 className='text-xl font-bold text-gray-700'>
                                            {user?.name || '—'}
                                        </h1>

                                    </div>

                                </div>

                                <div className='bg-gray-100 p-2 rounded-2xl flex items-center gap-4'>

                                    <FaEnvelope className='text-2xl text-green-300' />

                                    <div>

                                        <h1 className='text-gray-500 text-sm'>
                                            Email
                                        </h1>

                                        <h1 className='text-lg font-semibold text-gray-700 break-all'>
                                            {user?.email || '—'}
                                        </h1>

                                    </div>

                                </div>

                                <div className='bg-gray-100 p-2 rounded-2xl flex items-center gap-4'>

                                    <FaUser className='text-2xl text-blue-300' />

                                    <div>

                                        <h1 className='text-gray-500 text-sm'>
                                            Role
                                        </h1>

                                        <h1 className='text-lg font-semibold text-gray-700 break-all'>
                                            {user?.role || '—'}
                                        </h1>

                                    </div>

                                </div>

                            </div>

                            <div className='flex flex-col sm:flex-row justify-around items-center  mt-10'>

                                <button
                                    onClick={() => setShowPopup(true)}
                                    className='flex justify-center w-52 bg-slate-400 hover:bg-slate-500 text-white py-3 rounded-2xl font-bold items-center gap-2 transition-all duration-300'
                                >

                                    <FaKey className='text-xl' />

                                    Change Password

                                </button>

                                <button
                                    onClick={handleLogout}
                                    className='flex justify-center w-52 bg-red-400 hover:bg-red-500 text-white py-3 rounded-2xl font-bold items-center gap-2 transition-all duration-300'
                                >

                                    <FaSignOutAlt className='text-xl' />

                                    Logout

                                </button>

                            </div>

                        </div>

                    </div>

                    {
                        showPopup && (

                            <div className='fixed inset-0 flex justify-center items-center z-50 bg-black/60 backdrop-blur-sm'>

                                <div className='bg-white p-6 rounded-2xl w-[90%] max-w-md space-y-5 shadow-2xl'>

                                    <h1 className='text-xl font-bold text-center'>
                                        Change Your Password
                                    </h1>

                                    <div className='flex flex-col gap-4'>

                                        <input
                                            type='password'
                                            placeholder='Enter Current Password'
                                            value={currentPassword}
                                            onChange={(e) =>
                                                setCurrentPassword(e.target.value)
                                            }
                                            className='border w-full px-4 py-3 rounded-xl outline-none focus:border-green-500 text-black'
                                        />

                                        <input
                                            type='password'
                                            placeholder='Enter New Password'
                                            value={newPassword}
                                            onChange={(e) =>
                                                setNewPassword(e.target.value)
                                            }
                                            className='border w-full px-4 py-3 rounded-xl outline-none focus:border-green-500 text-black'
                                        />

                                        <input
                                            type='password'
                                            placeholder='Enter Confirm Password'
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(e.target.value)
                                            }
                                            className='border w-full px-4 py-3 rounded-xl outline-none focus:border-green-500 text-black'
                                        />

                                    </div>

                                    <div className='flex gap-3'>

                                        <button
                                            onClick={() => setShowPopup(false)}
                                            className='w-full bg-red-400 text-white py-3 rounded-xl font-bold'
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            onClick={changePassword}
                                            className='w-full bg-green-400 text-white py-3 rounded-xl font-bold'
                                        >
                                            Change Password
                                        </button>

                                    </div>

                                </div>

                            </div>

                        )
                    }

                </div>

                {/* Bottom navigation bar */}
                <div className='fixed bottom-0 left-0 w-full bg-white border- shadow-lg flex justify-around items-center py-2.5 z-50'>

                    <button
                        onClick={() => navigate('/home')}
                        className='flex flex-col items-center text-gray-500 hover:text-blue-500'
                    >

                        <FaStore className='text-xl' />

                        <span className='text-sm font-semibold'>
                            Home
                        </span>

                    </button>

                    <button
                        onClick={() => navigate('/cart')}
                        className='flex flex-col items-center text-gray-500 hover:text-blue-500 relative'
                    >

                        <FaCartPlus className='text-xl' />

                        {
                            cartCount > 0 && (

                                <span className='absolute -top-2 right-0 bg-red-500 text-white text-[10px] rounded-full px-1.5'>
                                    {cartCount}
                                </span>

                            )
                        }

                        <span className='text-sm font-semibold'>
                            Cart
                        </span>

                    </button>

                    <button
                        onClick={() => navigate('/buyorders')}
                        className='flex flex-col items-center text-gray-500 hover:text-blue-500'
                    >

                        <FaBox className='text-xl' />

                        <span className='text-sm font-semibold'>
                            Orders
                        </span>

                    </button>

                    <button
                        onClick={() => navigate('/profile')}
                        className='flex flex-col items-center text-blue-500'
                    >

                        <FaUser className='text-xl' />

                        <span className='text-sm font-semibold'>
                            Profile
                        </span>

                    </button>

                </div>
            </div>

        </>

    )

}

export default Profile