// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //     FaEnvelope,
// //     FaLock,
// //     FaEye,
// //     FaEyeSlash,
// //     FaSignInAlt,
// //     FaRedo,
// //     FaShieldAlt,
// //     FaCreditCard,
// //     FaMobileAlt,
// //     FaGlobeAmericas,
// //     FaStar,
// //     FaCheckCircle,
// //     FaArrowRight,
// //     FaInfinity,
// //     FaChartLine,
// //     FaFingerprint
// // } from "react-icons/fa";
// // import API from "../../api";
// // import { useSnackbar } from "../../Context/SnackbarContext";

// // const Login = () => {
// //     const navigate = useNavigate();
// //     const { showSnackbar } = useSnackbar();

// //     const [email, setEmail] = useState("");
// //     const [password, setPassword] = useState("");
// //     const [errors, setErrors] = useState({});
// //     const [showPassword, setShowPassword] = useState(false);
// //     const [isLoading, setIsLoading] = useState(false);
// //     const [activeFeature, setActiveFeature] = useState(0);

// //     useEffect(() => {
// //         const interval = setInterval(() => {
// //             setActiveFeature((prev) => (prev + 1) % 4);
// //         }, 3000);
// //         return () => clearInterval(interval);
// //     }, []);

// //     const validateForm = () => {
// //         const newErrors = {};
// //         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// //         if (!email) {
// //             newErrors.email = "Email is required";
// //         } else if (!emailRegex.test(email)) {
// //             newErrors.email = "Please enter a valid email address";
// //         }

// //         if (!password) {
// //             newErrors.password = "Password is required";
// //         } else if (password.length < 6) {
// //             newErrors.password = "Password must be at least 6 characters";
// //         }

// //         setErrors(newErrors);
// //         return Object.keys(newErrors).length === 0;
// //     };

// //     const handleEmailChange = (e) => {
// //         setEmail(e.target.value);
// //         if (errors.email) setErrors({ ...errors, email: "" });
// //     };

// //     const handlePasswordChange = (e) => {
// //         setPassword(e.target.value);
// //         if (errors.password) setErrors({ ...errors, password: "" });
// //     };

// //     const handleLogin = async () => {
// //         if (!validateForm()) return;
// //         setIsLoading(true);
// //         try {
// //             const payload = { email, password };
// //             const response = await API.post("users/login", payload);
// //             const roleId = response?.data?.data?.roleId;
// //             console.log(roleId, "response");

// //             if (roleId === 2) {
// //                 showSnackbar("success", "Login successful!...");
// //                 navigate("/dashboard");
// //                 localStorage.setItem("roleId", response?.data?.data?.roleId);
// //                 localStorage.setItem("userId", response?.data?.data?.userId);
// //                 localStorage.setItem("name", response?.data?.data?.userName);
// //             } else if (roleId === 1) {
// //                 showSnackbar("error", "Authentication Failed, Insufficient Permissions");
// //             }
// //             setTimeout(() => {
// //                 setIsLoading(false);
// //             }, 1000);

// //         } catch (error) {
// //             showSnackbar("error", "Invalid credentials");
// //             setIsLoading(false);
// //             navigate("/dashboard");

// //         }
// //     };

// //     const handleReset = () => {
// //         setEmail("");
// //         setPassword("");
// //         setErrors({});
// //     };

// //     const handleKeyPress = (e) => {
// //         if (e.key === "Enter") handleLogin();
// //     };

// //     const features = [
// //         { icon: FaShieldAlt, title: "Military-Grade Security", desc: "256-bit encryption & biometric auth", color: "#4CAF50" },
// //         { icon: FaCreditCard, title: "Zero Annual Fees", desc: "Premium banking, no hidden charges", color: "#2196F3" },
// //         { icon: FaMobileAlt, title: "Mobile Banking", desc: "Manage accounts anytime, anywhere", color: "#9C27B0" },
// //         { icon: FaGlobeAmericas, title: "Global Access", desc: "Bank globally, competitive FX rates", color: "#FF9800" }
// //     ];

// //     return (
// //         <div className="login-container">
// //             {/* Animated background elements */}
// //             <div className="bg-orb bg-orb-1" />
// //             <div className="bg-orb bg-orb-2" />
// //             <div className="bg-orb bg-orb-3" />

// //             {/* Left Panel - Brand Story */}
// //             <div className="brand-panel">
// //                 <div className="brand-gradient" />
// //                 <div className="brand-content">
// //                     {/* Animated Logo */}
// //                     <div className="logo-wrapper">
// //                         <div className="logo-glow" />
// //                         <div className="logo-container">
// //                             <FaShieldAlt size={40} color="#ffffff" />
// //                         </div>
// //                     </div>

// //                     {/* Bank Identity */}
// //                     <div className="bank-identity">
// //                         <h1 className="bank-name">
// //                             <span className="bank-name-accent">ABC</span> Bank
// //                         </h1>
// //                         <div className="bank-rating">
// //                             <FaStar className="star-filled" />
// //                             <FaStar className="star-filled" />
// //                             <FaStar className="star-filled" />
// //                             <FaStar className="star-filled" />
// //                             <FaStar className="star-half" />
// //                             <span className="rating-text">4.8/5.0</span>
// //                         </div>
// //                         <p className="bank-desc">
// //                             The future of secure, intelligent banking — trusted by over 2.5 million customers worldwide.
// //                         </p>
// //                     </div>

// //                     {/* Feature Showcase */}
// //                     <div className="feature-showcase">
// //                         <h3 className="showcase-title">Why institutions choose ABC</h3>
// //                         <div className="feature-grid">
// //                             {features.map((feat, idx) => {
// //                                 const Icon = feat.icon;
// //                                 return (
// //                                     <div
// //                                         key={idx}
// //                                         className={`feature-card ${activeFeature === idx ? 'active' : ''}`}
// //                                         onMouseEnter={() => setActiveFeature(idx)}
// //                                     >
// //                                         <div className="feature-icon-badge" style={{ backgroundColor: `${feat.color}20`, borderColor: feat.color }}>
// //                                             <Icon className="feature-icon" style={{ color: feat.color }} />
// //                                         </div>
// //                                         <div className="feature-card-content">
// //                                             <span className="feature-card-title">{feat.title}</span>
// //                                             <span className="feature-card-desc">{feat.desc}</span>
// //                                         </div>
// //                                     </div>
// //                                 );
// //                             })}
// //                         </div>
// //                     </div>

// //                     {/* Stats & Security */}
// //                     <div className="stats-container">
// //                         <div className="stat-pill">
// //                             <FaInfinity className="stat-icon" />
// //                             <span>99.99% uptime</span>
// //                         </div>
// //                         <div className="stat-pill">
// //                             <FaFingerprint className="stat-icon" />
// //                             <span>Biometric ready</span>
// //                         </div>
// //                         <div className="stat-pill">
// //                             <FaChartLine className="stat-icon" />
// //                             <span>SWIFT connected</span>
// //                         </div>
// //                     </div>

// //                     {/* Testimonial Card */}
// //                     <div className="testimonial-card">
// //                         <div className="quote-mark">“</div>
// //                         <p className="testimonial-text">
// //                             Seamless digital banking, exceptional service. ABC transformed how our business operates globally.
// //                         </p>
// //                         <div className="testimonial-footer">
// //                             <div className="testimonial-avatar">
// //                                 <span className="avatar-text">SJ</span>
// //                             </div>
// //                             <div className="testimonial-meta">
// //                                 <span className="testimonial-name">Sarah Johnson</span>
// //                                 <span className="testimonial-role">CFO, TechFlow Inc.</span>
// //                             </div>
// //                         </div>
// //                     </div>

// //                     {/* Security Badge */}
// //                     <div className="security-badge-modern">
// //                         <FaShieldAlt size={14} color="#4ade80" />
// //                         <span>ISO 27001 • SOC2 Type II • GDPR</span>
// //                     </div>
// //                 </div>
// //             </div>

// //             {/* Right Panel - Login Portal */}
// //             <div className="login-panel">
// //                 <div className="login-card">
// //                     {/* Header with animation */}
// //                     <div className="login-header">
// //                         <div className="login-icon-container">
// //                             <div className="login-icon-bg" />
// //                             <FaSignInAlt size={32} color="#2563eb" className="login-icon" />
// //                         </div>
// //                         <h2 className="login-title">Access your account</h2>
// //                         <p className="login-subtitle">
// //                             Secure login • 2FA ready • Encrypted
// //                         </p>
// //                     </div>

// //                     {/* Form Fields */}
// //                     <div className="form-container">
// //                         {/* Email */}
// //                         <div className="field-wrapper">
// //                             <label className="field-label">Email address</label>
// //                             <div className={`input-group ${errors.email ? 'error' : ''}`}>
// //                                 <FaEnvelope className="input-icon" />
// //                                 <input
// //                                     type="email"
// //                                     placeholder="name@company.com"
// //                                     value={email}
// //                                     onChange={handleEmailChange}
// //                                     onKeyPress={handleKeyPress}
// //                                     className="input"
// //                                 />
// //                             </div>
// //                             {errors.email && <span className="error-message">{errors.email}</span>}
// //                         </div>

// //                         {/* Password */}
// //                         <div className="field-wrapper">
// //                             <div className="label-row">
// //                                 <label className="field-label">Password</label>
// //                             </div>
// //                             <div className={`input-group ${errors.password ? 'error' : ''}`}>
// //                                 <FaLock className="input-icon" />
// //                                 <input
// //                                     type={showPassword ? "text" : "password"}
// //                                     placeholder="••••••••"
// //                                     value={password}
// //                                     onChange={handlePasswordChange}
// //                                     onKeyPress={handleKeyPress}
// //                                     className="input"
// //                                 />
// //                                 <button
// //                                     onClick={() => setShowPassword(!showPassword)}
// //                                     className="eye-button"
// //                                     type="button"
// //                                 >
// //                                     {showPassword ? <FaEyeSlash /> : <FaEye />}
// //                                 </button>
// //                             </div>
// //                             {errors.password && <span className="error-message">{errors.password}</span>}
// //                         </div>

