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
  TextField,
  Typography,
} from "@mui/material";
import {
  useCalcStudentCheckMutation,
  useGetPackageDetailsQuery,
  useGetPackageQuery,
  useRegisterStudentInPackageMutation,
} from "../../Redux/Api/PackageApi";
import Loader from "../../UI/Loader";
import MUITable from "../../UI/MUITable";
import debounce from "lodash.debounce";
import StudentList from "./Components/StudentList";
import { useSearchStudentQuery } from "../../Redux/Api/StudentApi";
import { openAlert } from "../../Redux/Slices/AlertSlice";
import { useDispatch } from "react-redux";
import RegisterInputs from "./Components/RegisterInputs";
import { ThemeColor } from "../../Assets/Theme/Theme";

const Register = () => {
  const [lPackage, setPackage] = useState(0);
  const [allSession, setAllSession] = useState(0);
  const [student, setStudent] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [validationMessage, setValidationMessage] = useState(null);

  const handleChangeStudent = (id) => {
    setStudent(id);
  };
  const handleChangeStudentName = (event) => {
    setStudentDebounced(event.target.value);
  };
  const handleChange = (event) => {
    setPackage(event.target.value);
  };
  const [classroom, setClassroom] = useState("");
  const [discount, setDiscount] = useState(0);
  const [amountOfDelay, setAmountOfDelay] = useState(0);

  const handleChangeClassroom = (event) => {
    setClassroom(event.target.value);
  };

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

  const {
    data: packages,
    isLoading: isLoadingPackages,
    isSuccess,
  } = useGetPackageQuery();

  const {
    data: packageDetails,
    isLoading: isLodingPackageDetails,
    refetch,
    isFetching,
    isSuccess: isSuccessDetails,
  } = useGetPackageDetailsQuery(lPackage);

  const {
    data: students,
    isLoding: isLoadingStudents,
    refetch: refetchStudents,
    isFetching: isFetchingStudents,
  } = useSearchStudentQuery(studentName);

  useEffect(() => {
    refetch(lPackage).then((e) => {
      if (e.data) {
        const total_number_of_sessions = calcAllSessions(
          e.data?.data?.subjects
        );
        setAllSession(total_number_of_sessions);
        setClassroom(e.data?.data?.classrooms[0]?.id);
        setSubjectIds([]);
      }
    });
    setDiscount(0);
  }, [lPackage]);

  useEffect(() => {
    if (isSuccess) {
      setPackage(packages.data[0].id);
      setClassroom(packages.data[0]?.classrooms[0]?.id);
    }
  }, [isSuccess]);

  const [calcStudentCheck, { isLoading: isLoadingCalc, data: dataCalc }] =
    useCalcStudentCheckMutation();

  useEffect(() => {
    calcStudentCheck({
      ...inputs,
      total_number_of_sessions: allSession,
      price: packageDetails?.data?.price,
    });
  }, [inputs, allSession]);

  useEffect(() => {
    refetchStudents(studentName);
    setStudent(null);
  }, [studentName]);

  const setinputsDebounced = debounce((data) => {
    setinputs(data);
  }, 300);

  const setStudentDebounced = debounce((data) => {
    setStudentName(data);
  }, 300);

  // register

  const [registerStudentInPackage, { isLoading: isLoadingRegister }] =
    useRegisterStudentInPackageMutation();

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
    if (student === null) {
      setValidationMessage("الرجاء اختيار الطالب");
      return;
    }
    const total_number_of_sessions = calcAllSessions(
      packageDetails.data.subjects
    );
    const subjects = subjectsIds.map((item) => {
      return { subject_id: item };
    });

    const data = {
      classroom_id: classroom,
      student_id: student,
      semester_id: packageDetails?.data?.id,
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

    registerStudentInPackage(data)
      .then((e) => {
        if (e.error) {
          dispatch(
            openAlert({ message: e?.error?.data?.message, type: "error" })
          );
        } else if (e.data) {
          dispatch(
            openAlert({ message: "تم تسجيل الطالب بنجاح", type: "success" })
          );
        }
      })
      .catch((error) => {
        dispatch(openAlert({ message: "لقد حدث خطأ", type: "error" }));
      });
    setValidationMessage(null);
  };

  return (
    <div>
      <PanelHeader title={"تسجيل طالب بدورة"} center={true} />
      {isLoadingPackages || isLoadingRegister ? (
        <Loader />
      ) : (
        <>
          <Grid spacing={4} direction={"row"} container>
            <Grid md={4} item>
              <RegisterInputs
                lPackage={lPackage}
                handleChange={handleChange}
                packages={packages}
                isLodingPackageDetails={isLodingPackageDetails}
                isFetching={isFetching}
                packageDetails={packageDetails}
                calcTheSessions={calcTheSessions}
                subjectsIds={subjectsIds}
                handleSelectSubject={handleSelectSubject}
                handleChangeInputs={handleChangeInputs}
                discount={discount}
                handleChangeDiscount={handleChangeDiscount}
                getDiscount={getDiscount}
                financialDues={financialDues}
                handleChangeAmountOfDelay={handleChangeAmountOfDelay}
              />
            </Grid>
            <Grid md={8} item>
              <>
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
              </>
            </Grid>
          </Grid>
          <Box sx={{ margin: "1rem 0" }}>
            <Divider />
          </Box>
          <Grid spacing={4} container>
            <Grid md={8} item>
              <ChunkLayout>
                <TextField
                  label={"اختر طالب"}
                  name="name_query"
                  type="text"
                  size="small"
                  sx={{
                    background: ThemeColor.background,
                  }}
                  onChange={handleChangeStudentName}
                  fullWidth
                />
                {isLoadingStudents || isFetchingStudents ? (
                  <Loader />
                ) : (
                  <StudentList
                    student={student}
                    students={students}
                    handleChangeStudent={handleChangeStudent}
                  />
                )}
              </ChunkLayout>
            </Grid>
            <Grid md={4} item>
              <ChunkLayout>
                {isLodingPackageDetails || isFetching ? (
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
                      sx={{ background: ThemeColor.background }}
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
            </Grid>
          </Grid>

          <Button
            disabled={
              isLoadingCalc ||
              isLoadingPackages ||
              isFetching ||
              isLoadingStudents ||
              isFetchingStudents
            }
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

export default Register;

export const columns = [
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

export const calcTheSessions = (selected, orginal) => {
  let doubled = false;
  for (let i = 0; i < orginal?.length; i++) {
    const subject = orginal[i];
    if (subject.number_sessions_per_week % 10 != 0) {
      doubled = true;
      break;
    }
  }

  const counts = orginal?.filter((item) => selected.includes(item.id));
  let sum = 0;
  for (let i = 0; i < counts?.length; i++) {
    const element = counts[i];
    sum += element.number_sessions_per_week;
  }
  return sum * 2;
};

export const calcAllSessions = (orginal) => {
  let sum = 0;
  for (let i = 0; i < orginal?.length; i++) {
    const element = orginal[i];
    sum += element.number_sessions_per_week;
  }

  return sum;
};

export const getDiscount = (discounts, id) => {
  const discount = discounts?.find((item) => item.id == id);

  return discount;
};
