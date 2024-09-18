import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import PanelHeader from "../../UI/PanelHeader";
import UploadPhoto from "../../UI/UploadPhoto";
import InfoTitle from "./Components/InfoTitle";
import ChunkLayout from "../../Layout/ChunkLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import { ThemeColor } from "../../Assets/Theme/Theme";
import { useAddStudentMutation } from "../../Redux/Api/StudentApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loader from "../../UI/Loader";
import { openAlert } from "../../Redux/Slices/AlertSlice";

import StudentCredentialsPopup from "./Components/StudentCredentialsPopup";

const RegisterStudent = () => {
  const [addStudent, { isLoading, isSuccess, data }] = useAddStudentMutation();
  const [device_user_id, setDeviceUserId] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const handleUpladPic = (image) => {
    setImage(image);
  };
  const handleSubmit = (values) => {
    const formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }
    if (device_user_id) formData.append("device_user_id", device_user_id);
    if (image) formData.append("image", image);
    addStudent(formData).then((r) => {
      if (r.error) {
        dispatch(openAlert({ type: "error", message: r.error?.data?.message }));
      }
    });
  };
  if (isSuccess) {
    dispatch(openAlert({ type: "success", message: "تمت اضافة الطالب بنجاح" }));
    // navigate("/dashboard/students");
  }
  return (
    <Box>
      {isSuccess && (
        <StudentCredentialsPopup
          password={data?.data?.token}
          phone_number={data?.data?.phone_number}
        />
      )}
      <PanelHeader title={"اضافة طالب"} center={true} />
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          location: "",
          marital_status: "",
          date_of_birth: "",
          father_name: "",
          fathers_mobile: "",
          previous_educational_status: "",
          place_of_birth: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={studentValidation}
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
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {" "}
                <Grid
                  justifyContent={"end"}
                  direction={"row"}
                  columnSpacing={3}
                  container
                  alignItems={"center"}
                >
                  {inputBoxes.map((item, i) => {
                    return (
                      <Grid key={i} md={i == 0 ? 6 : 3} sm={12} item>
                        <ChunkLayout>
                          <InfoTitle title={item.title} />

                          <Grid spacing={3} container>
                            {item.info.map((information, j) => {
                              return (
                                <Grid key={j} md={i == 0 ? 6 : 12} sm={12} item>
                                  <TextField
                                    name={information.name}
                                    label={information.lable}
                                    size="small"
                                    fullWidth
                                    sx={{
                                      background: ThemeColor.background,
                                    }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    touched={errors[information.name]}
                                    error={errors[information.name]}
                                    helperText={errors[information.name]}
                                    value={values[information.name]}
                                  />
                                </Grid>
                              );
                            })}
                          </Grid>
                        </ChunkLayout>
                      </Grid>
                    );
                  })}
                  <Grid md={3} sm={12} item>
                    <ChunkLayout>
                      <InfoTitle title={"ملاحظات"} />

                      <TextField
                        fullWidth
                        type="string"
                        multiline
                        rows={7.5}
                        name={"note"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values["note"]}
                        sx={{
                          background: ThemeColor.background,
                        }}
                        label="ملاحظات"
                      />
                      <TextField
                        sx={{
                          background: ThemeColor.background,
                          marginTop: "1rem",
                        }}
                        fullWidth
                        size={"small"}
                        label={"معرف الربط مع جهاز البصمة"}
                        name={"device_user_id"}
                        onChange={(e) => {
                          setDeviceUserId(e?.target?.value);
                        }}
                      />
                    </ChunkLayout>
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <Box sx={{ margin: "0 auto", width: "80%" }}>
                      <UploadPhoto handleUpladPic={handleUpladPic} />
                    </Box>
                  </Grid>
                </Grid>
                <Box margin={"1rem auto"} sx={{ textAlign: "center" }}>
                  <Button onClick={() => {}} variant="contained" type="submit">
                    موافق
                  </Button>
                </Box>
              </>
            )}
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterStudent;

