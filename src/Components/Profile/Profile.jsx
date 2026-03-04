
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
  const [profile, setProfile]             = useState(null);
  const [loading, setLoading]             = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [formData, setFormData]           = useState({});
  const [formErrors, setFormErrors]       = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [updating, setUpdating]           = useState(false);
  const [error, setError]                 = useState(null);

  // ── Canara Bank Official Colour Palette ──────────────────────────────────
  const CB       = "#003087";
  const CB_LIGHT = "#0044B4";
  const CB_DARK  = "#001F5B";
  const CG       = "#F5A800";
  const CG_DARK  = "#D48F00";
  const CG_LIGHT = "#FFF3CC";
  const PAGE_BG  = "#F0F4FF";
  const BORDER   = "#C9D6F0";
  const TEXT     = "#0D1F4C";
  const TEXT_LT  = "#5A6F99";
  const SUCCESS  = "#0D8A4E";
  const SUC_LT   = "#D4F4E7";
  const DANGER   = "#C0392B";
  const DAN_LT   = "#FDECEA";
  // ────────────────────────────────────────────────────────────────────────

  // ── Global Styles ────────────────────────────────────────────────────────
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.id = "canara-profile-styles";
    styleSheet.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');

      :root {
        --cb:       #003087;
        --cb-light: #0044B4;
        --cb-dark:  #001F5B;
        --cg:       #F5A800;
        --cg-dark:  #D48F00;
        --cg-light: #FFF3CC;
        --page-bg:  #F0F4FF;
        --border:   #C9D6F0;
        --text:     #0D1F4C;
        --text-lt:  #5A6F99;
        --success:  #0D8A4E;
        --suc-lt:   #D4F4E7;
        --danger:   #C0392B;
        --dan-lt:   #FDECEA;
      }

      /* ── Keyframes ── */
      @keyframes fadeSlideUp {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes floatY {
        0%, 100% { transform: translateY(0); }
        50%       { transform: translateY(-7px); }
      }
      @keyframes spinRing {
        to { transform: rotate(360deg); }
      }
      @keyframes pulseDot {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.2; }
      }
      @keyframes shimmer {
        0%   { background-position: -800px 0; }
        100% { background-position:  800px 0; }
      }
      @keyframes progressSlide {
        0%   { transform: translateX(-100%); }
        100% { transform: translateX(260%); }
      }
      @keyframes barPulse {
        0%, 100% { transform: scaleY(0.55); }
        50%       { transform: scaleY(1.25); }
      }
      @keyframes glowSheen {
        0%   { left: -100%; }
        100% { left: 200%; }
      }

      /* ── Skeleton ── */
      .skel {
        border-radius: 6px;
        background: linear-gradient(90deg, #dce6f8 25%, #bfd0ee 50%, #dce6f8 75%);
        background-size: 800px 100%;
        animation: shimmer 1.6s infinite linear;
      }

      /* ── Profile card ── */
      .profile-card {
        animation: fadeSlideUp 0.45s ease;
        transition: box-shadow 0.3s;
      }
      .profile-card:hover {
        box-shadow: 0 20px 40px rgba(0,48,135,0.14) !important;
      }

      /* ── Detail items ── */
      .detail-item {
        transition: all 0.28s ease;
        animation: fadeSlideUp 0.4s ease both;
      }
      .detail-item:hover {
        transform: translateY(-3px);
        border-color: var(--cg) !important;
        box-shadow: 0 6px 18px rgba(0,48,135,0.1);
      }
      .detail-item:hover .icon-wrapper {
        background: var(--cb) !important;
        color: white !important;
        transform: scale(1.1) rotate(-5deg);
        box-shadow: 0 4px 12px rgba(0,48,135,0.25);
      }

      /* ── Edit Profile button ── */
      .update-button {
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
      }
      .update-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 24px rgba(0,48,135,0.32) !important;
      }
      .update-button:active { transform: translateY(0); }
      .button-sheen {
        position: absolute; top: 0; left: -100%;
        width: 60%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
        animation: none;
        transition: left 0.5s ease;
      }
      .update-button:hover .button-sheen { animation: glowSheen 0.55s ease forwards; }

      /* ── Modal ── */
      .modal-content { animation: fadeSlideUp 0.3s ease; }

      /* ── Form inputs ── */
      .form-input:focus {
        outline: none;
        border-color: var(--cb) !important;
        box-shadow: 0 0 0 3px rgba(0,48,135,0.1) !important;
        background-color: white !important;
      }
      .close-button:hover {
        background-color: var(--dan-lt) !important;
        color: var(--danger) !important;
        transform: rotate(90deg) !important;
      }

      /* ── Badge ── */
      .badge {
        display: inline-flex; align-items: center; gap: 6px;
        padding: 5px 14px;
        background: var(--cg-light);
        color: var(--cb-dark);
        border-radius: 30px;
        font-size: 12px; font-weight: 700;
        border: 1px solid var(--cg);
        letter-spacing: 0.3px;
      }

      /* ── Loading bars ── */
      .load-bar {
        width: 8px; border-radius: 4px;
        background: var(--cb);
        transform-origin: bottom;
      }
      .load-bar-1 { animation: barPulse 0.9s ease-in-out 0.0s infinite; }
      .load-bar-2 { animation: barPulse 0.9s ease-in-out 0.1s infinite; }
      .load-bar-3 { animation: barPulse 0.9s ease-in-out 0.2s infinite; }
      .load-bar-4 { animation: barPulse 0.9s ease-in-out 0.3s infinite; }
      .load-bar-5 { animation: barPulse 0.9s ease-in-out 0.4s infinite; }

      .dot-1 { animation: pulseDot 1.2s ease-in-out 0.0s infinite; }
      .dot-2 { animation: pulseDot 1.2s ease-in-out 0.2s infinite; }
      .dot-3 { animation: pulseDot 1.2s ease-in-out 0.4s infinite; }

      .logo-float { animation: floatY 3s ease-in-out infinite; }

      *:focus-visible { outline: 2px solid var(--cb); outline-offset: 2px; }
    `;
    document.head.appendChild(styleSheet);
    return () => document.getElementById("canara-profile-styles")?.remove();
  }, []);
  // ────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) { setError("No user ID found. Please log in again."); setLoading(false); return; }
        const response = await API.get(`users/details/${userId}`);
        if (response.data?.data) { setProfile(response.data.data); setFormData(response.data.data); }
        else if (response.data)  { setProfile(response.data);       setFormData(response.data); }
        else setError("No profile data found");
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load profile. Please try again.");
      } finally { setLoading(false); }
    };
    fetchProfile();
  }, []);

  // ── Validation ───────────────────────────────────────────────────────────
  const validateMobileNumber = v => (!v||v.trim()==="") ? "Mobile number is required" : !/^[0-9]{10}$/.test(v) ? "Mobile number must be 10 digits" : "";
  const validateAddress      = v => (!v||v.trim()==="") ? "Address is required" : v.trim().length<5 ? "Address must be at least 5 characters" : v.trim().length>200 ? "Address must not exceed 200 characters" : "";
  const validateCity         = v => (!v||v.trim()==="") ? "City is required" : !/^[a-zA-Z\s]{2,50}$/.test(v) ? "City must contain only letters and spaces (2-50 characters)" : "";
  const validateState        = v => (!v||v.trim()==="") ? "State is required" : !/^[a-zA-Z\s]{2,50}$/.test(v) ? "State must contain only letters and spaces (2-50 characters)" : "";
  const validateCountry      = v => (!v||v.trim()==="") ? "Country is required" : !/^[a-zA-Z\s]{2,50}$/.test(v) ? "Country must contain only letters and spaces (2-50 characters)" : "";
  const validatePincode      = v => (!v||v.trim()==="") ? "Pincode is required" : !/^[0-9]{6}$/.test(v) ? "Pincode must be 6 digits" : "";

  const validateField = (name, value) => {
    switch (name) {
      case "mobileNumber": case "mobile": return validateMobileNumber(value);
      case "address":  return validateAddress(value);
      case "city":     return validateCity(value);
      case "state":    return validateState(value);
      case "country":  return validateCountry(value);
      case "pincode":  case "zipCode": return validatePincode(value);
      default: return "";
    }
  };

  const validateForm = (data) => {
    const errors = {};
    const mob = validateMobileNumber(data.mobileNumber || data.mobile || ""); if (mob) errors.mobile = mob;
    const adr = validateAddress(data.address || "");     if (adr) errors.address = adr;
    const cit = validateCity(data.city || "");           if (cit) errors.city = cit;
    const sta = validateState(data.state || "");         if (sta) errors.state = sta;
    const cou = validateCountry(data.country || "");     if (cou) errors.country = cou;
    const pin = validatePincode(data.pincode || data.zipCode || ""); if (pin) errors.pincode = pin;
    return errors;
  };

  const isFormValid = () => Object.keys(validateForm(formData)).length === 0;

  const handleUpdateClick  = () => { setShowUpdateForm(true); setFormErrors({}); setTouchedFields({}); };
  const handleCloseForm    = () => { setShowUpdateForm(false); setFormErrors({}); setTouchedFields({}); };

  const handleInputChange  = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    setFormErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    setFormErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);
    const allTouched = {};
    Object.keys(formData).forEach(k => { allTouched[k] = true; });
    setTouchedFields(allTouched);
    if (Object.keys(errors).length > 0) { showSnackbar("error", "Please fix all validation errors before submitting"); return; }
    setUpdating(true);
    try {
      const userId = localStorage.getItem("userId");
      const response = await API.put(`users/updateContact/${userId}`, formData);
      if (response.data?.status || response.data) {
        setProfile(formData);
        showSnackbar("success", "Profile updated successfully!");
        setShowUpdateForm(false); setFormErrors({}); setTouchedFields({});
      }
    } catch (error) {
      showSnackbar("error", error.response?.data?.message || "Failed to update profile. Please try again.");
    } finally { setUpdating(false); }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const d = new Date(dateString);
      return `${String(d.getDate()).padStart(2,'0')}-${String(d.getMonth()+1).padStart(2,'0')}-${d.getFullYear()}`;
    } catch { return dateString; }
  };

  // ── Input border helper ──────────────────────────────────────────────────
  const inputBorder = (field, errKey) => {
    if (touchedFields[field] && formErrors[errKey]) return `1.5px solid ${DANGER}`;
    if (touchedFields[field] && !formErrors[errKey]) return `1.5px solid ${SUCCESS}`;
    return `1.5px solid ${BORDER}`;
  };
  const inputBg = (field, errKey) =>
    touchedFields[field] && formErrors[errKey] ? DAN_LT : "white";

  // ── Field feedback ───────────────────────────────────────────────────────
  const FieldFeedback = ({ touched, error, validMsg }) => {
    if (!touched) return null;
    if (error) return (
      <div style={{ color: DANGER, fontSize: "12px", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
        <span>⚠️</span> {error}
      </div>
    );
    return (
      <div style={{ color: SUCCESS, fontSize: "12px", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
        <FaCheckCircle /> {validMsg}
      </div>
    );
  };

  // ── Loading screen ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "600px", backgroundColor: PAGE_BG }}>
        <div style={{ backgroundColor: "white", borderRadius: "24px", padding: "48px 40px", boxShadow: `0 12px 32px rgba(0,48,135,0.12)`, textAlign: "center", maxWidth: "400px", width: "90%", border: `1px solid ${BORDER}` }}>

          {/* Floating brand logo */}
          <div className="logo-float" style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
              <div style={{ background: `linear-gradient(135deg, ${CB_DARK}, ${CB})`, borderRadius: "10px", padding: "8px 10px", display: "flex" }}>
                <FaRegBuilding color={CG} size={20} />
              </div>
              <span style={{ fontSize: "20px", fontWeight: "700", color: CB, letterSpacing: "1.5px", fontFamily: "'DM Sans', sans-serif" }}>ABC BANK</span>
            </div>
          </div>

          {/* Gold accent line */}
          <div style={{ width: "60px", height: "4px", background: `linear-gradient(90deg, ${CG}, ${CG_DARK})`, borderRadius: "2px", margin: "0 auto 28px" }} />

          {/* Animated bar chart */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: "6px", height: "52px", marginBottom: "26px" }}>
            {["load-bar-1","load-bar-2","load-bar-3","load-bar-4","load-bar-5"].map((cls, i) => (
              <div key={i} className={`load-bar ${cls}`} style={{ height: `${28 + i * 5}px` }} />
            ))}
          </div>

          {/* Label with pulse dots */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", fontSize: "15px", color: TEXT_LT, fontWeight: "600", marginBottom: "22px", fontFamily: "'DM Sans', sans-serif" }}>
            Loading your profile
            <span className="dot-1" style={{ color: CG, fontSize: "18px", lineHeight: 1 }}>●</span>
            <span className="dot-2" style={{ color: CG, fontSize: "18px", lineHeight: 1 }}>●</span>
            <span className="dot-3" style={{ color: CG, fontSize: "18px", lineHeight: 1 }}>●</span>
          </div>

          {/* Progress track */}
          <div style={{ width: "100%", height: "5px", background: "#EEF1FA", borderRadius: "3px", overflow: "hidden", marginBottom: "22px" }}>
            <div style={{ width: "40%", height: "100%", background: `linear-gradient(90deg, ${CB}, ${CG})`, borderRadius: "3px", animation: "progressSlide 1.6s ease-in-out infinite" }} />
          </div>

          {/* Skeleton profile preview */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px", padding: "14px", background: "#F7F9FF", borderRadius: "12px", border: `1px solid ${BORDER}` }}>
            <div className="skel" style={{ width: "52px", height: "52px", borderRadius: "50%", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div className="skel" style={{ width: "60%", height: "16px", marginBottom: "8px" }} />
              <div className="skel" style={{ width: "40%", height: "12px" }} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "22px" }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ display: "flex", gap: "10px", alignItems: "center", opacity: 1 - (i-1)*0.22 }}>
                <div className="skel" style={{ width: "36px", height: "36px", borderRadius: "10px", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div className="skel" style={{ width: "30%", height: "10px", marginBottom: "6px" }} />
                  <div className="skel" style={{ width: "55%", height: "14px" }} />
                </div>
              </div>
            ))}
          </div>

          {/* Secure badge */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", padding: "7px 18px", background: "#EBF0FF", borderRadius: "30px", fontSize: "12px", color: CB, fontWeight: "600", width: "fit-content", margin: "0 auto", fontFamily: "'DM Sans', sans-serif" }}>
            <FaLock size={11} color={CG} /> Secure Connection
          </div>
        </div>
      </div>
    );
  }

  // ── Error / No data screens ──────────────────────────────────────────────
  const PlaceholderScreen = ({ icon, color, message }) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "400px", backgroundColor: "white", borderRadius: "22px", padding: "40px", maxWidth: "500px", margin: "20px auto", boxShadow: `0 10px 25px rgba(0,48,135,0.08)`, border: `1px solid ${BORDER}` }}>
      {icon}
      <p style={{ fontSize: "15px", color: TEXT, margin: "16px 0" }}>{message}</p>
      <button onClick={() => window.location.reload()} style={{ background: `linear-gradient(135deg, ${CB}, ${CB_LIGHT})`, color: "white", border: "none", padding: "12px 32px", borderRadius: "30px", fontSize: "14px", fontWeight: "700", cursor: "pointer", boxShadow: `0 4px 14px rgba(0,48,135,0.28)`, fontFamily: "'DM Sans', sans-serif" }}
        onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; }}
        onMouseLeave={e => { e.target.style.transform = "translateY(0)"; }}>
        Retry
      </button>
    </div>
  );

  if (error)    return <PlaceholderScreen icon={<FaUserCircle size={64} color={DANGER} />} message={error} />;
  if (!profile) return <PlaceholderScreen icon={<FaUserCircle size={64} color={CG} />} message="No profile data found" />;

  // ── Detail card helper ───────────────────────────────────────────────────
  const DetailCard = ({ icon, label, value, delay = 0 }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px", backgroundColor: "#F7F9FF", borderRadius: "14px", border: `1px solid ${BORDER}`, cursor: "pointer", animationDelay: `${delay}ms` }} className="detail-item">
      <div style={{ width: "46px", height: "46px", backgroundColor: CG_LIGHT, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: CB, transition: "all 0.25s ease", border: `1px solid ${CG}` }} className="icon-wrapper">
        {icon}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "3px" }}>
        <span style={{ fontSize: "11px", color: TEXT_LT, fontWeight: "700", letterSpacing: "0.8px" }}>{label}</span>
        <span style={{ fontSize: "14px", color: TEXT, fontWeight: "600", fontFamily: "'DM Sans', sans-serif" }}>{value}</span>
      </div>
    </div>
  );

  return (
    <>
      <div style={{ backgroundColor: "white", borderRadius: "22px", boxShadow: `0 8px 28px rgba(0,48,135,0.1)`, padding: "0", maxWidth: "1000px", margin: "20px auto", position: "relative", overflow: "hidden", border: `1px solid ${BORDER}` }} className="profile-card">

        {/* Top gradient accent bar */}
        <div style={{ height: "5px", background: `linear-gradient(90deg, ${CB_DARK} 0%, ${CB} 50%, ${CG} 100%)` }} />

        <div style={{ padding: "28px 32px 32px" }}>

          {/* ── Brand header ── */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", paddingBottom: "18px", borderBottom: `1px solid ${BORDER}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0", background: `linear-gradient(135deg, ${CB_DARK}, ${CB})`, borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ width: "5px", alignSelf: "stretch", background: `linear-gradient(180deg, ${CG}, ${CG_DARK})` }} />
              <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 16px" }}>
                <FaRegBuilding size={18} color={CG} />
                <span style={{ fontSize: "17px", fontWeight: "700", color: "white", letterSpacing: "1px" }}>ABC BANK</span>
              </div>
            </div>
            <div className="badge">
              <FaShieldAlt size={11} color={CG_DARK} />
              <span>Verified Account</span>
            </div>
          </div>

          {/* ── Profile header ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "32px" }}>
            <div style={{ position: "relative", filter: `drop-shadow(0 8px 16px rgba(0,48,135,0.15))` }}>
              <FaUserCircle size={90} color={CB} />
              <div style={{ position: "absolute", bottom: "8px", right: "8px", width: "16px", height: "16px", backgroundColor: SUCCESS, border: "3px solid white", borderRadius: "50%", boxShadow: `0 2px 8px rgba(13,138,78,0.35)` }} />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: "30px", fontWeight: "700", color: TEXT, margin: "0 0 10px", letterSpacing: "-0.5px", fontFamily: "'DM Sans', sans-serif" }}>
                {profile.firstName || "User"} {profile.lastName || ""}
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", background: CG_LIGHT, padding: "8px 18px", borderRadius: "40px", width: "fit-content", border: `1px solid ${CG}` }}>
                <FaMapMarkerAlt size={13} color={CG_DARK} />
                <span style={{ fontSize: "14px", color: CB_DARK, fontWeight: "700" }}>
                  {profile.city || "Chennai"}, {profile.state || "Tamil Nadu"}
                </span>
              </div>
            </div>
          </div>

          {/* ── Details grid ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px", marginBottom: "32px" }}>
            <DetailCard icon={<FaPhone size={18} />}        label="MOBILE"        value={profile.mobileNumber || profile.mobile || "N/A"} delay={0} />
            <DetailCard icon={<FaEnvelope size={18} />}     label="EMAIL"         value={profile.email || "N/A"} delay={50} />
            <DetailCard icon={<FaBirthdayCake size={18} />} label="DATE OF BIRTH" value={formatDate(profile.dateOfBirth || profile.dob)} delay={100} />
            <DetailCard icon={<FaHome size={18} />}         label="ADDRESS"       value={profile.address || "N/A"} delay={150} />
            <DetailCard icon={<FaCity size={18} />}         label="CITY"          value={profile.city || "N/A"} delay={200} />
            <DetailCard icon={<FaFlag size={18} />}         label="STATE"         value={profile.state || "N/A"} delay={250} />
            <DetailCard icon={<FaGlobe size={18} />}        label="COUNTRY"       value={profile.country || "India"} delay={300} />
            <DetailCard icon={<FaMapPin size={18} />}       label="PINCODE"       value={profile.pincode || profile.zipCode || "N/A"} delay={350} />
          </div>

          {/* ── Footer ── */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "20px", borderTop: `1px solid ${BORDER}` }}>
            <button onClick={handleUpdateClick} style={{ display: "flex", alignItems: "center", gap: "10px", background: `linear-gradient(135deg, ${CB_DARK}, ${CB_LIGHT})`, color: "white", border: "none", borderRadius: "40px", padding: "12px 28px", fontSize: "14px", fontWeight: "700", cursor: "pointer", boxShadow: `0 4px 14px rgba(0,48,135,0.28)`, position: "relative", overflow: "hidden", fontFamily: "'DM Sans', sans-serif" }} className="update-button">
              <FaPenFancy size={15} style={{ position: "relative", zIndex: 2 }} />
              <span style={{ position: "relative", zIndex: 2 }}>Edit Profile</span>
              <span className="button-sheen" />
            </button>
          </div>

        </div>
      </div>

      {/* ── Update Profile Modal ── */}
      {showUpdateForm && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" }} onClick={handleCloseForm}>
          <div style={{ backgroundColor: "white", borderRadius: "22px", maxWidth: "700px", width: "100%", boxShadow: `0 20px 40px rgba(0,48,135,0.2)`, overflow: "hidden", maxHeight: "90vh", display: "flex", flexDirection: "column", border: `1px solid ${BORDER}` }} className="modal-content" onClick={e => e.stopPropagation()}>

            {/* Modal header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 26px", borderBottom: `2px solid ${BORDER}`, background: `linear-gradient(90deg, ${CB_DARK}, ${CB})` }}>
              <h3 style={{ fontSize: "19px", fontWeight: "700", color: "white", margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
                <FaEdit size={18} color={CG} />
                Edit Profile Information
              </h3>
              <button onClick={handleCloseForm} style={{ background: "rgba(255,255,255,0.12)", border: "none", fontSize: "16px", color: "white", cursor: "pointer", padding: "7px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease", width: "36px", height: "36px" }} className="close-button"
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = DAN_LT; e.currentTarget.style.color = DANGER; e.currentTarget.style.transform = "rotate(90deg)"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "white"; e.currentTarget.style.transform = "rotate(0deg)"; }}>
                <FaTimes />
              </button>
            </div>

            {/* Gold accent line under header */}
            <div style={{ height: "4px", background: `linear-gradient(90deg, ${CG}, ${CG_DARK})` }} />

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ padding: "26px", overflowY: "auto", flex: 1 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "18px", marginBottom: "22px" }}>

                {/* ── Mobile ── */}
                <div style={{ gridColumn: "span 2", display: "flex", flexDirection: "column", gap: "7px" }}>
                  <label style={{ fontSize: "13px", fontWeight: "700", color: TEXT, display: "flex", alignItems: "center", gap: "8px" }}>
                    <FaPhone size={13} color={CB} /> Mobile Number
                  </label>
                  <input type="tel" name="mobileNumber" value={formData.mobileNumber || formData.mobile || ''} onChange={handleInputChange} onBlur={handleBlur}
                    style={{ padding: "12px 14px", borderRadius: "10px", border: inputBorder("mobileNumber","mobile"), fontSize: "14px", backgroundColor: inputBg("mobileNumber","mobile"), color: TEXT, outline: "none", fontFamily: "'DM Sans', sans-serif" }}
                    className="form-input" placeholder="Enter 10-digit mobile number" required />
                  <FieldFeedback touched={touchedFields.mobileNumber} error={formErrors.mobile} validMsg="Valid mobile number" />
                </div>

                {/* ── Address ── */}
                <div style={{ gridColumn: "span 2", display: "flex", flexDirection: "column", gap: "7px" }}>
                  <label style={{ fontSize: "13px", fontWeight: "700", color: TEXT, display: "flex", alignItems: "center", gap: "8px" }}>
                    <FaRoad size={13} color={CB} /> Address
                  </label>
                  <textarea name="address" value={formData.address || ''} onChange={handleInputChange} onBlur={handleBlur}
                    style={{ padding: "12px 14px", borderRadius: "10px", border: inputBorder("address","address"), fontSize: "14px", backgroundColor: inputBg("address","address"), color: TEXT, resize: "vertical", minHeight: "78px", outline: "none", fontFamily: "'DM Sans', sans-serif" }}
                    className="form-input" rows="2" placeholder="Enter your full address" required />
                  <FieldFeedback touched={touchedFields.address} error={formErrors.address} validMsg="Valid address" />
                </div>

                {/* ── City ── */}
                <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                  <label style={{ fontSize: "13px", fontWeight: "700", color: TEXT, display: "flex", alignItems: "center", gap: "8px" }}>
                    <FaCity size={13} color={CB} /> City
                  </label>
                  <input type="text" name="city" value={formData.city || ''} onChange={handleInputChange} onBlur={handleBlur}
                    style={{ padding: "12px 14px", borderRadius: "10px", border: inputBorder("city","city"), fontSize: "14px", backgroundColor: inputBg("city","city"), color: TEXT, outline: "none", fontFamily: "'DM Sans', sans-serif" }}
                    className="form-input" placeholder="Enter city name" required />
                  <FieldFeedback touched={touchedFields.city} error={formErrors.city} validMsg="Valid city" />
                </div>

                {/* ── State ── */}
                <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                  <label style={{ fontSize: "13px", fontWeight: "700", color: TEXT, display: "flex", alignItems: "center", gap: "8px" }}>
                    <FaFlag size={13} color={CB} /> State
                  </label>
                  <input type="text" name="state" value={formData.state || ''} onChange={handleInputChange} onBlur={handleBlur}
                    style={{ padding: "12px 14px", borderRadius: "10px", border: inputBorder("state","state"), fontSize: "14px", backgroundColor: inputBg("state","state"), color: TEXT, outline: "none", fontFamily: "'DM Sans', sans-serif" }}
                    className="form-input" placeholder="Enter state name" required />
                  <FieldFeedback touched={touchedFields.state} error={formErrors.state} validMsg="Valid state" />
                </div>

                {/* ── Country ── */}
                <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                  <label style={{ fontSize: "13px", fontWeight: "700", color: TEXT, display: "flex", alignItems: "center", gap: "8px" }}>
                    <FaGlobe size={13} color={CB} /> Country
                  </label>
                  <input type="text" name="country" value={formData.country || 'India'} onChange={handleInputChange} onBlur={handleBlur}
                    style={{ padding: "12px 14px", borderRadius: "10px", border: inputBorder("country","country"), fontSize: "14px", backgroundColor: inputBg("country","country"), color: TEXT, outline: "none", fontFamily: "'DM Sans', sans-serif" }}
                    className="form-input" placeholder="Enter country name" required />
                  <FieldFeedback touched={touchedFields.country} error={formErrors.country} validMsg="Valid country" />
                </div>

                {/* ── Pincode ── */}
                <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                  <label style={{ fontSize: "13px", fontWeight: "700", color: TEXT, display: "flex", alignItems: "center", gap: "8px" }}>
                    <FaMapPin size={13} color={CB} /> Pincode
                  </label>
                  <input type="text" name="pincode" value={formData.pincode || formData.zipCode || ''} onChange={handleInputChange} onBlur={handleBlur}
                    style={{ padding: "12px 14px", borderRadius: "10px", border: inputBorder("pincode","pincode"), fontSize: "14px", backgroundColor: inputBg("pincode","pincode"), color: TEXT, outline: "none", fontFamily: "'DM Sans', sans-serif" }}
                    className="form-input" placeholder="Enter 6-digit pincode" required />
                  <FieldFeedback touched={touchedFields.pincode} error={formErrors.pincode} validMsg="Valid pincode" />
                </div>

              </div>

              {/* Form actions */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "14px", paddingTop: "18px", borderTop: `1px solid ${BORDER}` }}>
                <button type="button" onClick={handleCloseForm}
                  style={{ backgroundColor: "#F7F9FF", color: TEXT, border: `1.5px solid ${BORDER}`, padding: "11px 22px", borderRadius: "10px", fontSize: "14px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif" }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#EEF1FA"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#F7F9FF"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <FaTimes /> Cancel
                </button>
                <button type="submit"
                  style={{ background: isFormValid() ? `linear-gradient(135deg, ${CB_DARK}, ${CB_LIGHT})` : "#C9D6F0", color: "white", border: "none", padding: "11px 26px", borderRadius: "10px", fontSize: "14px", fontWeight: "700", cursor: isFormValid() ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: "8px", opacity: isFormValid() ? 1 : 0.65, boxShadow: isFormValid() ? `0 4px 14px rgba(0,48,135,0.28)` : "none", transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif" }}
                  disabled={updating || !isFormValid()}
                  onMouseEnter={e => { if (isFormValid()) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 20px rgba(0,48,135,0.38)`; } }}
                  onMouseLeave={e => { if (isFormValid()) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 4px 14px rgba(0,48,135,0.28)`; } }}>
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