// //                         {/* Action Buttons */}
// //                         <div className="action-row">
// //                             <button
// //                                 className="login-button"
// //                                 onClick={handleLogin}
// //                                 disabled={isLoading}
// //                             >
// //                                 {isLoading ? (
// //                                     <div className="loader" />
// //                                 ) : (
// //                                     <>
// //                                         <span>Sign in</span>
// //                                         <FaArrowRight className="button-icon" />
// //                                     </>
// //                                 )}
// //                             </button>
// //                             <button
// //                                 className="clear-button"
// //                                 onClick={handleReset}
// //                                 disabled={isLoading}
// //                                 type="button"
// //                             >
// //                                 <FaRedo />
// //                             </button>
// //                         </div>

// //                         {/* Demo Access */}
// //                         <div className="demo-section">
// //                             <span className="demo-label">Try a demo →</span>
// //                             <button
// //                                 className="demo-chip"
// //                                 onClick={() => {
// //                                     setEmail("demo@abcbank.com");
// //                                     setPassword("demo1234");
// //                                 }}
// //                                 type="button"
// //                             >
// //                                 Prefill demo credentials
// //                             </button>
// //                         </div>

// //                         {/* Trust indicators */}
// //                         <div className="trust-bar">
// //                             <div className="trust-item">
// //                                 <FaCheckCircle size={14} color="#10b981" />
// //                                 <span>256-bit SSL</span>
// //                             </div>
// //                             <div className="trust-item">
// //                                 <FaCheckCircle size={14} color="#10b981" />
// //                                 <span>GDPR ready</span>
// //                             </div>
// //                             <div className="trust-item">
// //                                 <FaCheckCircle size={14} color="#10b981" />
// //                                 <span>Biometric</span>
// //                             </div>
// //                         </div>
// //                     </div>

// //                     {/* Support */}
// //                     <div className="support-section">
// //                         <FaMobileAlt size={12} color="#64748b" />
// //                         <span className="support-text">Need help? 24/7 support at 1-800-ABC-BANK</span>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // // Create style element with all CSS
// // const style = document.createElement('style');
// // style.textContent = `
// //     * {
// //         margin: 0;
// //         padding: 0;
// //         box-sizing: border-box;
// //     }

// //     .login-container {
// //         display: flex;
// //         width: 100vw;
// //         height: 100vh;
// //         overflow: hidden;
// //         position: relative;
// //         background-color: #fafbfc;
// //         font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
// //     }

// //     /* Animated background */
// //     .bg-orb {
// //         position: absolute;
// //         border-radius: 50%;
// //         z-index: 0;
// //         animation: float 30s infinite ease-in-out;
// //     }

// //     .bg-orb-1 {
// //         width: 70vmax;
// //         height: 70vmax;
// //         background: radial-gradient(circle at 30% 30%, rgba(37, 99, 235, 0.03), transparent 70%);
// //         top: -20vmax;
// //         right: -10vmax;
// //     }

// //     .bg-orb-2 {
// //         width: 60vmax;
// //         height: 60vmax;
// //         background: radial-gradient(circle at 70% 70%, rgba(16, 185, 129, 0.03), transparent 70%);
// //         bottom: -30vmax;
// //         left: -20vmax;
// //         animation: floatReverse 35s infinite ease-in-out;
// //     }

// //     .bg-orb-3 {
// //         width: 50vmax;
// //         height: 50vmax;
// //         background: radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.02), transparent 70%);
// //         bottom: 10vmax;
// //         right: 20vmax;
// //         animation: float 40s infinite ease-in-out;
// //     }

// //     /* Brand Panel */
// //     .brand-panel {
// //         flex: 0 0 50%;
// //         position: relative;
// //         display: flex;
// //         align-items: center;
// //         justify-content: center;
// //         padding: clamp(24px, 5vw, 48px);
// //         overflow-y: auto;
// //         z-index: 2;
// //     }

// //     .brand-panel::-webkit-scrollbar {
// //         display: none;
// //     }

// //     .brand-gradient {
// //         position: absolute;
// //         top: 0;
// //         left: 0;
// //         right: 0;
// //         bottom: 0;
// //         background: radial-gradient(145% 145% at 0% 0%, #0f172a 0%, #1e293b 60%, #0f172a 100%);
// //         opacity: 0.98;
// //         z-index: 1;
// //     }

// //     .brand-content {
// //         position: relative;
// //         z-index: 2;
// //         max-width: 560px;
// //         width: 100%;
// //         display: flex;
// //         flex-direction: column;
// //         gap: clamp(20px, 3vh, 32px);
// //         color: #fff;
// //     }

// //     .logo-wrapper {
// //         position: relative;
// //         width: fit-content;
// //         margin-bottom: 8px;
// //     }

// //     .logo-glow {
// //         position: absolute;
// //         width: 80px;
// //         height: 80px;
// //         border-radius: 24px;
// //         background: linear-gradient(135deg, #3b82f6, #8b5cf6);
// //         filter: blur(20px);
// //         opacity: 0.5;
// //         animation: pulse 3s infinite;
// //     }

// //     .logo-container {
// //         width: 72px;
// //         height: 72px;
// //         border-radius: 20px;
// //         background: linear-gradient(145deg, #2563eb, #1e40af);
// //         display: flex;
// //         align-items: center;
// //         justify-content: center;
// //         box-shadow: 0 8px 32px rgba(0,0,0,0.2);
// //         border: 1px solid rgba(255,255,255,0.2);
// //         position: relative;
// //     }

// //     .bank-identity {
// //         display: flex;
// //         flex-direction: column;
// //         gap: 12px;
// //     }

// //     .bank-name {
// //         font-size: clamp(32px, 6vw, 48px);
// //         font-weight: 700;
// //         letter-spacing: -0.02em;
// //         margin: 0;
// //         line-height: 1.1;
// //     }

// //     .bank-name-accent {
// //         background: linear-gradient(to right, #60a5fa, #c084fc);
// //         -webkit-background-clip: text;
// //         -webkit-text-fill-color: transparent;
// //     }

// //     .bank-rating {
// //         display: flex;
// //         align-items: center;
// //         gap: 6px;
// //     }

// //     .star-filled {
// //         color: #fbbf24;
// //         font-size: 18px;
// //     }

// //     .star-half {
// //         color: #fbbf24;
// //         font-size: 18px;
// //         opacity: 0.8;
// //     }

// //     .rating-text {
// //         margin-left: 8px;
// //         font-size: 14px;
// //         font-weight: 500;
// //         color: #cbd5e1;
// //     }

// //     .bank-desc {
// //         font-size: clamp(14px, 2vw, 16px);
// //         line-height: 1.6;
// //         color: #e2e8f0;
// //         max-width: 480px;
// //         margin: 8px 0 0 0;
// //     }

// //     .feature-showcase {
// //         display: flex;
// //         flex-direction: column;
// //         gap: 16px;
// //         margin-top: 8px;
// //     }

// //     .showcase-title {
// //         font-size: 18px;
// //         font-weight: 600;
// //         margin: 0;
// //         color: #f1f5f9;
// //         letter-spacing: -0.01em;
// //     }

// //     .feature-grid {
// //         display: grid;
// //         grid-template-columns: repeat(2, 1fr);
// //         gap: 16px;
// //     }

// //     .feature-card {
// //         display: flex;
// //         align-items: center;
// //         gap: 14px;
// //         padding: 16px;
// //         background: rgba(255,255,255,0.05);
// //         backdrop-filter: blur(10px);
// //         border-radius: 20px;
// //         border: 1px solid rgba(255,255,255,0.1);
// //         transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
// //         cursor: default;
// //     }

// //     .feature-card:hover {
// //         background: rgba(255,255,255,0.1);
// //         transform: translateY(-4px);
// //         border-color: rgba(255,255,255,0.2);
// //     }

// //     .feature-card.active {
// //         background: rgba(255,255,255,0.12);
// //         border-color: rgba(255,255,255,0.3);
// //         transform: translateY(-2px);
// //     }

// //     .feature-icon-badge {
// //         width: 42px;
// //         height: 42px;
// //         border-radius: 14px;
// //         display: flex;
// //         align-items: center;
// //         justify-content: center;
// //         border: 1px solid;
// //         flex-shrink: 0;
// //     }

// //     .feature-icon {
// //         font-size: 20px;
// //     }

// //     .feature-card-content {
// //         display: flex;
// //         flex-direction: column;
// //         gap: 4px;
// //     }

// //     .feature-card-title {
// //         font-size: 14px;
// //         font-weight: 600;
// //         color: #fff;
// //     }

// //     .feature-card-desc {
// //         font-size: 12px;
// //         color: #cbd5e1;
// //         line-height: 1.4;
// //     }

// //     .stats-container {
// //         display: flex;
// //         flex-wrap: wrap;
// //         gap: 12px;
// //         margin-top: 4px;
// //     }

// //     .stat-pill {
// //         display: flex;
// //         align-items: center;
// //         gap: 8px;
// //         padding: 8px 16px;
// //         background: rgba(255,255,255,0.03);
// //         border-radius: 40px;
// //         border: 1px solid rgba(255,255,255,0.1);
// //         font-size: 13px;
// //         font-weight: 500;
// //         color: #e2e8f0;
// //     }

// //     .stat-icon {
// //         font-size: 14px;
// //         color: #94a3b8;
// //     }

// //     .testimonial-card {
// //         position: relative;
// //         padding: 24px;
// //         background: linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
// //         border-radius: 24px;
// //         border: 1px solid rgba(255,255,255,0.1);
// //         backdrop-filter: blur(8px);
// //         margin-top: 8px;
// //     }

