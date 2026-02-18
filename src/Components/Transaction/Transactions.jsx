// import React, { useState, useEffect } from "react";
// import {
//     FaSearch,
//     FaFilter,
//     FaArrowDown,
//     FaArrowUp,
//     FaDownload,
//     FaEllipsisH,
//     FaEye
// } from "react-icons/fa";
// import API from "../../api"; // Import API utility
// import { useSnackbar } from "../../Context/SnackbarContext";
// import { useLocation } from "react-router-dom";

// const Transactions = () => {
    
//     const location=useLocation();
//     const tab=location.state?.accountNumber || "Savings";    
    
//     const { showSnackbar } = useSnackbar();
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filterType, setFilterType] = useState("All");
//     const [activeTab, setActiveTab] = useState(tab || "Savings"); 
//     const [transactions, setTransactions] = useState([]);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const fetchTransactions = async () => {
//             setLoading(true);
//             try {
//                 let accountId;
//                 if (activeTab === "Savings") {
//                     accountId = localStorage.getItem("savingsAccount");
//                 } else if (activeTab === "Current") {
//                     accountId = localStorage.getItem("currentAccount");
//                 }
//                 console.log("accountId" , accountId);
                

//                 if (accountId) {
//                     console.log(`Fetching transactions for ${activeTab} Account: ${accountId}`);
//                     const response = await API.get(`account/transactions/${accountId}`);
//                     console.log(`${activeTab} Transactions fetched:`, response.data);
//                     const txData = response.data && Array.isArray(response.data.data) ? response.data.data : [];
//                     setTransactions(txData);
//                 } else {
//                     console.warn(`No account ID found for ${activeTab}`);
//                     showSnackbar("error", `No ${activeTab} account found`);
//                     setTransactions([]);
//                 }
//             } catch (error) {
//                 console.error("Error fetching transactions:", error);
//                 showSnackbar("error", "Failed to fetch transactions");
//                 setTransactions([]);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchTransactions();
//     }, [activeTab]);

//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat('en-IN', {
//             style: 'currency',
//             currency: 'INR',
//             minimumFractionDigits: 0,
//             maximumFractionDigits: 0,
//         }).format(amount);
//     };

