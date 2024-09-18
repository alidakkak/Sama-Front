import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Logo from "../Assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { ThemeColor } from "../Assets/Theme/Theme";
import { links } from "../Assets/data/Links";
import { HiArrowCircleRight } from "react-icons/hi";
import { minMaxSideBar } from "../Redux/Slices/SidebarSlice";

const SideBar = () => {
  const location = useLocation();
  const path = location.pathname.split("/").pop();
  const { open, width } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: width,
        transition: "0.3s ease-in-out",
        position: "fixed",
        right: open ? "0" : "-192px",
        zIndex: "1001",
        top: "5%",
      }}
    >
      <Box
        sx={{
          background: ThemeColor.main,
          borderRadius: "70px 0 0  70px",
          minHeight: "90vh",
          boxShadow: ThemeColor.boxShadow,
          overflow: "hidden",
          position: "relateive",
        }}
      >
        <HiArrowCircleRight
          style={{
            position: "absolute",
            color: ThemeColor.secondary,
            top: "80%",
            fontSize: "1.5rem",
            left: "-0.75rem",
            background: ThemeColor.background,
            borderRadius: "50%",
            cursor: "pointer",
            transition: "0.3s",
            transform: width == 50 ? "rotate(180deg)" : "",
          }}
          onClick={() => {
            dispatch(minMaxSideBar());
          }}
        />
        <Stack
          sx={{
            padding: "4rem 0 0rem 0",

            height: "100%",
          }}
          gap={"0.5rem"}
        >
          {links.map((item, i) => {
            return (
              <Typography
                key={i}
                sx={{
                  textTransform: "capitalize",
                  cursor: "pointer",
                  padding: "0.5rem 1rem",
                  width: "fit-content",
                  fontWeight: "600",
                  width: "100%",
                  position: "relative",
                  color: path === item.slag ? "#fff" : "#adc2d3",
                  whiteSpace: "nowrap",
                }}
              >
                <Link
                  to={`${item.slag}`}
                  style={{
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <Stack
                    direction={"row"}
                    gap={"1rem"}
                    sx={{ position: "relative" }}
                    alignItems={"center"}
                  >
                    <Box>{item.icon}</Box>
                    <Box>{item.name}</Box>
                  </Stack>
                </Link>
                {
                  <div
                    className={
                      path === item.slag
                        ? " bar activeBar"
                        : " bar disactiveBar"
                    }
                  ></div>
                }
              </Typography>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
};

export default SideBar;
