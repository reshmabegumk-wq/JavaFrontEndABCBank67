// import { useEffect, useState } from "react";
// import {
//   FaFileAlt,
//   FaClock,
//   FaCheckCircle,
//   FaUserTie,
//   FaCalendarAlt,
// } from "react-icons/fa";
// import API from "../../api"; // 👈 SAME axios instance

// const MyRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMyRequests = async () => {
//       try {
//         /**
//          * ✅ PAYLOAD
//          * You can later replace accountNumber with dynamic value from login
//          */
//         const payload = {
//           accountNumber: 1440320196,
//         };

//         /**
//          * ✅ API INTEGRATION (POST)
//          */
//         const response = await API.post(
//           "/abcbank/api/queriesResponse/queriesList",
//           payload
//         );

//         console.log("My Requests API Response:", response.data);

//         /**
//          * ✅ RESPONSE MAPPING
//          */
//         if (response.data?.status) {
//           setRequests(response.data.data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch requests", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMyRequests();
//   }, []);

//   if (loading) {
//     return <div style={styles.loading}>Loading requests...</div>;
//   }

//   if (requests.length === 0) {
//     return <div style={styles.loading}>No requests found</div>;
//   }

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>My Requests</h2>

//       <div style={styles.list}>
//         {requests.map((item) => (
//           <div key={item.queriesId} style={styles.card}>
//             {/* HEADER */}
//             <div style={styles.cardHeader}>
//               <FaFileAlt size={18} />
//               <span style={styles.queryText}>{item.customerQuery}</span>
//             </div>

//             {/* META INFO */}
//             <div style={styles.meta}>
//               <div style={styles.metaRow}>
//                 <FaCalendarAlt />
//                 <span>Raised on: {item.queryRaisedDate}</span>
//               </div>

//               <div style={styles.metaRow}>
//                 <FaClock />
//                 <span>Status: {item.status}</span>
//               </div>

//               {item.status === "APPROVED" && (
//                 <div style={styles.metaRow}>
//                   <FaCheckCircle color="#22c55e" />
//                   <span>
//                     Approved by: {item.approvedByName || "Admin"}
//                   </span>
//                 </div>
//               )}

//               {item.queryApprovedDate && (
//                 <div style={styles.metaRow}>
//                   <FaUserTie />
//                   <span>Approved Date: {item.queryApprovedDate}</span>
//                 </div>
//               )}
//             </div>

//             {/* STATUS BADGE */}
//             <div
//               style={{
//                 ...styles.badge,
//                 backgroundColor:
//                   item.status === "APPROVED" ? "#dcfce7" : "#fef3c7",
//                 color:
//                   item.status === "APPROVED" ? "#166534" : "#92400e",
//               }}
//             >
//               {item.status}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyRequests;

// /* =======================
//    🎨 STYLES (INLINE CSS)
//    ======================= */

// const styles = {
//   container: {
//     padding: "24px",
//     maxWidth: "900px",
//     margin: "0 auto",
//   },

//   title: {
//     fontSize: "22px",
//     fontWeight: "700",
//     marginBottom: "20px",
//     color: "var(--color-text)",
//   },

//   list: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "16px",
//   },

//   card: {
//     background: "var(--color-surface)",
//     border: "1px solid var(--color-border)",
//     borderRadius: "16px",
//     padding: "18px",
//     boxShadow: "var(--shadow-sm)",
//     position: "relative",
//   },

//   cardHeader: {
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//     fontSize: "16px",
//     fontWeight: "600",
//     color: "var(--color-text)",
//     marginBottom: "12px",
//   },

//   queryText: {
//     flex: 1,
//   },

//   meta: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "8px",
//     fontSize: "14px",
//     color: "var(--color-text-secondary)",
//   },

//   metaRow: {
//     display: "flex",
//     alignItems: "center",
//     gap: "8px",
//   },

//   badge: {
//     position: "absolute",
//     top: "18px",
//     right: "18px",
//     padding: "6px 12px",
//     fontSize: "12px",
//     fontWeight: "700",
//     borderRadius: "20px",
//     textTransform: "uppercase",
//   },

//   loading: {
//     padding: "40px",
//     textAlign: "center",
//     fontSize: "15px",
//     color: "var(--color-muted)",
//   },
// };

// src/components/MyRequests/MyRequests.jsx

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// // Create API instance
// const API = axios.create({
//   baseURL: "http://localhost:8077",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// const MyRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Default account for demo
//   const defaultAccount = 1440320196;

//   useEffect(() => {
//     fetchRequests(defaultAccount);
//   }, []);

//   const fetchRequests = async (accountNumber) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const payload = {
//         accountNumber: accountNumber
//       };

//       console.log("Fetching requests for account:", accountNumber);
      
//       const response = await API.post(
//         "/abcbank/api/queriesResponse/queriesList",
//         payload
//       );

//       console.log("API Response:", response.data);

//       if (response.data?.status) {
//         setRequests(response.data.data || []);
//       } else {
//         setError(response.data?.message || "Failed to fetch requests");
//         setRequests([]);
//       }
//     } catch (error) {
//       console.error("Failed to fetch requests", error);
//       setError(
//         error.response?.data?.message || 
//         "Network error. Please check if backend is running."
//       );
//       setRequests([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Simple loading state
//   if (loading) {
//     return (
//       <div style={styles.container}>
//         <div style={styles.loading}>
//           <p>Loading your requests...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div style={styles.container}>
//         <div style={styles.error}>
//           <p style={styles.errorText}>Error: {error}</p>
//           <button 
//             onClick={() => fetchRequests(defaultAccount)} 
//             style={styles.retryButton}
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Empty state
//   if (requests.length === 0) {
//     return (
//       <div style={styles.container}>
//         <div style={styles.empty}>
//           <h3>No Requests Found</h3>
//           <p>You haven't submitted any requests yet.</p>
//         </div>
//       </div>
//     );
//   }

//   // Main render with requests
//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>My Requests</h2>
      
//       <div style={styles.requestsList}>
//         {requests.map((item) => (
//           <div key={item.queriesId} style={styles.card}>
//             {/* Header with status */}
//             <div style={styles.cardHeader}>
//               <h3 style={styles.queryText}>{item.customerQuery}</h3>
//               <span style={{
//                 ...styles.statusBadge,
//                 ...getStatusStyle(item.status)
//               }}>
//                 {item.status || "PENDING"}
//               </span>
//             </div>

//             {/* Basic Info */}
//             <div style={styles.cardBody}>
//               <p><strong>Account:</strong> {item.accountNumber}</p>
//               <p><strong>Customer:</strong> {item.fullName || "N/A"}</p>
//               <p><strong>Mobile:</strong> {item.mobileNumber || "N/A"}</p>
//               <p><strong>Raised Date:</strong> {item.queryRaisedDate || "N/A"}</p>
              
//               {/* Response info if available */}
//               {(item.status === "APPROVED" || item.status === "REJECTED") && (
//                 <div style={styles.responseSection}>
//                   <h4>Response Details:</h4>
//                   {item.approvedByName && (
//                     <p><strong>Approved By:</strong> {item.approvedByName}</p>
//                   )}
//                   {item.queryApprovedDate && (
//                     <p><strong>Approved Date:</strong> {item.queryApprovedDate}</p>
//                   )}
//                   {item.queryResponse && (
//                     <p><strong>Response:</strong> {item.queryResponse}</p>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Helper function for status colors
// const getStatusStyle = (status) => {
//   switch (status?.toUpperCase()) {
//     case "APPROVED":
//       return { backgroundColor: "#d4edda", color: "#155724" };
//     case "REJECTED":
//       return { backgroundColor: "#f8d7da", color: "#721c24" };
//     case "PENDING":
//       return { backgroundColor: "#fff3cd", color: "#856404" };
//     default:
//       return { backgroundColor: "#e2e3e5", color: "#383d41" };
//   }
// };

