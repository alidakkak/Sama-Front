// import { Box, Stack, Typography, selectClasses } from "@mui/material";
// import React, { useState } from "react";
// import PanelHeader from "../../UI/PanelHeader";
// import InfoTitle from "../Students/Components/InfoTitle";
// import GradientBox from "../../UI/GradientBox";
// import { ThemeColor } from "../../Assets/Theme/Theme";
// import { BorderColor } from "@mui/icons-material";
// import SelectSubjects from "./components/SelectSubjects";
// import AddDiscount from "./components/AddDiscount";
// import MUITable from "../../UI/MUITable";
// import ChunkLayout from "../../Layout/ChunkLayout";

// const AddStudentToPackage = () => {
//   const [subjectsIds, setSubjectIds] = useState([]);
//   const [selectedDiscount, setSelectedDiscount] = useState(null);
//   const handleSelectSubject = (id) => {
//     if (!subjectsIds.includes(id)) {
//       setSubjectIds((prev) => {
//         return [...prev, id];
//       });
//     } else {
//       setSubjectIds((prev) => {
//         const newIds = prev.filter((item) => {
//           return item !== id;
//         });

//         return newIds;
//       });
//     }
//   };

//   const handleSelectedDiscount = (id) => {
//     if (selectedDiscount == id) {
//       setSelectedDiscount(null);
//     } else {
//       setSelectedDiscount(id);
//     }
//   };

//   return (
//     <Box>
//       <PanelHeader title={"محمد نور اسما"} center={true} />

//       <ChunkLayout>
//         <SelectSubjects
//           handleSelectSubject={handleSelectSubject}
//           subjects={subjects}
//           subjectsIds={subjectsIds}
//         />
//       </ChunkLayout>
//       <ChunkLayout>
//         <Box sx={{ textAlign: "right" }} my={"1rem"}>
//           <AddDiscount
//             discounts={discounts}
//             setSelectedDiscount={handleSelectedDiscount}
//             selectedDiscount={selectedDiscount}
//           />
//         </Box>
//       </ChunkLayout>

//       <ChunkLayout>
//         <Box sx={{ textAlign: "right" }} my={"1rem"}>
//           <InfoTitle title={"تفاصيل المستحقات"} />
//           <MUITable columns={columns} data={data} />
//         </Box>
//       </ChunkLayout>

//       <Box my={"2rem"}>
//         <button class={"submitButton"}>اضافة الطالب للدورة</button>
//       </Box>
//     </Box>
//   );
// };

// export default AddStudentToPackage;

// const subjects = [
//   {
//     id: 1,
//     name: "كيمياء",
//     count: "4",
//   },
//   {
//     id: 2,
//     name: "فيزياء",
//     count: "2",
//   },
//   {
//     id: 3,
//     name: "تحليل",
//     count: "8",
//   },
//   {
//     id: 4,
//     name: "علوم",
//     count: "4",
//   },
//   {
//     id: 5,
//     name: "ديانة",
//     count: "2",
//   },
// ];

// const discounts = [
//   {
//     id: 1,
//     name: "حسم الطلاب المتفوقين",
//     amount: "10",
//   },
//   {
//     id: 2,
//     name: "حسم الاخوات",
//     amount: "10",
//   },
//   {
//     id: 4,
//     name: "حسم الطلاب المتفوقين",
//     amount: "10",
//   },
//   {
//     id: 5,
//     name: "حسم الطلاب المتفوقين",
//     amount: "10",
//   },
// ];

// const columns = [
//   { name: "المبلغ", key: "money" },
//   { name: "المادة", key: "subject" },
// ];

// const data = [
//   {
//     id: 1,
//     money: "200000",
//     subject: "كيمياء",
//   },
//   {
//     id: 2,
//     money: "300000",
//     subject: "فيزياء",
//   },
//   {
//     id: 3,
//     money: "500000",
//     subject: "تحليل",
//   },
//   {
//     id: 3,
//     money: "1000000",
//     subject: "كلي قبل الخصم",
//   },
//   {
//     id: 3,
//     money: "1000000",
//     subject: "كلي بعد الخصم",
//   },
// ];
