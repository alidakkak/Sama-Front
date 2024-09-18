import React from "react";
import PopupLayout from "../Layout/PopupLayout";
import { Formik } from "formik";
import { TextField } from "@mui/material";
import * as Yup from "yup";
import { useEditCheckToStudentMutation } from "../Redux/Api/StudentApi";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { openAlert } from "../Redux/Slices/AlertSlice";
import { ThemeColor } from "../Assets/Theme/Theme";

const EditCheckPopup = ({ closePopup, oldData }) => {
  const [editCheckToStudent, { isLoading }] = useEditCheckToStudentMutation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const submitAddCheck = (values) => {
    const data = { ...values, student_id: id, payment_id: oldData?.id };
    editCheckToStudent(data)
      .then((e) => {
        if (e.error) {
          dispatch(
            openAlert({ message: e?.error?.data?.message, type: "error" })
          );
        } else if (e.data) {
          dispatch(
            openAlert({ message: "تم تعديل الدفعة بنجاح", type: "success" })
          );
        }
        closePopup();
      })
      .catch((error) => {
        dispatch(openAlert({ message: "لقد حدث خطأ", type: "error" }));
      });
  };

  return (
    <>
      <PopupLayout title={"تعديل دفعة للطالب"} closePopup={closePopup}>
        {isLoading ? (
          <Loader />
        ) : (
          <Formik
            initialValues={{
              title: oldData?.title,
              price: oldData?.price,
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
                  sx={{
                    background: ThemeColor.background,
                  }}
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
                <button type="submit" className="submitButton">
                  اضافة
                </button>
              </form>
            )}
          </Formik>
        )}
      </PopupLayout>
    </>
  );
};

export default EditCheckPopup;

const checkSchema = Yup.object({
  title: Yup.string().required("هذا الحقل مطلوب"),
  price: Yup.number("يجب ان يكون رقم")
    .typeError("يجب ان يكون رقم")
    .required("هذا الحقل مطلوب"),
});
