import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    FaTachometerAlt,
    FaCreditCard,
    FaUser,
    FaChevronDown,
    FaChevronRight,
    FaChevronLeft,
    FaBook,
    FaSignOutAlt,
    FaShieldAlt,
    FaBuilding,
    FaChartLine,
    FaCog,
    FaBell,
    FaSearch,
    FaBars,
    FaTimes,
    FaExchangeAlt,
    FaFileInvoiceDollar,
    FaHistory,
    FaUserCircle,
    FaSun,
    FaMoon,
    FaArrowLeft,
    FaArrowRight,
    FaRegCircle,
    FaRegCreditCard,
    FaLandmark
} from "react-icons/fa";

// ─── THEME — identical to Dashboard & Services ────────────────────────────────
const T = {
    navyDeep:   "#0B1829",
    navyDark:   "#0F2035",
    navyMid:    "#152845",
    navyLight:  "#1C3558",
    navyBorder: "#1F3D5C",
    gold:       "#F5A623",
    goldLight:  "#FFD166",
    goldGlow:   "rgba(245,166,35,0.18)",
    white:      "#FFFFFF",
    offWhite:   "#E8EFF7",
    muted:      "#8AAAC8",
    mutedDark:  "#4A6B8A",
    danger:     "#EF4444",
    dangerDim:  "rgba(239,68,68,0.12)",
};

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────
const SIDEBAR_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600;700&display=swap');

/* Sidebar scrollbar */
.sb-aside::-webkit-scrollbar { width: 4px; }
.sb-aside::-webkit-scrollbar-track { background: transparent; }
.sb-aside::-webkit-scrollbar-thumb { background: ${T.navyLight}; border-radius: 4px; }
.sb-aside::-webkit-scrollbar-thumb:hover { background: ${T.gold}; }

/* Animations */
@keyframes sb-gradientMove {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
@keyframes sb-fadeIn {
    from { opacity: 0; } to { opacity: 1; }
}
@keyframes sb-pulseGold {
    0%, 100% { box-shadow: 0 0 0 0 rgba(245,166,35,0.4); }
    50%       { box-shadow: 0 0 0 6px rgba(245,166,35,0); }
}
@keyframes sb-slideIn {
    from { opacity: 0; transform: translateX(-12px); }
    to   { opacity: 1; transform: translateX(0); }
}

/* Nav item hover */
.sb-nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.22s cubic-bezier(0.22,1,0.36,1);
    position: relative;
    border: 1px solid transparent;
    text-decoration: none;
    color: ${T.muted};
}
.sb-nav-item:hover {
    background: rgba(245,166,35,0.07);
    border-color: rgba(245,166,35,0.15);
    color: ${T.offWhite};
    transform: translateX(3px);
}
.sb-nav-item:hover .sb-nav-icon {
    background: ${T.goldGlow};
    border-color: rgba(245,166,35,0.3);
    color: ${T.gold};
}
.sb-nav-item.sb-active {
    background: linear-gradient(90deg, rgba(245,166,35,0.14), rgba(245,166,35,0.04));
    border-color: rgba(245,166,35,0.25);
    color: ${T.gold};
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}
.sb-nav-item.sb-active .sb-nav-icon {
    background: ${T.goldGlow};
    border-color: rgba(245,166,35,0.4);
    color: ${T.gold};
}
.sb-nav-item.sb-active::before {
    content: '';
    position: absolute;
    left: 0; top: 20%; bottom: 20%;
    width: 3px;
    background: ${T.gold};
    border-radius: 0 3px 3px 0;
}

/* Nav icon wrapper */
.sb-nav-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: 1px solid ${T.navyBorder};
    background: ${T.navyMid};
    flex-shrink: 0;
    transition: all 0.22s ease;
}

/* Nav label */
.sb-nav-label {
    font-size: 14px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    white-space: nowrap;
    overflow: hidden;
    transition: opacity 0.2s ease, transform 0.2s ease;
}
.sb-active .sb-nav-label { font-weight: 600; }

/* Logout item */
.sb-logout-item {
    display: flex;
    align-items: center;
    gap: 12px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.22s ease;
    border: 1px solid rgba(239,68,68,0.2);
    background: rgba(239,68,68,0.07);
    color: ${T.danger};
}
.sb-logout-item:hover {
    background: rgba(239,68,68,0.14);
    border-color: rgba(239,68,68,0.4);
    transform: translateX(3px);
    box-shadow: 0 4px 16px rgba(239,68,68,0.15);
}

