import { Box, IconButton, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import PanelHeader from "../../UI/PanelHeader";
import Loader from "../../UI/Loader";
import { MaterialReactTable } from "material-react-table";
import {
  useDeleteExpensMutation,
  useGetExpensesQuery,
} from "../../Redux/Api/ExpensesApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { openAlert } from "../../Redux/Slices/AlertSlice";
import { useDispatch } from "react-redux";
const Expenses = () => {
  const { data, isLoading, refetch } = useGetExpensesQuery();
  const [deleteExpnes, { isLoading: isLoadingDelete }] =
    useDeleteExpensMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const columns = [
    {
      header: "المعرف",
      accessorKey: "id",
    },
    {
      header: "عنوان النفقة",
      accessorKey: "title",
      size: 200,
    },
    {
      header: "قيمة النفقة",
      accessorKey: "price",
      Cell: ({ renderedCellValue }) => {
        return <span>{renderedCellValue}</span>;
      },
    },
    {
      header: "تاريخ النفقة ",
      accessorKey: "created_at",
      Cell: ({ renderedCellValue }) => {
        const date = new Date(renderedCellValue);

        // Format the date to a readable string
        const options = {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        };

        const readableDate = date.toLocaleDateString(options);

        return <span>{readableDate}</span>;
      },
    },
    {
      header: "",
      accessorKey: "sdf",
      Cell: ({ row }) => {
        return (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip title="تعديل">
              <IconButton
                onClick={() => {
                  navigate("/dashboard/edit-expense/" + row.original.id);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="حذف">
              <IconButton
                disabled={isLoadingDelete}
                color={"error"}
                onClick={() => {
                  deleteExpnes(row.original.id)
                    .then((e) => {
                      refetch();
                      if (e.error) {
                        dispatch(
                          openAlert({
                            message: e?.error?.data?.message,
                            type: "error",
                          })
                        );
                      } else {
                        dispatch(
                          openAlert({
                            message: "تمت الحذف بنجاح",
                            type: "success",
                          })
                        );
                      }
                    })
                    .catch((error) => {
                      dispatch(
                        openAlert({ message: "لقد حدث خطأ", type: "error" })
                      );
                    });
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
      enableColumnFilter: false,
    },
  ];

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Box>
      <PanelHeader
        title={"النفقات"}
        buttonContent={"أضافة نفقة"}
        to={"/dashboard/add-expense"}
      />

      {isLoading ? (
        <Loader />
      ) : (
        <MaterialReactTable
          data={data.data ? data.data : []}
          columns={columns}
        />
      )}
    </Box>
  );
};

export default Expenses;
