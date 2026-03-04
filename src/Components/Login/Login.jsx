import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaSignInAlt,
    FaRedo,
    FaCreditCard,
    FaMobileAlt,
    FaGlobeAmericas,
    FaStar,
    FaArrowRight,
    FaInfinity,
    FaUniversity,
    FaShieldAlt,
    FaChartLine
} from "react-icons/fa";
import API from "../../api";
import { useSnackbar } from "../../Context/SnackbarContext";

// Constants
const BANK_BACKGROUND_IMAGE = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FEATURES = [
    { icon: FaCreditCard, title: "Zero Annual Fees", desc: "Premium banking with no hidden charges", color: "#c8922a" },
    { icon: FaMobileAlt, title: "Mobile Banking", desc: "Manage accounts anytime, anywhere", color: "#1a5276" },
    { icon: FaGlobeAmericas, title: "Global Access", desc: "Seamless banking across borders", color: "#c8922a" },
    { icon: FaShieldAlt, title: "Secure & Trusted", desc: "Bank-grade encryption always on", color: "#1a5276" }
];

const STATS = [
    { value: "99.99%", label: "Uptime", icon: FaInfinity },
    { value: "50M+", label: "Customers", icon: FaChartLine },
    { value: "4.8★", label: "Rated", icon: FaStar },
];

