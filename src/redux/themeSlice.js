import { createSlice } from '@reduxjs/toolkit'
import { useState } from 'react';

const initialState = {
    theme:false
}

const [isDarkTheme, setIsDarkTheme] = useState(false);

const ThemeSlice = createSlice({
    name:'toggleTheme',
    initialState,
    reducers:{
        changeTheme:()=> {
            setIsDarkTheme(!isDarkTheme)
        }
    }
})

export const { changeTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer 