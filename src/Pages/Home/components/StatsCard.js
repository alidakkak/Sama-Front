import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { ThemeColor } from "../../../Assets/Theme/Theme";

const StatsCard = ({ title, value, icon }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#fff",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        borderRadius: "12px",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "120px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {icon && (
          <Box
            sx={{
              backgroundColor: ThemeColor.secondary,
              borderRadius: "50%",
              padding: "10px",
              marginRight: "15px",
            }}
          >
            {icon}
          </Box>
        )}
        <CardContent sx={{ padding: 0 }}>
          <Typography
            variant="h6"
            sx={{
              color: ThemeColor.title,
              fontWeight: "500",
              marginBottom: "5px",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: ThemeColor.main,
              fontWeight: "700",
              fontSize: "2rem",
            }}
          >
            {value}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default StatsCard;
