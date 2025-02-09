import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [], 
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducer: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
    },

  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
