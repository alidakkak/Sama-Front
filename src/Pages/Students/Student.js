import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProfileHeader from "./Components/ProfileHeader";
import Filter from "./Components/Filter";
import BasicInformation from "./Components/BasicInformation";

import FinanceLog from "./Components/FinanceLog";
import Loader from "../../UI/Loader";
import StudentMarks from "./Components/StudentMarks";

import { useGetStudentQuery } from "../../Redux/Api/StudentApi";
import { useParams } from "react-router-dom";
import CategoryFilter from "../../UI/CategoryFilter";
import StudentBehaviour from "./Components/StudentBehaviour";
import ExtraCharge from "./Components/ExtraCharge";
import OtherSettings from "./Components/OtherSettings";
import Attendance from "./Components/Attendance";

const Student = () => {
  const [filter, setFilter] = useState("المعلومات الاساسية");
  const { id } = useParams();
  const { data, isLoading, isSuccess, refetch, currentData } =
    useGetStudentQuery(id);
  const setFilterHndler = (item) => {
    setFilter(item);
  };

  const [packageFilter, setPackageFilter] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setPackageFilter(
        currentData?.data?.Registration[0] ? data?.data?.Registration[0] : []
      );
    }
  }, [currentData]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Grid spacing={2} container>
          <Grid item xs={12} md={10}>
            <Box>
              <Filter
                filter={filter}
                filters={filters}
                setFilterHndler={setFilterHndler}
              />
              <Box sx={{ margin: "1rem 0" }}>
                {filter != "المعلومات الاساسية" &&
                packageFilter?.length != 0 ? (
                  <>
                    <CategoryFilter
                      data={data.data.Registration.map((item) => {
                        return {
                          ...item,
                          name: item.semesterName,
                        };
                      })}
                      filter={packageFilter}
                      setFilter={setPackageFilter}
                    />

                    {packageFilter.status > 1 && (
                      <Typography
                        sx={{
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: "1.3rem",
                          color: packageFilter.status == 2 ? "red" : "#333",
                          padding: "1rem",
                        }}
                      >
                        {packageFilter.status == 3
                          ? "الطالب منسحب من الدورة"
                          : packageFilter.status == 2
                          ? "الطالب متخلف عن الدورة"
                          : ""}
                      </Typography>
                    )}
                  </>
                ) : (
                  <></>
                )}
                {filter == "المعلومات الاساسية" ? (
                  <BasicInformation
                    informationBoxes={formatBasicInformation(data.data)}
                  />
                ) : packageFilter?.length == 0 ? (
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.4rem",
                      textAlign: "center",
                      color: "gray",
                    }}
                  >
                    غير مسجل
                  </Typography>
                ) : filter == "السجل المالي" ? (
                  <FinanceLog registration={packageFilter} />
                ) : filter == "رسوم اضافية" ? (
                  <ExtraCharge registration={packageFilter} />
                ) : filter == "العلامات" ? (
                  <StudentMarks registration={packageFilter} />
                ) : filter == "ملاحظات" ? (
                  <StudentBehaviour registration={packageFilter} />
                ) : filter == "اعدادات اخرى" ? (
                  <OtherSettings
                    studentName={`${data?.data?.first_name} ${data?.data?.last_name}`}
                    registration={packageFilter}
                    refetch={refetch}
                  />
                ) : filter == "الحضور" ? (
                  <Attendance />
                ) : (
                  <></>
                )}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={2}>
            <ProfileHeader
              name={`${data?.data?.first_name} ${data?.data?.last_name}`}
              date={data?.data?.created_at}
              image={data?.data?.image}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Student;

const filters = [
  "المعلومات الاساسية",
  "السجل المالي",
  "رسوم اضافية",
  "العلامات",
  "الحضور",
  "ملاحظات",
  "اعدادات اخرى",
];

const formatBasicInformation = (data) => {
  return [
    {
      title: "معلومات اساسية",
      info: [
        {
          key: "المواليد",
          value: data.date_of_birth,
        },
        {
          key: "مكان الولادة",
          value: data.place_of_birth,
        },
        {
          key: "السكن",
          value: data.location,
        },
        {
          key: "الحالة الاجتماعية",
          value: data.marital_status,
        },
        {
          key: "الحالة الدراسية قبل التسجيل",
          value: data.previous_educational_status,
        },
      ],
    },
    {
      title: "معلومات الاب",
      info: [
        {
          key: "الاسم",
          value: data.father_name,
        },
        {
          key: "العمل",
          value: data.father_work,
        },
        {
          key: "العمر",
          value: data.father_of_birth,
        },
        {
          key: "الحالة الصحية",
          value: data.father_Healthy,
        },
      ],
    },
    {
      title: "معلومات الام",
      info: [
        {
          key: "الاسم",
          value: data.mother_name,
        },
        {
          key: "العمل",
          value: data.mother_work,
        },
        {
          key: "العمر",
          value: data.mother_of_birth,
        },
        {
          key: "الحالة الصحية",
          value: data.mother_Healthy,
        },
      ],
    },
    {
      title: "معلومات ولي امر اخر",
      info: [
        {
          key: "الاسم",
          value: data.other_name,
        },
        {
          key: "العمل",
          value: data.other_work,
        },
        {
          key: "العمر",
          value: data.other_of_birth,
        },
        {
          key: "الحالة الصحية",
          value: data.other_Healthy,
        },
      ],
    },
    {
      title: "معلومات التواصل",
      info: [
        {
          key: "رقم الموبايل",
          value: data.student_phone_number,
        },
        {
          key: "الهاتف الارضي",
          value: data.telephone_number,
        },
        {
          key: "رقم موبايل الاب",
          value: data.phone_number,
        },
        {
          key: "حساب الفيسبوك",
          value: data.facebook,
        },
      ],
    },
    {
      title: "الملاحظات",
      info: [
        {
          key: "",
          value: data.note,
        },
      ],
    },
  ];
};
