import React, { useEffect } from "react";
import ChunkLayout from "../../../Layout/ChunkLayout";
import { Link, useParams } from "react-router-dom";
import MUITable from "../../../UI/MUITable";
import { useGetPackageStudentsQuery } from "../../../Redux/Api/PackageApi";
import Loader from "../../../UI/Loader";
import SectionHeader from "../../../UI/SectionHeader";
import { Button, Chip, Grid, Typography } from "@mui/material";

const PackageStudents = ({ subjects }) => {
  const courseColumns = [
    { name: "المادة", key: "name" },
    { name: "عدد الحصص بالاسبوع", key: "number_sessions_per_week" },

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
            variant="contained"
            sx={{ padding: "0.1rem 0.4rem" }}
          >
            {teacherExist ? "تعديل" : "اضافة"}
          </Button>
        );
      },
    },
  ];

  const { id } = useParams();
  const {
    data: pacakgestudents,
    isLoading: isLoadingpacakgestudents,
    refetch,
  } = useGetPackageStudentsQuery(id);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <Grid spacing={3} container>
        <Grid item md={6} xs={12}>
          <ChunkLayout>
            <SectionHeader title={"الطلاب"}></SectionHeader>

            {isLoadingpacakgestudents ? (
              <Loader />
            ) : pacakgestudents?.data?.students?.length == 0 ? (
              <Typography
                variant="h5"
                sx={{ color: "gray", textAlign: "center" }}
              >
                لا يوجد طلاب
              </Typography>
            ) : (
              <MUITable
                columns={studentsCol}
                data={pacakgestudents?.data?.students}
              />
            )}
          </ChunkLayout>
        </Grid>

        <Grid item md={6} xs={12}>
          <ChunkLayout>
            <SectionHeader title={"المواد"}></SectionHeader>
            <MUITable columns={courseColumns} data={subjects} />
          </ChunkLayout>
        </Grid>
      </Grid>
    </>
  );
};

export default PackageStudents;

const studentsCol = [
  { name: "المعرف", key: "id" },
  {
    name: "الاسم",
    key: "fullName",
    Cell: (row) => {
      return <Link to={"/dashboard/student/" + row.id}>{row.fullName}</Link>;
    },
  },

  {
    name: "عدد المواد",
    key: "subjectCount",
  },

  {
    name: "حالة الطالب",

    Cell: (row) => {
      console.log(row);

      let status = "نشط";
      let chipColor = "default";

      switch (row.status) {
        case "2":
          status = "متخلف";
          chipColor = "warning";
          break;
        case "3":
          status = "منسحب";
          chipColor = "error";
          break;
        default:
          status = "نشط";
          chipColor = "success";
      }

      return <Chip label={status} color={chipColor} />;
    },
  },
];
