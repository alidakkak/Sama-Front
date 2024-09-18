import React from "react";
import PopupLayout from "../../../Layout/PopupLayout";
import { Formik } from "formik";
import { Box, Button, TextField } from "@mui/material";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import Loader from "../../../UI/Loader";
import { useDispatch } from "react-redux";
import { openAlert } from "../../../Redux/Slices/AlertSlice";
import { useAddTeacherPaymentMutation } from "../../../Redux/Api/TeachersApi";
import { ThemeColor } from "../../../Assets/Theme/Theme";

const AddTeacherCheckPopup = ({ closeAddCheckPopup }) => {
  const [addTeacherPayment, { isLoading }] = useAddTeacherPaymentMutation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const submitAddCheck = (values) => {
    const data = { ...values, teacher_id: id };
    addTeacherPayment(data)
      .then((e) => {
        if (e.error) {
          dispatch(
            openAlert({ message: e?.error?.data?.message, type: "error" })
          );
        } else if (e.data) {
          dispatch(
            openAlert({ message: "تم اضافة الدفعة بنجاح", type: "success" })
          );
        }
        closeAddCheckPopup();
      })
      .catch((error) => {
        dispatch(openAlert({ message: "لقد حدث خطأ", type: "error" }));
      });
  };

  return (
    <>
      <PopupLayout title={"اضافة دفعة اضاقية "} closePopup={closeAddCheckPopup}>
        {isLoading ? (
          <Loader />
        ) : (
          <Formik
            initialValues={{
              title: "",
              price: "",
              description: "",
            }}
            validationSchema={checkSchema}
            onSubmit={submitAddCheck}
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
                  label="العنوان"
                  name="title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!errors.title}
                  helperText={errors.title}
                  value={values.title}
                  fullWidth
                />
                <TextField
                  sx={{
                    margin: "1rem 0",
                    background: ThemeColor.background,
                  }}
                  size="small"
                  label="المبلغ المدفوع"
                  name="price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!errors.price}
                  helperText={errors.price}
                  value={values.price}
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

export default AddTeacherCheckPopup;

const checkSchema = Yup.object({
  title: Yup.string().required("هذا الحقل مطلوب"),
  price: Yup.number("يجب ان يكون رقم")
    .typeError("يجب ان يكون رقم")
    .required("هذا الحقل مطلوب"),
});
