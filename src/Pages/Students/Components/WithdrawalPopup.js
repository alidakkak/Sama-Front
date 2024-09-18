import React from "react";
import PopupLayout from "../../../Layout/PopupLayout";
import { Formik } from "formik";
import { Box, Button, TextField } from "@mui/material";
import * as Yup from "yup";
import Loader from "../../../UI/Loader";
import { useWithdrawMutation } from "../../../Redux/Api/StudentApi";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openAlert } from "../../../Redux/Slices/AlertSlice";
import { ThemeColor } from "../../../Assets/Theme/Theme";

const WithdrawalPopup = ({ closePopup, registration, refetch }) => {
  const [addSpecialDiscount, { isLoading }] = useWithdrawMutation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const submit = (values) => {
    const data = { ...values, student: id, registration_id: registration.id };
    addSpecialDiscount(data)
      .then((e) => {
        if (e.error) {
          dispatch(
            openAlert({ message: e?.error?.data?.message, type: "error" })
          );
        } else if (e.data) {
          dispatch(
            openAlert({ message: "تم سحب الطالب بنجاح", type: "success" })
          );
          refetch();
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
            number: "",
            value: "",
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

                  marginBottom: "1rem",
                }}
                size="small"
                label="عدد الوحدات التي داومها الطالب"
                name="number"
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!errors.number}
                helperText={errors.number}
                value={values.number}
                fullWidth
              />
              <TextField
                sx={{
                  background: ThemeColor.background,
                }}
                size="small"
                label="القيمة"
                name="value"
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!errors.value}
                helperText={errors.value}
                value={values.value}
                fullWidth
              />
              <Box sx={{ margin: "1rem 0 0", textAlign: "center" }}>
                <Button variant="contained" type="submit">
                  سحب الطالب
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </PopupLayout>
  );
};

export default WithdrawalPopup;
const schema = Yup.object({
  number: Yup.number("يجب ان يكون رقم")
    .typeError("يجب ان يكون رقم")
    .required("هذا الحقل مطلوب"),
  value: Yup.number("يجب ان يكون رقم")
    .typeError("يجب ان يكون رقم")
    .required("هذا الحقل مطلوب"),
});
