import React, { useState } from "react";
import ChunkLayout from "../../../Layout/ChunkLayout";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import AddExamPopup from "./AddExamPopup";
import MUITable from "../../../UI/MUITable";
import SectionHeader from "../../../UI/SectionHeader";
import { useNavigate, useParams } from "react-router-dom";
import ExamEditPopup from "./ExamEditPopup";

const Exams = ({ exams, isStarted }) => {
  const [addExamPopup, setExamPopup] = useState(false);

  const [editPopup, setEditPopup] = useState({ open: false });
  const closeEditPopup = () => {
    setEditPopup({ open: false });
  };
  const openEditPopup = (data) => {
    setEditPopup({ data, open: true });
  };

  const navigate = useNavigate();
  const { id } = useParams();

  const columns = [
    { name: "اسم الامتحان", key: "name" },
    { name: "النسبة", key: "percent" },
    {
      name: "",
      key: "",
      Cell: (row) => {
        return (
          <Stack gap={"1rem"} direction={"row"}>
            <Button
              onClick={() => {
                navigate(`/dashboard/add-marks/${row.id}?semester=${id}`);
              }}
              variant="outlined"
              size="small"
            >
              اضافة علامات
            </Button>

            <Button
              disabled={isStarted}
              onClick={() => {
                openEditPopup(row);
              }}
              variant="outlined"
              size="small"
            >
              تعديل
            </Button>
          </Stack>
        );
      },
    },
  ];

  const closeExamPopup = () => {
    setExamPopup(false);
  };
  const openExamPopup = () => {
    setExamPopup(true);
  };

  return (
    <ChunkLayout>
      {editPopup.open && (
        <ExamEditPopup oldData={editPopup.data} closePopup={closeEditPopup} />
      )}

      {addExamPopup && (
        <AddExamPopup
          packageId={0}
          addExamPopup={addExamPopup}
          closeExamPopup={closeExamPopup}
        />
      )}

      <SectionHeader
        onClickButton={openExamPopup}
        buttonContent={"  اضافة امتحان "}
        title={"الامتحانات"}
      />

      {exams?.length == 0 ? (
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
          <MUITable columns={columns} data={exams} />
        </Box>
      )}
    </ChunkLayout>
  );
};

export default Exams;
