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
    FaUserCircle
} from "react-icons/fa";

const Sidebar = () => {
    const [openServices, setOpenServices] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeItem, setActiveItem] = useState("dashboard");
    
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
            icon: FaHistory,
            label: "Transactions",
            path: "/transactions",
            badge: "12"
        },
        {
            id: "analytics",
            icon: FaChartLine,
            label: "Analytics",
            path: "/analytics",
            badge: null
        },
        {
            id: "profile",
            icon: FaUser,
            label: "Profile",
            path: "/profile",
            badge: null
        },
        {
            id: "settings",
            icon: FaCog,
            label: "Settings",
            path: "/settings",
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
                    {/* Bank Info - Collapsible */}
                    {!isCollapsed && (
                        <div style={styles.bankInfo}>
                            <FaBuilding size={14} color="#94a3b8" />
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
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        color: "#1e293b",
        display: "none",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
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
        background: "linear-gradient(180deg, #ffffff 0%, #fafbfc 100%)",
        color: "#1e293b",
        padding: "0",
        boxShadow: "4px 0 20px rgba(0,0,0,0.03)",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 1000,
        borderRight: "1px solid rgba(0,0,0,0.05)",
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
        background: "linear-gradient(135deg, #4361ee15, #3a0ca315)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    logoIconCollapsed: {
        width: "44px",
        height: "44px",
        borderRadius: "12px",
        background: "linear-gradient(135deg, #4361ee15, #3a0ca315)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
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
        color: "#64748b",
        fontWeight: "500",
        letterSpacing: "1px",
    },
    collapseBtn: {
        width: "32px",
        height: "32px",
        borderRadius: "8px",
        border: "1px solid #e2e8f0",
        backgroundColor: "#ffffff",
        color: "#64748b",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.2s",
        fontSize: "12px",
        flexShrink: 0,
        ":hover": {
            backgroundColor: "#f8fafc",
            borderColor: "#4361ee",
            color: "#4361ee",
        }
    },
    userSummary: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "16px 20px",
        margin: "0 16px 20px",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
        position: "relative",
    },
    userAvatar: {
        width: "48px",
        height: "48px",
        borderRadius: "14px",
        background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    userInfo: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },
    userName: {
        fontSize: "15px",
        fontWeight: "600",
        color: "#0f172a",
    },
    userRole: {
        fontSize: "12px",
        color: "#64748b",
        fontWeight: "500",
    },
    notificationBadge: {
        position: "relative",
        width: "32px",
        height: "32px",
        borderRadius: "10px",
        backgroundColor: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#475569",
        cursor: "pointer",
    },
    notificationCount: {
        position: "absolute",
        top: "-4px",
        right: "-4px",
        backgroundColor: "#ef4444",
        color: "#ffffff",
        fontSize: "10px",
        fontWeight: "600",
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    searchContainer: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "0 20px",
        margin: "0 16px 24px",
        height: "48px",
        backgroundColor: "#ffffff",
        borderRadius: "14px",
        border: "1px solid #e2e8f0",
        transition: "all 0.2s",
        ":focus-within": {
            borderColor: "#4361ee",
            boxShadow: "0 0 0 4px #4361ee15",
        }
    },
    searchIcon: {
        color: "#94a3b8",
        fontSize: "16px",
    },
    searchInput: {
        flex: 1,
        border: "none",
        outline: "none",
        backgroundColor: "transparent",
        fontSize: "14px",
        color: "#1e293b",
        padding: "0",
        "::placeholder": {
            color: "#94a3b8",
        }
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
        color: "#475569",
        position: "relative",
        ":hover": {
            backgroundColor: "#f1f5f9",
            color: "#0f172a",
        }
    },
    activeLink: {
        backgroundColor: "#4361ee0d",
        color: "#4361ee",
        fontWeight: "600",
        borderLeft: "3px solid #4361ee",
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
        color: "#94a3b8",
    },
    subMenu: {
        listStyle: "none",
        padding: "8px 0 8px 44px",
        margin: "4px 0 8px",
        borderLeft: "2px dashed #e2e8f0",
    },
    subMenuItem: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "4px 8px",
        borderRadius: "10px",
        cursor: "pointer",
        fontSize: "14px",
        color: "#475569",
        transition: "all 0.2s",
        marginBottom: "2px",
        ":hover": {
            backgroundColor: "#f8fafc",
            color: "#0f172a",
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
        backgroundColor: "#f8fafc",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
    },
    bankInfoText: {
        fontSize: "13px",
        color: "#475569",
        fontWeight: "500",
    },
    logoutLink: {
        backgroundColor: "#fef2f2",
        color: "#ef4444",
        marginBottom: "12px",
        ":hover": {
            backgroundColor: "#fee2e2",
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
        color: "#94a3b8",
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