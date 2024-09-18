import React from "react";
import { ThemeColor } from "../../../Assets/Theme/Theme";
import { Box, Typography } from "@mui/material";

const StudentBox = ({ date, name, num_of_courses }) => {
  return (
    <Box
      sx={{
        padding: "0.5rem",
        background: "#fff",
        width: "150px",
        border: "1px solid",
        borderColor: ThemeColor.main,
        borderRadius: "3px",
        textAlign: "right",
        position: "relative",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontWeight: "bold",
            color: ThemeColor.main,
            position: "relative",
            paddingBottom: ".2rem",
            marginBottom: ".4rem",
          }}
        >
          <div className="studentBar"></div>
          {name}
        </Typography>
        <Typography fontSize={"0.7rem"}>
          تاريخ الاضافة{" "}
          <span style={{ color: ThemeColor.main, fontWeight: "bold" }}>
            {date}
          </span>
        </Typography>
        <Typography
          fontSize={"0.7rem"}
          color={"gray"}
          mt={"0.2rem"}
          textAlign={"left"}
        >
          {" "}
          مواد {num_of_courses}
        </Typography>
      </Box>
    </Box>
  );
};

export default StudentBox;
