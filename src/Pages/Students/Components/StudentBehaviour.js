import React, { useState } from "react";
import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import GradientBox from "../../../UI/GradientBox";
import { ThemeColor } from "../../../Assets/Theme/Theme";
import ChunkLayout from "../../../Layout/ChunkLayout";
import AddNotePopup from "./AddNotePopup";
import SectionHeader from "../../../UI/SectionHeader";

const StudentBehaviour = ({ registration }) => {
  const [addNotePopup, setAddNotePopup] = useState(false);
  const closeAddNotePopup = () => {
    setAddNotePopup(false);
  };
  const openAddNotePopup = () => {
    setAddNotePopup(true);
  };
  return (
    <ChunkLayout>
      {addNotePopup && (
        <AddNotePopup
          addNotePopup={addNotePopup}
          closeAddNotePopup={closeAddNotePopup}
          packageId={registration.semester_id}
        />
      )}

      <SectionHeader
        title={"الملاحظات"}
        buttonContent={"اضافة ملاحظة"}
        onClickButton={openAddNotePopup}
      />

      {registration?.studentBehavior.length == 0 ? (
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "0.8rem",
            color: "gray",
            textAlign: "center",
          }}
        >
          لا يوجد ملاحظات
        </Typography>
      ) : (
        <Grid justifyContent={"end"} container spacing={3}>
          {registration?.studentBehavior?.map((item, i) => {
            return (
              <Grid key={i} sm={6} xs={12} item>
                <GradientBox>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography>
                      الملاحظة :{" "}
                      <span
                        style={{ color: ThemeColor.main, fontWeight: "bold" }}
                      >
                        {item.title}
                      </span>
                    </Typography>

                    <Typography sx={{ fontSize: "0.8rem", color: "gray" }}>
                      {item.created_at}
                    </Typography>
                  </Box>
                </GradientBox>
              </Grid>
            );
          })}
        </Grid>
      )}
    </ChunkLayout>
  );
};

export default StudentBehaviour;
