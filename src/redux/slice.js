const { createSlice } = require('@reduxjs/toolkit');
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveToStorage = async data => {
  try {
    await AsyncStorage.setItem('cart', JSON.stringify(data));
  } catch (e) {
    console.log('Storage Error', e);
  }
};

const initialState = {
  // value:0,
  items: [],
};

const addToCart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItems: (state, action) => {
      state.items.push(action.payload);
      saveToStorage(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveToStorage(state.items);
    },
    setCart: (state, action) => {
      state.items = action.payload;
      saveToStorage(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const item = state.items.find(i => i.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addItems, removeFromCart, setCart, updateQuantity } = addToCart.actions;
export default addToCart.reducer;