// //     .quote-mark {
// //         position: absolute;
// //         top: 16px;
// //         left: 20px;
// //         font-size: 64px;
// //         color: rgba(255,255,255,0.2);
// //         font-family: Georgia, serif;
// //         line-height: 1;
// //     }

// //     .testimonial-text {
// //         font-size: 15px;
// //         line-height: 1.6;
// //         color: #f1f5f9;
// //         margin: 0 0 20px 0;
// //         position: relative;
// //         z-index: 1;
// //         padding-left: 24px;
// //     }

// //     .testimonial-footer {
// //         display: flex;
// //         align-items: center;
// //         gap: 14px;
// //     }

// //     .testimonial-avatar {
// //         width: 44px;
// //         height: 44px;
// //         border-radius: 12px;
// //         background: linear-gradient(45deg, #2563eb, #7c3aed);
// //         display: flex;
// //         align-items: center;
// //         justify-content: center;
// //         font-size: 16px;
// //         font-weight: 600;
// //         color: #fff;
// //     }

// //     .avatar-text {
// //         line-height: 1;
// //     }

// //     .testimonial-meta {
// //         display: flex;
// //         flex-direction: column;
// //     }

// //     .testimonial-name {
// //         font-size: 15px;
// //         font-weight: 600;
// //         color: #fff;
// //     }

// //     .testimonial-role {
// //         font-size: 12px;
// //         color: #cbd5e1;
// //     }

// //     .security-badge-modern {
// //         display: flex;
// //         align-items: center;
// //         gap: 8px;
// //         padding: 10px 18px;
// //         background: rgba(0,0,0,0.2);
// //         border-radius: 40px;
// //         width: fit-content;
// //         border: 1px solid rgba(74,222,128,0.2);
// //         font-size: 12px;
// //         font-weight: 500;
// //         color: #bbf7d0;
// //     }

// //     /* Login Panel */
// //     .login-panel {
// //         flex: 0 0 50%;
// //         display: flex;
// //         align-items: center;
// //         justify-content: center;
// //         padding: clamp(20px, 4vw, 48px);
// //         background: transparent;
// //         position: relative;
// //         z-index: 2;
// //         overflow-y: auto;
// //     }

// //     .login-panel::-webkit-scrollbar {
// //         display: none;
// //     }

// //     .login-card {
// //         width: 100%;
// //         max-width: 460px;
// //         background: rgba(255,255,255,0.9);
// //         backdrop-filter: blur(20px);
// //         border-radius: 40px;
// //         padding: clamp(28px, 4vw, 48px);
// //         box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15);
// //         border: 1px solid rgba(255,255,255,0.5);
// //         display: flex;
// //         flex-direction: column;
// //         gap: 28px;
// //     }

// //     .login-header {
// //         display: flex;
// //         flex-direction: column;
// //         align-items: center;
// //         gap: 12px;
// //     }

// //     .login-icon-container {
// //         position: relative;
// //         width: fit-content;
// //     }

// //     .login-icon-bg {
// //         position: absolute;
// //         width: 64px;
// //         height: 64px;
// //         border-radius: 20px;
// //         background: linear-gradient(135deg, #dbeafe, #eff6ff);
// //         transform: rotate(10deg);
// //         z-index: 1;
// //     }

// //     .login-icon {
// //         position: relative;
// //         z-index: 2;
// //         background: #fff;
// //         padding: 16px;
// //         border-radius: 20px;
// //         box-shadow: 0 8px 20px rgba(37,99,235,0.15);
// //     }

// //     .login-title {
// //         font-size: clamp(24px, 4vw, 30px);
// //         font-weight: 700;
// //         color: #0f172a;
// //         margin: 0;
// //         letter-spacing: -0.02em;
// //     }

// //     .login-subtitle {
// //         font-size: 14px;
// //         color: #64748b;
// //         margin: 0;
// //         font-weight: 500;
// //     }

// //     .form-container {
// //         display: flex;
// //         flex-direction: column;
// //         gap: 24px;
// //     }

// //     .field-wrapper {
// //         display: flex;
// //         flex-direction: column;
// //         gap: 6px;
// //     }

// //     .label-row {
// //         display: flex;
// //         justify-content: space-between;
// //         align-items: center;
// //     }

// //     .field-label {
// //         font-size: 14px;
// //         font-weight: 600;
// //         color: #1e293b;
// //     }

// //     .forgot-link {
// //         font-size: 13px;
// //         color: #2563eb;
// //         background: none;
// //         border: none;
// //         cursor: pointer;
// //         font-weight: 600;
// //         padding: 4px 8px;
// //         border-radius: 6px;
// //         transition: background 0.2s;
// //     }

// //     .forgot-link:hover {
// //         background: #eff6ff;
// //     }

// //     .input-group {
// //         display: flex;
// //         align-items: center;
// //         gap: 12px;
// //         padding: 0 20px;
// //         height: 56px;
// //         background: #fff;
// //         border-radius: 20px;
// //         border: 2px solid transparent;
// //         transition: all 0.2s;
// //         box-shadow: 0 4px 12px rgba(0,0,0,0.02);
// //     }

// //     .input-group:focus-within {
// //         border-color: #2563eb;
// //         box-shadow: 0 0 0 4px #bfdbfe;
// //     }

// //     .input-group.error {
// //         border-color: #ef4444;
// //         box-shadow: 0 0 0 4px #fee2e2;
// //     }

// //     .input-icon {
// //         color: #94a3b8;
// //         font-size: 18px;
// //     }

// //     .input {
// //         flex: 1;
// //         border: none;
// //         outline: none;
// //         font-size: 15px;
// //         font-weight: 500;
// //         color: #0f172a;
// //         background: transparent;
// //         padding: 0;
// //     }

// //     .input::placeholder {
// //         color: #94a3b8;
// //         font-weight: 400;
// //     }

// //     .eye-button {
// //         background: none;
// //         border: none;
// //         color: #64748b;
// //         cursor: pointer;
// //         padding: 8px;
// //         display: flex;
// //         align-items: center;
// //         justify-content: center;
// //         border-radius: 12px;
// //         transition: background 0.2s;
// //     }

// //     .eye-button:hover {
// //         background: #f1f5f9;
// //     }

// //     .error-message {
// //         font-size: 12px;
// //         color: #ef4444;
// //         font-weight: 500;
// //         margin-left: 12px;
// //     }

// //     .action-row {
// //         display: flex;
// //         gap: 12px;
// //         margin-top: 12px;
// //     }

// //     .login-button {
// //         flex: 1;
// //         height: 56px;
// //         background: linear-gradient(145deg, #2563eb, #1d4ed8);
// //         border: none;
// //         border-radius: 28px;
// //         color: #fff;
// //         font-size: 16px;
// //         font-weight: 600;
// //         display: flex;
// //         align-items: center;
// //         justify-content: center;
// //         gap: 10px;
// //         cursor: pointer;
// //         transition: all 0.2s;
// //         box-shadow: 0 8px 20px rgba(37,99,235,0.3);
// //     }

// //     .login-button:hover:not(:disabled) {
// //         transform: translateY(-2px);
// //         box-shadow: 0 12px 28px rgba(37,99,235,0.4);
// //     }

// //     .login-button:disabled {
// //         opacity: 0.7;
// //         cursor: not-allowed;
// //     }

// //     .button-icon {
// //         font-size: 16px;
// //         transition: transform 0.2s;
// //     }

// //     .login-button:hover .button-icon {
// //         transform: translateX(4px);
// //     }

// //     .clear-button {
// //         width: 56px;
// //         height: 56px;
// //         border-radius: 28px;
// //         background: #f1f5f9;
// //         border: 1px solid #e2e8f0;
// //         color: #475569;
// //         display: flex;
// //         align-items: center;
// //         justify-content: center;
// //         cursor: pointer;
// //         transition: all 0.2s;
// //         font-size: 18px;
// //     }

// //     .clear-button:hover:not(:disabled) {
// //         background: #e2e8f0;
// //         border-color: #cbd5e1;
// //     }

// //     .loader {
// //         width: 22px;
// //         height: 22px;
// //         border: 3px solid rgba(255,255,255,0.3);
// //         border-top-color: #fff;
// //         border-radius: 50%;
// //         animation: spin 0.8s linear infinite;
// //     }

// //     .demo-section {
// //         display: flex;
// //         align-items: center;
// //         justify-content: space-between;
// //         background: #f8fafc;
// //         padding: 12px 20px;
// //         border-radius: 20px;
// //         border: 1px solid #e2e8f0;
// //     }

// //     .demo-label {
// //         font-size: 13px;
// //         font-weight: 600;
// //         color: #475569;
// //     }

// //     .demo-chip {
// //         background: #ffffff;
// //         border: 1px solid #cbd5e1;
// //         padding: 8px 16px;
// //         border-radius: 40px;
// //         font-size: 13px;
// //         font-weight: 600;
// //         color: #2563eb;
// //         cursor: pointer;
// //         transition: all 0.2s;
// //     }

// //     .demo-chip:hover {
// //         background: #2563eb;
// //         color: #fff;
// //         border-color: #2563eb;
// //     }

// //     .trust-bar {
// //         display: flex;
// //         justify-content: center;
// //         gap: 24px;
// //         margin-top: 8px;
// //     }

// //     .trust-item {
// //         display: flex;
// //         align-items: center;
// //         gap: 6px;
// //         font-size: 12px;
// //         font-weight: 600;
// //         color: #334155;
// //     }

// //     .register-prompt {
// //         display: flex;
// //         align-items: center;
// //         justify-content: center;
// //         gap: 8px;
// //         padding: 16px 0 8px;
// //         border-top: 1px solid #e2e8f0;
// //     }

// //     .register-text {
// //         font-size: 14px;
// //         color: #475569;
// //     }

