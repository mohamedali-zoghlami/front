
import cartReducer from './cartSlice';
import { configureStore } from '@reduxjs/toolkit';
import { devToolsEnhancer  } from 'redux-devtools-extension';
import userReducer from './userSlice';


const store = configureStore({
    reducer:
{
    cart: cartReducer,
    user: userReducer
}
},devToolsEnhancer());

export default store;