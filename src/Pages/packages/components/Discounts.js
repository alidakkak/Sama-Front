import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import ChunkLayout from "../../../Layout/ChunkLayout";
import SectionHeader from "../../../UI/SectionHeader";
import AddDiscountPopup from "./AddDiscountPopup";
import MUITable from "../../../UI/MUITable";

const Discounts = ({ discounts }) => {
  console.log(discounts);
  const [popup, setPopup] = useState(false);
  const closePopup = () => {
    setPopup(false);
  };
  const openPopup = () => {
    setPopup(true);
  };
  return (
    <ChunkLayout>
      {popup && <AddDiscountPopup closePopup={closePopup} />}
      <SectionHeader
        onClickButton={openPopup}
        buttonContent={"اضافة حسم"}
        title={"الحسومات العامة"}
      />

      {discounts?.length == 0 ? (
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "0.8rem",
            color: "gray",
            textAlign: "center",
          }}
        >
          لا يوجد امتحانات
        </Typography>
      ) : (
        <Box padding="0 0.5rem">
          <MUITable columns={columns} data={discounts} />
        </Box>
      )}
    </ChunkLayout>
  );
};

export default Discounts;

const columns = [
  { name: "اسم الحسم", key: "name" },
  { name: "المبلغ", key: "discount" },
  { name: "الوصف", key: "description" },
  { name: "ما يعادل", key: "approximatelyPercentage" },
];
