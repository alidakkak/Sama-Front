import React, { useMemo } from "react";

import { Box } from "@mui/material";
import PanelHeader from "../../UI/PanelHeader";

import { Link } from "react-router-dom";
import ChunkLayout from "../../Layout/ChunkLayout";
import { useGetStudentsQuery } from "../../Redux/Api/StudentApi";
import { MaterialReactTable } from "material-react-table";
import Loader from "../../UI/Loader";

const Students = () => {
  const { data, isLoading } = useGetStudentsQuery();

  const columns = useMemo(() => [
    {
      header: "المعرف",
      accessorKey: "id",
      Cell: ({ renderedCellValue }) => {
        return (
          <Link
            to={"/dashboard/student/" + renderedCellValue}
            style={{ fontWeight: "bold", textDecoration: "underline" }}
          >
            {renderedCellValue}
          </Link>
        );
      },
      size: "10px",
    },
    {
      header: "اسم الطالب الاول",
      accessorKey: "first_name",
    },
    {
      header: "اسم الطالب الاخير",
      accessorKey: "last_name",
    },
    {
      header: "اسم الاب",
      accessorKey: "father_name",
    },
    {
      header: "المواليد ",
      accessorKey: "date_of_birth",
    },
    {
      header: "تاريخ التسجيل",
      accessorKey: "created_at",
    },
  ]);

  return (
    <Box>
      <PanelHeader
        title={"الطلاب"}
        buttonContent={"اضافة طالب"}
        to={"/dashboard/add-student"}
      />
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <MaterialReactTable data={data ? data : []} columns={columns} />
        )}
      </>
    </Box>
  );
};

export default Students;