// // Simple inline styles
// const styles = {
//   container: {
//     maxWidth: "1200px",
//     margin: "0 auto",
//     padding: "20px",
//     fontFamily: "Arial, sans-serif",
//   },
//   title: {
//     fontSize: "24px",
//     color: "#333",
//     marginBottom: "20px",
//   },
//   requestsList: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "15px",
//   },
//   card: {
//     backgroundColor: "#fff",
//     border: "1px solid #ddd",
//     borderRadius: "8px",
//     padding: "20px",
//     boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//   },
//   cardHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "15px",
//     paddingBottom: "10px",
//     borderBottom: "1px solid #eee",
//   },
//   queryText: {
//     margin: 0,
//     fontSize: "18px",
//     color: "#333",
//   },
//   statusBadge: {
//     padding: "5px 10px",
//     borderRadius: "4px",
//     fontSize: "12px",
//     fontWeight: "bold",
//   },
//   cardBody: {
//     fontSize: "14px",
//     lineHeight: "1.6",
//   },
//   responseSection: {
//     marginTop: "15px",
//     padding: "15px",
//     backgroundColor: "#f8f9fa",
//     borderRadius: "4px",
//     borderLeft: "4px solid #007bff",
//   },
//   loading: {
//     textAlign: "center",
//     padding: "40px",
//     fontSize: "16px",
//     color: "#666",
//   },
//   error: {
//     textAlign: "center",
//     padding: "40px",
//     backgroundColor: "#f8d7da",
//     borderRadius: "4px",
//   },
//   errorText: {
//     color: "#721c24",
//     marginBottom: "15px",
//   },
//   retryButton: {
//     padding: "8px 16px",
//     backgroundColor: "#dc3545",
//     color: "white",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
//   empty: {
//     textAlign: "center",
//     padding: "40px",
//     backgroundColor: "#f8f9fa",
//     borderRadius: "4px",
//   },
// };

// export default MyRequests;





// import React, { useState, useEffect } from "react";
// import axios from "axios";

// // Create API instance
// const API = axios.create({
//   baseURL: "http://localhost:8077",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// const MyRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Default account for demo
//   const defaultAccount = 1440320196;

//   useEffect(() => {
//     fetchRequests(defaultAccount);
//   }, []);

//   const fetchRequests = async (accountNumber) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const payload = {
//         accountNumber: accountNumber
//       };

//       console.log("Fetching requests for account:", accountNumber);
      
//       const response = await API.post(
//         "/abcbank/api/queriesResponse/queriesList",
//         payload
//       );

//       console.log("API Response:", response.data);

//       if (response.data?.status) {
//         setRequests(response.data.data || []);
//       } else {
//         setError(response.data?.message || "Failed to fetch requests");
//         setRequests([]);
//       }
//     } catch (error) {
//       console.error("Failed to fetch requests", error);
//       setError(
//         error.response?.data?.message || 
//         "Network error. Please check if backend is running."
//       );
//       setRequests([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function for status colors - supports both light and dark mode
//   const getStatusStyle = (status) => {
//     switch (status?.toUpperCase()) {
//       case "APPROVED":
//         return {
//           background: "var(--success-bg, #d4edda)",
//           color: "var(--success-text, #155724)",
//           border: "1px solid var(--success-border, #c3e6cb)"
//         };
//       case "REJECTED":
//         return {
//           background: "var(--danger-bg, #f8d7da)",
//           color: "var(--danger-text, #721c24)",
//           border: "1px solid var(--danger-border, #f5c6cb)"
//         };
//       case "PENDING":
//         return {
//           background: "var(--warning-bg, #fff3cd)",
//           color: "var(--warning-text, #856404)",
//           border: "1px solid var(--warning-border, #ffeeba)"
//         };
//       default:
//         return {
//           background: "var(--neutral-bg, #e2e3e5)",
//           color: "var(--neutral-text, #383d41)",
//           border: "1px solid var(--neutral-border, #d6d8db)"
//         };
//     }
//   };

//   // Simple loading state
//   if (loading) {
//     return (
//       <div style={styles.container}>
//         <div style={styles.loading}>
//           <div style={styles.spinner}></div>
//           <p style={styles.loadingText}>Loading your requests...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div style={styles.container}>
//         <div style={styles.error}>
//           <svg style={styles.errorIcon} viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" fill="none">
//             <circle cx="12" cy="12" r="10" strokeWidth="2"/>
//             <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2"/>
//             <circle cx="12" cy="16" r="1" fill="currentColor"/>
//           </svg>
//           <p style={styles.errorText}>{error}</p>
//           <button 
//             onClick={() => fetchRequests(defaultAccount)} 
//             style={styles.retryButton}
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Empty state
//   if (requests.length === 0) {
//     return (
//       <div style={styles.container}>
//         <div style={styles.empty}>
//           <svg style={styles.emptyIcon} viewBox="0 0 24 24" width="64" height="64" stroke="currentColor" fill="none">
//             <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2"/>
//             <polyline points="7 10 12 15 17 10" strokeWidth="2"/>
//             <line x1="12" y1="15" x2="12" y2="3" strokeWidth="2"/>
//           </svg>
//           <h3 style={styles.emptyTitle}>No Requests Found</h3>
//           <p style={styles.emptyText}>You haven't submitted any requests yet.</p>
//           <button style={styles.emptyButton}>Create New Request</button>
//         </div>
//       </div>
//     );
//   }

//   // Main render with requests
//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <h2 style={styles.title}>My Requests</h2>
//         <span style={styles.requestCount}>{requests.length} {requests.length === 1 ? 'Request' : 'Requests'}</span>
//       </div>
      
//       <div style={styles.requestsList}>
//         {requests.map((item) => (
//           <div key={item.queriesId} style={styles.card}>
//             {/* Header with status */}
//             <div style={styles.cardHeader}>
//               <div style={styles.queryWrapper}>
//                 <span style={styles.queryIcon}>📋</span>
//                 <h3 style={styles.queryText}>{item.customerQuery}</h3>
//               </div>
//               <span style={{
//                 ...styles.statusBadge,
//                 ...getStatusStyle(item.status)
//               }}>
//                 {item.status || "PENDING"}
//               </span>
//             </div>

//             {/* Basic Info */}
//             <div style={styles.cardBody}>
//               <div style={styles.infoGrid}>
//                 <div style={styles.infoItem}>
//                   <span style={styles.infoLabel}>Account Number</span>
//                   <span style={styles.infoValue}>{item.accountNumber}</span>
//                 </div>
//                 <div style={styles.infoItem}>
//                   <span style={styles.infoLabel}>Customer</span>
//                   <span style={styles.infoValue}>{item.fullName || "N/A"}</span>
//                 </div>
//                 <div style={styles.infoItem}>
//                   <span style={styles.infoLabel}>Mobile</span>
//                   <span style={styles.infoValue}>{item.mobileNumber || "N/A"}</span>
//                 </div>
//                 <div style={styles.infoItem}>
//                   <span style={styles.infoLabel}>Raised Date</span>
//                   <span style={styles.infoValue}>{item.queryRaisedDate || "N/A"}</span>
//                 </div>
//               </div>
              
