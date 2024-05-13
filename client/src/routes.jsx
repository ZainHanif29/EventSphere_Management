import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

// Import all components
import SignupForm from "./component/auth/register.jsx";
import LoginForm from "./component/auth/login.jsx";
import HomePage from "./component/attendee/pages/home.jsx";
import ViewUser from "./component/dasboard/jsx/view-user.jsx";
import ViewEvents from "./component/dasboard/jsx/view-events.jsx";
import CreateEvent from "./component/dasboard/jsx/create-event.jsx";
import useUserData from "./hooks/user.js";
import UpdateEvent from "./component/dasboard/jsx/update-event.jsx";
import AboutUs from "./component/attendee/pages/about.jsx";

const RoutesFun = () => {
  const { name, email, role, error, res } = useUserData();
  const navigate = useNavigate();
  useEffect(() => {
    try {
    } catch (e) {}
  }, [name, email, role, error, res]);

  const AttendeeRoutes = () => (
    <>
      <Route path="/home" element={<HomePage />} />
      <Route path="/about" element={<AboutUs />} />
    </>
  );
  const DashboardRoutes = () => (
    <>
       <Route path="/home" element={<HomePage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/viewusers" element={<ViewUser />} />
      <Route path="/viewevents" element={<ViewEvents />} />
      <Route path="/createevent" element={<CreateEvent />} />
      <Route path="/update/:eventId" element={<UpdateEvent />} />
    </>
  );
  const auth = () => (
    <>
      <Route path="/" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />
    </>
  );

  return (
    <>
      <Routes>
        {res !== "success" && auth()}
        {res === "success" && role === "organizer" && DashboardRoutes()}
        {res === "success" && role === "attendee" && AttendeeRoutes()}
        <Route path="*" element={<LoginForm />} />
      </Routes>
    </>
  );
};

export default RoutesFun;
