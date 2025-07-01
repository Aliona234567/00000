import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../pages/Profile/profileSlice";
import cartReducer from "../pages/Cart/cartSlice";
import ProductsReducer from '../pages/Products/ProductsSlice'
export let store = configureStore({
  reducer: {
    profile: profileReducer,
    cart: cartReducer,
    products: ProductsReducer,
  },
});
