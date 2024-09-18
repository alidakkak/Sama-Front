import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import InfoTitle from "./InfoTitle";
import MUITable from "../../../UI/MUITable";
import { ThemeColor } from "../../../Assets/Theme/Theme";
import ChunkLayout from "../../../Layout/ChunkLayout";
import SectionHeader from "../../../UI/SectionHeader";
import { useGetPackageDetailsQuery } from "../../../Redux/Api/PackageApi";
import Loader from "../../../UI/Loader";
import EditMarkPopup from "./EditMarkPopup";

const StudentMarks = ({ registration }) => {
  const {
    data: packageDetails,
    isLoading,
    isSuccess: isSuccessPackageDetails,
  } = useGetPackageDetailsQuery(registration.semester_id);

  const [editPopup, setEditPopup] = useState({ open: false });
  const closeEditPopup = () => {
    setEditPopup({ open: false });
  };
  const openEditPopup = (data) => {
    setEditPopup({ data, open: true });
  };

  let columns_total = [
    {
      name: "المادة",
      key: "subjectName",
    },
  ];
  if (isSuccessPackageDetails) {
    for (let i = 0; i < packageDetails?.data?.exams.length; i++) {
      const item = packageDetails?.data?.exams[i];
      columns_total.push({
        name: item.name,
        key: item.name,
      });
    }

    if (columns_total.length > 0) {
      columns_total.push({
        name: "المحصلة",
        key: "average",
      });
    }
  }

  const log_columns = [
    {
      name: "المادة",
      key: "subjectName",
    },
    {
      name: "النوع",
      key: "examName",
    },
    {
      name: "العلامة",
      key: "result",
    },
    {
      name: "التاريخ",
      key: "date",
    },
    {
      name: "",
      key: "",
      Cell: (row) => {
        return (
          <Button
            onClick={() => {
              openEditPopup(row);
            }}
            variant="outlined"
            size="small"
          >
            تعديل
          </Button>
        );
      },
    },
  ];

  return (
    <Box>
      {editPopup.open && (
        <EditMarkPopup oldData={editPopup.data} closePopup={closeEditPopup} />
      )}
      {registration?.marks.length == 0 ? (
        <></>
      ) : (
        <ChunkLayout>
          <SectionHeader title={"سجل العلامات"} />
          <MUITable data={registration?.marks} columns={log_columns} />
        </ChunkLayout>
      )}

      <ChunkLayout>
        {isLoading ? (
          <Loader />
        ) : registration.subjectResults.length == 0 ? (
          <Typography
            sx={{ textAlign: "center", fontSize: "0.8rem", color: "gray" }}
          >
            لا يوجد علامات
          </Typography>
        ) : (
          <>
            <InfoTitle title={"المحصلات"} />
            <MUITable
              data={formateData(registration.subjectResults)}
              columns={columns_total}
            />
            <Typography
              sx={{ textAlign: "right", marginTop: "1rem", fontWeight: "bold" }}
            >
              <span style={{ color: ThemeColor.main }}>
                {registration.total_GPA_For_All_Subjects}
              </span>{" "}
              المحصلة النهائية
            </Typography>
          </>
        )}{" "}
      </ChunkLayout>
    </Box>
  );
};

export default StudentMarks;

const formateData = (arr) => {
  const data = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const obj = { subjectName: item.subjectName, average: item.average };
    for (let j = 0; j < item.exams.length; j++) {
      const exam = item.exams[j];
      obj[exam.examName] = exam.average;
    }
    data.push(obj);
  }

  return data;
};
