import {
 createApi,
 fetchBaseQuery,
 FetchArgs,
 BaseQueryApi,
} from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants";

import { logout } from "./authSlice";

const baseQuery = fetchBaseQuery({
 baseUrl: BASE_URL,
});

const baseQueryWithAuth = async (
 args: string | FetchArgs,
 api: BaseQueryApi,
 extra: object
) => {
 const result = await baseQuery(args, api, extra);
 if (result.error && result.error.status === 401) {
  api.dispatch(logout());
 }
 return result;
};

export const apiSlice = createApi({
 baseQuery: baseQueryWithAuth,
 tagTypes: ["Product", "Order", "User"],
 endpoints: (builder) => ({}),
});
