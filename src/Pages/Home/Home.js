import React from "react";

import { Button, Grid } from "@mui/material";

import { useGetGeneralStatsQuery } from "../../Redux/Api/StatsApi";
import Loader from "../../UI/Loader";
import StatsCard from "../Home/components/StatsCard";
import ChunkLayout from "../../Layout/ChunkLayout";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { data, isLoading, isSuccess } = useGetGeneralStatsQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess) {
    const stats = data;

    return (
      <>
        <ChunkLayout>
          <Button
            onClick={() => {
              navigate("/dashboard/create-register-student");
            }}
            variant={"contained"}
          >
            تسجيل طالب
          </Button>
          <Button
            onClick={() => {
              navigate("/dashboard/register-student");
            }}
            variant={"contained"}
            sx={{ display: "block", marginTop: "0.5rem" }}
          >
            اضافة طالب لدورة
          </Button>
        </ChunkLayout>
        <Grid mt={"0.5rem"} container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <StatsCard title="كل التسجيلات" value={stats.allRegistrations} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatsCard title="الطلاب النشطون" value={stats.activeStudents} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatsCard title="الطلاب الغائبون" value={stats.absentStudents} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatsCard title="المعلمين النشطين" value={stats.activeTeacher} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatsCard
              title="المعلمين غير النشطين"
              value={stats.inactiveTeacher}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatsCard title="جميع المعلمين" value={stats.teachers} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatsCard title="جميع الطلاب" value={stats.allStudents} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatsCard
              title="جميع الدورات الدراسية"
              value={stats.allSemester}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatsCard
              title="الدورات الدراسية المنتظرة"
              value={stats.waitingSemester}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatsCard
              title="دورات مستمرة"
              value={stats.continuationSemester}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatsCard title="دورات النهاية" value={stats.endSemester} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatsCard
              title="الطلاب المنسحبون"
              value={stats.withdrawnStudents}
            />
          </Grid>
        </Grid>
      </>
    );
  }
};

export default Home;
