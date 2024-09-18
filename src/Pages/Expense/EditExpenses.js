import React from "react";
import PanelHeader from "../../UI/PanelHeader";
import { Box, Button, Stack, TextField } from "@mui/material";
import SectionLayout from "../../Layout/SectionLayout";
import ChunkLayout from "../../Layout/ChunkLayout";
import { useDispatch } from "react-redux";
import { openAlert } from "../../Redux/Slices/AlertSlice";
import Loader from "../../UI/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  useEditExpenseMutation,
  useGetExpenseQuery,
} from "../../Redux/Api/ExpensesApi";
import { ThemeColor } from "../../Assets/Theme/Theme";

const EditExpenses = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading: isLoadingDetails, data } = useGetExpenseQuery(id);
  const [editExpense, { isLoading, isSuccess, isError }] =
    useEditExpenseMutation();
  const dispatch = useDispatch();

  const AddDiscountHandler = (values) => {
    editExpense({ ...values, id })
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
    dispatch(openAlert({ message: "تمت تعديل النفقة بنجاح", type: "success" }));
    navigate("/dashboard/expenses");
  }

  return (
    <>
      <PanelHeader title={"تعديل نفقة"} />
      {isLoading || isLoadingDetails ? (
        <ChunkLayout>
          <Loader />
        </ChunkLayout>
      ) : (
        <Formik
          initialValues={{
            title: data?.data?.title,
            price: data?.data?.price,
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
                      label="اسم الحسم"
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
                        background: ThemeColor.background,
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
                  تعديل النفقة
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </>
  );
};

export default EditExpenses;

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
