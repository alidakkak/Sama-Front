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
  useQuickRegistrationMutation,
} from "../../Redux/Api/PackageApi";
import Loader from "../../UI/Loader";
import MUITable from "../../UI/MUITable";
import debounce from "lodash.debounce";
import * as Yup from "yup";
import { openAlert } from "../../Redux/Slices/AlertSlice";
import { useDispatch } from "react-redux";
import RegisterInputs from "./Components/RegisterInputs";
import { ThemeColor } from "../../Assets/Theme/Theme";
import {
  calcAllSessions,
  calcTheSessions,
  columns,
  getDiscount,
} from "./Register";
import SectionHeader from "../../UI/SectionHeader";
import { Formik } from "formik";
import StudentCredentialsPopup from "../Students/Components/StudentCredentialsPopup";

const QuickStudentRegister = () => {
  const [lPackage, setPackage] = useState(0);
  const [allSession, setAllSession] = useState(0);
  const [validationMessage, setValidationMessage] = useState(null);

  const handleChangePackage = (event) => {
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
      setPackage(packages?.data[0]?.id);
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

  const setinputsDebounced = debounce((data) => {
    setinputs(data);
  }, 300);

  // register

  const [
    quickRegistration,
    {
      isLoading: isLoadingRegister,
      data: responseQuickData,
      isSuccess: isSuccessQuick,
    },
  ] = useQuickRegistrationMutation();

  const dispatch = useDispatch();

  const sessionsSelected = calcTheSessions(
    subjectsIds,
    packageDetails?.data?.subjects
  );
  const financialDues = dataCalc?.table[sessionsSelected - 1]?.rounded_price;

  const registerHandler = (values) => {
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
      classroom_id: classroom,
      semester_id: packageDetails?.data?.id,
      subjects,
      total_number_of_sessions,
      financialDues,
      amountOfDelay,
      ...values,
    };

    if (discount != 0) {
      data.scholarship_id = discount;
    }

    if (subjectsIds.length === packageDetails?.data?.subjects.length) {
      data.isComplete = true;
    }

    quickRegistration(data)
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
      <PanelHeader title={"اضافة و تسجيل طالب بدورة "} center={true} />
      {isLoadingPackages || isLoadingRegister ? (
        <Loader />
      ) : (
        <>
          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
              phone_number: "",
            }}
            validationSchema={studentValidation}
            onSubmit={registerHandler}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <>
                {packageDetails?.data?.classrooms?.length == 0 ? (
                  <Typography sx={{ textAlign: "center" }}>
                    لا يوجد شعبة , الرجاء اضافة شعبة للدورة
                  </Typography>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <ChunkLayout>
                      <SectionHeader title={"معلومات الطالب"} />

                      <Grid spacing={1} container>
                        <Grid md={3} item>
                          <TextField
                            sx={{ background: ThemeColor.background }}
                            type="text"
                            size="small"
                            label="الاسم الاول"
                            name="first_name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!errors.first_name}
                            helperText={errors.first_name}
                            value={values.first_name}
                            fullWidth
                          />
                        </Grid>
                        <Grid md={3} item>
                          <TextField
                            sx={{
                              background: ThemeColor.background,
                            }}
                            size="small"
                            label="الاسم الاخير"
                            name="last_name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!errors.last_name}
                            helperText={errors.last_name}
                            value={values.last_name}
                            fullWidth
                          />
                        </Grid>

                        <Grid md={3} item>
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
                              disabled={isLodingPackageDetails || isFetching}
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
                        </Grid>
                        <Grid md={3} item>
                          <TextField
                            sx={{
                              background: ThemeColor.background,
                            }}
                            size="small"
                            label="رقم موبايل الاب"
                            name="phone_number"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!errors.phone_number}
                            helperText={errors.phone_number}
                            value={values.phone_number}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </ChunkLayout>

                    <Grid spacing={4} direction={"row"} container>
                      <Grid md={4} item>
                        <RegisterInputs
                          lPackage={lPackage}
                          handleChange={handleChangePackage}
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
                      <Grid mt={"0.5rem"} md={8} item>
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

                    <Button
                      disabled={
                        isLoadingCalc || isLoadingPackages || isFetching
                      }
                      variant="contained"
                      sx={{ display: "block", margin: "1rem 0 0 auto" }}
                      type="submit"
                    >
                      تسجيل الطالب
                    </Button>
                  </form>
                )}
              </>
            )}
          </Formik>

          {isSuccessQuick && (
            <Typography
              sx={{
                color: "green",
                fontWeight: "bold",
                textAlign: "right",
                fontSize: "0.8rem",
                margin: "1rem 0",
              }}
            >
              كلمة السر : {responseQuickData?.password}
            </Typography>
          )}
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

const studentValidation = Yup.object({
  first_name: Yup.string().required("هذا الحقل مطلوب"),
  last_name: Yup.string().required("هذا الحقل مطلوب"),
  phone_number: Yup.string()
    .required("هذا الحقل مطلوب")
    .test("format", "يجب ان يكون 10 ارقام", (value) => {
      if (value.length == 10) return true;

      const regex = /^$|^\d{4}-\d{1,2}-\d{1,2}$/;
      return regex.test(value);
    }),
});

export default QuickStudentRegister;
