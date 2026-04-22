import { createSlice } from '@reduxjs/toolkit'
import { useState } from 'react';

const initialState = {
    darkTheme:false
}



const ThemeSlice = createSlice({
    name:'toggleTheme',
    initialState,
    reducers:{
        changeTheme:(state)=> {
            state.darkTheme = !state.darkTheme
        }
    }
})

export const { changeTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer 