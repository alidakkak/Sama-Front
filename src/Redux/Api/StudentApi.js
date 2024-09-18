import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../Assets/data/BaseURL.js";

export const StudentApi = createApi({
  reducerPath: "Students",
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
      query: () => ({
        url: "/students",
      }),
      providesTags: (result, error, arg) => [
        { id: arg, type: "studentDetails" },
      ],
    }),
    getStudent: builder.query({
      query: (id) => ({
        url: "/students/" + id,
      }),
      providesTags: (result, error, arg) => [
        { id: arg, type: "studentDetails" },
      ],
    }),
    searchStudent: builder.query({
      query: (qu) => ({
        url: "/searchStudents?search=" + qu,
      }),
    }),

    addStudent: builder.mutation({
      query: (student) => {
        return {
          url: "/students",
          method: "POST",
          body: student,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "studentDetails", id: arg.first_name },
      ],
    }),

    editStudent: builder.mutation({
      query: (student) => {
        return {
          url: `students/${student.get("id")}`,
          method: "POST",
          body: student,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "studentDetails", id: arg.id },
      ],
    }),

    addCheckToStudent: builder.mutation({
      query: (check) => {
        return {
          url: "/studentPayment",
          method: "POST",
          body: check,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "studentDetails", id: arg.student_id },
      ],
    }),

    editCheckToStudent: builder.mutation({
      query: (check) => {
        return {
          url: "/studentPayment/" + check.payment_id,
          method: "PATCH",
          body: check,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "studentDetails", id: arg.student_id },
      ],
    }),

    addExtraCheckToStudent: builder.mutation({
      query: (check) => {
        return {
          url: "/extraCharges",
          method: "POST",
          body: check,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "studentDetails", id: arg.student_id },
      ],
    }),

    addNoteToStudent: builder.mutation({
      query: (data) => {
        return {
          url: "/notes",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "studentDetails", id: arg.student_id },
      ],
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

    editMarks: builder.mutation({
      query: (data) => {
        return {
          url: "/marks/" + data.mark_id,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: (result, error, arg) => {
        return [{ type: "studentDetails", id: arg.student_id }];
      },
    }),

    addSpecialDiscount: builder.mutation({
      query: (data) => {
        return {
          url: "/specialDiscount",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: (result, error, arg) => {
        return [{ type: "studentDetails", id: arg.student }];
      },
    }),

    withdraw: builder.mutation({
      query: (data) => {
        return {
          url: "/withdrawalFromTheCourse",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: (result, error, arg) => {
        console.log(arg.student);
        return [{ type: "studentDetails", id: arg.student }];
      },
    }),

    resetPassword: builder.mutation({
      query: (id) => {
        return {
          url: "/regeneratePassword/" + id,
          method: "PATCH",
        };
      },
    }),

    updateRegistration: builder.mutation({
      query: (data) => {
        return {
          url: "/registrations/" + data.id,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "studentDetails", id: arg.student_id },
      ],
    }),

    getStudentPreseces: builder.query({
      query: (id) => ({
        url: "/getAttendance/" + id,
      }),
    }),

    delteExtraCharge: builder.mutation({
      query: (data) => {
        return {
          url: "/extraCharges/" + data.extra_id,
          method: "DELETE",
          body: data,
        };
      },
      invalidatesTags: (result, error, arg) => {
        return [{ type: "studentDetails", id: arg.student_id }];
      },
    }),
  }),
});

export const {
  useAddStudentMutation,
  useGetStudentsQuery,
  useEditStudentMutation,
  useGetStudentQuery,
  useSearchStudentQuery,
  useAddCheckToStudentMutation,
  useAddExtraCheckToStudentMutation,
  useAddNoteToStudentMutation,
  useAddMarksMutation,
  useAddSpecialDiscountMutation,
  useWithdrawMutation,
  useUpdateRegistrationMutation,
  useResetPasswordMutation,
  useGetStudentPresecesQuery,
  useEditCheckToStudentMutation,
  useEditMarksMutation,
  useDelteExtraChargeMutation,
} = StudentApi;
