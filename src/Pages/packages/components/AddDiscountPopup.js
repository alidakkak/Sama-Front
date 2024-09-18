import React from "react";
import PopupLayout from "../../../Layout/PopupLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAddDiscountMutation } from "../../../Redux/Api/PackageApi";
import { useDispatch } from "react-redux";
import { openAlert } from "../../../Redux/Slices/AlertSlice";
import Loader from "../../../UI/Loader";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { ThemeColor } from "../../../Assets/Theme/Theme";

const AddDiscountPopup = ({ closePopup }) => {
  const { id } = useParams();
  const [addDiscount, { isLoading, isSuccess, isError }] =
    useAddDiscountMutation();
  const dispatch = useDispatch();

  const AddDiscountHandler = (values) => {
    addDiscount({ ...values, semester_id: id })
      .then((e) => {
        if (e.error) {
          dispatch(
            openAlert({ message: e?.error?.data?.message, type: "error" })
          );
        } else {
          dispatch(
            openAlert({
              message: "تم اضافة الحسم بنجاح",
              type: "success",
            })
          );

          closePopup();
        }
      })
      .catch((error) => {
        dispatch(openAlert({ message: "لقد حدث خطأ", type: "error" }));
      });
  };

  return (
    <PopupLayout closePopup={closePopup} title={"اضافة حسم"}>
      {isLoading ? (
        <Loader />
      ) : (
        <Formik
          initialValues={{
            name: "",
            discount: "",
            description: "",
          }}
          validationSchema={DiscountSchema}
          onSubmit={AddDiscountHandler}
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
              <Stack my={"auto"}>
                <TextField
                  size="small"
                  label="اسم الحسم"
                  sx={{
                    flexBasis: { md: "49%", xs: "100%" },
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
                  label="المبلغ"
                  sx={{
                    flexBasis: { md: "49%", xs: "100%" },
                    margin: "0.5rem 0",
                    background: ThemeColor.background,
                  }}
                  name="discount"
                  // onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!errors.discount}
                  helperText={errors.discount}
                  value={values.discount}
                />
                <TextField
                  size="small"
                  label="وصف الحسم"
                  sx={{
                    flexBasis: { xs: "100%" },
                    margin: "0.5rem 0",
                    background: ThemeColor.background,
                  }}
                  rows={4}
                  multiline
                  name="description"
                  // onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!errors.description}
                  helperText={errors.description}
                  value={values.description}
                />
              </Stack>

              <Box m={"1rem"} sx={{ textAlign: "right" }}>
                <Button type={"submit"} variant="contained">
                  اضافة الحسم
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </PopupLayout>
  );
};

export default AddDiscountPopup;

const DiscountSchema = Yup.object({
  name: Yup.string().required("هذا الحقل مطلوب"),
  description: Yup.string().required("هذا الحقل مطلوب"),
  discount: Yup.number()
    .typeError("يجب ان يكون رقم")
    .required("هذا الحقل مطلوب")
    .test("format", "يجب ان يكون عدد موجب ", (value) => {
      if (value >= 1) return true;
      return false;
    }),
});
