import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/vendors/mdi/css/materialdesignicons.min.css";
import "./assets/vendors/css/vendor.bundle.base.css";
import "./assets/css/style.css";

import Register from "./pages/student/auth/Register";
import Login from "./pages/student/auth/Login";
import Dashboard from "./pages/student/Dashboard";
import Forms from "./pages/student/Forms";
import ForgotPass from "./pages/student/auth/ForgotPass";
import Multisteps from "./pages/student/form_steps/Multisteps";
import Preview from "./pages/student/form_steps/Preview";
import PanelDashboard from "./pages/panel/PanelDashboard";
import PanelForms from "./pages/panel/PanelForms";
import PanelMultisteps from "./pages/panel/form_steps/PanelMultisteps";
import PanelPreview from "./pages/panel/form_steps/PanelPreview";
import PanelPrintForm from "./pages/panel/print_form/PanelPrintForm";
import LeadsList from "./pages/panel/leads/LeadsList";
import LinkForm from "./pages/panel/leads/LinkForm";
import LandingPage1 from "./pages/landingpages/LandingPage1";
import AdmissionsLists from "./pages/panel/admissions_list/AdmissionLists";
import Departments from "./pages/panel/departments/Departments";
import DepartmentForm from "./pages/panel/departments/DepartmentForm";
import Programs from "./pages/panel/Programs/Programs";
import ProgramForm from "./pages/panel/Programs/ProgramForm";
import SelectDepartment from "./pages/panel/Programs/SelectDepartment";
import { DepartmentProvider } from "./DepartmentContext";
import StreamForm from "./pages/panel/Programs/StreamForm";
import { StreamProvider } from "./StreamContext";
import Batches from "./pages/panel/batches/Batches";
import BatchForm from "./pages/panel/batches/BatchForm";
import Faculties from "./pages/panel/Faculties/Faculties";
import FacultyForm from "./pages/panel/Faculties/FacultyForm";
import Subjects from "./pages/panel/Subjects/Subjects";
import SelectProgram from "./pages/panel/Subjects/SelectProgram";
import SubjectForm from "./pages/panel/Subjects/SubjectForm";
import Students from "./pages/panel/Students/Students";
import GradeSchemes from "./pages/panel/GradeSchemes/GradeSchemes";
import GradeSchemeForm from "./pages/panel/GradeSchemes/GradeSchemeForm";
import GradesEntry from "./pages/panel/GradeSchemes/GradesEntry";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import FacultyLogin from "./pages/faculty/auth/FacultyLogin";
import MySubjects from "./pages/faculty/MySubjects/MySubjects";
import { FacultyProvider } from "./pages/faculty/FacultyContext";
import ExamMarksEntry from "./pages/faculty/ExamMarksEntry/ExamMarksEntry";
import TimeTable from "./pages/panel/TimeTables/TimeTable";
import Calender from "./pages/panel/AcademicCalender/Calender";
import Notifications from "./pages/panel/NotificationCenter/Notifications";
import Feedback from "./pages/panel/Feedback/Feedback";
import Attendance from "./pages/faculty/Attendance/Attendance";
import StudentTimetable from "./pages/student/Timetable/StudentTimetable";
import { StudentProvider } from "./pages/student/StudentContext";
import StudentLogin from "./pages/student/auth/StudentLogin";
import StudentDashboard from "./pages/student/StudentDashboard";

