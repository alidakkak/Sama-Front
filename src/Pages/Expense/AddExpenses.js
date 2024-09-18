import React from "react";
import PanelHeader from "../../UI/PanelHeader";
import { Box, Button, Stack, TextField } from "@mui/material";
import SectionLayout from "../../Layout/SectionLayout";
import ChunkLayout from "../../Layout/ChunkLayout";
import { useDispatch } from "react-redux";
import { openAlert } from "../../Redux/Slices/AlertSlice";
import Loader from "../../UI/Loader";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAddExpenseMutation } from "../../Redux/Api/ExpensesApi";
import { ThemeColor } from "../../Assets/Theme/Theme";

const AddExpenses = () => {
  const navigate = useNavigate();
  const [addExpense, { isLoading, isSuccess, isError }] =
    useAddExpenseMutation();
  const dispatch = useDispatch();

  const AddDiscountHandler = (values) => {
    addExpense(values)
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

  if (isSuccess) {
    dispatch(openAlert({ message: "تمت اضافةالنفقة بنجاح", type: "success" }));
    navigate("/dashboard/expenses");
  }

  return (
    <>
      <PanelHeader title={"اضافة نفقة"} />
      {isLoading ? (
        <ChunkLayout>
          <Loader />
        </ChunkLayout>
      ) : (
        <Formik
          initialValues={{
            title: "",
            price: "",
          }}
          validationSchema={DiscountSchema}
          onSubmit={AddDiscountHandler}
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
                <SectionLayout title={"المعلومات الاساسية"}>
                  <Stack
                    justifyContent={"space-between"}
                    direction={"row"}
                    flexWrap={"wrap"}
                    my={"auto"}
                  >
                    <TextField
                      size="small"
                      label="عنوان النفقة"
                      sx={{
                        flexBasis: { md: "49%", xs: "100%" },
                        margin: "0.5rem 0",
                        background: ThemeColor.background,
                      }}
                      name="title"
                      // onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!errors.title}
                      helperText={errors.title}
                      value={values.title}
                    />
                    <TextField
                      size="small"
                      label="القيمة"
                      sx={{
                        flexBasis: { md: "49%", xs: "100%" },
                        margin: "0.5rem 0",
                      }}
                      name="price"
                      // onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!errors.price}
                      helperText={errors.price}
                      value={values.price}
                    />
                  </Stack>
                </SectionLayout>
              </ChunkLayout>

              <Box m={"1rem"} sx={{ textAlign: "right" }}>
                <Button type={"submit"} variant="contained">
                  اضافة النفقة
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </>
  );
};

export default AddExpenses;

const DiscountSchema = Yup.object({
  title: Yup.string().required("هذا الحقل مطلوب"),

  price: Yup.number()
    .typeError("يجب ان يكون رقم")
    .required("هذا الحقل مطلوب")
    .test("format", "يجب ان تكون القيمة موجبة ", (value) => {
      if (value >= 1) return true;
      return false;
    }),
});
