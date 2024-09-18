import React, { useState } from "react";
import ChunkLayout from "../../../Layout/ChunkLayout";
import MUITable from "../../../UI/MUITable";
import { Button } from "@mui/material";
import SetTeacherPopup from "./SetTeacherPopup";
import SectionHeader from "../../../UI/SectionHeader";
import EditTeacherPopup from "./EditTeacherPopup";

const PackageDetailsCourse = ({ data, classRoomFilter }) => {
  const courseColumns = [
    { name: "المادة", key: "name" },
    { name: "عدد الحصص بالاسبوع", key: "number_sessions_per_week" },
    {
      name: "مدرس المادة",
      key: "teacherName",
      Cell: (row) => {
        return (
          <div
            style={{
              fontWeight: "bold",
              color: !row.teacherName ? "#e70127" : "#333",
            }}
          >
            {row.teacherName ? row.teacherName : "غير معين"}
          </div>
        );
      },
    },
    {
      name: "اجراءات",
      key: "teacherName",
      Cell: (row) => {
        let teacherExist = false;
        if (row.teacherName) {
          teacherExist = true;
        }
        return (
          <Button
            size="small"
            onClick={() => {
              if (teacherExist) {
                openTeacherEditPopup(true);
              } else {
                openTeacherPopup();
              }

              setSubject_id(row.id);
            }}
            variant="contained"
            sx={{ padding: "0.1rem 0.4rem" }}
          >
            {teacherExist ? "تعديل" : "اضافة"}
          </Button>
        );
      },
    },
  ];
  const [teacherSetPopup, setTeacherSetPopup] = useState(false);

  const closeTeacherPopup = () => {
    setTeacherSetPopup(false);
  };
  const openTeacherPopup = () => {
    setTeacherSetPopup(true);
  };

  const [teacherEditPopup, setTeacherEditPopup] = useState(false);

  const closeTeacherEditPopup = () => {
    setTeacherEditPopup(false);
  };
  const openTeacherEditPopup = () => {
    setTeacherEditPopup(true);
  };
  const [subject_id, setSubject_id] = useState(false);

  return (
    <ChunkLayout>
      {teacherSetPopup && (
        <SetTeacherPopup
          closeTeacherPopup={closeTeacherPopup}
          classroom_id={classRoomFilter}
          subject_id={subject_id}
        />
      )}
      {teacherEditPopup && (
        <EditTeacherPopup
          closeTeacherPopup={closeTeacherEditPopup}
          classroom_id={classRoomFilter}
          subject_id={subject_id}
        />
      )}
      <SectionHeader title={"المواد"}></SectionHeader>
      <MUITable
        columns={
          classRoomFilter == 0 ? courseColumns.slice(0, 2) : courseColumns
        }
        data={data}
      />
    </ChunkLayout>
  );
};

export default PackageDetailsCourse;
