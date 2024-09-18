import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";
import ListIcon from "@mui/icons-material/List";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../Redux/Slices/SidebarSlice";
import { ThemeColor } from "../Assets/Theme/Theme";

import SearchBar from "./SearchBar";

const Header = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { open } = useSelector((state) => state.sidebar);

  return (
    <Box
      sx={{
        width: "100%",
        position: "sticky",
        top: "0",
        background: ThemeColor.background,
        padding: "2rem",
        paddingBottom: "1.5rem",
        paddingRight: "14px",
        zIndex: "1000",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={"1rem"}
          sx={{
            width: "100%",
          }}
        >
          {/* <SearchBar /> */}
          <Box
            sx={{
              display: {
                sm: "none",
                xs: "block",
              },
            }}
          >
            <ListIcon
              sx={{
                color: "#333",
                fontSize: "2rem",
                cursor: "pointer",
              }}
              onClick={() => {
                dispatch(toggleSidebar(!open));
              }}
            />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
