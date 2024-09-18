import React, { useState } from "react";
import PanelHeader from "../../UI/PanelHeader";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import SectionLayout from "../../Layout/SectionLayout";
import ChunkLayout from "../../Layout/ChunkLayout";
import { useDispatch } from "react-redux";
import { openAlert } from "../../Redux/Slices/AlertSlice";
import Loader from "../../UI/Loader";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAddTeacherMutation } from "../../Redux/Api/TeachersApi";
import { ThemeColor } from "../../Assets/Theme/Theme";

const AddTeacher = () => {
  //States
  const [gender, setGender] = useState("male");

  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };

  const navigate = useNavigate();
  const [addTeacher, { isLoading, isSuccess, isError }] =
    useAddTeacherMutation();
  const dispatch = useDispatch();

  const AddTeacherHandler = (values) => {
    addTeacher({ ...values, gender })
      .then((e) => {
        if (e.error) {
          dispatch(
            openAlert({ message: e?.error?.data?.message, type: "error" })
          );
        }
      })
      .catch((error) => {
        dispatch(openAlert({ message: "لقد حدث خطأ", type: "error" }));
      });
  };

  if (isSuccess) {
    dispatch(openAlert({ message: "تمت اضافةالمدرس بنجاح", type: "success" }));
    navigate("/dashboard/teachers");
  }

  return (
    <>
      <PanelHeader title={"اضافة مدرس"} />
      {false ? (
        <ChunkLayout>
          <Loader />
        </ChunkLayout>
      ) : (
        <Formik
          initialValues={{
            first_name: "",
          }}
          validationSchema={TeacherSchema}
          onSubmit={AddTeacherHandler}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid spacing={3} container>
                {inputsArray.map((item, i) => {
                  return (
                    <Grid key={i} item xs={12} md={6}>
                      {" "}
                      <ChunkLayout>
                        <SectionLayout title={item.title}>
                          <Stack
                            justifyContent={"space-between"}
                            direction={"row"}
                            flexWrap={"wrap"}
                            my={"auto"}
                          >
                            {item.inputs.map((item, i) => {
                              return (
                                <TextField
                                  key={i}
                                  size="small"
                                  label={item.label}
                                  sx={{
                                    flexBasis: { md: "49%", xs: "100%" },
                                    margin: "0.5rem 0",
                                    background: ThemeColor.background,
                                  }}
                                  name={item.name}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  error={!!errors[item.name]}
                                  helperText={errors[item.name]}
                                  value={values[item.name]}
                                  disabled={isLoading}
                                />
                              );
                            })}
                            {item.title == "المعلومات الاساسية" ? (
                              <FormControl
                                sx={{
                                  flexBasis: { md: "49%", xs: "100%" },
                                  margin: "0.5rem 0",
                                }}
                                fullWidth
                              >
                                <InputLabel id="demo-simple-select-label">
                                  الجنس
                                </InputLabel>

                                <Select
                                  sx={{ background: "#fff" }}
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  label="الجنس"
                                  size={"small"}
                                  onChange={handleChangeGender}
                                  value={gender}
                                  disabled={isLoading}
                                >
                                  <MenuItem
                                    key={i}
                                    sx={{ zIndex: "2005" }}
                                    value={"male"}
                                  >
                                    ذكر
                                  </MenuItem>
                                  <MenuItem
                                    key={i}
                                    sx={{ zIndex: "2005" }}
                                    value={"female"}
                                  >
                                    انثى
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            ) : (
                              <></>
                            )}
                          </Stack>
                        </SectionLayout>
                      </ChunkLayout>
                    </Grid>
                  );
                })}
              </Grid>
              <Box m={"1rem"} sx={{ textAlign: "right" }}>
                <Button
                  size="small"
                  disabled={isLoading}
                  variant="contained"
                  type={"submit"}
                >
                  <span>اضافة المدرس</span>
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </>
  );
};

export default AddTeacher;

const TeacherSchema = Yup.object({
  first_name: Yup.string().required("هذا الحقل مطلوب"),
  last_name: Yup.string().required("هذا الحقل مطلوب"),
  father_name: Yup.string().required("هذا الحقل مطلوب"),
  phone: Yup.string().required("هذا الحقل مطلوب"),
  location: Yup.string().required("هذا الحقل مطلوب"),
  email: Yup.string()
    .required("هذا الحقل مطلوب")
    .email("يجب ان يكون ايميل صحيح"),
  date_of_birth: Yup.string()
    .typeError("يجب ان يكون تاريخ صالح من الشكل y-m-d")
    .required("هذا الحقل مطلوب")
    .test("format", "يجب أن يكون بالتنسيق YYYY-M-D", (value) => {
      const regex = /^\d{4}-\d{1,2}-\d{1,2}$/;
      return regex.test(value);
    }),
});

const inputsArray = [
  {
    title: "معلومات التواصل",
    inputs: [
      { name: "date_of_birth", label: "تاريخ الميلاد" },
      { name: "phone", label: "رقم الموبايل" },
      { name: "telephone", label: "رقم التيليفون" },
      { name: "email", label: "الايميل" },
      { name: "facebook", label: "فيسبوك" },
    ],
  },
  {
    title: "المعلومات الاساسية",
    inputs: [
      { name: "first_name", label: "الاسم الاول" },
      { name: "last_name", label: "الاسم الاخير" },
      { name: "father_name", label: "اسم الاب" },
      { name: "location", label: "السكن" },
    ],
  },
];
