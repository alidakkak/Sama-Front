import { Box } from "@mui/material";
import React from "react";
import { ThemeColor } from "../Assets/Theme/Theme";

const AddingBox = (props) => {
  return (
    <Box
      sx={{
        padding: "1.5rem 1.5rem",
        border: "dashed 2px",
        borderColor: ThemeColor.main,
        fontWeight: "bold",
        cursor: "pointer",
        background: "#fff",
      }}
      {...props}
    >
      {props.children}
    </Box>
  );
};

export default AddingBox;
