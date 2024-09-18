import SectionHeader from "../../UI/SectionHeader";
import React, { useState } from "react";
import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import PanelHeader from "../../UI/PanelHeader";
import UploadPhoto from "../../UI/UploadPhoto";
import GradientBox from "../../UI/GradientBox";
import InfoTitle from "./Components/InfoTitle";
import ChunkLayout from "../../Layout/ChunkLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import { ThemeColor } from "../../Assets/Theme/Theme";
import {
  useEditStudentMutation,
  useGetStudentQuery,
} from "../../Redux/Api/StudentApi";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loader from "../../UI/Loader";
import { openAlert } from "../../Redux/Slices/AlertSlice";
import { inputBoxes, studentValidation } from "./RegisterStudent";

const EditStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const handleUpladPic = (image) => {
    setImage(image);
  };
  // get Student
  const { id } = useParams();
  const { data, isLoading } = useGetStudentQuery(id);
  const [device_user_id, setDeviceUserId] = useState(
    data?.data?.device_user_id
  );

  //edit studnet
  const [editStudent, { isLoading: isLoadingEdit, isSuccess }] =
    useEditStudentMutation();

  const handleSubmit = (values) => {
    const formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }
    if (image) formData.append("image", image);
    if (device_user_id) formData.append("device_user_id", device_user_id);

    formData.append("id", id);
    console.log(formData.get("id"));
    editStudent(formData).then((r) => {
      if (r.error) {
        dispatch(openAlert({ type: "error", message: r.error?.data?.message }));
      }
    });
  };
  if (isSuccess) {
    dispatch(
      openAlert({ type: "success", message: "تم تعديل معلومات الطالب بنجاح" })
    );
    navigate("/dashboard/student/" + id);
  }
  return (
    <Box>
      <PanelHeader title={"تعديل معلومات الطالب"} center={true} />
      {isLoading || isLoadingEdit ? (
        <Loader />
      ) : (
        <Formik
          initialValues={getInitialState(data.data)}
          onSubmit={handleSubmit}
          validationSchema={studentValidation}
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
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {" "}
                  <Grid
                    justifyContent={"end"}
                    direction={"row"}
                    columnSpacing={3}
                    container
                  >
                    {inputBoxes.map((item, i) => {
                      return (
                        <Grid key={i} md={i == 0 ? 6 : 3} sm={12} item>
                          <ChunkLayout>
                            <InfoTitle title={item.title} />

                            <Grid spacing={3} container>
                              {item.info.map((information, j) => {
                                return (
                                  <Grid
                                    key={j}
                                    md={i == 0 ? 6 : 12}
                                    sm={12}
                                    item
                                  >
                                    <TextField
                                      key={i}
                                      name={information.name}
                                      label={information.lable}
                                      fullWidth
                                      size="small"
                                      sx={{
                                        background: ThemeColor.background,
                                      }}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      touched={errors[information.name]}
                                      error={errors[information.name]}
                                      helperText={errors[information.name]}
                                      value={values[information.name]}
                                    />
                                  </Grid>
                                );
                              })}
                            </Grid>
                          </ChunkLayout>
                        </Grid>
                      );
                    })}
                    <Grid md={3} sm={12} item>
                      <ChunkLayout>
                        <InfoTitle title={"ملاحظات"} />

                        <TextField
                          fullWidth
                          type="string"
                          multiline
                          rows={7.5}
                          name={"note"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values["note"]}
                          sx={{
                            background: ThemeColor.background,

                            boxShadow: ThemeColor.boxShadow,
                          }}
                          label="ملاحظات"
                        />
                        <TextField
                          sx={{
                            background: ThemeColor.background,
                            marginTop: "1rem",
                          }}
                          fullWidth
                          size={"small"}
                          label={"معرف الربط مع جهاز البصمة"}
                          name={"device_user_id"}
                          onChange={(e) => {
                            setDeviceUserId(e?.target?.value);
                          }}
                          value={device_user_id}
                        />
                      </ChunkLayout>
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <Box sx={{ margin: "0 auto", width: "80%" }}>
                        <UploadPhoto
                          defaultImage={data.data.image}
                          handleUpladPic={handleUpladPic}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Box margin={"0 auto"} sx={{ textAlign: "center" }}>
                    <Button
                      onClick={() => {}}
                      variant="contained"
                      type="submit"
                    >
                      موافق
                    </Button>
                  </Box>
                </>
              )}
            </form>
          )}
        </Formik>
      )}
    </Box>
  );
};

export default EditStudent;

const getInitialState = (data) => {
  const inital = {};
  for (let i = 0; i < inputBoxes.length; i++) {
    const box = inputBoxes[i];
    for (let j = 0; j < box.info.length; j++) {
      const element = box.info[j];
      inital[element.name] = data[element.name] ? data[element.name] : "";
    }
    inital["note"] = data["note"] ? data["note"] : "";
  }

  return inital;
};
