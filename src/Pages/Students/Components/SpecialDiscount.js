import React from "react";
import PopupLayout from "../../../Layout/PopupLayout";
import { Formik } from "formik";
import { Box, Button, TextField } from "@mui/material";
import * as Yup from "yup";
import Loader from "../../../UI/Loader";
import { useAddSpecialDiscountMutation } from "../../../Redux/Api/StudentApi";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openAlert } from "../../../Redux/Slices/AlertSlice";
import { ThemeColor } from "../../../Assets/Theme/Theme";

const SpecialDiscount = ({ closePopup, registration }) => {
  const [addSpecialDiscount, { isLoading }] = useAddSpecialDiscountMutation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const submit = (values) => {
    const data = { ...values, student: id, registrationID: registration.id };
    addSpecialDiscount(data)
      .then((e) => {
        if (e.error) {
          dispatch(
            openAlert({ message: e?.error?.data?.message, type: "error" })
          );
        } else if (e.data) {
          dispatch(openAlert({ message: "تم الحسم بنجاح", type: "success" }));
        }
        closePopup();
      })
      .catch((error) => {
        dispatch(openAlert({ message: "لقد حدث خطأ", type: "error" }));
      });
  };
  return (
    <PopupLayout title={"حسم خاص"} closePopup={closePopup}>
      {isLoading ? (
        <Loader />
      ) : (
        <Formik
          initialValues={{
            discount: "",
          }}
          validationSchema={schema}
          onSubmit={submit}
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
                sx={{
                  background: ThemeColor.background,
                }}
                size="small"
                label="الحسم"
                name="discount"
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!errors.discount}
                helperText={errors.discount}
                value={values.discount}
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
  );
};

export default SpecialDiscount;
const schema = Yup.object({
  discount: Yup.number("يجب ان يكون رقم")
    .typeError("يجب ان يكون رقم")
    .required("هذا الحقل مطلوب"),
});
