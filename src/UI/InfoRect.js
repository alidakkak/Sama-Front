import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { ThemeColor } from "../Assets/Theme/Theme";
import { CiEdit } from "react-icons/ci";
const InfoRect = ({ data, children, setField }) => {
  return (
    <Grid
      container
      spacing={"10px"}
      sx={{
        width: "100%",
        margin: "1rem auto",
        transform: "translateY(-0%)",
        borderRadius: "10px",
        textAlign: "center",

        paddingTop: "0",
      }}
    >
      {data.map((item, i) => {
        return (
          <Grid
            item
            onClick={() => {
              setField(item.label, item.value, item.name);
            }}
            key={i}
            md={12 / data.length}
            sm={6}
            xs={12}
          >
            <Box
              sx={{
                position: "relative",
                boxShadow: ThemeColor.boxShadow,
                borderRadius: "10px",
                transition: "0.3s",
                padding: "10px 20px",
                postion: "relative",
                background: "#fff",
                cursor: "pointer",
                "&:hover": {
                  background: "#eee",
                  "& .edit": {
                    opacity: "1",
                  },
                },
              }}
            >
              <Box
                className={"edit"}
                sx={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%,-50%)",
                  cursor: "pointer",
                  color: ThemeColor.secondary,
                  transition: "0.3s",
                  opacity: "0",
                }}
              >
                <CiEdit style={{ fontSize: "1.8rem" }} />
              </Box>
              <Typography fontSize={"0.8rem"}>{item.label}</Typography>
              <Typography
                color={ThemeColor.main}
                mt={"0.3rem"}
                fontSize={"0.9rem"}
                fontWeight={"bold"}
              >
                {item.value == null ? "-" : item.value}
              </Typography>
            </Box>
          </Grid>
        );
      })}
      {children}
    </Grid>
  );
};

export default InfoRect;