//     const styles = {
//         container: {
//             padding: "24px",
//             maxWidth: "1400px",
//             margin: "0 auto",
//             fontFamily: "'Inter', sans-serif",
//             color: "var(--color-text)",
//         },
//         header: {
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "32px",
//             flexWrap: "wrap",
//             gap: "20px",
//         },
//         titleSection: {
//             display: "flex",
//             flexDirection: "column",
//             gap: "8px",
//         },
//         title: {
//             fontSize: "28px",
//             fontWeight: "700",
//             margin: 0,
//             color: "var(--color-text)",
//         },
//         subtitle: {
//             fontSize: "14px",
//             color: "var(--color-muted)",
//             margin: 0,
//         },
//         actionGroup: {
//             display: "flex",
//             gap: "12px",
//         },
//         downloadBtn: {
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//             padding: "10px 20px",
//             background: "var(--color-surface)",
//             border: "1px solid var(--color-border)",
//             borderRadius: "12px",
//             color: "var(--color-text)",
//             fontSize: "14px",
//             fontWeight: "600",
//             cursor: "pointer",
//             transition: "all 0.2s",
//         },
//         tabContainer: {
//             display: "flex",
//             marginBottom: "24px",
//             borderBottom: "1px solid var(--color-border)",
//         },
//         tab: {
//             padding: "12px 24px",
//             cursor: "pointer",
//             fontSize: "16px",
//             fontWeight: "600",
//             color: "var(--color-text-secondary)",
//             borderBottom: "2px solid transparent",
//             transition: "all 0.2s",
//         },
//         activeTab: {
//             color: "#4361ee",
//             borderBottom: "2px solid #4361ee",
//         },
//         controls: {
//             display: "flex",
//             justifyContent: "space-between",
//             marginBottom: "24px",
//             gap: "16px",
//             flexWrap: "wrap",
//         },
//         searchBox: {
//             flex: 1,
//             maxWidth: "400px",
//             position: "relative",
//         },
//         searchInput: {
//             width: "100%",
//             padding: "12px 16px 12px 44px",
//             borderRadius: "12px",
//             border: "1px solid var(--color-border)",
//             background: "var(--color-surface)",
//             color: "var(--color-text)",
//             fontSize: "14px",
//             outline: "none",
//         },
//         searchIcon: {
//             position: "absolute",
//             left: "16px",
//             top: "50%",
//             transform: "translateY(-50%)",
//             color: "var(--color-muted)",
//         },
//         filterGroup: {
//             display: "flex",
//             gap: "12px",
//         },
//         filterBtn: {
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//             padding: "10px 20px",
//             background: "var(--color-surface)",
//             border: "1px solid var(--color-border)",
//             borderRadius: "12px",
//             color: "var(--color-text-secondary)",
//             fontSize: "14px",
//             fontWeight: "500",
//             cursor: "pointer",
//         },
//         activeFilter: {
//             background: "var(--color-primary)",
//             color: "#ffffff",
//             borderColor: "var(--color-primary)",
//         },
//         tableContainer: {
//             background: "var(--color-surface)",
//             borderRadius: "20px",
//             border: "1px solid var(--color-border)",
//             overflow: "hidden",
//             boxShadow: "var(--shadow-sm)",
//         },
//         table: {
//             width: "100%",
//             borderCollapse: "collapse",
//         },
//         th: {
//             textAlign: "left",
//             padding: "16px 24px",
//             borderBottom: "1px solid var(--color-border)",
//             color: "var(--color-muted)",
//             fontSize: "12px",
//             fontWeight: "600",
//             textTransform: "uppercase",
//             letterSpacing: "0.5px",
//         },
//         tr: {
//             borderBottom: "1px solid var(--color-border)",
//             transition: "background-color 0.2s",
//         },
//         td: {
//             padding: "20px 24px",
//             fontSize: "14px",
//             color: "var(--color-text)",
//             verticalAlign: "middle",
//         },
//         descCell: {
//             display: "flex",
//             alignItems: "center",
//             gap: "12px",
//         },
//         merchantIcon: {
//             width: "40px",
//             height: "40px",
//             borderRadius: "10px",
//             background: "var(--color-bg)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: "20px",
//         },
//         descText: {
//             display: "flex",
//             flexDirection: "column",
//             gap: "4px",
//         },
//         descTitle: {
//             fontWeight: "600",
//             color: "var(--color-text)",
//         },
//         descSub: {
//             fontSize: "12px",
//             color: "var(--color-muted)",
//         },
//         amount: {
//             fontWeight: "600",
//             fontSize: "15px",
//         },
//         credit: {
//             color: "#10b981",
//         },
//         debit: {
//             color: "var(--color-text)", // Default or red if preferred
//         },
//         statusBadge: {
//             padding: "4px 12px",
//             borderRadius: "20px",
//             fontSize: "12px",
//             fontWeight: "600",
//             textTransform: "capitalize",
//         },
//         statusCompleted: {
//             background: "rgba(16, 185, 129, 0.1)",
//             color: "#10b981",
//         },
//         statusPending: {
//             background: "rgba(245, 158, 11, 0.1)",
//             color: "#f59e0b",
//         },
//         actionBtn: {
//             background: "none",
//             border: "none",
//             color: "var(--color-muted)",
//             cursor: "pointer",
//             padding: "8px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             borderRadius: "8px",
//             transition: "background-color 0.2s",
//         }
//     };

//     return (
//         <div style={styles.container}>
//             <div style={styles.header}>
//                 <div style={styles.titleSection}>
//                     <h1 style={styles.title}>Transactions</h1>
//                     <p style={styles.subtitle}>View and manage your financial activity</p>
//                 </div>
//                 <div style={styles.actionGroup}>
//                     <button style={styles.downloadBtn}>
//                         <FaDownload /> Export CSV
//                     </button>
//                 </div>
//             </div>

//             {/* Tabs */}
//             <div style={styles.tabContainer}>
//                 <div
//                     style={{ ...styles.tab, ...(activeTab === "Savings" ? styles.activeTab : {}) }}
//                     onClick={() => setActiveTab("Savings")}
//                 >
//                     Savings
//                 </div>
//                 <div
//                     style={{ ...styles.tab, ...(activeTab === "Current" ? styles.activeTab : {}) }}
//                     onClick={() => setActiveTab("Current")}
//                 >
//                     Current
//                 </div>
//             </div>

