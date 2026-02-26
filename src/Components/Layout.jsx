import { useState, useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar";

const Layout = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check screen size and listen for sidebar toggle events
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        const handleSidebarToggle = (e) => {
            setIsCollapsed(e.detail.isCollapsed);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        window.addEventListener("sidebarToggle", handleSidebarToggle);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("sidebarToggle", handleSidebarToggle);
        };
    }, []);

    // Calculate sidebar width for main content margin
    const sidebarWidth = isMobile ? 0 : (isCollapsed ? 80 : 280);

    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                width: "100%",
                position: "relative",
                backgroundColor: "#F8F9FA", // ICICI light gray background
                overflowX: "hidden",
            }}
        >
            {/* Sidebar - Fixed position */}
            <Sidebar />

            {/* Main Content - With dynamic margin */}
            <main
                style={{
                    flex: 1,
                    marginLeft: `${sidebarWidth}px`,
                    padding: isMobile ? "80px 24px 24px" : "32px",
                    background: "#F8F9FA", // Light gray background
                    minHeight: "100vh",
                    width: `calc(100% - ${sidebarWidth}px)`,
                    transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxSizing: "border-box",
                    position: "relative",
                }}
            >
                {/* Subtle Background Pattern - ICICI Style */}
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    pointerEvents: "none",
                    zIndex: 0,
                    backgroundImage: `
                        radial-gradient(circle at 10% 20%, rgba(255, 107, 0, 0.03) 0%, transparent 20%),
                        radial-gradient(circle at 90% 70%, rgba(255, 107, 0, 0.03) 0%, transparent 20%),
                        linear-gradient(45deg, rgba(255, 107, 0, 0.02) 25%, transparent 25%),
                        linear-gradient(-45deg, rgba(255, 107, 0, 0.02) 25%, transparent 25%)
                    `,
                    backgroundSize: "100% 100%, 100% 100%, 40px 40px, 40px 40px",
                    backgroundPosition: "0 0, 0 0, 0 0, 20px 20px",
                }} />

                {/* Mobile Header - ICICI Style */}
                {isMobile && (
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "70px",
                            background: "#FFFFFF",
                            borderBottom: "1px solid #E9ECEF",
                            display: "flex",
                            alignItems: "center",
                            padding: "0 24px",
                            zIndex: 99,
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                            }}
                        >
                            <div
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "10px",
                                    background: "#FFF1E6", // Soft orange background
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    position: "relative",
                                }}
                            >
                                {/* Double circle ICICI style logo */}
                                <div style={{
                                    position: "relative",
                                    width: "24px",
                                    height: "24px",
                                }}>
                                    <div style={{
                                        position: "absolute",
                                        width: "16px",
                                        height: "16px",
                                        border: "2px solid #FF6B00",
                                        borderRadius: "50%",
                                        top: 0,
                                        left: 0,
                                    }} />
                                    <div style={{
                                        position: "absolute",
                                        width: "16px",
                                        height: "16px",
                                        border: "2px solid #FF6B00",
                                        borderRadius: "50%",
                                        bottom: 0,
                                        right: 0,
                                    }} />
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <span
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: "700",
                                        color: "#212529",
                                        lineHeight: 1.2,
                                    }}
                                >
                                    ICICI Bank
                                </span>
                                <span
                                    style={{
                                        fontSize: "11px",
                                        color: "#FF6B00",
                                        fontWeight: "500",
                                        letterSpacing: "0.5px",
                                    }}
                                >
                                    ADMIN DASHBOARD
                                </span>
                            </div>
                        </div>
                        
                        {/* Orange accent line */}
                        <div style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "3px",
                            background: "linear-gradient(90deg, #FF6B00, #FF8C42)",
                        }} />
                    </div>
                )}

                {/* Page Content Container */}
                <div
                    style={{
                        maxWidth: "1600px",
                        margin: "0 auto",
                        width: "100%",
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    {children}
                </div>
            </main>

            {/* Global Styles for ICICI Theme */}
            <style>{`
                :root {
                    --icici-orange: #FF6B00;
                    --icici-orange-light: #FF8C42;
                    --icici-orange-soft: #FFF1E6;
                    --icici-white: #FFFFFF;
                    --icici-gray-light: #F8F9FA;
                    --icici-gray: #E9ECEF;
                    --icici-gray-dark: #DEE2E6;
                    --icici-text-dark: #212529;
                    --icici-text: #495057;
                    --icici-text-light: #6C757D;
                }

                body {
                    background-color: #F8F9FA;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                    margin: 0;
                    padding: 0;
                }

                @media (max-width: 1024px) {
                    main {
                        margin-left: 0 !important;
                        width: 100% !important;
                        padding-top: 90px !important;
                    }
                }

                @media (max-width: 640px) {
                    main {
                        padding: 80px 16px 24px !important;
                    }
                }

                /* Smooth scrolling with ICICI orange scrollbar */
                * {
                    scrollbar-width: thin;
                    scrollbar-color: #FF6B00 #F8F9FA;
                }

                *::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }

                *::-webkit-scrollbar-track {
                    background: #F8F9FA;
                }

                *::-webkit-scrollbar-thumb {
                    background: #FF6B00;
                    border-radius: 20px;
                }

                *::-webkit-scrollbar-thumb:hover {
                    background: #FF8C42;
                }

                /* Selection color */
                ::selection {
                    background: #FF6B00;
                    color: white;
                }

                /* Focus outline */
                :focus-visible {
                    outline: 2px solid #FF6B00;
                    outline-offset: 2px;
                }

                /* Loading animation */
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }

                .shimmer {
                    background: linear-gradient(90deg, #E9ECEF 25%, #F8F9FA 50%, #E9ECEF 75%);
                    background-size: 200% 100%;
                    animation: shimmer 1.5s infinite;
                }

                /* Card hover effect */
                .hover-lift {
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }

                .hover-lift:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 16px rgba(255, 107, 0, 0.15);
                }

                /* Orange gradient for special elements */
                .orange-gradient {
                    background: linear-gradient(135deg, #FF6B00, #FF8C42);
                }

                /* Soft orange background */
                .orange-soft {
                    background: #FFF1E6;
                }

                /* Orange text */
                .orange-text {
                    color: #FF6B00;
                }

                /* Orange border */
                .orange-border {
                    border: 1px solid #FF6B00;
                }

                /* Orange hover */
                .orange-hover:hover {
                    background: #FFF1E6;
                    color: #FF6B00;
                }
            `}</style>
        </div>
    );
};

export default Layout;