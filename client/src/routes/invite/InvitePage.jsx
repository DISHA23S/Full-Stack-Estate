// // Create a new file or update the existing InvitesPage component
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const InvitesPage = () => {
//   const [invitesCount, setInvitesCount] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchInvitesCount = async () => {
//       try {
//         const response = await axios.get('http://localhost:8800/api/invites-count');
//         setInvitesCount(response.data.count);
//       } catch (error) {
//         console.error('Failed to fetch invites count:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInvitesCount();
//   }, []);

//   return (
//     <div className="invites-container">
//       <h2>Invites Page</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : invitesCount === 0 ? (
//         <p>No invites found.</p>
//       ) : (
//         <p>Total Invites: {invitesCount}</p>
//       )}
//     </div>
//   );
// };

// export default InvitesPage;
