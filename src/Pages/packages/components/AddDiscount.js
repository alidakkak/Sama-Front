import React, { useState } from "react";
import InfoTitle from "../../Students/Components/InfoTitle";
import { Box, Stack, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ThemeColor } from "../../../Assets/Theme/Theme";

const AddDiscount = ({ discounts, setSelectedDiscount, selectedDiscount }) => {
  const [openSelect, setOpenSelect] = useState(false);

  return (
    <>
      <InfoTitle title={"اضافة خصم"} />
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Stack
          sx={{
            background: "linear-gradient(180deg, #EDECF2, #fefefe)",
            maxWidth: "100%",
            margin: "1rem 0 0rem auto",
            padding: "0.3rem 1.5rem",
            borderRadius: "5px",
            boxShadow: ThemeColor.boxShadow,
            cursor: "pointer",
          }}
          justifyContent={"space-between"}
          direction={"row"}
          onClick={() => {
            setOpenSelect(!openSelect);
          }}
        >
          <Box>
            <Typography>اختيار حسم</Typography>
          </Box>

          <KeyboardArrowDownIcon />
        </Stack>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            left: "0",
            overflow: "hidden",
            marginBottom: "1rem",
            height: openSelect ? `${discounts.length * 36}px` : "0px",
            transition: "0.3s",
          }}
        >
          {discounts.map((item, i) => {
            return (
              <Stack
                sx={{
                  maxWidth: "100%",
                  margin: "0 0 0 auto",
                  padding: "0.3rem 1.5rem",
                  transition: "0.3s",
                  borderBottom: "1px solid #ddd",
                  borderTop: "1px solid #ddd",
                  cursor: "pointer",
                  backgroundColor:
                    selectedDiscount === item.id ? ThemeColor.main : "#eee",
                  color: selectedDiscount === item.id ? "#fff" : "#333",
                  "&:hover": {
                    transform: "translateX(-4px)",
                  },
                }}
                direction={"row"}
                justifyContent={"space-between"}
                key={i}
                onClick={() => {
                  setSelectedDiscount(item.id);
                }}
              >
                <Box>
                  <Typography>{item.name}</Typography>
                </Box>

                <Box>
                  <Typography>{item.amount}%</Typography>
                </Box>
              </Stack>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default AddDiscount;
