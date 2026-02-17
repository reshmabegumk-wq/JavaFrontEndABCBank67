import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProfileBar from "../Profile/Profile";
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
    FaMoon
} from "react-icons/fa";
import { useTheme } from "../../Context/ThemeContext";

const Sidebar = () => {
    const [openServices, setOpenServices] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeItem, setActiveItem] = useState("dashboard");
    const { theme, toggleTheme } = useTheme();

    const navigate = useNavigate();
    const location = useLocation();

    // Set active item based on current route
    useEffect(() => {
        const path = location.pathname;
        if (path.includes("dashboard")) setActiveItem("dashboard");
        else if (path.includes("services")) setActiveItem("services");
        else if (path.includes("profile")) setActiveItem("profile");
        else if (path.includes("transactions")) setActiveItem("transactions");
        else if (path.includes("analytics")) setActiveItem("analytics");
        else if (path.includes("settings")) setActiveItem("settings");
    }, [location]);

    // Close mobile sidebar on route change
    useEffect(() => {
        setIsMobileOpen(false);
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const handleNavigation = (path, item) => {
        setActiveItem(item);
        navigate(path);
    };

    // Responsive collapse handler
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
            setIsMobileOpen(!isMobileOpen);
        } else {
            setIsCollapsed(!isCollapsed);
            // Dispatch custom event for Layout
            window.dispatchEvent(
                new CustomEvent("sidebarToggle", {
                    detail: { isCollapsed: !isCollapsed }
                })
            );
        }
    };

    const menuItems = [
        {
            id: "dashboard",
            icon: FaTachometerAlt,
            label: "Account Details",
            path: "/dashboard",
            badge: null
        },
        {
            id: "services",
            icon: FaCreditCard,
            label: "Services",
            path: "/services",
        },
        {
            id: "transactions",
            icon: FaExchangeAlt,
            label: "Transactions",
            path: "/transactions",
        },
        {
            id: "profile",
            icon: FaUser,
            label: "Profile",
            path: "/profile",
            badge: null
        },
        {
            id: "My Requests",
            icon: FaCog,
            label: "My Requests",
            path: "/my-requests",
            badge: null
        }
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    style={styles.overlay}
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Mobile Toggle Button */}
            <button
                style={styles.mobileToggle}
                onClick={toggleSidebar}
            >
                <FaBars />
            </button>

            {/* Sidebar */}
            <aside
                style={{
                    ...styles.sidebar,
                    width: isCollapsed ? "80px" : "280px",
                    left: isMobileOpen ? "0" : window.innerWidth < 1024 ? "-280px" : "0",
                }}
            >
                {/* Sidebar Header with Always Visible Collapse Button */}
                <div style={{
                    ...styles.header,
                    justifyContent: isCollapsed ? "center" : "space-between",
                    alignItems: "center",
                    padding: isCollapsed ? "20px 0" : "0 20px",
                }}>
                    {/* Logo - Hidden when collapsed */}
                    {!isCollapsed && (
                        <div style={styles.logoContainer}>
                            <div style={styles.logoIcon}>
                                <FaShieldAlt size={28} color="#4361ee" />
                            </div>
                            <div style={styles.logoText}>
                                <span style={styles.logoMain}>ABC</span>
                                <span style={styles.logoSub}>Bank</span>
                            </div>
                        </div>
                    )}

                    <button
                        style={{
                            // ...styles.collapseBtn,
                            position: isCollapsed ? "relative" : "static",
                            marginLeft: isCollapsed ? "0" : "0",
                            marginTop: isCollapsed ? "0" : "20px",
                        }}
                        onClick={toggleSidebar}
                    >
                        {isCollapsed ? <FaChevronRight size={14} /> : <FaChevronLeft size={14} />}
                    </button>
                </div>
                 {/* {!isCollapsed && <ProfileBar />} */}

                {/* Navigation Menu */}
                
                <nav style={styles.nav}>
                    <ul style={styles.navList}>
                        {menuItems.map((item) => (
                            <li key={item.id} style={styles.navItem}>
                                {item.subItems ? (
                                    // Parent menu with subitems
                                    <div>
                                        <div
                                            style={{
                                                ...styles.menuLink,
                                                ...(activeItem === item.id ? styles.activeLink : {}),
                                                justifyContent: isCollapsed ? "center" : "flex-start",
                                                padding: isCollapsed ? "14px 0" : "12px 16px",
                                                margin: isCollapsed ? "0 auto" : "0",
                                                width: isCollapsed ? "48px" : "100%",
                                            }}
                                            onClick={() => setOpenServices(!openServices)}
                                        >
                                            <div style={styles.menuIcon}>
                                                <item.icon size={20} />
                                            </div>
                                            {!isCollapsed && (
                                                <>
                                                    <span style={styles.menuLabel}>{item.label}</span>
                                                    {item.badge && (
                                                        <span style={styles.badge}>{item.badge}</span>
                                                    )}
                                                    <span style={styles.chevron}>
                                                        {openServices ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
                                                    </span>
                                                </>
                                            )}
                                        </div>

                                        {/* Submenu */}
                                        {openServices && !isCollapsed && (
                                            <ul style={styles.subMenu}>
                                                {item.subItems.map((subItem, index) => (
                                                    <li
                                                        key={index}
                                                        style={styles.subMenuItem}
                                                        onClick={() => handleNavigation(subItem.path, item.id)}
                                                    >
                                                        <div style={{
                                                            ...styles.subMenuIcon,
                                                            backgroundColor: `${subItem.color}15`,
                                                            color: subItem.color
                                                        }}>
                                                            <subItem.icon size={14} />
                                                        </div>
                                                        <span style={styles.subMenuLabel}>{subItem.label}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ) : (
                                    <div
                                        style={{
                                            ...styles.menuLink,
                                            ...(activeItem === item.id ? styles.activeLink : {}),
                                            justifyContent: isCollapsed ? "center" : "flex-start",
                                            padding: isCollapsed ? "14px 0" : "12px 16px",
                                            margin: isCollapsed ? "0 auto" : "0",
                                            width: isCollapsed ? "48px" : "100%",
                                        }}
                                        onClick={() => handleNavigation(item.path, item.id)}
                                    >
                                        <div style={styles.menuIcon}>
                                            <item.icon size={20} />
                                        </div>
                                        {!isCollapsed && (
                                            <>
                                                <span style={styles.menuLabel}>{item.label}</span>
                                                {item.badge && (
                                                    <span style={styles.badge}>{item.badge}</span>
                                                )}
                                            </>
                                        )}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Bottom Section */}
                <div style={styles.bottomSection}>
                    {/* Theme Toggle */}
                    <div
                        style={{
                            ...styles.menuLink,
                            justifyContent: isCollapsed ? "center" : "flex-start",
                            padding: isCollapsed ? "14px 0" : "12px 16px",
                            margin: isCollapsed ? "0 auto 12px" : "0 0 12px",
                            width: isCollapsed ? "48px" : "100%",
                        }}
                        onClick={toggleTheme}
                    >
                        <div style={styles.menuIcon}>
                            {theme === 'light' ?
                                <FaMoon size={20} color="var(--color-primary)" /> :
                                <FaSun size={20} color="#fbbf24" />
                            }
                        </div>
                        {!isCollapsed && (
                            <span style={styles.menuLabel}>
                                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                            </span>
                        )}
                    </div>

                    {/* Bank Info - Collapsible */}
                    {!isCollapsed && (
                        <div style={styles.bankInfo}>
                            <FaBuilding size={14} color="var(--color-muted)" />
                            <span style={styles.bankInfoText}>Main Branch • NYC</span>
                        </div>
                    )}

                    {/* Logout Button */}
                    <div
                        style={{
                            ...styles.menuLink,
                            ...styles.logoutLink,
                            justifyContent: isCollapsed ? "center" : "flex-start",
                            padding: isCollapsed ? "14px 0" : "12px 16px",
                            margin: isCollapsed ? "0 auto" : "0",
                            width: isCollapsed ? "48px" : "100%",
                        }}
                        onClick={handleLogout}
                    >
                        <div style={styles.menuIcon}>
                            <FaSignOutAlt size={20} color="#ef4444" />
                        </div>
                        {!isCollapsed && (
                            <span style={styles.logoutLabel}>Log Out</span>
                        )}
                    </div>

                    {/* Version Info - Collapsible */}
                    {!isCollapsed && (
                        <div style={styles.versionInfo}>
                            <span style={styles.versionText}>v2.5.0</span>
                            <span style={styles.envBadge}>PROD</span>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
};

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 999,
        backdropFilter: "blur(4px)",
    },
    mobileToggle: {
        position: "fixed",
        top: "20px",
        left: "20px",
        zIndex: 1001,
        width: "44px",
        height: "44px",
        borderRadius: "12px",
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        color: "var(--color-text)",
        display: "none",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "var(--shadow-sm)",
        transition: "all 0.2s",
        fontSize: "18px",
        "@media (max-width: 1024px)": {
            display: "flex"
        }
    },
    sidebar: {
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        background: "var(--sidebar-bg)",
        color: "var(--sidebar-text)",
        padding: "0",
        boxShadow: "4px 0 20px rgba(0,0,0,0.03)",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color var(--transition-speed)",
        zIndex: 1000,
        borderRight: "1px solid var(--sidebar-border)",
        overflowY: "auto",
        overflowX: "hidden",
    },
    header: {
        display: "flex",
        alignItems: "center",
        padding: "20px",
        marginBottom: "8px",
        position: "relative",
    },
    logoContainer: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "5px",
        marginTop: "20px",
    },
    logoIcon: {
        width: "44px",
        height: "44px",
        borderRadius: "12px",
        background: "linear-gradient(135deg, rgba(67, 97, 238, 0.15), rgba(58, 12, 163, 0.15))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    logoText: {
        display: "flex",
        flexDirection: "column",
    },
    logoMain: {
        fontSize: "22px",
        fontWeight: "800",
        background: "linear-gradient(135deg, #4361ee, #3a0ca3)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        lineHeight: 1,
    },
    logoSub: {
        fontSize: "12px",
        color: "var(--color-text-secondary)",
        fontWeight: "500",
        letterSpacing: "1px",
    },
    nav: {
        flex: 1,
        padding: "0 16px",
    },
    navList: {
        listStyle: "none",
        padding: 0,
        margin: 0,
    },
    navItem: {
        marginBottom: "4px",
    },
    menuLink: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 16px",
        borderRadius: "12px",
        cursor: "pointer",
        transition: "all 0.2s",
        color: "var(--sidebar-text)",
        opacity: 0.8,
        position: "relative",
        ":hover": {
            backgroundColor: "var(--sidebar-hover)",
            color: "var(--sidebar-text)",
            opacity: 1,
        }
    },
    activeLink: {
        backgroundColor: "var(--sidebar-active-bg)",
        color: "var(--sidebar-active-text)",
        fontWeight: "600",
        borderLeft: "3px solid var(--sidebar-active-border)",
        opacity: 1,
    },
    menuIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "24px",
    },
    menuLabel: {
        flex: 1,
        fontSize: "15px",
        fontWeight: "500",
    },
    badge: {
        padding: "4px 8px",
        backgroundColor: "#ef4444",
        color: "#ffffff",
        fontSize: "11px",
        fontWeight: "600",
        borderRadius: "20px",
        minWidth: "24px",
        textAlign: "center",
    },
    chevron: {
        color: "var(--color-text-secondary)",
    },
    subMenu: {
        listStyle: "none",
        padding: "8px 0 8px 44px",
        margin: "4px 0 8px",
        borderLeft: "2px dashed var(--sidebar-border)",
    },
    subMenuItem: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "4px 8px",
        borderRadius: "10px",
        cursor: "pointer",
        fontSize: "14px",
        color: "var(--sidebar-text)",
        opacity: 0.8,
        transition: "all 0.2s",
        marginBottom: "2px",
        ":hover": {
            backgroundColor: "var(--sidebar-hover)",
            color: "var(--sidebar-text)",
            opacity: 1,
            transform: "translateX(4px)",
        }
    },
    subMenuIcon: {
        width: "28px",
        height: "28px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    subMenuLabel: {
        fontSize: "14px",
        fontWeight: "500",
    },
    bottomSection: {
        padding: "0 16px",
        marginTop: "auto",
        marginBottom: "20px",
    },
    bankInfo: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "16px 16px",
        marginBottom: "8px",
        backgroundColor: "var(--sidebar-hover)",
        borderRadius: "12px",
        border: "1px solid var(--sidebar-border)",
    },
    bankInfoText: {
        fontSize: "13px",
        color: "var(--sidebar-text)",
        opacity: 0.8,
        fontWeight: "500",
    },
    logoutLink: {
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        color: "#ef4444",
        marginBottom: "12px",
        opacity: 1,
        ":hover": {
            backgroundColor: "rgba(239, 68, 68, 0.2)",
        }
    },
    logoutLabel: {
        fontSize: "15px",
        fontWeight: "600",
    },
    versionInfo: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px",
    },
    versionText: {
        fontSize: "12px",
        color: "var(--color-text-secondary)",
        fontWeight: "500",
    },
    envBadge: {
        fontSize: "10px",
        fontWeight: "600",
        padding: "2px 8px",
        backgroundColor: "#4361ee",
        color: "#ffffff",
        borderRadius: "20px",
        letterSpacing: "0.5px",
    }
};

// Add responsive styles
const mediaStyles = `
    @media (max-width: 1024px) {
        aside {
            left: -280px !important;
        }
        
        .mobile-toggle {
            display: flex !important;
        }
        
        .overlay {
            display: block !important;
        }
    }
    
    @media (max-width: 640px) {
        aside {
            width: 100% !important;
            max-width: 280px;
        }
        
        .user-summary {
            margin: 0 12px 20px !important;
        }
    }
`;

// Inject responsive styles
const styleSheet = document.createElement("style");
styleSheet.textContent = mediaStyles;
document.head.appendChild(styleSheet);

export default Sidebar;