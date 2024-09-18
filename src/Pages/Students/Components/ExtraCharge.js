import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import MUITable from "../../../UI/MUITable";
import AddExtraCheckPopup from "./AddExtraCheckPopup";
import ChunkLayout from "../../../Layout/ChunkLayout";
import SectionHeader from "../../../UI/SectionHeader";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { ThemeColor } from "../../../Assets/Theme/Theme";
import { useDelteExtraChargeMutation } from "../../../Redux/Api/StudentApi";
import { useParams } from "react-router-dom";

const ExtraCharge = ({ registration }) => {
  const { id } = useParams();
  const [addCheckPopup, setAddCheckPopup] = useState(false);

  const closeAddCheckPopup = () => {
    setAddCheckPopup(false);
  };
  const openAddCheckPopup = () => {
    setAddCheckPopup(true);
  };

  const [delteExtraCharge, { isLoading }] = useDelteExtraChargeMutation();
  const columns = [
    { name: "العنوان", key: "title" },
    { name: "المبلغ", key: "price" },
    { name: "الوصف", key: "description" },
    { name: "التاريخ", key: "created_at" },
    {
      name: "",
      key: "",
      Cell: (row) => {
        return (
          <Tooltip title="حذف">
            <IconButton
              disabled={isLoading}
              onClick={() => {
                delteExtraCharge({ extra_id: row.id, student_id: id });
              }}
            >
              <DeleteIcon color={ThemeColor.main} />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <>
      {addCheckPopup && (
        <AddExtraCheckPopup
          packageId={registration?.semester_id}
          addCheckPopup={addCheckPopup}
          closeAddCheckPopup={closeAddCheckPopup}
        />
      )}
      <ChunkLayout>
        <SectionHeader
          title={"سجل الرسوم الاضافية"}
          buttonContent={"اضافة رسوم اضافية"}
          onClickButton={openAddCheckPopup}
          disabled={registration.status == 3}
        />

        {registration?.extraCharges.length == 0 ? (
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
          <MUITable columns={columns} data={registration?.extraCharges} />
        )}
      </ChunkLayout>
    </>
  );
};

export default ExtraCharge;
