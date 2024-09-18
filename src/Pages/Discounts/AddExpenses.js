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
import { useAddDiscountMutation } from "../../Redux/Api/ExpensesApi";

const AddDiscount = () => {
  const navigate = useNavigate();
  const [addDiscount, { isLoading, isSuccess, isError }] =
    useAddDiscountMutation();
  const dispatch = useDispatch();

  const AddDiscountHandler = (values) => {
    addDiscount(values)
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
    dispatch(openAlert({ message: "تمت اضافةالحسم بنجاح", type: "success" }));
    navigate("/dashboard/discounts");
  }

  return (
    <>
      <PanelHeader title={"اضافة حسم"} />
      {isLoading ? (
        <ChunkLayout>
          <Loader />
        </ChunkLayout>
      ) : (
        <Formik
          initialValues={{
            name: "",
            discount: 1,
            description: "",
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
                      }}
                      name="name"
                      // onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      value={values.name}
                    />
                    <TextField
                      size="small"
                      label="القيمة"
                      sx={{
                        flexBasis: { md: "49%", xs: "100%" },
                        margin: "0.5rem 0",
                      }}
                      name="discount"
                      // onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!errors.discount}
                      helperText={errors.discount}
                      value={values.discount}
                    />
                    <TextField
                      size="small"
                      label="وصف الحسم"
                      sx={{
                        flexBasis: { xs: "100%" },
                        margin: "0.5rem 0",
                      }}
                      rows={4}
                      multiline
                      name="description"
                      // onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!errors.description}
                      helperText={errors.description}
                      value={values.description}
                    />
                  </Stack>
                </SectionLayout>
              </ChunkLayout>

              <Box m={"1rem"} sx={{ textAlign: "right" }}>
                <Button type={"submit"} variant="contained">
                  اضافة الحسم
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </>
  );
};

export default AddDiscount;

const DiscountSchema = Yup.object({
  name: Yup.string().required("هذا الحقل مطلوب"),
  description: Yup.string().required("هذا الحقل مطلوب"),
  discount: Yup.number()
    .typeError("يجب ان يكون رقم")
    .required("هذا الحقل مطلوب")
    .test("format", "يجب ان تكون القيمة بين 1 الى 100", (value) => {
      if (value >= 1 && value <= 100) return true;
      return false;
    }),
});
