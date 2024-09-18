import { Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";

const InfoTitle = ({ title, buttonContetn }) => {
  return (
    <>
      <Typography
        sx={{
          textAlign: "right",
          fontWeight: "bold",
        }}
      >
        {title}
      </Typography>

      <Divider sx={{ margin: "0.8rem 0 1rem" }} />
    </>
  );
};

export default InfoTitle;
