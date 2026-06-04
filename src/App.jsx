import React from 'react'

import ProductApi from './component/ProductApi'
import ProductDetails from './component/ProductDetails'
import Cart from './component/Cart'
import BuyOrders from './component/BuyOrders'
import Login from './component/Login'
import Register from './component/Register'
import Profile from './component/Profile'
import Dashboard from './component/Dashboard'
import AddProduct from './component/AddProduct'
import SellerDashboard from './component/SellerDashboard'
import ShopRegister from './component/ShopRegister'
import ForgetPassword from './component/ForgetPassword' 
// import Myproduct from './component/Myproduct'

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from 'react-router-dom'

import { AuthProvider, useAuth } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
// import ForgetPassword from './component/ForgetPassword'

// ─────────────────────────────────────────────────────────
// ProtectedRoute: shows spinner while auth is resolving,
// then redirects to /login if not authenticated.
// This prevents the "flash redirect on refresh" bug.
// ─────────────────────────────────────────────────────────
const ProtectedRoute = ({ children }) => {

    const { token, loading } = useAuth()

    if (loading) {
        return (
            <div className='min-h-screen flex justify-center items-center bg-gray-100'>
                <h1 className='text-2xl font-bold text-blue-400 animate-pulse'>
                    Loading...
                </h1>
            </div>
        )
    }

    return token ? children : <Navigate to='/login' />

}

// ─────────────────────────────────────────────────────────
// PublicRoute: redirects authenticated users away from
// login/register pages to Dashboard.
// ─────────────────────────────────────────────────────────
const PublicRoute = ({ children }) => {

    const { token, loading } = useAuth()

    if (loading) {
        return (
            <div className='min-h-screen flex justify-center items-center bg-gray-100'>
                <h1 className='text-2xl font-bold text-blue-400 animate-pulse'>
                    Loading...
                </h1>
            </div>
        )
    }

    return token ? <Navigate to='/Dashboard' /> : children

}

// ─────────────────────────────────────────────────────────
// AppRoutes: defined inside providers so useAuth() works
// ─────────────────────────────────────────────────────────
const AppRoutes = () => {

    return (
        <Routes>
            {/* Root redirect — logged-in users see products, others go to login */}
            <Route
                path='/'
                element={
                    <Navigate to="/Dashboard" replace />
                }
            />

            {/* Public routes */}
            <Route
                path='/login'
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />

            <Route
                path='/register'
                element={
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                }
            />

            {/* Shop Regstration pageroute */}
            <Route
            path='/shop-register'
            element={
             
                <ProtectedRoute>
                    <ShopRegister />
                </ProtectedRoute>
                
            }
/>

{/* Forget password */}
<Route
path='/forget-password'
element= {
             
                <PublicRoute>
                    <ForgetPassword />
                </PublicRoute>
                
            }
/>

            <Route
                path='/Dashboard'
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path='/home'
                element={
                    <ProtectedRoute>
                        <ProductApi />
                    </ProtectedRoute>
                }
            />

            <Route
                path='/product/:id'
                element={
                    <ProtectedRoute>
                        <ProductDetails />
                    </ProtectedRoute>
                }
            />

            <Route
                path='/cart'
                element={
                    <ProtectedRoute>
                        <Cart />
                    </ProtectedRoute>
                }
            />

            <Route
                path='/buyorders'
                element={
                    <ProtectedRoute>
                        <BuyOrders />
                    </ProtectedRoute>
                }
            />

            <Route
                path='/profile'
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            <Route
                path='/add-product'
                element={
                    <ProtectedRoute>
                        <AddProduct />
                    </ProtectedRoute>
                }
            />

             {/* <Route
                path='/my-products'
                element={
                    <ProtectedRoute>
                        <Myproduct />
                    </ProtectedRoute>
                }
            /> */}

            <Route
                path='/seller-dashboard'
                element={
                    <ProtectedRoute>
                        <SellerDashboard />
                    </ProtectedRoute>
                }
            />

        </Routes>

    )

}

// ─────────────────────────────────────────────────────────
// App: wraps everything with AuthProvider → CartProvider
// CartProvider depends on AuthContext, so order matters.
// ─────────────────────────────────────────────────────────
function App() {

    return (

        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
                    <AppRoutes />
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>

    )

}

export default App