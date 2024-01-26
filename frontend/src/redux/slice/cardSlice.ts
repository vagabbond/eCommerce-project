import { createSlice } from "@reduxjs/toolkit";

interface ICartItems {}
interface IInitialState {
 cartItems: ICartItems[];
}
const initialState: IInitialState = {
 cartItems: [],
};

const cartSlice = createSlice({
 name: "cart",
 initialState,
 reducers: {},
});

export default cartSlice.reducer;