// //     .register-link {
// //         background: none;
// //         border: none;
// //         color: #2563eb;
// //         font-weight: 700;
// //         font-size: 14px;
// //         cursor: pointer;
// //         display: flex;
// //         align-items: center;
// //         gap: 4px;
// //         padding: 4px 8px;
// //         border-radius: 8px;
// //         transition: background 0.2s;
// //     }

// //     .register-link:hover {
// //         background: #eff6ff;
// //     }

// //     .register-link:hover .register-arrow {
// //         transform: translateX(4px);
// //     }

// //     .register-arrow {
// //         transition: transform 0.2s;
// //     }

// //     .support-section {
// //         display: flex;
// //         align-items: center;
// //         justify-content: center;
// //         gap: 8px;
// //         font-size: 12px;
// //         color: #64748b;
// //         margin-top: 4px;
// //     }

// //     .support-text {
// //         font-weight: 500;
// //     }

// //     /* Animations */
// //     @keyframes float {
// //         0%, 100% { transform: translateY(0) rotate(0deg); }
// //         50% { transform: translateY(-20px) rotate(2deg); }
// //     }

// //     @keyframes floatReverse {
// //         0%, 100% { transform: translateY(0) rotate(0deg); }
// //         50% { transform: translateY(20px) rotate(-2deg); }
// //     }

// //     @keyframes pulse {
// //         0%, 100% { opacity: 0.5; transform: scale(1); }
// //         50% { opacity: 0.7; transform: scale(1.1); }
// //     }

// //     @keyframes spin {
// //         to { transform: rotate(360deg); }
// //     }

// //     /* Responsive Design */
// //     @media (max-width: 1024px) {
// //         .login-container {
// //             flex-direction: column;
// //             height: auto;
// //             overflow-y: auto;
// //         }

// //         .brand-panel,
// //         .login-panel {
// //             flex: 0 0 auto;
// //             width: 100%;
// //             overflow-y: visible;
// //         }

// //         .brand-content {
// //             max-width: 100%;
// //         }
// //     }

// //     @media (max-width: 640px) {
// //         .feature-grid {
// //             grid-template-columns: 1fr;
// //         }

// //         .login-card {
// //             padding: 24px;
// //         }

// //         .action-row {
// //             flex-direction: column;
// //         }

// //         .clear-button {
// //             width: 100%;
// //         }

// //         .brand-panel {
// //             padding: 24px;
// //         }

// //         .stats-container {
// //             flex-direction: column;
// //         }

// //         .stat-pill {
// //             width: 100%;
// //         }

// //         .security-badge-modern {
// //             width: 100%;
// //             justify-content: center;
// //         }
// //     }

// //     @media (max-width: 480px) {
// //         .bank-name {
// //             font-size: 36px;
// //         }

// //         .testimonial-card {
// //             padding: 20px;
// //         }

// //         .demo-section {
// //             flex-direction: column;
// //             gap: 12px;
// //             align-items: flex-start;
// //         }

// //         .demo-chip {
// //             width: 100%;
// //         }

// //         .trust-bar {
// //             flex-direction: column;
// //             align-items: center;
// //             gap: 12px;
// //         }
// //     }
// // `;

// // // Append styles to document head
// // document.head.appendChild(style);

// // export default Login;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//     FaEnvelope,
//     FaLock,
//     FaEye,
//     FaEyeSlash,
//     FaSignInAlt,
//     FaRedo,
//     FaShieldAlt,
//     FaCreditCard,
//     FaMobileAlt,
//     FaGlobeAmericas,
//     FaStar,
//     FaCheckCircle,
//     FaArrowRight,
//     FaInfinity,
//     FaChartLine,
//     FaFingerprint
// } from "react-icons/fa";
// import API from "../../api";
// import { useSnackbar } from "../../Context/SnackbarContext";

// const Login = () => {
//     const navigate = useNavigate();
//     const { showSnackbar } = useSnackbar();

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [errors, setErrors] = useState({});
//     const [showPassword, setShowPassword] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [activeFeature, setActiveFeature] = useState(0);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setActiveFeature((prev) => (prev + 1) % 4);
//         }, 3000);
//         return () => clearInterval(interval);
//     }, []);

//     const validateForm = () => {
//         const newErrors = {};
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//         if (!email) {
//             newErrors.email = "Email is required";
//         } else if (!emailRegex.test(email)) {
//             newErrors.email = "Please enter a valid email address";
//         }

