import { Box } from "@mui/material";
import React from "react";
import { ThemeColor } from "../Assets/Theme/Theme";

const ChunkLayout = ({ children }) => {
  return (
    <Box
      sx={{
        background: "#fff",
        padding: "1rem 1.5rem",
        borderRadius: "10px",
        boxShadow: ThemeColor.boxShadow,
        margin: "0.5rem 0",
        transition: "0.3s ease-in-out",
        "&:hover": {
          boxShadow:
            "rgba(241, 143, 1, 0.3) 0px 8px 16px -2px, rgba(241, 143, 1, 0.2) 0px 4px 8px -2px",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default ChunkLayout;
