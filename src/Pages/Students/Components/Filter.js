import { Box, Stack } from "@mui/material";
import React from "react";
import { ThemeColor } from "../../../Assets/Theme/Theme";

const Filter = ({ setFilterHndler, filter, filters }) => {
  return (
    <Stack
      gap="0.75rem"
      justifyContent="flex-start"
      direction={{ md: "row" }} // For RTL, you can switch to "row"
      padding="0.5rem"
      sx={{
        background: ThemeColor.background,
        borderRadius: "12px",
        marginTop: "10px",
        overflowX: "auto",
        overflowY: "hidden",
      }}
    >
      {filters?.map((item, i) => {
        const isSelected = item === filter;
        return (
          <Box
            key={i}
            onClick={() => setFilterHndler(item)}
            sx={{
              cursor: "pointer",
              padding: "0.5rem 1rem",
              borderRadius: "25px",
              textAlign: "center",
              color: isSelected ? "#fff" : ThemeColor.main,
              background: isSelected
                ? ThemeColor.secondary
                : ThemeColor.background,
              border: `1px solid ${
                isSelected ? ThemeColor.secondary : ThemeColor.main
              }`,
              transition: "all 0.3s ease",
              boxShadow: isSelected ? `0 4px 8px rgba(0, 0, 0, 0.1)` : "none",
              "&:hover": {
                background: ThemeColor.secondary,
                color: "#fff",
                borderColor: ThemeColor.secondary,
                transform: "scale(1.05)",
              },
              whiteSpace: "nowrap",
            }}
          >
            {item}
          </Box>
        );
      })}
    </Stack>
  );
};

export default Filter;
