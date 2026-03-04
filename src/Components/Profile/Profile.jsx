// // import { useEffect, useState } from "react";
// // import {
// //   FaUserCircle,
// //   FaEnvelope,
// //   FaPhone,
// //   FaMapMarkerAlt,
// //   FaBirthdayCake,
// //   FaCity,
// //   FaGlobe,
// //   FaEdit,
// //   FaSave,
// //   FaTimes,
// //   FaUser,
// //   FaMobile,
// //   FaCalendarAlt,
// //   FaMapPin,
// //   FaHome,
// //   FaRoad,
// //   FaFlag,
// //   FaPenFancy,
// //   FaCheckCircle
// // } from "react-icons/fa";
// // import API from "../../api";
// // import { useSnackbar } from "../../Context/SnackbarContext";

// // const ProfileBar = () => {
// //   const { showSnackbar } = useSnackbar();
// //   const [profile, setProfile] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [showUpdateForm, setShowUpdateForm] = useState(false);
// //   const [formData, setFormData] = useState({});
// //   const [formErrors, setFormErrors] = useState({});
// //   const [touchedFields, setTouchedFields] = useState({});
// //   const [updating, setUpdating] = useState(false);
// //   const [error, setError] = useState(null);

// //   // White and Orange Theme CSS Variables - Exactly matching sidebar
// //   useEffect(() => {
// //     const styleSheet = document.createElement("style");
// //     styleSheet.textContent = `
// //       :root {
// //         /* White and Orange Theme - Matching Sidebar */
// //         --bg-primary: #ffffff;
// //         --bg-secondary: #fafafa;
// //         --surface: #ffffff;
// //         --surface-hover: #fff5f0;
// //         --text-primary: #000000;
// //         --text-secondary: #333333;
// //         --text-muted: #666666;
// //         --text-inverse: #ffffff;
// //         --border: #e0e0e0;
// //         --border-light: #f0f0f0;
// //         --border-focus: #ff6e4a;
// //         --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
// //         --shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
// //         --shadow-lg: 0 8px 16px rgba(255, 110, 74, 0.1);
// //         --shadow-hover: 0 12px 24px rgba(255, 110, 74, 0.15);
// //         --primary: #ff6e4a;
// //         --primary-light: #ff8b6e;
// //         --primary-dark: #e65a3a;
// //         --primary-soft: rgba(255, 110, 74, 0.1);
// //         --primary-gradient: linear-gradient(135deg, #ff6e4a, #ff8b6e);
// //         --success: #4caf50;
// //         --success-soft: rgba(76, 175, 80, 0.1);
// //         --danger: #f44336;
// //         --danger-soft: rgba(244, 67, 54, 0.1);
// //         --warning: #ff9800;
// //         --warning-soft: rgba(255, 152, 0, 0.1);
// //         --hover-bg: #fff5f0;
// //         --active-bg: #ffe0d4;
// //       }

// //       @media (prefers-color-scheme: dark) {
// //         :root {
// //           /* Keeping light theme always - no dark mode to match sidebar */
// //           --bg-primary: #ffffff;
// //           --bg-secondary: #fafafa;
// //           --surface: #ffffff;
// //           --surface-hover: #fff5f0;
// //           --text-primary: #000000;
// //           --text-secondary: #333333;
// //           --text-muted: #666666;
// //           --text-inverse: #ffffff;
// //           --border: #e0e0e0;
// //           --border-light: #f0f0f0;
// //           --border-focus: #ff6e4a;
// //           --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
// //           --shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
// //           --shadow-lg: 0 8px 16px rgba(255, 110, 74, 0.1);
// //           --shadow-hover: 0 12px 24px rgba(255, 110, 74, 0.15);
// //           --primary: #ff6e4a;
// //           --primary-light: #ff8b6e;
// //           --primary-dark: #e65a3a;
// //           --primary-soft: rgba(255, 110, 74, 0.1);
// //           --primary-gradient: linear-gradient(135deg, #ff6e4a, #ff8b6e);
// //           --success: #4caf50;
// //           --success-soft: rgba(76, 175, 80, 0.1);
// //           --danger: #f44336;
// //           --danger-soft: rgba(244, 67, 54, 0.1);
// //           --warning: #ff9800;
// //           --warning-soft: rgba(255, 152, 0, 0.1);
// //           --hover-bg: #fff5f0;
// //           --active-bg: #ffe0d4;
// //         }
// //       }

// //       * {
// //         transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
// //       }

// //       body {
// //         background-color: var(--bg-primary);
// //         color: var(--text-primary);
// //       }

// //       .profile-card {
// //         transition: all 0.3s ease;
// //       }

// //       .profile-card:hover {
// //         transform: translateY(-2px);
// //         box-shadow: var(--shadow-hover);
// //       }

// //       .detail-item {
// //         transition: all 0.2s ease;
// //         cursor: pointer;
// //       }

// //       .detail-item:hover {
// //         transform: translateY(-2px);
// //         box-shadow: var(--shadow);
// //         border-color: var(--primary);
// //       }

// //       .detail-item:hover .icon-wrapper {
// //         background: var(--primary-gradient);
// //         color: white;
// //         transform: scale(1.05);
// //       }

// //       .update-button {
// //         transition: all 0.3s ease;
// //         position: relative;
// //         overflow: hidden;
// //       }

// //       .update-button:hover {
// //         transform: translateY(-2px);
// //         box-shadow: 0 8px 20px rgba(255, 110, 74, 0.3);
// //       }

// //       .update-button:hover .button-glow {
// //         left: 100%;
// //       }

// //       .button-glow {
// //         position: absolute;
// //         top: 0;
// //         left: -100%;
// //         width: 100%;
// //         height: 100%;
// //         background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
// //         transition: left 0.5s ease;
// //         z-index: 1;
// //       }

// //       .modal-content {
// //         animation: modalSlideUp 0.3s ease;
// //       }

// //       @keyframes modalSlideUp {
// //         from { transform: translateY(30px); opacity: 0; }
// //         to { transform: translateY(0); opacity: 1; }
// //       }

// //       .form-input:focus {
// //         outline: none;
// //         border-color: var(--primary);
// //         box-shadow: 0 0 0 3px rgba(255, 110, 74, 0.1);
// //       }

// //       .close-button:hover {
// //         background-color: var(--danger-soft);
// //         color: var(--danger);
// //         transform: rotate(90deg);
// //       }

// //       .input-error {
// //         border-color: var(--danger) !important;
// //         background-color: var(--danger-soft) !important;
// //       }

// //       .error-text {
// //         color: var(--danger);
// //         font-size: 12px;
// //         margin-top: 4px;
// //         display: flex;
// //         align-items: center;
// //         gap: 4px;
// //       }
// //     `;
// //     document.head.appendChild(styleSheet);
// //   }, []);

// //   useEffect(() => {
// //     const fetchProfile = async () => {
// //       try {
// //         const userId = localStorage.getItem("userId");
// //         console.log("Fetching profile for userId:", userId);
        
// //         if (!userId) {
// //           setError("No user ID found. Please log in again.");
// //           setLoading(false);
// //           return;
// //         }

// //         const response = await API.get(`users/details/${userId}`);
        
// //         console.log("Profile API Response:", response.data);

// //         if (response.data?.data) {
// //           setProfile(response.data.data);
// //           setFormData(response.data.data);
// //         } else if (response.data) {
// //           setProfile(response.data);
// //           setFormData(response.data);
// //         } else {
// //           setError("No profile data found");
// //         }

// //       } catch (error) {
// //         console.error("Failed to fetch profile", error);
// //         setError(error.response?.data?.message || "Failed to load profile. Please try again.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchProfile();
// //   }, []);

// //   // Validation functions
// //   const validateMobileNumber = (value) => {
// //     if (!value || value.trim() === "") {
// //       return "Mobile number is required";
// //     }
// //     const mobileRegex = /^[0-9]{10}$/;
// //     if (!mobileRegex.test(value)) {
// //       return "Mobile number must be 10 digits";
// //     }
// //     return "";
// //   };

// //   const validateAddress = (value) => {
// //     if (!value || value.trim() === "") {
// //       return "Address is required";
// //     }
// //     if (value.trim().length < 5) {
// //       return "Address must be at least 5 characters";
// //     }
// //     if (value.trim().length > 200) {
// //       return "Address must not exceed 200 characters";
// //     }
// //     return "";
// //   };

// //   const validateCity = (value) => {
// //     if (!value || value.trim() === "") {
// //       return "City is required";
// //     }
// //     const cityRegex = /^[a-zA-Z\s]{2,50}$/;
// //     if (!cityRegex.test(value)) {
// //       return "City must contain only letters and spaces (2-50 characters)";
// //     }
// //     return "";
// //   };

// //   const validateState = (value) => {
// //     if (!value || value.trim() === "") {
// //       return "State is required";
// //     }
// //     const stateRegex = /^[a-zA-Z\s]{2,50}$/;
// //     if (!stateRegex.test(value)) {
// //       return "State must contain only letters and spaces (2-50 characters)";
// //     }
// //     return "";
// //   };

// //   const validateCountry = (value) => {
// //     if (!value || value.trim() === "") {
// //       return "Country is required";
// //     }
// //     const countryRegex = /^[a-zA-Z\s]{2,50}$/;
// //     if (!countryRegex.test(value)) {
// //       return "Country must contain only letters and spaces (2-50 characters)";
// //     }
// //     return "";
// //   };

// //   const validatePincode = (value) => {
// //     if (!value || value.trim() === "") {
// //       return "Pincode is required";
// //     }
// //     const pincodeRegex = /^[0-9]{6}$/;
// //     if (!pincodeRegex.test(value)) {
// //       return "Pincode must be 6 digits";
// //     }
// //     return "";
// //   };

// //   // Validate all fields
// //   const validateField = (name, value) => {
// //     switch (name) {
// //       case "mobileNumber":
// //       case "mobile":
// //         return validateMobileNumber(value);
// //       case "address":
// //         return validateAddress(value);
// //       case "city":
// //         return validateCity(value);
// //       case "state":
// //         return validateState(value);
// //       case "country":
// //         return validateCountry(value);
// //       case "pincode":
// //       case "zipCode":
// //         return validatePincode(value);
// //       default:
// //         return "";
// //     }
// //   };

// //   // Validate entire form
// //   const validateForm = (data) => {
// //     const errors = {};
    
// //     // Mobile validation
// //     const mobileError = validateMobileNumber(data.mobileNumber || data.mobile || "");
// //     if (mobileError) errors.mobile = mobileError;
    
// //     // Address validation
// //     const addressError = validateAddress(data.address || "");
// //     if (addressError) errors.address = addressError;
    
// //     // City validation
// //     const cityError = validateCity(data.city || "");
// //     if (cityError) errors.city = cityError;
    
// //     // State validation
// //     const stateError = validateState(data.state || "");
// //     if (stateError) errors.state = stateError;
    
// //     // Country validation
// //     const countryError = validateCountry(data.country || "");
// //     if (countryError) errors.country = countryError;
    
// //     // Pincode validation
// //     const pincodeError = validatePincode(data.pincode || data.zipCode || "");
// //     if (pincodeError) errors.pincode = pincodeError;
    
// //     return errors;
// //   };

// //   // Check if form is valid
// //   const isFormValid = () => {
// //     const errors = validateForm(formData);
// //     return Object.keys(errors).length === 0;
// //   };

// //   const handleUpdateClick = () => {
// //     setShowUpdateForm(true);
// //     setFormErrors({});
// //     setTouchedFields({});
// //   };

// //   const handleCloseForm = () => {
// //     setShowUpdateForm(false);
// //     setFormErrors({});
// //     setTouchedFields({});
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));

// //     // Mark field as touched
// //     setTouchedFields(prev => ({
// //       ...prev,
// //       [name]: true
// //     }));

// //     // Validate field
// //     const error = validateField(name, value);
// //     setFormErrors(prev => ({
// //       ...prev,
// //       [name]: error
// //     }));
// //   };

// //   const handleBlur = (e) => {
// //     const { name, value } = e.target;
    
// //     // Mark field as touched on blur
// //     setTouchedFields(prev => ({
// //       ...prev,
// //       [name]: true
// //     }));

// //     // Validate field on blur
// //     const error = validateField(name, value);
// //     setFormErrors(prev => ({
// //       ...prev,
// //       [name]: error
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     // Validate all fields before submit
// //     const errors = validateForm(formData);
// //     setFormErrors(errors);
    
// //     // Mark all fields as touched
// //     const allTouched = {};
// //     Object.keys(formData).forEach(key => {
// //       allTouched[key] = true;
// //     });
// //     setTouchedFields(allTouched);

// //     // If there are errors, don't submit
// //     if (Object.keys(errors).length > 0) {
// //       showSnackbar("error", "Please fix all validation errors before submitting");
// //       return;
// //     }

// //     setUpdating(true);
// //     try {
// //       const userId = localStorage.getItem("userId");
      
// //       const response = await API.put(`users/updateContact/${userId}`, formData);
      
// //       console.log("Update Response:", response.data);
      
// //       if (response.data?.status || response.data) {
// //         setProfile(formData);
        
// //         // Show success snackbar at bottom right corner
// //         showSnackbar("success", "Profile updated successfully!");
        
// //         setShowUpdateForm(false);
// //         setFormErrors({});
// //         setTouchedFields({});
// //       }
// //     } catch (error) {
// //       console.error("Failed to update profile", error);
// //       showSnackbar("error", error.response?.data?.message || "Failed to update profile. Please try again.");
// //     } finally {
// //       setUpdating(false);
// //     }
// //   };

// //   const formatDate = (dateString) => {
// //     if (!dateString) return "N/A";
// //     try {
// //       const date = new Date(dateString);
// //       const day = String(date.getDate()).padStart(2, '0');
// //       const month = String(date.getMonth() + 1).padStart(2, '0');
// //       const year = date.getFullYear();
// //       return `${day}-${month}-${year}`;
// //     } catch (e) {
// //       return dateString;
// //     }
// //   };

// //   const formatDateForInput = (dateString) => {
// //     if (!dateString) return "";
// //     try {
// //       const date = new Date(dateString);
// //       return date.toISOString().split('T')[0];
// //     } catch (e) {
// //       return "";
// //     }
// //   };

// //   // Loading animation with white/orange theme
// //   if (loading) {
// //     return (
// //       <div style={styles.loadingContainer}>
// //         <div style={styles.bankLoader}>
// //           <div style={styles.bankIcon}>
// //             <div style={styles.bankRoof}></div>
// //             <div style={styles.bankBody}>
// //               <div style={styles.bankColumn}></div>
// //               <div style={styles.bankColumn}></div>
// //               <div style={styles.bankColumn}></div>
// //             </div>
// //             <div style={styles.bankBase}></div>
// //           </div>
          
// //           <div style={styles.loaderBars}>
// //             <div style={styles.loaderBar}></div>
// //             <div style={styles.loaderBar}></div>
// //             <div style={styles.loaderBar}></div>
// //             <div style={styles.loaderBar}></div>
// //             <div style={styles.loaderBar}></div>
// //           </div>
          
// //           <div style={styles.loadingTextWrapper}>
// //             <span style={styles.loadingBankName}>ABC Bank</span>
// //             <span style={styles.loadingMessage}>Loading your profile</span>
// //             <span style={styles.loadingDots}>
// //               <span style={styles.dot}>.</span>
// //               <span style={styles.dot}>.</span>
// //               <span style={styles.dot}>.</span>
// //             </span>
// //           </div>
          
