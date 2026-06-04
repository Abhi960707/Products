import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/axiosInstance'
import { useAuth } from './AuthContext'

/**
 * CartContext
 *
 * Provides cart state and actions across the entire app.
 * - All cart data lives in MongoDB (fetched via /api/cart)
 * - Nothing stored in localStorage except the auth token
 * - Re-fetches cart whenever the user logs in/out
 */

const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const { token } = useAuth()
    const [cart, setCart] = useState([])
    const [cartLoading, setCartLoading] = useState(false)

    // ── Derived count for badge display ──────────────────
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

    // ── Fetch cart from DB whenever user changes ─────────
    useEffect(() => {

        if (token) {
            fetchCart()
        } else {
            setCart([]) // clear cart on logout
        }

    }, [token])

    // ── Fetch cart from backend ───────────────────────────
    const fetchCart = async () => {

        try {

            setCartLoading(true)
            const res = await api.get('/cart')
            setCart(res.data?.items || [])

        } catch (error) {

            console.error('fetchCart error:', error.message)
            setCart([])

        } finally {

            setCartLoading(false)

        }

    }

    // ── Add item to cart ──────────────────────────────────
    const addToCart = async (product, quantity = 1) => {

        try {

            const payload = {
                productId: product.productId || product._id || product.id,
                title: product.title,
                image: product.image,
                price: product.price,
                category: product.category || '',
                quantity
            }

            const res = await api.post('/cart', payload)
            setCart(res.data?.cart?.items || [])

        } catch (error) {

            console.error('addToCart error:', error.message)
            alert(
                error.response?.data?.message ||
                'Failed Item Not Available. Please try again'
            )
          

        }

    }

    // ── Remove item from cart ─────────────────────────────
    const removeFromCart = async (productId) => {

        try {

            const res = await api.delete(`/cart/${productId}`)
            setCart(res.data?.cart?.items || [])

        } catch (error) {

            console.error('removeFromCart error:', error.message)
            alert('Failed to remove item. Please try again.')

        }

    }

    // ── Update quantity of a cart item ────────────────────
    const updateQuantity = async (productId, quantity) => {

        if (quantity < 1) {
            // Remove item if quantity drops to 0
            return removeFromCart(productId)
        }

        try {

            const res = await api.put(`/cart/${productId}`, { quantity })
            setCart(res.data?.cart?.items || [])

        } catch (error) {

            console.error('updateQuantity error:', error.message)
            alert('Failed Item Not Available '

            )
            // console.log(error.response.data)
            console.table(error.response.data)
        }
    }

    // ── Clear entire cart ─────────────────────────────────
    const clearCart = async () => {

        try {

            await api.delete('/cart')
            setCart([])

        } catch (error) {

            console.error('clearCart error:', error.message)

        }

    }

    return (

        <CartContext.Provider value={{
            cart,
            cartCount,
            cartLoading,
            fetchCart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart
        }}>
            {children}
        </CartContext.Provider>

    )

}

// Custom hook for convenience
export const useCart = () => useContext(CartContext)
