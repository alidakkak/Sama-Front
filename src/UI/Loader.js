import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { ThemeColor } from "../Assets/Theme/Theme";

const Loader = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", margin: "2rem" }}>
      <CircularProgress sx={{ color: ThemeColor.main, margin: "0 auto" }} />
    </Box>
  );
};

export default Loader;
