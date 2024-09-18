import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  message: "",
  type: "",
};

const AlertSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    openAlert: (state, { payload }) => {
      if (state.open == false) {
        state.open = true;
        state.message = payload.message;
        state.type = payload.type;
      }
    },
    closeAlert: (state) => {
      state.open = false;
    },
  },
});

export const { closeAlert, openAlert } = AlertSlice.actions;

export default AlertSlice;