// //           <div style={styles.progressContainer}>
// //             <div style={styles.progressBar}></div>
// //           </div>
          
// //           <div style={styles.securityBadge}>
// //             <span style={styles.lockIcon}>🔒</span>
// //             <span style={styles.securityText}>Secure Connection</span>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Error state
// //   if (error) {
// //     return (
// //       <div style={styles.errorContainer}>
// //         <FaUserCircle size={48} color="var(--primary)" />
// //         <p style={styles.errorText}>{error}</p>
// //         <button style={styles.retryButton} onClick={() => window.location.reload()}>
// //           Retry
// //         </button>
// //       </div>
// //     );
// //   }

// //   // No profile data
// //   if (!profile) {
// //     return (
// //       <div style={styles.errorContainer}>
// //         <FaUserCircle size={48} color="var(--primary)" />
// //         <p style={styles.errorText}>No profile data found</p>
// //         <button style={styles.retryButton} onClick={() => window.location.reload()}>
// //           Retry
// //         </button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <>
// //       <div style={styles.profileCard} className="profile-card">
// //         <div style={styles.bankHeader}>
// //           <span style={styles.bankName}>ABC Bank</span>
// //         </div>
        
// //         <div style={styles.gradientLine}></div>
        
// //         <div style={styles.header}>
// //           <div style={styles.avatarContainer}>
// //             <FaUserCircle size={90} color="var(--primary)" />
// //             <div style={styles.onlineIndicator}></div>
// //           </div>
// //           <div style={styles.headerInfo}>
// //             <h2 style={styles.name}>
// //               {profile.firstName || "User"} {profile.lastName || ""}
// //             </h2>
// //             <div style={styles.locationBadge}>
// //               <FaMapMarkerAlt size={14} color="var(--primary)" />
// //               <span style={styles.location}>
// //                 {profile.city || "Chennai"}, {profile.state || "Tamil Nadu"}
// //               </span>
// //             </div>
// //           </div>
// //         </div>

// //         <div style={styles.detailsGrid}>
// //           {/* Mobile Icon - Using Phone icon */}
// //           <div style={styles.detailItem} className="detail-item">
// //             <div style={styles.iconWrapper} className="icon-wrapper">
// //               <FaPhone style={styles.icon} />
// //             </div>
// //             <div style={styles.detailContent}>
// //               <span style={styles.detailLabel}>MOBILE</span>
// //               <span style={styles.detailValue}>{profile.mobileNumber || profile.mobile || "N/A"}</span>
// //             </div>
// //           </div>

// //           <div style={styles.detailItem} className="detail-item">
// //             <div style={styles.iconWrapper} className="icon-wrapper">
// //               <FaEnvelope style={styles.icon} />
// //             </div>
// //             <div style={styles.detailContent}>
// //               <span style={styles.detailLabel}>EMAIL</span>
// //               <span style={styles.detailValue}>{profile.email || "N/A"}</span>
// //             </div>
// //           </div>

// //           <div style={styles.detailItem} className="detail-item">
// //             <div style={styles.iconWrapper} className="icon-wrapper">
// //               <FaBirthdayCake style={styles.icon} />
// //             </div>
// //             <div style={styles.detailContent}>
// //               <span style={styles.detailLabel}>DATE OF BIRTH</span>
// //               <span style={styles.detailValue}>{formatDate(profile.dateOfBirth || profile.dob)}</span>
// //             </div>
// //           </div>

// //           <div style={styles.detailItem} className="detail-item">
// //             <div style={styles.iconWrapper} className="icon-wrapper">
// //               <FaHome style={styles.icon} />
// //             </div>
// //             <div style={styles.detailContent}>
// //               <span style={styles.detailLabel}>ADDRESS</span>
// //               <span style={styles.detailValue}>{profile.address || "N/A"}</span>
// //             </div>
// //           </div>

// //           <div style={styles.detailItem} className="detail-item">
// //             <div style={styles.iconWrapper} className="icon-wrapper">
// //               <FaCity style={styles.icon} />
// //             </div>
// //             <div style={styles.detailContent}>
// //               <span style={styles.detailLabel}>CITY</span>
// //               <span style={styles.detailValue}>{profile.city || "N/A"}</span>
// //             </div>
// //           </div>

// //           <div style={styles.detailItem} className="detail-item">
// //             <div style={styles.iconWrapper} className="icon-wrapper">
// //               <FaFlag style={styles.icon} />
// //             </div>
// //             <div style={styles.detailContent}>
// //               <span style={styles.detailLabel}>STATE</span>
// //               <span style={styles.detailValue}>{profile.state || "N/A"}</span>
// //             </div>
// //           </div>

// //           <div style={styles.detailItem} className="detail-item">
// //             <div style={styles.iconWrapper} className="icon-wrapper">
// //               <FaGlobe style={styles.icon} />
// //             </div>
// //             <div style={styles.detailContent}>
// //               <span style={styles.detailLabel}>COUNTRY</span>
// //               <span style={styles.detailValue}>{profile.country || "India"}</span>
// //             </div>
// //           </div>

// //           <div style={styles.detailItem} className="detail-item">
// //             <div style={styles.iconWrapper} className="icon-wrapper">
// //               <FaMapPin style={styles.icon} />
// //             </div>
// //             <div style={styles.detailContent}>
// //               <span style={styles.detailLabel}>PINCODE</span>
// //               <span style={styles.detailValue}>{profile.pincode || profile.zipCode || "N/A"}</span>
// //             </div>
// //           </div>
// //         </div>

// //         <div style={styles.buttonContainer}>
// //           <button style={styles.updateButton} onClick={handleUpdateClick} className="update-button">
// //             <FaPenFancy style={styles.updateIcon} />
// //             <span style={styles.updateButtonText}>Edit Profile</span>
// //             <span style={styles.buttonGlow} className="button-glow"></span>
// //           </button>
// //         </div>
// //       </div>

// //       {/* Update Profile Modal - White and Orange Theme */}
// //       {showUpdateForm && (
// //         <div style={styles.modalOverlay} onClick={handleCloseForm}>
// //           <div style={styles.modalContent} className="modal-content" onClick={(e) => e.stopPropagation()}>
// //             <div style={styles.modalHeader}>
// //               <h3 style={styles.modalTitle}>
// //                 <FaEdit style={styles.modalTitleIcon} />
// //                 Edit Profile Information
// //               </h3>
// //               <button style={styles.closeButton} onClick={handleCloseForm} className="close-button">
// //                 <FaTimes />
// //               </button>
// //             </div>

// //             <form onSubmit={handleSubmit} style={styles.form}>
// //               <div style={styles.formGrid}>
// //                 {/* Mobile Number - Using Phone icon */}
// //                 <div style={styles.formGroupFull}>
// //                   <label style={styles.label}>
// //                     <FaPhone style={styles.labelIcon} /> Mobile Number
// //                   </label>
// //                   <input
// //                     type="tel"
// //                     name="mobileNumber"
// //                     value={formData.mobileNumber || formData.mobile || ''}
// //                     onChange={handleInputChange}
// //                     onBlur={handleBlur}
// //                     style={{
// //                       ...styles.input,
// //                       borderColor: touchedFields.mobileNumber && formErrors.mobile ? 'var(--danger)' : (touchedFields.mobileNumber && !formErrors.mobile ? 'var(--success)' : 'var(--border)'),
// //                       backgroundColor: touchedFields.mobileNumber && formErrors.mobile ? 'var(--danger-soft)' : 'var(--bg-primary)'
// //                     }}
// //                     className="form-input"
// //                     placeholder="Enter 10-digit mobile number"
// //                     required
// //                   />
// //                   {touchedFields.mobileNumber && formErrors.mobile && (
// //                     <div style={styles.errorText}>
// //                       <span>⚠️</span> {formErrors.mobile}
// //                     </div>
// //                   )}
// //                   {touchedFields.mobileNumber && !formErrors.mobile && formData.mobileNumber && (
// //                     <div style={{...styles.errorText, color: 'var(--success)'}}>
// //                       <FaCheckCircle /> Valid mobile number
// //                     </div>
// //                   )}
// //                 </div>

// //                 {/* Address - Editable */}
// //                 <div style={styles.formGroupFull}>
// //                   <label style={styles.label}>
// //                     <FaRoad style={styles.labelIcon} /> Address
// //                   </label>
// //                   <textarea
// //                     name="address"
// //                     value={formData.address || ''}
// //                     onChange={handleInputChange}
// //                     onBlur={handleBlur}
// //                     style={{
// //                       ...styles.textarea,
// //                       borderColor: touchedFields.address && formErrors.address ? 'var(--danger)' : (touchedFields.address && !formErrors.address ? 'var(--success)' : 'var(--border)'),
// //                       backgroundColor: touchedFields.address && formErrors.address ? 'var(--danger-soft)' : 'var(--bg-primary)'
// //                     }}
// //                     className="form-input"
// //                     rows="2"
// //                     placeholder="Enter your full address"
// //                     required
// //                   />
// //                   {touchedFields.address && formErrors.address && (
// //                     <div style={styles.errorText}>
// //                       <span>⚠️</span> {formErrors.address}
// //                     </div>
// //                   )}
// //                   {touchedFields.address && !formErrors.address && formData.address && (
// //                     <div style={{...styles.errorText, color: 'var(--success)'}}>
// //                       <FaCheckCircle /> Valid address
// //                     </div>
// //                   )}
// //                 </div>

// //                 {/* City - Editable */}
// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>
// //                     <FaCity style={styles.labelIcon} /> City
// //                   </label>
// //                   <input
// //                     type="text"
// //                     name="city"
// //                     value={formData.city || ''}
// //                     onChange={handleInputChange}
// //                     onBlur={handleBlur}
// //                     style={{
// //                       ...styles.input,
// //                       borderColor: touchedFields.city && formErrors.city ? 'var(--danger)' : (touchedFields.city && !formErrors.city ? 'var(--success)' : 'var(--border)'),
// //                       backgroundColor: touchedFields.city && formErrors.city ? 'var(--danger-soft)' : 'var(--bg-primary)'
// //                     }}
// //                     className="form-input"
// //                     placeholder="Enter city name"
// //                     required
// //                   />
// //                   {touchedFields.city && formErrors.city && (
// //                     <div style={styles.errorText}>
// //                       <span>⚠️</span> {formErrors.city}
// //                     </div>
// //                   )}
// //                   {touchedFields.city && !formErrors.city && formData.city && (
// //                     <div style={{...styles.errorText, color: 'var(--success)'}}>
// //                       <FaCheckCircle /> Valid city
// //                     </div>
// //                   )}
// //                 </div>

// //                 {/* State - Editable */}
// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>
// //                     <FaFlag style={styles.labelIcon} /> State
// //                   </label>
// //                   <input
// //                     type="text"
// //                     name="state"
// //                     value={formData.state || ''}
// //                     onChange={handleInputChange}
// //                     onBlur={handleBlur}
// //                     style={{
// //                       ...styles.input,
// //                       borderColor: touchedFields.state && formErrors.state ? 'var(--danger)' : (touchedFields.state && !formErrors.state ? 'var(--success)' : 'var(--border)'),
// //                       backgroundColor: touchedFields.state && formErrors.state ? 'var(--danger-soft)' : 'var(--bg-primary)'
// //                     }}
// //                     className="form-input"
// //                     placeholder="Enter state name"
// //                     required
// //                   />
// //                   {touchedFields.state && formErrors.state && (
// //                     <div style={styles.errorText}>
// //                       <span>⚠️</span> {formErrors.state}
// //                     </div>
// //                   )}
// //                   {touchedFields.state && !formErrors.state && formData.state && (
// //                     <div style={{...styles.errorText, color: 'var(--success)'}}>
// //                       <FaCheckCircle /> Valid state
// //                     </div>
// //                   )}
// //                 </div>

// //                 {/* Country - Editable */}
// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>
// //                     <FaGlobe style={styles.labelIcon} /> Country
// //                   </label>
// //                   <input
// //                     type="text"
// //                     name="country"
// //                     value={formData.country || 'India'}
// //                     onChange={handleInputChange}
// //                     onBlur={handleBlur}
// //                     style={{
// //                       ...styles.input,
// //                       borderColor: touchedFields.country && formErrors.country ? 'var(--danger)' : (touchedFields.country && !formErrors.country ? 'var(--success)' : 'var(--border)'),
// //                       backgroundColor: touchedFields.country && formErrors.country ? 'var(--danger-soft)' : 'var(--bg-primary)'
// //                     }}
// //                     className="form-input"
// //                     placeholder="Enter country name"
// //                     required
// //                   />
// //                   {touchedFields.country && formErrors.country && (
// //                     <div style={styles.errorText}>
// //                       <span>⚠️</span> {formErrors.country}
// //                     </div>
// //                   )}
// //                   {touchedFields.country && !formErrors.country && formData.country && (
// //                     <div style={{...styles.errorText, color: 'var(--success)'}}>
// //                       <FaCheckCircle /> Valid country
// //                     </div>
// //                   )}
// //                 </div>

// //                 {/* Pincode - Editable */}
// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>
// //                     <FaMapPin style={styles.labelIcon} /> Pincode
// //                   </label>
// //                   <input
// //                     type="text"
// //                     name="pincode"
// //                     value={formData.pincode || formData.zipCode || ''}
// //                     onChange={handleInputChange}
// //                     onBlur={handleBlur}
// //                     style={{
// //                       ...styles.input,
// //                       borderColor: touchedFields.pincode && formErrors.pincode ? 'var(--danger)' : (touchedFields.pincode && !formErrors.pincode ? 'var(--success)' : 'var(--border)'),
// //                       backgroundColor: touchedFields.pincode && formErrors.pincode ? 'var(--danger-soft)' : 'var(--bg-primary)'
// //                     }}
// //                     className="form-input"
// //                     placeholder="Enter 6-digit pincode"
// //                     required
// //                   />
// //                   {touchedFields.pincode && formErrors.pincode && (
// //                     <div style={styles.errorText}>
// //                       <span>⚠️</span> {formErrors.pincode}
// //                     </div>
// //                   )}
// //                   {touchedFields.pincode && !formErrors.pincode && (formData.pincode || formData.zipCode) && (
// //                     <div style={{...styles.errorText, color: 'var(--success)'}}>
// //                       <FaCheckCircle /> Valid pincode
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>

// //               <div style={styles.formActions}>
// //                 <button type="button" style={styles.cancelButton} onClick={handleCloseForm}>
// //                   <FaTimes /> Cancel
// //                 </button>
// //                 <button 
// //                   type="submit" 
// //                   style={{
// //                     ...styles.submitButton,
// //                     opacity: isFormValid() ? 1 : 0.5,
// //                     cursor: isFormValid() ? 'pointer' : 'not-allowed'
// //                   }} 
// //                   disabled={updating || !isFormValid()}
// //                 >
// //                   <FaSave /> {updating ? 'Updating...' : 'Save Changes'}
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // const styles = {
// //   profileCard: {
// //     backgroundColor: "var(--surface)",
// //     borderRadius: "24px",
// //     boxShadow: "var(--shadow-lg)",
// //     padding: "32px",
// //     maxWidth: "1000px",
// //     margin: "20px auto",
// //     position: "relative",
// //     overflow: "hidden",
// //     border: "1px solid var(--border)",
// //   },

// //   bankHeader: {
// //     display: "flex",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     marginBottom: "16px",
// //     paddingBottom: "12px",
// //     borderBottom: "1px solid var(--border)",
// //   },

// //   bankName: {
// //     fontSize: "22px",
// //     fontWeight: "700",
// //     color: "var(--primary)",
// //     letterSpacing: "0.5px",
// //   },

