import { Box, Typography } from "@mui/material";
import React from "react";
import { ThemeColor } from "../../../Assets/Theme/Theme";
const ClassCourseBox = ({ count, name, teacher, openTeacherPopup }) => {
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
        <Typography
          sx={{
            cursor: "pointer",
            transition: "0.3s",
            borderRadius: "5px",
            "&:hover": {
              boxShadow: ThemeColor.boxShadow,
              padding: "0.1rem",
            },
          }}
          fontSize={"0.7rem"}
          onClick={openTeacherPopup}
        >
          {teacher ? (
            <Box>
              {" "}
              استاذ المادة{" "}
              <span style={{ color: ThemeColor.main, fontWeight: "bold" }}>
                {teacher}
              </span>
            </Box>
          ) : (
            "اضافة استاذ"
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default ClassCourseBox;
