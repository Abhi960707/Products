import { createSlice } from "@reduxjs/toolkit"
const initialState ={
    cartItems:[]
}
const cartSlice=createSlice({
    name:'cart',   
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const existingItem =state.cartItems.find(
                item=>item.productId===action.payload.productId
            )
            if(existingItem){
                existingItem.quantity += 1
            } else {
                state.cartItems.push({...action.payload, quantity: 1})
            }
        },
        removeFromCart:(state,action)=>{state.cartItems=state.cartItems.filter(
            item=>item.productId!==
            action.payload 
        )}
    }
})

export const {
    addToCart,removeFromCart } = cartSlice.actions

export default cartSlice.reducer