import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ThemeColor } from "../../../Assets/Theme/Theme";
import { FaPlus } from "react-icons/fa6";
import AddClassroomPopup from "./AddClassroomPopup";
import Loader from "../../../UI/Loader";
import PackageDetailsCourse from "./PackageDetailsCourse";
import ChunkLayout from "../../../Layout/ChunkLayout";
import MUITable from "../../../UI/MUITable";
import { useGetClassroomInfoQuery } from "../../../Redux/Api/PackageApi";
import { Link } from "react-router-dom";
import SectionHeader from "../../../UI/SectionHeader";
import EditIcon from "@mui/icons-material/Edit";

const Classrooms = ({
  classRoomFilter,
  setClassRoomFilter,
  data,
  refetchclasses,
}) => {
  const {
    data: classroomInfo,
    isLoading: isLoadingClassroomInfo,
    refetch,
    isFetching,
  } = useGetClassroomInfoQuery(classRoomFilter);

  const [classroomPopup, setClassroomPopup] = useState({ open: false });

  const closeClassroomPopup = () => {
    setClassroomPopup({ open: false });
  };
  const openClassroomPopup = () => {
    setClassroomPopup({ open: true });
  };

  const openClassroomEditPopup = (oldValues) => {
    setClassroomPopup({ open: true, isEdit: true, oldValues });
  };

  useEffect(() => {
    refetch(classRoomFilter);
  }, [classRoomFilter]);
  return (
    <>
      <AddClassroomPopup
        classroomPopup={classroomPopup.open}
        closeClassroomPopup={closeClassroomPopup}
        isEdit={classroomPopup.isEdit}
        oldValues={classroomPopup.oldValues}
        refetchclasses={refetchclasses}
      />
      <ChunkLayout>
        {data?.length == 0 ? (
          <Typography sx={{ textAlign: "right", color: "gray" }}>
            لا يوجد شعب
          </Typography>
        ) : (
          <Stack
            sx={{
              background: ThemeColor.background,
              borderRadius: "5px",
              textAlign: "center",
              boxShadow: ThemeColor.boxShadow,
              padding: "0.5rem",
            }}
            direction={"row"}
            gap="1rem"
          >
            {data?.map((item, i) => {
              return (
                <>
                  <Box
                    key={item.id}
                    sx={{
                      padding: "0.5rem 1rem",
                      transition: "0.3s",
                      position: "relative",
                      borderRadius: "5px",

                      color: classRoomFilter == item.id ? "#fff" : "#333",
                      zIndex: "20",
                      background:
                        classRoomFilter == item.id
                          ? ThemeColor.secondary
                          : ThemeColor.background,
                      "&:hover": {
                        background:
                          classRoomFilter == item.id
                            ? ThemeColor.secondary
                            : "#ddd",
                      },
                      "&:hover > .editButton": {
                        height: "20px",
                      },
                    }}
                  >
                    <Box
                      className={"editButton"}
                      sx={{
                        position: "absolute",
                        background: ThemeColor.main,
                        transform: "translate(-50% , calc(-100% - 0.5rem))",
                        left: "50%",
                        width: "80%",
                        padding: "0.1rem 0",
                        borderRadius: "5px 5px 0 0 ",
                        opacity: "0.7",
                        zIndex: "10",
                        transition: "0.2s ease-in",
                        height: "0",
                        overflow: "hidden",
                        padding: "0",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        openClassroomEditPopup({
                          name: item.name,
                          id: item.id,
                        });
                      }}
                    >
                      <EditIcon
                        sx={{
                          fontSize: "1.2rem",
                        }}
                      />
                    </Box>
                    <span
                      onClick={() => {
                        setClassRoomFilter(item.id);
                      }}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {item.name}
                    </span>
                  </Box>
                </>
              );
            })}
          </Stack>
        )}
        <Box
          sx={{
            padding: "0.5rem 1rem",
            cursor: "pointer",
            textAlign: "right",
            width: "fit-content",
            marginRight: "auto",
          }}
          onClick={openClassroomPopup}
        >
          <Box sx={{ marginRight: "auto" }} alignItems={"center"}>
            <Button
              sx={{
                display: "inline-block",
                marginLeft: "0.3rem",
              }}
              fontSize={"0.8rem"}
            >
              <FaPlus
                style={{
                  bottom: "-3px",
                  position: "relative",
                  marginRight: "0.3rem",
                }}
                fontSize={"0.8rem"}
              />
              اضافة شعبة
            </Button>
          </Box>
        </Box>
      </ChunkLayout>

      {data?.length == 0 ? (
        <Typography variant="h5" sx={{ textAlign: "center", color: "gray" }}>
          الرجاء اضافة شعبة
        </Typography>
      ) : (
        <Box>
          {isLoadingClassroomInfo || isFetching ? (
            <Loader />
          ) : (
            <Grid container spacing={2}>
              <Grid xs={12} md={6} item>
                <ChunkLayout>
                  {classroomInfo?.data?.students.length == 0 ? (
                    <Typography
                      variant="h5"
                      sx={{ textAlign: "center", color: "gray" }}
                    >
                      لا يوجد طلاب
                    </Typography>
                  ) : (
                    <>
                      <SectionHeader title={"الطلاب"}></SectionHeader>
                      <MUITable
                        columns={studentsCol}
                        data={classroomInfo?.data?.students}
                      />
                    </>
                  )}
                </ChunkLayout>
              </Grid>

              <Grid xs={12} md={6} item>
                <PackageDetailsCourse
                  classRoomFilter={classRoomFilter}
                  data={classroomInfo?.data?.subjects}
                />
              </Grid>
            </Grid>
          )}
        </Box>
      )}
    </>
  );
};

export default Classrooms;

const studentsCol = [
  { name: "المعرف", key: "id" },
  {
    name: "الاسم",
    key: "fullName",
    Cell: (row) => {
      return <Link to={"/dashboard/student/" + row.id}>{row.fullName}</Link>;
    },
  },
  {
    name: "تمت الاضافة",
    key: "created_at",
  },
  {
    name: "عدد المواد",
    key: "subjectCount",
  },
];