//               {/* Response info if available */}
//               {(item.status === "APPROVED" || item.status === "REJECTED") && (
//                 <div style={styles.responseSection}>
//                   <h4 style={styles.responseTitle}>Response Details</h4>
//                   <div style={styles.responseGrid}>
//                     {item.approvedByName && (
//                       <div style={styles.responseItem}>
//                         <span style={styles.responseLabel}>Approved By</span>
//                         <span style={styles.responseValue}>{item.approvedByName}</span>
//                       </div>
//                     )}
//                     {item.queryApprovedDate && (
//                       <div style={styles.responseItem}>
//                         <span style={styles.responseLabel}>Approved Date</span>
//                         <span style={styles.responseValue}>{item.queryApprovedDate}</span>
//                       </div>
//                     )}
//                     {item.queryResponse && (
//                       <div style={{...styles.responseItem, gridColumn: '1 / -1'}}>
//                         <span style={styles.responseLabel}>Response</span>
//                         <span style={styles.responseValue}>{item.queryResponse}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Professional styles with CSS variables for light/dark mode support
// const styles = {
//   container: {
//     maxWidth: "1000px",
//     margin: "0 auto",
//     padding: "24px",
//     fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
//     backgroundColor: "var(--bg-primary, #f8fafc)",
//     minHeight: "100vh",
//     transition: "all 0.3s ease",
//   },
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "28px",
//   },
//   title: {
//     fontSize: "28px",
//     fontWeight: "700",
//     color: "var(--text-primary, #0f172a)",
//     margin: 0,
//     letterSpacing: "-0.5px",
//   },
//   requestCount: {
//     padding: "6px 14px",
//     backgroundColor: "var(--badge-bg, #e2e8f0)",
//     color: "var(--badge-text, #475569)",
//     borderRadius: "30px",
//     fontSize: "14px",
//     fontWeight: "600",
//   },
//   requestsList: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "20px",
//   },
//   card: {
//     backgroundColor: "var(--card-bg, #ffffff)",
//     border: "1px solid var(--border-color, #e2e8f0)",
//     borderRadius: "16px",
//     padding: "24px",
//     boxShadow: "0 4px 6px -1px var(--shadow-color, rgba(0, 0, 0, 0.1))",
//     transition: "all 0.3s ease",
//     cursor: "pointer",
//     ':hover': {
//       transform: "translateY(-2px)",
//       boxShadow: "0 10px 15px -3px var(--shadow-color, rgba(0, 0, 0, 0.1))",
//     }
//   },
//   cardHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: "20px",
//     paddingBottom: "16px",
//     borderBottom: "1px solid var(--border-light, #f1f5f9)",
//     flexWrap: "wrap",
//     gap: "12px",
//   },
//   queryWrapper: {
//     display: "flex",
//     alignItems: "center",
//     gap: "12px",
//     flex: 1,
//   },
//   queryIcon: {
//     fontSize: "20px",
//   },
//   queryText: {
//     margin: 0,
//     fontSize: "18px",
//     fontWeight: "600",
//     color: "var(--text-primary, #0f172a)",
//     lineHeight: "1.4",
//     wordBreak: "break-word",
//   },
//   statusBadge: {
//     padding: "6px 14px",
//     borderRadius: "30px",
//     fontSize: "13px",
//     fontWeight: "600",
//     letterSpacing: "0.3px",
//     textTransform: "uppercase",
//     whiteSpace: "nowrap",
//   },
//   cardBody: {
//     fontSize: "15px",
//     lineHeight: "1.6",
//   },
//   infoGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//     gap: "16px",
//     marginBottom: "20px",
//   },
//   infoItem: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "6px",
//     padding: "12px",
//     backgroundColor: "var(--info-bg, #f8fafc)",
//     borderRadius: "12px",
//     border: "1px solid var(--border-light, #f1f5f9)",
//   },
//   infoLabel: {
//     fontSize: "12px",
//     fontWeight: "600",
//     color: "var(--text-secondary, #64748b)",
//     textTransform: "uppercase",
//     letterSpacing: "0.3px",
//   },
//   infoValue: {
//     fontSize: "16px",
//     fontWeight: "600",
//     color: "var(--text-primary, #0f172a)",
//     wordBreak: "break-word",
//   },
//   responseSection: {
//     marginTop: "20px",
//     padding: "20px",
//     backgroundColor: "var(--response-bg, #f0f9ff)",
//     borderRadius: "12px",
//     border: "1px solid var(--response-border, #bae6fd)",
//   },
//   responseTitle: {
//     fontSize: "16px",
//     fontWeight: "600",
//     color: "var(--text-primary, #0f172a)",
//     margin: "0 0 16px 0",
//   },
//   responseGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//     gap: "16px",
//   },
//   responseItem: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "4px",
//   },
//   responseLabel: {
//     fontSize: "11px",
//     fontWeight: "600",
//     color: "var(--text-secondary, #64748b)",
//     textTransform: "uppercase",
//     letterSpacing: "0.3px",
//   },
//   responseValue: {
//     fontSize: "14px",
//     color: "var(--text-primary, #0f172a)",
//     fontWeight: "500",
//     wordBreak: "break-word",
//   },
//   loading: {
//     textAlign: "center",
//     padding: "60px",
//     backgroundColor: "var(--card-bg, #ffffff)",
//     borderRadius: "20px",
//     boxShadow: "0 4px 6px -1px var(--shadow-color, rgba(0, 0, 0, 0.1))",
//     maxWidth: "500px",
//     margin: "40px auto",
//   },
//   spinner: {
//     width: "50px",
//     height: "50px",
//     border: "4px solid var(--spinner-track, #e2e8f0)",
//     borderTop: "4px solid var(--spinner-color, #3b82f6)",
//     borderRadius: "50%",
//     animation: "spin 1s linear infinite",
//     margin: "0 auto 20px",
//   },
//   loadingText: {
//     fontSize: "16px",
//     color: "var(--text-secondary, #64748b)",
//     margin: 0,
//   },
//   error: {
//     textAlign: "center",
//     padding: "60px",
//     backgroundColor: "var(--card-bg, #ffffff)",
//     borderRadius: "20px",
//     boxShadow: "0 4px 6px -1px var(--shadow-color, rgba(0, 0, 0, 0.1))",
//     maxWidth: "500px",
//     margin: "40px auto",
//   },
//   errorIcon: {
//     color: "var(--error-color, #ef4444)",
//     marginBottom: "20px",
//   },
//   errorText: {
//     fontSize: "16px",
//     color: "var(--text-primary, #0f172a)",
//     marginBottom: "24px",
//     lineHeight: "1.6",
//   },
//   retryButton: {
//     padding: "12px 32px",
//     backgroundColor: "var(--button-bg, #3b82f6)",
//     color: "white",
//     border: "none",
//     borderRadius: "12px",
//     fontSize: "15px",
//     fontWeight: "600",
//     cursor: "pointer",
//     transition: "all 0.2s ease",
//     boxShadow: "0 4px 6px -1px var(--button-shadow, rgba(59, 130, 246, 0.3))",
//     ':hover': {
//       transform: "translateY(-2px)",
//       boxShadow: "0 6px 10px -1px var(--button-shadow, rgba(59, 130, 246, 0.4))",
//     }
//   },
//   empty: {
//     textAlign: "center",
//     padding: "80px 40px",
//     backgroundColor: "var(--card-bg, #ffffff)",
//     borderRadius: "24px",
//     boxShadow: "0 10px 25px -5px var(--shadow-color, rgba(0, 0, 0, 0.1))",
//     maxWidth: "600px",
//     margin: "40px auto",
//   },
//   emptyIcon: {
//     color: "var(--text-secondary, #94a3b8)",
//     marginBottom: "24px",
//   },
//   emptyTitle: {
//     fontSize: "24px",
//     fontWeight: "700",
//     color: "var(--text-primary, #0f172a)",
//     margin: "0 0 12px 0",
//   },
//   emptyText: {
//     fontSize: "16px",
//     color: "var(--text-secondary, #64748b)",
//     marginBottom: "28px",
//   },
//   emptyButton: {
//     padding: "14px 36px",
//     backgroundColor: "var(--button-bg, #3b82f6)",
//     color: "white",
//     border: "none",
//     borderRadius: "30px",
//     fontSize: "16px",
//     fontWeight: "600",
//     cursor: "pointer",
//     transition: "all 0.2s ease",
//     boxShadow: "0 4px 6px -1px var(--button-shadow, rgba(59, 130, 246, 0.3))",
//     ':hover': {
//       transform: "translateY(-2px)",
//       boxShadow: "0 6px 10px -1px var(--button-shadow, rgba(59, 130, 246, 0.4))",
//     }
//   },
// };

// // Add global styles for theme support
// const globalStyles = `
//   @keyframes spin {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
//   }

//   /* Light Mode (Default) */
//   :root {
//     --bg-primary: #f8fafc;
//     --card-bg: #ffffff;
//     --text-primary: #0f172a;
//     --text-secondary: #64748b;
//     --border-color: #e2e8f0;
//     --border-light: #f1f5f9;
//     --shadow-color: rgba(0, 0, 0, 0.1);
//     --button-bg: #3b82f6;
//     --button-shadow: rgba(59, 130, 246, 0.3);
//     --badge-bg: #e2e8f0;
//     --badge-text: #475569;
//     --info-bg: #f8fafc;
//     --response-bg: #f0f9ff;
//     --response-border: #bae6fd;
//     --spinner-track: #e2e8f0;
//     --spinner-color: #3b82f6;
//     --error-color: #ef4444;
    
//     /* Status colors for light mode */
//     --success-bg: #d4edda;
//     --success-text: #155724;
//     --success-border: #c3e6cb;
//     --danger-bg: #f8d7da;
//     --danger-text: #721c24;
//     --danger-border: #f5c6cb;
//     --warning-bg: #fff3cd;
//     --warning-text: #856404;
//     --warning-border: #ffeeba;
//     --neutral-bg: #e2e3e5;
//     --neutral-text: #383d41;
//     --neutral-border: #d6d8db;
//   }

