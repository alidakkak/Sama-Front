import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: true,
  width: 192,
};

const SidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.open = !state.open;
    },
    minMaxSideBar: (state) => {
      if (state.width == 192) state.width = 50;
      else {
        state.width = 192;
      }
    },
  },
});

export const { toggleSidebar, minMaxSideBar } = SidebarSlice.actions;

export default SidebarSlice;
