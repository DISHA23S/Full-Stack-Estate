import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send email to backend to generate and send OTP
      const response = await axios.post('http://localhost:8800/forgot-password', { email });
      if (response.data.Status === 'Success') {
        alert('OTP has been sent to your email!');
      } else {
        alert('Error sending OTP.');
      }
    } catch (error) {
      console.log(error);
      alert('Error sending OTP.');
    }
  };

  // const handleResetPassword = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Send OTP and new password to backend to reset password
  //     const response = await axios.post('http://localhost:8800/reset-password', { email, otp, newPassword });
  //     if (response.data.Status === 'Success') {
  //       alert('Password reset successful!');
  //       navigate('/login'); // Redirect to login page upon successful password reset
  //     } else {
  //       alert('Error resetting password.');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     alert('Error resetting password.');
  //   }
  // };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h4>Forgot Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Send
          </button>
        </form>
        {/* <form onSubmit={handleResetPassword}>
          <div className="mb-3">
            <label htmlFor="otp">
              <strong>OTP</strong>
            </label>
            <input
              type="text"
              placeholder="Enter OTP"
              autoComplete="off"
              name="otp"
              className="form-control rounded-0"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword">
              <strong>New Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter New Password"
              autoComplete="off"
              name="newPassword"
              className="form-control rounded-0"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Reset Password
          </button>
        </form> */}
      </div>
    </div>
  );
}

export default ForgotPassword;
