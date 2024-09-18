import React from "react";
import { Stack, TextField } from "@mui/material";
import PopupLayout from "../../../Layout/PopupLayout";
import * as Yup from "yup";
import { Formik } from "formik";
import { useAddExamToPackageMutation } from "../../../Redux/Api/PackageApi";
import { useParams } from "react-router-dom";
import Loader from "../../../UI/Loader";
import { useDispatch } from "react-redux";
import { openAlert } from "../../../Redux/Slices/AlertSlice";
import { ThemeColor } from "../../../Assets/Theme/Theme";
const AddExamPopup = ({ addExamPopup, closeExamPopup }) => {
  const { id } = useParams();
  const [addExamToPackage, { isLoading }] = useAddExamToPackageMutation();
  const dispatch = useDispatch();

  const handleOnSubmit = (values) => {
    addExamToPackage({ ...values, semester_id: id }).then((r) => {
      if (r.error) {
        dispatch(
          openAlert({
            message: r.error.data.message,
            type: "error",
          })
        );
      } else {
        dispatch(
          openAlert({
            message: "تم اضافة الامتحان بنجاح",
            type: "success",
          })
        );

        closeExamPopup();
      }
    });
  };

  return (
    <>
      {addExamPopup && (
        <PopupLayout closePopup={closeExamPopup} title={"اضافة امتحان"}>
          {isLoading ? (
            <Loader />
          ) : (
            <Formik
              initialValues={{
                name: "",
                percent: "",
              }}
              validationSchema={validateExam}
              onSubmit={handleOnSubmit}
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
                  <Stack sx={{ position: "relative" }} mb="1.5rem">
                    <TextField
                      size="small"
                      label="اسم الامتحان"
                      sx={{
                        margin: "0.5rem 0",
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
                      label="النسبة"
                      sx={{
                        margin: "0.5rem 0",
                        background: ThemeColor.background,
                      }}
                      name="percent"
                      // onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!errors.percent}
                      helperText={errors.percent}
                      value={values.percent}
                    />
                  </Stack>
                  <button type="submit" className="submitButton">
                    موافق
                  </button>
                </form>
              )}
            </Formik>
          )}
        </PopupLayout>
      )}
    </>
  );
};

export default AddExamPopup;

const validateExam = Yup.object({
  name: Yup.string().required("هذا الحقل مطلوب"),
  percent: Yup.number()
    .typeError("يجب ان يكون رقم")
    .required("هذا الحقل مطلوب")
    .test("format", "يجب ان تكون القيمة بين 0 الى 100", (value) => {
      if (value >= 0 && value <= 100) return true;
      return false;
    }),
});
