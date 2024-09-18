import React, { useEffect, useState } from "react";
import PanelHeader from "../../UI/PanelHeader";
import ChunkLayout from "../../Layout/ChunkLayout";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  useCalcStudentCheckMutation,
  useGetPackageDetailsQuery,
} from "../../Redux/Api/PackageApi";
import Loader from "../../UI/Loader";
import SelectSubjects from "./Components/SelectSubjects";
import MUITable from "../../UI/MUITable";
import debounce from "lodash.debounce";

import { ThemeColor } from "../../Assets/Theme/Theme";

import { openAlert } from "../../Redux/Slices/AlertSlice";
import { useDispatch } from "react-redux";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useUpdateRegistrationMutation } from "../../Redux/Api/StudentApi";

const UpdateRegister = () => {
  const [allSession, setAllSession] = useState(0);

  const [validationMessage, setValidationMessage] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const { id } = useParams();

  const navigate = useNavigate();

  const semester_id = searchParams.get("semester_id");
  const student_id = searchParams.get("student_id");
  const studentName = searchParams.get("student_name");

  const [classroom, setClassroom] = useState("");
  const [discount, setDiscount] = useState(0);
  const [amountOfDelay, setAmountOfDelay] = useState(0);

  const handleChangeDiscount = (event) => {
    setDiscount(event.target.value);
  };
  const handleChangeAmountOfDelay = (event) => {
    setAmountOfDelay(event.target.value);
  };

  const [inputs, setinputs] = useState({
    rounding_threshold: 1,
    percentage_increase_over_the_default_price: 0,
  });

  const handleChangeInputs = (e) => {
    setinputsDebounced({ ...inputs, [e.target.name]: e.target.value });
  };

  const [subjectsIds, setSubjectIds] = useState([]);
  const handleSelectSubject = (id, all) => {
    if (all) {
      if (!subjectsIds.includes(id)) {
        setSubjectIds((prev) => {
          return [...prev, id];
        });
      }
      return;
    }
    if (!subjectsIds.includes(id)) {
      setSubjectIds((prev) => {
        return [...prev, id];
      });
    } else {
      setSubjectIds((prev) => {
        const newIds = prev.filter((item) => {
          return item !== id;
        });

        return newIds;
      });
    }
  };

  const handleChangeClassroom = (event) => {
    setClassroom(event.target.value);
  };

  const {
    data: packageDetails,
    isLoading: isLodingPackageDetails,
    refetch,
    isFetching,
    isSuccess: isSuccessDetails,
  } = useGetPackageDetailsQuery(semester_id);

  const [calcStudentCheck, { isLoading: isLoadingCalc, data: dataCalc }] =
    useCalcStudentCheckMutation();

  useEffect(() => {
    calcStudentCheck({
      ...inputs,
      total_number_of_sessions: allSession,
      price: packageDetails?.data?.price,
    });
  }, [inputs, allSession]);

  const setinputsDebounced = debounce((data) => {
    setinputs(data);
  }, 300);

  useEffect(() => {
    if (isSuccessDetails) {
      const total_number_of_sessions = calcAllSessions(
        packageDetails?.data?.subjects
      );
      setAllSession(total_number_of_sessions);
      setClassroom(packageDetails.data?.classrooms[0]?.id);
    }
  }, [isSuccessDetails]);

  // update

  const [updateRegistration, { isLoading: isLoadingRegister }] =
    useUpdateRegistrationMutation();

  const dispatch = useDispatch();

  const sessionsSelected = calcTheSessions(
    subjectsIds,
    packageDetails?.data?.subjects
  );
  const financialDues = dataCalc?.table[sessionsSelected - 1]?.rounded_price;

  const registerHandler = () => {
    if (subjectsIds.length === 0) {
      setValidationMessage("الرجاء اختيار مادة على الاقل");
      return;
    }

    const total_number_of_sessions = calcAllSessions(
      packageDetails.data.subjects
    );
    const subjects = subjectsIds.map((item) => {
      return { subject_id: item };
    });

    const data = {
      id,
      classroom_id: classroom,
      student_id,
      semester_id,
      subjects,
      total_number_of_sessions,
      financialDues,
      amountOfDelay,
    };

    if (discount != 0) {
      data.scholarship_id = discount;
    }

    if (subjectsIds.length === packageDetails?.data?.subjects.length) {
      data.isComplete = true;
    }

    updateRegistration(data)
      .then((e) => {
        if (e.error) {
          dispatch(
            openAlert({ message: e?.error?.data?.message, type: "error" })
          );
        } else if (e.data) {
          dispatch(openAlert({ message: "تم التعديل بنجاح", type: "success" }));
          navigate(-1);
        }
      })
      .catch((error) => {
        dispatch(openAlert({ message: "لقد حدث خطأ", type: "error" }));
      });
    setValidationMessage(null);
  };

  return (
    <div>
      <PanelHeader title={"تعديل التسجيل"} center={true} />

      {isLoadingRegister ? (
        <Loader />
      ) : (
        <>
          <Grid spacing={4} direction={"row"} container>
            <Grid md={4} item>
              <>
                <ChunkLayout>
                  {isLodingPackageDetails || isFetching ? (
                    <Loader />
                  ) : (
                    <Box>
                      <SelectSubjects
                        handleSelectSubject={handleSelectSubject}
                        subjects={packageDetails?.data?.subjects}
                        subjectsIds={subjectsIds}
                        packageDetails={packageDetails}
                      />
                      <Typography
                        sx={{
                          textAlign: "right",
                          fontSize: "0.7rem",
                          marginTop: "0.4rem",
                        }}
                      >
                        عدد الجلسات{" "}
                        {calcTheSessions(
                          subjectsIds,
                          packageDetails?.data?.subjects
                        )}
                      </Typography>
                    </Box>
                  )}
                </ChunkLayout>

                <ChunkLayout>
                  <TextField
                    label={"نسبة الزيادة على السعر الافتراضي"}
                    type="number"
                    size="small"
                    name="percentage_increase_over_the_default_price"
                    inputProps={{ min: 0, max: 100 }}
                    fullWidth
                    sx={{
                      background: ThemeColor.background,
                    }}
                    onChange={handleChangeInputs}
                    defaultValue={0}
                  />
                </ChunkLayout>

                <ChunkLayout>
                  <TextField
                    inputProps={{ min: 1 }}
                    label={"عتبة التقريب"}
                    sx={{
                      background: ThemeColor.background,
                    }}
                    name="rounding_threshold"
                    type="number"
                    size="small"
                    fullWidth
                    onChange={handleChangeInputs}
                    defaultValue={1}
                  />
                </ChunkLayout>

                <ChunkLayout>
                  {isLodingPackageDetails || isFetching ? (
                    <Loader />
                  ) : (
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        اختر حسم
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={discount}
                        label="اختر حسم"
                        onChange={handleChangeDiscount}
                        size={"small"}
                      >
                        <MenuItem value={0}>لايوجد</MenuItem>
                        {packageDetails?.data?.scholarship.map((item) => {
                          return (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  )}
                  {financialDues == undefined || discount == 0 ? (
                    <></>
                  ) : (
                    <Box sx={{ fontSize: "0.4rem" }}>
                      <Typography
                        sx={{
                          textAlign: "right",
                          fontSize: "0.8rem",
                          fontWeight: "bold",
                          color: "#333",
                        }}
                      >
                        حسم بقيمة{" "}
                        <span style={{ color: ThemeColor.main }}>
                          {" "}
                          {
                            getDiscount(
                              packageDetails?.data?.scholarship,
                              discount
                            )?.discount
                          }{" "}
                        </span>
                        ليرة
                      </Typography>
                      <Typography
                        sx={{
                          textAlign: "right",
                          fontSize: "0.8rem",
                          fontWeight: "bold",
                          color: "#333",
                        }}
                      >
                        السعر بعد الحسم{" "}
                        <span style={{ color: ThemeColor.main }}>
                          {" "}
                          {financialDues -
                            getDiscount(
                              packageDetails?.data?.scholarship,
                              discount
                            )?.discount}{" "}
                        </span>
                        ليرة
                      </Typography>
                    </Box>
                  )}
                </ChunkLayout>

                <ChunkLayout>
                  <TextField
                    label={"مدة التاخير علة الدورة"}
                    type="number"
                    size="small"
                    name="amountOfDelay"
                    inputProps={{ min: 0, max: 100 }}
                    sx={{
                      background: ThemeColor.background,
                    }}
                    fullWidth
                    onChange={handleChangeAmountOfDelay}
                    defaultValue={0}
                  />
                </ChunkLayout>

                <ChunkLayout>
                  {isLodingPackageDetails ? (
                    <Loader />
                  ) : (
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        اختر شعبة
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={classroom}
                        label="اختر شعبة"
                        onChange={handleChangeClassroom}
                        size={"small"}
                      >
                        {packageDetails?.data?.classrooms.map((item) => {
                          return (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  )}
                </ChunkLayout>

                <Box>
                  <Typography
                    sx={{
                      textAlign: "right",
                      color: "gray",
                      fontWeight: "bold",
                    }}
                  >
                    الطالبة <span style={{ color: "#333" }}>{studentName}</span>
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "right",
                      color: "gray",
                      fontWeight: "bold",
                    }}
                  >
                    الدورة{" "}
                    <span style={{ color: "#333" }}>
                      {packageDetails?.data?.name}
                    </span>
                  </Typography>
                </Box>
              </>
            </Grid>
            <Grid md={8} item>
              <ChunkLayout>
                {isLoadingCalc ? (
                  <Loader />
                ) : (
                  <MUITable
                    colorColumns={calcTheSessions(
                      subjectsIds,
                      packageDetails?.data?.subjects
                    )}
                    columns={columns}
                    data={dataCalc?.table}
                  />
                )}
              </ChunkLayout>
            </Grid>
          </Grid>
          <Divider sx={{ marginTop: "1rem" }} />

          <Button
            disabled={isLoadingCalc || isFetching}
            variant="contained"
            sx={{ display: "block", margin: "1rem 0 0 auto" }}
            onClick={registerHandler}
          >
            تسجيل الطالب
          </Button>
          <Typography
            sx={{
              color: "red",
              fontWeight: "bold",
              textAlign: "right",
              fontSize: "0.8rem",
              margin: "1rem 0",
            }}
          >
            {validationMessage}
          </Typography>
        </>
      )}
    </div>
  );
};

export default UpdateRegister;

const columns = [
  {
    name: "رقم الجلسة",
    key: "session_number",
  },
  {
    name: "سعر الجلسة",
    key: "session_price",
  },
  {
    name: "السعر التراكمي",
    key: "cumulative_price",
  },
  {
    name: "سعر التراكمي التقريب",
    key: "rounded_price",
  },
];

const calcTheSessions = (selected, orginal) => {
  const counts = orginal?.filter((item) => selected.includes(item.id));
  let sum = 0;
  for (let i = 0; i < counts?.length; i++) {
    const element = counts[i];
    sum += element.number_sessions_per_week;
  }
  return sum;
};

const calcAllSessions = (orginal) => {
  let sum = 0;
  for (let i = 0; i < orginal?.length; i++) {
    const element = orginal[i];
    sum += element.number_sessions_per_week;
  }
  return sum;
};

const getDiscount = (discounts, id) => {
  const discount = discounts?.find((item) => item.id == id);

  return discount;
};
