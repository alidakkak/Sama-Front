import React from "react";
import ChunkLayout from "../../../Layout/ChunkLayout";
import SectionLayout from "../../../Layout/SectionLayout";
import { Stack, TextField } from "@mui/material";
import AddingBox from "../../../UI/AddingBox";
import CourseBox from "./CourseBox";
import PopupLayout from "../../../Layout/PopupLayout";
import { ThemeColor } from "../../../Assets/Theme/Theme";

const AddCourses = ({
  removeCourse,
  courses,
  addCourseToArray,
  addCoursePopup,
  closeAddCoursePopup,
  openAddCoursePopup,
}) => {
  return (
    <>
      {addCoursePopup && (
        <PopupLayout
          title={"اضافة مادة للدورة"}
          closePopup={closeAddCoursePopup}
        >
          <form onSubmit={addCourseToArray}>
            <TextField
              sx={{ background: ThemeColor.background }}
              type="text"
              size="small"
              label="اسم المادة"
              name="name"
              required
            />
            <TextField
              sx={{ margin: "1rem 0", background: ThemeColor.background }}
              type="number"
              size="small"
              label="عدد الجلسات بالاسبوع"
              name="count"
              required
              inputProps={{ min: 1 }}
            />
            <button type="submit" className="submitButton">
              اضافة
            </button>
          </form>
        </PopupLayout>
      )}

      <ChunkLayout>
        <SectionLayout title={"مواد الدورة"}>
          <Stack gap={"1.5rem"} direction={"row"} flexWrap={"wrap"}>
            <AddingBox onClick={openAddCoursePopup}>اضافة مادة</AddingBox>
            {courses.map((item, i) => {
              return (
                <CourseBox
                  removeCourse={removeCourse}
                  key={i}
                  id={i}
                  name={item.name}
                  count={item.number_sessions_per_week}
                />
              );
            })}
          </Stack>
        </SectionLayout>
      </ChunkLayout>
    </>
  );
};

export default AddCourses;
