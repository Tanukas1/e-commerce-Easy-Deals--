import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: JSON.parse(localStorage.getItem('cart')) || [], 
  },
  reducers: {
    // Action to add item to cart
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        // If the item already exists, increase its quantity
        existingItem.quantity += 1;
      } else {
        // If it's a new item, add it to the cart
        state.items.push({ ...newItem, quantity: 1 });
      }

      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    
    // Action to remove item from cart
    removeItemFromCart(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      // Update localStorage after removing item
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    // Action to clear the entire cart
    clearCart(state) {
      state.items = [];
      // Remove cart from localStorage
      localStorage.removeItem('cart');
    }
  }
});

export const { addItemToCart, removeItemFromCart, clearCart } = CartSlice.actions;
export default CartSlice.reducer;
