import { Typography } from "@mui/material";
import React, { useState } from "react";
import MUITable from "../../../UI/MUITable";
import ChunkLayout from "../../../Layout/ChunkLayout";
import SectionHeader from "../../../UI/SectionHeader";
import { useGetTeacherPaymentQuery } from "../../../Redux/Api/TeachersApi";
import { useParams } from "react-router-dom";
import Loader from "../../../UI/Loader";
import AddTeacherCheckPopup from "./AddTeacherCheckPopup";

const TeacherCheck = ({ registration }) => {
  const { id } = useParams();
  const { data, isLoading } = useGetTeacherPaymentQuery(id);
  const [addCheckPopup, setAddCheckPopup] = useState(false);
  const closeAddCheckPopup = () => {
    setAddCheckPopup(false);
  };
  const openAddCheckPopup = () => {
    setAddCheckPopup(true);
  };
  return (
    <>
      {addCheckPopup && (
        <AddTeacherCheckPopup closeAddCheckPopup={closeAddCheckPopup} />
      )}
      <ChunkLayout>
        <SectionHeader
          title={"سجل الرسوم الاضافية"}
          buttonContent={"اضافة رسوم اضافية"}
          onClickButton={openAddCheckPopup}
        />

        {isLoading ? (
          <Loader />
        ) : data?.data.length == 0 ? (
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "0.8rem",
              color: "gray",
              textAlign: "center",
            }}
          >
            لا يوجد دفعات
          </Typography>
        ) : (
          <MUITable columns={columns} data={data?.data} />
        )}
      </ChunkLayout>
    </>
  );
};

export default TeacherCheck;

const columns = [
  { name: "العنوان", key: "title" },
  { name: "الدفعة", key: "price" },
  { name: "التاريخ", key: "created_at" },
];
