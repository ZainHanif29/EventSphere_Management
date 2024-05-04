// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './component/login-form';
import RegistrationForm from './component/rigester-form';
import UserAuth from './component/rigester';

function App() {
  return (
    <div className="container">
      <div className="row">
        <h1>EventSphere_Management</h1>
      </div>
      {/* <Routes>
        <Route path="/l" element={<LoginForm />} />
        <Route path="/" element={<RegistrationForm />} />
      </Routes> */}

      <UserAuth />
    </div>
  );
}

export default App;
