import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import SideBar from "../UI/SideBar";

import { useSelector } from "react-redux";
import Section from "./Components/Section";

const SidebarLayout = () => {
  const { width: sidebarWidth } = useSelector((state) => state.sidebar);
  const width = window.innerWidth;
  const chunk = width / 12;
  const [sidebarRow, setSidebarRow] = useState(sidebarWidth / chunk);

  const calcSidebarRows = () => {
    const width = window.innerWidth;
    const chunk = width / 12;
    setSidebarRow(sidebarWidth / chunk);
  };

  useEffect(() => {
    setSidebarRow(sidebarWidth / chunk);
  }, [sidebarWidth]);

  return (
    <Grid spacing={0} container>
      <Grid sx={{ transition: "0.5s" }} item sm={sidebarRow} xs={1}>
        <Box>
          <SideBar />
        </Box>
      </Grid>
      <Grid
        sx={{ transition: "0.5s", margin: "0 auto" }}
        item
        sm={12 - sidebarRow}
        xs={11}
      >
        <Section />
      </Grid>
    </Grid>
  );
};

export default SidebarLayout;
