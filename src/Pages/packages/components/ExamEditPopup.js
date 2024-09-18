import React from "react";
import { Stack, TextField } from "@mui/material";
import PopupLayout from "../../../Layout/PopupLayout";
import * as Yup from "yup";
import { Formik } from "formik";
import { useEditExamToPackageMutation } from "../../../Redux/Api/PackageApi";
import { useParams } from "react-router-dom";
import Loader from "../../../UI/Loader";
import { useDispatch } from "react-redux";
import { openAlert } from "../../../Redux/Slices/AlertSlice";
import { ThemeColor } from "../../../Assets/Theme/Theme";
const ExamEditPopup = ({ closePopup, oldData }) => {
  const { id } = useParams();
  const [EditExamToPackage, { isLoading }] = useEditExamToPackageMutation();

  const dispatch = useDispatch();

  const handleOnSubmit = (values) => {
    EditExamToPackage({ ...values, semester_id: id, exam_id: oldData.id }).then(
      (r) => {
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
              message: "تم تعديل الامتحان بنجاح",
              type: "success",
            })
          );

          closePopup();
        }
      }
    );
  };

  const fn = () => {};

  return (
    <PopupLayout closePopup={closePopup} title={"تعديل امتحان"}>
      {isLoading ? (
        <Loader />
      ) : (
        <Formik
          initialValues={{
            name: oldData?.name,
            percent: oldData?.percent,
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
  );
};

export default ExamEditPopup;

const validateExam = Yup.object({
  name: Yup.string(),
  percent: Yup.number()
    .typeError("يجب ان يكون رقم")
    .test("format", "يجب ان تكون القيمة بين 0 الى 100", (value) => {
      if (value >= 0 && value <= 100) return true;
      return false;
    }),
});
