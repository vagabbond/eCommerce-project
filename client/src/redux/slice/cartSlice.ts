import { createSlice } from "@reduxjs/toolkit";
import { calculatePrice } from "../utils/cartUtils";

interface IReviews {
 user: string;
 name: string;
 rating: number;
 comment: string;
}
export interface ICartItem {
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
 shippingAddress: {
  address: string;
  city: string;
  postalCode: string;
  country: string;
 };
 paymentMethod: string;
 itemsPrice: number;
 shippingPrice: number;
 taxPrice: number;
 totalPrice: number;
}

const cart = localStorage.getItem("cart");
const initialState: IInitialState = cart
 ? JSON.parse(cart)
 : {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: "Paypal",
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
  saveShippingAddress: (state, action) => {
   state.shippingAddress = action.payload;
   calculatePrice(state);
   localStorage.setItem("cart", JSON.stringify(state));
  },
  savePayment: (state, action) => {
   state.paymentMethod = action.payload;
   calculatePrice(state);
   localStorage.setItem("cart", JSON.stringify(state));
  },
  clearCartItems: (state) => {
   state.cartItems = [];
   calculatePrice(state);
   localStorage.setItem("cart", JSON.stringify(state));
  },
 },
});

export const {
 addToCart,
 removeFromCart,
 saveShippingAddress,
 savePayment,
 clearCartItems,
} = cartSlice.actions;
export default cartSlice.reducer;