//   /* Dark/Blue Mode */
//   [data-theme="dark"], .dark-mode {
//     --bg-primary: #0f172a;
//     --card-bg: #1e293b;
//     --text-primary: #f1f5f9;
//     --text-secondary: #94a3b8;
//     --border-color: #334155;
//     --border-light: #1e293b;
//     --shadow-color: rgba(0, 0, 0, 0.3);
//     --button-bg: #3b82f6;
//     --button-shadow: rgba(59, 130, 246, 0.2);
//     --badge-bg: #334155;
//     --badge-text: #cbd5e1;
//     --info-bg: #1e293b;
//     --response-bg: #1e3a5f;
//     --response-border: #2563eb;
//     --spinner-track: #334155;
//     --spinner-color: #60a5fa;
//     --error-color: #f87171;
    
//     /* Status colors for dark mode */
//     --success-bg: #064e3b;
//     --success-text: #d1fae5;
//     --success-border: #065f46;
//     --danger-bg: #7f1d1d;
//     --danger-text: #fee2e2;
//     --danger-border: #991b1b;
//     --warning-bg: #78350f;
//     --warning-text: #fef3c7;
//     --warning-border: #92400e;
//     --neutral-bg: #1e293b;
//     --neutral-text: #e2e8f0;
//     --neutral-border: #334155;
//   }

//   /* Card hover effect */
//   .card:hover {
//     transform: translateY(-4px);
//     box-shadow: 0 20px 25px -5px var(--shadow-color);
//   }

//   /* Button hover effects */
//   .retry-button:hover,
//   .empty-button:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 6px 10px -1px var(--button-shadow);
//   }

//   /* Smooth transitions */
//   * {
//     transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
//   }
// `;

// // Inject global styles
// const styleSheet = document.createElement("style");
// styleSheet.textContent = globalStyles;
// document.head.appendChild(styleSheet);

// export default MyRequests;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// // Create API instance
// const API = axios.create({
//   baseURL: "http://localhost:8077",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// const MyRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const [filteredRequests, setFilteredRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // Filter states
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedService, setSelectedService] = useState("ALL");
//   const [availableDates, setAvailableDates] = useState([]);

//   // Service options based on the images - all requests show as "General Query"
//   const serviceOptions = [
//     { value: "ALL", label: "All Services" },
//     { value: "CHEQUE_BOOK", label: "Cheque Book Request" },
//     { value: "CREDIT_LIMIT", label: "Increase Credit Card Limit" },
//     { value: "LOST_CARD", label: "Report Stolen/Lost Card" }
//   ];

//   // Default account for demo
//   const defaultAccount = 1440320196;

//   useEffect(() => {
//     fetchRequests(defaultAccount);
//   }, []);

//   // Apply filters whenever requests, selectedDate, or selectedService changes
//   useEffect(() => {
//     applyFilters();
//   }, [requests, selectedDate, selectedService]);

//   const fetchRequests = async (accountNumber) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const payload = {
//         accountNumber: accountNumber
//       };

//       console.log("Fetching requests for account:", accountNumber);
      
//       const response = await API.post(
//         "/abcbank/api/queriesResponse/queriesList",
//         payload
//       );

//       console.log("API Response:", response.data);

//       if (response.data?.status) {
//         const fetchedRequests = response.data.data || [];
        
//         // Add serviceType to each request based on customerQuery content
//         const enhancedRequests = fetchedRequests.map(req => ({
//           ...req,
//           // Determine service type based on query content
//           serviceType: determineServiceType(req.customerQuery)
//         }));
        
//         setRequests(enhancedRequests);
        
//         // Extract unique dates for the date filter
//         const dates = [...new Set(enhancedRequests.map(req => req.queryRaisedDate))].filter(Boolean);
//         setAvailableDates(dates.sort().reverse());
//       } else {
//         setError(response.data?.message || "Failed to fetch requests");
//         setRequests([]);
//       }
//     } catch (error) {
//       console.error("Failed to fetch requests", error);
//       setError(
//         error.response?.data?.message || 
//         "Network error. Please check if backend is running."
//       );
//       setRequests([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Determine service type based on query content
//   const determineServiceType = (query) => {
//     if (!query) return "GENERAL";
    
//     const queryLower = query.toLowerCase();
//     if (queryLower.includes("cheque") || queryLower.includes("check book")) {
//       return "CHEQUE_BOOK";
//     } else if (queryLower.includes("credit limit") || queryLower.includes("increase limit")) {
//       return "CREDIT_LIMIT";
//     } else if (queryLower.includes("lost") || queryLower.includes("stolen") || queryLower.includes("card")) {
//       return "LOST_CARD";
//     }
//     return "GENERAL";
//   };

//   // Apply filters based on selected date and service
//   const applyFilters = () => {
//     let filtered = [...requests];

//     // Apply date filter
//     if (selectedDate) {
//       filtered = filtered.filter(req => req.queryRaisedDate === selectedDate);
//     }

//     // Apply service filter
//     if (selectedService !== "ALL") {
//       filtered = filtered.filter(req => req.serviceType === selectedService);
//     }

//     setFilteredRequests(filtered);
//   };

//   // Clear all filters
//   const clearFilters = () => {
//     setSelectedDate("");
//     setSelectedService("ALL");
//   };

//   // Helper function for status colors
//   const getStatusStyle = (status) => {
//     switch (status?.toUpperCase()) {
//       case "APPROVED":
//         return {
//           background: "#d4edda",
//           color: "#155724",
//           border: "1px solid #c3e6cb"
//         };
//       case "REJECTED":
//         return {
//           background: "#f8d7da",
//           color: "#721c24",
//           border: "1px solid #f5c6cb"
//         };
//       case "PENDING":
//         return {
//           background: "#fff3cd",
//           color: "#856404",
//           border: "1px solid #ffeeba"
//         };
//       default:
//         return {
//           background: "#e2e3e5",
//           color: "#383d41",
//           border: "1px solid #d6d8db"
//         };
//     }
//   };

//   // Get service type label
//   const getServiceLabel = (serviceType) => {
//     const option = serviceOptions.find(opt => opt.value === serviceType);
//     return option ? option.label : "General Query";
//   };

//   // Loading animation component
//   if (loading) {
//     return (
//       <div style={styles.loadingContainer}>
//         <div style={styles.bankLoader}>
//           <div style={styles.loaderWrapper}>
//             <div style={styles.loaderBar}></div>
//             <div style={styles.loaderBar}></div>
//             <div style={styles.loaderBar}></div>
//             <div style={styles.loaderBar}></div>
//           </div>
//           <h3 style={styles.loadingTitle}>ABC Bank</h3>
//           <p style={styles.loadingSubtitle}>Loading your requests...</p>
//           <div style={styles.progressBar}>
//             <div style={styles.progressFill}></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div style={styles.container}>
//         <div style={styles.error}>
//           <svg style={styles.errorIcon} viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" fill="none">
//             <circle cx="12" cy="12" r="10" strokeWidth="2"/>
//             <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2"/>
//             <circle cx="12" cy="16" r="1" fill="currentColor"/>
//           </svg>
//           <p style={styles.errorText}>{error}</p>
//           <button 
//             onClick={() => fetchRequests(defaultAccount)} 
//             style={styles.retryButton}
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       {/* Header */}
//       <div style={styles.header}>
//         <h2 style={styles.title}>My Requests</h2>
//         <span style={styles.badge}>
//           {filteredRequests.length} {filteredRequests.length === 1 ? 'Request' : 'Requests'}
//         </span>
//       </div>

//       {/* Filter Section */}
//       <div style={styles.filterSection}>
//         <div style={styles.filterRow}>
//           {/* Date Filter */}
//           <div style={styles.filterGroup}>
//             <label style={styles.filterLabel}>Filter by Date</label>
//             <select
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               style={styles.filterSelect}
//             >
//               <option value="">All Dates</option>
//               {availableDates.map(date => (
//                 <option key={date} value={date}>{date}</option>
//               ))}
//             </select>
//           </div>

//           {/* Service Type Filter */}
//           <div style={styles.filterGroup}>
//             <label style={styles.filterLabel}>Filter by Service</label>
//             <select
//               value={selectedService}
//               onChange={(e) => setSelectedService(e.target.value)}
//               style={styles.filterSelect}
//             >
//               {serviceOptions.map(option => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Clear Filters Button */}
//           {(selectedDate || selectedService !== "ALL") && (
//             <button onClick={clearFilters} style={styles.clearButton}>
//               Clear Filters
//             </button>
//           )}
//         </div>

