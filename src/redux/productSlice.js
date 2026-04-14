import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk('products', async()=>{
    const resp = await fetch('https://69a7bb832cd1d055269167fa.mockapi.io/api/v1/cart');
    const jsonResp = await resp.json();
    return jsonResp.products
})

const initialState ={
    items:[],
    status:undefined,
    error :null
}

const ProductSlice = createSlice({
    name:'productSlice',
    initialState,
    extraReducers:(builders)=>{
        builders
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.status='Succeeded',
            state.items=action.payload
        })
    }
})

export default ProductSlice.reducer