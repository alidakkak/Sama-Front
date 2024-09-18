import React from "react";
import ChunkLayout from "../../../Layout/ChunkLayout";
import { Box, Typography } from "@mui/material";
import { ThemeColor } from "../../../Assets/Theme/Theme";

const TotalDetails = ({ registration }) => {
  return (
    <Box sx={{ textAlign: "right" }}>
      <Typography>
        <span style={{ color: "green", fontWeight: "bold" }}>
          {registration?.theAmountThatWasPaid}{" "}
        </span>
        المبلغ المدفوع
      </Typography>
      <Typography>
        <span style={{ color: ThemeColor.secondary, fontWeight: "bold" }}>
          {registration?.totalPrice}{" "}
        </span>
        المبلغ الكلي
      </Typography>
      <Typography>
        <span style={{ color: "red", fontWeight: "bold" }}>
          {registration?.theRemainingAmountOf}{" "}
        </span>
        المبلغ المتبقي
      </Typography>
    </Box>
  );
};

export default TotalDetails;
