
// import { useEffect, useState } from "react";
// import {
//   FaUserCircle,
//   FaEnvelope,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaCalendarAlt,
//   FaBirthdayCake,
//   FaIdCard,
//   FaCity,
//   FaGlobe,
//   FaEdit
// } from "react-icons/fa";
// import API from "../../api";

// const ProfileBar = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const userId = localStorage.getItem("userId");
//         if (!userId) return;

//         const response = await API.get(`users/details/${userId}`);

//         console.log("Profile API Response:", response.data);
//         setProfile(response.data?.data);

//       } catch (error) {
//         console.error("Failed to fetch profile", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleUpdateClick = () => {
//     // Add your update logic here
//     console.log("Update profile clicked");
//     // You can navigate to edit page or open modal
//   };

//   if (loading) {
//     return (
//       <div style={styles.loadingContainer}>
//         <div style={styles.loadingSpinner}></div>
//         <p style={styles.loadingText}>Loading profile...</p>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div style={styles.errorContainer}>
//         <FaUserCircle size={48} color="#94a3b8" />
//         <p style={styles.errorText}>No profile data found</p>
//         <button style={styles.retryButton} onClick={() => window.location.reload()}>
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.profileCard}>
//       {/* Decorative gradient line */}
//       <div style={styles.gradientLine}></div>
      
//       {/* HEADER WITH UPDATE BUTTON */}
//       <div style={styles.header}>
//         <div style={styles.avatarContainer}>
//           <FaUserCircle size={70} color="#3b82f6" />
//           <div style={styles.onlineIndicator}></div>
//         </div>
//         <div style={styles.headerInfo}>
//           <h2 style={styles.name}>
//             {profile.firstName} {profile.lastName}
//           </h2>
//           <div style={styles.locationBadge}>
//             <FaMapMarkerAlt size={12} />
//             <span style={styles.location}>
//               {profile.city}, {profile.state}
//             </span>
//           </div>
//         </div>
//         <button style={styles.updateButton} onClick={handleUpdateClick}>
//           <FaEdit style={styles.updateIcon} />
//           Update
//         </button>
//       </div>

//       {/* DETAILS GRID */}
//       <div style={styles.detailsGrid}>
//         <div style={styles.detailItem}>
//           <div style={styles.iconWrapper}>
//             <FaEnvelope style={styles.icon} />
//           </div>
//           <div style={styles.detailContent}>
//             <span style={styles.detailLabel}>Email</span>
//             <span style={styles.detailValue}>{profile.email}</span>
//           </div>
//         </div>

//         <div style={styles.detailItem}>
//           <div style={styles.iconWrapper}>
//             <FaPhone style={styles.icon} />
//           </div>
//           <div style={styles.detailContent}>
//             <span style={styles.detailLabel}>Mobile</span>
//             <span style={styles.detailValue}>{profile.mobileNumber}</span>
//           </div>
//         </div>

//         <div style={styles.detailItem}>
//           <div style={styles.iconWrapper}>
//             <FaBirthdayCake style={styles.icon} />
//           </div>
//           <div style={styles.detailContent}>
//             <span style={styles.detailLabel}>Date of Birth</span>
//             <span style={styles.detailValue}>
//               {profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString('en-US', {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric'
//               }) : "N/A"}
//             </span>
//           </div>
//         </div>

//         <div style={styles.detailItem}>
//           <div style={styles.iconWrapper}>
//             <FaIdCard style={styles.icon} />
//           </div>
//           <div style={styles.detailContent}>
//             <span style={styles.detailLabel}>Aadhar Number</span>
//             <span style={styles.detailValue}>
//               {profile.aadharNumber ? profile.aadharNumber.replace(/(\d{4})/g, '$1 ').trim() : "N/A"}
//             </span>
//           </div>
//         </div>

//         <div style={styles.detailItem}>
//           <div style={styles.iconWrapper}>
//             <FaCity style={styles.icon} />
//           </div>
//           <div style={styles.detailContent}>
//             <span style={styles.detailLabel}>Address</span>
//             <span style={styles.detailValue}>
//               {profile.address || "N/A"}
//             </span>
//           </div>
//         </div>

