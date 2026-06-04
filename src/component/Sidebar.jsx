import React from 'react'
import { FaBox, FaCartPlus, FaHome, FaSignOutAlt, FaStore, FaUser, FaUserCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useAuth } from '../context/AuthContext'

const Sidebar = ({ openSidebar, setOpenSidebar }) => {

    const navigate = useNavigate()
    const { logout } = useAuth()

    const handleLogout = () => {

        logout() // clears token + usernoreload 
        navigate('/login')

    }

    // const handleSignup =()=>{
    
    //     navigate('/register')
    //    }

    return (

        <div

            onClick={(e) => e.stopPropagation()}

            className={`bg-slate-400 text-black w-64 h-screen fixed top-0 left-0 transition-all duration-300
     ${openSidebar ? 'translate-x-0' : '-translate-x-full'}`}
        >
            <img src={logo} alt='logo'
                className='w-36 sm:w-40 ml-3 object-contain' />

            <div className='flex flex-col gap-3 text-base sm:text-xl mt-0'>

                <button
                    className='hover:bg-gray-300 hover:translate-x-1 p-3 rounded-2xl transition-all duration-300 flex items-center gap-3 mx-3 text-left'
                    onClick={() => navigate('/Dashboard')}
                >
                    <FaHome className='inline' /> Home
                </button>

                <button
                    className='hover:bg-gray-300 hover:translate-x-1 p-3 rounded-2xl transition-all duration-300 flex items-center gap-3 mx-3 text-left'
                    onClick={() => navigate('/home')}
                >
                    <FaStore className='inline' /> Products
                </button>

                <button
                    className='hover:bg-gray-300 hover:translate-x-1 p-3 rounded-2xl transition-all duration-300 flex items-center gap-3 mx-3 text-left'
                    onClick={() => navigate('/cart')}
                >
                    <FaCartPlus className='inline' /> Cart
                </button>

                <button
                    className='hover:bg-gray-300 hover:translate-x-1 p-3 rounded-2xl transition-all duration-300 flex items-center gap-3 mx-3 text-left'
                    onClick={() => navigate('/buyOrders')}
                >
                    <FaBox className='inline' /> Orders
                </button>

                <button
                    className='hover:bg-gray-300 hover:translate-x-1 p-3 rounded-2xl transition-all duration-300 flex items-center gap-3 mx-3 text-left'
                    onClick={() => navigate('/profile')}
                    // onClick={() => navigate('/shop-register')}

                >
                    <FaUser className='inline' /> Profile
                </button>

<button
                    className='hover:bg-gray-300 hover:translate-x-1 p-3 rounded-2xl transition-all duration-300 flex items-center gap-3 mx-3 text-left'
                    onClick={() => navigate('/shop-register')}
                    // onClick={handleSignup}
                   
                    >
                    
                    <FaUserCircle className='inline'  /> Apply Shopkeeper
</button>


                <button
                    className='hover:bg-gray-300 hover:translate-x-1 p-3 rounded-2xl transition-all duration-300 flex items-center gap-3 mx-3 text-left'
                    onClick={handleLogout}
                >
                    <FaSignOutAlt className='inline' />
                    Logout
                </button>

            </div>

        </div>

    )

}


export default Sidebar
