import { Box } from "@mui/material";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ThemeColor } from "../Assets/Theme/Theme";

const PrivateRoutes = () => {
  let auth = { token: true };
  return auth.token ? (
    <Box
      sx={{
        background: ThemeColor.background,
        minHeight: "100vh",
      }}
    >
      <Outlet />
    </Box>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default PrivateRoutes;