//         <div style={styles.detailItem}>
//           <div style={styles.iconWrapper}>
//             <FaGlobe style={styles.icon} />
//           </div>
//           <div style={styles.detailContent}>
//             <span style={styles.detailLabel}>Pincode</span>
//             <span style={styles.detailValue}>
//               {profile.pincode || "N/A"}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* ACCOUNT SUMMARY (if available) */}
//       {profile.accountSummary && (
//         <div style={styles.accountSummary}>
//           <h3 style={styles.summaryTitle}>Account Summary</h3>
//           <div style={styles.summaryGrid}>
//             <div style={styles.summaryItem}>
//               <span style={styles.summaryLabel}>Account Number</span>
//               <span style={styles.summaryValue}>{profile.accountNumber}</span>
//             </div>
//             <div style={styles.summaryItem}>
//               <span style={styles.summaryLabel}>Account Type</span>
//               <span style={styles.summaryValue}>{profile.accountType}</span>
//             </div>
//             <div style={styles.summaryItem}>
//               <span style={styles.summaryLabel}>Balance</span>
//               <span style={styles.summaryValue}>₹{profile.balance?.toLocaleString()}</span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileBar;

// /* =======================
//    🎨 STYLES (INLINE CSS)
//    ======================= */

// const styles = {
//   profileCard: {
//     backgroundColor: "#ffffff",
//     borderRadius: "24px",
//     boxShadow: "0 20px 35px -8px rgba(0, 0, 0, 0.1), 0 10px 15px -6px rgba(0, 0, 0, 0.05)",
//     padding: "28px",
//     maxWidth: "800px",
//     margin: "20px auto",
//     position: "relative",
//     overflow: "hidden",
//     border: "1px solid rgba(226, 232, 240, 0.6)",
//     transition: "transform 0.3s ease, box-shadow 0.3s ease",
//   },

//   gradientLine: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     height: "6px",
//     background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)",
//     borderRadius: "24px 24px 0 0",
//   },

//   header: {
//     display: "flex",
//     alignItems: "center",
//     gap: "20px",
//     marginBottom: "30px",
//     position: "relative",
//     flexWrap: "wrap",
//   },

//   avatarContainer: {
//     position: "relative",
//     display: "inline-block",
//   },

//   onlineIndicator: {
//     position: "absolute",
//     bottom: "5px",
//     right: "5px",
//     width: "14px",
//     height: "14px",
//     backgroundColor: "#22c55e",
//     border: "3px solid #ffffff",
//     borderRadius: "50%",
//     boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//   },

//   headerInfo: {
//     flex: 1,
//   },

//   name: {
//     fontSize: "26px",
//     fontWeight: "700",
//     color: "#0f172a",
//     margin: "0 0 6px 0",
//     letterSpacing: "-0.5px",
//   },

//   locationBadge: {
//     display: "flex",
//     alignItems: "center",
//     gap: "6px",
//     backgroundColor: "#f1f5f9",
//     padding: "6px 12px",
//     borderRadius: "30px",
//     width: "fit-content",
//   },

//   location: {
//     fontSize: "14px",
//     color: "#475569",
//     fontWeight: "500",
//   },

//   updateButton: {
//     display: "flex",
//     alignItems: "center",
//     gap: "8px",
//     backgroundColor: "#3b82f6",
//     color: "white",
//     border: "none",
//     borderRadius: "30px",
//     padding: "10px 24px",
//     fontSize: "15px",
//     fontWeight: "600",
//     cursor: "pointer",
//     transition: "all 0.3s ease",
//     boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
//     marginLeft: "auto",
//   },

//   updateIcon: {
//     fontSize: "16px",
//   },

//   detailsGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//     gap: "20px",
//     marginBottom: "20px",
//   },

//   detailItem: {
//     display: "flex",
//     alignItems: "center",
//     gap: "15px",
//     padding: "15px",
//     backgroundColor: "#f8fafc",
//     borderRadius: "16px",
//     transition: "all 0.3s ease",
//     border: "1px solid transparent",
//   },