//         if (!password) {
//             newErrors.password = "Password is required";
//         } else if (password.length < 6) {
//             newErrors.password = "Password must be at least 6 characters";
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleEmailChange = (e) => {
//         setEmail(e.target.value);
//         if (errors.email) setErrors({ ...errors, email: "" });
//     };

//     const handlePasswordChange = (e) => {
//         setPassword(e.target.value);
//         if (errors.password) setErrors({ ...errors, password: "" });
//     };

//     const handleLogin = async () => {
//         if (!validateForm()) return;
//         setIsLoading(true);
//         try {
//             const payload = { email, password };
//             const response = await API.post("users/login", payload);
//             const roleId = response?.data?.data?.roleId;
//             console.log(roleId, "response");

//             if (roleId === 2) {
//                 showSnackbar("success", "Login successful!...");
//                 navigate("/dashboard");
//                 localStorage.setItem("roleId", response?.data?.data?.roleId);
//                 localStorage.setItem("userId", response?.data?.data?.userId);
//                 localStorage.setItem("name", response?.data?.data?.userName);
//             } else if (roleId === 1) {
//                 showSnackbar("error", "Authentication Failed, Insufficient Permissions");
//             }
//             setTimeout(() => {
//                 setIsLoading(false);
//             }, 1000);

//         } catch (error) {
//             showSnackbar("error", "Invalid credentials");
//             setIsLoading(false);
//             navigate("/dashboard");

//         }
//     };

//     const handleReset = () => {
//         setEmail("");
//         setPassword("");
//         setErrors({});
//     };

//     const handleKeyPress = (e) => {
//         if (e.key === "Enter") handleLogin();
//     };

//     const features = [
//         { icon: FaShieldAlt, title: "Military-Grade Security", desc: "256-bit encryption & biometric auth", color: "#4CAF50" },
//         { icon: FaCreditCard, title: "Zero Annual Fees", desc: "Premium banking, no hidden charges", color: "#2196F3" },
//         { icon: FaMobileAlt, title: "Mobile Banking", desc: "Manage accounts anytime, anywhere", color: "#9C27B0" },
//         { icon: FaGlobeAmericas, title: "Global Access", desc: "Bank globally, competitive FX rates", color: "#FF9800" }
//     ];

//     return (
//         <div className="login-container">
//             {/* Animated background elements */}
//             <div className="bg-orb bg-orb-1" />
//             <div className="bg-orb bg-orb-2" />
//             <div className="bg-orb bg-orb-3" />

//             {/* Left Panel - Brand Story */}
//             <div className="brand-panel">
//                 <div className="brand-gradient" />
//                 <div className="brand-content">
//                     {/* Animated Logo */}
//                     <div className="logo-wrapper">
//                         <div className="logo-glow" />
//                         <div className="logo-container">
//                             <FaShieldAlt size={40} color="#ffffff" />
//                         </div>
//                     </div>

//                     {/* Bank Identity */}
//                     <div className="bank-identity">
//                         <h1 className="bank-name">
//                             <span className="bank-name-accent">ABC</span> Bank
//                         </h1>
//                         <div className="bank-rating">
//                             <FaStar className="star-filled" />
//                             <FaStar className="star-filled" />
//                             <FaStar className="star-filled" />
//                             <FaStar className="star-filled" />
//                             <FaStar className="star-half" />
//                             <span className="rating-text">4.8/5.0</span>
//                         </div>
//                         <p className="bank-desc">
//                             The future of secure, intelligent banking — trusted by over 2.5 million customers worldwide.
//                         </p>
//                     </div>

//                     {/* Feature Showcase */}
//                     <div className="feature-showcase">
//                         <h3 className="showcase-title">Why institutions choose ABC</h3>
//                         <div className="feature-grid">
//                             {features.map((feat, idx) => {
//                                 const Icon = feat.icon;
//                                 return (
//                                     <div
//                                         key={idx}
//                                         className={`feature-card ${activeFeature === idx ? 'active' : ''}`}
//                                         onMouseEnter={() => setActiveFeature(idx)}
//                                     >
//                                         <div className="feature-icon-badge" style={{ backgroundColor: `${feat.color}20`, borderColor: feat.color }}>
//                                             <Icon className="feature-icon" style={{ color: feat.color }} />
//                                         </div>
//                                         <div className="feature-card-content">
//                                             <span className="feature-card-title">{feat.title}</span>
//                                             <span className="feature-card-desc">{feat.desc}</span>
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>

//                     {/* Stats & Security */}
//                     <div className="stats-container">
//                         <div className="stat-pill">
//                             <FaInfinity className="stat-icon" />
//                             <span>99.99% uptime</span>
//                         </div>
//                         <div className="stat-pill">
//                             <FaFingerprint className="stat-icon" />
//                             <span>Biometric ready</span>
//                         </div>
//                         <div className="stat-pill">
//                             <FaChartLine className="stat-icon" />
//                             <span>SWIFT connected</span>
//                         </div>
//                     </div>

//                     {/* Testimonial Card */}
//                     <div className="testimonial-card">
//                         <div className="quote-mark">“</div>
//                         <p className="testimonial-text">
//                             Seamless digital banking, exceptional service. ABC transformed how our business operates globally.
//                         </p>
//                         <div className="testimonial-footer">
//                             <div className="testimonial-avatar">
//                                 <span className="avatar-text">SJ</span>
//                             </div>
//                             <div className="testimonial-meta">
//                                 <span className="testimonial-name">Sarah Johnson</span>
//                                 <span className="testimonial-role">CFO, TechFlow Inc.</span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Security Badge */}
//                     <div className="security-badge-modern">
//                         <FaShieldAlt size={14} color="#4ade80" />
//                         <span>ISO 27001 • SOC2 Type II • GDPR</span>
//                     </div>
//                 </div>
//             </div>

//             {/* Right Panel - Login Portal */}
//             <div className="login-panel">
//                 <div className="login-card">
//                     {/* Header with animation - REMOVED 2FA AND ENCRYPTED TEXT */}
//                     <div className="login-header">
//                         <div className="login-icon-container">
//                             <div className="login-icon-bg" />
//                             <FaSignInAlt size={32} color="#2563eb" className="login-icon" />
//                         </div>
//                         <h2 className="login-title">Access your account</h2>
//                         <p className="login-subtitle">
//                             Secure login
//                         </p>
//                     </div>

//                     {/* Form Fields */}
//                     <div className="form-container">
//                         {/* Email */}
//                         <div className="field-wrapper">
//                             <label className="field-label">Email address</label>
//                             <div className={`input-group ${errors.email ? 'error' : ''}`}>
//                                 <FaEnvelope className="input-icon" />
//                                 <input
//                                     type="email"
//                                     placeholder="siva@gmail.com"
//                                     value={email}
//                                     onChange={handleEmailChange}
//                                     onKeyPress={handleKeyPress}
//                                     className="input"
//                                 />
//                             </div>
//                             {errors.email && <span className="error-message">{errors.email}</span>}
//                         </div>

//                         {/* Password */}
//                         <div className="field-wrapper">
//                             <div className="label-row">
//                                 <label className="field-label">Password</label>
//                             </div>
//                             <div className={`input-group ${errors.password ? 'error' : ''}`}>
//                                 <FaLock className="input-icon" />
//                                 <input
//                                     type={showPassword ? "text" : "password"}
//                                     placeholder="••••••••"
//                                     value={password}
//                                     onChange={handlePasswordChange}
//                                     onKeyPress={handleKeyPress}
//                                     className="input"
//                                 />
//                                 <button
//                                     onClick={() => setShowPassword(!showPassword)}
//                                     className="eye-button"
//                                     type="button"
//                                 >
//                                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                                 </button>
//                             </div>
//                             {errors.password && <span className="error-message">{errors.password}</span>}
//                         </div>

//                         {/* Action Buttons */}
//                         <div className="action-row">
//                             <button
//                                 className="login-button"
//                                 onClick={handleLogin}
//                                 disabled={isLoading}
//                             >
//                                 {isLoading ? (
//                                     <div className="loader" />
//                                 ) : (
//                                     <>
//                                         <span>Sign in</span>
//                                         <FaArrowRight className="button-icon" />
//                                     </>
//                                 )}
//                             </button>
//                             <button
//                                 className="clear-button"
//                                 onClick={handleReset}
//                                 disabled={isLoading}
//                                 type="button"
//                             >
//                                 <FaRedo />
//                             </button>
//                         </div>

//                         {/* Demo Access */}
//                         <div className="demo-section">
//                             <span className="demo-label">Try a demo →</span>
//                             <button
//                                 className="demo-chip"
//                                 onClick={() => {
//                                     setEmail("demo@abcbank.com");
//                                     setPassword("demo1234");
//                                 }}
//                                 type="button"
//                             >
//                                 Prefill demo credentials
//                             </button>
//                         </div>

//                         {/* REMOVED TRUST BAR WITH SSL, GDPR, BIOMETRIC */}
//                     </div>

//                     {/* Support - UPDATED WITH ICON AND BETTER STYLING */}
//                     <div className="support-section">
//                         <FaMobileAlt size={16} color="#2563eb" />
//                         <span className="support-text">Need help? 24/7 support at <strong>1-800-ABC-BANK</strong></span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Create style element with all CSS
// const style = document.createElement('style');
// style.textContent = `
//     * {
//         margin: 0;
//         padding: 0;
//         box-sizing: border-box;
//     }

//     .login-container {
//         display: flex;
//         width: 100vw;
//         height: 100vh;
//         overflow: hidden;
//         position: relative;
//         background-color: #fafbfc;
//         font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
//     }

//     /* Animated background */
//     .bg-orb {
//         position: absolute;
//         border-radius: 50%;
//         z-index: 0;
//         animation: float 30s infinite ease-in-out;
//     }

//     .bg-orb-1 {
//         width: 70vmax;
//         height: 70vmax;
//         background: radial-gradient(circle at 30% 30%, rgba(37, 99, 235, 0.03), transparent 70%);
//         top: -20vmax;
//         right: -10vmax;
//     }

//     .bg-orb-2 {
//         width: 60vmax;
//         height: 60vmax;
//         background: radial-gradient(circle at 70% 70%, rgba(16, 185, 129, 0.03), transparent 70%);
//         bottom: -30vmax;
//         left: -20vmax;
//         animation: floatReverse 35s infinite ease-in-out;
//     }

//     .bg-orb-3 {
//         width: 50vmax;
//         height: 50vmax;
//         background: radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.02), transparent 70%);
//         bottom: 10vmax;
//         right: 20vmax;
//         animation: float 40s infinite ease-in-out;
//     }

//     /* Brand Panel */
//     .brand-panel {
//         flex: 0 0 50%;
//         position: relative;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         padding: clamp(24px, 5vw, 48px);
//         overflow-y: auto;
//         z-index: 2;
//     }

//     .brand-panel::-webkit-scrollbar {
//         display: none;
//     }

//     .brand-gradient {
//         position: absolute;
//         top: 0;
//         left: 0;
//         right: 0;
//         bottom: 0;
//         background: radial-gradient(145% 145% at 0% 0%, #0f172a 0%, #1e293b 60%, #0f172a 100%);
//         opacity: 0.98;
//         z-index: 1;
//     }

//     .brand-content {
//         position: relative;
//         z-index: 2;
//         max-width: 560px;
//         width: 100%;
//         display: flex;
//         flex-direction: column;
//         gap: clamp(20px, 3vh, 32px);
//         color: #fff;
//     }

//     .logo-wrapper {
//         position: relative;
//         width: fit-content;
//         margin-bottom: 8px;
//     }

//     .logo-glow {
//         position: absolute;
//         width: 80px;
//         height: 80px;
//         border-radius: 24px;
//         background: linear-gradient(135deg, #3b82f6, #8b5cf6);
//         filter: blur(20px);
//         opacity: 0.5;
//         animation: pulse 3s infinite;
//     }

//     .logo-container {
//         width: 72px;
//         height: 72px;
//         border-radius: 20px;
//         background: linear-gradient(145deg, #2563eb, #1e40af);
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         box-shadow: 0 8px 32px rgba(0,0,0,0.2);
//         border: 1px solid rgba(255,255,255,0.2);
//         position: relative;
//     }

//     .bank-identity {
//         display: flex;
//         flex-direction: column;
//         gap: 12px;
//     }

//     .bank-name {
//         font-size: clamp(32px, 6vw, 48px);
//         font-weight: 700;
//         letter-spacing: -0.02em;
//         margin: 0;
//         line-height: 1.1;
//     }

//     .bank-name-accent {
//         background: linear-gradient(to right, #60a5fa, #c084fc);
//         -webkit-background-clip: text;
//         -webkit-text-fill-color: transparent;
//     }

//     .bank-rating {
//         display: flex;
//         align-items: center;
//         gap: 6px;
//     }

//     .star-filled {
//         color: #fbbf24;
//         font-size: 18px;
//     }

//     .star-half {
//         color: #fbbf24;
//         font-size: 18px;
//         opacity: 0.8;
//     }

//     .rating-text {
//         margin-left: 8px;
//         font-size: 14px;
//         font-weight: 500;
//         color: #cbd5e1;
//     }

//     .bank-desc {
//         font-size: clamp(14px, 2vw, 16px);
//         line-height: 1.6;
//         color: #e2e8f0;
//         max-width: 480px;
//         margin: 8px 0 0 0;
//     }

//     .feature-showcase {
//         display: flex;
//         flex-direction: column;
//         gap: 16px;
//         margin-top: 8px;
//     }

//     .showcase-title {
//         font-size: 18px;
//         font-weight: 600;
//         margin: 0;
//         color: #f1f5f9;
//         letter-spacing: -0.01em;
//     }

//     .feature-grid {
//         display: grid;
//         grid-template-columns: repeat(2, 1fr);
//         gap: 16px;
//     }

//     .feature-card {
//         display: flex;
//         align-items: center;
//         gap: 14px;
//         padding: 16px;
//         background: rgba(255,255,255,0.05);
//         backdrop-filter: blur(10px);
//         border-radius: 20px;
//         border: 1px solid rgba(255,255,255,0.1);
//         transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
//         cursor: default;
//     }

//     .feature-card:hover {
//         background: rgba(255,255,255,0.1);
//         transform: translateY(-4px);
//         border-color: rgba(255,255,255,0.2);
//     }

//     .feature-card.active {
//         background: rgba(255,255,255,0.12);
//         border-color: rgba(255,255,255,0.3);
//         transform: translateY(-2px);
//     }

//     .feature-icon-badge {
//         width: 42px;
//         height: 42px;
//         border-radius: 14px;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         border: 1px solid;
//         flex-shrink: 0;
//     }

//     .feature-icon {
//         font-size: 20px;
//     }

//     .feature-card-content {
//         display: flex;
//         flex-direction: column;
//         gap: 4px;
//     }

//     .feature-card-title {
//         font-size: 14px;
//         font-weight: 600;
//         color: #fff;
//     }

//     .feature-card-desc {
//         font-size: 12px;
//         color: #cbd5e1;
//         line-height: 1.4;
//     }

//     .stats-container {
//         display: flex;
//         flex-wrap: wrap;
//         gap: 12px;
//         margin-top: 4px;
//     }

//     .stat-pill {
//         display: flex;
//         align-items: center;
//         gap: 8px;
//         padding: 8px 16px;
//         background: rgba(255,255,255,0.03);
//         border-radius: 40px;
//         border: 1px solid rgba(255,255,255,0.1);
//         font-size: 13px;
//         font-weight: 500;
//         color: #e2e8f0;
//     }

//     .stat-icon {
//         font-size: 14px;
//         color: #94a3b8;
//     }

//     .testimonial-card {
//         position: relative;
//         padding: 24px;
//         background: linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
//         border-radius: 24px;
//         border: 1px solid rgba(255,255,255,0.1);
//         backdrop-filter: blur(8px);
//         margin-top: 8px;
//     }

//     .quote-mark {
//         position: absolute;
//         top: 16px;
//         left: 20px;
//         font-size: 64px;
//         color: rgba(255,255,255,0.2);
//         font-family: Georgia, serif;
//         line-height: 1;
//     }

//     .testimonial-text {
//         font-size: 15px;
//         line-height: 1.6;
//         color: #f1f5f9;
//         margin: 0 0 20px 0;
//         position: relative;
//         z-index: 1;
//         padding-left: 24px;
//     }

//     .testimonial-footer {
//         display: flex;
//         align-items: center;
//         gap: 14px;
//     }

//     .testimonial-avatar {
//         width: 44px;
//         height: 44px;
//         border-radius: 12px;
//         background: linear-gradient(45deg, #2563eb, #7c3aed);
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         font-size: 16px;
//         font-weight: 600;
//         color: #fff;
//     }

//     .avatar-text {
//         line-height: 1;
//     }

//     .testimonial-meta {
//         display: flex;
//         flex-direction: column;
//     }

//     .testimonial-name {
//         font-size: 15px;
//         font-weight: 600;
//         color: #fff;
//     }

//     .testimonial-role {
//         font-size: 12px;
//         color: #cbd5e1;
//     }

//     .security-badge-modern {
//         display: flex;
//         align-items: center;
//         gap: 8px;
//         padding: 10px 18px;
//         background: rgba(0,0,0,0.2);
//         border-radius: 40px;
//         width: fit-content;
//         border: 1px solid rgba(74,222,128,0.2);
//         font-size: 12px;
//         font-weight: 500;
//         color: #bbf7d0;
//     }

//     /* Login Panel */
//     .login-panel {
//         flex: 0 0 50%;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         padding: clamp(20px, 4vw, 48px);
//         background: transparent;
//         position: relative;
//         z-index: 2;
//         overflow-y: auto;
//     }

//     .login-panel::-webkit-scrollbar {
//         display: none;
//     }

//     .login-card {
//         width: 100%;
//         max-width: 460px;
//         background: rgba(255,255,255,0.9);
//         backdrop-filter: blur(20px);
//         border-radius: 40px;
//         padding: clamp(28px, 4vw, 48px);
//         box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15);
//         border: 1px solid rgba(255,255,255,0.5);
//         display: flex;
//         flex-direction: column;
//         gap: 32px;
//     }

//     .login-header {
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//         gap: 12px;
//     }

//     .login-icon-container {
//         position: relative;
//         width: fit-content;
//     }

//     .login-icon-bg {
//         position: absolute;
//         width: 64px;
//         height: 64px;
//         border-radius: 20px;
//         background: linear-gradient(135deg, #dbeafe, #eff6ff);
//         transform: rotate(10deg);
//         z-index: 1;
//     }

//     .login-icon {
//         position: relative;
//         z-index: 2;
//         background: #fff;
//         padding: 16px;
//         border-radius: 20px;
//         box-shadow: 0 8px 20px rgba(37,99,235,0.15);
//     }

//     .login-title {
//         font-size: clamp(24px, 4vw, 30px);
//         font-weight: 700;
//         color: #0f172a;
//         margin: 0;
//         letter-spacing: -0.02em;
//     }

//     .login-subtitle {
//         font-size: 14px;
//         color: #64748b;
//         margin: 0;
//         font-weight: 500;
//     }

//     .form-container {
//         display: flex;
//         flex-direction: column;
//         gap: 24px;
//     }

//     .field-wrapper {
//         display: flex;
//         flex-direction: column;
//         gap: 6px;
//     }

//     .label-row {
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//     }

//     .field-label {
//         font-size: 14px;
//         font-weight: 600;
//         color: #1e293b;
//     }

//     .input-group {
//         display: flex;
//         align-items: center;
//         gap: 12px;
//         padding: 0 20px;
//         height: 56px;
//         background: #fff;
//         border-radius: 20px;
//         border: 2px solid transparent;
//         transition: all 0.2s;
//         box-shadow: 0 4px 12px rgba(0,0,0,0.02);
//     }

//     .input-group:focus-within {
//         border-color: #2563eb;
//         box-shadow: 0 0 0 4px #bfdbfe;
//     }

//     .input-group.error {
//         border-color: #ef4444;
//         box-shadow: 0 0 0 4px #fee2e2;
//     }

//     .input-icon {
//         color: #94a3b8;
//         font-size: 18px;
//     }

//     .input {
//         flex: 1;
//         border: none;
//         outline: none;
//         font-size: 15px;
//         font-weight: 500;
//         color: #0f172a;
//         background: transparent;
//         padding: 0;
//     }

//     .input::placeholder {
//         color: #94a3b8;
//         font-weight: 400;
//     }

//     .eye-button {
//         background: none;
//         border: none;
//         color: #64748b;
//         cursor: pointer;
//         padding: 8px;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         border-radius: 12px;
//         transition: background 0.2s;
//     }

//     .eye-button:hover {
//         background: #f1f5f9;
//     }

//     .error-message {
//         font-size: 12px;
//         color: #ef4444;
//         font-weight: 500;
//         margin-left: 12px;
//     }

//     .action-row {
//         display: flex;
//         gap: 12px;
//         margin-top: 8px;
//     }

//     .login-button {
//         flex: 1;
//         height: 56px;
//         background: linear-gradient(145deg, #2563eb, #1d4ed8);
//         border: none;
//         border-radius: 28px;
//         color: #fff;
//         font-size: 16px;
//         font-weight: 600;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         gap: 10px;
//         cursor: pointer;
//         transition: all 0.2s;
//         box-shadow: 0 8px 20px rgba(37,99,235,0.3);
//     }

//     .login-button:hover:not(:disabled) {
//         transform: translateY(-2px);
//         box-shadow: 0 12px 28px rgba(37,99,235,0.4);
//     }

//     .login-button:disabled {
//         opacity: 0.7;
//         cursor: not-allowed;
//     }

//     .button-icon {
//         font-size: 16px;
//         transition: transform 0.2s;
//     }

//     .login-button:hover .button-icon {
//         transform: translateX(4px);
//     }

//     .clear-button {
//         width: 56px;
//         height: 56px;
//         border-radius: 28px;
//         background: #f1f5f9;
//         border: 1px solid #e2e8f0;
//         color: #475569;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         cursor: pointer;
//         transition: all 0.2s;
//         font-size: 18px;
//     }

//     .clear-button:hover:not(:disabled) {
//         background: #e2e8f0;
//         border-color: #cbd5e1;
//     }

//     .loader {
//         width: 22px;
//         height: 22px;
//         border: 3px solid rgba(255,255,255,0.3);
//         border-top-color: #fff;
//         border-radius: 50%;
//         animation: spin 0.8s linear infinite;
//     }

//     .demo-section {
//         display: flex;
//         align-items: center;
//         justify-content: space-between;
//         background: #f8fafc;
//         padding: 14px 20px;
//         border-radius: 20px;
//         border: 1px solid #e2e8f0;
//         margin-top: 8px;
//     }

//     .demo-label {
//         font-size: 14px;
//         font-weight: 600;
//         color: #2563eb;
//     }

//     .demo-chip {
//         background: #ffffff;
//         border: 1px solid #2563eb;
//         padding: 8px 16px;
//         border-radius: 40px;
//         font-size: 13px;
//         font-weight: 600;
//         color: #2563eb;
//         cursor: pointer;
//         transition: all 0.2s;
//     }

//     .demo-chip:hover {
//         background: #2563eb;
//         color: #fff;
//     }

//     /* Support section - UPDATED STYLING */
//     .support-section {
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         gap: 10px;
//         padding: 16px 20px;
//         background: #f0f9ff;
//         border-radius: 30px;
//         border: 1px solid #bae6fd;
//         margin-top: 8px;
//     }

//     .support-text {
//         font-size: 13px;
//         color: #0369a1;
//         font-weight: 500;
//     }

//     .support-text strong {
//         color: #2563eb;
//         font-weight: 700;
//     }

//     /* Animations */
//     @keyframes float {
//         0%, 100% { transform: translateY(0) rotate(0deg); }
//         50% { transform: translateY(-20px) rotate(2deg); }
//     }

//     @keyframes floatReverse {
//         0%, 100% { transform: translateY(0) rotate(0deg); }
//         50% { transform: translateY(20px) rotate(-2deg); }
//     }

//     @keyframes pulse {
//         0%, 100% { opacity: 0.5; transform: scale(1); }
//         50% { opacity: 0.7; transform: scale(1.1); }
//     }

//     @keyframes spin {
//         to { transform: rotate(360deg); }
//     }

//     /* Responsive Design */
//     @media (max-width: 1024px) {
//         .login-container {
//             flex-direction: column;
//             height: auto;
//             overflow-y: auto;
//         }

//         .brand-panel,
//         .login-panel {
//             flex: 0 0 auto;
//             width: 100%;
//             overflow-y: visible;
//         }

//         .brand-content {
//             max-width: 100%;
//         }
//     }

//     @media (max-width: 640px) {
//         .feature-grid {
//             grid-template-columns: 1fr;
//         }

//         .login-card {
//             padding: 24px;
//         }

//         .action-row {
//             flex-direction: column;
//         }

//         .clear-button {
//             width: 100%;
//         }

//         .brand-panel {
//             padding: 24px;
//         }

//         .stats-container {
//             flex-direction: column;
//         }

//         .stat-pill {
//             width: 100%;
//         }

//         .security-badge-modern {
//             width: 100%;
//             justify-content: center;
//         }

//         .demo-section {
//             flex-direction: column;
//             gap: 12px;
//             align-items: flex-start;
//         }

//         .demo-chip {
//             width: 100%;
//         }
//     }
// `;

// // Append styles to document head
// document.head.appendChild(style);

// export default Login;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaSignInAlt,
    FaRedo,
    FaShieldAlt,
    FaCreditCard,
    FaMobileAlt,
    FaGlobeAmericas,
    FaStar,
    FaCheckCircle,
    FaArrowRight,
    FaInfinity,
    FaChartLine,
    FaFingerprint
} from "react-icons/fa";
import API from "../../api";
import { useSnackbar } from "../../Context/SnackbarContext";

