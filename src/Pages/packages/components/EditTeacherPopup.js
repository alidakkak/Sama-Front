import React from "react";
import PopupLayout from "../../../Layout/PopupLayout";
import Loader from "../../../UI/Loader";
import { useAddTeacherToSubjectInfoMutation } from "../../../Redux/Api/PackageApi";
import { useDispatch } from "react-redux";
import { openAlert } from "../../../Redux/Slices/AlertSlice";
import AddTeacherToSubjectForm from "./AddTeacherToSubjectForm";
const EditTeacherPopup = ({
  teacherPopup,
  closeTeacherPopup,
  classroom_id,
  subject_id,
  defaultValue,
}) => {
  const [addTeacherToSubject, { isLoading: isLoadingAdd }] =
    useAddTeacherToSubjectInfoMutation();
  const dispatch = useDispatch();

  const triggerApi = (teacherId) => {
    const data = { teacher_id: teacherId, classroom_id, subject_id };

    addTeacherToSubject(data)
      .then((e) => {
        if (e.error) {
          dispatch(
            openAlert({ message: e?.error?.data?.message, type: "error" })
          );
        } else if (e.data) {
          dispatch(
            openAlert({ message: "تم تعديل المدرس بنجاح", type: "success" })
          );
        }
      })
      .catch((error) => {
        dispatch(openAlert({ message: "لقد حدث خطأ", type: "error" }));
      });
  };

  return (
    <>
      <PopupLayout closePopup={closeTeacherPopup} title={"تعديل مدرس المادة"}>
        {isLoadingAdd ? (
          <Loader />
        ) : (
          <AddTeacherToSubjectForm
            defaultValue={defaultValue}
            triggerApi={triggerApi}
          />
        )}
      </PopupLayout>
    </>
  );
};

export default EditTeacherPopup;
