import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import AddCheckPopup from "./AddCheckPopup";
import MUITable from "./MUITable";
import SectionHeader from "./SectionHeader";
import EditCheckPopup from "./EditCheckPopup";

const IncomsLog = ({ data, registration }) => {
  const [addCheckPopup, setAddCheckPopup] = useState(false);
  const closeAddCheckPopup = () => {
    setAddCheckPopup(false);
  };
  const openAddCheckPopup = () => {
    setAddCheckPopup(true);
  };

  const [editCheckPopup, setEditCheckPopup] = useState({ open: false });
  const closeEditCheckPopup = () => {
    setEditCheckPopup({ open: false });
  };
  const openEditCheckPopup = (data) => {
    setEditCheckPopup({ data, open: true });
  };

  const columns = [
    { name: "العنوان", key: "title" },
    { name: "المبلغ", key: "price" },
    { name: "التاريخ", key: "created_at" },
    {
      name: "",
      key: "",
      Cell: (row) => {
        return (
          <Button
            onClick={() => {
              openEditCheckPopup(row);
            }}
            variant="outlined"
            size="small"
          >
            تعديل
          </Button>
        );
      },
    },
  ];

  return (
    <>
      {editCheckPopup.open && (
        <EditCheckPopup
          closePopup={closeEditCheckPopup}
          oldData={editCheckPopup.data}
        />
      )}

      {addCheckPopup && (
        <AddCheckPopup
          packageId={registration?.semester_id}
          addCheckPopup={addCheckPopup}
          closeAddCheckPopup={closeAddCheckPopup}
        />
      )}

      <SectionHeader
        onClickButton={openAddCheckPopup}
        buttonContent={"اضافة دفعة"}
        title={"سجل الدفعات"}
        disabled={registration.status == 3}
      />

      {registration?.studentPayments.length == 0 ? (
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "0.8rem",
            color: "gray",
            textAlign: "center",
          }}
        >
          لا يوجد دفعات
        </Typography>
      ) : (
        <MUITable columns={columns} data={registration?.studentPayments} />
      )}
    </>
  );
};

export default IncomsLog;