//   iconWrapper: {
//     width: "45px",
//     height: "45px",
//     backgroundColor: "#e0f2fe",
//     borderRadius: "12px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     color: "#0369a1",
//   },

//   icon: {
//     fontSize: "20px",
//   },

//   detailContent: {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     gap: "4px",
//   },

//   detailLabel: {
//     fontSize: "12px",
//     color: "#64748b",
//     textTransform: "uppercase",
//     letterSpacing: "0.5px",
//     fontWeight: "600",
//   },

//   detailValue: {
//     fontSize: "15px",
//     color: "#0f172a",
//     fontWeight: "500",
//     wordBreak: "break-word",
//   },

//   accountSummary: {
//     marginTop: "25px",
//     padding: "20px",
//     backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     borderRadius: "16px",
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//   },

//   summaryTitle: {
//     fontSize: "18px",
//     fontWeight: "600",
//     color: "white",
//     margin: "0 0 15px 0",
//   },

//   summaryGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
//     gap: "15px",
//   },

//   summaryItem: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "5px",
//   },

//   summaryLabel: {
//     fontSize: "12px",
//     color: "rgba(255, 255, 255, 0.8)",
//     textTransform: "uppercase",
//     letterSpacing: "0.5px",
//   },

//   summaryValue: {
//     fontSize: "18px",
//     color: "white",
//     fontWeight: "700",
//   },

//   loadingContainer: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "60px",
//     backgroundColor: "#ffffff",
//     borderRadius: "24px",
//     boxShadow: "0 20px 35px -8px rgba(0, 0, 0, 0.1)",
//     maxWidth: "400px",
//     margin: "40px auto",
//   },

//   loadingSpinner: {
//     width: "50px",
//     height: "50px",
//     border: "4px solid #e2e8f0",
//     borderTop: "4px solid #3b82f6",
//     borderRadius: "50%",
//     animation: "spin 1s linear infinite",
//     marginBottom: "20px",
//   },

//   loadingText: {
//     fontSize: "16px",
//     color: "#64748b",
//     margin: 0,
//   },

//   errorContainer: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "50px",
//     backgroundColor: "#ffffff",
//     borderRadius: "24px",
//     boxShadow: "0 20px 35px -8px rgba(0, 0, 0, 0.1)",
//     maxWidth: "400px",
//     margin: "40px auto",
//     gap: "20px",
//   },

//   errorText: {
//     fontSize: "18px",
//     color: "#64748b",
//     margin: "10px 0",
//   },

//   retryButton: {
//     backgroundColor: "#3b82f6",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     padding: "10px 24px",
//     fontSize: "14px",
//     fontWeight: "600",
//     cursor: "pointer",
//     transition: "background-color 0.3s ease",
//   },

//   // Hover effects (to be added via JavaScript)
//   hoverEffect: {
//     transform: "translateY(-2px)",
//     boxShadow: "0 25px 40px -10px rgba(0, 0, 0, 0.15)",
//     borderColor: "#3b82f6",
//   },

//   updateButtonHover: {
//     backgroundColor: "#2563eb",
//     transform: "translateY(-2px)",
//     boxShadow: "0 6px 18px rgba(59, 130, 246, 0.4)",
//   },

//   detailItemHover: {
//     backgroundColor: "#ffffff",
//     borderColor: "#e2e8f0",
//     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
//     transform: "translateY(-2px)",
//   },
// };

// // Add this keyframe animation to your global CSS or in a style tag
// const globalStyles = `
//   @keyframes spin {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
//   }

//   .profile-card:hover {
//     transform: translateY(-4px);
//     box-shadow: 0 30px 45px -12px rgba(0, 0, 0, 0.15);
//   }

//   .update-button:hover {
//     background-color: #2563eb !important;
//     transform: translateY(-2px) !important;
//     box-shadow: 0 6px 18px rgba(59, 130, 246, 0.4) !important;
//   }

