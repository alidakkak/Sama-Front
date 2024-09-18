import { Box, Button, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import PanelHeader from "../../UI/PanelHeader";
import Loader from "../../UI/Loader";
import { MaterialReactTable } from "material-react-table";
import { Link } from "react-router-dom";
import {
  useGetTeachersQuery,
  useToggleStateMutation,
} from "../../Redux/Api/TeachersApi";
const Teachers = () => {
  const { data, isLoading, refetch } = useGetTeachersQuery();
  const [toggleState, { isLoading: toggleLoading }] = useToggleStateMutation();

  const columns = [
    {
      header: "المعرف",
      accessorKey: "id",
      Cell: ({ renderedCellValue }) => {
        return (
          <Link
            style={{
              textAlign: "center",
              textDecoration: "underLine",
              fontWeight: "bold",
            }}
            to={"/dashboard/teacher/" + renderedCellValue}
          >
            {renderedCellValue}
          </Link>
        );
      },
      size: "20px",
    },
    {
      header: "الاسم الاول",
      accessorKey: "first_name",
    },
    {
      header: "الاسم الاخير ",
      accessorKey: "last_name",
    },

    {
      header: "رقم الموبايل",
      accessorKey: "phone",
    },
    {
      header: "تاريخ الاضافة",
      accessorKey: "created_at",
    },
    {
      header: "الحالة",
      accessorKey: "status",
      Cell: ({ row }) => {
        return (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip title="اضغط لعكس الحالة">
              <Button
                size="small"
                variant="contained"
                color={row.original.status == 1 ? "success" : "error"}
                sx={{
                  fontWeight: "bold",
                  padding: "0.1rem 0.8rem",
                }}
                onClick={() => {
                  toggleState(row.original.id).then(() => {
                    refetch();
                  });
                }}
                disabled={toggleLoading}
              >
                {row.original.status == 1 ? "فعال" : "غير فعال"}
              </Button>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    refetch();
  }, []);
  return (
    <Box>
      <PanelHeader
        title={"المدرسين"}
        buttonContent={"أضافة مدرس"}
        to={"/dashboard/add-teacher"}
      />
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <MaterialReactTable
            data={data?.data ? data.data : []}
            columns={columns}
          />
        )}
      </>
    </Box>
  );
};

export default Teachers;