function App() {
  return (
    <>
      <DepartmentProvider>
        <FacultyProvider>
          <StudentProvider>
            <Router>
              <Routes>
                <Route path="/" exact element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-pass" element={<ForgotPass />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/forms" element={<Forms />} />
                <Route
                  path="/add-new-application-form"
                  element={<Multisteps />}
                />
                <Route
                  path="/edit-application-form/:id"
                  element={<Multisteps />}
                />
                <Route
                  path="/preview-application-form/:id"
                  element={<Preview />}
                />

                {/* admin panel routes */}
                <Route path="/panel-admin" element={<Login />} />
                <Route
                  path="/panel-admin/dashboard"
                  element={<PanelDashboard />}
                />
                <Route path="/panel-admin/forms" element={<PanelForms />} />
                <Route
                  path="/panel-admin/add-new-application-form"
                  element={<PanelMultisteps />}
                />
                <Route
                  path="/panel-admin/edit-application-form/:id"
                  element={<PanelMultisteps />}
                />
                <Route
                  path="/panel-admin/preview-application-form/:id"
                  element={<PanelPreview />}
                />
                <Route
                  path="/panel-admin/print-form/:id"
                  element={<PanelPrintForm />}
                />

                {/* leads */}
                <Route path="/panel-admin/leads" element={<LeadsList />} />
                <Route
                  path="/panel-admin/add-new-link-form"
                  element={<LinkForm />}
                />
                <Route
                  path="/panel-admin/edit-link-form/:id"
                  element={<LinkForm />}
                />

                {/* Departments */}
                <Route
                  path="/panel-admin/departments"
                  element={<Departments />}
                />
                <Route
                  path="/panel-admin/add-new-department-form"
                  element={<DepartmentForm />}
                />
                <Route
                  path="/panel-admin/edit-department-form/:id"
                  element={<DepartmentForm />}
                />

                {/* Programs */}
                <Route path="/panel-admin/programs" element={<Programs />} />
                <Route
                  path="/panel-admin/select-department"
                  element={<SelectDepartment />}
                />
                <Route
                  path="/panel-admin/edit-program-form/:id"
                  element={
                    <StreamProvider>
                      <ProgramForm />
                    </StreamProvider>
                  }
                />
                <Route
                  path="/panel-admin/stream-form"
                  element={
                    <StreamProvider>
                      <StreamForm />
                    </StreamProvider>
                  }
                />
                <Route
                  path="/panel-admin/stream-form/:id"
                  element={
                    <StreamProvider>
                      <StreamForm />
                    </StreamProvider>
                  }
                />
                <Route
                  path="/panel-admin/add-new-program-form"
                  element={
                    <StreamProvider>
                      <ProgramForm />
                    </StreamProvider>
                  }
                />

                {/* Batches */}
                <Route path="/panel-admin/batches" element={<Batches />} />
                <Route
                  path="/panel-admin/add-new-batch-form"
                  element={<BatchForm />}
                />
                <Route
                  path="/panel-admin/edit-batch-form/:id"
                  element={<BatchForm />}
                />

                {/* Faculties */}

                <Route path="/faculty/login" element={<FacultyLogin />} />
                <Route
                  path="/faculty/dashboard"
                  element={<FacultyDashboard />}
                />
                <Route path="/faculty/my-subjects" element={<MySubjects />} />
                <Route
                  path="/faculty/exam-marks-entry"
                  element={<ExamMarksEntry />}
                />
                <Route path="/faculty/attendance" element={<Attendance />} />
                <Route path="/panel-admin/faculties" element={<Faculties />} />
                <Route
                  path="/panel-admin/add-new-faculty-form"
                  element={<FacultyForm />}
                />
                <Route
                  path="/panel-admin/edit-faculty-form/:id"
                  element={<FacultyForm />}
                />

                {/* Subjects */}
                <Route path="/panel-admin/subjects" element={<Subjects />} />
                <Route
                  path="/panel-admin/select-program"
                  element={<SelectProgram />}
                />
                <Route
                  path="/panel-admin/add-new-subject-form"
                  element={<SubjectForm />}
                />
                <Route
                  path="/panel-admin/edit-subject-form/:id"
                  element={<SubjectForm />}
                />

                {/* Students */}
                <Route path="/student/login" element={<StudentLogin />} />
                <Route
                  path="/student/dashboard"
                  element={<StudentDashboard />}
                />
                <Route path="/panel-admin/students" element={<Students />} />
                <Route
                  path="/student/timetable"
                  element={<StudentTimetable />}
                />

                {/* Grade Scheme */}
                <Route
                  path="/panel-admin/grade-schemes"
                  element={<GradeSchemes />}
                />
                <Route
                  path="/panel-admin/add-grade-scheme"
                  element={<GradeSchemeForm />}
                />
                <Route
                  path="/panel-admin/add-grades"
                  element={<GradesEntry />}
                />
                <Route
                  path="/panel-admin/edit-grades/:id"
                  element={<GradesEntry />}
                />

                {/* TimeTable */}
                <Route path="/panel-admin/timetable" element={<TimeTable />} />

                {/* AcademicCalender */}
                <Route
                  path="/panel-admin/academic-calender"
                  element={<Calender />}
                />

                {/* Notificaion Center */}
                <Route
                  path="/panel-admin/notification-center"
                  element={<Notifications />}
                />

                {/* Feedback */}
                <Route path="/panel-admin/feedback" element={<Feedback />} />

                {/* admission enquiry */}
                <Route
                  path="/panel-admin/admissions-enquiry"
                  element={<AdmissionsLists />}
                />

                {/* landing page open to all  */}
                <Route path="/landing-page-1" element={<LandingPage1 />} />
              </Routes>
            </Router>
          </StudentProvider>
        </FacultyProvider>
      </DepartmentProvider>

      <ToastContainer />
    </>
  );
}

export default App;