//             <div style={styles.tableContainer}>
//                 {loading ? (
//                     <div style={{ padding: "40px", textAlign: "center", color: "var(--color-muted)" }}>Loading transactions...</div>
//                 ) : transactions.length > 0 ? (
//                     <table style={styles.table}>
//                         <thead>
//                             <tr>
//                                 <th style={styles.th}>Transaction ID</th>
//                                 <th style={styles.th}>Date</th>
//                                 <th style={styles.th}>Type</th>
//                                 <th style={styles.th}>Amount</th>
//                                 <th style={styles.th}>Balance</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {transactions.map((trx, index) => {
//                                 const isCredit = trx.transactionType === "DEPOSIT";
//                                 return (
//                                     <tr key={trx.transactionId || index} style={styles.tr}>
//                                         <td style={styles.td}>
//                                             <span style={styles.descSub}>#{trx.transactionId}</span>
//                                         </td>
//                                         <td style={styles.td}>
//                                             <div style={styles.descText}>
//                                                 <span style={{ color: "var(--color-text)" }}>{trx.dateOfTransaction}</span>
//                                             </div>
//                                         </td>
//                                         <td style={styles.td}>
//                                             <span style={{
//                                                 padding: "4px 10px",
//                                                 background: "var(--color-bg)",
//                                                 borderRadius: "8px",
//                                                 fontSize: "12px",
//                                                 color: "var(--color-text-secondary)"
//                                             }}>
//                                                 {trx.transactionType}
//                                             </span>
//                                         </td>
//                                         <td style={styles.td}>
//                                             <span style={{
//                                                 ...styles.amount,
//                                                 ...(isCredit ? styles.credit : styles.debit)
//                                             }}>
//                                                 {isCredit ? '+' : '-'}
//                                                 {trx.transactionedAmount ? formatCurrency(trx.transactionedAmount) : "₹0.00"}
//                                             </span>
//                                         </td>
//                                         <td style={styles.td}>
//                                             <span style={{ fontWeight: "500", color: "var(--color-text-secondary)" }}>
//                                                 {trx.closingBalance ? formatCurrency(trx.closingBalance) : "N/A"}
//                                             </span>
//                                         </td>
//                                     </tr>
//                                 );
//                             })}
//                         </tbody>
//                     </table>
//                 ) : (
//                     <div style={{ padding: "40px", textAlign: "center", color: "var(--color-muted)" }}>
//                         No transactions found for {activeTab} account.
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Transactions;



import React, { useState, useEffect } from "react";
import {
    FaSearch,
    FaFilter,
    FaArrowDown,
    FaArrowUp,
    FaDownload,
    FaEllipsisH,
    FaEye
} from "react-icons/fa";
import API from "../../api"; // Import API utility
import { useSnackbar } from "../../Context/SnackbarContext";
import { useLocation } from "react-router-dom";

