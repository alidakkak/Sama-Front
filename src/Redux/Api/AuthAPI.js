import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../Assets/data/BaseURL.js";

export const AuthAPI = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Add the Accept header
      headers.append("Accept", "application/json");
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: (credentials) => ({
        url: "logout",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
        body: {},
      }),
    }),
    changPasswrod: builder.mutation({
      query: (credentials) => ({
        url: "admin/update",
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
        body: credentials,
      }),
    }),

    testApi: builder.mutation({
      query: () => ({
        url: "/attendances",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useChangPasswrodMutation,
  useTestApiMutation,
} = AuthAPI;
