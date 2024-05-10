import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

// Import all components
import SignupForm from "./component/auth/register.jsx";
import LoginForm from "./component/auth/login.jsx";
import ForgotPasswordForm from "./component/auth/forgot-password.jsx";
import ChangePasswordForm from "./component/auth/change-password.jsx";
import HomePage from "./component/attendee/pages/home.jsx";
import LoggedUsers from "./component/auth/user-logged.jsx";
import ViewUser from "./component/dasboard/jsx/view-user.jsx";
import ViewEvents from "./component/dasboard/jsx/view-events.jsx";
import ViewBooth from "./component/dasboard/jsx/view-booth.jsx";
import CreateEvent from "./component/dasboard/jsx/create-event.jsx";
import AnalysisReport from "./component/dasboard/jsx/analysis-report.jsx";
import useUserData from "./hooks/user.js";

const RoutesFun = () => {
  const { name, email, role, error, res } = useUserData();

  const CommonRoutes = () => (
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/forgot-password" element={<ForgotPasswordForm />} />
    </>
  );
  const Auth = () => (
    <>
      <Route path="/change-password" element={<ChangePasswordForm />} />
      <Route path="/profile" element={<LoggedUsers />} />
    </>
  );
  const DashboardRoutes = () => (
    <>
      <Route path="/viewusers" element={<ViewUser />} />
      <Route path="/viewevents" element={<ViewEvents />} />
      <Route path="/viewbooth" element={<ViewBooth />} />
      <Route path="/createevent" element={<CreateEvent />} />
      <Route path="/analysis" element={<AnalysisReport />} />
    </>
  );

  return (
    <>
      <Routes>
        {CommonRoutes()};
        {res == "success" ? role === "organizer" && DashboardRoutes() : <></>};
        {res == "success" && Auth()};
      </Routes>
    </>
  );
};

export default RoutesFun;
