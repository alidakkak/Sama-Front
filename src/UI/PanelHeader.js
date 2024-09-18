import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { ThemeColor } from "../Assets/Theme/Theme";
import { Link } from "react-router-dom";

const PanelHeader = ({ title, buttonContent, to, center }) => {
  return (
    <Box
      sx={{
        padding: "0.5rem 1rem",
        background: ThemeColor.main,
        borderRadius: "10px",
        margin: "0.4rem auto 1rem",
        zIndex: "10",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={center ? "center" : "space-between"}
        alignItems={"center"}
      >
        <Typography
          sx={{ color: "#fff", fontWeight: "bold", fontSize: "1.5rem" }}
        >
          {title}
        </Typography>
        {buttonContent ? (
          <Link to={to} className="mainButton">
            {buttonContent}
          </Link>
        ) : (
          <div></div>
        )}
      </Stack>
    </Box>
  );
};

export default PanelHeader;
