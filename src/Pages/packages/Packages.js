import React, { useEffect } from "react";
import PanelHeader from "../../UI/PanelHeader";

import { Box } from "@mui/material";
import { Link } from "react-router-dom";

import { useGetPackageQuery } from "../../Redux/Api/PackageApi";
import Loader from "../../UI/Loader";
import { MaterialReactTable } from "material-react-table";

const Packages = () => {
  const { isLoading, data, refetch } = useGetPackageQuery();
  useEffect(() => {
    refetch();
  }, []);
  return (
    <Box>
      <PanelHeader
        title={"الدورات"}
        buttonContent={"اضافة دورة"}
        to={"/dashboard/add-package"}
      />
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <MaterialReactTable columns={columns} data={data?.data} />
        )}
      </>
    </Box>
  );
};

export default Packages;

const columns = [
  {
    header: "المعرف",
    accessorKey: "id",
    size: "10px",
  },
  {
    header: "اسم الدورة",
    accessorKey: "name",
    Cell: ({ row, renderedCellValue }) => {
      return (
        <Link
          to={"/dashboard/package/" + row.original.id}
          style={{ fontWeight: "bold", textDecoration: "underline" }}
        >
          {renderedCellValue}
        </Link>
      );
    },
  },
  {
    header: "تاريخ البدء",
    accessorKey: "start_date",
  },
  {
    header: "تاريخ الانتهاء",
    accessorKey: "end_date",
  },
  {
    header: "تاريخ البدء الفعلي",
    accessorKey: "actual_start_date",
    Cell: ({ renderedCellValue }) => {
      if (renderedCellValue == null) return <span>-</span>;
      else return <span>{renderedCellValue}</span>;
    },
  },
  {
    header: "تاريخ الانتهاء الفعلي",
    accessorKey: "actual_completion_date",
    Cell: ({ renderedCellValue }) => {
      if (renderedCellValue == null) return <span>-</span>;
      else return <span>{renderedCellValue}</span>;
    },
  },
  {
    header: "الحالة",
    accessorKey: "status",
    Cell: ({ renderedCellValue }) => {
      const chipStyle = {};
      if (renderedCellValue == "3") {
        chipStyle.background = "#86FF73";
        chipStyle.color = "#68B08B";
      } else if (renderedCellValue == "1") {
        chipStyle.background = "#FFCD7A";
        chipStyle.color = "#F59800";
      } else if (renderedCellValue == "2") {
        chipStyle.background = "#968EBA";
        chipStyle.color = "#241371";
      }
      return (
        <span
          style={{
            background: "red",
            textAlign: "center",
            borderRadius: "10px",
            width: "100%",
            padding: "3px 20px",
            fontWeight: "bold",
            ...chipStyle,
          }}
        >
          {renderedCellValue == 1
            ? "انتظار"
            : renderedCellValue == 2
            ? "مستمر"
            : "منتهي"}
        </span>
      );
    },
  },
];
