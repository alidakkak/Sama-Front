import { Box, Typography } from "@mui/material";
import React from "react";
import { ThemeColor } from "../Assets/Theme/Theme";

const PopupLayout = ({ children, closePopup, title }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        width: "100%",
        height: "100vh",
        background: "#333333a1",
        zIndex: "1100",
        boxShadow: ThemeColor.boxShadow,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          if (closePopup) closePopup();
        }
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          background: "#fff",
          width: { sm: "450px", xs: "250px" },
          opacity: "1",

          borderRadius: "5px",
        }}
      >
        <Typography
          variant="title"
          sx={{
            textTransform: "capitalize",
            fontSize: "1rem",

            color: "#fff",
            fontWeight: "bold",
            textAlign: "right",
            background: ThemeColor.main,
            padding: "0.5rem",
            textAlign: "center",
            borderRadius: "5px 5px 0 0 ",
          }}
        >
          {title}
        </Typography>
        <Box sx={{ padding: "1rem" }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default PopupLayout;
