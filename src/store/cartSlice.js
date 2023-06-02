
import { createSlice } from '@reduxjs/toolkit';
const initialState={
    cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
    cartTotalQuantity:0,
    cartTotalAmount:0,
};

const cartSlice= createSlice
(
    {
        name: "cart",
        initialState,
        reducers:
        {
            addToCart(state,action){
           const itemIndex= state.cartItems.findIndex((item)=> item.name===action.payload.name);
           if(itemIndex>=0)
           {
            state.cartItems[itemIndex].carteQuantity+=1;
           }
           else
           {
            const tempProduct = {...action.payload,carteQuantity:1};
            
            state.cartItems.push(tempProduct);
           }
           localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },
            removeFromCart(state,action)
        {   
            const nextCarteItems = state.cartItems.filter(cartItem=>cartItem.name!==action.payload.name);
            state.cartItems=nextCarteItems;
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },
            decreaseQuantity(state,action)
            {
                const itemIndex= state.cartItems.findIndex((item)=> item.name===action.payload.name);
                if(state.cartItems[itemIndex].carteQuantity!==1)
                {
                    state.cartItems[itemIndex].carteQuantity-=1;
                }
                localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
            },

            increaseQuantity(state,action)
            {
                const itemIndex= state.cartItems.findIndex((item)=> item.name===action.payload.name);
                    state.cartItems[itemIndex].carteQuantity+=1;
                localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
            },

            removeAll(state,action)
            {
                state.cartItems=[];
                localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
            }
            
        }
    
    }
);

export const {addToCart,removeFromCart,decreaseQuantity,increaseQuantity,removeAll}=cartSlice.actions;

export default cartSlice.reducer;