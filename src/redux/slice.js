const { createSlice } = require('@reduxjs/toolkit');
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveData = async data => {
  try {
    await AsyncStorage.setItem('cart', JSON.stringify(data));
  } catch (e) {
    console.log('storage err ', e);
  }
};

const initialState = {
  // value:0,
  items: [],
  wishlist:[],
};

const addToCart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItems: (state, action) => {
      state.items.push(action.payload);
      saveData(state.items);
    },
    removeCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveData(state.items);
    },
    setCart: (state, action) => {
      state.items = action.payload;
      saveData(state.items);
    },
    handleQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const item = state.items.find(i => i.id === id);
      if (item) {
        item.quantity = quantity;
      }

      saveData(state.items);
    },
    addToWishlist:(state,action)=>{
      const exist = state.wishlist.find(item => item.id === action.payload.id)

      if(!exist) {
        state.wishlist.push(action.payload)
      }

      saveData(state.wishlist)
    },
    removeFromWishlist:(state,action)=> {
      state.wishlist=state.wishlist.filter(item => item.id !== action.payload.id);
      saveData(state.wishlist);
    }
  },
});

export const { addItems, removeCart, setCart, handleQuantity, addToWishlist,removeFromWishlist } =
  addToCart.actions;
export default addToCart.reducer;