// //   gradientLine: {
// //     position: "absolute",
// //     top: 0,
// //     left: 0,
// //     right: 0,
// //     height: "4px",
// //     background: "var(--primary-gradient)",
// //   },

// //   header: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: "24px",
// //     marginBottom: "32px",
// //     marginTop: "8px",
// //   },

// //   avatarContainer: {
// //     position: "relative",
// //     filter: "drop-shadow(0 8px 16px var(--primary-soft))",
// //   },

// //   onlineIndicator: {
// //     position: "absolute",
// //     bottom: "8px",
// //     right: "8px",
// //     width: "16px",
// //     height: "16px",
// //     backgroundColor: "var(--success)",
// //     border: "3px solid var(--surface)",
// //     borderRadius: "50%",
// //     boxShadow: "0 2px 8px var(--success-soft)",
// //   },

// //   headerInfo: {
// //     flex: 1,
// //   },

// //   name: {
// //     fontSize: "32px",
// //     fontWeight: "700",
// //     color: "#000000",
// //     margin: "0 0 8px 0",
// //     letterSpacing: "-0.5px",
// //   },

// //   locationBadge: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: "8px",
// //     backgroundColor: "var(--primary-soft)",
// //     padding: "8px 18px",
// //     borderRadius: "40px",
// //     width: "fit-content",
// //     border: "1px solid var(--border)",
// //   },

// //   location: {
// //     fontSize: "15px",
// //     color: "var(--primary)",
// //     fontWeight: "600",
// //   },

// //   detailsGrid: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
// //     gap: "16px",
// //     marginBottom: "32px",
// //   },

// //   detailItem: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: "16px",
// //     padding: "16px",
// //     backgroundColor: "var(--bg-primary)",
// //     borderRadius: "16px",
// //     transition: "all 0.2s ease",
// //     border: "1px solid var(--border)",
// //     cursor: "pointer",
// //   },

// //   iconWrapper: {
// //     width: "48px",
// //     height: "48px",
// //     backgroundColor: "var(--primary-soft)",
// //     borderRadius: "12px",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     color: "var(--primary)",
// //     transition: "all 0.2s ease",
// //   },

// //   icon: {
// //     fontSize: "20px",
// //   },

// //   detailContent: {
// //     flex: 1,
// //     display: "flex",
// //     flexDirection: "column",
// //     gap: "4px",
// //   },

// //   detailLabel: {
// //     fontSize: "11px",
// //     color: "#333333",
// //     fontWeight: "600",
// //     letterSpacing: "0.5px",
// //   },

// //   detailValue: {
// //     fontSize: "15px",
// //     color: "#000000",
// //     fontWeight: "500",
// //     lineHeight: "1.4",
// //   },

// //   buttonContainer: {
// //     display: "flex",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     marginTop: "16px",
// //     paddingTop: "20px",
// //     borderTop: "1px solid var(--border)",
// //   },

// //   updateButton: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: "12px",
// //     background: "var(--primary-gradient)",
// //     color: "white",
// //     border: "none",
// //     borderRadius: "40px",
// //     padding: "12px 28px",
// //     fontSize: "15px",
// //     fontWeight: "600",
// //     cursor: "pointer",
// //     transition: "all 0.3s ease",
// //     boxShadow: "0 4px 12px rgba(255, 110, 74, 0.3)",
// //     position: "relative",
// //     overflow: "hidden",
// //   },

// //   updateButtonText: {
// //     position: "relative",
// //     zIndex: 2,
// //   },

// //   buttonGlow: {
// //     position: "absolute",
// //     top: 0,
// //     left: "-100%",
// //     width: "100%",
// //     height: "100%",
// //     background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
// //     transition: "left 0.5s ease",
// //     zIndex: 1,
// //   },

// //   updateIcon: {
// //     fontSize: "16px",
// //     position: "relative",
// //     zIndex: 2,
// //   },

// //   branchInfo: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: "12px",
// //   },

// //   branchText: {
// //     fontSize: "14px",
// //     color: "#666666",
// //     fontWeight: "500",
// //   },

// //   weatherInfo: {
// //     fontSize: "14px",
// //     color: "var(--primary)",
// //     fontWeight: "600",
// //     backgroundColor: "var(--primary-soft)",
// //     padding: "6px 12px",
// //     borderRadius: "30px",
// //     border: "1px solid var(--border)",
// //   },

// //   // Loading styles - White/Orange themed
// //   loadingContainer: {
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     minHeight: "600px",
// //     backgroundColor: "var(--bg-primary)",
// //   },

// //   bankLoader: {
// //     backgroundColor: "var(--surface)",
// //     borderRadius: "32px",
// //     padding: "48px",
// //     boxShadow: "var(--shadow-lg)",
// //     textAlign: "center",
// //     maxWidth: "450px",
// //     width: "90%",
// //     border: "1px solid var(--border)",
// //     position: "relative",
// //     overflow: "hidden",
// //   },

// //   bankIcon: {
// //     width: "100px",
// //     height: "100px",
// //     margin: "0 auto 30px",
// //     position: "relative",
// //     animation: "bankFloat 2s ease-in-out infinite",
// //   },

// //   bankRoof: {
// //     width: "0",
// //     height: "0",
// //     borderLeft: "50px solid transparent",
// //     borderRight: "50px solid transparent",
// //     borderBottom: "30px solid var(--primary)",
// //     margin: "0 auto",
// //     position: "relative",
// //     top: "10px",
// //     zIndex: 2,
// //   },

// //   bankBody: {
// //     width: "80px",
// //     height: "50px",
// //     backgroundColor: "var(--primary-light)",
// //     margin: "0 auto",
// //     borderRadius: "8px 8px 0 0",
// //     display: "flex",
// //     justifyContent: "space-around",
// //     alignItems: "center",
// //     padding: "0 10px",
// //     position: "relative",
// //     zIndex: 1,
// //   },

// //   bankColumn: {
// //     width: "12px",
// //     height: "35px",
// //     backgroundColor: "var(--primary-soft)",
// //     borderRadius: "4px 4px 0 0",
// //     animation: "columnPulse 1.5s ease-in-out infinite",
// //   },

// //   bankBase: {
// //     width: "100px",
// //     height: "8px",
// //     backgroundColor: "var(--primary)",
// //     margin: "0 auto",
// //     borderRadius: "4px",
// //     position: "relative",
// //     top: "-2px",
// //   },

// //   loaderBars: {
// //     display: "flex",
// //     justifyContent: "center",
// //     gap: "8px",
// //     marginBottom: "25px",
// //   },

// //   loaderBar: {
// //     width: "8px",
// //     height: "40px",
// //     backgroundColor: "var(--primary)",
// //     borderRadius: "4px",
// //     animation: "loaderBarWave 1s ease-in-out infinite",
// //   },

// //   loadingTextWrapper: {
// //     marginBottom: "25px",
// //     position: "relative",
// //   },

// //   loadingBankName: {
// //     display: "block",
// //     fontSize: "22px",
// //     fontWeight: "700",
// //     color: "var(--primary)",
// //     marginBottom: "8px",
// //     letterSpacing: "1px",
// //     background: "var(--primary-gradient)",
// //     WebkitBackgroundClip: "text",
// //     WebkitTextFillColor: "transparent",
// //     backgroundClip: "text",
// //   },

// //   loadingMessage: {
// //     fontSize: "18px",
// //     color: "#333333",
// //     fontWeight: "500",
// //     marginRight: "4px",
// //   },

// //   loadingDots: {
// //     display: "inline-block",
// //   },

// //   dot: {
// //     display: "inline-block",
// //     fontSize: "24px",
// //     color: "var(--primary)",
// //     animation: "dotPulse 1.5s ease-in-out infinite",
// //     opacity: 0,
// //   },

// //   progressContainer: {
// //     width: "100%",
// //     height: "6px",
// //     backgroundColor: "var(--border)",
// //     borderRadius: "3px",
// //     overflow: "hidden",
// //     marginBottom: "20px",
// //   },

// //   progressBar: {
// //     width: "70%",
// //     height: "100%",
// //     background: "var(--primary-gradient)",
// //     borderRadius: "3px",
// //     animation: "progressLoad 1.5s ease-in-out infinite",
// //   },

// //   securityBadge: {
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     gap: "8px",
// //     padding: "8px 16px",
// //     backgroundColor: "var(--primary-soft)",
// //     borderRadius: "40px",
// //     width: "fit-content",
// //     margin: "0 auto",
// //     border: "1px solid var(--border)",
// //   },

// //   lockIcon: {
// //     fontSize: "14px",
// //   },

// //   securityText: {
// //     fontSize: "13px",
// //     color: "var(--primary)",
// //     fontWeight: "600",
// //   },

// //   errorContainer: {
// //     display: "flex",
// //     flexDirection: "column",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     minHeight: "400px",
// //     backgroundColor: "var(--surface)",
// //     borderRadius: "24px",
// //     padding: "40px",
// //     maxWidth: "500px",
// //     margin: "20px auto",
// //     boxShadow: "var(--shadow-lg)",
// //     border: "1px solid var(--border)",
// //   },

// //   errorText: {
// //     fontSize: "16px",
// //     color: "#333333",
// //     margin: "16px 0",
// //   },

// //   retryButton: {
// //     backgroundColor: "var(--primary)",
// //     color: "white",
// //     border: "none",
// //     padding: "12px 32px",
// //     borderRadius: "30px",
// //     fontSize: "15px",
// //     fontWeight: "600",
// //     cursor: "pointer",
// //     transition: "all 0.3s ease",
// //     boxShadow: "0 4px 12px rgba(255, 110, 74, 0.3)",
// //     ':hover': {
// //       transform: "translateY(-2px)",
// //       boxShadow: "0 6px 16px rgba(255, 110, 74, 0.4)",
// //     }
// //   },

// //   // Modal Styles - White and Orange Theme
// //   modalOverlay: {
// //     position: "fixed",
// //     top: 0,
// //     left: 0,
// //     right: 0,
// //     bottom: 0,
// //     backgroundColor: "rgba(0, 0, 0, 0.6)",
// //     backdropFilter: "blur(8px)",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     zIndex: 1000,
// //     padding: "20px",
// //   },

// //   modalContent: {
// //     backgroundColor: "var(--surface)",
// //     borderRadius: "28px",
// //     maxWidth: "700px",
// //     width: "100%",
// //     boxShadow: "var(--shadow-hover)",
// //     animation: "modalSlideUp 0.3s ease",
// //     overflow: "hidden",
// //     maxHeight: "90vh",
// //     display: "flex",
// //     flexDirection: "column",
// //     border: "1px solid var(--border)",
// //   },

// //   modalHeader: {
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //     padding: "24px 28px",
// //     borderBottom: "1px solid var(--border)",
// //     background: "var(--bg-primary)",
// //     flexShrink: 0,
// //   },

// //   modalTitle: {
// //     fontSize: "22px",
// //     fontWeight: "700",
// //     color: "#000000",
// //     margin: 0,
// //     display: "flex",
// //     alignItems: "center",
// //     gap: "10px",
// //   },

// //   modalTitleIcon: {
// //     fontSize: "20px",
// //     color: "var(--primary)",
// //   },

// //   closeButton: {
// //     background: "none",
// //     border: "none",
// //     fontSize: "18px",
// //     color: "#666666",
// //     cursor: "pointer",
// //     padding: "8px",
// //     borderRadius: "50%",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     transition: "all 0.2s ease",
// //     backgroundColor: "var(--border)",
// //     width: "38px",
// //     height: "38px",
// //   },

// //   form: {
// //     padding: "28px",
// //     overflowY: "auto",
// //     flex: 1,
// //   },

// //   formGrid: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(2, 1fr)",
// //     gap: "20px",
// //     marginBottom: "24px",
// //   },

// //   formGroup: {
// //     display: "flex",
// //     flexDirection: "column",
// //     gap: "8px",
// //   },

// //   formGroupFull: {
// //     gridColumn: "span 2",
// //     display: "flex",
// //     flexDirection: "column",
// //     gap: "8px",
// //   },

// //   label: {
// //     fontSize: "14px",
// //     fontWeight: "600",
// //     color: "#333333",
// //     display: "flex",
// //     alignItems: "center",
// //     gap: "8px",
// //   },

// //   labelIcon: {
// //     fontSize: "16px",
// //     color: "var(--primary)",
// //   },

// //   input: {
// //     padding: "12px 16px",
// //     borderRadius: "12px",
// //     border: "1px solid var(--border)",
// //     fontSize: "15px",
// //     backgroundColor: "var(--bg-primary)",
// //     color: "#000000",
// //     transition: "all 0.2s ease",
// //     ':focus': {
// //       borderColor: "var(--primary)",
// //       boxShadow: "0 0 0 3px rgba(255, 110, 74, 0.1)",
// //       outline: "none",
// //     }
// //   },

// //   textarea: {
// //     padding: "12px 16px",
// //     borderRadius: "12px",
// //     border: "1px solid var(--border)",
// //     fontSize: "15px",
// //     backgroundColor: "var(--bg-primary)",
// //     color: "#000000",
// //     transition: "all 0.2s ease",
// //     resize: "vertical",
// //     minHeight: "80px",
// //     ':focus': {
// //       borderColor: "var(--primary)",
// //       boxShadow: "0 0 0 3px rgba(255, 110, 74, 0.1)",
// //       outline: "none",
// //     }
// //   },

// //   formActions: {
// //     display: "flex",
// //     justifyContent: "flex-end",
// //     gap: "16px",
// //     marginTop: "16px",
// //     paddingTop: "20px",
// //     borderTop: "1px solid var(--border)",
// //   },

// //   cancelButton: {
// //     backgroundColor: "var(--bg-primary)",
// //     color: "#333333",
// //     border: "1px solid var(--border)",
// //     padding: "12px 24px",
// //     borderRadius: "12px",
// //     fontSize: "15px",
// //     fontWeight: "600",
// //     cursor: "pointer",
// //     transition: "all 0.2s ease",
// //     display: "flex",
// //     alignItems: "center",
// //     gap: "8px",
// //     ':hover': {
// //       backgroundColor: "var(--border)",
// //       transform: "translateY(-1px)",
// //     }
// //   },

// //   submitButton: {
// //     background: "var(--primary-gradient)",
// //     color: "white",
// //     border: "none",
// //     padding: "12px 28px",
// //     borderRadius: "12px",
// //     fontSize: "15px",
// //     fontWeight: "600",
// //     cursor: "pointer",
// //     transition: "all 0.2s ease",
// //     display: "flex",
// //     alignItems: "center",
// //     gap: "8px",
// //     boxShadow: "0 4px 12px rgba(255, 110, 74, 0.3)",
// //     ':hover': {
// //       transform: "translateY(-2px)",
// //       boxShadow: "0 8px 20px rgba(255, 110, 74, 0.4)",
// //     },
// //     ':disabled': {
// //       opacity: 0.6,
// //       cursor: "not-allowed",
// //       transform: "none",
// //     }
// //   },

// //   // Error text style
// //   errorText: {
// //     fontSize: "12px",
// //     marginTop: "4px",
// //     display: "flex",
// //     alignItems: "center",
// //     gap: "4px",
// //   },
// // };

// // // Add keyframe animations
// // const styleSheet = document.createElement("style");
// // styleSheet.textContent = `
// //   @keyframes gradientMove {
// //     0% { background-position: 0% 50%; }
// //     50% { background-position: 100% 50%; }
// //     100% { background-position: 0% 50%; }
// //   }
  
