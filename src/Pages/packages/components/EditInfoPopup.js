import React from "react";
import PopupLayout from "../../../Layout/PopupLayout";
import { Stack, TextField } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useEditPackageMutation } from "../../../Redux/Api/PackageApi";
import { useParams } from "react-router-dom";
import Loader from "../../../UI/Loader";
import { useDispatch } from "react-redux";
import { openAlert } from "../../../Redux/Slices/AlertSlice";
import { ThemeColor } from "../../../Assets/Theme/Theme";

const EditInfoPopup = ({ editPopup, closeEditPopup }) => {
  const { id } = useParams();
  const [editPackage, { isLoading, error, isSuccess }] =
    useEditPackageMutation();

  const handleSubmit = (values) => {
    editPackage({ ...values, id }).then((r) => {
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
            message: "تم التعديل بنجاح",
            type: "success",
          })
        );
        closeEditPopup();
      }
    });
  };
  const dispatch = useDispatch();
  let validation = {};
  if (
    editPopup.name == "start_date" ||
    editPopup.name == "end_date" ||
    editPopup.name == "actual_start_date" ||
    editPopup.name == "actual_completion_date"
  ) {
    validation = Yup.object({
      [editPopup.name]: Yup.string()
        .typeError("يجب ان يكون تاريخ صالح من الشكل y-m-d")
        .required("هذا الحقل مطلوب")
        .test("format", "يجب أن يكون بالتنسيق YYYY-M-D", (value) => {
          const regex = /^\d{4}-\d{1,2}-\d{1,2}$/;
          return regex.test(value);
        }),
    });
  } else {
    validation = Yup.object({
      [editPopup.name]: Yup.number()
        .typeError("يجب ان يكون رقم")
        .required("هذا الحقل مطلوب"),
    });
  }
  // if (isSuccess) {
  //   closeEditPopup();
  // }

  return (
    <>
      {editPopup.open && (
        <>
          <PopupLayout title={"تعديل المعلومات"} closePopup={closeEditPopup}>
            {isLoading ? (
              <Loader />
            ) : (
              <Formik
                onSubmit={handleSubmit}
                validationSchema={validation}
                initialValues={{ [editPopup.name]: editPopup.value }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <Stack justifyContent={"center"} mb="1rem">
                        <TextField
                          sx={{ background: ThemeColor.background }}
                          type="text"
                          size="small"
                          label={editPopup.label}
                          name={editPopup.name}
                          value={values[editPopup.name]}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!errors[editPopup.name]}
                          helperText={errors[editPopup.name]}
                        />
                      </Stack>
                      <button type="submit" className="submitButton">
                        تعديل
                      </button>
                    </form>
                  );
                }}
              </Formik>
            )}
          </PopupLayout>
        </>
      )}
    </>
  );
};

export default EditInfoPopup;
