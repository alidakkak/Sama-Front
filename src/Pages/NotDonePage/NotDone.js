import { Box, Typography } from "@mui/material";
import React from "react";
import ChunkLayout from "../../Layout/ChunkLayout";
import EngineeringIcon from "@mui/icons-material/Engineering";
const NotDone = () => {
  return (
    <Box sx={{ height: "90vh" }}>
      <ChunkLayout>
        <Box sx={{ textAlign: "center" }}>
          <EngineeringIcon
            sx={{
              fontSize: "8rem",
              color: "#ddd",
              textAlign: "center",
              margin: "0 auto",
            }}
          />
        </Box>
        <Typography variant="h6" sx={{ textAlign: "center", color: "gray" }}>
          لم يتم الانتهاء منه بعد
        </Typography>
      </ChunkLayout>
    </Box>
  );
};

export default NotDone;
