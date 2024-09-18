import { Box } from "@mui/material";
import React from "react";
import { ThemeColor } from "../Assets/Theme/Theme";

const GradientBox = ({ children }) => {
  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #EDECF2, #fefefe)",
        padding: "0.5rem 1rem",
        borderRadius: "10px",
        boxShadow: ThemeColor.boxShadow,
        transition: "0.4s",
        "&:hover": {
          background: `linear-gradient(180deg, ${ThemeColor.background}, #fefefe)`,
        },
      }}
    > 
      {children}
    </Box>
  );
};

export default GradientBox;
