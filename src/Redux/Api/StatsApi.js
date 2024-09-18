import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../Assets/data/BaseURL.js";

export const StatsApi = createApi({
  reducerPath: "statsApi",
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
    getGeneralStats: builder.query({
      query: () => ({
        url: "/getStatisticGeneral",
      }),
    }),
    getFinanciallStats: builder.query({
      query: () => ({
        url: "/financialResults",
      }),
    }),
  }),
});

export const { useGetGeneralStatsQuery, useGetFinanciallStatsQuery } = StatsApi;
