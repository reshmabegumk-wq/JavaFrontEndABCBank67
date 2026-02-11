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
                backgroundColor: "#f8fafc",
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
                    background: "#f8fafc",
                    minHeight: "100vh",
                    width: `calc(100% - ${sidebarWidth}px)`,
                    transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxSizing: "border-box",
                }}
            >
                {/* Mobile Header */}
                {isMobile && (
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "70px",
                            background: "#ffffff",
                            borderBottom: "1px solid #e2e8f0",
                            display: "flex",
                            alignItems: "center",
                            padding: "0 24px",
                            zIndex: 99,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
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
                                    background: "linear-gradient(135deg, #4361ee15, #3a0ca315)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "20px",
                                        fontWeight: "800",
                                        background: "linear-gradient(135deg, #4361ee, #3a0ca3)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    ABC
                                </span>
                            </div>
                            <span
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "600",
                                    color: "#1e293b",
                                }}
                            >
                                Admin Dashboard
                            </span>
                        </div>
                    </div>
                )}

                {/* Page Content Container */}
                <div
                    style={{
                        maxWidth: "1600px",
                        margin: "0 auto",
                        width: "100%",
                    }}
                >
                    {children}
                </div>
            </main>

            {/* Global Styles for Responsive */}
            <style>{`
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

                /* Smooth scrolling */
                * {
                    scrollbar-width: thin;
                    scrollbar-color: #cbd5e1 #f1f5f9;
                }

                *::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }

                *::-webkit-scrollbar-track {
                    background: #f1f5f9;
                }

                *::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 20px;
                }

                *::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
            `}</style>
        </div>
    );
};

export default Layout;