// //   @keyframes bankFloat {
// //     0%, 100% { transform: translateY(0); }
// //     50% { transform: translateY(-10px); }
// //   }
  
// //   @keyframes columnPulse {
// //     0%, 100% { opacity: 1; }
// //     50% { opacity: 0.6; }
// //   }
  
// //   @keyframes loaderBarWave {
// //     0%, 100% { transform: scaleY(1); }
// //     50% { transform: scaleY(1.5); }
// //   }
  
// //   @keyframes dotPulse {
// //     0%, 100% { opacity: 0; }
// //     50% { opacity: 1; }
// //   }
  
// //   @keyframes progressLoad {
// //     0% { transform: translateX(-100%); }
// //     100% { transform: translateX(100%); }
// //   }
  
// //   @keyframes slideUp {
// //     from { transform: translateY(30px); opacity: 0; }
// //     to { transform: translateY(0); opacity: 1; }
// //   }
  
// //   @keyframes bounce {
// //     0%, 100% { transform: scale(1); }
// //     50% { transform: scale(1.1); }
// //   }
// // `;
// // document.head.appendChild(styleSheet);

// // export default ProfileBar;
// import { useEffect, useState } from "react";
// import {
//   FaUserCircle,
//   FaEnvelope,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaBirthdayCake,
//   FaCity,
//   FaGlobe,
//   FaEdit,
//   FaSave,
//   FaTimes,
//   FaMobile,
//   FaCalendarAlt,
//   FaMapPin,
//   FaHome,
//   FaRoad,
//   FaFlag,
//   FaPenFancy,
//   FaCheckCircle,
//   FaShieldAlt,
//   FaUser,
//   FaIdCard,
//   FaRegBuilding,
//   FaClock,
//   FaLock
// } from "react-icons/fa";
// import API from "../../api";
// import { useSnackbar } from "../../Context/SnackbarContext";

// const ProfileBar = () => {
//   const { showSnackbar } = useSnackbar();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showUpdateForm, setShowUpdateForm] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [formErrors, setFormErrors] = useState({});
//   const [touchedFields, setTouchedFields] = useState({});
//   const [updating, setUpdating] = useState(false);
//   const [error, setError] = useState(null);

//   // Canara Bank color scheme
//   const canaraBlue = "#1E3A8A";
//   const canaraGold = "#F59E0B";
//   const canaraNavy = "#0A2472";
//   const canaraLightBlue = "#EFF6FF";
//   const canaraGray = "#F3F4F6";
//   const canaraText = "#111827";
//   const canaraTextLight = "#6B7280";
//   const canaraBorder = "#E5E7EB";
//   const canaraSuccess = "#10B981";
//   const canaraDanger = "#EF4444";

//   // Canara Bank Theme CSS Variables
//   useEffect(() => {
//     const styleSheet = document.createElement("style");
//     styleSheet.textContent = `
//       :root {
//         /* Canara Bank Theme - Blue and Gold */
//         --canara-blue: #1E3A8A;
//         --canara-navy: #0A2472;
//         --canara-gold: #F59E0B;
//         --canara-light-blue: #EFF6FF;
//         --canara-gray: #F3F4F6;
//         --canara-border: #E5E7EB;
//         --canara-text: #111827;
//         --canara-text-light: #6B7280;
//         --canara-success: #10B981;
//         --canara-success-light: #D1FAE5;
//         --canara-danger: #EF4444;
//         --canara-danger-light: #FEE2E2;
        
//         /* Surface colors */
//         --bg-primary: #F9FAFB;
//         --bg-secondary: #FFFFFF;
//         --surface: #FFFFFF;
//         --surface-hover: #EFF6FF;
//         --text-primary: #111827;
//         --text-secondary: #4B5563;
//         --text-muted: #6B7280;
//         --border: #E5E7EB;
//         --border-light: #F3F4F6;
//         --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
//         --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
//         --shadow-lg: 0 10px 15px -3px rgba(30, 58, 138, 0.1);
//         --shadow-hover: 0 20px 25px -5px rgba(30, 58, 138, 0.2);
//         --primary: #1E3A8A;
//         --primary-light: #2563EB;
//         --primary-dark: #0A2472;
//         --primary-soft: #EFF6FF;
//         --primary-gradient: linear-gradient(135deg, #1E3A8A, #2563EB);
//         --success: #10B981;
//         --success-soft: #D1FAE5;
//         --danger: #EF4444;
//         --danger-soft: #FEE2E2;
//         --warning: #F59E0B;
//         --warning-soft: #FEF3C7;
//         --hover-bg: #EFF6FF;
//         --active-bg: #DBEAFE;
//       }

//       * {
//         transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
//       }

//       body {
//         background-color: var(--bg-primary);
//         color: var(--text-primary);
//         font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//       }

//       @keyframes slideUp {
//         from {
//           opacity: 0;
//           transform: translateY(20px);
//         }
//         to {
//           opacity: 1;
//           transform: translateY(0);
//         }
//       }

//       @keyframes fadeIn {
//         from { opacity: 0; }
//         to { opacity: 1; }
//       }

//       @keyframes pulse {
//         0%, 100% { transform: scale(1); }
//         50% { transform: scale(1.05); }
//       }

//       @keyframes shimmer {
//         0% { background-position: -1000px 0; }
//         100% { background-position: 1000px 0; }
//       }

//       @keyframes float {
//         0%, 100% { transform: translateY(0); }
//         50% { transform: translateY(-5px); }
//       }

//       @keyframes spin {
//         from { transform: rotate(0deg); }
//         to { transform: rotate(360deg); }
//       }

//       .profile-card {
//         animation: slideUp 0.4s ease;
//       }

//       .profile-card:hover {
//         box-shadow: var(--shadow-hover);
//       }

//       .detail-item {
//         transition: all 0.3s ease;
//         animation: fadeIn 0.4s ease;
//       }

//       .detail-item:hover {
//         transform: translateY(-2px);
//         border-color: var(--canara-blue) !important;
//         box-shadow: 0 4px 12px rgba(30, 58, 138, 0.1);
//       }

//       .detail-item:hover .icon-wrapper {
//         background: var(--canara-blue) !important;
//         color: white !important;
//         transform: scale(1.1) rotate(-4deg);
//       }

//       .update-button {
//         position: relative;
//         overflow: hidden;
//         transition: all 0.3s ease;
//       }

//       .update-button:hover {
//         transform: translateY(-2px);
//         box-shadow: 0 8px 20px rgba(30, 58, 138, 0.3);
//       }

//       .update-button:active {
//         transform: translateY(0);
//       }

//       .button-glow {
//         position: absolute;
//         top: 0;
//         left: -100%;
//         width: 100%;
//         height: 100%;
//         background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
//         transition: left 0.5s ease;
//         z-index: 1;
//       }

//       .update-button:hover .button-glow {
//         left: 100%;
//       }

//       .modal-content {
//         animation: slideUp 0.3s ease;
//       }

//       .form-input:focus {
//         outline: none;
//         border-color: var(--canara-blue) !important;
//         box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1) !important;
//       }

//       .close-button:hover {
//         background-color: var(--danger-soft);
//         color: var(--danger);
//         transform: rotate(90deg);
//       }

//       .input-error {
//         border-color: var(--danger) !important;
//         background-color: var(--danger-soft) !important;
//       }

//       .error-text {
//         color: var(--danger);
//         font-size: 12px;
//         margin-top: 4px;
//         display: flex;
//         align-items: center;
//         gap: 4px;
//         animation: fadeIn 0.2s ease;
//       }

//       .success-text {
//         color: var(--success);
//         font-size: 12px;
//         margin-top: 4px;
//         display: flex;
//         align-items: center;
//         gap: 4px;
//         animation: fadeIn 0.2s ease;
//       }

//       .badge {
//         display: inline-flex;
//         align-items: center;
//         gap: 6px;
//         padding: 4px 12px;
//         background: var(--canara-light-blue);
//         color: var(--canara-blue);
//         border-radius: 30px;
//         font-size: 12px;
//         font-weight: 600;
//       }

//       .security-badge {
//         display: flex;
//         align-items: center;
//         gap: 8px;
//         padding: 8px 16px;
//         background: var(--canara-light-blue);
//         border-radius: 30px;
//         color: var(--canara-blue);
//         font-size: 13px;
//         font-weight: 500;
//         animation: float 3s ease-in-out infinite;
//       }

//       /* Loading animations */
//       .loader-bar {
//         width: 100%;
//         height: 4px;
//         background: linear-gradient(90deg, var(--canara-light-blue) 25%, var(--canara-blue) 50%, var(--canara-light-blue) 75%);
//         background-size: 200% 100%;
//         animation: shimmer 1.5s infinite;
//       }
//     `;
//     document.head.appendChild(styleSheet);
    
//     return () => {
//       document.head.removeChild(styleSheet);
//     };
//   }, []);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const userId = localStorage.getItem("userId");
//         console.log("Fetching profile for userId:", userId);
        
//         if (!userId) {
//           setError("No user ID found. Please log in again.");
//           setLoading(false);
//           return;
//         }

//         const response = await API.get(`users/details/${userId}`);
        
//         console.log("Profile API Response:", response.data);

//         if (response.data?.data) {
//           setProfile(response.data.data);
//           setFormData(response.data.data);
//         } else if (response.data) {
//           setProfile(response.data);
//           setFormData(response.data);
//         } else {
//           setError("No profile data found");
//         }

//       } catch (error) {
//         console.error("Failed to fetch profile", error);
//         setError(error.response?.data?.message || "Failed to load profile. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // Validation functions
//   const validateMobileNumber = (value) => {
//     if (!value || value.trim() === "") {
//       return "Mobile number is required";
//     }
//     const mobileRegex = /^[0-9]{10}$/;
//     if (!mobileRegex.test(value)) {
//       return "Mobile number must be 10 digits";
//     }
//     return "";
//   };

//   const validateAddress = (value) => {
//     if (!value || value.trim() === "") {
//       return "Address is required";
//     }
//     if (value.trim().length < 5) {
//       return "Address must be at least 5 characters";
//     }
//     if (value.trim().length > 200) {
//       return "Address must not exceed 200 characters";
//     }
//     return "";
//   };

//   const validateCity = (value) => {
//     if (!value || value.trim() === "") {
//       return "City is required";
//     }
//     const cityRegex = /^[a-zA-Z\s]{2,50}$/;
//     if (!cityRegex.test(value)) {
//       return "City must contain only letters and spaces (2-50 characters)";
//     }
//     return "";
//   };

//   const validateState = (value) => {
//     if (!value || value.trim() === "") {
//       return "State is required";
//     }
//     const stateRegex = /^[a-zA-Z\s]{2,50}$/;
//     if (!stateRegex.test(value)) {
//       return "State must contain only letters and spaces (2-50 characters)";
//     }
//     return "";
//   };

//   const validateCountry = (value) => {
//     if (!value || value.trim() === "") {
//       return "Country is required";
//     }
//     const countryRegex = /^[a-zA-Z\s]{2,50}$/;
//     if (!countryRegex.test(value)) {
//       return "Country must contain only letters and spaces (2-50 characters)";
//     }
//     return "";
//   };

//   const validatePincode = (value) => {
//     if (!value || value.trim() === "") {
//       return "Pincode is required";
//     }
//     const pincodeRegex = /^[0-9]{6}$/;
//     if (!pincodeRegex.test(value)) {
//       return "Pincode must be 6 digits";
//     }
//     return "";
//   };

//   // Validate all fields
//   const validateField = (name, value) => {
//     switch (name) {
//       case "mobileNumber":
//       case "mobile":
//         return validateMobileNumber(value);
//       case "address":
//         return validateAddress(value);
//       case "city":
//         return validateCity(value);
//       case "state":
//         return validateState(value);
//       case "country":
//         return validateCountry(value);
//       case "pincode":
//       case "zipCode":
//         return validatePincode(value);
//       default:
//         return "";
//     }
//   };

//   // Validate entire form
//   const validateForm = (data) => {
//     const errors = {};
    
//     // Mobile validation
//     const mobileError = validateMobileNumber(data.mobileNumber || data.mobile || "");
//     if (mobileError) errors.mobile = mobileError;
    
//     // Address validation
//     const addressError = validateAddress(data.address || "");
//     if (addressError) errors.address = addressError;
    
//     // City validation
//     const cityError = validateCity(data.city || "");
//     if (cityError) errors.city = cityError;
    
//     // State validation
//     const stateError = validateState(data.state || "");
//     if (stateError) errors.state = stateError;
    
//     // Country validation
//     const countryError = validateCountry(data.country || "");
//     if (countryError) errors.country = countryError;
    
//     // Pincode validation
//     const pincodeError = validatePincode(data.pincode || data.zipCode || "");
//     if (pincodeError) errors.pincode = pincodeError;
    
//     return errors;
//   };

//   // Check if form is valid
//   const isFormValid = () => {
//     const errors = validateForm(formData);
//     return Object.keys(errors).length === 0;
//   };

//   const handleUpdateClick = () => {
//     setShowUpdateForm(true);
//     setFormErrors({});
//     setTouchedFields({});
//   };

//   const handleCloseForm = () => {
//     setShowUpdateForm(false);
//     setFormErrors({});
//     setTouchedFields({});
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));

//     // Mark field as touched
//     setTouchedFields(prev => ({
//       ...prev,
//       [name]: true
//     }));

//     // Validate field
//     const error = validateField(name, value);
//     setFormErrors(prev => ({
//       ...prev,
//       [name]: error
//     }));
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
    
//     // Mark field as touched on blur
//     setTouchedFields(prev => ({
//       ...prev,
//       [name]: true
//     }));

//     // Validate field on blur
//     const error = validateField(name, value);
//     setFormErrors(prev => ({
//       ...prev,
//       [name]: error
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate all fields before submit
//     const errors = validateForm(formData);
//     setFormErrors(errors);
    
//     // Mark all fields as touched
//     const allTouched = {};
//     Object.keys(formData).forEach(key => {
//       allTouched[key] = true;
//     });
//     setTouchedFields(allTouched);

//     // If there are errors, don't submit
//     if (Object.keys(errors).length > 0) {
//       showSnackbar("error", "Please fix all validation errors before submitting");
//       return;
//     }

//     setUpdating(true);
//     try {
//       const userId = localStorage.getItem("userId");
      
//       const response = await API.put(`users/updateContact/${userId}`, formData);
      
//       console.log("Update Response:", response.data);
      
//       if (response.data?.status || response.data) {
//         setProfile(formData);
        
//         // Show success snackbar
//         showSnackbar("success", "Profile updated successfully!");
        
//         setShowUpdateForm(false);
//         setFormErrors({});
//         setTouchedFields({});
//       }
//     } catch (error) {
//       console.error("Failed to update profile", error);
//       showSnackbar("error", error.response?.data?.message || "Failed to update profile. Please try again.");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     try {
//       const date = new Date(dateString);
//       const day = String(date.getDate()).padStart(2, '0');
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const year = date.getFullYear();
//       return `${day}-${month}-${year}`;
//     } catch (e) {
//       return dateString;
//     }
//   };

