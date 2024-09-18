import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../Assets/data/BaseURL.js";

export const TeacherApi = createApi({
  reducerPath: "TeacherApi",
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
    getTeachers: builder.query({
      query: (id) => ({
        url: "/teachers",
      }),
    }),

    getActiveTeachers: builder.query({
      query: () => ({
        url: "/teacherActive",
      }),
    }),

    getTeacher: builder.query({
      query: (id) => ({
        url: "/teachers/" + id,
      }),
    }),

    addTeacher: builder.mutation({
      query: (data) => {
        return {
          url: "/teachers",
          method: "POST",
          body: data,
        };
      },
    }),

    editTeacher: builder.mutation({
      query: (data) => {
        return {
          url: `teachers/${data?.id}`,
          method: "PATCH",
          body: data,
        };
      },
      // invalidatesTags: (result, error, arg) => [
      //   { type: "courseDetails", id: arg.id },
      // ],
    }),

    getTeacherPayment: builder.query({
      query: (id) => ({
        url: "/teacherSalary/" + id,
      }),
      providesTags: (result, error, arg) => [
        { id: arg, type: "teacherPayment" },
      ],
    }),

    addTeacherPayment: builder.mutation({
      query: (data) => ({
        url: "/teacherSalary",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ id: arg.teacher_id, type: "teacherPayment" }];
      },
    }),

    toggleState: builder.mutation({
      query: (id) => ({
        url: "/switchStatus/" + id,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetTeachersQuery,
  useGetTeacherQuery,
  useAddTeacherMutation,
  useEditTeacherMutation,
  useGetTeacherPaymentQuery,
  useAddTeacherPaymentMutation,
  useGetActiveTeachersQuery,
  useToggleStateMutation,
} = TeacherApi;
