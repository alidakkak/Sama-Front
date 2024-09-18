import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../Assets/data/BaseURL.js";

export const PackageApi = createApi({
  reducerPath: "semesters",
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
    getPackage: builder.query({
      query: () => ({
        url: "/semesters",
      }),
    }),
    getPackageDetails: builder.query({
      query: (id) => ({
        url: `/semesters/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => {
        return [{ id: arg, type: "semesters" }];
      },
    }),

    addPackage: builder.mutation({
      query: (data) => {
        return {
          url: "/semesters",
          method: "POST",
          body: data,
        };
      },
    }),

    editPackage: builder.mutation({
      query: (data) => {
        return {
          url: `semesters/${data.id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: (result, error, arg) => {
        return [{ type: "semesters", id: arg.id }];
      },
    }),
    addClassroom: builder.mutation({
      query: (data) => {
        return {
          url: `classrooms`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "semesters", id: arg.semester_id },
      ],
    }),

    editClassroom: builder.mutation({
      query: (data) => {
        return {
          url: `classrooms/` + data.id,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "semesters", id: arg.semester_id },
      ],
    }),

    getClassroomInfo: builder.query({
      query: (id) => {
        return {
          url: `classrooms/${id}`,
          method: "GET",
        };
      },
      providesTags: (result, error, arg) => [
        { id: arg, type: "classroomInfo" },
      ],
    }),
    addTeacherToSubjectInfo: builder.mutation({
      query: (data) => {
        return {
          url: `addTeacher`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: (result, error, args) => [
        { type: "classroomInfo", id: args.classroom_id },
      ],
    }),
    getPackageSubjects: builder.query({
      query: (id) => {
        return {
          url: `classrooms/${id}`,
          method: "GET",
        };
      },
      providesTags: (result, error, arg) => [
        { id: arg, type: "classroomInfo" },
      ],
    }),
    calcStudentCheck: builder.mutation({
      query: (data) => {
        return {
          url: `calculateCoursePrice`,
          method: "POST",
          body: data,
        };
      },
    }),
    registerStudentInPackage: builder.mutation({
      query: (data) => {
        return {
          url: `registrations`,
          method: "POST",
          body: data,
        };
      },
    }),
    quickRegistration: builder.mutation({
      query: (data) => {
        return {
          url: `quickRegistration`,
          method: "POST",
          body: data,
        };
      },
    }),
    addExamToPackage: builder.mutation({
      query: (data) => {
        return {
          url: `exams`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: (result, error, args) => [
        { type: "semesters", id: args.semester_id },
      ],
    }),

    EditExamToPackage: builder.mutation({
      query: (data) => {
        return {
          url: `exams/${data.exam_id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: (result, error, args) => [
        { type: "semesters", id: args.semester_id },
      ],
    }),

    getPackageStudents: builder.query({
      query: (id) => ({
        url: `/getStudentAndSubjectBySemesterID/${id}`,
        method: "GET",
      }),
    }),

    addDiscount: builder.mutation({
      query: (data) => {
        return {
          url: "/scholarships",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: (result, error, arg) => {
        let id = arg.semester_id;

        return [{ type: "semesters", id: id }];
      },
    }),
  }),
});

export const {
  useGetPackageQuery,
  useAddPackageMutation,
  useEditPackageMutation,
  useGetPackageDetailsQuery,
  useAddClassroomMutation,
  useGetClassroomInfoQuery,
  useAddTeacherToSubjectInfoMutation,
  useCalcStudentCheckMutation,
  useRegisterStudentInPackageMutation,
  useAddExamToPackageMutation,
  useGetPackageStudentsQuery,
  useAddDiscountMutation,
  useEditClassroomMutation,
  useQuickRegistrationMutation,
  useEditExamToPackageMutation,
} = PackageApi;