//   // Loading animation with Canara Bank theme
//   if (loading) {
//     return (
//       <div style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         minHeight: "600px",
//         backgroundColor: "#F9FAFB",
//       }}>
//         <div style={{
//           backgroundColor: "#FFFFFF",
//           borderRadius: "24px",
//           padding: "48px",
//           boxShadow: "0 10px 25px -5px rgba(30, 58, 138, 0.1)",
//           textAlign: "center",
//           maxWidth: "400px",
//           width: "90%",
//           border: "1px solid #E5E7EB",
//         }}>
//           {/* Bank Building Icon */}
//           <div style={{
//             width: "100px",
//             height: "100px",
//             margin: "0 auto 24px",
//             position: "relative",
//             animation: "float 3s ease-in-out infinite",
//           }}>
//             <div style={{
//               width: "0",
//               height: "0",
//               borderLeft: "50px solid transparent",
//               borderRight: "50px solid transparent",
//               borderBottom: "30px solid #1E3A8A",
//               margin: "0 auto",
//             }} />
//             <div style={{
//               width: "80px",
//               height: "50px",
//               backgroundColor: "#2563EB",
//               margin: "0 auto",
//               borderRadius: "8px 8px 0 0",
//               display: "flex",
//               justifyContent: "space-around",
//               alignItems: "center",
//               padding: "0 10px",
//             }}>
//               {[1,2,3].map(i => (
//                 <div key={i} style={{
//                   width: "12px",
//                   height: "35px",
//                   backgroundColor: "#EFF6FF",
//                   borderRadius: "4px 4px 0 0",
//                   animation: `pulse 1.5s ease-in-out infinite ${i * 0.2}s`,
//                 }} />
//               ))}
//             </div>
//             <div style={{
//               width: "100px",
//               height: "8px",
//               backgroundColor: "#F59E0B",
//               margin: "0 auto",
//               borderRadius: "4px",
//             }} />
//           </div>

//           {/* Loading Bars */}
//           <div style={{
//             display: "flex",
//             justifyContent: "center",
//             gap: "8px",
//             marginBottom: "24px",
//           }}>
//             {[1,2,3,4,5].map(i => (
//               <div key={i} style={{
//                 width: "8px",
//                 height: "40px",
//                 backgroundColor: "#1E3A8A",
//                 borderRadius: "4px",
//                 animation: `pulse 1s ease-in-out infinite ${i * 0.1}s`,
//               }} />
//             ))}
//           </div>

//           {/* Text */}
//           <div style={{ marginBottom: "24px" }}>
//             <div style={{
//               fontSize: "22px",
//               fontWeight: "700",
//               color: "#1E3A8A",
//               marginBottom: "8px",
//             }}>
//               ABC BANK
//             </div>
//             <div style={{
//               fontSize: "16px",
//               color: "#6B7280",
//             }}>
//               Loading your profile
//               <span style={{ display: "inline-block", animation: "pulse 1.5s infinite" }}>...</span>
//             </div>
//           </div>

//           {/* Progress Bar */}
//           <div style={{
//             width: "100%",
//             height: "4px",
//             backgroundColor: "#EFF6FF",
//             borderRadius: "2px",
//             overflow: "hidden",
//             marginBottom: "20px",
//           }}>
//             <div style={{
//               width: "70%",
//               height: "100%",
//               background: "linear-gradient(90deg, #1E3A8A, #2563EB)",
//               borderRadius: "2px",
//               animation: "shimmer 1.5s infinite",
//             }} />
//           </div>