//   .detail-item:hover {
//     background-color: #ffffff !important;
//     border-color: #e2e8f0 !important;
//     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
//     transform: translateY(-2px) !important;
//   }
// `;

// // Add this to your component if you want hover effects
// // You can also add these event handlers to each element
// const addHoverEffect = (e, style) => {
//   Object.assign(e.currentTarget.style, style);
// };

// const removeHoverEffect = (e, style) => {
//   Object.keys(style).forEach(key => {
//     e.currentTarget.style[key] = '';
//   });
// };

// // To use hover effects, add these props to your elements:
// // onMouseEnter={(e) => addHoverEffect(e, styles.updateButtonHover)}
// // onMouseLeave={(e) => removeHoverEffect(e, styles.updateButtonHover)}


import { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaCity,
  FaGlobe,
  FaEdit,
  FaSave,
  FaTimes,
  FaUser,
  FaMobile,
  FaCalendarAlt,
  FaMapPin,
  FaHome,
  FaRoad,
  FaFlag,
  FaPenFancy
} from "react-icons/fa";
import API from "../../api";

const ProfileBar = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const response = await API.get(`users/details/${userId}`);
        console.log("Profile API Response:", response.data);
        setProfile(response.data?.data);
        setFormData(response.data?.data || {});

      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateClick = () => {
    setShowUpdateForm(true);
  };

  const handleCloseForm = () => {
    setShowUpdateForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const userId = localStorage.getItem("userId");
      const response = await API.put(`users/update/${userId}`, formData);
      
      if (response.data?.status) {
        setProfile(formData);
        setShowUpdateForm(false);
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setUpdating(false);
    }
  };


  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p style={styles.loadingText}>Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={styles.errorContainer}>
        <FaUserCircle size={48} color="#94a3b8" />
        <p style={styles.errorText}>No profile data found</p>
        <button style={styles.retryButton} onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div style={styles.profileCard}>
        {/* Decorative header with bank name */}
        <div style={styles.bankHeader}>
          <span style={styles.bankName}>ABC Bank</span>
          <div style={styles.bankBadge}>
            <span style={styles.badgeText}>PROD</span>
            <span style={styles.versionText}>v2.5.0</span>
          </div>
        </div>
        
        {/* Decorative gradient line */}
        <div style={styles.gradientLine}></div>
        
        {/* HEADER */}
        <div style={styles.header}>
          <div style={styles.avatarContainer}>
            <FaUserCircle size={90} color="#1e4b8a" />
            <div style={styles.onlineIndicator}></div>
          </div>
          <div style={styles.headerInfo}>
            <h2 style={styles.name}>
              {profile.firstName} {profile.lastName}
            </h2>
            <div style={styles.locationBadge}>
              <FaMapMarkerAlt size={14} color="#1e4b8a" />
              <span style={styles.location}>
                {profile.city}, {profile.state}
              </span>
            </div>
          </div>
        </div>

        {/* DETAILS GRID - WITHOUT AADHAR */}
        <div style={styles.detailsGrid}>
          <div style={styles.detailItem}>
            <div style={styles.iconWrapper}>
              <FaEnvelope style={styles.icon} />
            </div>
            <div style={styles.detailContent}>
              <span style={styles.detailLabel}>EMAIL</span>
              <span style={styles.detailValue}>{profile.email}</span>
            </div>
          </div>

          <div style={styles.detailItem}>
            <div style={styles.iconWrapper}>
              <FaPhone style={styles.icon} />
            </div>
            <div style={styles.detailContent}>
              <span style={styles.detailLabel}>MOBILE</span>
              <span style={styles.detailValue}>{profile.mobileNumber}</span>
            </div>
          </div>

          <div style={styles.detailItem}>
            <div style={styles.iconWrapper}>
              <FaBirthdayCake style={styles.icon} />
            </div>
            <div style={styles.detailContent}>
              <span style={styles.detailLabel}>DATE OF BIRTH</span>
              <span style={styles.detailValue}>{formatDate(profile.dateOfBirth)}</span>
            </div>
          </div>

          <div style={styles.detailItem}>
            <div style={styles.iconWrapper}>
              <FaHome style={styles.icon} />
            </div>
            <div style={styles.detailContent}>
              <span style={styles.detailLabel}>ADDRESS</span>
              <span style={styles.detailValue}>{profile.address || "N/A"}</span>
            </div>
          </div>

          <div style={styles.detailItem}>
            <div style={styles.iconWrapper}>
              <FaCity style={styles.icon} />
            </div>
            <div style={styles.detailContent}>
              <span style={styles.detailLabel}>CITY</span>
              <span style={styles.detailValue}>{profile.city || "N/A"}</span>
            </div>
          </div>

          <div style={styles.detailItem}>
            <div style={styles.iconWrapper}>
              <FaFlag style={styles.icon} />
            </div>
            <div style={styles.detailContent}>
              <span style={styles.detailLabel}>STATE</span>
              <span style={styles.detailValue}>{profile.state || "N/A"}</span>
            </div>
          </div>

          <div style={styles.detailItem}>
            <div style={styles.iconWrapper}>
              <FaGlobe style={styles.icon} />
            </div>
            <div style={styles.detailContent}>
              <span style={styles.detailLabel}>COUNTRY</span>
              <span style={styles.detailValue}>{profile.country || "India"}</span>
            </div>
          </div>

          <div style={styles.detailItem}>
            <div style={styles.iconWrapper}>
              <FaMapPin style={styles.icon} />
            </div>
            <div style={styles.detailContent}>
              <span style={styles.detailLabel}>PINCODE</span>
              <span style={styles.detailValue}>{profile.pincode || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* UPDATE BUTTON AT BOTTOM - STYLISH */}
        <div style={styles.buttonContainer}>
          <button style={styles.updateButton} onClick={handleUpdateClick}>
            <FaPenFancy style={styles.updateIcon} />
            <span style={styles.updateButtonText}>Edit Profile</span>
            <span style={styles.updateButtonGlow}></span>
          </button>
          
          {/* Branch Info */}
          <div style={styles.branchInfo}>
            <span style={styles.branchText}>Main Branch · NYC</span>
            <span style={styles.weatherInfo}>28°C ☀️</span>
          </div>
        </div>
      </div>

      {/* UPDATE PROFILE MODAL - UPDATED WITHOUT AADHAR */}
      {showUpdateForm && (
        <div style={styles.modalOverlay} onClick={handleCloseForm}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                <FaEdit style={styles.modalTitleIcon} />
                Edit Profile Information
              </h3>
              <button style={styles.closeButton} onClick={handleCloseForm}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <FaUser style={styles.labelIcon} /> First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName || ''}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter first name"
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <FaUser style={styles.labelIcon} /> Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName || ''}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter last name"
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <FaEnvelope style={styles.labelIcon} /> Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter email"
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <FaMobile style={styles.labelIcon} /> Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber || ''}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter mobile number"
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <FaCalendarAlt style={styles.labelIcon} /> Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth || ''}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.formGroupFull}>
                  <label style={styles.label}>
                    <FaRoad style={styles.labelIcon} /> Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address || ''}
                    onChange={handleInputChange}
                    style={styles.textarea}
                    rows="2"
                    placeholder="Enter your address"
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <FaCity style={styles.labelIcon} /> City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city || ''}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter city"
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <FaFlag style={styles.labelIcon} /> State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state || ''}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter state"
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <FaGlobe style={styles.labelIcon} /> Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country || 'India'}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter country"
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <FaMapPin style={styles.labelIcon} /> Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode || ''}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter pincode"
                    required
                  />
                </div>
              </div>

              <div style={styles.formActions}>
                <button type="button" style={styles.cancelButton} onClick={handleCloseForm}>
                  <FaTimes /> Cancel
                </button>
                <button type="submit" style={styles.submitButton} disabled={updating}>
                  <FaSave /> {updating ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileBar;

/* =======================
   🎨 STYLES (INLINE CSS)
   ======================= */

const styles = {
  profileCard: {
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08), 0 8px 20px rgba(0, 0, 0, 0.06)",
    padding: "30px",
    maxWidth: "1000px",
    margin: "20px auto",
    position: "relative",
    overflow: "hidden",
    border: "1px solid rgba(30, 75, 138, 0.1)",
  },

  bankHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    paddingBottom: "10px",
    borderBottom: "1px solid #eef2f6",
  },

  bankName: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#1e4b8a",
    letterSpacing: "0.5px",
  },

  bankBadge: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  badgeText: {
    backgroundColor: "#1e4b8a",
    color: "white",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },

  versionText: {
    color: "#64748b",
    fontSize: "12px",
    fontWeight: "500",
  },

  gradientLine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: "linear-gradient(90deg, #1e4b8a, #3a7bd5, #6aa6ff, #3a7bd5, #1e4b8a)",
    backgroundSize: "200% 100%",
    animation: "gradientMove 3s ease infinite",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
    marginBottom: "35px",
    marginTop: "10px",
  },

  avatarContainer: {
    position: "relative",
    filter: "drop-shadow(0 8px 16px rgba(30, 75, 138, 0.2))",
  },

  onlineIndicator: {
    position: "absolute",
    bottom: "8px",
    right: "8px",
    width: "16px",
    height: "16px",
    backgroundColor: "#22c55e",
    border: "3px solid #ffffff",
    borderRadius: "50%",
    boxShadow: "0 2px 8px rgba(34, 197, 94, 0.3)",
  },

  headerInfo: {
    flex: 1,
  },

  name: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#0f172a",
    margin: "0 0 10px 0",
    letterSpacing: "-0.5px",
  },

  locationBadge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#f0f7ff",
    padding: "8px 18px",
    borderRadius: "40px",
    width: "fit-content",
    border: "1px solid rgba(30, 75, 138, 0.2)",
  },

  location: {
    fontSize: "15px",
    color: "#1e4b8a",
    fontWeight: "600",
  },

  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "18px",
    marginBottom: "35px",
  },

  detailItem: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "18px",
    backgroundColor: "#f8fafc",
    borderRadius: "16px",
    transition: "all 0.3s ease",
    border: "1px solid #eef2f6",
    cursor: "pointer",
  },

  iconWrapper: {
    width: "52px",
    height: "52px",
    backgroundColor: "#e8f0fe",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#1e4b8a",
    transition: "all 0.3s ease",
  },

  icon: {
    fontSize: "24px",
  },

  detailContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },

  detailLabel: {
    fontSize: "11px",
    color: "#64748b",
    fontWeight: "700",
    letterSpacing: "0.8px",
  },

  detailValue: {
    fontSize: "15px",
    color: "#0f172a",
    fontWeight: "600",
    lineHeight: "1.4",
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
    paddingTop: "20px",
    borderTop: "2px dashed #e2e8f0",
  },

  updateButton: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    backgroundColor: "linear-gradient(135deg, #1e4b8a, #2d5f9e)",
    background: "linear-gradient(135deg, #1e4b8a, #2d5f9e)",
    color: "white",
    border: "none",
    borderRadius: "50px",
    padding: "14px 32px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 8px 20px rgba(30, 75, 138, 0.3)",
    position: "relative",
    overflow: "hidden",
  },

  updateButtonText: {
    position: "relative",
    zIndex: 2,
  },

  updateButtonGlow: {
    position: "absolute",
    top: "0",
    left: "-100%",
    width: "100%",
    height: "100%",
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
    transition: "left 0.5s ease",
    zIndex: 1,
  },

  updateIcon: {
    fontSize: "18px",
    position: "relative",
    zIndex: 2,
  },

  branchInfo: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  branchText: {
    fontSize: "14px",
    color: "#64748b",
    fontWeight: "500",
  },

  weatherInfo: {
    fontSize: "14px",
    color: "#1e4b8a",
    fontWeight: "600",
    backgroundColor: "#f0f7ff",
    padding: "6px 12px",
    borderRadius: "30px",
  },

  // Modal Styles
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(5px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px",
  },

  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: "28px",
    maxWidth: "900px",
    width: "100%",
    maxHeight: "90vh",
    overflow: "auto",
    boxShadow: "0 30px 60px rgba(0, 0, 0, 0.3)",
    animation: "slideUp 0.3s ease",
  },

  modalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "25px 30px",
    borderBottom: "1px solid #eef2f6",
    background: "linear-gradient(135deg, #f8fafc, #ffffff)",
  },

  modalTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1e4b8a",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  modalTitleIcon: {
    fontSize: "22px",
  },

  closeButton: {
    background: "none",
    border: "none",
    fontSize: "22px",
    color: "#64748b",
    cursor: "pointer",
    padding: "10px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    backgroundColor: "#f1f5f9",
    width: "44px",
    height: "44px",
  },

  form: {
    padding: "30px",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "22px",
    marginBottom: "30px",
  },

  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  formGroupFull: {
    gridColumn: "span 2",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#475569",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  labelIcon: {
    color: "#1e4b8a",
    fontSize: "16px",
  },

  input: {
    padding: "14px 18px",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "15px",
    transition: "all 0.3s ease",
    outline: "none",
    backgroundColor: "#f8fafc",
  },

  textarea: {
    padding: "14px 18px",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "15px",
    transition: "all 0.3s ease",
    outline: "none",
    resize: "vertical",
    fontFamily: "inherit",
    backgroundColor: "#f8fafc",
  },

  formActions: {
    display: "flex",
    gap: "15px",
    justifyContent: "flex-end",
    borderTop: "1px solid #eef2f6",
    paddingTop: "25px",
  },

  submitButton: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "linear-gradient(135deg, #1e4b8a, #2d5f9e)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "14px 35px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(30, 75, 138, 0.3)",
  },

  cancelButton: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#f1f5f9",
    color: "#475569",
    border: "none",
    borderRadius: "12px",
    padding: "14px 35px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: "1px solid #e2e8f0",
  },

  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "70px",
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
    maxWidth: "450px",
    margin: "40px auto",
  },

  loadingSpinner: {
    width: "60px",
    height: "60px",
    border: "5px solid #eef2f6",
    borderTop: "5px solid #1e4b8a",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "25px",
  },

  loadingText: {
    fontSize: "16px",
    color: "#64748b",
    margin: 0,
  },

  errorContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px",
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
    maxWidth: "450px",
    margin: "40px auto",
    gap: "20px",
  },

  errorText: {
    fontSize: "18px",
    color: "#64748b",
    margin: "10px 0",
  },

  retryButton: {
    backgroundColor: "#1e4b8a",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "14px 35px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(30, 75, 138, 0.3)",
  },
};

