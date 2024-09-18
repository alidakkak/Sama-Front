import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeAlert } from "../Redux/Slices/AlertSlice";

const GlobalAlert = () => {
  const { open, type, message } = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  // variant could be success, error, warning, info, or default
  return (
    <Snackbar
      open={open}
      onClose={() => {
        dispatch(closeAlert());
        console.log("clicked");
      }}
      autoHideDuration={6000}
    >
      <Alert
        onClose={() => {
          dispatch(closeAlert());
          console.log("clicked");
        }}
        severity={type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalAlert;
