import { PRODUCTS_URL, UPLOAD_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
 endpoints: (builder) => ({
  getProducts: builder.query({
   query: ({ keyword, pageNumber }) => ({
    url: PRODUCTS_URL,
    method: "GET",
    params: { keyword, pageNumber },
   }),
   providesTags: ["Product"],
   keepUnusedDataFor: 5,
  }),
  getProductDetails: builder.query({
   query: (productId) => ({
    url: `${PRODUCTS_URL}/${productId}`,
   }),
   keepUnusedDataFor: 5,
  }),
  createProduct: builder.mutation({
   query: () => ({
    url: PRODUCTS_URL,
    method: "POST",
    credentials: "include",
    headers: {
     "Content-Type": "application/json",
    },
   }),
   invalidatesTags: ["Product"],
  }),
  updateProduct: builder.mutation({
   query: ({ productId, product }) => ({
    url: `${PRODUCTS_URL}/${productId}`,
    method: "PUT",
    credentials: "include",
    headers: {
     "Content-Type": "application/json",
    },
    body: product,
   }),
   invalidatesTags: ["Product"],
  }),
  uploadImage: builder.mutation({
   query: (data) => ({
    url: `${UPLOAD_URL}`,
    method: "POST",
    credentials: "include",
    body: data,
   }),
  }),
  deleteProduct: builder.mutation({
   query: ({ productId }) => ({
    url: `${PRODUCTS_URL}/${productId}`,
    method: "DELETE",
    credentials: "include",
   }),
   invalidatesTags: ["Product"],
  }),
  createProductReview: builder.mutation({
   query: ({ productId, review }) => ({
    url: `${PRODUCTS_URL}/${productId}/reviews`,
    method: "POST",
    credentials: "include",
    headers: {
     "Content-Type": "application/json",
    },
    body: review,
   }),
   invalidatesTags: ["Product"],
  }),
  getTopProducts: builder.query({
   query: () => ({
    url: `${PRODUCTS_URL}/top`,
    method: "GET",
   }),
   keepUnusedDataFor: 5,
  }),
 }),
});

export const {
 useGetProductsQuery,
 useGetProductDetailsQuery,
 useCreateProductMutation,
 useUpdateProductMutation,
 useUploadImageMutation,
 useDeleteProductMutation,
 useCreateProductReviewMutation,
 useGetTopProductsQuery,
} = productsApiSlice;
