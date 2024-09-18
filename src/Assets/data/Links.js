import { MdOutlineLibraryBooks } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { BiSolidBeenHere } from "react-icons/bi";
import { GiExpense } from "react-icons/gi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

export const links = [
  {
    name: "الرئيسية",
    slag: "home",
    icon: (
      <MdOutlineDashboard
        style={{
          fontWeight: "bold",
          fontSize: "1.3rem",
        }}
      />
    ),
  },
  {
    name: "الدورات التعليمية",
    slag: "package",
    icon: (
      <MdOutlineLibraryBooks
        style={{
          fontWeight: "bold",
          fontSize: "1.3rem",
        }}
      />
    ),
  },
  {
    name: "المدرسين",
    slag: "teachers",
    icon: (
      <FaChalkboardTeacher
        style={{
          fontWeight: "bold",
          fontSize: "1.3rem",
        }}
      />
    ),
  },
  {
    name: "الطلاب",
    slag: "students",
    icon: (
      <PiStudentFill
        style={{
          fontWeight: "bold",
          fontSize: "1.3rem",
        }}
      />
    ),
  },
  // {
  //   name: "الحضور",
  //   slag: "presence",
  //   icon: (
  //     <BiSolidBeenHere
  //       style={{
  //         fontWeight: "bold",
  //         fontSize: "1.3rem",
  //       }}
  //     />
  //   ),
  // },

  {
    name: "النفقات",
    slag: "expenses",
    icon: (
      <GiExpense
        style={{
          fontWeight: "bold",
          fontSize: "1.3rem",
        }}
      />
    ),
  },
  {
    name: "الاحصائات المالية",
    slag: "stats",
    icon: (
      <FaMoneyBillTrendUp
        style={{
          fontWeight: "bold",
          fontSize: "1.3rem",
        }}
      />
    ),
  },
];
