// Trong file import thư viện
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCart } from "../../../api/cart";

// Tạo action
export const fetchCart = createAsyncThunk("fetch/cart", async () => {
    try {
        const userId = JSON.parse(sessionStorage.getItem("userData") as string);
        const id = userId?.user._id;
        if (id !== "") {
            const { data } = await getAllCart(id)
            return data;
        }
        return null;
    } catch (error) {
        console.log(error);
    }
});
