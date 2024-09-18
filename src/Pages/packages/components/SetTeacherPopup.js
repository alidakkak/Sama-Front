import React from "react";

import PopupLayout from "../../../Layout/PopupLayout";

import Loader from "../../../UI/Loader";
import { useAddTeacherToSubjectInfoMutation } from "../../../Redux/Api/PackageApi";
import { useDispatch } from "react-redux";
import { openAlert } from "../../../Redux/Slices/AlertSlice";
import AddTeacherToSubjectForm from "./AddTeacherToSubjectForm";
const SetTeacherPopup = ({ closeTeacherPopup, classroom_id, subject_id }) => {
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
            openAlert({ message: "تم تعيين المعلم بنجاح", type: "success" })
          );
        }
      })
      .catch((error) => {
        dispatch(openAlert({ message: "لقد حدث خطأ", type: "error" }));
      });
  };

  return (
    <>
      <PopupLayout closePopup={closeTeacherPopup} title={"تعيين استاذ"}>
        {isLoadingAdd ? (
          <Loader />
        ) : (
          <AddTeacherToSubjectForm triggerApi={triggerApi} />
        )}
      </PopupLayout>
    </>
  );
};

export default SetTeacherPopup;
