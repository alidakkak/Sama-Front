import React, { useState } from "react";
import PanelHeader from "../../UI/PanelHeader";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import SectionLayout from "../../Layout/SectionLayout";
import AddingBox from "../../UI/AddingBox";
import PopupLayout from "../../Layout/PopupLayout";
import CourseBox from "./components/CourseBox";
import ChunkLayout from "../../Layout/ChunkLayout";
import { useAddPackageMutation } from "../../Redux/Api/PackageApi";
import { useDispatch } from "react-redux";
import { openAlert } from "../../Redux/Slices/AlertSlice";
import Loader from "../../UI/Loader";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { ThemeColor } from "../../Assets/Theme/Theme";

const AddPackage = () => {
  const [addCoursePopup, setAddCoursePopup] = useState(false);
  const [courses, setCourses] = useState([]);
  const [unit, setUnit] = useState(units[0].value);
  const navigate = useNavigate();
  const [addPackage, { isLoading, isSuccess, isError }] =
    useAddPackageMutation();
  const dispatch = useDispatch();
  const closeAddCoursePopup = () => {
    setAddCoursePopup(false);
  };
  const openAddCoursePopup = () => {
    setAddCoursePopup(true);
  };

  const addCourseToArray = (values) => {
    const name = values.name;
    const number_sessions_per_week = values.count;

    setCourses((prev) => {
      return [...prev, { name, number_sessions_per_week, id: prev.length }];
    });
    closeAddCoursePopup();
  };

  const removeCourse = (j) => {
    setCourses((prev) => {
      const newArray = prev.filter((item) => {
        return item.id !== j;
      });
      return newArray;
    });
  };

  const AddPackageHandler = (values) => {
    const data = {
      name: values.name,
      price: values.price,
      start_date: values.start,
      end_date: values.end,
      period: values.period,
      unit: unit,
      subjects: courses,
    };

    addPackage(data)
      .then((e) => {
        if (e.error) {
          dispatch(
            openAlert({ message: e?.error?.data?.message, type: "error" })
          );
        } else {
          dispatch(
            openAlert({ message: "تمت اضافة الدورة بنجاح", type: "success" })
          );
          navigate("/dashboard/package");
        }
      })
      .catch((error) => {
        dispatch(openAlert({ message: "لقد حدث خطأ", type: "error" }));
      });
  };

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  // if (isSuccess) {
  //   dispatch(openAlert({ message: "تمت اضافة الدورة بنجاح", type: "success" }));
  //   navigate("/dashboard/package");
  // }

  return (
    <>
      {addCoursePopup && (
        <PopupLayout
          title={"اضافة مادة للدورة"}
          closePopup={closeAddCoursePopup}
        >
          <Formik
            initialValues={{
              name: "",
              count: "",
            }}
            validationSchema={SubjectSchema}
            onSubmit={addCourseToArray}
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
                <TextField
                  sx={{ background: ThemeColor.background }}
                  type="text"
                  size="small"
                  label="اسم المادة"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  value={values.name}
                  fullWidth
                />
                <TextField
                  sx={{
                    margin: "1rem 0",
                    background: ThemeColor.background,
                  }}
                  size="small"
                  label="عدد الجلسات بالاسبوع"
                  name="count"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!errors.count}
                  helperText={errors.count}
                  value={values.count}
                  fullWidth
                />
                <button type="submit" className="submitButton">
                  اضافة
                </button>
              </form>
            )}
          </Formik>
        </PopupLayout>
      )}
      <PanelHeader title={"اضافة دورة"} />
      {isLoading ? (
        <ChunkLayout>
          <Loader />
        </ChunkLayout>
      ) : (
        <Formik
          initialValues={{
            name: "",
            price: "",
            start: "",
            end: "",
            period: "",
          }}
          validationSchema={CourseSchema}
          onSubmit={AddPackageHandler}
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
              <ChunkLayout>
                <SectionLayout title={"المعلومات الاساسية"}>
                  <Stack
                    gap={"1rem"}
                    direction={"row"}
                    flexWrap={"wrap"}
                    my={"auto"}
                  >
                    <TextField
                      size="small"
                      label="اسم الدورة"
                      sx={{
                        flexBasis: { md: "48%", xs: "100%" },
                        background: ThemeColor.background,
                      }}
                      name="name"
                      // onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      value={values.name}
                    />
                    <TextField
                      size="small"
                      label="السعر"
                      sx={{
                        flexBasis: { md: "48%", xs: "100%" },
                        background: ThemeColor.background,
                      }}
                      name="price"
                      // onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!errors.price}
                      helperText={errors.price}
                      value={values.price}
                    />
                    <TextField
                      size="small"
                      label="موعد بدء الدورة"
                      sx={{
                        flexBasis: { md: "48%", xs: "100%" },
                        background: ThemeColor.background,
                      }}
                      name="start"
                      // onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!errors.start}
                      helperText={errors.start}
                      value={values.start}
                    />
                    <TextField
                      size="small"
                      label="موعد انتهاء الدورة"
                      sx={{
                        flexBasis: { md: "48%", xs: "100%" },
                        background: ThemeColor.background,
                      }}
                      name="end"
                      // onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!errors.end}
                      helperText={errors.end}
                      value={values.end}
                    />
                    <TextField
                      size="small"
                      label="المدة"
                      sx={{
                        flexBasis: { md: "48%", xs: "100%" },
                        background: ThemeColor.background,
                      }}
                      name="period"
                      // onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!errors.period}
                      helperText={errors.period}
                      value={values.period}
                    />
                    <FormControl
                      sx={{
                        flexBasis: { md: "15%", xs: "100%" },
                      }}
                      fullWidth
                    >
                      <InputLabel id="demo-simple-select-label">
                        الواحدة
                      </InputLabel>
                      <Select
                        sx={{ background: "#fff" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="الواحدة"
                        size={"small"}
                        onChange={handleUnitChange}
                        value={unit}
                      >
                        {units?.map((item, i) => {
                          return (
                            <MenuItem
                              key={i}
                              sx={{ zIndex: "2005" }}
                              value={item.value}
                            >
                              {item.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Stack>
                </SectionLayout>
              </ChunkLayout>
              <ChunkLayout>
                <SectionLayout title={"مواد الدورة"}>
                  <Stack gap={"1.5rem"} direction={"row"} flexWrap={"wrap"}>
                    <AddingBox onClick={openAddCoursePopup}>
                      اضافة مادة
                    </AddingBox>
                    {courses.map((item, i) => {
                      return (
                        <CourseBox
                          removeCourse={removeCourse}
                          key={item.id}
                          id={item.id}
                          name={item.name}
                          count={item.number_sessions_per_week}
                        />
                      );
                    })}
                  </Stack>
                </SectionLayout>
              </ChunkLayout>

              <Box m={"1rem"}>
                <button
                  style={{ fontSize: "1rem" }}
                  className="submitButton"
                  type="submit"
                >
                  اضافة الدورة
                </button>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </>
  );
};

export default AddPackage;

const SubjectSchema = Yup.object({
  name: Yup.string().required("هذا الحقل مطلوب"),
  count: Yup.number("يجب ان يكون رقم")
    .typeError("يجب ان يكون رقم")
    .required("هذا الحقل مطلوب")
    .test("format", "يجب أن يكون بالتنسيق YYYY-M-D", (value) => {
      if (value > 0) return true;
      return false;
    }),
});

const CourseSchema = Yup.object({
  name: Yup.string().required("هذا الحقل مطلوب"),
  price: Yup.number()
    .typeError("يجب ان يكون رقم")
    .required("هذا الحقل مطلوب")
    .test("format", "يجب ان يكون عدد موجب", (value) => {
      if (value > 0) return true;
      return false;
    }),
  period: Yup.number("يجب ان يكون رقم")
    .typeError("يجب ان يكون رقم")
    .required("هذا الحقل مطلوب")
    .test("format", "يجب ان يكون عدد موجب", (value) => {
      if (value > 0) return true;
      return false;
    }),
  start: Yup.string()
    .typeError("يجب ان يكون تاريخ صالح من الشكل y-m-d")
    .required("هذا الحقل مطلوب")
    .test("format", "يجب أن يكون بالتنسيق YYYY-M-D", (value) => {
      const regex = /^\d{4}-\d{1,2}-\d{1,2}$/;
      return regex.test(value);
    }),

  end: Yup.string()
    .typeError("يجب ان يكون تاريخ صالح من الشكل y-m-d")
    .required("هذا الحقل مطلوب")
    .test("format", "يجب أن يكون بالتنسيق YYYY-M-D", (value) => {
      const regex = /^\d{4}-\d{1,2}-\d{1,2}$/;
      return regex.test(value);
    }),
});

const units = [
  { name: "شهر", value: "month" },
  { name: "اسبوع", value: "week" },
  { name: "ساعة", value: "hour" },
  { name: "يوم", value: "day" },
];
