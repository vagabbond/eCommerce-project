import { IInitialState } from "../slice/cartSlice";

export const calculatePrice = (state: IInitialState) => {
 state.itemsPrice =
  Math.round(
   state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0) * 100
  ) / 100;
 state.shippingPrice = Math.round(state.itemsPrice > 100 ? 0 : 10 * 100) / 100;
 state.taxPrice = Math.round(state.itemsPrice * 0.15 * 100) / 100;
 state.totalPrice = state.shippingPrice + state.itemsPrice + state.taxPrice;

 return state;
};