//           {/* Security Badge */}
//           <div style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: "8px",
//             padding: "8px 16px",
//             backgroundColor: "#EFF6FF",
//             borderRadius: "30px",
//             width: "fit-content",
//             margin: "0 auto",
//           }}>
//             <FaLock size={12} color="#1E3A8A" />
//             <span style={{ fontSize: "13px", color: "#1E3A8A", fontWeight: "500" }}>
//               Secure Connection
//             </span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         minHeight: "400px",
//         backgroundColor: "#FFFFFF",
//         borderRadius: "24px",
//         padding: "40px",
//         maxWidth: "500px",
//         margin: "20px auto",
//         boxShadow: "0 10px 25px -5px rgba(30, 58, 138, 0.1)",
//         border: "1px solid #E5E7EB",
//       }}>
//         <FaUserCircle size={64} color="#EF4444" />
//         <p style={{ fontSize: "16px", color: "#111827", margin: "16px 0" }}>{error}</p>
//         <button 
//           onClick={() => window.location.reload()}
//           style={{
//             backgroundColor: "#1E3A8A",
//             color: "white",
//             border: "none",
//             padding: "12px 32px",
//             borderRadius: "30px",
//             fontSize: "15px",
//             fontWeight: "600",
//             cursor: "pointer",
//             transition: "all 0.3s ease",
//             boxShadow: "0 4px 12px rgba(30, 58, 138, 0.3)",
//           }}
//           onMouseEnter={(e) => {
//             e.target.style.transform = "translateY(-2px)";
//             e.target.style.boxShadow = "0 6px 16px rgba(30, 58, 138, 0.4)";
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.transform = "translateY(0)";
//             e.target.style.boxShadow = "0 4px 12px rgba(30, 58, 138, 0.3)";
//           }}
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   // No profile data
//   if (!profile) {
//     return (
//       <div style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         minHeight: "400px",
//         backgroundColor: "#FFFFFF",
//         borderRadius: "24px",
//         padding: "40px",
//         maxWidth: "500px",
//         margin: "20px auto",
//         boxShadow: "0 10px 25px -5px rgba(30, 58, 138, 0.1)",
//         border: "1px solid #E5E7EB",
//       }}>
//         <FaUserCircle size={64} color="#F59E0B" />
//         <p style={{ fontSize: "16px", color: "#111827", margin: "16px 0" }}>No profile data found</p>
//         <button 
//           onClick={() => window.location.reload()}
//           style={{
//             backgroundColor: "#1E3A8A",
//             color: "white",
//             border: "none",
//             padding: "12px 32px",
//             borderRadius: "30px",
//             fontSize: "15px",
//             fontWeight: "600",
//             cursor: "pointer",
//             transition: "all 0.3s ease",
//             boxShadow: "0 4px 12px rgba(30, 58, 138, 0.3)",
//           }}
//           onMouseEnter={(e) => {
//             e.target.style.transform = "translateY(-2px)";
//             e.target.style.boxShadow = "0 6px 16px rgba(30, 58, 138, 0.4)";
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.transform = "translateY(0)";
//             e.target.style.boxShadow = "0 4px 12px rgba(30, 58, 138, 0.3)";
//           }}
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div style={{
//         backgroundColor: "#FFFFFF",
//         borderRadius: "24px",
//         boxShadow: "0 10px 25px -5px rgba(30, 58, 138, 0.1)",
//         padding: "32px",
//         maxWidth: "1000px",
//         margin: "20px auto",
//         position: "relative",
//         overflow: "hidden",
//         border: "1px solid #E5E7EB",
//       }} className="profile-card">
//         {/* Bank Header */}
//         <div style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "20px",
//           paddingBottom: "16px",
//           borderBottom: "1px solid #E5E7EB",
//         }}>
//           <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//             <div style={{
//               display: "flex",
//               alignItems: "center",
//               background: "#EFF6FF",
//               padding: "8px",
//               borderRadius: "10px",
//             }}>
//               <FaRegBuilding size={20} color="#1E3A8A" />
//             </div>
//             <span style={{
//               fontSize: "20px",
//               fontWeight: "700",
//               color: "#1E3A8A",
//               letterSpacing: "0.5px",
//             }}>ABC BANK</span>
//           </div>
//           <div className="badge">
//             <FaShieldAlt size={12} />
//             <span>Verified Account</span>
//           </div>
//         </div>

//         {/* Gradient Line */}
//         <div style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           height: "4px",
//           background: "linear-gradient(135deg, #1E3A8A, #2563EB, #F59E0B)",
//         }} />

//         {/* Header */}
//         <div style={{
//           display: "flex",
//           alignItems: "center",
//           gap: "24px",
//           marginBottom: "32px",
//           marginTop: "8px",
//         }}>
//           <div style={{
//             position: "relative",
//             filter: "drop-shadow(0 8px 16px rgba(30, 58, 138, 0.15))",
//           }}>
//             <FaUserCircle size={90} color="#1E3A8A" />
//             <div style={{
//               position: "absolute",
//               bottom: "8px",
//               right: "8px",
//               width: "16px",
//               height: "16px",
//               backgroundColor: "#10B981",
//               border: "3px solid #FFFFFF",
//               borderRadius: "50%",
//               boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
//             }} />
//           </div>
//           <div style={{ flex: 1 }}>
//             <h2 style={{
//               fontSize: "32px",
//               fontWeight: "700",
//               color: "#111827",
//               margin: "0 0 8px 0",
//               letterSpacing: "-0.5px",
//             }}>
//               {profile.firstName || "User"} {profile.lastName || ""}
//             </h2>
//             <div style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "8px",
//               backgroundColor: "#EFF6FF",
//               padding: "8px 18px",
//               borderRadius: "40px",
//               width: "fit-content",
//               border: "1px solid #E5E7EB",
//             }}>
//               <FaMapMarkerAlt size={14} color="#1E3A8A" />
//               <span style={{
//                 fontSize: "15px",
//                 color: "#1E3A8A",
//                 fontWeight: "600",
//               }}>
//                 {profile.city || "Chennai"}, {profile.state || "Tamil Nadu"}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Details Grid */}
//         <div style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//           gap: "16px",
//           marginBottom: "32px",
//         }}>
//           {/* Mobile */}
//           <div style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "16px",
//             padding: "16px",
//             backgroundColor: "#F9FAFB",
//             borderRadius: "16px",
//             border: "1px solid #E5E7EB",
//             cursor: "pointer",
//           }} className="detail-item">
//             <div style={{
//               width: "48px",
//               height: "48px",
//               backgroundColor: "#EFF6FF",
//               borderRadius: "12px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: "#1E3A8A",
//               transition: "all 0.2s ease",
//             }} className="icon-wrapper">
//               <FaPhone size={20} />
//             </div>
//             <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
//               <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", letterSpacing: "0.5px" }}>MOBILE</span>
//               <span style={{ fontSize: "15px", color: "#111827", fontWeight: "500" }}>{profile.mobileNumber || profile.mobile || "N/A"}</span>
//             </div>
//           </div>

//           {/* Email */}
//           <div style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "16px",
//             padding: "16px",
//             backgroundColor: "#F9FAFB",
//             borderRadius: "16px",
//             border: "1px solid #E5E7EB",
//             cursor: "pointer",
//           }} className="detail-item">
//             <div style={{
//               width: "48px",
//               height: "48px",
//               backgroundColor: "#EFF6FF",
//               borderRadius: "12px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: "#1E3A8A",
//               transition: "all 0.2s ease",
//             }} className="icon-wrapper">
//               <FaEnvelope size={20} />
//             </div>
//             <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
//               <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", letterSpacing: "0.5px" }}>EMAIL</span>
//               <span style={{ fontSize: "15px", color: "#111827", fontWeight: "500" }}>{profile.email || "N/A"}</span>
//             </div>
//           </div>

//           {/* Date of Birth */}
//           <div style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "16px",
//             padding: "16px",
//             backgroundColor: "#F9FAFB",
//             borderRadius: "16px",
//             border: "1px solid #E5E7EB",
//             cursor: "pointer",
//           }} className="detail-item">
//             <div style={{
//               width: "48px",
//               height: "48px",
//               backgroundColor: "#EFF6FF",
//               borderRadius: "12px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: "#1E3A8A",
//               transition: "all 0.2s ease",
//             }} className="icon-wrapper">
//               <FaBirthdayCake size={20} />
//             </div>
//             <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
//               <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", letterSpacing: "0.5px" }}>DATE OF BIRTH</span>
//               <span style={{ fontSize: "15px", color: "#111827", fontWeight: "500" }}>{formatDate(profile.dateOfBirth || profile.dob)}</span>
//             </div>
//           </div>

//           {/* Address */}
//           <div style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "16px",
//             padding: "16px",
//             backgroundColor: "#F9FAFB",
//             borderRadius: "16px",
//             border: "1px solid #E5E7EB",
//             cursor: "pointer",
//           }} className="detail-item">
//             <div style={{
//               width: "48px",
//               height: "48px",
//               backgroundColor: "#EFF6FF",
//               borderRadius: "12px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: "#1E3A8A",
//               transition: "all 0.2s ease",
//             }} className="icon-wrapper">
//               <FaHome size={20} />
//             </div>
//             <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
//               <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", letterSpacing: "0.5px" }}>ADDRESS</span>
//               <span style={{ fontSize: "15px", color: "#111827", fontWeight: "500" }}>{profile.address || "N/A"}</span>
//             </div>
//           </div>

//           {/* City */}
//           <div style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "16px",
//             padding: "16px",
//             backgroundColor: "#F9FAFB",
//             borderRadius: "16px",
//             border: "1px solid #E5E7EB",
//             cursor: "pointer",
//           }} className="detail-item">
//             <div style={{
//               width: "48px",
//               height: "48px",
//               backgroundColor: "#EFF6FF",
//               borderRadius: "12px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: "#1E3A8A",
//               transition: "all 0.2s ease",
//             }} className="icon-wrapper">
//               <FaCity size={20} />
//             </div>
//             <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
//               <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", letterSpacing: "0.5px" }}>CITY</span>
//               <span style={{ fontSize: "15px", color: "#111827", fontWeight: "500" }}>{profile.city || "N/A"}</span>
//             </div>
//           </div>

//           {/* State */}
//           <div style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "16px",
//             padding: "16px",
//             backgroundColor: "#F9FAFB",
//             borderRadius: "16px",
//             border: "1px solid #E5E7EB",
//             cursor: "pointer",
//           }} className="detail-item">
//             <div style={{
//               width: "48px",
//               height: "48px",
//               backgroundColor: "#EFF6FF",
//               borderRadius: "12px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: "#1E3A8A",
//               transition: "all 0.2s ease",
//             }} className="icon-wrapper">
//               <FaFlag size={20} />
//             </div>
//             <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
//               <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", letterSpacing: "0.5px" }}>STATE</span>
//               <span style={{ fontSize: "15px", color: "#111827", fontWeight: "500" }}>{profile.state || "N/A"}</span>
//             </div>
//           </div>

//           {/* Country */}
//           <div style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "16px",
//             padding: "16px",
//             backgroundColor: "#F9FAFB",
//             borderRadius: "16px",
//             border: "1px solid #E5E7EB",
//             cursor: "pointer",
//           }} className="detail-item">
//             <div style={{
//               width: "48px",
//               height: "48px",
//               backgroundColor: "#EFF6FF",
//               borderRadius: "12px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: "#1E3A8A",
//               transition: "all 0.2s ease",
//             }} className="icon-wrapper">
//               <FaGlobe size={20} />
//             </div>
//             <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
//               <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", letterSpacing: "0.5px" }}>COUNTRY</span>
//               <span style={{ fontSize: "15px", color: "#111827", fontWeight: "500" }}>{profile.country || "India"}</span>
//             </div>
//           </div>

//           {/* Pincode */}
//           <div style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "16px",
//             padding: "16px",
//             backgroundColor: "#F9FAFB",
//             borderRadius: "16px",
//             border: "1px solid #E5E7EB",
//             cursor: "pointer",
//           }} className="detail-item">
//             <div style={{
//               width: "48px",
//               height: "48px",
//               backgroundColor: "#EFF6FF",
//               borderRadius: "12px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: "#1E3A8A",
//               transition: "all 0.2s ease",
//             }} className="icon-wrapper">
//               <FaMapPin size={20} />
//             </div>
//             <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
//               <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", letterSpacing: "0.5px" }}>PINCODE</span>
//               <span style={{ fontSize: "15px", color: "#111827", fontWeight: "500" }}>{profile.pincode || profile.zipCode || "N/A"}</span>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginTop: "16px",
//           paddingTop: "20px",
//           borderTop: "1px solid #E5E7EB",
//         }}>
//           <button 
//             onClick={handleUpdateClick}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "12px",
//               background: "linear-gradient(135deg, #1E3A8A, #2563EB)",
//               color: "white",
//               border: "none",
//               borderRadius: "40px",
//               padding: "12px 28px",
//               fontSize: "15px",
//               fontWeight: "600",
//               cursor: "pointer",
//               transition: "all 0.3s ease",
//               boxShadow: "0 4px 12px rgba(30, 58, 138, 0.3)",
//               position: "relative",
//               overflow: "hidden",
//             }}
//             className="update-button"
//             onMouseEnter={(e) => {
//               e.target.style.transform = "translateY(-2px)";
//               e.target.style.boxShadow = "0 8px 20px rgba(30, 58, 138, 0.4)";
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.transform = "translateY(0)";
//               e.target.style.boxShadow = "0 4px 12px rgba(30, 58, 138, 0.3)";
//             }}
//           >
//             <FaPenFancy size={16} style={{ position: "relative", zIndex: 2 }} />
//             <span style={{ position: "relative", zIndex: 2 }}>Edit Profile</span>
//             <span style={{
//               position: "absolute",
//               top: 0,
//               left: "-100%",
//               width: "100%",
//               height: "100%",
//               background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
//               transition: "left 0.5s ease",
//               zIndex: 1,
//             }} className="button-glow" />
//           </button>
//         </div>
//       </div>

//       {/* Update Profile Modal */}
//       {showUpdateForm && (
//         <div style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: "rgba(0, 0, 0, 0.6)",
//           backdropFilter: "blur(8px)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           zIndex: 1000,
//           padding: "20px",
//         }} onClick={handleCloseForm}>
//           <div style={{
//             backgroundColor: "#FFFFFF",
//             borderRadius: "28px",
//             maxWidth: "700px",
//             width: "100%",
//             boxShadow: "0 20px 25px -5px rgba(30, 58, 138, 0.2)",
//             overflow: "hidden",
//             maxHeight: "90vh",
//             display: "flex",
//             flexDirection: "column",
//             border: "1px solid #E5E7EB",
//           }} className="modal-content" onClick={(e) => e.stopPropagation()}>
//             {/* Modal Header */}
//             <div style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               padding: "24px 28px",
//               borderBottom: "1px solid #E5E7EB",
//               background: "#F9FAFB",
//             }}>
//               <h3 style={{
//                 fontSize: "22px",
//                 fontWeight: "700",
//                 color: "#111827",
//                 margin: 0,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "10px",
//               }}>
//                 <FaEdit size={20} color="#1E3A8A" />
//                 Edit Profile Information
//               </h3>
//               <button 
//                 onClick={handleCloseForm}
//                 style={{
//                   background: "none",
//                   border: "none",
//                   fontSize: "18px",
//                   color: "#6B7280",
//                   cursor: "pointer",
//                   padding: "8px",
//                   borderRadius: "50%",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   transition: "all 0.2s ease",
//                   backgroundColor: "#E5E7EB",
//                   width: "38px",
//                   height: "38px",
//                 }}
//                 className="close-button"
//                 onMouseEnter={(e) => {
//                   e.target.style.backgroundColor = "#FEE2E2";
//                   e.target.style.color = "#EF4444";
//                   e.target.style.transform = "rotate(90deg)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.backgroundColor = "#E5E7EB";
//                   e.target.style.color = "#6B7280";
//                   e.target.style.transform = "rotate(0deg)";
//                 }}
//               >
//                 <FaTimes />
//               </button>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit} style={{ padding: "28px", overflowY: "auto", flex: 1 }}>
//               <div style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(2, 1fr)",
//                 gap: "20px",
//                 marginBottom: "24px",
//               }}>
//                 {/* Mobile Number */}
//                 <div style={{ gridColumn: "span 2", display: "flex", flexDirection: "column", gap: "8px" }}>
//                   <label style={{
//                     fontSize: "14px",
//                     fontWeight: "600",
//                     color: "#111827",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "8px",
//                   }}>
//                     <FaPhone size={14} color="#1E3A8A" /> Mobile Number
//                   </label>
//                   <input
//                     type="tel"
//                     name="mobileNumber"
//                     value={formData.mobileNumber || formData.mobile || ''}
//                     onChange={handleInputChange}
//                     onBlur={handleBlur}
//                     style={{
//                       padding: "12px 16px",
//                       borderRadius: "12px",
//                       border: `1px solid ${touchedFields.mobileNumber && formErrors.mobile ? "#EF4444" : (touchedFields.mobileNumber && !formErrors.mobile ? "#10B981" : "#E5E7EB")}`,
//                       fontSize: "15px",
//                       backgroundColor: touchedFields.mobileNumber && formErrors.mobile ? "#FEE2E2" : "#F9FAFB",
//                       color: "#111827",
//                       transition: "all 0.2s ease",
//                       outline: "none",
//                     }}
//                     className="form-input"
//                     placeholder="Enter 10-digit mobile number"
//                     required
//                   />
//                   {touchedFields.mobileNumber && formErrors.mobile && (
//                     <div style={{ color: "#EF4444", fontSize: "12px", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
//                       <span>⚠️</span> {formErrors.mobile}
//                     </div>
//                   )}
//                   {touchedFields.mobileNumber && !formErrors.mobile && formData.mobileNumber && (
//                     <div style={{ color: "#10B981", fontSize: "12px", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
//                       <FaCheckCircle /> Valid mobile number
//                     </div>
//                   )}
//                 </div>

//                 {/* Address */}
//                 <div style={{ gridColumn: "span 2", display: "flex", flexDirection: "column", gap: "8px" }}>
//                   <label style={{
//                     fontSize: "14px",
//                     fontWeight: "600",
//                     color: "#111827",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "8px",
//                   }}>
//                     <FaRoad size={14} color="#1E3A8A" /> Address
//                   </label>
//                   <textarea
//                     name="address"
//                     value={formData.address || ''}
//                     onChange={handleInputChange}
//                     onBlur={handleBlur}
//                     style={{
//                       padding: "12px 16px",
//                       borderRadius: "12px",
//                       border: `1px solid ${touchedFields.address && formErrors.address ? "#EF4444" : (touchedFields.address && !formErrors.address ? "#10B981" : "#E5E7EB")}`,
//                       fontSize: "15px",
//                       backgroundColor: touchedFields.address && formErrors.address ? "#FEE2E2" : "#F9FAFB",
//                       color: "#111827",
//                       transition: "all 0.2s ease",
//                       resize: "vertical",
//                       minHeight: "80px",
//                       outline: "none",
//                     }}
//                     className="form-input"
//                     rows="2"
//                     placeholder="Enter your full address"
//                     required
//                   />
//                   {touchedFields.address && formErrors.address && (
//                     <div style={{ color: "#EF4444", fontSize: "12px", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
//                       <span>⚠️</span> {formErrors.address}
//                     </div>
//                   )}
//                   {touchedFields.address && !formErrors.address && formData.address && (
//                     <div style={{ color: "#10B981", fontSize: "12px", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
//                       <FaCheckCircle /> Valid address
//                     </div>
//                   )}
//                 </div>

//                 {/* City */}
//                 <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//                   <label style={{
//                     fontSize: "14px",
//                     fontWeight: "600",
//                     color: "#111827",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "8px",
//                   }}>
//                     <FaCity size={14} color="#1E3A8A" /> City
//                   </label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={formData.city || ''}
//                     onChange={handleInputChange}
//                     onBlur={handleBlur}
//                     style={{
//                       padding: "12px 16px",
//                       borderRadius: "12px",
//                       border: `1px solid ${touchedFields.city && formErrors.city ? "#EF4444" : (touchedFields.city && !formErrors.city ? "#10B981" : "#E5E7EB")}`,
//                       fontSize: "15px",
//                       backgroundColor: touchedFields.city && formErrors.city ? "#FEE2E2" : "#F9FAFB",
//                       color: "#111827",
//                       transition: "all 0.2s ease",
//                       outline: "none",
//                     }}
//                     className="form-input"
//                     placeholder="Enter city name"
//                     required
//                   />
//                   {touchedFields.city && formErrors.city && (
//                     <div style={{ color: "#EF4444", fontSize: "12px", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
//                       <span>⚠️</span> {formErrors.city}
//                     </div>
//                   )}
//                   {touchedFields.city && !formErrors.city && formData.city && (
//                     <div style={{ color: "#10B981", fontSize: "12px", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
//                       <FaCheckCircle /> Valid city
//                     </div>
//                   )}
//                 </div>

//                 {/* State */}
//                 <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//                   <label style={{
//                     fontSize: "14px",
//                     fontWeight: "600",
//                     color: "#111827",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "8px",
//                   }}>
//                     <FaFlag size={14} color="#1E3A8A" /> State
//                   </label>
//                   <input
//                     type="text"
//                     name="state"
//                     value={formData.state || ''}
//                     onChange={handleInputChange}
//                     onBlur={handleBlur}
//                     style={{
//                       padding: "12px 16px",
//                       borderRadius: "12px",
//                       border: `1px solid ${touchedFields.state && formErrors.state ? "#EF4444" : (touchedFields.state && !formErrors.state ? "#10B981" : "#E5E7EB")}`,
//                       fontSize: "15px",
//                       backgroundColor: touchedFields.state && formErrors.state ? "#FEE2E2" : "#F9FAFB",
//                       color: "#111827",
//                       transition: "all 0.2s ease",
//                       outline: "none",
//                     }}
//                     className="form-input"
//                     placeholder="Enter state name"
//                     required
//                   />
//                   {touchedFields.state && formErrors.state && (
//                     <div style={{ color: "#EF4444", fontSize: "12px", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
//                       <span>⚠️</span> {formErrors.state}
//                     </div>
//                   )}
//                   {touchedFields.state && !formErrors.state && formData.state && (
//                     <div style={{ color: "#10B981", fontSize: "12px", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
//                       <FaCheckCircle /> Valid state
//                     </div>
//                   )}
//                 </div>

//                 {/* Country */}
//                 <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//                   <label style={{
//                     fontSize: "14px",
//                     fontWeight: "600",
//                     color: "#111827",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "8px",
//                   }}>
//                     <FaGlobe size={14} color="#1E3A8A" /> Country
//                   </label>
//                   <input
//                     type="text"
//                     name="country"
//                     value={formData.country || 'India'}
//                     onChange={handleInputChange}
//                     onBlur={handleBlur}
//                     style={{
//                       padding: "12px 16px",
//                       borderRadius: "12px",
//                       border: `1px solid ${touchedFields.country && formErrors.country ? "#EF4444" : (touchedFields.country && !formErrors.country ? "#10B981" : "#E5E7EB")}`,
//                       fontSize: "15px",
//                       backgroundColor: touchedFields.country && formErrors.country ? "#FEE2E2" : "#F9FAFB",
//                       color: "#111827",
//                       transition: "all 0.2s ease",
//                       outline: "none",
//                     }}
//                     className="form-input"
//                     placeholder="Enter country name"
//                     required
//                   />
//                   {touchedFields.country && formErrors.country && (
//                     <div style={{ color: "#EF4444", fontSize: "12px", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
//                       <span>⚠️</span> {formErrors.country}
//                     </div>
//                   )}
//                   {touchedFields.country && !formErrors.country && formData.country && (
//                     <div style={{ color: "#10B981", fontSize: "12px", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
//                       <FaCheckCircle /> Valid country
//                     </div>
//                   )}
//                 </div>

//                 {/* Pincode */}
//                 <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//                   <label style={{
//                     fontSize: "14px",
//                     fontWeight: "600",
//                     color: "#111827",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "8px",
//                   }}>
//                     <FaMapPin size={14} color="#1E3A8A" /> Pincode
//                   </label>
//                   <input
//                     type="text"
//                     name="pincode"
//                     value={formData.pincode || formData.zipCode || ''}
//                     onChange={handleInputChange}
//                     onBlur={handleBlur}
//                     style={{
//                       padding: "12px 16px",
//                       borderRadius: "12px",
//                       border: `1px solid ${touchedFields.pincode && formErrors.pincode ? "#EF4444" : (touchedFields.pincode && !formErrors.pincode ? "#10B981" : "#E5E7EB")}`,
//                       fontSize: "15px",
//                       backgroundColor: touchedFields.pincode && formErrors.pincode ? "#FEE2E2" : "#F9FAFB",
//                       color: "#111827",
//                       transition: "all 0.2s ease",
//                       outline: "none",
//                     }}
//                     className="form-input"
//                     placeholder="Enter 6-digit pincode"
//                     required
//                   />
//                   {touchedFields.pincode && formErrors.pincode && (
//                     <div style={{ color: "#EF4444", fontSize: "12px", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
//                       <span>⚠️</span> {formErrors.pincode}
//                     </div>
//                   )}
//                   {touchedFields.pincode && !formErrors.pincode && (formData.pincode || formData.zipCode) && (
//                     <div style={{ color: "#10B981", fontSize: "12px", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
//                       <FaCheckCircle /> Valid pincode
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Form Actions */}
//               <div style={{
//                 display: "flex",
//                 justifyContent: "flex-end",
//                 gap: "16px",
//                 marginTop: "16px",
//                 paddingTop: "20px",
//                 borderTop: "1px solid #E5E7EB",
//               }}>
//                 <button 
//                   type="button" 
//                   onClick={handleCloseForm}
//                   style={{
//                     backgroundColor: "#F9FAFB",
//                     color: "#111827",
//                     border: "1px solid #E5E7EB",
//                     padding: "12px 24px",
//                     borderRadius: "12px",
//                     fontSize: "15px",
//                     fontWeight: "600",
//                     cursor: "pointer",
//                     transition: "all 0.2s ease",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "8px",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.target.style.backgroundColor = "#E5E7EB";
//                     e.target.style.transform = "translateY(-1px)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.backgroundColor = "#F9FAFB";
//                     e.target.style.transform = "translateY(0)";
//                   }}
//                 >
//                   <FaTimes /> Cancel
//                 </button>
//                 <button 
//                   type="submit" 
//                   style={{
//                     background: "linear-gradient(135deg, #1E3A8A, #2563EB)",
//                     color: "white",
//                     border: "none",
//                     padding: "12px 28px",
//                     borderRadius: "12px",
//                     fontSize: "15px",
//                     fontWeight: "600",
//                     cursor: isFormValid() ? "pointer" : "not-allowed",
//                     transition: "all 0.2s ease",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "8px",
//                     opacity: isFormValid() ? 1 : 0.6,
//                     boxShadow: "0 4px 12px rgba(30, 58, 138, 0.3)",
//                   }}
//                   disabled={updating || !isFormValid()}
//                   onMouseEnter={(e) => {
//                     if (isFormValid()) {
//                       e.target.style.transform = "translateY(-2px)";
//                       e.target.style.boxShadow = "0 8px 20px rgba(30, 58, 138, 0.4)";
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (isFormValid()) {
//                       e.target.style.transform = "translateY(0)";
//                       e.target.style.boxShadow = "0 4px 12px rgba(30, 58, 138, 0.3)";
//                     }
//                   }}
//                 >
//                   <FaSave /> {updating ? 'Updating...' : 'Save Changes'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ProfileBar;
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
  FaMobile,
  FaCalendarAlt,
  FaMapPin,
  FaHome,
  FaRoad,
  FaFlag,
  FaPenFancy,
  FaCheckCircle,
  FaShieldAlt,
  FaUser,
  FaIdCard,
  FaRegBuilding,
  FaClock,
  FaLock
} from "react-icons/fa";
import API from "../../api";
import { useSnackbar } from "../../Context/SnackbarContext";

const ProfileBar = () => {
  const { showSnackbar } = useSnackbar();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  // Canara Bank color scheme
  const canaraBlue = "#1E3A8A";
  const canaraGold = "#F59E0B";
  const canaraNavy = "#0A2472";
  const canaraLightBlue = "#EFF6FF";
  const canaraGray = "#F3F4F6";
  const canaraText = "#111827";
  const canaraTextLight = "#6B7280";
  const canaraBorder = "#E5E7EB";
  const canaraSuccess = "#10B981";
  const canaraDanger = "#EF4444";

  // Canara Bank Theme CSS Variables
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      :root {
        /* Canara Bank Theme - Blue and Gold */
        --canara-blue: #1E3A8A;
        --canara-navy: #0A2472;
        --canara-gold: #F59E0B;
        --canara-light-blue: #EFF6FF;
        --canara-gray: #F3F4F6;
        --canara-border: #E5E7EB;
        --canara-text: #111827;
        --canara-text-light: #6B7280;
        --canara-success: #10B981;
        --canara-success-light: #D1FAE5;
        --canara-danger: #EF4444;
        --canara-danger-light: #FEE2E2;
        
        /* Surface colors */
        --bg-primary: #F9FAFB;
        --bg-secondary: #FFFFFF;
        --surface: #FFFFFF;
        --surface-hover: #EFF6FF;
        --text-primary: #111827;
        --text-secondary: #4B5563;
        --text-muted: #6B7280;
        --border: #E5E7EB;
        --border-light: #F3F4F6;
        --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        --shadow-lg: 0 10px 15px -3px rgba(30, 58, 138, 0.1);
        --shadow-hover: 0 20px 25px -5px rgba(30, 58, 138, 0.2);
        --primary: #1E3A8A;
        --primary-light: #2563EB;
        --primary-dark: #0A2472;
        --primary-soft: #EFF6FF;
        --primary-gradient: linear-gradient(135deg, #1E3A8A, #2563EB);
        --success: #10B981;
        --success-soft: #D1FAE5;
        --danger: #EF4444;
        --danger-soft: #FEE2E2;
        --warning: #F59E0B;
        --warning-soft: #FEF3C7;
        --hover-bg: #EFF6FF;
        --active-bg: #DBEAFE;
      }

      * {
        transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
      }

      body {
        background-color: var(--bg-primary);
        color: var(--text-primary);
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }

      @keyframes shimmer {
        0% { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
      }

      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }

      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      .profile-card {
        animation: slideUp 0.4s ease;
      }

      .profile-card:hover {
        box-shadow: var(--shadow-hover);
      }

      .detail-item {
        transition: all 0.3s ease;
        animation: fadeIn 0.4s ease;
      }

      .detail-item:hover {
        transform: translateY(-2px);
        border-color: var(--canara-blue) !important;
        box-shadow: 0 4px 12px rgba(30, 58, 138, 0.1);
      }

      .detail-item:hover .icon-wrapper {
        background: var(--canara-blue) !important;
        color: white !important;
        transform: scale(1.1) rotate(-4deg);
      }

      .update-button {
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
      }

      .update-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(30, 58, 138, 0.3);
      }

      .update-button:active {
        transform: translateY(0);
      }

      .button-glow {
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        transition: left 0.5s ease;
        z-index: 1;
      }

      .update-button:hover .button-glow {
        left: 100%;
      }

      .modal-content {
        animation: slideUp 0.3s ease;
      }

      .form-input:focus {
        outline: none;
        border-color: var(--canara-blue) !important;
        box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1) !important;
      }

      .close-button:hover {
        background-color: var(--danger-soft);
        color: var(--danger);
        transform: rotate(90deg);
      }

      .input-error {
        border-color: var(--danger) !important;
        background-color: var(--danger-soft) !important;
      }

      .error-text {
        color: var(--danger);
        font-size: 12px;
        margin-top: 4px;
        display: flex;
        align-items: center;
        gap: 4px;
        animation: fadeIn 0.2s ease;
      }

      .success-text {
        color: var(--success);
        font-size: 12px;
        margin-top: 4px;
        display: flex;
        align-items: center;
        gap: 4px;
        animation: fadeIn 0.2s ease;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 12px;
        background: var(--canara-light-blue);
        color: var(--canara-blue);
        border-radius: 30px;
        font-size: 12px;
        font-weight: 600;
      }

      .security-badge {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: var(--canara-light-blue);
        border-radius: 30px;
        color: var(--canara-blue);
        font-size: 13px;
        font-weight: 500;
        animation: float 3s ease-in-out infinite;
      }

      /* Loading animations */
      .loader-bar {
        width: 100%;
        height: 4px;
        background: linear-gradient(90deg, var(--canara-light-blue) 25%, var(--canara-blue) 50%, var(--canara-light-blue) 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
      }
    `;
    document.head.appendChild(styleSheet);
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        console.log("Fetching profile for userId:", userId);
        
        if (!userId) {
          setError("No user ID found. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await API.get(`users/details/${userId}`);
        
        console.log("Profile API Response:", response.data);

        if (response.data?.data) {
          setProfile(response.data.data);
          setFormData(response.data.data);
        } else if (response.data) {
          setProfile(response.data);
          setFormData(response.data);
        } else {
          setError("No profile data found");
        }

      } catch (error) {
        console.error("Failed to fetch profile", error);
        setError(error.response?.data?.message || "Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Validation functions
  const validateMobileNumber = (value) => {
    if (!value || value.trim() === "") {
      return "Mobile number is required";
    }
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(value)) {
      return "Mobile number must be 10 digits";
    }
    return "";
  };

  const validateAddress = (value) => {
    if (!value || value.trim() === "") {
      return "Address is required";
    }
    if (value.trim().length < 5) {
      return "Address must be at least 5 characters";
    }
    if (value.trim().length > 200) {
      return "Address must not exceed 200 characters";
    }
    return "";
  };

  const validateCity = (value) => {
    if (!value || value.trim() === "") {
      return "City is required";
    }
    const cityRegex = /^[a-zA-Z\s]{2,50}$/;
    if (!cityRegex.test(value)) {
      return "City must contain only letters and spaces (2-50 characters)";
    }
    return "";
  };

  const validateState = (value) => {
    if (!value || value.trim() === "") {
      return "State is required";
    }
    const stateRegex = /^[a-zA-Z\s]{2,50}$/;
    if (!stateRegex.test(value)) {
      return "State must contain only letters and spaces (2-50 characters)";
    }
    return "";
  };

  const validateCountry = (value) => {
    if (!value || value.trim() === "") {
      return "Country is required";
    }
    const countryRegex = /^[a-zA-Z\s]{2,50}$/;
    if (!countryRegex.test(value)) {
      return "Country must contain only letters and spaces (2-50 characters)";
    }
    return "";
  };

  const validatePincode = (value) => {
    if (!value || value.trim() === "") {
      return "Pincode is required";
    }
    const pincodeRegex = /^[0-9]{6}$/;
    if (!pincodeRegex.test(value)) {
      return "Pincode must be 6 digits";
    }
    return "";
  };

  // Validate all fields
  const validateField = (name, value) => {
    switch (name) {
      case "mobileNumber":
      case "mobile":
        return validateMobileNumber(value);
      case "address":
        return validateAddress(value);
      case "city":
        return validateCity(value);
      case "state":
        return validateState(value);
      case "country":
        return validateCountry(value);
      case "pincode":
      case "zipCode":
        return validatePincode(value);
      default:
        return "";
    }
  };

  // Validate entire form
  const validateForm = (data) => {
    const errors = {};
    
    // Mobile validation
    const mobileError = validateMobileNumber(data.mobileNumber || data.mobile || "");
    if (mobileError) errors.mobile = mobileError;
    
    // Address validation
    const addressError = validateAddress(data.address || "");
    if (addressError) errors.address = addressError;
    
    // City validation
    const cityError = validateCity(data.city || "");
    if (cityError) errors.city = cityError;
    
    // State validation
    const stateError = validateState(data.state || "");
    if (stateError) errors.state = stateError;
    
    // Country validation
    const countryError = validateCountry(data.country || "");
    if (countryError) errors.country = countryError;
    
    // Pincode validation
    const pincodeError = validatePincode(data.pincode || data.zipCode || "");
    if (pincodeError) errors.pincode = pincodeError;
    
    return errors;
  };

  // Check if form is valid
  const isFormValid = () => {
    const errors = validateForm(formData);
    return Object.keys(errors).length === 0;
  };

  const handleUpdateClick = () => {
    setShowUpdateForm(true);
    setFormErrors({});
    setTouchedFields({});
  };

  const handleCloseForm = () => {
    setShowUpdateForm(false);
    setFormErrors({});
    setTouchedFields({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Mark field as touched
    setTouchedFields(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate field
    const error = validateField(name, value);
    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    // Mark field as touched on blur
    setTouchedFields(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate field on blur
    const error = validateField(name, value);
    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields before submit
    const errors = validateForm(formData);
    setFormErrors(errors);
    
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouchedFields(allTouched);

    // If there are errors, don't submit
    if (Object.keys(errors).length > 0) {
      showSnackbar("error", "Please fix all validation errors before submitting");
      return;
    }

    setUpdating(true);
    try {
      const userId = localStorage.getItem("userId");
      
      const response = await API.put(`users/updateContact/${userId}`, formData);
      
      console.log("Update Response:", response.data);
      
      if (response.data?.status || response.data) {
        setProfile(formData);
        
        // Show success snackbar
        showSnackbar("success", "Profile updated successfully!");
        
        setShowUpdateForm(false);
        setFormErrors({});
        setTouchedFields({});
      }
    } catch (error) {
      console.error("Failed to update profile", error);
      showSnackbar("error", error.response?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    } catch (e) {
      return dateString;
    }
  };

  // Loading animation with Canara Bank theme
  if (loading) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "600px",
        backgroundColor: "#F9FAFB",
      }}>
        <div style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "24px",
          padding: "48px",
          boxShadow: "0 10px 25px -5px rgba(30, 58, 138, 0.1)",
          textAlign: "center",
          maxWidth: "400px",
          width: "90%",
          border: "1px solid #E5E7EB",
        }}>
          {/* Bank Building Icon */}
          <div style={{
            width: "100px",
            height: "100px",
            margin: "0 auto 24px",
            position: "relative",
            animation: "float 3s ease-in-out infinite",
          }}>
            <div style={{
              width: "0",
              height: "0",
              borderLeft: "50px solid transparent",
              borderRight: "50px solid transparent",
              borderBottom: "30px solid #1E3A8A",
              margin: "0 auto",
            }} />
            <div style={{
              width: "80px",
              height: "50px",
              backgroundColor: "#2563EB",
              margin: "0 auto",
              borderRadius: "8px 8px 0 0",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "0 10px",
            }}>
              {[1,2,3].map(i => (
                <div key={i} style={{
                  width: "12px",
                  height: "35px",
                  backgroundColor: "#EFF6FF",
                  borderRadius: "4px 4px 0 0",
                  animation: `pulse 1.5s ease-in-out infinite ${i * 0.2}s`,
                }} />
              ))}
            </div>
            <div style={{
              width: "100px",
              height: "8px",
              backgroundColor: "#F59E0B",
              margin: "0 auto",
              borderRadius: "4px",
            }} />
          </div>

          {/* Loading Bars */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "24px",
          }}>
            {[1,2,3,4,5].map(i => (
              <div key={i} style={{
                width: "8px",
                height: "40px",
                backgroundColor: "#1E3A8A",
                borderRadius: "4px",
                animation: `pulse 1s ease-in-out infinite ${i * 0.1}s`,
              }} />
            ))}
          </div>

          {/* Text */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#1E3A8A",
              marginBottom: "8px",
            }}>
              ABC BANK
            </div>
            <div style={{
              fontSize: "16px",
              color: "#6B7280",
            }}>
              Loading your profile
              <span style={{ display: "inline-block", animation: "pulse 1.5s infinite" }}>...</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{
            width: "100%",
            height: "4px",
            backgroundColor: "#EFF6FF",
            borderRadius: "2px",
            overflow: "hidden",
            marginBottom: "20px",
          }}>
            <div style={{
              width: "70%",
              height: "100%",
              background: "linear-gradient(90deg, #1E3A8A, #2563EB)",
              borderRadius: "2px",
              animation: "shimmer 1.5s infinite",
            }} />
          </div>

          {/* Security Badge */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "8px 16px",
            backgroundColor: "#EFF6FF",
            borderRadius: "30px",
            width: "fit-content",
            margin: "0 auto",
          }}>
            <FaLock size={12} color="#1E3A8A" />
            <span style={{ fontSize: "13px", color: "#1E3A8A", fontWeight: "500" }}>
              Secure Connection
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
        backgroundColor: "#FFFFFF",
        borderRadius: "24px",
        padding: "40px",
        maxWidth: "500px",
        margin: "20px auto",
        boxShadow: "0 10px 25px -5px rgba(30, 58, 138, 0.1)",
        border: "1px solid #E5E7EB",
      }}>
        <FaUserCircle size={64} color="#EF4444" />
        <p style={{ fontSize: "16px", color: "#111827", margin: "16px 0" }}>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            backgroundColor: "#1E3A8A",
            color: "white",
            border: "none",
            padding: "12px 32px",
            borderRadius: "30px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(30, 58, 138, 0.3)",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 16px rgba(30, 58, 138, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 12px rgba(30, 58, 138, 0.3)";
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  // No profile data
  if (!profile) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
        backgroundColor: "#FFFFFF",
        borderRadius: "24px",
        padding: "40px",
        maxWidth: "500px",
        margin: "20px auto",
        boxShadow: "0 10px 25px -5px rgba(30, 58, 138, 0.1)",
        border: "1px solid #E5E7EB",
      }}>
        <FaUserCircle size={64} color="#F59E0B" />
        <p style={{ fontSize: "16px", color: "#111827", margin: "16px 0" }}>No profile data found</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            backgroundColor: "#1E3A8A",
            color: "white",
            border: "none",
            padding: "12px 32px",
            borderRadius: "30px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(30, 58, 138, 0.3)",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 16px rgba(30, 58, 138, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 12px rgba(30, 58, 138, 0.3)";
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "24px",
        boxShadow: "0 10px 25px -5px rgba(30, 58, 138, 0.1)",
        padding: "32px",
        maxWidth: "1000px",
        margin: "20px auto",
        position: "relative",
        overflow: "hidden",
        border: "1px solid #E5E7EB",
      }} className="profile-card">
        {/* Bank Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          paddingBottom: "16px",
          borderBottom: "1px solid #E5E7EB",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              background: "#EFF6FF",
              padding: "8px",
              borderRadius: "10px",
            }}>
              <FaRegBuilding size={20} color="#1E3A8A" />
            </div>
            <span style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "#1E3A8A",
              letterSpacing: "0.5px",
            }}>ABC BANK</span>
          </div>
          <div className="badge">
            <FaShieldAlt size={12} />
            <span>Verified Account</span>
          </div>
        </div>

        {/* Gradient Line */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(135deg, #1E3A8A, #2563EB, #F59E0B)",
        }} />

        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          marginBottom: "32px",
          marginTop: "8px",
        }}>
          <div style={{
            position: "relative",
            filter: "drop-shadow(0 8px 16px rgba(30, 58, 138, 0.15))",
          }}>
            <FaUserCircle size={90} color="#1E3A8A" />
            <div style={{
              position: "absolute",
              bottom: "8px",
              right: "8px",
              width: "16px",
              height: "16px",
              backgroundColor: "#10B981",
              border: "3px solid #FFFFFF",
              borderRadius: "50%",
              boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
            }} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#111827",
              margin: "0 0 8px 0",
              letterSpacing: "-0.5px",
            }}>
              {profile.firstName || "User"} {profile.lastName || ""}
            </h2>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#EFF6FF",
              padding: "8px 18px",
              borderRadius: "40px",
              width: "fit-content",
              border: "1px solid #E5E7EB",
            }}>
              <FaMapMarkerAlt size={14} color="#1E3A8A" />
              <span style={{
                fontSize: "15px",
                color: "#1E3A8A",
                fontWeight: "600",
              }}>
                {profile.city || "Chennai"}, {profile.state || "Tamil Nadu"}
              </span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
        }}>
          {/* Mobile */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "16px",
            backgroundColor: "#F9FAFB",
            borderRadius: "16px",
            border: "1px solid #E5E7EB",
            cursor: "pointer",
          }} className="detail-item">
            <div style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#EFF6FF",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1E3A8A",
              transition: "all 0.2s ease",
            }} className="icon-wrapper">
              <FaPhone size={20} />
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", letterSpacing: "0.5px" }}>MOBILE</span>
              <span style={{ fontSize: "15px", color: "#111827", fontWeight: "500" }}>{profile.mobileNumber || profile.mobile || "N/A"}</span>
            </div>
          </div>

          {/* Email */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "16px",
            backgroundColor: "#F9FAFB",
            borderRadius: "16px",
            border: "1px solid #E5E7EB",
            cursor: "pointer",
          }} className="detail-item">
            <div style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#EFF6FF",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1E3A8A",
              transition: "all 0.2s ease",
            }} className="icon-wrapper">
              <FaEnvelope size={20} />
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", letterSpacing: "0.5px" }}>EMAIL</span>
              <span style={{ fontSize: "15px", color: "#111827", fontWeight: "500" }}>{profile.email || "N/A"}</span>
            </div>
          </div>

          {/* Date of Birth */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "16px",
            backgroundColor: "#F9FAFB",
            borderRadius: "16px",
            border: "1px solid #E5E7EB",
            cursor: "pointer",
          }} className="detail-item">
            <div style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#EFF6FF",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1E3A8A",
              transition: "all 0.2s ease",
            }} className="icon-wrapper">
              <FaBirthdayCake size={20} />
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", letterSpacing: "0.5px" }}>DATE OF BIRTH</span>
              <span style={{ fontSize: "15px", color: "#111827", fontWeight: "500" }}>{formatDate(profile.dateOfBirth || profile.dob)}</span>
            </div>
          </div>

          {/* Address */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "16px",
            backgroundColor: "#F9FAFB",
            borderRadius: "16px",
            border: "1px solid #E5E7EB",
            cursor: "pointer",
          }} className="detail-item">
            <div style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#EFF6FF",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1E3A8A",
              transition: "all 0.2s ease",
            }} className="icon-wrapper">
              <FaHome size={20} />
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", letterSpacing: "0.5px" }}>ADDRESS</span>
              <span style={{ fontSize: "15px", color: "#111827", fontWeight: "500" }}>{profile.address || "N/A"}</span>
            </div>
          </div>

          {/* City */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "16px",
            backgroundColor: "#F9FAFB",
            borderRadius: "16px",
            border: "1px solid #E5E7EB",
            cursor: "pointer",
          }} className="detail-item">
            <div style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#EFF6FF",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1E3A8A",
              transition: "all 0.2s ease",
            }} className="icon-wrapper">
              <FaCity size={20} />
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", letterSpacing: "0.5px" }}>CITY</span>
              <span style={{ fontSize: "15px", color: "#111827", fontWeight: "500" }}>{profile.city || "N/A"}</span>
            </div>
          </div>

          {/* State */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "16px",
            backgroundColor: "#F9FAFB",
            borderRadius: "16px",
            border: "1px solid #E5E7EB",
            cursor: "pointer",
          }} className="detail-item">
            <div style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#EFF6FF",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1E3A8A",
              transition: "all 0.2s ease",
            }} className="icon-wrapper">
              <FaFlag size={20} />
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", letterSpacing: "0.5px" }}>STATE</span>
              <span style={{ fontSize: "15px", color: "#111827", fontWeight: "500" }}>{profile.state || "N/A"}</span>
            </div>
          </div>

          {/* Country */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "16px",
            backgroundColor: "#F9FAFB",
            borderRadius: "16px",
            border: "1px solid #E5E7EB",
            cursor: "pointer",
          }} className="detail-item">
            <div style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#EFF6FF",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1E3A8A",
              transition: "all 0.2s ease",
            }} className="icon-wrapper">
              <FaGlobe size={20} />
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", letterSpacing: "0.5px" }}>COUNTRY</span>
              <span style={{ fontSize: "15px", color: "#111827", fontWeight: "500" }}>{profile.country || "India"}</span>
            </div>
          </div>

          {/* Pincode */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "16px",
            backgroundColor: "#F9FAFB",
            borderRadius: "16px",
            border: "1px solid #E5E7EB",
            cursor: "pointer",
          }} className="detail-item">
            <div style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#EFF6FF",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1E3A8A",
              transition: "all 0.2s ease",
            }} className="icon-wrapper">
              <FaMapPin size={20} />
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600", letterSpacing: "0.5px" }}>PINCODE</span>
              <span style={{ fontSize: "15px", color: "#111827", fontWeight: "500" }}>{profile.pincode || profile.zipCode || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "16px",
          paddingTop: "20px",
          borderTop: "1px solid #E5E7EB",
        }}>
          <button 
            onClick={handleUpdateClick}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "linear-gradient(135deg, #1E3A8A, #2563EB)",
              color: "white",
              border: "none",
              borderRadius: "40px",
              padding: "12px 28px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(30, 58, 138, 0.3)",
              position: "relative",
              overflow: "hidden",
            }}
            className="update-button"
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 20px rgba(30, 58, 138, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 12px rgba(30, 58, 138, 0.3)";
            }}
          >
            <FaPenFancy size={16} style={{ position: "relative", zIndex: 2 }} />
            <span style={{ position: "relative", zIndex: 2 }}>Edit Profile</span>
            <span style={{
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              transition: "left 0.5s ease",
              zIndex: 1,
            }} className="button-glow" />
          </button>
        </div>
      </div>

      {/* Update Profile Modal */}
      {showUpdateForm && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "20px",
        }} onClick={handleCloseForm}>
          <div style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "28px",
            maxWidth: "700px",
            width: "100%",
            boxShadow: "0 20px 25px -5px rgba(30, 58, 138, 0.2)",
            overflow: "hidden",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            border: "1px solid #E5E7EB",
          }} className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "24px 28px",
              borderBottom: "1px solid #E5E7EB",
              background: "#F9FAFB",
            }}>
              <h3 style={{
                fontSize: "22px",
                fontWeight: "700",
                color: "#111827",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}>
                <FaEdit size={20} color="#1E3A8A" />
                Edit Profile Information
              </h3>
              <button 
                onClick={handleCloseForm}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "18px",
                  color: "#6B7280",
                  cursor: "pointer",
                  padding: "8px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                  backgroundColor: "#E5E7EB",
                  width: "38px",
                  height: "38px",
                }}
                className="close-button"
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#FEE2E2";
                  e.target.style.color = "#EF4444";
                  e.target.style.transform = "rotate(90deg)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#E5E7EB";
                  e.target.style.color = "#6B7280";
                  e.target.style.transform = "rotate(0deg)";
                }}
              >
                <FaTimes />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ padding: "28px", overflowY: "auto", flex: 1 }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "20px",
                marginBottom: "24px",
              }}>
                {/* Mobile Number */}
                <div style={{ gridColumn: "span 2", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}>
                    <FaPhone size={14} color="#1E3A8A" /> Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber || formData.mobile || ''}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: `1px solid ${touchedFields.mobileNumber && formErrors.mobile ? "#EF4444" : (touchedFields.mobileNumber && !formErrors.mobile ? "#10B981" : "#E5E7EB")}`,
                      fontSize: "15px",
                      backgroundColor: touchedFields.mobileNumber && formErrors.mobile ? "#FEE2E2" : "#F9FAFB",
                      color: "#111827",
                      transition: "all 0.2s ease",
                      outline: "none",
                    }}
                    className="form-input"
                    placeholder="Enter 10-digit mobile number"
                    required
                  />
                  {touchedFields.mobileNumber && formErrors.mobile && (
                    <div style={{ color: "#EF4444", fontSize: "12px", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                      <span>⚠️</span> {formErrors.mobile}
                    </div>
                  )}
                  {touchedFields.mobileNumber && !formErrors.mobile && formData.mobileNumber && (
                    <div style={{ color: "#10B981", fontSize: "12px", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                      <FaCheckCircle /> Valid mobile number
                    </div>
                  )}
                </div>

                {/* Address */}
                <div style={{ gridColumn: "span 2", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}>
                    <FaRoad size={14} color="#1E3A8A" /> Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address || ''}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: `1px solid ${touchedFields.address && formErrors.address ? "#EF4444" : (touchedFields.address && !formErrors.address ? "#10B981" : "#E5E7EB")}`,
                      fontSize: "15px",
                      backgroundColor: touchedFields.address && formErrors.address ? "#FEE2E2" : "#F9FAFB",
                      color: "#111827",
                      transition: "all 0.2s ease",
                      resize: "vertical",
                      minHeight: "80px",
                      outline: "none",
                    }}
                    className="form-input"
                    rows="2"
                    placeholder="Enter your full address"
                    required
                  />
                  {touchedFields.address && formErrors.address && (
                    <div style={{ color: "#EF4444", fontSize: "12px", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                      <span>⚠️</span> {formErrors.address}
                    </div>
                  )}
                  {touchedFields.address && !formErrors.address && formData.address && (
                    <div style={{ color: "#10B981", fontSize: "12px", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                      <FaCheckCircle /> Valid address
                    </div>
                  )}
                </div>

                {/* City */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}>
                    <FaCity size={14} color="#1E3A8A" /> City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city || ''}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: `1px solid ${touchedFields.city && formErrors.city ? "#EF4444" : (touchedFields.city && !formErrors.city ? "#10B981" : "#E5E7EB")}`,
                      fontSize: "15px",
                      backgroundColor: touchedFields.city && formErrors.city ? "#FEE2E2" : "#F9FAFB",
                      color: "#111827",
                      transition: "all 0.2s ease",
                      outline: "none",
                    }}
                    className="form-input"
                    placeholder="Enter city name"
                    required
                  />
                  {touchedFields.city && formErrors.city && (
                    <div style={{ color: "#EF4444", fontSize: "12px", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                      <span>⚠️</span> {formErrors.city}
                    </div>
                  )}
                  {touchedFields.city && !formErrors.city && formData.city && (
                    <div style={{ color: "#10B981", fontSize: "12px", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                      <FaCheckCircle /> Valid city
                    </div>
                  )}
                </div>

                {/* State */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}>
                    <FaFlag size={14} color="#1E3A8A" /> State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state || ''}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: `1px solid ${touchedFields.state && formErrors.state ? "#EF4444" : (touchedFields.state && !formErrors.state ? "#10B981" : "#E5E7EB")}`,
                      fontSize: "15px",
                      backgroundColor: touchedFields.state && formErrors.state ? "#FEE2E2" : "#F9FAFB",
                      color: "#111827",
                      transition: "all 0.2s ease",
                      outline: "none",
                    }}
                    className="form-input"
                    placeholder="Enter state name"
                    required
                  />
                  {touchedFields.state && formErrors.state && (
                    <div style={{ color: "#EF4444", fontSize: "12px", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                      <span>⚠️</span> {formErrors.state}
                    </div>
                  )}
                  {touchedFields.state && !formErrors.state && formData.state && (
                    <div style={{ color: "#10B981", fontSize: "12px", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                      <FaCheckCircle /> Valid state
                    </div>
                  )}
                </div>

                {/* Country */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}>
                    <FaGlobe size={14} color="#1E3A8A" /> Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country || 'India'}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: `1px solid ${touchedFields.country && formErrors.country ? "#EF4444" : (touchedFields.country && !formErrors.country ? "#10B981" : "#E5E7EB")}`,
                      fontSize: "15px",
                      backgroundColor: touchedFields.country && formErrors.country ? "#FEE2E2" : "#F9FAFB",
                      color: "#111827",
                      transition: "all 0.2s ease",
                      outline: "none",
                    }}
                    className="form-input"
                    placeholder="Enter country name"
                    required
                  />
                  {touchedFields.country && formErrors.country && (
                    <div style={{ color: "#EF4444", fontSize: "12px", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                      <span>⚠️</span> {formErrors.country}
                    </div>
                  )}
                  {touchedFields.country && !formErrors.country && formData.country && (
                    <div style={{ color: "#10B981", fontSize: "12px", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                      <FaCheckCircle /> Valid country
                    </div>
                  )}
                </div>

                {/* Pincode */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}>
                    <FaMapPin size={14} color="#1E3A8A" /> Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode || formData.zipCode || ''}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: `1px solid ${touchedFields.pincode && formErrors.pincode ? "#EF4444" : (touchedFields.pincode && !formErrors.pincode ? "#10B981" : "#E5E7EB")}`,
                      fontSize: "15px",
                      backgroundColor: touchedFields.pincode && formErrors.pincode ? "#FEE2E2" : "#F9FAFB",
                      color: "#111827",
                      transition: "all 0.2s ease",
                      outline: "none",
                    }}
                    className="form-input"
                    placeholder="Enter 6-digit pincode"
                    required
                  />
                  {touchedFields.pincode && formErrors.pincode && (
                    <div style={{ color: "#EF4444", fontSize: "12px", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                      <span>⚠️</span> {formErrors.pincode}
                    </div>
                  )}
                  {touchedFields.pincode && !formErrors.pincode && (formData.pincode || formData.zipCode) && (
                    <div style={{ color: "#10B981", fontSize: "12px", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                      <FaCheckCircle /> Valid pincode
                    </div>
                  )}
                </div>
              </div>

              {/* Form Actions */}
              <div style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "16px",
                marginTop: "16px",
                paddingTop: "20px",
                borderTop: "1px solid #E5E7EB",
              }}>
                <button 
                  type="button" 
                  onClick={handleCloseForm}
                  style={{
                    backgroundColor: "#F9FAFB",
                    color: "#111827",
                    border: "1px solid #E5E7EB",
                    padding: "12px 24px",
                    borderRadius: "12px",
                    fontSize: "15px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#E5E7EB";
                    e.target.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#F9FAFB";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  <FaTimes /> Cancel
                </button>
                <button 
                  type="submit" 
                  style={{
                    background: "linear-gradient(135deg, #1E3A8A, #2563EB)",
                    color: "white",
                    border: "none",
                    padding: "12px 28px",
                    borderRadius: "12px",
                    fontSize: "15px",
                    fontWeight: "600",
                    cursor: isFormValid() ? "pointer" : "not-allowed",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    opacity: isFormValid() ? 1 : 0.6,
                    boxShadow: "0 4px 12px rgba(30, 58, 138, 0.3)",
                  }}
                  disabled={updating || !isFormValid()}
                  onMouseEnter={(e) => {
                    if (isFormValid()) {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 8px 20px rgba(30, 58, 138, 0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isFormValid()) {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 4px 12px rgba(30, 58, 138, 0.3)";
                    }
                  }}
                >
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