//         {/* Active Filters Display */}
//         {(selectedDate || selectedService !== "ALL") && (
//           <div style={styles.activeFilters}>
//             <span>Active Filters:</span>
//             {selectedDate && (
//               <span style={styles.filterTag}>
//                 Date: {selectedDate}
//                 <button onClick={() => setSelectedDate("")} style={styles.removeFilter}>×</button>
//               </span>
//             )}
//             {selectedService !== "ALL" && (
//               <span style={styles.filterTag}>
//                 Service: {getServiceLabel(selectedService)}
//                 <button onClick={() => setSelectedService("ALL")} style={styles.removeFilter}>×</button>
//               </span>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Empty State */}
//       {filteredRequests.length === 0 ? (
//         <div style={styles.empty}>
//           <svg style={styles.emptyIcon} viewBox="0 0 24 24" width="64" height="64" stroke="currentColor" fill="none">
//             <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2"/>
//             <polyline points="7 10 12 15 17 10" strokeWidth="2"/>
//             <line x1="12" y1="15" x2="12" y2="3" strokeWidth="2"/>
//           </svg>
//           <h3 style={styles.emptyTitle}>
//             {requests.length === 0 ? "No Requests Found" : "No Matching Requests"}
//           </h3>
//           <p style={styles.emptyText}>
//             {requests.length === 0 
//               ? "You haven't submitted any requests yet." 
//               : "Try adjusting your filters to see more results."}
//           </p>
//           {requests.length > 0 && (
//             <button onClick={clearFilters} style={styles.emptyButton}>
//               Clear All Filters
//             </button>
//           )}
//         </div>
//       ) : (
//         // Requests List - Table format as shown in images
//         <div style={styles.requestsList}>
//           {filteredRequests.map((item) => (
//             <div key={item.queriesId} style={styles.card}>
//               {/* Query Header */}
//               <div style={styles.cardHeader}>
//                 <div style={styles.queryInfo}>
//                   <h3 style={styles.queryText}>{item.customerQuery}</h3>
//                   <span style={styles.serviceType}>
//                     {getServiceLabel(item.serviceType)}
//                   </span>
//                 </div>
//                 <span style={{
//                   ...styles.statusBadge,
//                   ...getStatusStyle(item.status)
//                 }}>
//                   {item.status || "PENDING"}
//                 </span>
//               </div>

//               {/* Details Table - Matching the image format */}
//               <div style={styles.detailsTable}>
//                 <div style={styles.tableRow}>
//                   <div style={styles.tableHeader}>ACCOUNT NUMBER</div>
//                   <div style={styles.tableHeader}>CUSTOMER</div>
//                   <div style={styles.tableHeader}>MOBILE</div>
//                   <div style={styles.tableHeader}>RAISED DATE</div>
//                 </div>
//                 <div style={styles.tableRow}>
//                   <div style={styles.tableData}>{item.accountNumber}</div>
//                   <div style={styles.tableData}>{item.fullName || "N/A"}</div>
//                   <div style={styles.tableData}>{item.mobileNumber || "N/A"}</div>
//                   <div style={styles.tableData}>{item.queryRaisedDate || "N/A"}</div>
//                 </div>
//               </div>
              
//               {/* Response Details - Only for approved/rejected requests */}
//               {(item.status === "APPROVED" || item.status === "REJECTED") && (
//                 <div style={styles.responseSection}>
//                   <h4 style={styles.responseTitle}>Response Details</h4>
//                   <div style={styles.responseGrid}>
//                     {item.approvedByName && (
//                       <div style={styles.responseItem}>
//                         <span style={styles.responseLabel}>APPROVED BY</span>
//                         <span style={styles.responseValue}>{item.approvedByName}</span>
//                       </div>
//                     )}
//                     {item.queryApprovedDate && (
//                       <div style={styles.responseItem}>
//                         <span style={styles.responseLabel}>APPROVED DATE</span>
//                         <span style={styles.responseValue}>{item.queryApprovedDate}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // Professional styles
// const styles = {
//   container: {
//     maxWidth: "1200px",
//     margin: "0 auto",
//     padding: "24px",
//     fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
//     backgroundColor: "#f8f9fa",
//     minHeight: "100vh",
//   },
//   loadingContainer: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     minHeight: "100vh",
//     backgroundColor: "#f8f9fa",
//   },
//   bankLoader: {
//     textAlign: "center",
//     padding: "40px",
//     backgroundColor: "white",
//     borderRadius: "16px",
//     boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
//     width: "300px",
//   },
//   loaderWrapper: {
//     display: "flex",
//     justifyContent: "center",
//     gap: "8px",
//     marginBottom: "24px",
//   },
//   loaderBar: {
//     width: "8px",
//     height: "40px",
//     backgroundColor: "#0d6efd",
//     borderRadius: "4px",
//     animation: "loaderPulse 1s ease-in-out infinite",
//   },
//   loadingTitle: {
//     fontSize: "24px",
//     fontWeight: "600",
//     color: "#0d6efd",
//     marginBottom: "8px",
//   },
//   loadingSubtitle: {
//     fontSize: "14px",
//     color: "#6c757d",
//     marginBottom: "20px",
//   },
//   progressBar: {
//     width: "100%",
//     height: "4px",
//     backgroundColor: "#e9ecef",
//     borderRadius: "2px",
//     overflow: "hidden",
//   },
//   progressFill: {
//     width: "70%",
//     height: "100%",
//     backgroundColor: "#0d6efd",
//     animation: "progress 1.5s ease-in-out infinite",
//   },
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "24px",
//   },
//   title: {
//     fontSize: "28px",
//     fontWeight: "600",
//     color: "#212529",
//     margin: 0,
//   },
//   badge: {
//     padding: "6px 12px",
//     backgroundColor: "#e9ecef",
//     color: "#495057",
//     borderRadius: "20px",
//     fontSize: "14px",
//     fontWeight: "500",
//   },
//   filterSection: {
//     backgroundColor: "white",
//     borderRadius: "12px",
//     padding: "20px",
//     marginBottom: "24px",
//     boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
//   },
//   filterRow: {
//     display: "flex",
//     gap: "16px",
//     flexWrap: "wrap",
//     alignItems: "flex-end",
//   },
//   filterGroup: {
//     flex: 1,
//     minWidth: "200px",
//   },
//   filterLabel: {
//     display: "block",
//     fontSize: "14px",
//     fontWeight: "500",
//     color: "#495057",
//     marginBottom: "8px",
//   },
//   filterSelect: {
//     width: "100%",
//     padding: "10px",
//     backgroundColor: "#f8f9fa",
//     border: "1px solid #dee2e6",
//     borderRadius: "8px",
//     fontSize: "14px",
//     color: "#212529",
//     cursor: "pointer",
//     outline: "none",
//     ':focus': {
//       borderColor: "#0d6efd",
//     }
//   },
//   clearButton: {
//     padding: "10px 20px",
//     backgroundColor: "#6c757d",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     fontSize: "14px",
//     fontWeight: "500",
//     cursor: "pointer",
//     transition: "all 0.2s",
//     ':hover': {
//       backgroundColor: "#5a6268",
//     }
//   },
//   activeFilters: {
//     display: "flex",
//     alignItems: "center",
//     gap: "12px",
//     marginTop: "16px",
//     paddingTop: "16px",
//     borderTop: "1px solid #dee2e6",
//     flexWrap: "wrap",
//     fontSize: "14px",
//     color: "#6c757d",
//   },
//   filterTag: {
//     display: "inline-flex",
//     alignItems: "center",
//     gap: "8px",
//     padding: "4px 12px",
//     backgroundColor: "#0d6efd",
//     color: "white",
//     borderRadius: "20px",
//     fontSize: "13px",
//   },
//   removeFilter: {
//     background: "none",
//     border: "none",
//     color: "white",
//     fontSize: "16px",
//     cursor: "pointer",
//     padding: "0 4px",
//   },
//   requestsList: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "20px",
//   },
//   card: {
//     backgroundColor: "white",
//     border: "1px solid #dee2e6",
//     borderRadius: "12px",
//     padding: "24px",
//     boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
//   },
//   cardHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: "20px",
//     flexWrap: "wrap",
//     gap: "12px",
//   },
//   queryInfo: {
//     flex: 1,
//   },
//   queryText: {
//     margin: "0 0 8px 0",
//     fontSize: "18px",
//     fontWeight: "600",
//     color: "#212529",
//   },
//   serviceType: {
//     fontSize: "13px",
//     color: "#6c757d",
//     backgroundColor: "#f8f9fa",
//     padding: "4px 12px",
//     borderRadius: "20px",
//     display: "inline-block",
//   },
//   statusBadge: {
//     padding: "4px 12px",
//     borderRadius: "20px",
//     fontSize: "12px",
//     fontWeight: "600",
//     textTransform: "uppercase",
//   },
//   detailsTable: {
//     marginBottom: "20px",
//     border: "1px solid #dee2e6",
//     borderRadius: "8px",
//     overflow: "hidden",
//   },
//   tableRow: {
//     display: "grid",
//     gridTemplateColumns: "repeat(4, 1fr)",
//     borderBottom: "1px solid #dee2e6",
//     ':last-child': {
//       borderBottom: "none",
//     }
//   },
//   tableHeader: {
//     padding: "12px",
//     backgroundColor: "#f8f9fa",
//     fontSize: "12px",
//     fontWeight: "600",
//     color: "#495057",
//     textTransform: "uppercase",
//     borderRight: "1px solid #dee2e6",
//     ':last-child': {
//       borderRight: "none",
//     }
//   },
//   tableData: {
//     padding: "12px",
//     fontSize: "14px",
//     color: "#212529",
//     borderRight: "1px solid #dee2e6",
//     ':last-child': {
//       borderRight: "none",
//     }
//   },
//   responseSection: {
//     marginTop: "20px",
//     padding: "20px",
//     backgroundColor: "#f8f9fa",
//     borderRadius: "8px",
//   },
//   responseTitle: {
//     fontSize: "16px",
//     fontWeight: "600",
//     color: "#212529",
//     margin: "0 0 16px 0",
//   },
//   responseGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//     gap: "16px",
//   },
//   responseItem: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "4px",
//   },
//   responseLabel: {
//     fontSize: "11px",
//     fontWeight: "600",
//     color: "#6c757d",
//     textTransform: "uppercase",
//   },
//   responseValue: {
//     fontSize: "14px",
//     color: "#212529",
//     fontWeight: "500",
//   },
//   error: {
//     textAlign: "center",
//     padding: "60px",
//     backgroundColor: "white",
//     borderRadius: "12px",
//     boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
//     maxWidth: "500px",
//     margin: "40px auto",
//   },
//   errorIcon: {
//     color: "#dc3545",
//     marginBottom: "20px",
//   },
//   errorText: {
//     fontSize: "16px",
//     color: "#212529",
//     marginBottom: "24px",
//   },
//   retryButton: {
//     padding: "12px 32px",
//     backgroundColor: "#0d6efd",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     fontSize: "15px",
//     fontWeight: "500",
//     cursor: "pointer",
//   },
//   empty: {
//     textAlign: "center",
//     padding: "60px 40px",
//     backgroundColor: "white",
//     borderRadius: "12px",
//     boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
//     maxWidth: "500px",
//     margin: "40px auto",
//   },
//   emptyIcon: {
//     color: "#adb5bd",
//     marginBottom: "20px",
//   },
//   emptyTitle: {
//     fontSize: "20px",
//     fontWeight: "600",
//     color: "#212529",
//     margin: "0 0 8px 0",
//   },
//   emptyText: {
//     fontSize: "14px",
//     color: "#6c757d",
//     marginBottom: "20px",
//   },
//   emptyButton: {
//     padding: "12px 24px",
//     backgroundColor: "#0d6efd",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     fontSize: "14px",
//     fontWeight: "500",
//     cursor: "pointer",
//   },
// };

