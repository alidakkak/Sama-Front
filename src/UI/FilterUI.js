import { Box, Stack } from "@mui/material";
import React from "react";
import { ThemeColor } from "../Assets/Theme/Theme";
import { LuSettings2 } from "react-icons/lu";

const FilterUI = ({ children }) => {
  return (
    <Stack
      sx={{ borderRadius: "5px", overflow: "hidden" }}
      direction={"row"}
      alignItems={"cneter"}
      py={"0.3rem"}
    >
      {children}
      <Box
        sx={{
          background: ThemeColor.main,
          padding: "0.5rem 1rem",
          color: "#fff",
          borderRadius: "7px",
        }}
      >
        <LuSettings2 style={{ bottom: "-4px", position: "relative" }} />
      </Box>
    </Stack>
  );
};

export default FilterUI;
