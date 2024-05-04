import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/api/login`, {
        Email: formData.email,
        Password: formData.password,
      });
      console.log(response.data);
      localStorage.setItem('token', response.data.token);

      alert('Login Successful: ' + response.data.message);
    } catch (error) {
      console.error('Login Error:', error.response ? error.response.data : error.message);
      alert('Login Failed: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/resetpassword`, {
        Email: formData.email,
      });
      console.log(response.data);
      alert('Password reset link has been sent to your email: ' + response.data.message);
    } catch (error) {
      console.error('Forgot Password Error:', error.response ? error.response.data : error.message);
      alert('Failed to send password reset link: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <Link type="button" className="btn btn-link" to="/f">
          Forgot password?
        </Link>
      </form>
    </div>
  );
}

export default LoginForm;