// // Add global styles for animations
// const globalStyles = `
//   @keyframes loaderPulse {
//     0%, 100% { transform: scaleY(1); opacity: 1; }
//     50% { transform: scaleY(1.5); opacity: 0.7; }
//   }
  
//   @keyframes progress {
//     0% { transform: translateX(-100%); }
//     50% { transform: translateX(0); }
//     100% { transform: translateX(100%); }
//   }

//   .loaderBar:nth-child(2) { animation-delay: 0.1s; }
//   .loaderBar:nth-child(3) { animation-delay: 0.2s; }
//   .loaderBar:nth-child(4) { animation-delay: 0.3s; }
// `;

// // Inject global styles
// const styleSheet = document.createElement("style");
// styleSheet.textContent = globalStyles;
// document.head.appendChild(styleSheet);

// export default MyRequests;








import React, { useState, useEffect } from "react";
import axios from "axios";

// Create API instance
const API = axios.create({
  baseURL: "http://localhost:8077",
  headers: {
    "Content-Type": "application/json",
  },
});

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accounts, setAccounts] = useState([]);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Show 10 items per page
  
  // Filter states
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedRequestType, setSelectedRequestType] = useState("ALL");

  // Request type options with colors
  const requestTypeOptions = [
    { value: "ALL", label: "All Requests", color: "#6b7280" },
    { value: "CHEQUE_BOOK", label: "Cheque Book", color: "#3b82f6" },
    { value: "CREDIT_LIMIT", label: "Credit Limit", color: "#8b5cf6" },
    { value: "LOST_CARD", label: "Lost Card", color: "#ef4444" },
    { value: "GENERAL_QUERY", label: "General Query", color: "#10b981" }
  ];

  // Load accounts from localStorage on component mount
  useEffect(() => {
    const loadAccounts = () => {
      const accs = [];
      const savings = localStorage.getItem("savingsAccount");
      const current = localStorage.getItem("currentAccount");

      if (savings) accs.push({ 
        type: "Savings", 
        number: savings,
        label: `Savings Account (${savings.slice(-4)})`,
        color: "#3b82f6" 
      });
      if (current) accs.push({ 
        type: "Current", 
        number: current,
        label: `Current Account (${current.slice(-4)})`,
        color: "#8b5cf6" 
      });

      setAccounts(accs);
      
      // Auto-select first account if available
      if (accs.length > 0 && !selectedAccount) {
        setSelectedAccount(accs[0].number);
      }
    };

    loadAccounts();
  }, []);

  // Fetch all requests when account changes
  useEffect(() => {
    if (selectedAccount) {
      fetchAllRequests(selectedAccount);
    }
  }, [selectedAccount]);

  // Apply filter whenever requests or selectedRequestType changes
  useEffect(() => {
    applyFilter();
    setCurrentPage(1); // Reset to first page when filter changes
  }, [requests, selectedRequestType]);

  const fetchAllRequests = async (accountNumber) => {
    setLoading(true);
    setError(null);
    
    try {
      const payload = { accountNumber: Number(accountNumber) };
      
      // Fetch all request types in parallel
      const [chequeResponse, creditResponse, lostCardResponse, queriesResponse] = await Promise.allSettled([
        API.post("/abcbank/api/chequeRequest/chequeRequestList", payload),
        API.post("/abcbank/api/creditLimit/creditLimitListByAccount", payload),
        API.post("/abcbank/api/lostCard/lostRequestList", payload),
        API.post("/abcbank/api/queriesResponse/queriesList", payload)
      ]);

      // Process Cheque Requests
      const chequeRequests = chequeResponse.status === 'fulfilled' && chequeResponse.value.data?.status
        ? (chequeResponse.value.data.data || []).map(req => ({
            id: `chq-${req.chequeRequestId}`,
            type: "CHEQUE_BOOK",
            typeLabel: "Cheque Book",
            description: `${req.noOfLeaves} leaves`,
            requestDate: req.requestedDate,
            status: req.status || "PENDING",
            approvedDate: req.approvedDate || "-",
            remarks: req.remarks || "-",
          }))
        : [];

      // Process Credit Limit Requests
      const creditRequests = creditResponse.status === 'fulfilled' && creditResponse.value.data?.status
        ? (creditResponse.value.data.data || []).map(req => ({
            id: `crd-${req.increaseCreditLimitId}`,
            type: "CREDIT_LIMIT",
            typeLabel: "Credit Limit",
            description: `₹${req.requestedLimit?.toLocaleString()}`,
            requestDate: req.requestDate,
            status: req.status || "PENDING",
            approvedDate: req.approvedDate || "-",
            remarks: req.remarks || "-",
          }))
        : [];

      // Process Lost Card Requests
      const lostCardRequests = lostCardResponse.status === 'fulfilled' && lostCardResponse.value.data?.status
        ? (lostCardResponse.value.data.data || []).map(req => ({
            id: `lst-${req.lostCardId}`,
            type: "LOST_CARD",
            typeLabel: "Lost Card",
            description: `Card ****${req.lostCardNumber?.toString().slice(-4)}`,
            requestDate: req.createdDate,
            status: req.status || "PENDING",
            approvedDate: req.approvedDate || "-",
            remarks: req.remarks || "-",
          }))
        : [];

      // Process General Queries
      const generalQueries = queriesResponse.status === 'fulfilled' && queriesResponse.value.data?.status
        ? (queriesResponse.value.data.data || []).map(req => ({
            id: `qry-${req.queriesId}`,
            type: "GENERAL_QUERY",
            typeLabel: "General Query",
            description: req.customerQuery.substring(0, 50) + (req.customerQuery?.length > 50 ? "..." : ""),
            requestDate: req.queryRaisedDate,
            status: req.status || "PENDING",
            approvedDate: req.queryApprovedDate || "-",
            remarks: req.queryResponse || "-",
          }))
        : [];

      // Combine all requests
      const allRequests = [
        ...chequeRequests,
        ...creditRequests,
        ...lostCardRequests,
        ...generalQueries
      ].sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));

      console.log("All requests fetched:", allRequests);
      setRequests(allRequests);

    } catch (error) {
      console.error("Failed to fetch requests", error);
      setError(
        error.response?.data?.message || 
        "Network error. Please check if backend is running."
      );
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  // Apply filter based on selected request type
  const applyFilter = () => {
    if (selectedRequestType === "ALL") {
      setFilteredRequests(requests);
    } else {
      const filtered = requests.filter(req => req.type === selectedRequestType);
      setFilteredRequests(filtered);
    }
  };

  // Clear filter
  const clearFilter = () => {
    setSelectedRequestType("ALL");
  };

  // Get current page items
  const getCurrentPageItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
  };

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of table when changing page
    const tableContainer = document.getElementById('requests-table-container');
    if (tableContainer) {
      tableContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  // Helper function for status colors
  const getStatusStyle = (status) => {
    const statusUpper = status?.toUpperCase() || "PENDING";
    switch (statusUpper) {
      case "APPROVED":
        return {
          background: "#d1fae5",
          color: "#065f46",
          border: "1px solid #a7f3d0"
        };
      case "REJECTED":
        return {
          background: "#fee2e2",
          color: "#991b1b",
          border: "1px solid #fecaca"
        };
      case "PENDING":
        return {
          background: "#fed7aa",
          color: "#92400e",
          border: "1px solid #fdba74"
        };
      default:
        return {
          background: "#e2e3e5",
          color: "#383d41",
          border: "1px solid #d6d8db"
        };
    }
  };

  // Get request type label
  const getRequestTypeLabel = (type) => {
    const option = requestTypeOptions.find(opt => opt.value === type);
    return option ? option.label : type;
  };

  // Get account color
  const getAccountColor = (accountNumber) => {
    const account = accounts.find(acc => acc.number === accountNumber);
    return account?.color || "#6b7280";
  };

  // Get request type color
  const getTypeColor = (type) => {
    const option = requestTypeOptions.find(opt => opt.value === type);
    return option?.color || "#6b7280";
  };

  // Loading animation
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.bankLoader}>
          <div style={styles.loaderWrapper}>
            <div style={styles.loaderBar}></div>
            <div style={styles.loaderBar}></div>
            <div style={styles.loaderBar}></div>
            <div style={styles.loaderBar}></div>
          </div>
          <h3 style={styles.loadingTitle}>ABC Bank</h3>
          <p style={styles.loadingSubtitle}>Loading your requests...</p>
          <div style={styles.progressBar}>
            <div style={styles.progressFill}></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>
          <svg style={styles.errorIcon} viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" fill="none">
            <circle cx="12" cy="12" r="10" strokeWidth="2"/>
            <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2"/>
            <circle cx="12" cy="16" r="1" fill="currentColor"/>
          </svg>
          <p style={styles.errorText}>{error}</p>
          <button 
            onClick={() => selectedAccount && fetchAllRequests(selectedAccount)} 
            style={styles.retryButton}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Get current page items
  const currentItems = getCurrentPageItems();

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.bankTitle}>ABC Bank</h1>
        <h2 style={styles.title}>My Requests</h2>
      </div>

      {/* Filter Section */}
      <div style={styles.filterSection}>
        <div style={styles.filterRow}>
          {/* Account Filter */}
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>
              <span style={{...styles.filterDot, backgroundColor: selectedAccount ? getAccountColor(selectedAccount) : "#6b7280"}}></span>
              Account
            </label>
            <select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              style={{
                ...styles.filterSelect,
                borderColor: selectedAccount ? getAccountColor(selectedAccount) : "#e2e8f0",
              }}
            >
              <option value="">Select Account</option>
              {accounts.map(acc => (
                <option key={acc.number} value={acc.number}>
                  {acc.label}
                </option>
              ))}
            </select>
          </div>

          {/* Request Type Filter */}
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>
              <span style={{...styles.filterDot, backgroundColor: getTypeColor(selectedRequestType)}}></span>
              Type
            </label>
            <select
              value={selectedRequestType}
              onChange={(e) => setSelectedRequestType(e.target.value)}
              style={{
                ...styles.filterSelect,
                borderColor: getTypeColor(selectedRequestType),
              }}
              disabled={!selectedAccount}
            >
              {requestTypeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filter Button */}
          {selectedRequestType !== "ALL" && (
            <button onClick={clearFilter} style={styles.clearButton}>
              Clear Filter
            </button>
          )}
        </div>

        {/* Active Filter Indicator */}
        {selectedRequestType !== "ALL" && (
          <div style={styles.activeFilterIndicator}>
            <span style={styles.activeFilterLabel}>Active Filter:</span>
            <span style={{
              ...styles.activeFilterBadge,
              backgroundColor: getTypeColor(selectedRequestType),
            }}>
              {getRequestTypeLabel(selectedRequestType)}
              <button onClick={clearFilter} style={styles.removeFilter}>×</button>
            </span>
          </div>
        )}
      </div>

      {/* No Account Selected */}
      {!selectedAccount && (
        <div style={styles.empty}>
          <div style={styles.emptyIconContainer}>🏦</div>
          <h3 style={styles.emptyTitle}>Select an Account</h3>
          <p style={styles.emptyText}>Please select an account to view your requests</p>
        </div>
      )}

      {/* Requests Table */}
      {selectedAccount && filteredRequests.length > 0 && (
        <>
          {/* Request Count and Pagination Info */}
          <div id="requests-table-container" style={styles.statsBar}>
            <div style={styles.statsLeft}>
              <span style={styles.requestCount}>{filteredRequests.length} Total Requests</span>
              <span style={styles.pageInfo}>
                Page {currentPage} of {totalPages}
              </span>
            </div>
            {selectedRequestType !== "ALL" && (
              <span style={styles.filterBadge}>
                Filter: {getRequestTypeLabel(selectedRequestType)}
              </span>
            )}
          </div>

          {/* Table Container - Now scrollable */}
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>Description</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Approved Date</th>
                  <th style={styles.th}>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.id} style={styles.tr}>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.typeBadge,
                        backgroundColor: `${getTypeColor(item.type)}20`,
                        color: getTypeColor(item.type),
                        borderColor: getTypeColor(item.type),
                      }}>
                        {item.typeLabel}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.description}>{item.description}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.date}>{item.requestDate}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.statusBadge,
                        ...getStatusStyle(item.status)
                      }}>
                        {item.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.date}>{item.approvedDate}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.remarks}>{item.remarks}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination at Bottom - Enhanced */}
          {totalPages > 1 && (
            <div style={styles.paginationContainer}>
              <div style={styles.pagination}>
                <button
                  onClick={() => paginate(1)}
                  disabled={currentPage === 1}
                  style={{
                    ...styles.pageNavButton,
                    ...(currentPage === 1 ? styles.pageButtonDisabled : {})
                  }}
                >
                  « First
                </button>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{
                    ...styles.pageNavButton,
                    ...(currentPage === 1 ? styles.pageButtonDisabled : {})
                  }}
                >
                  ← Prev
                </button>
                
                <div style={styles.pageNumbers}>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => paginate(pageNum)}
                        style={{
                          ...styles.pageNumber,
                          ...(currentPage === pageNum ? styles.pageNumberActive : {})
                        }}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{
                    ...styles.pageNavButton,
                    ...(currentPage === totalPages ? styles.pageButtonDisabled : {})
                  }}
                >
                  Next →
                </button>
                <button
                  onClick={() => paginate(totalPages)}
                  disabled={currentPage === totalPages}
                  style={{
                    ...styles.pageNavButton,
                    ...(currentPage === totalPages ? styles.pageButtonDisabled : {})
                  }}
                >
                  Last »
                </button>
              </div>

              {/* Showing info */}
              <div style={styles.paginationInfo}>
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredRequests.length)} of {filteredRequests.length} requests
              </div>
            </div>
          )}
        </>
      )}

      {/* Empty State - No Results */}
      {selectedAccount && filteredRequests.length === 0 && (
        <div style={styles.noResults}>
          <div style={styles.noResultsIcon}>📋</div>
          <h3 style={styles.noResultsTitle}>No Requests Found</h3>
          <p style={styles.noResultsText}>
            {requests.length === 0 
              ? "You haven't submitted any requests yet." 
              : `No ${selectedRequestType !== "ALL" ? getRequestTypeLabel(selectedRequestType) : ""} requests found.`}
          </p>
          {selectedRequestType !== "ALL" && requests.length > 0 && (
            <button onClick={clearFilter} style={styles.clearAllButton}>
              View All Requests
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// Professional styles - FIXED for scrolling
const styles = {
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "24px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    height: "100%",
    overflowY: "auto",
    color: "#0f172a",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
  },
  bankLoader: {
    textAlign: "center",
    padding: "40px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
    width: "300px",
  },
  loaderWrapper: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "24px",
  },
  loaderBar: {
    width: "8px",
    height: "40px",
    backgroundColor: "#2563eb",
    borderRadius: "4px",
    animation: "loaderPulse 1s ease-in-out infinite",
  },
  loadingTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#2563eb",
    marginBottom: "8px",
  },
  loadingSubtitle: {
    fontSize: "14px",
    color: "#64748b",
    marginBottom: "20px",
  },
  progressBar: {
    width: "100%",
    height: "4px",
    backgroundColor: "#e2e8f0",
    borderRadius: "2px",
    overflow: "hidden",
  },
  progressFill: {
    width: "70%",
    height: "100%",
    backgroundColor: "#2563eb",
    animation: "progress 1.5s ease-in-out infinite",
  },
  header: {
    marginBottom: "24px",
  },
  bankTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#2563eb",
    margin: "0 0 4px 0",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#0f172a",
    margin: 0,
    letterSpacing: "-0.02em",
  },
  filterSection: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "24px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    border: "1px solid #e2e8f0",
  },
  filterRow: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    alignItems: "flex-end",
  },
  filterGroup: {
    flex: 1,
    minWidth: "200px",
  },
  filterLabel: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#475569",
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  filterDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    display: "inline-block",
  },
  filterSelect: {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "14px",
    color: "#0f172a",
    cursor: "pointer",
    outline: "none",
    transition: "all 0.2s",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },
  clearButton: {
    padding: "12px 24px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 4px 6px -1px rgba(239, 68, 68, 0.2)",
    ':hover': {
      backgroundColor: "#dc2626",
      transform: "translateY(-1px)",
    }
  },
  activeFilterIndicator: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "16px",
    paddingTop: "16px",
    borderTop: "1px solid #e2e8f0",
  },
  activeFilterLabel: {
    fontSize: "13px",
    color: "#64748b",
  },
  activeFilterBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 12px",
    color: "white",
    borderRadius: "30px",
    fontSize: "13px",
    fontWeight: "600",
  },
  removeFilter: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
    padding: "0 4px",
    display: "flex",
    alignItems: "center",
    ':hover': {
      opacity: 0.8,
    }
  },
  statsBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    padding: "12px 0",
  },
  statsLeft: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  requestCount: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#0f172a",
  },
  pageInfo: {
    fontSize: "14px",
    color: "#64748b",
    padding: "4px 12px",
    backgroundColor: "#f1f5f9",
    borderRadius: "20px",
  },
  filterBadge: {
    padding: "6px 16px",
    backgroundColor: "#2563eb",
    color: "white",
    borderRadius: "30px",
    fontSize: "13px",
    fontWeight: "600",
    boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)",
  },
  tableContainer: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    overflow: "auto",
    maxHeight: "600px", // Fixed height for scrolling
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    marginBottom: "24px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "900px", // Reduced min-width since we removed a column
  },
  th: {
    textAlign: "left",
    padding: "16px 20px",
    borderBottom: "1px solid #e2e8f0",
    color: "#64748b",
    fontSize: "13px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    backgroundColor: "#f8fafc",
    whiteSpace: "nowrap",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  tr: {
    borderBottom: "1px solid #e2e8f0",
    transition: "background-color 0.2s",
    ':hover': {
      backgroundColor: "#f1f5f9",
    },
  },
  td: {
    padding: "16px 20px",
    fontSize: "14px",
    color: "#0f172a",
    verticalAlign: "middle",
  },
  typeBadge: {
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    border: "1px solid",
    display: "inline-block",
    whiteSpace: "nowrap",
  },
  description: {
    fontSize: "14px",
    color: "#0f172a",
    fontWeight: "500",
    maxWidth: "300px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  date: {
    fontFamily: "'SF Mono', 'Fira Code', monospace",
    fontSize: "13px",
    color: "#64748b",
    whiteSpace: "nowrap",
  },
  statusBadge: {
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase",
    display: "inline-block",
    whiteSpace: "nowrap",
  },
  remarks: {
    fontSize: "13px",
    color: "#64748b",
    fontStyle: "italic",
    maxWidth: "200px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  paginationContainer: {
    marginTop: "24px",
    marginBottom: "24px",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
  },
  pageNavButton: {
    padding: "8px 16px",
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    color: "#0f172a",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
    ':hover:not(:disabled)': {
      backgroundColor: "#f1f5f9",
      borderColor: "#2563eb",
      color: "#2563eb",
    }
  },
  pageButtonDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
    ':hover': {
      backgroundColor: "#ffffff",
      borderColor: "#e2e8f0",
      color: "#0f172a",
    }
  },
  pageNumbers: {
    display: "flex",
    gap: "4px",
  },
  pageNumber: {
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    color: "#0f172a",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
    ':hover': {
      backgroundColor: "#f1f5f9",
      borderColor: "#2563eb",
      color: "#2563eb",
    }
  },
  pageNumberActive: {
    backgroundColor: "#2563eb",
    color: "white",
    borderColor: "#2563eb",
    ':hover': {
      backgroundColor: "#2563eb",
      color: "white",
    }
  },
  paginationInfo: {
    textAlign: "center",
    fontSize: "13px",
    color: "#64748b",
    marginTop: "16px",
  },
  error: {
    textAlign: "center",
    padding: "60px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e2e8f0",
    maxWidth: "500px",
    margin: "40px auto",
  },
  errorIcon: {
    color: "#ef4444",
    marginBottom: "20px",
  },
  errorText: {
    fontSize: "16px",
    color: "#0f172a",
    marginBottom: "24px",
  },
  retryButton: {
    padding: "12px 32px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "30px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
    ':hover': {
      backgroundColor: "#1d4ed8",
      transform: "translateY(-1px)",
      boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.3)",
    }
  },
  empty: {
    textAlign: "center",
    padding: "60px 40px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e2e8f0",
    maxWidth: "500px",
    margin: "40px auto",
  },
  emptyIconContainer: {
    fontSize: "48px",
    marginBottom: "20px",
  },
  emptyTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#0f172a",
    margin: "0 0 8px 0",
  },
  emptyText: {
    fontSize: "14px",
    color: "#64748b",
    marginBottom: "20px",
  },
  noResults: {
    textAlign: "center",
    padding: "60px 40px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e2e8f0",
    maxWidth: "600px",
    margin: "40px auto",
  },
  noResultsIcon: {
    fontSize: "48px",
    marginBottom: "20px",
    opacity: 0.7,
  },
  noResultsTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#0f172a",
    margin: "0 0 8px 0",
  },
  noResultsText: {
    fontSize: "14px",
    color: "#64748b",
    marginBottom: "20px",
  },
  clearAllButton: {
    padding: "12px 32px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "30px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)",
    ':hover': {
      backgroundColor: "#1d4ed8",
      transform: "translateY(-1px)",
    }
  },
};

// Add keyframe animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes loaderPulse {
    0%, 100% { transform: scaleY(1); opacity: 1; }
    50% { transform: scaleY(1.5); opacity: 0.7; }
  }
  
  @keyframes progress {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(0); }
    100% { transform: translateX(100%); }
  }

  .loaderBar:nth-child(2) { animation-delay: 0.1s; }
  .loaderBar:nth-child(3) { animation-delay: 0.2s; }
  .loaderBar:nth-child(4) { animation-delay: 0.3s; }
  
  /* Smooth scrolling */
  * {
    scroll-behavior: smooth;
  }
`;
document.head.appendChild(styleSheet);

export default MyRequests;