/* Toggle arrow button */
.sb-toggle-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: 1px solid ${T.navyBorder};
    background: ${T.navyMid};
    color: ${T.muted};
    cursor: pointer;
    transition: all 0.22s ease;
    flex-shrink: 0;
}
.sb-toggle-btn:hover {
    background: ${T.goldGlow};
    border-color: rgba(245,166,35,0.4);
    color: ${T.gold};
    box-shadow: 0 0 12px ${T.goldGlow};
}

/* Mobile toggle */
.sb-mobile-btn {
    position: fixed;
    top: 18px; left: 18px;
    z-index: 1001;
    width: 44px; height: 44px;
    border-radius: 12px;
    background: ${T.navyDark};
    border: 1px solid ${T.navyBorder};
    color: ${T.gold};
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(0,0,0,0.4);
    transition: all 0.22s ease;
}
.sb-mobile-btn:hover {
    background: ${T.goldGlow};
    border-color: rgba(245,166,35,0.4);
    box-shadow: 0 4px 20px rgba(245,166,35,0.2);
}

/* Overlay */
.sb-overlay {
    position: fixed;
    inset: 0;
    background: rgba(5,12,25,0.7);
    backdrop-filter: blur(6px);
    z-index: 999;
    animation: sb-fadeIn 0.2s ease;
}

/* Animated gold bottom bar */
.sb-gold-bar {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, ${T.gold}, ${T.goldLight}, ${T.gold}, transparent);
    background-size: 300% 100%;
    animation: sb-gradientMove 4s ease infinite;
}

/* Tooltip for collapsed mode */
.sb-tooltip-wrap { position: relative; }
.sb-tooltip {
    position: absolute;
    left: calc(100% + 12px);
    top: 50%;
    transform: translateY(-50%);
    background: ${T.navyLight};
    color: ${T.offWhite};
    font-size: 12px;
    font-weight: 500;
    padding: 6px 12px;
    border-radius: 8px;
    border: 1px solid ${T.navyBorder};
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.18s ease;
    box-shadow: 0 4px 16px rgba(0,0,0,0.4);
    z-index: 100;
    font-family: 'DM Sans', sans-serif;
}
.sb-tooltip::before {
    content: '';
    position: absolute;
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    border: 5px solid transparent;
    border-right-color: ${T.navyLight};
}
.sb-tooltip-wrap:hover .sb-tooltip { opacity: 1; }

