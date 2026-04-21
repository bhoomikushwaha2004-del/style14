import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './slice';
import toggleThemeReducer from './themeSlice'
import productsReducer from '../redux/productSlice'

 const store = configureStore({
    reducer:{
        cart:cartReducer,
        products:productsReducer,
        toggleTheme:toggleThemeReducer
    }
})

export default store;