import { createSlice } from "@reduxjs/toolkit";
import { calculatePrice } from "../utils/cartUtils";

interface IReviews {
 user: string;
 name: string;
 rating: number;
 comment: string;
}
interface ICartItem {
 _id: string;
 user: string;
 name: string;
 image: string;
 description: string;
 brand: string;
 category: string;
 price: number;
 countInStock: number;
 rating: number;
 numReviews: number;
 reviews: IReviews[];
 qty: number;
}
export interface IInitialState {
 cartItems: ICartItem[];
 itemsPrice: number;
 shippingPrice: number;
 taxPrice: number;
 totalPrice: number;
}
const initialState: IInitialState = {
 cartItems: [],
 itemsPrice: 0,
 shippingPrice: 0,
 taxPrice: 0,
 totalPrice: 0,
};

const cartSlice = createSlice({
 name: "cart",
 initialState,
 reducers: {
  addToCart: (state, action) => {
   const item = action.payload;
   const ifExist = state.cartItems.find(
    (stateItem) => stateItem._id === item._id
   );
   if (ifExist) {
    state.cartItems = state.cartItems.map((stateItem) =>
     stateItem._id === ifExist._id ? item : stateItem
    );
   } else {
    state.cartItems = [...state.cartItems, item];
   }
   state = calculatePrice(state);
   localStorage.setItem("cart", JSON.stringify(state));
  },
  removeFromCart: (state, action) => {
   state.cartItems = state.cartItems.filter(
    (item) => item._id !== action.payload
   );
   calculatePrice(state);
   localStorage.setItem("cart", JSON.stringify(state));
  },
 },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
