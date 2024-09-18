import React from "react";
import PopupLayout from "../../../Layout/PopupLayout";
import { Formik } from "formik";
import { Box, Button, TextField } from "@mui/material";
import * as Yup from "yup";
import { useAddNoteToStudentMutation } from "../../../Redux/Api/StudentApi";
import { useParams } from "react-router-dom";
import Loader from "../../../UI/Loader";
import { useDispatch } from "react-redux";
import { openAlert } from "../../../Redux/Slices/AlertSlice";
import { ThemeColor } from "../../../Assets/Theme/Theme";

const AddNotePopup = ({ closeAddNotePopup, packageId }) => {
  const [addNoteToStudent, { isLoading }] = useAddNoteToStudentMutation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const submitAddNote = (values) => {
    const data = { ...values, student_id: id, semester_id: packageId };
    addNoteToStudent(data)
      .then((e) => {
        if (e.error) {
          dispatch(
            openAlert({ message: e?.error?.data?.message, type: "error" })
          );
        } else if (e.data) {
          dispatch(
            openAlert({ message: "تم ارسال الملاحظة بنجاح", type: "success" })
          );
        }
        closeAddNotePopup();
      })
      .catch((error) => {
        dispatch(openAlert({ message: "لقد حدث خطأ", type: "error" }));
      });
  };

  return (
    <>
      <PopupLayout title={"اضافة ملاحظة"} closePopup={closeAddNotePopup}>
        {isLoading ? (
          <Loader />
        ) : (
          <Formik
            initialValues={{
              title: "",
            }}
            validationSchema={noteSchema}
            onSubmit={submitAddNote}
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
                  label="الملاحظة"
                  name="title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!errors.title}
                  helperText={errors.title}
                  value={values.title}
                  fullWidth
                />

                <Box sx={{ margin: "1rem 0 0", textAlign: "center" }}>
                  <Button variant="contained" type="submit">
                    اضافة
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        )}
      </PopupLayout>
    </>
  );
};

export default AddNotePopup;

const noteSchema = Yup.object({
  title: Yup.string().required("هذا الحقل مطلوب"),
});
