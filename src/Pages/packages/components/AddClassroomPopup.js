import React from "react";
import { Stack, TextField } from "@mui/material";
import PopupLayout from "../../../Layout/PopupLayout";
import * as Yup from "yup";
import { Formik } from "formik";
import { ThemeColor } from "../../../Assets/Theme/Theme";
import {
  useAddClassroomMutation,
  useEditClassroomMutation,
} from "../../../Redux/Api/PackageApi";
import { useParams } from "react-router-dom";
import Loader from "../../../UI/Loader";
import { useDispatch } from "react-redux";
import { openAlert } from "../../../Redux/Slices/AlertSlice";
const AddClassroomPopup = ({
  classroomPopup,
  closeClassroomPopup,
  isEdit,
  oldValues,
  refetchclasses,
}) => {
  const { id } = useParams();
  const [addClassroom, { isLoading }] = useAddClassroomMutation();
  const [editClassroom, { isLoading: isLoadingEdit }] =
    useEditClassroomMutation();
  const dispatch = useDispatch();
  const handleOnSubmit = (values) => {
    if (isEdit) {
      editClassroom({ id: oldValues.id, ...values, semester_id: id }).then(
        (r) => {
          if (r.error) {
            dispatch(
              openAlert({
                message: r?.error?.data?.message,
                type: "error",
              })
            );
          } else {
            dispatch(
              openAlert({
                message: "تم تعديل الشعبة بنجاح",
                type: "success",
              })
            );
            closeClassroomPopup();
            refetchclasses();
          }
        }
      );
    } else {
      addClassroom({ ...values, semester_id: id }).then((r) => {
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
              message: "تم اضافة الشعبة بنجاح",
              type: "success",
            })
          );
          closeClassroomPopup();
        }
      });
    }
  };

  return (
    <>
      {classroomPopup && (
        <PopupLayout
          closePopup={closeClassroomPopup}
          title={isEdit ? "تعديل اسم الشعبة" : "اضافة شعبة"}
        >
          {isLoading || isLoadingEdit ? (
            <Loader />
          ) : (
            <Formik
              initialValues={{
                name: isEdit ? oldValues.name : "",
              }}
              validationSchema={validateClassroom}
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
                      label="اسم الشعبة"
                      sx={{
                        boxShadow: ThemeColor.boxShadow,
                        background: ThemeColor.background,
                      }}
                      name="name"
                      // onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      value={values.name}
                    />
                  </Stack>
                  <button type="submit" className="submitButton">
                    {isEdit ? "تعديل" : "موافق"}
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

export default AddClassroomPopup;

const validateClassroom = Yup.object({
  name: Yup.string().required("هذا الحقل مطلوب"),
});
