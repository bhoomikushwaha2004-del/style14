import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './slice';
import toggleThemeReducer from './themeSlice'
import productsReducer from './productSlice'

 const store = configureStore({
    reducer:{
        cart:cartReducer,
        products:productsReducer,
        theme:toggleThemeReducer
    }
})

export type RootState = ReturnType <typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store;