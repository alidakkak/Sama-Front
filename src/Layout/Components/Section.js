import { Box } from "@mui/material";
import React, { memo } from "react";
import { ThemeColor } from "../../Assets/Theme/Theme";
import { Outlet } from "react-router-dom";

const Section = () => {
  return (
    <Box
      sx={{
        padding: "0.5rem 1rem",
        margin: "0 auto",

        borderRadius: "15px",
        background: ThemeColor.background,
        width: "100%",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <Outlet />
    </Box>
  );
};

export default memo(Section);
