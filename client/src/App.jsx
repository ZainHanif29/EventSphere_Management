// // App.js
// import React from "react";
// import { Routes, Route } from "react-router-dom";

// // import LoginForm from "./component/auth/login.jsx";
// import ForgotPasswordForm from "./component/auth/forget-password.jsx";
// import ChangePasswordForm from "./component/auth/change-password.jsx";
// import LoggedUsers from "./component/auth/user-logged.jsx";
// import UserTable from "./component/admin/user.jsx";
// import NavbarComp from "./component/public/navbar.jsx";
// import SignupForm from "./component/auth/regester.jsx";
// import LoginForm from "./component/auth/login.jsx";


// function App() {
//   return (
//     <div className="container">
//       {/* <div className="row">
//         <h1>EventSphere_Management</h1>
//       </div>
//       <div className="row">
//         <NavbarComp />
//       </div> */}
//       <Routes>
//         <Route path="/" element={<SignupForm />} />
//         <Route path="/l" element={<LoginForm />} />
//         <Route path="/f" element={<ForgotPasswordForm />} />
//         <Route path="/c" element={<ChangePasswordForm />} />
//         <Route path="/user" element={<UserTable />} />
//         <Route path="/u" element={<LoggedUsers />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
import React from "react";
import { Routes, Route } from "react-router-dom";
import NavbarComp from "./component/public/navbar.jsx";
import SignupForm from "./component/auth/register.jsx"; // Ensure correct spelling and file naming
import LoginForm from "./component/auth/login.jsx";
import ForgotPasswordForm from "./component/auth/forgot-password.jsx"; // Ensure correct spelling and file naming
import ChangePasswordForm from "./component/auth/change-password.jsx";
import LoggedUsers from "./component/auth/user-logged.jsx";
import UserTable from "./component/admin/user.jsx";
import Nav from "./component/dasboard/jsx/navbar.jsx";
import RegesterUser from "./component/dasboard/jsx/view-user.jsx";
import ViewUser from "./component/dasboard/jsx/view-user.jsx";
import ViewEvents from "./component/dasboard/jsx/view-events.jsx";
import ViewBooth from "./component/dasboard/jsx/view-booth.jsx";
import CreateEvent from "./component/dasboard/jsx/create-event.jsx";
import AnalysisReport from "./component/dasboard/jsx/analysis-report.jsx";

function App() {
  return (
    <div className="container">
      {/* <NavbarComp /> */}
      <Nav />
      <Routes>
      
        {/* <Route path="/" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/change-password" element={<ChangePasswordForm />} />
        <Route path="/users" element={<UserTable />} />
        <Route path="/profile" element={<LoggedUsers />} /> */}
        {/* Dasboard */}
        <Route path="/viewusers" element={<ViewUser />} />
        <Route path="/viewevents" element={<ViewEvents />} />
        <Route path="/viewbooth" element={<ViewBooth />} />
        <Route path="/createevent" element={<CreateEvent />} />
        <Route path="/" element={<AnalysisReport />} />
      </Routes>
    </div>
  );
}

export default App;
