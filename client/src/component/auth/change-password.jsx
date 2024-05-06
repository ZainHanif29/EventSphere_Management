import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function ChangePasswordForm() {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('New password and confirm password do not match.');
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('No authorization token found.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/changepassword', {
        Password: formData.newPassword,
        PasswordConfirm: formData.confirmPassword,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to change password. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Loading...' : 'Change Password'}
        </button>
      </form>
      {message && <div className="alert alert-info mt-2">{message}</div>}
    </div>
  );
}

export default ChangePasswordForm;
