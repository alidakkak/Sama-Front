import { Box } from "@mui/material";
import React from "react";
import Background from "../../../Assets/images/background2.png";

const BackgroundImage = ({ children }) => {
  return (
    <Box
      sx={{
        position: "relative",
        top: "-0px",
        left: "-0",
        zIndex: "0",
        width: "100%",
      }}
    >
      <img width={"100%"} src={Background} />
      {children}
    </Box>
  );
};

export default BackgroundImage;
