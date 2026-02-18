
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
  FaPenFancy,
  FaCheckCircle
} from "react-icons/fa";
import API from "../../api";
import { useSnackbar } from "../../Context/SnackbarContext";

const ProfileBar = () => {
  const { showSnackbar } = useSnackbar();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

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
      
      const response = await API.put(`users/updateContact/${userId}`, formData);
      
      console.log("Update Response:", response.data);
      
      if (response.data?.status || response.data) {
        setProfile(formData);
        
        // Show success snackbar at bottom right corner
        showSnackbar("success", "Profile updated successfully!");
        
        setShowUpdateForm(false);
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

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch (e) {
      return "";
    }
  };

  // Loading animation
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.bankLoader}>
          <div style={styles.bankIcon}>
            <div style={styles.bankRoof}></div>
            <div style={styles.bankBody}>
              <div style={styles.bankColumn}></div>
              <div style={styles.bankColumn}></div>
              <div style={styles.bankColumn}></div>
            </div>
            <div style={styles.bankBase}></div>
          </div>
          
          <div style={styles.loaderBars}>
            <div style={styles.loaderBar}></div>
            <div style={styles.loaderBar}></div>
            <div style={styles.loaderBar}></div>
            <div style={styles.loaderBar}></div>
            <div style={styles.loaderBar}></div>
          </div>
          
          <div style={styles.loadingTextWrapper}>
            <span style={styles.loadingBankName}>ABC Bank</span>
            <span style={styles.loadingMessage}>Loading your profile</span>
            <span style={styles.loadingDots}>
              <span style={styles.dot}>.</span>
              <span style={styles.dot}>.</span>
              <span style={styles.dot}>.</span>
            </span>
          </div>
          
          <div style={styles.progressContainer}>
            <div style={styles.progressBar}></div>
          </div>
          
          <div style={styles.securityBadge}>
            <span style={styles.lockIcon}>🔒</span>
            <span style={styles.securityText}>Secure Connection</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={styles.errorContainer}>
        <FaUserCircle size={48} color="#94a3b8" />
        <p style={styles.errorText}>{error}</p>
        <button style={styles.retryButton} onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  // No profile data
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
        <div style={styles.bankHeader}>
          <span style={styles.bankName}>ABC Bank</span>
          <div style={styles.bankBadge}>
            <span style={styles.badgeText}>PROD</span>
            <span style={styles.versionText}>v2.5.0</span>
          </div>
        </div>
        
        <div style={styles.gradientLine}></div>
        
        <div style={styles.header}>
          <div style={styles.avatarContainer}>
            <FaUserCircle size={90} color="#1e4b8a" />
            <div style={styles.onlineIndicator}></div>
          </div>
          <div style={styles.headerInfo}>
            <h2 style={styles.name}>
              {profile.firstName || "User"} {profile.lastName || ""}
            </h2>
            <div style={styles.locationBadge}>
              <FaMapMarkerAlt size={14} color="#1e4b8a" />
              <span style={styles.location}>
                {profile.city || "Chennai"}, {profile.state || "Tamil Nadu"}
              </span>
            </div>
          </div>
        </div>

        <div style={styles.detailsGrid}>
          <div style={styles.detailItem}>
            <div style={styles.iconWrapper}>
              <FaEnvelope style={styles.icon} />
            </div>
            <div style={styles.detailContent}>
              <span style={styles.detailLabel}>EMAIL</span>
              <span style={styles.detailValue}>{profile.email || "N/A"}</span>
            </div>
          </div>

          <div style={styles.detailItem}>
            <div style={styles.iconWrapper}>
              <FaPhone style={styles.icon} />
            </div>
            <div style={styles.detailContent}>
              <span style={styles.detailLabel}>MOBILE</span>
              <span style={styles.detailValue}>{profile.mobileNumber || profile.mobile || "N/A"}</span>
            </div>
          </div>

          <div style={styles.detailItem}>
            <div style={styles.iconWrapper}>
              <FaBirthdayCake style={styles.icon} />
            </div>
            <div style={styles.detailContent}>
              <span style={styles.detailLabel}>DATE OF BIRTH</span>
              <span style={styles.detailValue}>{formatDate(profile.dateOfBirth || profile.dob)}</span>
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
              <span style={styles.detailValue}>{profile.pincode || profile.zipCode || "N/A"}</span>
            </div>
          </div>
        </div>

        <div style={styles.buttonContainer}>
          <button style={styles.updateButton} onClick={handleUpdateClick}>
            <FaPenFancy style={styles.updateIcon} />
            <span style={styles.updateButtonText}>Edit Profile</span>
            <span style={styles.updateButtonGlow}></span>
          </button>
          
          <div style={styles.branchInfo}>
            <span style={styles.branchText}>Main Branch · NYC</span>
            <span style={styles.weatherInfo}>28°C ☀️</span>
          </div>
        </div>
      </div>

      {/* Update Profile Modal - Only Editable Fields */}
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
                {/* Mobile Number - Editable */}
                <div style={styles.formGroupFull}>
                  <label style={styles.label}>
                    <FaMobile style={styles.labelIcon} /> Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber || formData.mobile || ''}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter mobile number"
                    required
                  />
                </div>

                {/* Address - Editable */}
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

                {/* City - Editable */}
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

                {/* State - Editable */}
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

                {/* Country - Editable */}
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

                {/* Pincode - Editable */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <FaMapPin style={styles.labelIcon} /> Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode || formData.zipCode || ''}
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

  // Loading styles
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "600px",
    backgroundColor: "#f8fafc",
  },

  bankLoader: {
    backgroundColor: "#ffffff",
    borderRadius: "32px",
    padding: "48px",
    boxShadow: "0 30px 60px rgba(0, 0, 0, 0.12), 0 10px 30px rgba(30, 75, 138, 0.1)",
    textAlign: "center",
    maxWidth: "450px",
    width: "90%",
    border: "1px solid rgba(30, 75, 138, 0.15)",
    position: "relative",
    overflow: "hidden",
  },

  bankIcon: {
    width: "100px",
    height: "100px",
    margin: "0 auto 30px",
    position: "relative",
    animation: "bankFloat 2s ease-in-out infinite",
  },

  bankRoof: {
    width: "0",
    height: "0",
    borderLeft: "50px solid transparent",
    borderRight: "50px solid transparent",
    borderBottom: "30px solid #1e4b8a",
    margin: "0 auto",
    position: "relative",
    top: "10px",
    zIndex: 2,
  },

  bankBody: {
    width: "80px",
    height: "50px",
    backgroundColor: "#2d5f9e",
    margin: "0 auto",
    borderRadius: "8px 8px 0 0",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "0 10px",
    position: "relative",
    zIndex: 1,
  },

  bankColumn: {
    width: "12px",
    height: "35px",
    backgroundColor: "#4a7db5",
    borderRadius: "4px 4px 0 0",
    animation: "columnPulse 1.5s ease-in-out infinite",
  },

  bankBase: {
    width: "100px",
    height: "8px",
    backgroundColor: "#1a3f6f",
    margin: "0 auto",
    borderRadius: "4px",
    position: "relative",
    top: "-2px",
  },

  loaderBars: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "25px",
  },

  loaderBar: {
    width: "8px",
    height: "40px",
    backgroundColor: "#1e4b8a",
    borderRadius: "4px",
    animation: "loaderBarWave 1s ease-in-out infinite",
  },

  loadingTextWrapper: {
    marginBottom: "25px",
    position: "relative",
  },

  loadingBankName: {
    display: "block",
    fontSize: "22px",
    fontWeight: "700",
    color: "#1e4b8a",
    marginBottom: "8px",
    letterSpacing: "1px",
    background: "linear-gradient(45deg, #1e4b8a, #3a7bd5)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },

  loadingMessage: {
    fontSize: "18px",
    color: "#475569",
    fontWeight: "500",
    marginRight: "4px",
  },

  loadingDots: {
    display: "inline-block",
  },

  dot: {
    display: "inline-block",
    fontSize: "24px",
    color: "#1e4b8a",
    animation: "dotPulse 1.5s ease-in-out infinite",
    opacity: 0,
  },

  progressContainer: {
    width: "100%",
    height: "6px",
    backgroundColor: "#e9ecef",
    borderRadius: "3px",
    overflow: "hidden",
    marginBottom: "20px",
  },

  progressBar: {
    width: "70%",
    height: "100%",
    background: "linear-gradient(90deg, #1e4b8a, #3a7bd5, #6aa6ff)",
    borderRadius: "3px",
    animation: "progressLoad 1.5s ease-in-out infinite",
  },

  securityBadge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "8px 16px",
    backgroundColor: "#f0f7ff",
    borderRadius: "40px",
    width: "fit-content",
    margin: "0 auto",
    border: "1px solid rgba(30, 75, 138, 0.2)",
  },

  lockIcon: {
    fontSize: "14px",
  },

  securityText: {
    fontSize: "13px",
    color: "#1e4b8a",
    fontWeight: "600",
  },

  errorContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "400px",
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    padding: "40px",
    maxWidth: "500px",
    margin: "20px auto",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
  },

  errorText: {
    fontSize: "16px",
    color: "#64748b",
    margin: "16px 0",
  },

  retryButton: {
    backgroundColor: "#1e4b8a",
    color: "white",
    border: "none",
    padding: "12px 32px",
    borderRadius: "30px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(30, 75, 138, 0.3)",
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
    maxWidth: "700px",
    width: "100%",
    boxShadow: "0 30px 60px rgba(0, 0, 0, 0.3)",
    animation: "slideUp 0.3s ease",
    overflow: "hidden",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
  },

  modalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 25px",
    borderBottom: "1px solid #eef2f6",
    background: "linear-gradient(135deg, #f8fafc, #ffffff)",
    flexShrink: 0,
  },

  modalTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#1e4b8a",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  modalTitleIcon: {
    fontSize: "20px",
  },

  closeButton: {
    background: "none",
    border: "none",
    fontSize: "20px",
    color: "#64748b",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    backgroundColor: "#f1f5f9",
    width: "40px",
    height: "40px",
  },

  form: {
    padding: "20px 25px",
    overflowY: "auto",
    flex: 1,
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    marginBottom: "20px",
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
    color: "#1e4b8a",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  labelIcon: {
    fontSize: "16px",
    color: "#1e4b8a",
  },

  input: {
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    transition: "all 0.3s ease",
    ':focus': {
      borderColor: "#1e4b8a",
      boxShadow: "0 0 0 3px rgba(30, 75, 138, 0.1)",
      outline: "none",
    }
  },

  textarea: {
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    transition: "all 0.3s ease",
    resize: "vertical",
    ':focus': {
      borderColor: "#1e4b8a",
      boxShadow: "0 0 0 3px rgba(30, 75, 138, 0.1)",
      outline: "none",
    }
  },

  formActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "16px",
    marginTop: "10px",
  },

  cancelButton: {
    backgroundColor: "#f1f5f9",
    color: "#64748b",
    border: "none",
    padding: "12px 24px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    ':hover': {
      backgroundColor: "#e2e8f0",
    }
  },

  submitButton: {
    background: "linear-gradient(135deg, #1e4b8a, #2d5f9e)",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    ':hover': {
      background: "linear-gradient(135deg, #2d5f9e, #1e4b8a)",
      transform: "translateY(-1px)",
      boxShadow: "0 4px 12px rgba(30, 75, 138, 0.3)",
    }
  },
};

// Add keyframe animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes gradientMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes bankFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes columnPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }
  
  @keyframes loaderBarWave {
    0%, 100% { transform: scaleY(1); }
    50% { transform: scaleY(1.5); }
  }
  
  @keyframes dotPulse {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
  }
  
  @keyframes progressLoad {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  @keyframes slideUp {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;
document.head.appendChild(styleSheet);

export default ProfileBar;