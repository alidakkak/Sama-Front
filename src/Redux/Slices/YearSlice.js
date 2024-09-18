import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentYearName: localStorage.getItem("yearName")
    ? localStorage.getItem("yearName")
    : "",
};

const YearSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setYearName: (state, { payload }) => {
      state.currentYearName = payload;
    },
  },
});

export const { setYearName } = YearSlice.actions;

export default YearSlice;
