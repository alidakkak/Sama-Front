import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../Assets/data/BaseURL.js";

export const MarksApi = createApi({
  reducerPath: "MarksApi",
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
    getStudents: builder.query({
      query: (data) => {
        return {
          url: `/showStudent?semester_id=${data.semester_id}&subject_id=${data.subject_id}&exam_id=${data.exam_id}`,
        };
      },
    }),

    addMarks: builder.mutation({
      query: (data) => {
        return {
          url: "/marks",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: (result, error, arg) => {
        const array = arg.student_id.map((item) => {
          
          return { type: "studentDetails", id: item };
        });
        return array;
      },
    }),

    // editMarks: builder.mutation({
    //   query: (data) => {
    //     return {
    //       url: `marks/${data?.id}`,
    //       method: "PATCH",
    //       body: data,
    //     };
    //   },
    //   // invalidatesTags: (result, error, arg) => [
    //   //   { type: "courseDetails", id: arg.id },
    //   // ],
    // }),
  }),
});

export const {
  useGetStudentsQuery,
  useAddMarksMutation,
  useEditMarksMutation,
} = MarksApi;
