import { Box, Divider, Typography } from "@mui/material";
import React from "react";

const SectionLayout = ({ children, title }) => {
  return (
    <Box>
      <Box>
        <Typography
          sx={{
            mb: "0.3rem",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
          textAlign={"right"}
        >
          {title}
        </Typography>
        <Divider />
      </Box>
      <Box
        sx={{
          width: "100%",
          margin: "1rem auto",
          borderRadius: "10px",

          padding: "1rem",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default SectionLayout;
