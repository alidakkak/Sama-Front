import { Box, Stack } from "@mui/material";
import React from "react";
import { ThemeColor } from "../Assets/Theme/Theme";

const CategoryFilter = ({ filter, setFilter, data }) => {
  return (
    <Stack
      sx={{
        background: "#fff",
        borderRadius: "5px",
        textAlign: "center",
        borderRadius: "5px",
        textAlign: "center",
        boxShadow: ThemeColor.boxShadow,
        padding: "0.5rem",
      }}
      direction={"row"}
      gap="1rem"
    >
      {data?.map((item, i) => {
        return (
          <Box
            key={item?.id}
            sx={{
              padding: "0.5rem 1rem",
              cursor: "pointer",
              transition: "0.3s",
              borderRadius: "5px",
              color: filter?.id == item?.id ? "#fff" : "#333",
              background:
                filter?.id == item?.id
                  ? ThemeColor.secondary
                  : ThemeColor.background,
              "&:hover": {
                background:
                  filter?.id == item?.id ? ThemeColor.secondary : "#ddd",
              },
            }}
            onClick={() => {
              setFilter(item);
            }}
          >
            {item?.name}
          </Box>
        );
      })}
    </Stack>
  );
};

export default CategoryFilter;
