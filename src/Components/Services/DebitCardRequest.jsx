import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaCreditCard, 
  FaNetworkWired, 
  FaQuestionCircle, 
  FaGlobeAmericas,
  FaMapMarkerAlt,
  FaStickyNote,
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaShieldAlt,
  FaBuilding
} from "react-icons/fa";

const DebitCardRequest = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    accountNumber: "",
    cardTypeId: "",
    networkTypeId: "",
    applyReasonId: "",
    usageType: "",
    deliveryAddress: "",
    remarks: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    ssnLastFour: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = "Account number is required";
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }

    if (!formData.applyReasonId) {
      newErrors.applyReasonId = "Please select a reason";
    }

    if (!formData.cardTypeId) {
      newErrors.cardTypeId = "Please select card type";
    }

    if (!formData.networkTypeId) {
      newErrors.networkTypeId = "Please select network type";
    }

    if (!formData.usageType) {
      newErrors.usageType = "Please select usage type";
    }

    // SSN required only if NOT New Card
    if (formData.applyReasonId !== "1") {
      if (!formData.ssnLastFour.trim()) {
        newErrors.ssnLastFour = "Last 4 SSN digits required";
      }
    }

    if (!formData.deliveryAddress.trim()) {
      newErrors.deliveryAddress = "Delivery address is required";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear SSN if New Card selected
    if (name === "applyReasonId" && value === "1") {
      setFormData(prev => ({
        ...prev,
        applyReasonId: value,
        ssnLastFour: ""
      }));
      return;
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);

      await new Promise(resolve => setTimeout(resolve, 1000));

      alert("Debit Card Request Submitted Successfully!");
      navigate("/services/debit-card");

      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <div style={styles.header}>
          <div style={styles.headerIcon}>
            <FaCreditCard size={32} color="#4361ee" />
          </div>
          <h1 style={styles.headerTitle}>Debit Card Request</h1>
          <p style={styles.headerSubtitle}>Fill out the form below to apply for a new debit card</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>

          {/* Account Number */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              <FaBuilding style={styles.labelIcon} /> Account Number *
            </label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              placeholder="9-12 digits"
              style={styles.input(errors.accountNumber)}
            />
            {errors.accountNumber && <span style={styles.error}>{errors.accountNumber}</span>}
          </div>

          {/* Full Name */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              <FaUserCircle style={styles.labelIcon} /> Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John David Smith"
              style={styles.input(errors.fullName)}
            />
            {errors.fullName && <span style={styles.error}>{errors.fullName}</span>}
          </div>

          {/* Email */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              <FaEnvelope style={styles.labelIcon} /> Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john.smith@email.com"
              style={styles.input(errors.email)}
            />
            {errors.email && <span style={styles.error}>{errors.email}</span>}
          </div>

          {/* Phone */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              <FaPhone style={styles.labelIcon} /> Phone Number *
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="(555) 123-4567"
              style={styles.input(errors.phoneNumber)}
            />
            {errors.phoneNumber && <span style={styles.error}>{errors.phoneNumber}</span>}
          </div>

          {/* Request Type */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              <FaQuestionCircle style={styles.labelIcon} /> Request Type *
            </label>
            <select
              name="applyReasonId"
              value={formData.applyReasonId}
              onChange={handleChange}
              style={styles.input(errors.applyReasonId)}
            >
              <option value="">Select Request Type</option>
              <option value="1">New Card Application</option>
              <option value="2">Card Replacement</option>
              <option value="3">Lost/Stolen Card</option>
              <option value="4">Damaged Card</option>
              <option value="5">Card Upgrade</option>
            </select>
            {errors.applyReasonId && <span style={styles.error}>{errors.applyReasonId}</span>}
          </div>

          

          {/* Card Type */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              <FaCreditCard style={styles.labelIcon} /> Card Type *
            </label>
            <select
              name="cardTypeId"
              value={formData.cardTypeId}
              onChange={handleChange}
              style={styles.input(errors.cardTypeId)}
            >
              <option value="">Select Card Type</option>
              <option value="1">Platinum - $0 annual fee</option>
              <option value="2">Gold - $25 annual fee</option>
              <option value="3">Silver - $15 annual fee</option>
            </select>
            {errors.cardTypeId && <span style={styles.error}>{errors.cardTypeId}</span>}
          </div>

          {/* Network Type */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              <FaNetworkWired style={styles.labelIcon} /> Network Type *
            </label>
            <select
              name="networkTypeId"
              value={formData.networkTypeId}
              onChange={handleChange}
              style={styles.input(errors.networkTypeId)}
            >
              <option value="">Select Network</option>
              <option value="1">Visa</option>
              <option value="2">Mastercard</option>
            </select>
            {errors.networkTypeId && <span style={styles.error}>{errors.networkTypeId}</span>}
          </div>

          {/* Usage Type */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              <FaGlobeAmericas style={styles.labelIcon} /> Usage Type *
            </label>
            <select
              name="usageType"
              value={formData.usageType}
              onChange={handleChange}
              style={styles.input(errors.usageType)}
            >
              <option value="">Select Usage Type</option>
              <option value="domestic">Domestic Use Only</option>
              <option value="international">International Travel</option>
             
            </select>
            {errors.usageType && <span style={styles.error}>{errors.usageType}</span>}
          </div>

          {/* SSN (Conditional) */}
          {formData.applyReasonId !== "1" && (
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <FaShieldAlt style={styles.labelIcon} /> SSN Last 4 Digits *
              </label>
              <input
                type="password"
                name="ssnLastFour"
                value={formData.ssnLastFour}
                onChange={handleChange}
                maxLength="4"
                placeholder="●●●●"
                style={styles.input(errors.ssnLastFour)}
              />
              {errors.ssnLastFour && <span style={styles.error}>{errors.ssnLastFour}</span>}
            </div>
          )}

          {/* Delivery Address */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              <FaMapMarkerAlt style={styles.labelIcon} /> Delivery Address *
            </label>
            <textarea
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleChange}
              placeholder="123 Main Street, Apt 4B, New York, NY 10001"
              rows="3"
              style={styles.textarea(errors.deliveryAddress)}
            />
            {errors.deliveryAddress && <span style={styles.error}>{errors.deliveryAddress}</span>}
          </div>

          {/* Remarks */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              <FaStickyNote style={styles.labelIcon} /> Remarks (Optional)
            </label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Any special instructions or additional information..."
              rows="3"
              style={styles.textarea(false)}
            />
          </div>

          {/* Submit Button - No Terms & Conditions */}
          <button type="submit" style={styles.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div style={styles.loadingSpinner}></div>
                Submitting...
              </>
            ) : (
              "Submit Request"
            )}
          </button>

        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  formWrapper: {
    width: "100%",
    maxWidth: "800px",
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
    border: "1px solid #e2e8f0",
    overflow: "hidden"
  },
  header: {
    background: "linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)",
    color: "#ffffff",
    padding: "40px",
    textAlign: "center"
  },
  headerIcon: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px"
  },
  headerTitle: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "8px",
    letterSpacing: "0.5px"
  },
  headerSubtitle: {
    fontSize: "18px",
    opacity: "0.9",
    fontWeight: "300",
    letterSpacing: "0.3px"
  },
  form: {
    padding: "40px",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  formGroup: {
    display: "flex",
    flexDirection: "column"
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "8px"
  },
  labelIcon: {
    color: "#64748b",
    fontSize: "14px"
  },
  input: (hasError) => ({
    width: "100%",
    padding: "14px 16px",
    borderRadius: "10px",
    border: hasError ? "2px solid #ef4444" : "1px solid #d1d5db",
    fontSize: "15px",
    backgroundColor: "#ffffff",
    color: "#1e293b",
    fontWeight: "500",
    transition: "all 0.2s ease",
    outline: "none",
    fontFamily: "inherit",
    "&:focus": {
      borderColor: hasError ? "#ef4444" : "#4361ee",
      boxShadow: hasError ? "0 0 0 3px rgba(239, 68, 68, 0.1)" : "0 0 0 3px rgba(67, 97, 238, 0.1)",
    },
    "&::placeholder": {
      color: "#9ca3af"
    }
  }),
  textarea: (hasError) => ({
    width: "100%",
    padding: "14px 16px",
    borderRadius: "10px",
    border: hasError ? "2px solid #ef4444" : "1px solid #d1d5db",
    fontSize: "15px",
    backgroundColor: "#ffffff",
    color: "#1e293b",
    fontWeight: "500",
    transition: "all 0.2s ease",
    outline: "none",
    resize: "vertical",
    fontFamily: "inherit",
    minHeight: "100px",
    "&:focus": {
      borderColor: hasError ? "#ef4444" : "#4361ee",
      boxShadow: hasError ? "0 0 0 3px rgba(239, 68, 68, 0.1)" : "0 0 0 3px rgba(67, 97, 238, 0.1)",
    }
  }),
  error: {
    color: "#ef4444",
    fontSize: "13px",
    marginTop: "6px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "6px"
  },
  submitBtn: {
    width: "100%",
    padding: "16px",
    background: "linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    "&:hover:not(:disabled)": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(67, 97, 238, 0.3)"
    },
    "&:disabled": {
      opacity: "0.7",
      cursor: "not-allowed"
    }
  },
  loadingSpinner: {
    width: "20px",
    height: "20px",
    border: "3px solid rgba(255,255,255,0.3)",
    borderRadius: "50%",
    borderTopColor: "#ffffff",
    animation: "spin 1s linear infinite"
  }
};

// Add CSS animations
const addStyles = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    select {
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right 16px center;
      background-size: 16px;
      padding-right: 40px !important;
    }
  `;
  document.head.appendChild(style);
};

addStyles();

export default DebitCardRequest;