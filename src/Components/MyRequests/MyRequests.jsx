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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default account for demo
  const defaultAccount = 1440320196;

  useEffect(() => {
    fetchRequests(defaultAccount);
  }, []);

  const fetchRequests = async (accountNumber) => {
    setLoading(true);
    setError(null);
    
    try {
      const payload = {
        accountNumber: accountNumber
      };

      console.log("Fetching requests for account:", accountNumber);
      
      const response = await API.post(
        "/abcbank/api/queriesResponse/queriesList",
        payload
      );

      console.log("API Response:", response.data);

      if (response.data?.status) {
        setRequests(response.data.data || []);
      } else {
        setError(response.data?.message || "Failed to fetch requests");
        setRequests([]);
      }
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

  // Helper function for status colors - supports both light and dark mode
  const getStatusStyle = (status) => {
    switch (status?.toUpperCase()) {
      case "APPROVED":
        return {
          background: "var(--success-bg, #d4edda)",
          color: "var(--success-text, #155724)",
          border: "1px solid var(--success-border, #c3e6cb)"
        };
      case "REJECTED":
        return {
          background: "var(--danger-bg, #f8d7da)",
          color: "var(--danger-text, #721c24)",
          border: "1px solid var(--danger-border, #f5c6cb)"
        };
      case "PENDING":
        return {
          background: "var(--warning-bg, #fff3cd)",
          color: "var(--warning-text, #856404)",
          border: "1px solid var(--warning-border, #ffeeba)"
        };
      default:
        return {
          background: "var(--neutral-bg, #e2e3e5)",
          color: "var(--neutral-text, #383d41)",
          border: "1px solid var(--neutral-border, #d6d8db)"
        };
    }
  };

  // Simple loading state
  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading your requests...</p>
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
            onClick={() => fetchRequests(defaultAccount)} 
            style={styles.retryButton}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (requests.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.empty}>
          <svg style={styles.emptyIcon} viewBox="0 0 24 24" width="64" height="64" stroke="currentColor" fill="none">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2"/>
            <polyline points="7 10 12 15 17 10" strokeWidth="2"/>
            <line x1="12" y1="15" x2="12" y2="3" strokeWidth="2"/>
          </svg>
          <h3 style={styles.emptyTitle}>No Requests Found</h3>
          <p style={styles.emptyText}>You haven't submitted any requests yet.</p>
          <button style={styles.emptyButton}>Create New Request</button>
        </div>
      </div>
    );
  }

  // Main render with requests
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>My Requests</h2>
        <span style={styles.requestCount}>{requests.length} {requests.length === 1 ? 'Request' : 'Requests'}</span>
      </div>
      
      <div style={styles.requestsList}>
        {requests.map((item) => (
          <div key={item.queriesId} style={styles.card}>
            {/* Header with status */}
            <div style={styles.cardHeader}>
              <div style={styles.queryWrapper}>
                <span style={styles.queryIcon}>📋</span>
                <h3 style={styles.queryText}>{item.customerQuery}</h3>
              </div>
              <span style={{
                ...styles.statusBadge,
                ...getStatusStyle(item.status)
              }}>
                {item.status || "PENDING"}
              </span>
            </div>

            {/* Basic Info */}
            <div style={styles.cardBody}>
              <div style={styles.infoGrid}>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Account Number</span>
                  <span style={styles.infoValue}>{item.accountNumber}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Customer</span>
                  <span style={styles.infoValue}>{item.fullName || "N/A"}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Mobile</span>
                  <span style={styles.infoValue}>{item.mobileNumber || "N/A"}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Raised Date</span>
                  <span style={styles.infoValue}>{item.queryRaisedDate || "N/A"}</span>
                </div>
              </div>
              
              {/* Response info if available */}
              {(item.status === "APPROVED" || item.status === "REJECTED") && (
                <div style={styles.responseSection}>
                  <h4 style={styles.responseTitle}>Response Details</h4>
                  <div style={styles.responseGrid}>
                    {item.approvedByName && (
                      <div style={styles.responseItem}>
                        <span style={styles.responseLabel}>Approved By</span>
                        <span style={styles.responseValue}>{item.approvedByName}</span>
                      </div>
                    )}
                    {item.queryApprovedDate && (
                      <div style={styles.responseItem}>
                        <span style={styles.responseLabel}>Approved Date</span>
                        <span style={styles.responseValue}>{item.queryApprovedDate}</span>
                      </div>
                    )}
                    {item.queryResponse && (
                      <div style={{...styles.responseItem, gridColumn: '1 / -1'}}>
                        <span style={styles.responseLabel}>Response</span>
                        <span style={styles.responseValue}>{item.queryResponse}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Professional styles with CSS variables for light/dark mode support
const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "24px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    backgroundColor: "var(--bg-primary, #f8fafc)",
    minHeight: "100vh",
    transition: "all 0.3s ease",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "28px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "var(--text-primary, #0f172a)",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  requestCount: {
    padding: "6px 14px",
    backgroundColor: "var(--badge-bg, #e2e8f0)",
    color: "var(--badge-text, #475569)",
    borderRadius: "30px",
    fontSize: "14px",
    fontWeight: "600",
  },
  requestsList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  card: {
    backgroundColor: "var(--card-bg, #ffffff)",
    border: "1px solid var(--border-color, #e2e8f0)",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 4px 6px -1px var(--shadow-color, rgba(0, 0, 0, 0.1))",
    transition: "all 0.3s ease",
    cursor: "pointer",
    ':hover': {
      transform: "translateY(-2px)",
      boxShadow: "0 10px 15px -3px var(--shadow-color, rgba(0, 0, 0, 0.1))",
    }
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "20px",
    paddingBottom: "16px",
    borderBottom: "1px solid var(--border-light, #f1f5f9)",
    flexWrap: "wrap",
    gap: "12px",
  },
  queryWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flex: 1,
  },
  queryIcon: {
    fontSize: "20px",
  },
  queryText: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "600",
    color: "var(--text-primary, #0f172a)",
    lineHeight: "1.4",
    wordBreak: "break-word",
  },
  statusBadge: {
    padding: "6px 14px",
    borderRadius: "30px",
    fontSize: "13px",
    fontWeight: "600",
    letterSpacing: "0.3px",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },
  cardBody: {
    fontSize: "15px",
    lineHeight: "1.6",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    marginBottom: "20px",
  },
  infoItem: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    padding: "12px",
    backgroundColor: "var(--info-bg, #f8fafc)",
    borderRadius: "12px",
    border: "1px solid var(--border-light, #f1f5f9)",
  },
  infoLabel: {
    fontSize: "12px",
    fontWeight: "600",
    color: "var(--text-secondary, #64748b)",
    textTransform: "uppercase",
    letterSpacing: "0.3px",
  },
  infoValue: {
    fontSize: "16px",
    fontWeight: "600",
    color: "var(--text-primary, #0f172a)",
    wordBreak: "break-word",
  },
  responseSection: {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "var(--response-bg, #f0f9ff)",
    borderRadius: "12px",
    border: "1px solid var(--response-border, #bae6fd)",
  },
  responseTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "var(--text-primary, #0f172a)",
    margin: "0 0 16px 0",
  },
  responseGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
  },
  responseItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  responseLabel: {
    fontSize: "11px",
    fontWeight: "600",
    color: "var(--text-secondary, #64748b)",
    textTransform: "uppercase",
    letterSpacing: "0.3px",
  },
  responseValue: {
    fontSize: "14px",
    color: "var(--text-primary, #0f172a)",
    fontWeight: "500",
    wordBreak: "break-word",
  },
  loading: {
    textAlign: "center",
    padding: "60px",
    backgroundColor: "var(--card-bg, #ffffff)",
    borderRadius: "20px",
    boxShadow: "0 4px 6px -1px var(--shadow-color, rgba(0, 0, 0, 0.1))",
    maxWidth: "500px",
    margin: "40px auto",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "4px solid var(--spinner-track, #e2e8f0)",
    borderTop: "4px solid var(--spinner-color, #3b82f6)",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto 20px",
  },
  loadingText: {
    fontSize: "16px",
    color: "var(--text-secondary, #64748b)",
    margin: 0,
  },
  error: {
    textAlign: "center",
    padding: "60px",
    backgroundColor: "var(--card-bg, #ffffff)",
    borderRadius: "20px",
    boxShadow: "0 4px 6px -1px var(--shadow-color, rgba(0, 0, 0, 0.1))",
    maxWidth: "500px",
    margin: "40px auto",
  },
  errorIcon: {
    color: "var(--error-color, #ef4444)",
    marginBottom: "20px",
  },
  errorText: {
    fontSize: "16px",
    color: "var(--text-primary, #0f172a)",
    marginBottom: "24px",
    lineHeight: "1.6",
  },
  retryButton: {
    padding: "12px 32px",
    backgroundColor: "var(--button-bg, #3b82f6)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 6px -1px var(--button-shadow, rgba(59, 130, 246, 0.3))",
    ':hover': {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 10px -1px var(--button-shadow, rgba(59, 130, 246, 0.4))",
    }
  },
  empty: {
    textAlign: "center",
    padding: "80px 40px",
    backgroundColor: "var(--card-bg, #ffffff)",
    borderRadius: "24px",
    boxShadow: "0 10px 25px -5px var(--shadow-color, rgba(0, 0, 0, 0.1))",
    maxWidth: "600px",
    margin: "40px auto",
  },
  emptyIcon: {
    color: "var(--text-secondary, #94a3b8)",
    marginBottom: "24px",
  },
  emptyTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "var(--text-primary, #0f172a)",
    margin: "0 0 12px 0",
  },
  emptyText: {
    fontSize: "16px",
    color: "var(--text-secondary, #64748b)",
    marginBottom: "28px",
  },
  emptyButton: {
    padding: "14px 36px",
    backgroundColor: "var(--button-bg, #3b82f6)",
    color: "white",
    border: "none",
    borderRadius: "30px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 6px -1px var(--button-shadow, rgba(59, 130, 246, 0.3))",
    ':hover': {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 10px -1px var(--button-shadow, rgba(59, 130, 246, 0.4))",
    }
  },
};

// Add global styles for theme support
const globalStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Light Mode (Default) */
  :root {
    --bg-primary: #f8fafc;
    --card-bg: #ffffff;
    --text-primary: #0f172a;
    --text-secondary: #64748b;
    --border-color: #e2e8f0;
    --border-light: #f1f5f9;
    --shadow-color: rgba(0, 0, 0, 0.1);
    --button-bg: #3b82f6;
    --button-shadow: rgba(59, 130, 246, 0.3);
    --badge-bg: #e2e8f0;
    --badge-text: #475569;
    --info-bg: #f8fafc;
    --response-bg: #f0f9ff;
    --response-border: #bae6fd;
    --spinner-track: #e2e8f0;
    --spinner-color: #3b82f6;
    --error-color: #ef4444;
    
    /* Status colors for light mode */
    --success-bg: #d4edda;
    --success-text: #155724;
    --success-border: #c3e6cb;
    --danger-bg: #f8d7da;
    --danger-text: #721c24;
    --danger-border: #f5c6cb;
    --warning-bg: #fff3cd;
    --warning-text: #856404;
    --warning-border: #ffeeba;
    --neutral-bg: #e2e3e5;
    --neutral-text: #383d41;
    --neutral-border: #d6d8db;
  }

  /* Dark/Blue Mode */
  [data-theme="dark"], .dark-mode {
    --bg-primary: #0f172a;
    --card-bg: #1e293b;
    --text-primary: #f1f5f9;
    --text-secondary: #94a3b8;
    --border-color: #334155;
    --border-light: #1e293b;
    --shadow-color: rgba(0, 0, 0, 0.3);
    --button-bg: #3b82f6;
    --button-shadow: rgba(59, 130, 246, 0.2);
    --badge-bg: #334155;
    --badge-text: #cbd5e1;
    --info-bg: #1e293b;
    --response-bg: #1e3a5f;
    --response-border: #2563eb;
    --spinner-track: #334155;
    --spinner-color: #60a5fa;
    --error-color: #f87171;
    
    /* Status colors for dark mode */
    --success-bg: #064e3b;
    --success-text: #d1fae5;
    --success-border: #065f46;
    --danger-bg: #7f1d1d;
    --danger-text: #fee2e2;
    --danger-border: #991b1b;
    --warning-bg: #78350f;
    --warning-text: #fef3c7;
    --warning-border: #92400e;
    --neutral-bg: #1e293b;
    --neutral-text: #e2e8f0;
    --neutral-border: #334155;
  }

  /* Card hover effect */
  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px var(--shadow-color);
  }

  /* Button hover effects */
  .retry-button:hover,
  .empty-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 10px -1px var(--button-shadow);
  }

  /* Smooth transitions */
  * {
    transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
  }
`;

// Inject global styles
const styleSheet = document.createElement("style");
styleSheet.textContent = globalStyles;
document.head.appendChild(styleSheet);

export default MyRequests;