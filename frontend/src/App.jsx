import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import UserDashboard from "./pages/UserDashboard";
import PrivateRoute from "./utils/PrivateRote";
import { AuthProvider } from "./context/AuthContext";
import ErrorPage from "./pages/ErrorPage";
import { UserProvider } from "./context/UserContext";
import TeacherDashboard from "./pages/TeacherDashboard";
import { TeacherProvider } from "./context/TeacherContext";
import ProjectDetailsPage from "./pages/projectDetailsPage";
import AddMarks from "./components/AddMarks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./pages/AdminDashboard";
import AddPeoplePage from "./pages/AddPeoplePage";
import CreateNotificationPage from "./pages/CreateNotificationPage";

function App() {
  return (
    <>
      <ToastContainer />
      <UserProvider>
        <TeacherProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="*" element={<ErrorPage />} />
              <Route path="/dashboard/:id" element={<UserDashboard />} />

              <Route path="/teacherDashboard" element={<TeacherDashboard />} />
              <Route path="/adminDashboard" element={<AdminDashboard />} />
              <Route path="/addPeople" element={<AddPeoplePage />} />
              <Route path="/add" element={<AddMarks />} />
              <Route
                path="/teacherDashboard/:projectId"
                element={<ProjectDetailsPage />}
              />
              <Route
                path="/createNotices/:role"
                element={<CreateNotificationPage />}
              />
            </Routes>
          </AuthProvider>
        </TeacherProvider>
      </UserProvider>
    </>
  );
}

export default App;