const Login = () => {
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeFeature, setActiveFeature] = useState(0);
    const [inputFocused, setInputFocused] = useState({ email: false, password: false });
    const [mounted, setMounted] = useState(false);

    const { email, password } = formData;

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % FEATURES.length);
        }, 2800);
        return () => clearInterval(interval);
    }, []);

    const validateForm = useCallback(() => {
        const newErrors = {};
        if (!email) newErrors.email = "Email is required";
        else if (!EMAIL_REGEX.test(email)) newErrors.email = "Please enter a valid email address";
        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [email, password]);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    }, [errors]);

    const handleLogin = useCallback(async () => {
        if (!validateForm()) return;
        setIsLoading(true);
        try {
            const response = await API.post("users/login", { email, password });
            const roleId = response?.data?.data?.roleId;
            if (roleId === 2) {
                showSnackbar("success", "Login successful!");
                const userData = response?.data?.data;
                localStorage.setItem("roleId", userData?.roleId);
                localStorage.setItem("userId", userData?.userId);
                localStorage.setItem("name", userData?.userName);
                navigate("/dashboard");
            } else {
                showSnackbar("error", "Invalid credentials");
            }
        } catch {
            showSnackbar("error", "Invalid credentials");
        } finally {
            setIsLoading(false);
        }
    }, [email, password, validateForm, navigate, showSnackbar]);

    const handleReset = useCallback(() => {
        setFormData({ email: "", password: "" });
        setErrors({});
    }, []);

    const handleKeyPress = useCallback((e) => {
        if (e.key === "Enter" && !isLoading) handleLogin();
    }, [handleLogin, isLoading]);

    const togglePasswordVisibility = useCallback(() => {
        setShowPassword(prev => !prev);
    }, []);

    return (
        <div className={`login-root ${mounted ? 'mounted' : ''}`}>
            {/* Animated background pattern */}
            <div className="bg-layer">
                <div className="bg-stripe bg-stripe-1" />
                <div className="bg-stripe bg-stripe-2" />
                <div className="bg-stripe bg-stripe-3" />
                <div className="bg-grid" />
                <div className="bg-glow-1" />
                <div className="bg-glow-2" />
            </div>

            {/* ── LEFT BRAND PANEL ── */}
            <aside className="brand-panel">
                {/* Bank image with overlay */}
                <div className="brand-bg-image" style={{ backgroundImage: `url(${BANK_BACKGROUND_IMAGE})` }} />
                <div className="brand-overlay" />

                <div className="brand-inner">
                    {/* Logo Row */}
                    <div className="brand-logo-row">
                        <div className="brand-logo-box">
                            <div className="brand-logo-shine" />
                            <FaUniversity className="brand-logo-icon" />
                        </div>
                        <div className="brand-title-wrap">
                            <h1 className="brand-name">
                                <span className="brand-name-gold">ABC</span> Bank
                            </h1>
                            <p className="brand-tagline">Trusted. Secure. Yours.</p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="brand-divider">
                        <span className="divider-line" />
                        <span className="divider-dot" />
                        <span className="divider-line" />
                    </div>

                    {/* Features Grid */}
                    <div className="features-wrap">
                        <p className="features-label">Why customers trust us</p>
                        <div className="features-grid">
                            {FEATURES.map((feat, idx) => {
                                const Icon = feat.icon;
                                const isActive = activeFeature === idx;
                                return (
                                    <div
                                        key={idx}
                                        className={`feat-card ${isActive ? 'feat-card--active' : ''}`}
                                        onMouseEnter={() => setActiveFeature(idx)}
                                        role="button"
                                        tabIndex={0}
                                    >
                                        <div className="feat-icon-wrap" style={{ '--feat-color': feat.color }}>
                                            <Icon className="feat-icon" />
                                            <div className="feat-icon-ring" />
                                        </div>
                                        <div className="feat-text">
                                            <span className="feat-title">{feat.title}</span>
                                            <span className="feat-desc">{feat.desc}</span>
                                        </div>
                                        <div className="feat-active-bar" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="stats-row">
                        {STATS.map((s, i) => {
                            const Icon = s.icon;
                            return (
                                <div key={i} className="stat-block">
                                    <Icon className="stat-icon" />
                                    <span className="stat-value">{s.value}</span>
                                    <span className="stat-label">{s.label}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Testimonial */}
                    <div className="testimonial">
                        <div className="testimonial-quote">"</div>
                        <p className="testimonial-text">
                            Seamless digital banking and exceptional service — ABC Bank transformed how our business operates globally.
                        </p>
                    </div>
            
                    {/* Uptime badge */}
                    <div className="uptime-badge">
                        <span className="uptime-dot" />
                        <span>All systems operational · 99.99% uptime</span>
                    </div>
                </div>
            </aside>

            {/* ── RIGHT LOGIN PANEL ── */}
            <main className="login-panel">
                <div className="login-card">
                    {/* Top accent bar */}
                    <div className="card-accent-bar" />

                    {/* Header */}
                    <div className="login-header">
                        <div className="login-icon-wrap">
                            <div className="login-icon-halo" />
                            <FaSignInAlt className="login-icon-svg" />
                        </div>
                        <h2 className="login-title">Welcome Back</h2>
                        <p className="login-sub">Sign in to your ABC Bank account</p>

                        {/* Security badge */}
                        <div className="security-badge">
                            <FaShieldAlt className="security-icon" />
                        </div>
                    </div>

                    {/* Form */}
                    <div className="form-body">
                        {/* Email */}
                        <div className="field-group">
                            <label className="field-label" htmlFor="email">Email Address</label>
                            <div className={`field-input-wrap ${errors.email ? 'is-error' : ''} ${inputFocused.email ? 'is-focused' : ''}`}>
                                <FaEnvelope className="field-icon" />
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={handleInputChange}
                                    onKeyPress={handleKeyPress}
                                    onFocus={() => setInputFocused(p => ({ ...p, email: true }))}
                                    onBlur={() => setInputFocused(p => ({ ...p, email: false }))}
                                    className="field-input"
                                    disabled={isLoading}
                                    autoComplete="email"
                                />
                                <div className="field-focus-bar" />
                            </div>
                            {errors.email && <span className="field-error">{errors.email}</span>}
                        </div>

                        {/* Password */}
                        <div className="field-group">
                            <label className="field-label" htmlFor="password">Password</label>
                            <div className={`field-input-wrap ${errors.password ? 'is-error' : ''} ${inputFocused.password ? 'is-focused' : ''}`}>
                                <FaLock className="field-icon" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={handleInputChange}
                                    onKeyPress={handleKeyPress}
                                    onFocus={() => setInputFocused(p => ({ ...p, password: true }))}
                                    onBlur={() => setInputFocused(p => ({ ...p, password: false }))}
                                    className="field-input"
                                    disabled={isLoading}
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="eye-btn"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    disabled={isLoading}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                                <div className="field-focus-bar" />
                            </div>
                            {errors.password && <span className="field-error">{errors.password}</span>}
                        </div>

                        {/* Buttons */}
                        <div className="btn-row">
                            <button
                                className="btn-login"
                                onClick={handleLogin}
                                disabled={isLoading}
                                type="button"
                            >
                                <span className="btn-login-bg" />
                                {isLoading ? (
                                    <span className="btn-loader" />
                                ) : (
                                    <>
                                        <span className="btn-text">Sign In</span>
                                        <FaArrowRight className="btn-arrow" />
                                    </>
                                )}
                            </button>
                            <button
                                className="btn-reset"
                                onClick={handleReset}
                                disabled={isLoading}
                                type="button"
                                title="Clear fields"
                                aria-label="Clear form"
                            >
                                <FaRedo className="btn-reset-icon" />
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="card-footer">
                        <div className="support-row">
                            <FaMobileAlt className="support-icon" />
                            <span>24/7 Support</span>
                        </div>
                    </div>
                </div>

                {/* Bottom note */}
                <p className="login-note">
                    © 2025 ABC Bank. All rights reserved. &nbsp;|&nbsp; Member of FDIC &nbsp;|&nbsp; Equal Housing Lender
                </p>
            </main>

            <style>{`
                /* ── RESET & ROOT ── */
                *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

                /* ── CANARA-INSPIRED PALETTE ──
                   Deep Navy   : #0d2137
                   Rich Blue   : #1a4a7a
                   Gold Accent : #c8922a
                   Warm Gold   : #e8b84b
                   Off-White   : #f5f0e8
                   Charcoal    : #1c1c2e
                */

                .login-root {
                    display: flex;
                    width: 100vw;
                    min-height: 100vh;
                    overflow: hidden;
                    position: relative;
                    background: #0a1929;
                    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
                    opacity: 0;
                    transition: opacity 0.6s ease;
                }

                .login-root.mounted { opacity: 1; }

                /* ── BACKGROUND ── */
                .bg-layer {
                    position: fixed;
                    inset: 0;
                    z-index: 0;
                    overflow: hidden;
                }

                .bg-grid {
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(200,146,42,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(200,146,42,0.04) 1px, transparent 1px);
                    background-size: 48px 48px;
                }

                .bg-stripe {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    opacity: 0.6;
                    animation: orbFloat 20s infinite ease-in-out;
                }

                .bg-stripe-1 {
                    width: 700px; height: 700px;
                    background: radial-gradient(circle, rgba(26,74,122,0.4) 0%, transparent 70%);
                    top: -200px; left: -100px;
                    animation-duration: 22s;
                }

                .bg-stripe-2 {
                    width: 600px; height: 600px;
                    background: radial-gradient(circle, rgba(200,146,42,0.15) 0%, transparent 70%);
                    bottom: -150px; right: 10%;
                    animation-duration: 28s;
                    animation-direction: reverse;
                }

                .bg-stripe-3 {
                    width: 400px; height: 400px;
                    background: radial-gradient(circle, rgba(26,74,122,0.25) 0%, transparent 70%);
                    top: 50%; right: 25%;
                    animation-duration: 18s;
                }

                .bg-glow-1 {
                    position: absolute;
                    width: 2px; height: 100%;
                    left: 50%; top: 0;
                    background: linear-gradient(to bottom, transparent 0%, rgba(200,146,42,0.3) 40%, rgba(200,146,42,0.3) 60%, transparent 100%);
                }

                .bg-glow-2 {
                    position: absolute;
                    width: 100%; height: 1px;
                    left: 0; top: 50%;
                    background: linear-gradient(to right, transparent 0%, rgba(200,146,42,0.15) 50%, transparent 100%);
                }

                /* ── BRAND PANEL (LEFT) ── */
                .brand-panel {
                    flex: 0 0 52%;
                    position: relative;
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                    overflow-y: auto;
                    z-index: 2;
                    min-height: 100vh;
                    padding: 0;
                }

                .brand-panel::-webkit-scrollbar { width: 4px; }
                .brand-panel::-webkit-scrollbar-track { background: transparent; }
                .brand-panel::-webkit-scrollbar-thumb { background: rgba(200,146,42,0.4); border-radius: 4px; }

                .brand-bg-image {
                    position: absolute;
                    inset: 0;
                    background-size: cover;
                    background-position: center;
                    z-index: 0;
                }

                .brand-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        160deg,
                        rgba(10,25,41,0.97) 0%,
                        rgba(13,33,55,0.95) 50%,
                        rgba(26,74,122,0.88) 100%
                    );
                    z-index: 1;
                }

                /* Decorative vertical golden stripe */
                .brand-panel::after {
                    content: '';
                    position: absolute;
                    right: 0; top: 0; bottom: 0;
                    width: 3px;
                    background: linear-gradient(to bottom,
                        transparent 0%,
                        rgba(200,146,42,0.8) 20%,
                        rgba(232,184,75,1) 50%,
                        rgba(200,146,42,0.8) 80%,
                        transparent 100%
                    );
                    z-index: 10;
                }

                .brand-inner {
                    position: relative;
                    z-index: 5;
                    width: 100%;
                    max-width: 580px;
                    padding: 52px 56px 52px 64px;
                    display: flex;
                    flex-direction: column;
                    gap: 32px;
                }

                /* Logo row */
                .brand-logo-row {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    animation: fadeSlideDown 0.7s ease both;
                }

                .brand-logo-box {
                    width: 72px; height: 72px;
                    border-radius: 18px;
                    background: linear-gradient(145deg, #1a4a7a, #0d2137);
                    border: 1px solid rgba(200,146,42,0.5);
                    display: flex; align-items: center; justify-content: center;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(200,146,42,0.2);
                    flex-shrink: 0;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .brand-logo-box:hover {
                    transform: translateY(-3px) scale(1.04);
                    box-shadow: 0 16px 40px rgba(0,0,0,0.5), 0 0 30px rgba(200,146,42,0.2);
                }

                .brand-logo-shine {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(200,146,42,0.15) 0%, transparent 60%);
                    animation: logoShine 4s infinite ease-in-out;
                }

                .brand-logo-icon {
                    font-size: 34px;
                    color: #e8b84b;
                    position: relative;
                    z-index: 2;
                    filter: drop-shadow(0 2px 8px rgba(200,146,42,0.5));
                }

                .brand-title-wrap { display: flex; flex-direction: column; gap: 4px; }

                .brand-name {
                    font-family: 'Playfair Display', Georgia, serif;
                    font-size: 42px;
                    font-weight: 800;
                    line-height: 1;
                    color: #f5f0e8;
                    letter-spacing: -0.01em;
                    text-shadow: 0 2px 20px rgba(0,0,0,0.3);
                }

                .brand-name-gold { color: #e8b84b; }

                .brand-tagline {
                    font-size: 13px;
                    font-weight: 400;
                    color: rgba(200,146,42,0.8);
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                }

                /* Divider */
                .brand-divider {
                    display: flex; align-items: center; gap: 10px;
                    animation: fadeSlideDown 0.7s 0.1s ease both;
                }

                .divider-line {
                    flex: 1; height: 1px;
                    background: linear-gradient(to right, transparent, rgba(200,146,42,0.5), transparent);
                }

                .divider-dot {
                    width: 6px; height: 6px;
                    border-radius: 50%;
                    background: #e8b84b;
                    box-shadow: 0 0 10px rgba(232,184,75,0.6);
                }

                /* Features */
                .features-wrap {
                    display: flex; flex-direction: column; gap: 14px;
                    animation: fadeSlideDown 0.7s 0.2s ease both;
                }

                .features-label {
                    font-size: 11px;
                    font-weight: 600;
                    color: rgba(200,146,42,0.7);
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                }

                .features-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                }

                .feat-card {
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 14px 16px;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 14px;
                    cursor: default;
                    transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
                    overflow: hidden;
                }

                .feat-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(200,146,42,0.06) 0%, transparent 100%);
                    opacity: 0;
                    transition: opacity 0.35s ease;
                }

                .feat-card:hover::before, .feat-card--active::before { opacity: 1; }

                .feat-card:hover {
                    background: rgba(255,255,255,0.07);
                    border-color: rgba(200,146,42,0.35);
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                }

                .feat-card--active {
                    background: rgba(200,146,42,0.08);
                    border-color: rgba(200,146,42,0.45);
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.25), 0 0 0 1px rgba(200,146,42,0.2);
                }

                .feat-active-bar {
                    position: absolute;
                    left: 0; top: 0; bottom: 0;
                    width: 3px;
                    background: linear-gradient(to bottom, #c8922a, #e8b84b);
                    border-radius: 0 2px 2px 0;
                    opacity: 0;
                    transition: opacity 0.35s ease;
                }

                .feat-card--active .feat-active-bar { opacity: 1; }

                .feat-icon-wrap {
                    width: 40px; height: 40px;
                    border-radius: 10px;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    display: flex; align-items: center; justify-content: center;
                    position: relative;
                    flex-shrink: 0;
                    transition: all 0.35s ease;
                }

                .feat-card:hover .feat-icon-wrap,
                .feat-card--active .feat-icon-wrap {
                    background: rgba(200,146,42,0.12);
                    border-color: rgba(200,146,42,0.35);
                    box-shadow: 0 0 16px rgba(200,146,42,0.2);
                }

                .feat-icon {
                    font-size: 16px;
                    color: var(--feat-color);
                    position: relative; z-index: 2;
                    transition: transform 0.3s ease;
                }

                .feat-card:hover .feat-icon { transform: scale(1.15); }

                .feat-icon-ring {
                    position: absolute;
                    inset: -4px;
                    border-radius: 14px;
                    border: 1px solid var(--feat-color);
                    opacity: 0;
                    transition: opacity 0.35s ease;
                }

                .feat-card--active .feat-icon-ring { opacity: 0.3; }

                .feat-text {
                    display: flex; flex-direction: column; gap: 2px;
                    position: relative; z-index: 2;
                }

                .feat-title {
                    font-size: 12.5px;
                    font-weight: 600;
                    color: rgba(245,240,232,0.95);
                }

                .feat-desc {
                    font-size: 10.5px;
                    color: rgba(245,240,232,0.45);
                    line-height: 1.4;
                }

                /* Stats */
                .stats-row {
                    display: flex;
                    gap: 0;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 14px;
                    overflow: hidden;
                    animation: fadeSlideDown 0.7s 0.3s ease both;
                }

                .stat-block {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                    padding: 16px 12px;
                    position: relative;
                    transition: background 0.3s ease;
                }

                .stat-block:not(:last-child)::after {
                    content: '';
                    position: absolute;
                    right: 0; top: 20%; bottom: 20%;
                    width: 1px;
                    background: rgba(255,255,255,0.08);
                }

                .stat-block:hover { background: rgba(200,146,42,0.06); }

                .stat-icon {
                    font-size: 14px;
                    color: #c8922a;
                    margin-bottom: 2px;
                }

                .stat-value {
                    font-family: 'Playfair Display', serif;
                    font-size: 18px;
                    font-weight: 700;
                    color: #e8b84b;
                    line-height: 1;
                }

                .stat-label {
                    font-size: 10px;
                    color: rgba(245,240,232,0.4);
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                }

                /* Testimonial */
                .testimonial {
                    position: relative;
                    padding: 24px 24px 20px 32px;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-left: 3px solid rgba(200,146,42,0.6);
                    border-radius: 14px;
                    animation: fadeSlideDown 0.7s 0.4s ease both;
                    transition: all 0.3s ease;
                }

                .testimonial:hover {
                    background: rgba(255,255,255,0.06);
                    border-color: rgba(255,255,255,0.1);
                    border-left-color: #e8b84b;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
                }

                .testimonial-quote {
                    position: absolute;
                    top: 8px; left: 12px;
                    font-family: 'Playfair Display', serif;
                    font-size: 56px;
                    color: rgba(200,146,42,0.25);
                    line-height: 1;
                    pointer-events: none;
                }

                .testimonial-text {
                    font-size: 14px;
                    line-height: 1.7;
                    color: rgba(245,240,232,0.75);
                    font-style: italic;
                    position: relative; z-index: 2;
                    margin-bottom: 16px;
                }

                .testimonial-author {
                    display: flex; align-items: center; gap: 12px;
                }

                .testimonial-avatar {
                    width: 36px; height: 36px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #1a4a7a, #c8922a);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 12px; font-weight: 700;
                    color: #f5f0e8;
                    flex-shrink: 0;
                }

                .testimonial-name {
                    display: block;
                    font-size: 13px;
                    font-weight: 600;
                    color: rgba(245,240,232,0.9);
                }

                .testimonial-role {
                    display: block;
                    font-size: 11px;
                    color: rgba(200,146,42,0.7);
                }

                /* Uptime badge */
                .uptime-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    background: rgba(34, 197, 94, 0.08);
                    border: 1px solid rgba(34, 197, 94, 0.2);
                    border-radius: 40px;
                    font-size: 11.5px;
                    color: rgba(245,240,232,0.5);
                    align-self: flex-start;
                    animation: fadeSlideDown 0.7s 0.5s ease both;
                }

                .uptime-dot {
                    width: 8px; height: 8px;
                    border-radius: 50%;
                    background: #22c55e;
                    box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
                    animation: pulse 2s infinite;
                }

                /* ── LOGIN PANEL (RIGHT) ── */
                .login-panel {
                    flex: 0 0 48%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 40px 40px;
                    position: relative;
                    z-index: 2;
                    min-height: 100vh;
                    overflow-y: auto;
                    gap: 20px;
                }

                .login-panel::-webkit-scrollbar { width: 4px; }
                .login-panel::-webkit-scrollbar-thumb { background: rgba(200,146,42,0.3); border-radius: 4px; }

                .login-card {
                    width: 100%;
                    max-width: 420px;
                    background: rgba(15, 28, 45, 0.92);
                    backdrop-filter: blur(24px);
                    border-radius: 24px;
                    border: 1px solid rgba(255,255,255,0.08);
                    box-shadow:
                        0 32px 80px rgba(0,0,0,0.6),
                        0 0 0 1px rgba(200,146,42,0.1),
                        inset 0 1px 0 rgba(255,255,255,0.06);
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    animation: cardSlideIn 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
                }

                .card-accent-bar {
                    height: 4px;
                    background: linear-gradient(90deg, #0d2137 0%, #c8922a 30%, #e8b84b 50%, #c8922a 70%, #1a4a7a 100%);
                    position: relative;
                }

                .card-accent-bar::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
                    animation: shimmer 3s infinite ease-in-out;
                }

                .login-header {
                    padding: 36px 36px 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                }

                /* Login icon */
                .login-icon-wrap {
                    position: relative;
                    width: 68px; height: 68px;
                    display: flex; align-items: center; justify-content: center;
                    margin-bottom: 4px;
                }

                .login-icon-halo {
                    position: absolute;
                    inset: 0;
                    border-radius: 20px;
                    background: linear-gradient(135deg, #1a4a7a, #c8922a);
                    transform: rotate(8deg);
                    opacity: 0.8;
                    transition: transform 0.3s ease, opacity 0.3s ease;
                }

                .login-card:hover .login-icon-halo {
                    transform: rotate(12deg) scale(1.05);
                    opacity: 1;
                }

                .login-icon-svg {
                    font-size: 28px;
                    color: #f5f0e8;
                    background: rgba(13, 33, 55, 0.9);
                    padding: 14px;
                    border-radius: 18px;
                    position: relative; z-index: 2;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
                    transition: transform 0.3s ease;
                }

                .login-card:hover .login-icon-svg { transform: scale(1.05); }

                .login-title {
                    font-family: 'Playfair Display', serif;
                    font-size: 26px;
                    font-weight: 700;
                    color: #f5f0e8;
                    margin: 0;
                    letter-spacing: -0.01em;
                    text-align: center;
                }

                .login-sub {
                    font-size: 13px;
                    color: rgba(245,240,232,0.45);
                    text-align: center;
                }

                /* Security badge */
                .security-badge {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 14px;
                    background: rgba(26,74,122,0.2);
                    border: 1px solid rgba(26,74,122,0.4);
                    border-radius: 30px;
                    font-size: 11px;
                    color: rgba(245,240,232,0.5);
                    margin-top: 4px;
                }

                .security-icon { color: #c8922a; font-size: 11px; }

                /* Form */
                .form-body {
                    padding: 28px 36px 0;
                    display: flex;
                    flex-direction: column;
                    gap: 18px;
                }

                .field-group {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .field-label {
                    font-size: 12px;
                    font-weight: 600;
                    color: rgba(245,240,232,0.6);
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                }

                .field-input-wrap {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 0 14px;
                    height: 50px;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    position: relative;
                    transition: all 0.25s ease;
                    overflow: hidden;
                }

                .field-focus-bar {
                    position: absolute;
                    bottom: 0; left: 10%; right: 10%;
                    height: 2px;
                    background: linear-gradient(90deg, #c8922a, #e8b84b);
                    border-radius: 2px;
                    transform: scaleX(0);
                    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
                    transform-origin: center;
                }

                .field-input-wrap.is-focused {
                    border-color: rgba(200,146,42,0.5);
                    background: rgba(255,255,255,0.06);
                    box-shadow: 0 0 0 3px rgba(200,146,42,0.08);
                }

                .field-input-wrap.is-focused .field-focus-bar { transform: scaleX(1); }

                .field-input-wrap.is-error {
                    border-color: rgba(239, 68, 68, 0.5);
                    background: rgba(239, 68, 68, 0.04);
                }

                .field-icon {
                    color: rgba(245,240,232,0.3);
                    font-size: 15px;
                    flex-shrink: 0;
                    transition: color 0.25s ease;
                }

                .field-input-wrap.is-focused .field-icon { color: #c8922a; }

                .field-input {
                    flex: 1;
                    border: none;
                    outline: none;
                    font-size: 14px;
                    color: #f5f0e8;
                    background: transparent;
                    height: 100%;
                    font-family: 'DM Sans', sans-serif;
                }

                .field-input::placeholder { color: rgba(245,240,232,0.25); }
                .field-input:disabled { opacity: 0.5; cursor: not-allowed; }

                .eye-btn {
                    background: none; border: none;
                    color: rgba(245,240,232,0.3);
                    cursor: pointer; padding: 6px;
                    display: flex; align-items: center; justify-content: center;
                    border-radius: 6px;
                    transition: all 0.2s ease;
                    flex-shrink: 0;
                }

                .eye-btn:hover:not(:disabled) {
                    color: #c8922a;
                    background: rgba(200,146,42,0.1);
                }

                .eye-btn:disabled { opacity: 0.4; cursor: not-allowed; }

                .field-error {
                    font-size: 11px;
                    color: #f87171;
                    font-weight: 500;
                    padding-left: 4px;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .field-error::before {
                    content: '⚠';
                    font-size: 10px;
                }

                .forgot-row {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: -6px;
                }

                .forgot-link {
                    font-size: 12px;
                    color: rgba(200,146,42,0.7);
                    cursor: pointer;
                    transition: color 0.2s ease;
                    text-decoration: underline;
                    text-underline-offset: 2px;
                    text-decoration-color: transparent;
                    transition: all 0.2s ease;
                }

                .forgot-link:hover {
                    color: #e8b84b;
                    text-decoration-color: #e8b84b;
                }

                /* Buttons */
                .btn-row {
                    display: flex;
                    gap: 10px;
                    margin-top: 4px;
                }

                .btn-login {
                    flex: 1; height: 50px;
                    border: none; border-radius: 12px;
                    color: #0d2137;
                    font-size: 15px; font-weight: 700;
                    font-family: 'DM Sans', sans-serif;
                    display: flex; align-items: center; justify-content: center;
                    gap: 8px;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
                    background: transparent;
                    box-shadow: 0 4px 16px rgba(200,146,42,0.3);
                }

                .btn-login-bg {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, #c8922a 0%, #e8b84b 50%, #c8922a 100%);
                    background-size: 200% 100%;
                    transition: background-position 0.4s ease;
                }

                .btn-login:hover:not(:disabled) .btn-login-bg {
                    background-position: 100% 0;
                }

                .btn-login:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px rgba(200,146,42,0.4);
                }

                .btn-login:active:not(:disabled) { transform: translateY(0); }

                .btn-login:disabled { opacity: 0.6; cursor: not-allowed; }

                .btn-text, .btn-arrow { position: relative; z-index: 2; }

                .btn-arrow {
                    font-size: 13px;
                    transition: transform 0.3s ease;
                }

                .btn-login:hover:not(:disabled) .btn-arrow { transform: translateX(5px); }

                .btn-reset {
                    width: 50px; height: 50px;
                    border-radius: 12px;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: rgba(245,240,232,0.4);
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 15px;
                }

                .btn-reset:hover:not(:disabled) {
                    background: rgba(200,146,42,0.1);
                    border-color: rgba(200,146,42,0.4);
                    color: #c8922a;
                }

                .btn-reset:disabled { opacity: 0.4; cursor: not-allowed; }

                .btn-reset-icon { transition: transform 0.5s ease; }
                .btn-reset:hover:not(:disabled) .btn-reset-icon { transform: rotate(180deg); }

                .btn-loader {
                    width: 20px; height: 20px;
                    border: 2px solid rgba(13,33,55,0.3);
                    border-top-color: #0d2137;
                    border-radius: 50%;
                    animation: spin 0.7s linear infinite;
                    position: relative; z-index: 2;
                }

                /* Card Footer */
                .card-footer {
                    padding: 24px 36px 30px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    align-items: center;
                    margin-top: 8px;
                }

                .support-row {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 20px;
                    background: rgba(200,146,42,0.07);
                    border: 1px solid rgba(200,146,42,0.2);
                    border-radius: 30px;
                    font-size: 12px;
                    color: rgba(245,240,232,0.5);
                    width: 100%;
                    justify-content: center;
                    transition: all 0.25s ease;
                }

                .support-row:hover {
                    background: rgba(200,146,42,0.12);
                    border-color: rgba(200,146,42,0.35);
                    color: rgba(245,240,232,0.7);
                }

                .support-row strong { color: #e8b84b; font-weight: 600; }

                .support-icon { color: #c8922a; font-size: 13px; }

                .weather-row {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 12px;
                    color: rgba(245,240,232,0.35);
                }

                .login-note {
                    font-size: 10.5px;
                    color: rgba(245,240,232,0.2);
                    text-align: center;
                    line-height: 1.6;
                    max-width: 420px;
                }

                /* ── ANIMATIONS ── */
                @keyframes orbFloat {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    33% { transform: translate(30px, -20px) rotate(3deg); }
                    66% { transform: translate(-20px, 15px) rotate(-2deg); }
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; box-shadow: 0 0 8px rgba(34, 197, 94, 0.6); }
                    50% { opacity: 0.7; box-shadow: 0 0 16px rgba(34, 197, 94, 0.9); }
                }

                @keyframes spin { to { transform: rotate(360deg); } }

                @keyframes fadeSlideDown {
                    from { opacity: 0; transform: translateY(-16px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes cardSlideIn {
                    from { opacity: 0; transform: translateY(24px) scale(0.97); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                @keyframes logoShine {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 0.8; }
                }

                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }

                /* ── RESPONSIVE ── */
                @media (max-width: 1024px) {
                    .login-root { flex-direction: column; overflow-y: auto; }
                    .brand-panel, .login-panel {
                        flex: none; width: 100%; min-height: auto;
                    }
                    .brand-panel::after { display: none; }
                    .brand-inner { padding: 40px 32px; }
                    .login-panel { padding: 40px 24px; }
                }

                @media (max-width: 640px) {
                    .features-grid { grid-template-columns: 1fr; }
                    .brand-logo-row { flex-direction: column; align-items: flex-start; }
                    .brand-name { font-size: 32px; }
                    .login-header, .form-body, .card-footer { padding-left: 24px; padding-right: 24px; }
                    .btn-row { flex-direction: column; }
                    .btn-reset { width: 100%; }
                    .stats-row { flex-direction: column; }
                    .stat-block:not(:last-child)::after { display: none; }
                }
            `}</style>
        </div>
    );
};

export default Login;
