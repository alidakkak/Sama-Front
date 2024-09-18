import { Box, Typography } from "@mui/material";
import React from "react";
import { ThemeColor } from "../../../Assets/Theme/Theme";
import CancelIcon from "@mui/icons-material/Cancel";
const CourseBox = ({ count, name, removeCourse, id }) => {
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
      <Box
        sx={{
          position: "absolute",
          top: "-5px",
          left: "-4px",
          cursor: "pointer",
          color: "#e73d3d",
        }}
        onClick={() => {
          removeCourse(id);
        }}
      >
        <CancelIcon sx={{ fontSize: "1.2rem" }} />
      </Box>
      <Box>
        <Typography
          sx={{
            fontWeight: "bold",
            color: ThemeColor.secondary,
            position: "relative",
          }}
        >
          <div className="miniBar"></div>
          {name}
        </Typography>
        <Typography fontSize={"0.7rem"}>
          عدد الجلسات بالاسبوع{" "}
          <span style={{ color: ThemeColor.main, fontWeight: "bold" }}>
            {count}
          </span>
        </Typography>
      </Box>
    </Box>
  );
};

export default CourseBox;
