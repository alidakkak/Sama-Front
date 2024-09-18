import { configureStore } from "@reduxjs/toolkit";
import SidebarSlice from "./Slices/SidebarSlice";
import YearSlice from "./Slices/YearSlice";
import { AuthAPI } from "./Api/AuthAPI";
import { PackageApi } from "./Api/PackageApi";
import AlertSlice from "./Slices/AlertSlice";
import { StudentApi } from "./Api/StudentApi";
import { TeacherApi } from "./Api/TeachersApi";
import { MarksApi } from "./Api/MarksApi";
import { ExpensesApi } from "./Api/ExpensesApi";
import { StatsApi } from "./Api/StatsApi";

const store = configureStore({
  reducer: {
    sidebar: SidebarSlice.reducer,
    yearName: YearSlice.reducer,
    alert: AlertSlice.reducer,
    [AuthAPI.reducerPath]: AuthAPI.reducer,
    [ExpensesApi.reducerPath]: ExpensesApi.reducer,
    [PackageApi.reducerPath]: PackageApi.reducer,
    [MarksApi.reducerPath]: MarksApi.reducer,
    [StudentApi.reducerPath]: StudentApi.reducer,
    [TeacherApi.reducerPath]: TeacherApi.reducer,
    [StatsApi.reducerPath]: StatsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      AuthAPI.middleware,
      ExpensesApi.middleware,
      PackageApi.middleware,
      MarksApi.middleware,
      StudentApi.middleware,
      TeacherApi.middleware,
      StatsApi.middleware
    ),
});

export default store;
