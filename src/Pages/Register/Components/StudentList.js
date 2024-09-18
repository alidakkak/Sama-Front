import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { ThemeColor } from "../../../Assets/Theme/Theme";

const StudentList = ({ students, handleChangeStudent, student }) => {
  const [showMore, setShowMore] = useState(2);
  const showMoreHandler = () => {
    setShowMore(showMore + 3);
  };
  return (
    <Box
      sx={{
        margin: "0.5rem auto",
        borderTop: "1px solid #eee",
        borderBottom: "1px solid #eee",
      }}
    >
      <Stack gap={"0.5rem"} sx={{ padding: "1rem 0.3rem" }}>
        {students?.length == 0 && (
          <Typography sx={{ textAlign: "right", color: "gray" }}>
            لا يوجد
          </Typography>
        )}

        {students?.map((item, i) => {
          if (i >= showMore) return;
          return (
            <Stack
              key={i}
              gap={"0.5rem"}
              direction={"row"}
              alignItems={"center"}
              sx={{
                background: student === item.id ? ThemeColor.main : "#eee",
                transition: "0.2s",
                color: student === item.id ? "#fff" : "#333",
                border:
                  student === item.id
                    ? `1px solid ${ThemeColor.main} `
                    : "#333",
                cursor: "pointer",
              }}
              onClick={() => {
                handleChangeStudent(item.id);
              }}
            >
              <Box
                style={{
                  width: "65px",
                  height: "65px",
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundRepeate: "no-repeat",
                  backgroundPosition: "center",
                }}
                src={item.image}
              ></Box>

              <Box sx={{ textAlign: "right" }}>
                <Typography>{item.name}</Typography>
                <Typography fontSize={"0.8rem"}>{item.father_name}</Typography>
              </Box>
            </Stack>
          );
        })}
        {showMore <= students.length && (
          <Typography
            sx={{ fontSize: "0.8rem", cursor: "pointer", fontWeight: "bold" }}
            textAlign={"right"}
            onClick={showMoreHandler}
          >
            ...عرض المزيد
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default StudentList;
