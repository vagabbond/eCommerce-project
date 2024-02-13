import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../../constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
 endpoints: (builder) => ({
  createOrder: builder.mutation({
   query: (order) => ({
    url: ORDERS_URL,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: { ...order },
    credentials: "include",
   }),
  }),
  getOrderById: builder.query({
   query: (orderId) => ({
    url: `${ORDERS_URL}/${orderId}`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
   }),
   keepUnusedDataFor: 5,
  }),
  payOrder: builder.mutation({
   query: ({ orderId, details }) => ({
    url: `${ORDERS_URL}/${orderId}/pay`,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: { ...details },
    credentials: "include",
   }),
  }),
  getPayPalClientId: builder.query({
   query: () => ({
    url: PAYPAL_URL,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
   }),
   keepUnusedDataFor: 5,
  }),
  getUserOrders: builder.query({
   query: () => ({
    url: `${ORDERS_URL}/mine`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
   }),
   keepUnusedDataFor: 5,
  }),
  getAllOrders: builder.query({
   query: ({ pageNumber }) => ({
    headers: { "Content-Type": "application/json" },
    params: { pageNumber },
    credentials: "include",
    url: ORDERS_URL,
    method: "GET",
   }),
   keepUnusedDataFor: 5,
  }),
  deliverOrder: builder.mutation({
   query: (orderId) => ({
    url: `${ORDERS_URL}/${orderId}/deliver`,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
   }),
  }),
 }),
});

export const {
 useCreateOrderMutation,
 useGetOrderByIdQuery,
 usePayOrderMutation,
 useGetPayPalClientIdQuery,
 useGetUserOrdersQuery,
 useGetAllOrdersQuery,
 useDeliverOrderMutation,
} = ordersApiSlice;
