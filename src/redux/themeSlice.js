import { createSlice } from '@reduxjs/toolkit'
import { useState } from 'react';

const initialState = {
    isDarkTheme:false
}



const ThemeSlice = createSlice({
    name:'toggleTheme',
    initialState,
    reducers:{
        changeTheme:(state)=> {
            state.isDarkTheme = !state.isDarkTheme
        }
    }
})

export const { changeTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer 