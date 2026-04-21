import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    theme:false
}

const ThemeSlice = createSlice({
    name:'toggleTheme',
    initialState,
    reducers:{
        changeTheme:(state)=> {
            state.theme != theme
        }
    }
})

export const { changeTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer 