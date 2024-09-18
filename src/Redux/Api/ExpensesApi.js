import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../Assets/data/BaseURL.js";

export const ExpensesApi = createApi({
  reducerPath: "ExpensesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      headers.append("Accept", "application/json");

      if (localStorage.getItem("token")) {
        headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      }
    },
  }),
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: () => ({
        url: "/generalExpenses",
      }),
    }),

    addExpense: builder.mutation({
      query: (data) => {
        return {
          url: "/generalExpenses",
          method: "POST",
          body: data,
        };
      },
    }),

    editExpense: builder.mutation({
      query: (data) => {
        return {
          url: `generalExpenses/${data?.id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),

    getExpense: builder.query({
      query: (id) => ({
        url: `/generalExpenses/${id}`,
        method: "GET",
      }),
    }),

    deleteExpens: builder.mutation({
      query: (id) => {
        return {
          url: `generalExpenses/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useAddExpenseMutation,
  useEditExpenseMutation,
  useDeleteExpensMutation,
  useGetExpenseQuery,
} = ExpensesApi;
