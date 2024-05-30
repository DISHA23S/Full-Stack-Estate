// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const ResetPassword = () => {
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const navigate = useNavigate();

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     try {
//       // Step 1: Verify email and OTP
//       const verifyResponse = await axios.post('http://localhost:8800/verify-email', { email, otp });
//       if (verifyResponse.data.Status === 'Success') {
//         // Step 2: Reset password
//         const resetResponse = await axios.post('http://localhost:8800/reset-password', { email, newPassword });
//         if (resetResponse.data.Status === 'Success') {
//           alert('Password has been reset successfully!');
//           navigate('/login');
//         } else {
//           alert('Error resetting password.');
//         }
//       } else {
//         alert('Invalid OTP.');
//       }
//     } catch (error) {
//       console.log(error);
//       alert('Error resetting password.');
//     }
//   };

//   return (
//     <div className="reset-password-container">
//       <h2>Reset Password</h2>
//       {otp !== '' && (
//         <form onSubmit={handleResetPassword}>
//           <div className="mb-3">
//             <label htmlFor="otp">
//               <strong>OTP</strong>
//             </label>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               autoComplete="off"
//               name="otp"
//               className="form-control rounded-0"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="newPassword">
//               <strong>New Password</strong>
//             </label>
//             <input
//               type="password"
//               placeholder="Enter New Password"
//               autoComplete="off"
//               name="newPassword"
//               className="form-control rounded-0"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="btn btn-success rounded-0">
//             Reset Password
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default ResetPassword;
