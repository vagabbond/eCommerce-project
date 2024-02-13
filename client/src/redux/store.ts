import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { apiSlice } from "./slice/apiSlice";
import authSliceReducer from "./slice/authSlice";
import cartSliceReducer from "./slice/cartSlice";

const store = configureStore({
 reducer: {
  [apiSlice.reducerPath]: apiSlice.reducer,
  cart: cartSliceReducer,
  auth: authSliceReducer,
 },
 middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(apiSlice.middleware),
 devTools: true,
});
type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
