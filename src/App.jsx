import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthLayout from "./features/auth/AuthLayout";
import LoginForm from "./features/auth/LoginForm";
import SignupForm from "./features/auth/SignupForm";

import Dashboard from "./layouts/Dashboard";
import SetupAssessment from "./features/assesments/SetupAssessment";
import TakeAssessment from "./features/assesments/TakeAssessment";
import Resultpage from "./layouts/ResultPage";
import NoInternetPage from "./layouts/NoInternet";
import Notifications from "./components/Notification";
import UserManagement from "./layouts/User-Management";
import AssessmentManagement from "./features/assesments/AssessmentManagement";
import Full from "./features/assesments/FullScreen";
import ExamUI from "./features/assesments/EXamUI";
import ExaminerDashboard from "./layouts/DefaultDashboard";

import store from "./Store";
import useAuthCheck from "./hooks/useAuthCheck";
// import MyAssessment from "./features/assesments/MyAssessment";
import Questions from "./features/questionBank/QuestionBank";
import QuestionCategories from "./features/questionBank/QuestionCategories";
import InvitePeople from "./features/assesments/Invitation";
import ScreenReaderComponent from "./features/assesments/CheckVoice";
import ManageRepository from "./features/questionBank/ManageRepository";
import ProtectedRoutes from "./utils/ProtectedRoute";
import PageNotFound from "./components/PageNotFound";
import ChatInterface from "./features/ai/ChatInterface";
import AddQuestion_from_Bank from "./features/assesments/AddQuestion_from_Bank";
import ResultsRanking from "./features/assesments/MyAssessment";
import LandingPage from "./layouts/Landing";
import ForgotPassword from "./features/auth/ForgotPassword";
// import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  // useAuthCheck();

  return (
    <Provider store={store}>
      <Routes>
        {/* Public Auth Routes */}
  <Route path="/" element={<LandingPage />} />

     <Route element={<AuthLayout />}>
  <Route path="/login" element={<LoginForm />} />
  <Route path="/signup" element={<SignupForm />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
</Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<Dashboard />}>
            <Route path="/setup-assessment" element={<SetupAssessment />} />
            <Route path="/setup-assessment/:assessmentTitle/:assessmentId" element={<SetupAssessment />} />
            <Route path="/take-assessment" element={<TakeAssessment />} />
            <Route
              path="/take-assessment/:assessmentId"
              element={<TakeAssessment />}
            />
            <Route path="/assessment-results" element={<Resultpage />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/dashboard" element={<ExaminerDashboard />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route
              path="/manage-assessment"
              element={<AssessmentManagement />}
            />
            <Route path="/assessment/:assessmentId" element={<Full />} />
            <Route path="/another" element={<ExamUI />} />
            <Route path="/assessment" element={<ResultsRanking />} />
            <Route path="/question-bank" element={<Questions />} />
            <Route path="/categories" element={<QuestionCategories />} />
            <Route
              path="/invitiation/:name/:assessmentId"
              element={<InvitePeople />}
            />
            <Route path="/checkvoice" element={<ScreenReaderComponent />} />
            <Route
              path="/my-question-repository/:categoryName/:categoryId"
              element={<ManageRepository />}
            />
            <Route path="/ai" element={<ChatInterface />} />
            <Route path="/add-from-bank/:QuestionType/:sectionId" element={<AddQuestion_from_Bank/>}/>

            {/* <Route path="*" element={<NoInternetPage />} /> */}

            <Route path="/*" element={<PageNotFound />} />
          </Route>
        </Route>

        {/* Fallback route for 404 / no internet */}
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Flip}
      />
    </Provider>
  );
}

export default App;
