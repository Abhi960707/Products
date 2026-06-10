import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUserCircle, FaStore, FaBox, FaUsers, FaUserPlus, FaUser } from 'react-icons/fa'
import Sidebar from './Sidebar'
import api from '../api/axiosInstance'
import { useAuth } from '../context/AuthContext'

const AdminDashboard = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [openSidebar, setOpenSidebar] = useState(false)
    const [stats, setStats] = useState({
        totalCustomers: 0,
        totalShopkeepers: 0,
        totalProducts: 0,
        totalOrders: 0
    })
    const [recentShopkeepers, setRecentShopkeepers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true)
                const res = await api.get('/auth/admin-stats')
                if (res.data) {
                    setStats(res.data.stats || {
                        totalCustomers: 0,
                        totalShopkeepers: 0,
                        totalProducts: 0,
                        totalOrders: 0
                    })
                    setRecentShopkeepers(res.data.recentShopkeepers || [])
                }
            } catch (error) {
                console.error('Error fetching admin stats:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    return (
        <div className='min-h-screen  overflow-y-auto scrollbar-hide'>
            <div
                onClick={() => openSidebar && setOpenSidebar(false)}
                className={`transition-all duration-300 ${openSidebar ? 'ml-[75%] sm:ml-64' : 'ml-0'}`}
            >
                {/* Navbar */}
                <nav className='bg-gradient-to-r from-slate-400 to-slate-600 text-white px-4 py-3 flex justify-between items-center shadow-lg sticky top-0 z-50'>
                {/* <nav className=' border-b border-slate-700/50 px-6 py-4 flex justify-between items-center shadow-2xl sticky top-0 z-50'> */}
                    <div className='flex items-center gap-3'>
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                setOpenSidebar(!openSidebar)
                            }}
                            className='text-3xl font-bold text-gray-700 cursor-pointer mb-1 ml-2'
                        >
                            ☰
                        </button>
                        <h1 className='text-xl sm:text-3xl font-bold tracking-wide mb-1'>
                            Admin Details
                        </h1>
                    </div>

                    <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

                    <div className='bg-slate-700 hover:bg-slate-600 text-slate-100 border border-slate-600 cursor-pointer p-2.5 rounded-full shadow-md hover:scale-105 transition-all duration-300'>
                        <button onClick={() => navigate('/profile')} className='flex items-center justify-center'>
                            <FaUser className='text-lg' />
                        </button>
                    </div>
                </nav>

                {/* Dashboard body */}
                <div className='max-w-7xl mx-auto p-6 space-y-8'>
                    {/* Welcome banner */}
                    <div className='bg-slate-400  rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-xl'>
                        <div>
                            <h2 className='text-3xl font-extrabold text-white'>Welcome Back, Admin!</h2>
                            <p className='text-slate-400 mt-2 text-sm sm:text-base'>
                                Manage seller registrations, view system-wide stats, and control RBAC settings.
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/shop-register')}
                            className='bg-sky-400 text-white font-bold px-6 py-3.5 rounded-2xl flex items-center gap-2.5 shadow-lg shadow-indigo-500/20 hover:scale-105 hover:shadow-indigo-500/30 active:scale-95 transition-all duration-200 cursor-pointer'
                        >
                            <FaUserPlus className='text-lg' />
                            Create Shopkeeper
                        </button>
                    </div>

                    {loading ? (
                        <div className='flex justify-center items-center py-20'>
                            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
                        </div>
                    ) : (
                        <>
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                                {/* Customers */}
                                <div className='bg-slate-400 rounded-2xl p-6 shadow-lg hover:border-blue-500/50 transition-all duration-300'>
                                    <div className='flex justify-between items-center'>
                                        <div>
                                            <p className=' font-medium text-sm'>Total Customers</p>
                                            <h3 className='text-3xl font-black text-white mt-2'>{stats.totalCustomers}</h3>
                                        </div>
                                        <div className='bg-blue-500/10 p-3.5 rounded-xl border border-blue-500/20'>
                                            <FaUsers className='text-2xl text-blue-400' />
                                        </div>
                                    </div>
                                </div>

                                {/* Shopkeepers */}
                                <div className='bg-slate-400 rounded-2xl p-6 shadow-lg hover:border-indigo-500/50 transition-all duration-300'>
                                    <div className='flex justify-between items-center'>
                                        <div>
                                            <p className='text-slate-400 font-medium text-sm'>Total Shopkeepers</p>
                                            <h3 className='text-3xl font-black text-white mt-2'>{stats.totalShopkeepers}</h3>
                                        </div>
                                        <div className='bg-indigo-500/10 p-3.5 rounded-xl border border-indigo-500/20'>
                                            <FaUserCircle className='text-2xl text-indigo-400' />
                                        </div>
                                    </div>
                                </div>

                                {/* Products */}
                                <div className='bg-slate-400 rounded-2xl p-6 shadow-lg hover:border-emerald-500/50 transition-all duration-300'>
                                    <div className='flex justify-between items-center'>
                                        <div>
                                            <p className='text-slate-400 font-medium text-sm'>Total Products</p>
                                            <h3 className='text-3xl font-black text-white mt-2'>{stats.totalProducts}</h3>
                                        </div>
                                        <div className='bg-emerald-500/10 p-3.5 rounded-xl border border-emerald-500/20'>
                                            <FaStore className='text-2xl text-emerald-400' />
                                        </div>
                                    </div>
                                </div>

                                {/* Orders */}
                                <div className='bg-slate-400 rounded-2xl p-6 shadow-lg hover:border-amber-500/50 transition-all duration-300'>
                                    <div className='flex justify-between items-center'>
                                        <div>
                                            <p className='text-slate-400 font-medium text-sm'>Total Orders</p>
                                            <h3 className='text-3xl font-black text-white mt-2'>{stats.totalOrders}</h3>
                                        </div>
                                        <div className='bg-amber-500/10 p-3.5 rounded-xl border border-amber-500/20'>
                                            <FaBox className='text-2xl text-amber-400' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Shopkeepers Table */}
                            <div className='text-black rounded-3xl p-6 shadow-xl bg-sky-200'>
                                <h3 className='text-xl font-bold text mb-6'>Recent Shopkeeper Registrations</h3> 
                                <div className='overflow-x-auto text-black'>
                                    <table className='w-full text-left border-collapse text-black'>
                                        <thead>
                                            <tr className=' border-b border-slate-700 text-gray-600 font-semibold text-sm'>
                                                <th className='pb-4 pl-4'>Name</th>
                                                <th className='pb-4'>Email</th>
                                                <th className='pb-4'>Role</th>
                                                <th className='pb-4 pr-4 text-right'>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className='divide-y divide-slate-800 text-sm'>
                                            {recentShopkeepers.length > 0 ? (
                                                recentShopkeepers.map((sk) => (
                                                    <tr key={sk._id} className=' text-black'>
                                                        <td className='py-4 pl-4 font-semibold '>{sk.name}</td>
                                                        <td className='py-4 '>{sk.email}</td>
                                                        <td className='py-4  font-mono'>{sk.role}</td>
                                                        <td className='py-4 pr-4 text-right'>
                                                            <span className=' text-green-500 border px-2.5 py-1 rounded-full text-xs font-semibold'>
                                                                Active Seller
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan='4' className='text-center py-8 text-slate-500'>
                                                        No shopkeepers found. Use 'Create Shopkeeper' to add your first seller.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard