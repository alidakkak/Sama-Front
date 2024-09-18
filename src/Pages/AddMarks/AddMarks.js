import {
  Box,
  Stack,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
} from "@mui/material";
import React, { useEffect } from "react";
import PanelHeader from "../../UI/PanelHeader";
import { Formik } from "formik";
import * as Yup from "yup";
import ChunkLayout from "../../Layout/ChunkLayout";
import {
  useGetPackageDetailsQuery,
  useGetPackageStudentsQuery,
} from "../../Redux/Api/PackageApi";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Loader from "../../UI/Loader";
import Image from "../../Assets/images/facebook-anon-female-icon.jpg";
import StudentInfo from "./Components/StudentInfo";
import { ThemeColor } from "../../Assets/Theme/Theme";
import { useGetStudentsQuery } from "../../Redux/Api/MarksApi";
import { useAddMarksMutation } from "../../Redux/Api/StudentApi";
import { useDispatch } from "react-redux";
import { openAlert } from "../../Redux/Slices/AlertSlice";

const AddMarks = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const paramValue = searchParams.get("semester");

  const { data, isLoading, isSuccess } = useGetPackageStudentsQuery(paramValue);

  const [
    addMarks,
    { isLoading: addMarksLoading, isSuccess: isSuccessAddMarks },
  ] = useAddMarksMutation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [subjectId, setSubjectId] = React.useState("");

  const handleChangeSubject = (event) => {
    setSubjectId(event.target.value);
  };

  useEffect(() => {
    if (isSuccess) {
      setSubjectId(data?.data?.subjects[0]?.id);
    }
  }, [isSuccess]);

  const {
    data: students,
    isLoading: isLoadingStudents,
    isFetching,
    refetch: refetchStudents,
  } = useGetStudentsQuery({
    subject_id: subjectId,
    semester_id: paramValue,
    exam_id: id,
  });

  // Add Marks
  const onSubmitMarks = (values) => {
    const student_id = [];
    const result = [];

    for (const key in values) {
      if (key.includes("result")) {
        const [type, id] = key.split("_");
        student_id.push(+id);
        result.push(values[key]);
      }
    }

    const data = {
      student_id,
      result,
      date: values.date,
      subject_id: subjectId,
      exam_id: id,
      semester_id: paramValue,
    };

    addMarks(data)
      .then((e) => {
        if (e.error) {
          dispatch(
            openAlert({ message: e?.error?.data?.message, type: "error" })
          );
        }
      })
      .catch((error) => {
        dispatch(openAlert({ message: "لقد حدث خطأ", type: "error" }));
      });
  };

  if (isSuccessAddMarks) {
    dispatch(openAlert({ message: "تمت العلامات بنجاح", type: "success" }));
    navigate("/dashboard/package/" + paramValue);
  }

  useEffect(() => {
    refetchStudents({
      subject_id: subjectId,
      semester_id: paramValue,
      exam_id: id,
    });
  }, [subjectId]);
  console.log(students);

  return (
    <Box>
      <PanelHeader title={"اضافة علامات لامتحان"} center={true} />
      {isLoading || addMarksLoading ? (
        <Loader />
      ) : (
        <Formik
          initialValues={{
            date: "",
          }}
          validationSchema={marksSchema}
          onSubmit={onSubmitMarks}
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
              <ChunkLayout>
                <Stack
                  justifyContent={"space-between"}
                  direction={"row"}
                  flexWrap={"wrap"}
                  my={"auto"}
                >
                  <FormControl
                    sx={{
                      flexBasis: { md: "49%", xs: "100%" },
                      margin: "0.5rem 0",
                    }}
                    fullWidth
                  >
                    <InputLabel id="demo-simple-select-label">
                      اختيار مادة
                    </InputLabel>
                    <Select
                      sx={{ background: "#fff" }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="اختيار مادة"
                      size={"small"}
                      onChange={handleChangeSubject}
                      value={subjectId}
                      sx={{
                        background: ThemeColor.background,
                      }}
                    >
                      {data?.data?.subjects?.map((item, i) => {
                        return (
                          <MenuItem
                            key={item.id}
                            sx={{ zIndex: "2005" }}
                            value={item.id}
                          >
                            {`${item.name}`}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <TextField
                    size="small"
                    label="التاريخ"
                    sx={{
                      flexBasis: { md: "49%", xs: "100%" },
                      margin: "0.5rem 0",
                      background: ThemeColor.background,
                    }}
                    name="date"
                    // onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!errors.date}
                    helperText={errors.date}
                    value={values.date}
                  />
                </Stack>
              </ChunkLayout>

              <ChunkLayout>
                {isLoadingStudents || isFetching ? (
                  <Loader />
                ) : (
                  <Grid container spacing={2} sx={{ padding: "1rem 0.3rem" }}>
                    {students?.student?.length == 0 && (
                      <Typography sx={{ textAlign: "right", color: "gray" }}>
                        لا يوجد
                      </Typography>
                    )}
                    {students?.student?.map((item, i) => {
                      return (
                        <Grid key={i} xs={12} md={6} item>
                          <StudentInfo
                            i={i}
                            handleChange={handleChange}
                            item={{ ...item, image: Image }}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                )}
              </ChunkLayout>

              <Box m={"1rem"} sx={{ textAlign: "right" }}>
                <Button type={"submit"} variant="contained">
                  اضافة العلامات
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </Box>
  );
};

export default AddMarks;

const marksSchema = Yup.object({
  date: Yup.string()
    .typeError("يجب ان يكون تاريخ صالح من الشكل y-m-d")
    .required("هذا الحقل مطلوب")
    .test("format", "يجب أن يكون بالتنسيق YYYY-M-D", (value) => {
      const regex = /^\d{4}-\d{1,2}-\d{1,2}$/;
      return regex.test(value);
    }),
});
