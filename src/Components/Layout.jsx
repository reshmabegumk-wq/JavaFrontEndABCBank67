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
                backgroundColor: "var(--color-bg)",
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
                    background: "var(--color-bg)",
                    minHeight: "100vh",
                    width: `calc(100% - ${sidebarWidth}px)`,
                    transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color var(--transition-speed)",
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
                            background: "var(--color-surface)",
                            borderBottom: "1px solid var(--color-border)",
                            display: "flex",
                            alignItems: "center",
                            padding: "0 24px",
                            zIndex: 99,
                            boxShadow: "var(--shadow-sm)",
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
                                    background: "linear-gradient(135deg, rgba(67, 97, 238, 0.15), rgba(58, 12, 163, 0.15))",
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
                                    color: "var(--color-text)",
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
                    scrollbar-color: var(--color-border) var(--color-bg);
                }

                *::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }

                *::-webkit-scrollbar-track {
                    background: var(--color-bg);
                }

                *::-webkit-scrollbar-thumb {
                    background: var(--color-border);
                    border-radius: 20px;
                }

                *::-webkit-scrollbar-thumb:hover {
                    background: var(--color-muted);
                }
            `}</style>
        </div>
    );
};

export default Layout;