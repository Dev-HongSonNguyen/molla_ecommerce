import { createSlice } from "@reduxjs/toolkit";
import { fetchCart } from "./handlers";
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        carts: [],
        status: 'idle',
        error: null,
        totalAmount: 0,
        totalQuantity: 0,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.carts = action.payload.carts;
                state.totalAmount = action.payload.totalAmount;
                state.totalQuantity = action.payload.totalQuantity;
            })
            .addCase(fetchCart.rejected, (state) => {
                state.status = 'failed';
            });
    },
});
export default cartSlice.reducer;