export const inputBoxes = [
  {
    title: "المعلومات الاساسية",
    info: [
      { name: "first_name", lable: "الاسم الاول" },
      { name: "last_name", lable: "الاسم الاخير" },
      { name: "location", lable: "السكن" },
      { name: "place_of_birth", lable: "مكان الولادة" },
      { name: "marital_status", lable: "الحالة الاجتماعية" },
      {
        name: "previous_educational_status",

        lable: "الحالة الدراسية قبل التسجيل",
      },
      {
        name: "date_of_birth",

        lable: "المواليد",
      },
    ],
  },
  {
    title: "معلومات الاب",
    info: [
      { name: "father_name", lable: "اسم الاب" },
      { name: "father_work", lable: "العمل" },
      { name: "father_of_birth", lable: "العمر" },
      {
        name: "father_Healthy",

        lable: "الحالة الصحية",
      },
    ],
  },
  {
    title: "معلومات الام",
    info: [
      { name: "mother_name", lable: "اسم الام" },
      { name: "mother_work", lable: "العمل" },
      { name: "mother_of_birth", lable: "العمر" },
      {
        name: "mother_Healthy",

        lable: "الحالة الصحية",
      },
    ],
  },
  {
    title: "معلومات ولي امر اخر",
    info: [
      { name: "other_name", lable: "الاسم" },
      { name: "other_work", lable: "العمل" },
      { name: "other_of_birth", lable: "العمر" },
      {
        name: "other_Healthy",

        lable: "الحالة الصحية",
      },
    ],
  },
  {
    title: "معلومات التواصل",
    info: [
      { name: "student_phone_number", lable: "الموبايل" },
      { name: "telephone_number", lable: "الهاتف الارضي" },
      { name: "phone_number", lable: "رقم موبايل الاب" },
      {
        name: "facebook",

        lable: "الفيسبوك",
      },
    ],
  },
];

export const studentValidation = Yup.object({
  first_name: Yup.string().required("هذا الحقل مطلوب"),
  last_name: Yup.string().required("هذا الحقل مطلوب"),
  location: Yup.string().required("هذا الحقل مطلوب"),
  marital_status: Yup.string().required("هذا الحقل مطلوب"),
  date_of_birth: Yup.string()
    .typeError("يجب ان يكون تاريخ صالح من الشكل y-m-d")
    .required("هذا الحقل مطلوب")
    .test("format", "يجب أن يكون بالتنسيق YYYY-M-D", (value) => {
      const regex = /^\d{4}-\d{1,2}-\d{1,2}$/;
      return regex.test(value);
    }),
  father_of_birth: Yup.string()
    .typeError("يجب ان يكون تاريخ صالح من الشكل y-m-d")
    .test("format", "يجب أن يكون بالتنسيق YYYY-M-D", (value) => {
      if (!value) return true;
      const regex = /^$|^\d{4}-\d{1,2}-\d{1,2}$/;
      return regex.test(value);
    }),
  mother_of_birth: Yup.string()
    .typeError("يجب ان يكون تاريخ صالح من الشكل y-m-d")
    .test("format", "يجب أن يكون بالتنسيق YYYY-M-D", (value) => {
      if (!value) return true;

      const regex = /^$|^\d{4}-\d{1,2}-\d{1,2}$/;
      return regex.test(value);
    }),
  other_of_birth: Yup.string()
    .typeError("يجب ان يكون تاريخ صالح من الشكل y-m-d")
    .test("format", "يجب أن يكون بالتنسيق YYYY-M-D", (value) => {
      if (!value) return true;

      const regex = /^$|^\d{4}-\d{1,2}-\d{1,2}$/;
      return regex.test(value);
    }),
  father_name: Yup.string().required("هذا الحقل مطلوب"),
  phone_number: Yup.string()
    .required("هذا الحقل مطلوب")
    .test("format", "يجب ان يكون 10 ارقام", (value) => {
      if (value.length == 10) return true;

      const regex = /^$|^\d{4}-\d{1,2}-\d{1,2}$/;
      return regex.test(value);
    }),
  previous_educational_status: Yup.string().required("هذا الحقل مطلوب"),
  place_of_birth: Yup.string().required("هذا الحقل مطلوب"),
});
