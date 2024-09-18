import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useMemo } from "react";
import { ThemeColor } from "../Assets/Theme/Theme";

const Table = ({ data, columns }) => {
  const columns = useMemo(() => columns_array);

  const table = useMaterialReactTable({
    columns,
    data: data ? data : [],
    muiTablePaperProps: {
      elevation: 4, // change the mui box shadow
      // customize paper styles
      sx: {
        borderRadius: "10px",
        border: `1px solid ${ThemeColor.secondary}`,
      },
    },
    muiTableBodyProps: {
      sx: {
        // stripe the rows, make odd rows a darker color
        "& tr:nth-of-type(odd) > td": {
          backgroundColor: "#f5f5f5",
        },
      },
    },
    TableProps: {
      sx: {
        backgroundColor: "#f5f5f5 !important", // Change the background color here
      },
    },
  });
  return <MaterialReactTable table={table} />;
};

export default Table;
