import { Box, Divider, Typography } from "@mui/material";
import React from "react";

import { ThemeColor } from "../../../Assets/Theme/Theme";
import IncomsLog from "../../../UI/IncomsLog";
import ChunkLayout from "../../../Layout/ChunkLayout";

import TotalDetails from "./TotalDetails";
import SectionHeader from "../../../UI/SectionHeader";

const FinanceLog = ({ registration }) => {
  return (
    <Box>
      <ChunkLayout>
        <IncomsLog registration={registration} />
      </ChunkLayout>

      <ChunkLayout>
        <SectionHeader title={"الحسومات"} />
        {registration.scholarship == null ? (
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "0.8rem",
              color: "gray",
              textAlign: "center",
            }}
          >
            لا يوجد حسومات
          </Typography>
        ) : (
          <Box>
            <Typography textAlign={"right"}>
              حسم{" "}
              <span style={{ fontWeight: "bold" }}>
                {registration.scholarship?.name}
              </span>{" "}
              بمبلغ{" "}
              <span style={{ fontWeight: "bold", color: ThemeColor.main }}>
                {registration.scholarship?.discount}
              </span>{" "}
              ليرة
            </Typography>
            <Typography textAlign={"right"}>
              <span style={{ fontWeight: "bold", color: ThemeColor.main }}>
                {registration.scholarship?.approximatelyPercentage}
              </span>{" "}
              تقريبا من سعر الدورة
            </Typography>
          </Box>
        )}
      </ChunkLayout>

      <Divider sx={{ mt: "1rem" }} />
      <ChunkLayout>
        <TotalDetails registration={registration} />
      </ChunkLayout>
    </Box>
  );
};

export default FinanceLog;
