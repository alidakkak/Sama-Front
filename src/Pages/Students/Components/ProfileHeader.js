import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import { ThemeColor } from "../../../Assets/Theme/Theme";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate, useParams } from "react-router-dom";

const ProfileHeader = ({ name, course, image, date }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        background: ThemeColor.main,
        padding: { md: "1rem 0.5rem", xs: "1rem" },
        borderRadius: "10px",
        position: "sticky",
        top: "0",
        height: { md: "calc(100vh - 1rem)", xs: "110%" },
        textAlign: "center",
      }}
    >
      <Tooltip
        sx={{ position: "absolute", bottom: "5px", left: "-5px" }}
        title="تعديل"
        arrow
      >
        <Button
          onClick={() => {
            navigate("/dashboard/edit-student/" + id);
          }}
        >
          <EditIcon sx={{ color: "#eee" }} />
        </Button>
      </Tooltip>
      <Stack
        gap={"1rem"}
        alignItems={"center"}
        justifyContent={"end"}
        direction={"column"}
      >
        <Stack alignItems={"center"} justifyContent={"center"}>
          {image && (
            <Box
              sx={{
                width: { xs: "100px" },
                overflow: "hidden",
                border: "solid 1px " + ThemeColor.secondary,
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundRepeate: "no-repeat",
                backgroundPosition: "center",
                height: "100px",
                borderRadius: "4px",
              }}
            >
              {/* <img style={{}} width={"100%"} src={image} /> */}
            </Box>
          )}

          <Typography
            textAlign={"center"}
            fontSize={"1.1rem"}
            fontWeight={"bold"}
            color={"white"}
          >
            {name}
          </Typography>
          <Typography textAlign={"center"} color={"#ddd"} fontSize={"0.8rem"}>
            تاريخ الانضمام : {date}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProfileHeader;
