import { createSlice } from "@reduxjs/toolkit";

let CartStore = JSON.parse(localStorage.getItem("cart")) || [];

let cartSlice = createSlice({
  name: "cart",
  initialState: CartStore,
  reducers: {
     addToCart: (state, action) => {
      let item = action.payload;
      let existingItem = state.find((cartItem) => 
        cartItem.id === item.id && cartItem.size === item.size
      );

      if (existingItem) {
        existingItem.quantity += item.quantity; 
      } else {
        state.push(item); 
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const newState = state.filter(item => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    clearCart: () => {
      localStorage.removeItem("cart");
      return [];
    },
  },
});

export let { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;