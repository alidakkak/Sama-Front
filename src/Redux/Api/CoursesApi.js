import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../Assets/data/BaseURL.js";

export const CoursesApi = createApi({
  reducerPath: "CourseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      headers.append("Accept", "application/json");
      console.log(getState);
      if (localStorage.getItem("token")) {
        headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      }
    },
  }),
  endpoints: (builder) => ({
    getCourse: builder.query({
      query: (id) => ({
        url: "/subjects",
      }),
    }),

    addCourse: builder.mutation({
      query: (data) => {
        return {
          url: "/subjects",
          method: "POST",
          body: data,
        };
      },
    }),

    editCourse: builder.mutation({
      query: (data) => {
        return {
          url: `subjects/${data.id}`,
          method: "PATCH",
          body: data,
        };
      },
      // invalidatesTags: (result, error, arg) => [
      //   { type: "courseDetails", id: arg.id },
      // ],
    }),
  }),
});

export const {
  useGetCourseQuery,
  useAddCourseMutation,
  useEditCourseMutation,
} = CoursesApi;
