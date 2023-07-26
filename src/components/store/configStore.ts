import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart/cartSlice";
const store = configureStore({
    reducer: {
        cart: cartSlice,
    },
});
export type RootState = ReturnType<typeof store.getState>
export default store;