/* Responsive */
@media (max-width: 1024px) {
    .sb-mobile-btn { display: flex !important; }
}
@media (max-width: 640px) {
    .sb-aside { max-width: 280px !important; }
}
`;

// ─── MENU ITEMS (unchanged) ───────────────────────────────────────────────────
const menuItems = [
    {
        id: "dashboard",
        icon: FaTachometerAlt,
        label: "Account Details",
        path: "/dashboard",
        accentColor: T.gold,
    },
    {
        id: "services",
        icon: FaCreditCard,
        label: "Services",
        path: "/services",
        accentColor: "#60A5FA",
    },
    {
        id: "transactions",
        icon: FaExchangeAlt,
        label: "Transactions",
        path: "/transactions",
        accentColor: "#34D399",
    },
    {
        id: "profile",
        icon: FaUser,
        label: "Profile",
        path: "/profile",
        accentColor: "#A78BFA",
    },
    {
        id: "my-requests",
        icon: FaCog,
        label: "My Requests",
        path: "/my-requests",
        accentColor: "#FB923C",
    },
];

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
const Sidebar = () => {
    const [isCollapsed,   setIsCollapsed]   = useState(false);
    const [isMobileOpen,  setIsMobileOpen]  = useState(false);
    const [activeItem,    setActiveItem]    = useState("dashboard");

    const navigate  = useNavigate();
    const location  = useLocation();

    // Inject global CSS once
    useEffect(() => {
        const tag = document.createElement("style");
        tag.id = "sidebar-global-css";
        tag.textContent = SIDEBAR_CSS;
        if (!document.getElementById("sidebar-global-css")) document.head.appendChild(tag);
        return () => { const el = document.getElementById("sidebar-global-css"); if (el) el.remove(); };
    }, []);

    // Sync active item from route
    useEffect(() => {
        const path = location.pathname;
        if (path.includes("dashboard"))    setActiveItem("dashboard");
        else if (path.includes("services"))     setActiveItem("services");
        else if (path.includes("profile"))      setActiveItem("profile");
        else if (path.includes("transactions")) setActiveItem("transactions");
        else if (path.includes("analytics"))    setActiveItem("analytics");
        else if (path.includes("settings"))     setActiveItem("settings");
        else if (path.includes("my-requests"))  setActiveItem("my-requests");
    }, [location]);

    // Close mobile sidebar on route change
    useEffect(() => { setIsMobileOpen(false); }, [location]);

    // Responsive collapse
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsCollapsed(true);
                setIsMobileOpen(false);
            } else {
                setIsCollapsed(false);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSidebar = () => {
        if (window.innerWidth < 1024) {
            setIsMobileOpen(v => !v);
        } else {
            const next = !isCollapsed;
            setIsCollapsed(next);
            window.dispatchEvent(new CustomEvent("sidebarToggle", { detail: { isCollapsed: next } }));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("roleId");
        localStorage.removeItem("name");
        navigate("/");
    };

    const handleNavigation = (path, item) => {
        setActiveItem(item);
        navigate(path);
    };

    const sidebarWidth = isCollapsed ? "76px" : "272px";
    const sidebarLeft  = isMobileOpen ? "0" : (window.innerWidth < 1024 ? "-280px" : "0");

    return (
        <>
            {/* Mobile overlay */}
            {isMobileOpen && (
                <div className="sb-overlay" onClick={() => setIsMobileOpen(false)} />
            )}

            {/* Mobile toggle button */}
            <button className="sb-mobile-btn" onClick={toggleSidebar} aria-label="Toggle sidebar">
                {isMobileOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
            </button>

            {/* ── SIDEBAR ─────────────────────────────────────────────────── */}
            <aside
                className="sb-aside"
                style={{
                    position: "fixed",
                    top: 0, left: sidebarLeft,
                    height: "100vh",
                    width: sidebarWidth,
                    background: `linear-gradient(180deg, ${T.navyDeep} 0%, ${T.navyDark} 60%, ${T.navyDeep} 100%)`,
                    borderRight: `1px solid ${T.navyBorder}`,
                    boxShadow: "6px 0 32px rgba(0,0,0,0.45)",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                    zIndex: 1000,
                    overflowY: "auto",
                    overflowX: "hidden",
                    paddingBottom: 16,
                }}
            >
                {/* ── HEADER / LOGO ────────────────────────────────────────── */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isCollapsed ? "center" : "space-between",
                    padding: isCollapsed ? "20px 0" : "20px 18px",
                    borderBottom: `1px solid ${T.navyBorder}`,
                    marginBottom: 16,
                    position: "relative",
                    flexShrink: 0,
                }}>
                    {/* Gold top accent line */}
                    <div style={{
                        position: "absolute", top: 0, left: 0, right: 0, height: 2,
                        background: `linear-gradient(90deg, transparent, ${T.gold}, transparent)`,
                        opacity: 0.7,
                    }} />

                    {/* Logo */}
                    {!isCollapsed && (
                        <div style={{ display: "flex", alignItems: "center", gap: 12, animation: "sb-slideIn 0.3s ease" }}>
                            {/* Icon */}
                            <div style={{
                                width: 44, height: 44, borderRadius: 12,
                                background: `linear-gradient(135deg, ${T.navyMid}, ${T.navyLight})`,
                                border: `1.5px solid ${T.gold}`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                boxShadow: `0 0 16px ${T.goldGlow}`,
                                position: "relative", flexShrink: 0,
                            }}>
                                <FaLandmark size={18} color={T.gold} style={{ position: "absolute" }} />
                                <FaShieldAlt size={11} color={T.goldLight} style={{ position: "absolute", bottom: 6, right: 6 }} />
                            </div>
                            {/* Text */}
                            <div>
                                <div style={{
                                    fontSize: 20, fontWeight: 700, lineHeight: 1.1,
                                    fontFamily: "'Playfair Display', serif",
                                    letterSpacing: "-0.3px",
                                }}>
                                    <span style={{ color: T.white }}>ABC</span>
                                    <span style={{ color: T.gold }}> Bank</span>
                                </div>
                                <div style={{
                                    fontSize: 10, color: T.muted, letterSpacing: "1.5px",
                                    textTransform: "uppercase", marginTop: 2,
                                    fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                                }}>
                                    Trusted · Secure · Yours
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Collapsed logo */}
                    {isCollapsed && (
                        <div style={{
                            width: 44, height: 44, borderRadius: 12,
                            background: `linear-gradient(135deg, ${T.navyMid}, ${T.navyLight})`,
                            border: `1.5px solid ${T.gold}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            boxShadow: `0 0 12px ${T.goldGlow}`,
                            position: "relative",
                            animation: "sb-pulseGold 3s infinite",
                        }}>
                            <FaLandmark size={18} color={T.gold} style={{ position: "absolute" }} />
                            <FaShieldAlt size={11} color={T.goldLight} style={{ position: "absolute", bottom: 6, right: 6 }} />
                        </div>
                    )}

                    {/* Collapse/Expand arrow — only visible in desktop expanded mode */}
                    {!isCollapsed && (
                        <button
                            className="sb-toggle-btn"
                            style={{ width: 32, height: 32 }}
                            onClick={toggleSidebar}
                            title="Collapse sidebar"
                        >
                            <FaArrowLeft size={13} />
                        </button>
                    )}
                </div>

                {/* Collapsed expand button */}
                {isCollapsed && window.innerWidth >= 1024 && (
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 8, flexShrink: 0 }}>
                        <button
                            className="sb-toggle-btn"
                            style={{ width: 36, height: 36 }}
                            onClick={toggleSidebar}
                            title="Expand sidebar"
                        >
                            <FaArrowRight size={13} />
                        </button>
                    </div>
                )}

                {/* ── SECTION LABEL ───────────────────────────────────────── */}
                {!isCollapsed && (
                    <div style={{
                        padding: "0 18px 8px",
                        fontSize: 10, fontWeight: 700,
                        color: T.mutedDark, letterSpacing: "1.2px",
                        textTransform: "uppercase",
                        fontFamily: "'DM Sans', sans-serif",
                        flexShrink: 0,
                    }}>
                        Navigation
                    </div>
                )}

                {/* ── NAV ITEMS ────────────────────────────────────────────── */}
                <nav style={{ flex: 1, padding: isCollapsed ? "0 8px" : "0 10px", flexShrink: 0 }}>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4 }}>
                        {menuItems.map((item, idx) => (
                            <li key={item.id}>
                                <div
                                    className={`sb-nav-item sb-tooltip-wrap ${activeItem === item.id ? "sb-active" : ""}`}
                                    style={{
                                        padding: isCollapsed ? "12px 0" : "12px 14px",
                                        justifyContent: isCollapsed ? "center" : "flex-start",
                                        animationDelay: `${idx * 50}ms`,
                                    }}
                                    onClick={() => handleNavigation(item.path, item.id)}
                                    title={isCollapsed ? item.label : ""}
                                >
                                    {/* Icon */}
                                    <div
                                        className="sb-nav-icon"
                                        style={{
                                            width: isCollapsed ? 40 : 36,
                                            height: isCollapsed ? 40 : 36,
                                        }}
                                    >
                                        <item.icon
                                            size={isCollapsed ? 18 : 16}
                                            color={activeItem === item.id ? T.gold : T.muted}
                                        />
                                    </div>

                                    {/* Label */}
                                    {!isCollapsed && (
                                        <span className="sb-nav-label">{item.label}</span>
                                    )}

                                    {/* Active dot indicator on right when expanded */}
                                    {!isCollapsed && activeItem === item.id && (
                                        <div style={{
                                            marginLeft: "auto",
                                            width: 6, height: 6, borderRadius: "50%",
                                            background: T.gold,
                                            boxShadow: `0 0 8px ${T.gold}`,
                                            flexShrink: 0,
                                        }} />
                                    )}

                                    {/* Tooltip for collapsed */}
                                    {isCollapsed && (
                                        <span className="sb-tooltip">{item.label}</span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* ── DIVIDER ─────────────────────────────────────────────── */}
                <div style={{
                    height: 1,
                    margin: "16px 16px",
                    background: `linear-gradient(90deg, transparent, ${T.navyBorder}, transparent)`,
                    flexShrink: 0,
                }} />

                {/* ── LOGOUT ──────────────────────────────────────────────── */}
                <div style={{ padding: isCollapsed ? "0 8px" : "0 10px", flexShrink: 0 }}>
                    <div
                        className={`sb-logout-item sb-tooltip-wrap`}
                        style={{
                            padding: isCollapsed ? "12px 0" : "12px 14px",
                            justifyContent: isCollapsed ? "center" : "flex-start",
                        }}
                        onClick={handleLogout}
                    >
                        <div style={{
                            width: isCollapsed ? 40 : 36,
                            height: isCollapsed ? 40 : 36,
                            borderRadius: 10,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            background: T.dangerDim,
                            border: `1px solid rgba(239,68,68,0.2)`,
                            flexShrink: 0,
                        }}>
                            <FaSignOutAlt size={isCollapsed ? 18 : 16} color={T.danger} />
                        </div>

                        {!isCollapsed && (
                            <span style={{
                                fontSize: 14, fontWeight: 600,
                                fontFamily: "'DM Sans', sans-serif",
                                color: T.danger, whiteSpace: "nowrap",
                            }}>
                                Log Out
                            </span>
                        )}

                        {isCollapsed && (
                            <span className="sb-tooltip" style={{
                                color: T.danger, borderColor: "rgba(239,68,68,0.3)",
                                background: T.navyLight,
                            }}>Log Out</span>
                        )}
                    </div>
                </div>

                {/* ── ANIMATED GOLD BOTTOM BAR ─────────────────────────────── */}
                <div className="sb-gold-bar" />
            </aside>
        </>
    );
};

export default Sidebar;
