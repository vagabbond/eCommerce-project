import { USER_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

export const userSlice = apiSlice.injectEndpoints({
 endpoints: (builder) => ({
  login: builder.mutation({
   query: (credentials) => ({
    url: `${USER_URL}/login`,
    method: "POST",
    body: credentials,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
   }),
  }),
  logout: builder.mutation({
   query: (credentials) => ({
    url: `${USER_URL}/logout`,
    method: "POST",
    body: credentials,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
   }),
  }),
  register: builder.mutation({
   query: (credentials) => ({
    url: `${USER_URL}/register `,
    method: "POST",
    body: credentials,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
   }),
  }),
  profile: builder.mutation({
   query: (data) => ({
    url: `${USER_URL}/profile`,
    method: "PUT",
    body: data,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
   }),
  }),
  getAllUsers: builder.query({
   query: ({ pageNumber }) => ({
    url: `${USER_URL}`,
    params: { page: pageNumber },
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
   }),
   providesTags: ["User"],
   keepUnusedDataFor: 5,
  }),
  getUserById: builder.query({
   query: (userId) => ({
    url: `${USER_URL}/${userId}`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
   }),
   keepUnusedDataFor: 5,
  }),
  deleteUser: builder.mutation({
   query: (userId) => ({
    url: `${USER_URL}/${userId}`,
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
   }),
   invalidatesTags: ["User"],
  }),
  updateUser: builder.mutation({
   query: ({ userId, data }) => ({
    url: `${USER_URL}/${userId}`,
    method: "PUT",
    body: data,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
   }),
   invalidatesTags: ["User"],
  }),
 }),
});

export const {
 useLoginMutation,
 useLogoutMutation,
 useRegisterMutation,
 useProfileMutation,
 useGetAllUsersQuery,
 useGetUserByIdQuery,
 useDeleteUserMutation,
 useUpdateUserMutation,
} = userSlice;
