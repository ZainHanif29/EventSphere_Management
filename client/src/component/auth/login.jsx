import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate(); 

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
      console.log(response.data.token);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Login Error:', error.response ? error.response.data : error.message);
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
    <section className="vh-100" style={{ backgroundColor: '#eee' }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: '25px' }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <h2 className="text-center mb-4">Login</h2>
                    <form onSubmit={handleLogin} className="mx-1 mx-md-4">
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
                      <div className="d-flex justify-content-center mx-4 mb-3">
                        <button type="submit" className="btn btn-primary btn-lg">Login</button>
                      </div>
                      <Link type="button" className="btn btn-link" to="/f">
                        Forgot password?
                      </Link>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid" alt="Sample image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;