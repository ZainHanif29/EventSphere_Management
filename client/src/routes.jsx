import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import SignupForm from "./component/auth/register.jsx";
import LoginForm from "./component/auth/login.jsx";
import ForgotPasswordForm from "./component/auth/forgot-password.jsx";
import ChangePasswordForm from "./component/auth/change-password.jsx";
import LoggedUsers from "./component/auth/user-logged.jsx";
// Dashboard Routes
import ViewUser from "./component/dasboard/jsx/view-user.jsx";
import ViewEvents from "./component/dasboard/jsx/view-events.jsx";
import ViewBooth from "./component/dasboard/jsx/view-booth.jsx";
import CreateEvent from "./component/dasboard/jsx/create-event.jsx";
import AnalysisReport from "./component/dasboard/jsx/analysis-report.jsx";
import HomePage from "./component/attendee/pages/home.jsx";
import axios from "axios";

const RoutesFun = () => {
  const [role, setRole] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token"); 
      if (!token) {
        setError("No authorization token found.");
        return;
      }
      try {
        const response = await axios.post(
          "http://localhost:8000/api/loggeduser",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setError(true);
        setRole(response.data.user.Role);
      } catch (error) {
        setError(false);
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      {error ? (
        <Routes>
          {role === "attendee" && (
            <>
              <Route path="/sign" element={<SignupForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/forgot-password" element={<ForgotPasswordForm />} />
              <Route path="/change-password" element={<ChangePasswordForm />} />
              <Route path="/profile" element={<LoggedUsers />} />
              <Route path="/" element={<HomePage />} />
            </>
          )}
          {/* {role === "exhibitor" && (
            <>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/" element={<HomePage />} />
            </>
          )} */}
          {role === "orginizor" && (
            <>
              <Route path="/sign" element={<SignupForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/forgot-password" element={<ForgotPasswordForm />} />
              <Route path="/change-password" element={<ChangePasswordForm />} />
              <Route path="/profile" element={<LoggedUsers />} />
              <Route path="/home" element={<HomePage />} />
              {/* Dashboard Routes */}
              <Route path="/viewusers" element={<ViewUser />} />
              <Route path="/viewevents" element={<ViewEvents />} />
              <Route path="/viewbooth" element={<ViewBooth />} />
              <Route path="/createevent" element={<CreateEvent />} />
              <Route path="/" element={<AnalysisReport />} />
            </>
          )}
        </Routes>
      ) : (
        <div className="text-center text-danger h1">Error</div>
      )}
    </>
  );
};

export default RoutesFun;
