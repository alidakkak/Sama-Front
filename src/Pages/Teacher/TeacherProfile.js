import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Filter from "../Students/Components/Filter";
import BasicInformation from "../Students/Components/BasicInformation";
import { ThemeColor } from "../../Assets/Theme/Theme";
import { useGetTeacherQuery } from "../../Redux/Api/TeachersApi";
import { useParams } from "react-router-dom";
import Loader from "../../UI/Loader";
import TeacherCheck from "./Components/TeacherCheck";

const TeacherProfile = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetTeacherQuery(id);
  const [filter, setFilter] = useState("المعلومات الاساسية");

  const setFilterHndler = (item) => {
    setFilter(item);
  };
  return (
    <>
      {" "}
      {isLoading ? (
        <Loader />
      ) : (
        <Box>
          <Box
            sx={{
              padding: "0.8rem 1rem",
              background: ThemeColor.main,
              borderRadius: "10px",
              margin: "0.8rem auto 1rem",
              zIndex: "10",
              position: "sticky",
              top: "0",
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontSize: "1.3rem",
                textAlign: "center",
              }}
            >
              المدرس{" "}
              <span
                style={{ fontWeight: "bold" }}
              >{`${data?.data?.first_name} ${data?.data?.last_name}`}</span>
            </Typography>
          </Box>
          <Filter
            filter={filter}
            filters={filters}
            setFilterHndler={setFilterHndler}
          />
          <Box sx={{ margin: "1rem 0" }}>
            {filter == "المعلومات الاساسية" ? (
              <BasicInformation
                informationBoxes={infromationBoxes(data?.data)}
              />
            ) : (
              <TeacherCheck />
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default TeacherProfile;

const filters = ["المعلومات الاساسية", "السجل المالي"];

const infromationBoxes = (data) => {
  const array = [
    {
      title: "المعلومات الاساسية",
      info: [
        { value: data?.first_name, key: "الاسم الاول" },
        { value: data?.last_name, key: "الاسم الاخير" },
        { name: data?.father_name, key: "اسم الاب" },
        { value: data?.location, key: "السكن" },
        { value: data?.gender == "male" ? "ذكر" : "انثى", key: "الجنس" },
      ],
    },
    {
      title: "معلومات التواصل",
      info: [
        { value: data?.date_of_birth, key: "تاريخ الميلاد" },
        { value: data?.phone, key: "رقم الموبايل" },
        { value: data?.telephone, key: "رقم التيليفون" },
        { value: data?.email, key: "الايميل" },
        { value: data?.facebook, key: "فيسبوك" },
      ],
    },
  ];
  return array;
};
