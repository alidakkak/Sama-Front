import { Box, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { ThemeColor } from "../../../Assets/Theme/Theme";

const StudentInfo = ({ item, handleChange, i }) => {
  return (
    <Stack
      key={i}
      justifyContent={"space-between"}
      alignItems={"center"}
      direction="row"
      sx={{
        background: "#fbfbfb",
        transition: "0.2s",
        color: "#333",
        border: "#333",
        padding: "0 0rem 0 1rem",
        boxShadow: ThemeColor.boxShadow,
        borderRadius: "5px",
        transition: "0.3s",
        "&:hover": {
          background: ThemeColor.background,
        },
      }}
    >
      <Stack
        gap={"0.5rem"}
        justifyContent={"flex-end"}
        direction={"row"}
        alignItems={"center"}
        sx={{
          transition: "0.2s",
          color: "#333",
          border: "#333",
        }}
        onClick={() => {
          //   handleChangeStudent(item.id);
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
            borderRadius: "5px",
          }}
        ></Box>
        <Box sx={{ textAlign: "right" }}>
          <Typography>{item.full_name}</Typography>
          <Typography fontSize={"0.8rem"}>اسم الاب</Typography>
        </Box>
      </Stack>
      <TextField
        size="small"
        label="العلامة"
        type="number"
        name={"result_" + item.id}
        sx={{
          margin: "0.5rem 0",
          background: ThemeColor.background,
          flexBasis: "30%",
        }}
        onChange={handleChange}
      />
    </Stack>
  );
};

export default StudentInfo;