// Add global styles
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes gradientMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .detail-item:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
    border-color: #1e4b8a !important;
    background: linear-gradient(135deg, #ffffff, #f8fafc) !important;
  }

  .detail-item:hover .icon-wrapper {
    transform: scale(1.1) rotate(5deg);
    background-color: #1e4b8a !important;
    color: white !important;
  }

  .update-button:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 15px 30px rgba(30, 75, 138, 0.4) !important;
    background: linear-gradient(135deg, #2d5f9e, #1e4b8a) !important;
  }

  .update-button:hover .update-button-glow {
    left: 100%;
  }

  input:hover, textarea:hover {
    border-color: #1e4b8a !important;
    background-color: #ffffff !important;
  }

  input:focus, textarea:focus {
    border-color: #1e4b8a !important;
    box-shadow: 0 0 0 4px rgba(30, 75, 138, 0.15) !important;
    background-color: #ffffff !important;
  }

  .submit-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(30, 75, 138, 0.4) !important;
  }

  .cancel-button:hover {
    background-color: #fee2e2 !important;
    border-color: #ef4444 !important;
    color: #ef4444 !important;
  }

  .close-button:hover {
    background-color: #fee2e2 !important;
    color: #ef4444 !important;
    transform: rotate(90deg);
  }

  .branch-info span:hover {
    color: #1e4b8a;
    transform: scale(1.05);
  }
`;
document.head.appendChild(style);