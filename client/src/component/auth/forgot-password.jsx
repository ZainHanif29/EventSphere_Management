import React, { useState } from 'react';
import axios from 'axios';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/restpassword', { Email: email });
      console.log(response.data);
      setMessage('If an account with that email exists, we have sent a password reset link.');
      setLoading(false);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setMessage('Error sending password reset email. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: '#eee' }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-8 col-lg-6 col-xl-4 ">
            <div className="card  text-black" style={{ borderRadius: '25px' }}>
              <div className="card-body p-md-5">
                <h2 className="text-center mb-4">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                  <div className="container row col-8 mb-3">
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
                  <div className="d-flex justify-content-center mb-3">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                  </div>
                </form>
                {message && <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-info'} mt-2`}>{message}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPasswordForm;
