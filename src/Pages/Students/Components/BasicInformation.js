import { Box, Grid, Stack, Typography, Divider } from "@mui/material";
import React from "react";
import GradientBox from "../../../UI/GradientBox";
import InfoTitle from "./InfoTitle";
import ChunkLayout from "../../../Layout/ChunkLayout";

const BasicInformation = ({ informationBoxes }) => {
  return (
    <Grid spacing={1} justifyContent={"end"} direction={"row"} container>
      {informationBoxes.map((item, i) => {
        return (
          <Grid key={i} sm={12} md={6} item>
            <ChunkLayout>
              <Box
                sx={{
                  textAlign: "right",
                }}
              >
                <InfoTitle title={item.title} />
                <GradientBox>
                  <Stack gap={"0.4rem"}>
                    {item.info.map((information, i) => {
                      return (
                        <Stack key={i} gap="1rem" direction={"row"}>
                          <Typography sx={{ color: "#828282" }}>
                            {information.key}
                          </Typography>
                          <Typography fontWeight={"600"}>
                            {information.value ? (
                              information.value
                            ) : (
                              <span
                                style={{
                                  fontSize: "0.8rem",
                                  color: "#333",
                                  fontWeight: "normal",
                                }}
                              >
                                لا يوجد
                              </span>
                            )}
                          </Typography>
                        </Stack>
                      );
                    })}
                  </Stack>
                </GradientBox>
              </Box>
            </ChunkLayout>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default BasicInformation;
