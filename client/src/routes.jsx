import { Route, Routes, useNavigate } from "react-router-dom";

// Import all components
import SignupForm from "./component/auth/register.jsx";
import LoginForm from "./component/auth/login.jsx";
import HomePage from "./component/attendee/pages/home.jsx";
import ViewUser from "./component/dasboard/jsx/view-user.jsx";
import ViewEvents from "./component/dasboard/jsx/view-events.jsx";
import CreateEvent from "./component/dasboard/jsx/create-event.jsx";
import AnalysisReport from "./component/dasboard/jsx/analysis-report.jsx";
import useUserData from "./hooks/user.js";
import UpdateEvent from "./component/dasboard/jsx/update-event.jsx";
import AboutUs from "./component/attendee/pages/about.jsx";
import { useEffect } from "react";

const RoutesFun = () => {
  const { name, email, role, error, res } = useUserData();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      console.log(name, email, role, error, res);
    } catch (e) {
      console.log(e);
    }
  }, [name, email, role, error, res]);

  const AttendeeRoutes = () => (
    <>
      <Route path="/home" element={<HomePage />} />
      <Route path="/about" element={<AboutUs />} />
    </>
  );

  const DashboardRoutes = () => (
    <>
      <Route path="/dashboard" element={<HomePage />} />
      <Route path="/a" element={<AboutUs />} />
      <Route path="/viewusers" element={<ViewUser />} />
      <Route path="/viewevents" element={<ViewEvents />} />
      <Route path="/createevent" element={<CreateEvent />} />
      <Route path="/analysis" element={<AnalysisReport />} />
      <Route path="/update/:eventId" element={<UpdateEvent />} />
    </>
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        {(res === "success" && role === "organizer") && <DashboardRoutes />}
        {(res === "success" && role === "attendee") && <AttendeeRoutes />}
        {res !== "success" && navigate('/home')}
      </Routes>
    </>
  );
};

export default RoutesFun;
