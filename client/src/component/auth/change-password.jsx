import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function ChangePasswordForm() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('New password and confirm password do not match.');
      return;
    }

    const token = localStorage.getItem('token'); // Get the token from local storage
    if (!token) {
      setMessage('No authorization token found.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/changepassword', {
        // CurrentPassword: formData.currentPassword, // Uncomment if API requires it
        Password: formData.newPassword,
        PasswordConfirm: formData.confirmPassword,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`  // Include the token in the request headers
        }
      });
      setMessage(response.data.message);
    } catch (error) {
      // console.error('Change Password Error:', error.response ? error.response.data : error.message);
      setMessage('Failed to change password. Please try again later.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        {/* Commented out since not used, but available if needed later
        <div className="mb-3">
          <label htmlFor="currentPassword" className="form-label">Current Password</label>
          <input
            type="password"
            className="form-control"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
        </div>
        */}
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Change Password</button>
      </form>
      {message && <div className="alert alert-info mt-2">{message}</div>}
    </div>
  );
}

export default ChangePasswordForm;
