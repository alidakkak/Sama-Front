import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ThemeColor } from "../Assets/Theme/Theme";

const RELATED_COLOR = "#3A6C8A"; // Lighter blue complementing ThemeColor.main

export default function MUITable({ columns, data, colorColumns }) {
  return (
    <TableContainer
      sx={{
        boxShadow: ThemeColor.boxShadow,
        borderRadius: "8px",
        maxHeight: "50vh",
        backgroundColor: "#ffffff",
        border: `1px solid ${RELATED_COLOR}`,
      }}
    >
      <Table
        sx={{
          minWidth: 650,
          borderRadius: "8px",
          backgroundColor: "#ffffff",
          borderCollapse: "collapse",
        }}
        aria-label="caption table"
      >
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: RELATED_COLOR,
              color: "#ffffff",
            }}
          >
            {columns?.map((col, id) => (
              <TableCell
                key={id}
                sx={{
                  fontWeight: "600",
                  textAlign: "center",
                  padding: "12px",
                  color: "#ffffff",
                  borderBottom: `1px solid #e0e0e0`,
                }}
              >
                {col.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, i) => (
            <TableRow
              key={i}
              sx={{
                backgroundColor:
                  colorColumns && colorColumns > i
                    ? "#e1f5f6" // Light blue for highlighted rows
                    : i % 2 === 0
                    ? "#f9f9f9"
                    : "#ffffff",
                "&:hover": {
                  backgroundColor: "#f1f1f1",
                },
              }}
            >
              {columns.map((col, index) => (
                <TableCell
                  key={index}
                  sx={{
                    textAlign: "center",
                    padding: "12px",
                    color: col.key === "id" ? "#9c9c9c" : RELATED_COLOR,
                    borderBottom: `1px solid #e0e0e0`,
                  }}
                >
                  {col.Cell ? col.Cell(row) : row[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