const Login = () => {
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeFeature, setActiveFeature] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % 4);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (errors.email) setErrors({ ...errors, email: "" });
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (errors.password) setErrors({ ...errors, password: "" });
    };

    const handleLogin = async () => {
        if (!validateForm()) return;
        setIsLoading(true);
        try {
            const payload = { email, password };
            const response = await API.post("users/login", payload);
            const roleId = response?.data?.data?.roleId;

            if (roleId === 2) {
                showSnackbar("success", "Login successful!");
                localStorage.setItem("roleId", response?.data?.data?.roleId);
                localStorage.setItem("userId", response?.data?.data?.userId);
                localStorage.setItem("name", response?.data?.data?.userName);
                navigate("/dashboard");
            } else if (roleId === 1) {
                showSnackbar("error", "Authentication Failed");
            }
            setIsLoading(false);

        } catch (error) {
            showSnackbar("error", "Invalid credentials");
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setEmail("");
        setPassword("");
        setErrors({});
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") handleLogin();
    };

    const features = [
        { icon: FaShieldAlt, title: "Military-Grade Security", desc: "256-bit encryption", color: "#4CAF50" },
        { icon: FaCreditCard, title: "Zero Annual Fees", desc: "Premium banking", color: "#2196F3" },
        { icon: FaMobileAlt, title: "Mobile Banking", desc: "Manage accounts anytime", color: "#9C27B0" },
        { icon: FaGlobeAmericas, title: "Global Access", desc: "Bank globally", color: "#FF9800" }
    ];

    return (
        <div className="login-container">
            {/* Animated background elements */}
            <div className="bg-orb bg-orb-1" />
            <div className="bg-orb bg-orb-2" />
            <div className="bg-orb bg-orb-3" />

            {/* Left Panel - Brand Story */}
            <div className="brand-panel">
                <div className="brand-gradient" />
                <div className="brand-content">
                    {/* Animated Logo */}
                    <div className="logo-wrapper">
                        <div className="logo-glow" />
                        <div className="logo-container">
                            <FaShieldAlt size={40} color="#ffffff" />
                        </div>
                    </div>

                    {/* Bank Identity */}
                    <div className="bank-identity">
                        <h1 className="bank-name">
                            <span className="bank-name-accent">ABC</span> Bank
                        </h1>
                        <div className="bank-rating">
                            <FaStar className="star-filled" />
                            <FaStar className="star-filled" />
                            <FaStar className="star-filled" />
                            <FaStar className="star-filled" />
                            <FaStar className="star-half" />
                            <span className="rating-text">4.8/5.0</span>
                        </div>
                        <p className="bank-desc">
                            The future of secure, intelligent banking — trusted by over 2.5 million customers worldwide.
                        </p>
                    </div>

                    {/* Feature Showcase */}
                    <div className="feature-showcase">
                        <h3 className="showcase-title">Why institutions choose ABC</h3>
                        <div className="feature-grid">
                            {features.map((feat, idx) => {
                                const Icon = feat.icon;
                                return (
                                    <div
                                        key={idx}
                                        className={`feature-card ${activeFeature === idx ? 'active' : ''}`}
                                        onMouseEnter={() => setActiveFeature(idx)}
                                    >
                                        <div className="feature-icon-badge" style={{ backgroundColor: `${feat.color}20`, borderColor: feat.color }}>
                                            <Icon className="feature-icon" style={{ color: feat.color }} />
                                        </div>
                                        <div className="feature-card-content">
                                            <span className="feature-card-title">{feat.title}</span>
                                            <span className="feature-card-desc">{feat.desc}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Stats & Security */}
                    <div className="stats-container">
                        <div className="stat-pill">
                            <FaInfinity className="stat-icon" />
                            <span>99.99% uptime</span>
                        </div>
                        <div className="stat-pill">
                            <FaFingerprint className="stat-icon" />
                            <span>Biometric ready</span>
                        </div>
                        <div className="stat-pill">
                            <FaChartLine className="stat-icon" />
                            <span>SWIFT connected</span>
                        </div>
                    </div>

                    {/* Testimonial Card */}
                    <div className="testimonial-card">
                        <div className="quote-mark">“</div>
                        <p className="testimonial-text">
                            Seamless digital banking, exceptional service. ABC transformed how our business operates globally.
                        </p>
                        <div className="testimonial-footer">
                            <div className="testimonial-avatar">
                                <span className="avatar-text">SJ</span>
                            </div>
                            <div className="testimonial-meta">
                                <span className="testimonial-name">Sarah Johnson</span>
                                <span className="testimonial-role">CFO, TechFlow Inc.</span>
                            </div>
                        </div>
                    </div>

                    {/* Security Badge */}
                    <div className="security-badge-modern">
                        <FaShieldAlt size={14} color="#4ade80" />
                        <span>ISO 27001 • SOC2 • GDPR</span>
                    </div>
                </div>
            </div>

            {/* Right Panel - Login Portal */}
            <div className="login-panel">
                <div className="login-card">
                    {/* Header */}
                    <div className="login-header">
                        <div className="login-icon-container">
                            <div className="login-icon-bg" />
                            <FaSignInAlt size={32} color="#2563eb" className="login-icon" />
                        </div>
                        <h2 className="login-title">Access your account</h2>
                        <p className="login-subtitle">
                            Please enter your credentials
                        </p>
                    </div>

                    {/* Form Fields */}
                    <div className="form-container">
                        {/* Email */}
                        <div className="field-wrapper">
                            <label className="field-label">Email address</label>
                            <div className={`input-group ${errors.email ? 'error' : ''}`}>
                                <FaEnvelope className="input-icon" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    onKeyPress={handleKeyPress}
                                    className="login-input"
                                />
                            </div>
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        {/* Password */}
                        <div className="field-wrapper">
                            <label className="field-label">Password</label>
                            <div className={`input-group ${errors.password ? 'error' : ''}`}>
                                <FaLock className="input-icon" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    onKeyPress={handleKeyPress}
                                    className="login-input"
                                />
                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="eye-button"
                                    type="button"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.password && <span className="error-message">{errors.password}</span>}
                        </div>

                        {/* Action Buttons */}
                        <div className="action-row">
                            <button
                                className="login-button"
                                onClick={handleLogin}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="loader" />
                                ) : (
                                    <>
                                        <span>Sign in</span>
                                        <FaArrowRight className="button-icon" />
                                    </>
                                )}
                            </button>
                            <button
                                className="clear-button"
                                onClick={handleReset}
                                disabled={isLoading}
                                type="button"
                                title="Clear fields"
                            >
                                <FaRedo />
                            </button>
                        </div>

                        {/* Demo Access */}
                        <div className="demo-section">
                            <span className="demo-label">Demo access</span>
                            <button
                                className="demo-chip"
                                onClick={() => {
                                    setEmail("demo@abcbank.com");
                                    setPassword("demo1234");
                                }}
                                type="button"
                            >
                                Prefill credentials
                            </button>
                        </div>
                    </div>

                    {/* Support */}
                    <div className="support-section">
                        <FaMobileAlt size={16} color="#2563eb" />
                        <span className="support-text">24/7 support: <strong>1-800-ABC-BANK</strong></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Create style element with all CSS - FIXED to remove nested textbox issues
const style = document.createElement('style');
style.textContent = `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .login-container {
        display: flex;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        position: relative;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    /* Animated background */
    .bg-orb {
        position: absolute;
        border-radius: 50%;
        z-index: 0;
        animation: float 30s infinite ease-in-out;
    }

    .bg-orb-1 {
        width: 70vmax;
        height: 70vmax;
        background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent 70%);
        top: -20vmax;
        right: -10vmax;
    }

    .bg-orb-2 {
        width: 60vmax;
        height: 60vmax;
        background: radial-gradient(circle at 70% 70%, rgba(255,255,255,0.1), transparent 70%);
        bottom: -30vmax;
        left: -20vmax;
        animation: floatReverse 35s infinite ease-in-out;
    }

    .bg-orb-3 {
        width: 50vmax;
        height: 50vmax;
        background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1), transparent 70%);
        bottom: 10vmax;
        right: 20vmax;
        animation: float 40s infinite ease-in-out;
    }

    /* Brand Panel */
    .brand-panel {
        flex: 0 0 50%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 48px;
        overflow-y: auto;
        z-index: 2;
    }

    .brand-panel::-webkit-scrollbar {
        display: none;
    }

    .brand-gradient {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(145deg, #1a1a2e 0%, #16213e 100%);
        opacity: 0.95;
        z-index: 1;
    }

    .brand-content {
        position: relative;
        z-index: 2;
        max-width: 560px;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 32px;
        color: #fff;
    }

    .logo-wrapper {
        position: relative;
        width: fit-content;
        margin-bottom: 8px;
    }

    .logo-glow {
        position: absolute;
        width: 80px;
        height: 80px;
        border-radius: 24px;
        background: linear-gradient(135deg, #4facfe, #00f2fe);
        filter: blur(20px);
        opacity: 0.5;
        animation: pulse 3s infinite;
    }

    .logo-container {
        width: 72px;
        height: 72px;
        border-radius: 20px;
        background: linear-gradient(145deg, #4facfe, #00f2fe);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        border: 1px solid rgba(255,255,255,0.2);
        position: relative;
    }

    .bank-identity {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .bank-name {
        font-size: 48px;
        font-weight: 700;
        letter-spacing: -0.02em;
        margin: 0;
        line-height: 1.1;
    }

    .bank-name-accent {
        background: linear-gradient(to right, #4facfe, #00f2fe);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .bank-rating {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .star-filled {
        color: #fbbf24;
        font-size: 18px;
    }

    .star-half {
        color: #fbbf24;
        font-size: 18px;
        opacity: 0.8;
    }

    .rating-text {
        margin-left: 8px;
        font-size: 14px;
        font-weight: 500;
        color: #a0aec0;
    }

    .bank-desc {
        font-size: 16px;
        line-height: 1.6;
        color: #e2e8f0;
        max-width: 480px;
        margin: 8px 0 0 0;
    }

    .feature-showcase {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-top: 8px;
    }

    .showcase-title {
        font-size: 18px;
        font-weight: 600;
        margin: 0;
        color: #f1f5f9;
    }

    .feature-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
    }

    .feature-card {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 16px;
        background: rgba(255,255,255,0.05);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        border: 1px solid rgba(255,255,255,0.1);
        transition: all 0.2s ease;
        cursor: default;
    }

    .feature-card:hover {
        background: rgba(255,255,255,0.1);
        transform: translateY(-2px);
    }

    .feature-card.active {
        background: rgba(255,255,255,0.12);
        border-color: rgba(255,255,255,0.3);
    }

    .feature-icon-badge {
        width: 42px;
        height: 42px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid;
        flex-shrink: 0;
    }

    .feature-icon {
        font-size: 20px;
    }

    .feature-card-content {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .feature-card-title {
        font-size: 14px;
        font-weight: 600;
        color: #fff;
    }

    .feature-card-desc {
        font-size: 12px;
        color: #cbd5e1;
        line-height: 1.4;
    }

    .stats-container {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 4px;
    }

    .stat-pill {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: rgba(255,255,255,0.03);
        border-radius: 40px;
        border: 1px solid rgba(255,255,255,0.1);
        font-size: 13px;
        font-weight: 500;
        color: #e2e8f0;
    }

    .stat-icon {
        font-size: 14px;
        color: #94a3b8;
    }

    .testimonial-card {
        position: relative;
        padding: 24px;
        background: linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
        border-radius: 24px;
        border: 1px solid rgba(255,255,255,0.1);
        backdrop-filter: blur(8px);
        margin-top: 8px;
    }

    .quote-mark {
        position: absolute;
        top: 16px;
        left: 20px;
        font-size: 64px;
        color: rgba(255,255,255,0.2);
        font-family: Georgia, serif;
        line-height: 1;
    }

    .testimonial-text {
        font-size: 15px;
        line-height: 1.6;
        color: #f1f5f9;
        margin: 0 0 20px 0;
        position: relative;
        z-index: 1;
        padding-left: 24px;
    }

    .testimonial-footer {
        display: flex;
        align-items: center;
        gap: 14px;
    }

    .testimonial-avatar {
        width: 44px;
        height: 44px;
        border-radius: 12px;
        background: linear-gradient(45deg, #4facfe, #00f2fe);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-weight: 600;
        color: #fff;
    }

    .avatar-text {
        line-height: 1;
    }

    .testimonial-meta {
        display: flex;
        flex-direction: column;
    }

    .testimonial-name {
        font-size: 15px;
        font-weight: 600;
        color: #fff;
    }

    .testimonial-role {
        font-size: 12px;
        color: #cbd5e1;
    }

    .security-badge-modern {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 18px;
        background: rgba(0,0,0,0.2);
        border-radius: 40px;
        width: fit-content;
        border: 1px solid rgba(74,222,128,0.2);
        font-size: 12px;
        font-weight: 500;
        color: #bbf7d0;
    }

    /* Login Panel */
    .login-panel {
        flex: 0 0 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 48px;
        background: transparent;
        position: relative;
        z-index: 2;
        overflow-y: auto;
    }

    .login-panel::-webkit-scrollbar {
        display: none;
    }

    .login-card {
        width: 100%;
        max-width: 420px;
        background: rgba(255,255,255,0.95);
        backdrop-filter: blur(20px);
        border-radius: 32px;
        padding: 40px;
        box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
        border: 1px solid rgba(255,255,255,0.5);
        display: flex;
        flex-direction: column;
        gap: 28px;
    }

    .login-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
    }

    .login-icon-container {
        position: relative;
        width: fit-content;
    }

    .login-icon-bg {
        position: absolute;
        width: 64px;
        height: 64px;
        border-radius: 20px;
        background: linear-gradient(135deg, #4facfe, #00f2fe);
        transform: rotate(10deg);
        z-index: 1;
    }

    .login-icon {
        position: relative;
        z-index: 2;
        background: white;
        padding: 16px;
        border-radius: 20px;
        box-shadow: 0 8px 20px rgba(79,172,254,0.15);
    }

    .login-title {
        font-size: 28px;
        font-weight: 700;
        color: #1e293b;
        margin: 0;
        letter-spacing: -0.02em;
    }

    .login-subtitle {
        font-size: 14px;
        color: #64748b;
        margin: 0;
    }

    .form-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .field-wrapper {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .field-label {
        font-size: 14px;
        font-weight: 600;
        color: #334155;
    }

    .input-group {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 0 16px;
        height: 52px;
        background: #ffffff;
        border-radius: 16px;
        border: 1.5px solid #e2e8f0;
        transition: all 0.2s;
        box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    }

    .input-group:focus-within {
        border-color: #4facfe;
        box-shadow: 0 0 0 4px rgba(79,172,254,0.1);
    }

    .input-group.error {
        border-color: #ef4444;
    }

    .input-icon {
        color: #94a3b8;
        font-size: 18px;
        flex-shrink: 0;
    }

    .login-input {
        flex: 1;
        border: none;
        outline: none;
        font-size: 15px;
        color: #1e293b;
        background: transparent;
        height: 100%;
        width: 100%;
    }

    .login-input::placeholder {
        color: #94a3b8;
    }

    .eye-button {
        background: none;
        border: none;
        color: #64748b;
        cursor: pointer;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        transition: background 0.2s;
        flex-shrink: 0;
    }

    .eye-button:hover {
        background: #f1f5f9;
    }

    .error-message {
        font-size: 12px;
        color: #ef4444;
        font-weight: 500;
        margin-left: 12px;
    }

    .action-row {
        display: flex;
        gap: 12px;
        margin-top: 8px;
    }

    .login-button {
        flex: 1;
        height: 52px;
        background: linear-gradient(145deg, #4facfe, #00f2fe);
        border: none;
        border-radius: 26px;
        color: #fff;
        font-size: 16px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        cursor: pointer;
        transition: all 0.2s;
        box-shadow: 0 8px 20px rgba(79,172,254,0.3);
    }

    .login-button:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 12px 28px rgba(79,172,254,0.4);
    }

    .login-button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .button-icon {
        font-size: 16px;
        transition: transform 0.2s;
    }

    .login-button:hover .button-icon {
        transform: translateX(4px);
    }

    .clear-button {
        width: 52px;
        height: 52px;
        border-radius: 26px;
        background: #ffffff;
        border: 1.5px solid #e2e8f0;
        color: #64748b;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 18px;
    }

    .clear-button:hover:not(:disabled) {
        background: #f8fafc;
        border-color: #4facfe;
        color: #4facfe;
    }

    .loader {
        width: 22px;
        height: 22px;
        border: 3px solid rgba(255,255,255,0.3);
        border-top-color: #fff;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }

    .demo-section {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #f8fafc;
        padding: 12px 16px;
        border-radius: 16px;
        border: 1px solid #e2e8f0;
        margin-top: 8px;
    }

    .demo-label {
        font-size: 14px;
        font-weight: 600;
        color: #4facfe;
    }

    .demo-chip {
        background: white;
        border: 1px solid #4facfe;
        padding: 8px 16px;
        border-radius: 30px;
        font-size: 13px;
        font-weight: 600;
        color: #4facfe;
        cursor: pointer;
        transition: all 0.2s;
    }

    .demo-chip:hover {
        background: #4facfe;
        color: white;
    }

    .support-section {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 12px;
        background: #f0f9ff;
        border-radius: 30px;
        border: 1px solid #bae6fd;
        margin-top: 8px;
    }

    .support-text {
        font-size: 13px;
        color: #0369a1;
        font-weight: 500;
    }

    .support-text strong {
        color: #4facfe;
        font-weight: 700;
    }

    /* Animations */
    @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(2deg); }
    }

    @keyframes floatReverse {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(20px) rotate(-2deg); }
    }

    @keyframes pulse {
        0%, 100% { opacity: 0.5; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(1.1); }
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
        .login-container {
            flex-direction: column;
            height: auto;
            overflow-y: auto;
        }

        .brand-panel,
        .login-panel {
            flex: 0 0 auto;
            width: 100%;
            overflow-y: visible;
        }

        .brand-content {
            max-width: 100%;
        }
    }

    @media (max-width: 640px) {
        .feature-grid {
            grid-template-columns: 1fr;
        }

        .login-card {
            padding: 24px;
        }

        .action-row {
            flex-direction: column;
        }

        .clear-button {
            width: 100%;
        }

        .brand-panel {
            padding: 24px;
        }

        .demo-section {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
        }

        .demo-chip {
            width: 100%;
        }
    }
`;

// Append styles to document head
document.head.appendChild(style);

export default Login;