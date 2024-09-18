import React, { useEffect, useState } from "react";
import PanelHeader from "../../UI/PanelHeader";
import { Box } from "@mui/material";
import InfoRect from "../../UI/InfoRect";
import EditInfoPopup from "./components/EditInfoPopup";
import Filter from "../Students/Components/Filter";
import { useParams } from "react-router-dom";
import { useGetPackageDetailsQuery } from "../../Redux/Api/PackageApi";
import Loader from "../../UI/Loader";
import Classrooms from "./components/Classrooms";
import Exams from "./components/Exams";
import PackageStudents from "./components/PackageStudents";
import Discounts from "./components/Discounts";

const PackagesDetails = () => {
  const { id } = useParams();
  const {
    data,
    isLoading,
    isSuccess: isSuccessPackageDetails,
    isFetching,
    refetch,
  } = useGetPackageDetailsQuery(id);

  const [editPopup, setEditPopup] = useState({
    open: false,
    field: "اسم الدورة",
  });

  const [classRoomFilter, setClassRoomFilter] = useState(0);

  const handleClassRoomFilterChange = (name) => {
    let classroomId = 0;
    for (let i = 0; i < data?.data?.classrooms?.length; i++) {
      const classroom = data?.data?.classrooms[i];
      if (name == classroom.name) {
        classroomId = classroom.id;
        break;
      }
    }
    setClassRoomFilter(classroomId);
  };

  const closeEditPopup = () => {
    setEditPopup({ ...editPopup, open: false });
  };

  const setField = (label, value, name) => {
    setEditPopup({ ...editPopup, name, label, value, open: true });
  };

  useEffect(() => {
    if (isSuccessPackageDetails) {
      handleClassRoomFilterChange(data?.data?.classrooms[0]?.name);
    }
  }, [isSuccessPackageDetails]);

  const [filter, setFilter] = useState("الشعب");

  return (
    <div style={{ position: "relative" }}>
      <EditInfoPopup closeEditPopup={closeEditPopup} editPopup={editPopup} />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PanelHeader title={data?.data?.name} center={true} />
          <InfoRect
            setField={setField}
            data={formatedRectData(data.data)}
          ></InfoRect>

          <Box sx={{ margin: "0" }}>
            <Filter
              filter={filter}
              setFilterHndler={setFilter}
              filters={["الشعب", "الطلاب", "الامتحانات", "الحسومات"]}
            />

            {filter == "الشعب" ? (
              <Classrooms
                setClassRoomFilter={setClassRoomFilter}
                classRoomFilter={classRoomFilter}
                data={data?.data?.classrooms}
                refetchclasses={refetch}
              />
            ) : filter == "الطلاب" ? (
              <PackageStudents subjects={data?.data?.subjects} />
            ) : filter == "الامتحانات" ? (
              <Exams
                isStarted={data?.data?.actual_start_date}
                exams={data.data?.exams}
              />
            ) : filter == "الحسومات" ? (
              <Discounts discounts={data.data?.scholarship} />
            ) : (
              <></>
            )}
          </Box>
        </>
      )}
    </div>
  );
};

export default PackagesDetails;

const formatedRectData = (data) => {
  let unit;
  if (data.unit == "month") {
    unit = "شهر";
  } else if (data.unit == "day") {
    unit = "يوم";
  } else if (data.unit == "hour") {
    unit = "ساعة";
  } else {
    unit = "اسبوع";
  }
  const array = [
    {
      label: "سعر الدورة",
      name: "price",
      value: data.price,
    },
    {
      label: "موعد بدء الدورة",
      name: "start_date",
      value: data.start_date,
    },
    {
      label: "موعد انتهاء الدورة",
      name: "end_date",
      value: data.end_date,
    },
    {
      label: "موعد البدء الفعلي",
      name: "actual_start_date",
      value: data.actual_start_date,
    },
    {
      label: "موعد الانتهاء الفعلي",
      name: "actual_completion_date",
      value: data.actual_completion_date,
    },
    {
      label: "المدة الزمنية للدورة",
      name: "period",
      value: `${data.period} ${unit}`,
    },
  ];
  return array;
};
