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
import { useEditMarksMutation } from "../../../Redux/Api/StudentApi";
const EditMarkPopup = ({ closePopup, oldData }) => {
  const [editMarks, { isLoading }] = useEditMarksMutation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const handleOnSubmit = (values) => {
    editMarks({ ...values, mark_id: oldData.id, student_id: id }).then((r) => {
      if (r.error) {
        dispatch(
          openAlert({
            message: r.error?.data?.message,
            type: "error",
          })
        );
      } else {
        dispatch(
          openAlert({
            message: "تم تعديل العلامة بنجاح",
            type: "success",
          })
        );

        closePopup();
      }
    });
  };

  return (
    <PopupLayout closePopup={closePopup} title={"تعديل العلامة"}>
      {isLoading ? (
        <Loader />
      ) : (
        <Formik
          initialValues={{
            result: oldData?.result,
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
                  label="العلامة الجديدة"
                  sx={{
                    margin: "0.5rem 0",
                    background: ThemeColor.background,
                  }}
                  name="result"
                  // onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!errors.result}
                  helperText={errors.result}
                  value={values.result}
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

export default EditMarkPopup;

const validateExam = Yup.object({
  result: Yup.number()
    .typeError("يجب ان يكون رقم")
    .test("format", "يجب ان تكون القيمة بين 0 الى 100", (value) => {
      if (value >= 0 && value <= 100) return true;
      return false;
    }),
});
