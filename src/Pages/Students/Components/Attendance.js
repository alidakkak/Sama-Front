import React from "react";
import SectionHeader from "../../../UI/SectionHeader";
import { Typography } from "@mui/material";
import MUITable from "../../../UI/MUITable";
import { useGetStudentPresecesQuery } from "../../../Redux/Api/StudentApi";
import Loader from "../../../UI/Loader";
import ChunkLayout from "../../../Layout/ChunkLayout";
import { useParams } from "react-router-dom";

const Attendance = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetStudentPresecesQuery(id);

  if (isError) {
    return;
  }

  if (isLoading) {
    return <Loader />;
  }

  console.log(data);
  return (
    <>
      <ChunkLayout>
        <SectionHeader title={"سجل الحضور"} />

        {data?.data.length == 0 ? (
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "0.8rem",
              color: "gray",
              textAlign: "center",
            }}
          >
            لا يوجد حضور
          </Typography>
        ) : (
          <MUITable columns={columns} data={data?.data} />
        )}
      </ChunkLayout>
    </>
  );
};

export default Attendance;
const columns = [
  { name: "المعرف", key: "id" },
  { name: "وقت الدخور", key: "in_time" },
  { name: "زقت الانصراف", key: "out_time" },
];
