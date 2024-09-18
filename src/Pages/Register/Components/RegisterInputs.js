import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import React from "react";
import ChunkLayout from "../../../Layout/ChunkLayout";
import Loader from "../../../UI/Loader";
import SelectSubjects from "./SelectSubjects";
import { ThemeColor } from "../../../Assets/Theme/Theme";

const RegisterInputs = ({
  lPackage,
  handleChange,
  packages,
  isLodingPackageDetails,
  isFetching,
  packageDetails,
  calcTheSessions,
  subjectsIds,
  handleSelectSubject,
  handleChangeInputs,
  discount,
  handleChangeDiscount,
  getDiscount,
  handleChangeAmountOfDelay,
  financialDues,
}) => {
  return (
    <ChunkLayout>
      <Stack gap={"1rem"}>
        <>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">الدورات</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={lPackage}
              label="الدورات"
              onChange={handleChange}
              sx={{
                background: ThemeColor.background,
              }}
              size={"small"}
            >
              {packages?.data?.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </>

        <>
          <TextField
            label={"نسبة الزيادة على السعر الافتراضي"}
            type="number"
            size="small"
            name="percentage_increase_over_the_default_price"
            inputProps={{ min: 0, max: 100 }}
            fullWidth
            onChange={handleChangeInputs}
            defaultValue={0}
            sx={{
              background: ThemeColor.background,
            }}
          />
        </>

        <>
          <TextField
            inputProps={{ min: 1 }}
            label={"عتبة التقريب"}
            name="rounding_threshold"
            type="number"
            size="small"
            fullWidth
            onChange={handleChangeInputs}
            defaultValue={1}
            sx={{
              background: ThemeColor.background,
            }}
          />
        </>

        <>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">اختر حسم</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={discount}
              label="اختر حسم"
              onChange={handleChangeDiscount}
              size={"small"}
              sx={{
                background: ThemeColor.background,
              }}
              disabled={isLodingPackageDetails || isFetching}
            >
              <MenuItem value={0}>لايوجد</MenuItem>
              {packageDetails?.data?.scholarship.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          {financialDues == undefined || discount == 0 ? (
            <></>
          ) : (
            <Box sx={{ fontSize: "0.4rem" }}>
              <Typography
                sx={{
                  textAlign: "right",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                حسم بقيمة{" "}
                <span style={{ color: ThemeColor.main }}>
                  {" "}
                  {
                    getDiscount(packageDetails?.data?.scholarship, discount)
                      ?.discount
                  }{" "}
                </span>
                ليرة
              </Typography>
              <Typography
                sx={{
                  textAlign: "right",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                السعر بعد الحسم{" "}
                <span style={{ color: ThemeColor.main }}>
                  {" "}
                  {financialDues -
                    getDiscount(packageDetails?.data?.scholarship, discount)
                      ?.discount}{" "}
                </span>
                ليرة
              </Typography>
            </Box>
          )}
        </>

        <>
          <TextField
            label={"مدة التاخير علة الدورة"}
            type="number"
            size="small"
            name="amountOfDelay"
            inputProps={{ min: 0, max: 100 }}
            fullWidth
            onChange={handleChangeAmountOfDelay}
            defaultValue={0}
            sx={{
              background: ThemeColor.background,
            }}
          />
        </>

        <>
          {isLodingPackageDetails || isFetching ? (
            <Loader />
          ) : (
            <Box>
              <SelectSubjects
                handleSelectSubject={handleSelectSubject}
                subjects={packageDetails?.data?.subjects}
                subjectsIds={subjectsIds}
                packageDetails={packageDetails}
              />
              <Typography
                sx={{
                  textAlign: "right",
                  fontSize: "0.7rem",
                  marginTop: "0.4rem",
                }}
              >
                عدد الجلسات{" "}
                {calcTheSessions(subjectsIds, packageDetails?.data?.subjects)}
              </Typography>
            </Box>
          )}
        </>
      </Stack>
    </ChunkLayout>
  );
};

export default RegisterInputs;
