import React, { useState } from "react";
import ChunkLayout from "../../../Layout/ChunkLayout";
import { Stack, Typography, Button, Box } from "@mui/material";
import SpecialDiscount from "./SpecialDiscount";
import WithdrawalPopup from "./WithdrawalPopup";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeColor } from "../../../Assets/Theme/Theme";
import { useResetPasswordMutation } from "../../../Redux/Api/StudentApi";
import StudentCredentialsPopup from "./StudentCredentialsPopup";
import Loader from "../../../UI/Loader";

const OtherSettings = ({ registration, studentName, refetch }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [specialDiscountPopup, setSpecialDiscountPopup] = useState(false);
  const [withdrawalPopup, setWithdrawaltPopup] = useState(false);

  const [resetPassword, { isLoading, isSuccess, data }] =
    useResetPasswordMutation();

  const closeSpecialDiscountPopup = () => {
    setSpecialDiscountPopup(false);
  };

  const openSpecialDiscountPopup = () => {
    setSpecialDiscountPopup(true);
  };

  const closeWithdrawalPopup = () => {
    setWithdrawaltPopup(false);
  };

  const openWithdrawalPopup = () => {
    setWithdrawaltPopup(true);
  };

  const resetPasswordHandler = () => {
    resetPassword(id);
  };

  const options = [
    { name: "اضافة حسم خاص", func: openSpecialDiscountPopup },
    {
      name: "تعديل مواد الطالب",
      func: () => {
        navigate(
          `/dashboard/update-register-student/${registration.id}?semester_id=${registration.semester_id}&student_name=${studentName}&student_id=${id}`
        );
      },
    },
    { name: "سحب الطالب من الدورة", func: openWithdrawalPopup },
    { name: "تغيير كلمة المرور", func: resetPasswordHandler },
  ];

  if (isLoading) {
    return <Loader />;
  }

  console.log(data);

  return (
    <>
      {isSuccess && (
        <StudentCredentialsPopup
          password={data.newPassword}
          phone_number={data.phone_number}
        />
      )}
      {specialDiscountPopup && (
        <SpecialDiscount
          registration={registration}
          closePopup={closeSpecialDiscountPopup}
        />
      )}
      {withdrawalPopup && (
        <WithdrawalPopup
          registration={registration}
          closePopup={closeWithdrawalPopup}
          refetch={refetch}
        />
      )}
      <ChunkLayout>
        <Box
          sx={{
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            padding: 2,
            boxShadow: `0 4px 8px rgba(0, 0, 0, 0.1)`,
          }}
        >
          <Stack spacing={2}>
            {options.map((item, i) => (
              <Button
                key={i}
                onClick={item.func}
                disabled={registration.status != 1}
                sx={{
                  textAlign: "right",
                  fontWeight: "600",
                  color: ThemeColor.main,
                  backgroundColor: "#ffffff",
                  border: `1px solid ${ThemeColor.main}`,
                  borderRadius: "4px",
                  padding: "10px 15px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: ThemeColor.main,
                    color: "#ffffff",
                    transform: "translateX(-3px)",
                    boxShadow: `0 4px 8px rgba(0, 0, 0, 0.1)`,
                  },
                }}
              >
                {item.name}
              </Button>
            ))}
          </Stack>
        </Box>
      </ChunkLayout>
    </>
  );
};

export default OtherSettings;
