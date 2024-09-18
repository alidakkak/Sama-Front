import React from "react";
import PopupLayout from "../../../Layout/PopupLayout";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StudentCredentialsPopup = ({ password, phone_number }) => {
  const navigate = useNavigate();
  return (
    <PopupLayout
      title="تمت إضافة الطالب"
      style={{
        backgroundColor: "#f8f9fa",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h6"
        style={{
          marginBottom: "10px",
          fontWeight: "bold",
          color: "#343a40",
        }}
      >
        كلمة سر حساب الطالب:{" "}
        <span style={{ color: "#007bff" }}>{password}</span>
      </Typography>
      <Typography
        variant="h6"
        style={{
          marginBottom: "10px",
          fontWeight: "bold",
          color: "#343a40",
        }}
      >
        اسم الحساب: <span style={{ color: "#007bff" }}>{phone_number}</span>
      </Typography>
      <Typography
        variant="body1"
        style={{
          marginBottom: "20px",
          color: "#dc3545",
        }}
      >
        تنويه: لا يمكن العودة الى كلمة المرور عند إغلاق هذه الصفحة
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{
          backgroundColor: "#28a745",
          color: "#fff",
          fontSize: "16px",
          borderRadius: "5px",
        }}
        onClick={() => {
          navigate("/dashboard/students");
        }}
      >
        العودة إلى لوحة التحكم
      </Button>
    </PopupLayout>
  );
};

export default StudentCredentialsPopup;
