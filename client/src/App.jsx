// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import UserAuth from './component/rigester_login.jsx';
import RegistrationForm from './component/auth/rigester.jsx';
import LoginForm from './component/auth/login.jsx';
import ForgotPasswordForm from './component/auth/forget-password.jsx';
import ChangePasswordForm from './component/auth/change-password.jsx';
import UserTable from './component/admin/user.jsx';

function App() {
  return (
    <div className="container">
      <div className="row">
        <h1>EventSphere_Management</h1>
      </div>
      <Routes>
        <Route path="/" element={<UserAuth />} />
        <Route path="/r" element={<RegistrationForm />} />
        <Route path="/l" element={<LoginForm />} />
        <Route path="/f" element={<ForgotPasswordForm />} />
        <Route path="/c" element={<ChangePasswordForm />} />
        <Route path="/user" element={<UserTable />} />
      </Routes>
    </div>
  );
}

export default App;
