import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/restpassword', { Email: email });
      console.log(response.data);
      setMessage('If an account with that email exists, we have sent a password reset link.');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setMessage('Error sending password reset email. Please try again later.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>
        <button type="submit" className="btn btn-primary">Send Reset Link</button>
      </form>
      {message && <div className="alert alert-info mt-2">{message}</div>}
    </div>
  );
}

export default ForgotPasswordForm;