const Transactions = () => {
    
    const location=useLocation();
    const tab=location.state?.accountNumber || "Savings";    
    
    const { showSnackbar } = useSnackbar();
    const [activeTab, setActiveTab] = useState(tab || "Savings"); 
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            try {
                let accountId;
                if (activeTab === "Savings") {
                    accountId = localStorage.getItem("savingsAccount");
                } else if (activeTab === "Current") {
                    accountId = localStorage.getItem("currentAccount");
                }
                console.log("accountId" , accountId);
                

                if (accountId) {
                    console.log(`Fetching transactions for ${activeTab} Account: ${accountId}`);
                    const response = await API.get(`account/transactions/${accountId}`);
                    console.log(`${activeTab} Transactions fetched:`, response.data);
                    const txData = response.data && Array.isArray(response.data.data) ? response.data.data : [];
                    setTransactions(txData);
                } else {
                    console.warn(`No account ID found for ${activeTab}`);
                    showSnackbar("error", `No ${activeTab} account found`);
                    setTransactions([]);
                }
            } catch (error) {
                console.error("Error fetching transactions:", error);
                showSnackbar("error", "Failed to fetch transactions");
                setTransactions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [activeTab]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // Add CSS variables for theme support
    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.textContent = `
            :root {
                --bg-primary: #f8fafc;
                --bg-secondary: #ffffff;
                --surface: #ffffff;
                --text-primary: #0f172a;
                --text-secondary: #334155;
                --text-muted: #64748b;
                --border: #e2e8f0;
                --border-light: #f1f5f9;
                --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
                --primary: #2563eb;
                --primary-light: #3b82f6;
                --success: #10b981;
                --success-light: #d1fae5;
                --danger: #ef4444;
                --danger-light: #fee2e2;
                --warning: #f59e0b;
                --warning-light: #fed7aa;
                --hover-bg: #f1f5f9;
            }

            [data-theme="dark"] {
                --bg-primary: #0f172a;
                --bg-secondary: #1e293b;
                --surface: #1e293b;
                --text-primary: #f1f5f9;
                --text-secondary: #cbd5e1;
                --text-muted: #94a3b8;
                --border: #334155;
                --border-light: #1e293b;
                --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
                --shadow-sm: 0 1px 3px rgba(0,0,0,0.3);
                --primary: #3b82f6;
                --primary-light: #2563eb;
                --success: #10b981;
                --success-light: rgba(16, 185, 129, 0.2);
                --danger: #ef4444;
                --danger-light: rgba(239, 68, 68, 0.2);
                --warning: #f59e0b;
                --warning-light: rgba(245, 158, 11, 0.2);
                --hover-bg: #2d3a4f;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
            
            @keyframes shimmer {
                0% { background-position: -1000px 0; }
                100% { background-position: 1000px 0; }
            }

            body {
                background-color: var(--bg-primary);
                color: var(--text-primary);
            }
        `;
        document.head.appendChild(styleSheet);
    }, []);

    const styles = {
        container: {
            padding: "32px",
            maxWidth: "1400px",
            margin: "0 auto",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            color: "var(--text-primary)",
            backgroundColor: "var(--bg-primary)",
            minHeight: "100vh",
        },
        header: {
            marginBottom: "28px",
        },
        titleSection: {
            display: "flex",
            flexDirection: "column",
            gap: "6px",
        },
        title: {
            fontSize: "32px",
            fontWeight: "700",
            margin: 0,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
        },
        subtitle: {
            fontSize: "15px",
            color: "var(--text-muted)",
            margin: 0,
            fontWeight: "400",
        },
        tabContainer: {
            display: "flex",
            gap: "4px",
            marginBottom: "28px",
            padding: "4px",
            backgroundColor: "var(--surface)",
            borderRadius: "16px",
            border: "1px solid var(--border)",
            width: "fit-content",
        },
        tab: {
            padding: "10px 28px",
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: "600",
            color: "var(--text-secondary)",
            borderRadius: "12px",
            transition: "all 0.2s ease",
            backgroundColor: "transparent",
        },
        activeTab: {
            color: "var(--primary)",
            backgroundColor: "var(--hover-bg)",
            boxShadow: "var(--shadow-sm)",
        },
        tableContainer: {
            background: "var(--surface)",
            borderRadius: "24px",
            border: "1px solid var(--border)",
            overflow: "hidden",
            boxShadow: "var(--shadow)",
        },
        table: {
            width: "100%",
            borderCollapse: "collapse",
        },
        th: {
            textAlign: "left",
            padding: "18px 24px",
            borderBottom: "1px solid var(--border)",
            color: "var(--text-muted)",
            fontSize: "13px",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            backgroundColor: "var(--bg-secondary)",
        },
        tr: {
            borderBottom: "1px solid var(--border)",
            transition: "background-color 0.2s",
            ':hover': {
                backgroundColor: "var(--hover-bg)",
            }
        },
        td: {
            padding: "20px 24px",
            fontSize: "15px",
            color: "var(--text-primary)",
            verticalAlign: "middle",
        },
        descSub: {
            fontSize: "14px",
            color: "var(--text-muted)",
            fontFamily: "'SF Mono', 'Fira Code', monospace",
        },
        amount: {
            fontWeight: "600",
            fontSize: "16px",
            fontFamily: "'SF Mono', 'Fira Code', monospace",
        },
        credit: {
            color: "var(--success)",
        },
        debit: {
            color: "var(--danger)",
        },
        typeBadge: {
            padding: "6px 14px",
            background: "var(--bg-primary)",
            borderRadius: "30px",
            fontSize: "13px",
            fontWeight: "600",
            color: "var(--text-secondary)",
            display: "inline-block",
            border: "1px solid var(--border)",
        },
        balanceText: {
            fontWeight: "600",
            color: "var(--text-primary)",
            fontFamily: "'SF Mono', 'Fira Code', monospace",
        },
        // Loading animation styles
        loadingContainer: {
            padding: "60px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            minHeight: "500px",
            background: "var(--surface)",
            borderRadius: "24px",
        },
        loadingLogo: {
            fontSize: "32px",
            fontWeight: "700",
            background: "linear-gradient(135deg, var(--primary), #7c3aed)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "8px",
            animation: "pulse 2s ease-in-out infinite",
        },
        loadingText: {
            fontSize: "16px",
            color: "var(--text-muted)",
            marginBottom: "16px",
            animation: "pulse 2s ease-in-out infinite",
        },
        loadingSecure: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            color: "var(--text-secondary)",
            marginBottom: "24px",
            animation: "pulse 2.5s ease-in-out infinite",
        },
        loadingDivider: {
            width: "100%",
            maxWidth: "300px",
            height: "1px",
            background: "var(--border)",
            margin: "16px 0",
        },
        loadingMenuItem: {
            width: "240px",
            height: "20px",
            background: "linear-gradient(90deg, var(--border) 25%, var(--surface) 50%, var(--border) 75%)",
            backgroundSize: "200% 100%",
            borderRadius: "6px",
            animation: "shimmer 1.5s infinite",
            margin: "12px 0",
        },
        loadingFooter: {
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginTop: "24px",
            flexWrap: "wrap",
            justifyContent: "center",
        },
        loadingBadge: {
            padding: "6px 16px",
            background: "var(--border)",
            borderRadius: "30px",
            fontSize: "13px",
            color: "var(--text-muted)",
            animation: "pulse 2s ease-in-out infinite",
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.titleSection}>
                    <h1 style={styles.title}>Transactions</h1>
                    <p style={styles.subtitle}>View and manage your financial activity</p>
                </div>
            </div>

            {/* Tabs - Banking Style */}
            <div style={styles.tabContainer}>
                <div
                    style={{ ...styles.tab, ...(activeTab === "Savings" ? styles.activeTab : {}) }}
                    onClick={() => setActiveTab("Savings")}
                >
                    Savings
                </div>
                <div
                    style={{ ...styles.tab, ...(activeTab === "Current" ? styles.activeTab : {}) }}
                    onClick={() => setActiveTab("Current")}
                >
                    Current
                </div>
            </div>

            {/* Transactions Table */}
            <div style={styles.tableContainer}>
                {loading ? (
                    <div style={styles.loadingContainer}>
                        <div style={styles.loadingLogo}>ABC Bank</div>
                        <div style={styles.loadingText}>Loading your transactions</div>
                        <div style={styles.loadingSecure}>
                            <span>🔒</span> Secure Connection
                        </div>
                        <div style={styles.loadingDivider}></div>
                        <div style={{ width: "100%", maxWidth: "320px" }}>
                            <div style={styles.loadingMenuItem}></div>
                            <div style={styles.loadingMenuItem}></div>
                            <div style={styles.loadingMenuItem}></div>
                            <div style={styles.loadingMenuItem}></div>
                            <div style={styles.loadingMenuItem}></div>
                        </div>
                        <div style={styles.loadingDivider}></div>
                        <div style={styles.loadingFooter}>
                            <div style={styles.loadingBadge}>Main Branch • NYC</div>
                            <div style={styles.loadingBadge}>v2.5.0</div>
                            <div style={{ ...styles.loadingBadge, background: "var(--primary)", color: "white" }}>PROD</div>
                        </div>
                    </div>
                ) : transactions.length > 0 ? (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Transaction ID</th>
                                <th style={styles.th}>Date</th>
                                <th style={styles.th}>Type</th>
                                <th style={styles.th}>Amount</th>
                                <th style={styles.th}>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((trx, index) => {
                                const isCredit = trx.transactionType === "DEPOSIT";
                                const isDebit = trx.transactionType === "WITHDRAWAL" || trx.transactionType === "CREDITED";
                                return (
                                    <tr key={trx.transactionId || index} style={styles.tr}>
                                        <td style={styles.td}>
                                            <span style={styles.descSub}>#{trx.transactionId}</span>
                                        </td>
                                        <td style={styles.td}>
                                            <span style={{ color: "var(--text-primary)" }}>{trx.dateOfTransaction}</span>
                                        </td>
                                        <td style={styles.td}>
                                            <span style={styles.typeBadge}>
                                                {isCredit ? "DEPOSIT" : isDebit ? "WITHDRAWAL" : trx.transactionType}
                                            </span>
                                        </td>
                                        <td style={styles.td}>
                                            <span style={{
                                                ...styles.amount,
                                                ...(isCredit ? styles.credit : styles.debit)
                                            }}>
                                                {isCredit ? '+' : '-'}
                                                {trx.transactionedAmount ? formatCurrency(trx.transactionedAmount) : "₹0"}
                                            </span>
                                        </td>
                                        <td style={styles.td}>
                                            <span style={styles.balanceText}>
                                                {trx.closingBalance ? formatCurrency(trx.closingBalance) : "N/A"}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <div style={{ 
                        padding: "60px 40px", 
                        textAlign: "center", 
                        color: "var(--text-muted)",
                        fontSize: "16px",
                        background: "var(--surface)"
                    }}>
                        No transactions found for {activeTab} account
                    </div>
                )}
            </div>
        </div>
    );
};

export default Transactions;