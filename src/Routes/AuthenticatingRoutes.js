import SidebarLayout from "../Layout/SidebarLayout";
import Packages from "../Pages/packages/Packages";
import PrivateRoutes from "./PrivateRoutes";
import Students from "../Pages/Students/Students";
import RegisterStudent from "../Pages/Students/RegisterStudent";
import AddPackage from "../Pages/packages/AddPackage";
import PackagesDetails from "../Pages/packages/PackagesDetails";
import Teachers from "../Pages/Teacher/Teachers";
import AddTeacher from "../Pages/Teacher/AddTeacher";
import TeacherProfile from "../Pages/Teacher/TeacherProfile";
import Student from "../Pages/Students/Student";
import Expenses from "../Pages/Expense/Expenses";
import AddStudentToPackage from "../Pages/packages/AddStudentToPackage";
import EditStudent from "../Pages/Students/EditStudent";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import NotDone from "../Pages/NotDonePage/NotDone";
import AddMarks from "../Pages/AddMarks/AddMarks";
import UpdateRegister from "../Pages/Register/UpdateRegister";
import AddExpenses from "../Pages/Expense/AddExpenses";
import EditExpenses from "../Pages/Expense/EditExpenses";
import Presence from "../Pages/Presences/Presence";
import Financial from "../Pages/financial/Financial";
import QuickStudentRegister from "../Pages/Register/QuickStudentRegister";

const AuthenticationRoutes = {
  element: <PrivateRoutes />,

  children: [
    {
      element: <SidebarLayout></SidebarLayout>,
      path: "dashboard",

      children: [
        {
          element: <Packages />,
          path: "package",
        },
        {
          element: <AddPackage />,
          path: "add-package",
        },
        {
          element: <PackagesDetails />,
          path: "package/:id",
        },
        {
          element: <AddStudentToPackage />,
          path: "package/:id/add-student/:studentId",
        },
        {
          element: <Teachers />,
          path: "teachers",
        },
        { element: <AddTeacher />, path: "add-teacher" },

        {
          element: <TeacherProfile />,
          path: "teacher/:id",
        },

        {
          element: <Students />,
          path: "students",
        },
        {
          element: <Student />,
          path: "student/:id",
        },
        {
          element: <RegisterStudent />,
          path: "add-student",
        },
        {
          element: <EditStudent />,
          path: "edit-student/:id",
        },
        {
          element: <Presence />,
          path: "presence",
        },

        {
          element: <Expenses />,
          path: "expenses",
        },
        {
          element: <AddExpenses />,
          path: "add-expense",
        },
        {
          element: <EditExpenses />,
          path: "edit-expense/:id",
        },
        {
          element: <Home />,
          path: "home",
        },
        {
          element: <Register />,
          path: "register-student",
        },
        {
          element: <QuickStudentRegister />,
          path: "create-register-student",
        },
        {
          element: <UpdateRegister />,
          path: "update-register-student/:id",
        },
        {
          element: <Financial />,
          path: "stats",
        },
        {
          element: <AddMarks />,
          path: "add-marks/:id",
        },
      ],
    },
  ],
};
export default AuthenticationRoutes;
