import React from "react";

import { Grid } from "@mui/material";

import { useGetFinanciallStatsQuery } from "../../Redux/Api/StatsApi";
import Loader from "../../UI/Loader";
import StatsCard from "../Home/components/StatsCard";

const Financial = () => {
  const { data, isLoading, isSuccess } = useGetFinanciallStatsQuery();

  console.log(data);

  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess) {
    const stats = data;
    console.log(stats);

    return (
      <>
        <Grid mt={"0.5rem"} container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <StatsCard
              title="إجمالي رواتب المعلمين"
              value={stats.totalTeacherSalary}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatsCard
              title="إجمالي النفقات العامة"
              value={stats.totalGeneralExpense}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatsCard
              title="إجمالي مدفوعات الطلاب"
              value={stats.totalStudentPayments}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatsCard title="رسوم إضافية" value={stats.extraCharge} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatsCard title="إجمالي النفقات" value={stats.totalExpenses} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatsCard
              title="صافي الربح أو الخسارة"
              value={stats.netProfitOrLoss}
            />
          </Grid>
        </Grid>
      </>
    );
  }
};

export default Financial;
