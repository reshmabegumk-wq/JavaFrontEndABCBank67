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
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("All");
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

    const styles = {
        container: {
            padding: "24px",
            maxWidth: "1400px",
            margin: "0 auto",
            fontFamily: "'Inter', sans-serif",
            color: "var(--color-text)",
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
            flexWrap: "wrap",
            gap: "20px",
        },
        titleSection: {
            display: "flex",
            flexDirection: "column",
            gap: "8px",
        },
        title: {
            fontSize: "28px",
            fontWeight: "700",
            margin: 0,
            color: "var(--color-text)",
        },
        subtitle: {
            fontSize: "14px",
            color: "var(--color-muted)",
            margin: 0,
        },
        actionGroup: {
            display: "flex",
            gap: "12px",
        },
        downloadBtn: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "12px",
            color: "var(--color-text)",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s",
        },
        tabContainer: {
            display: "flex",
            marginBottom: "24px",
            borderBottom: "1px solid var(--color-border)",
        },
        tab: {
            padding: "12px 24px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
            color: "var(--color-text-secondary)",
            borderBottom: "2px solid transparent",
            transition: "all 0.2s",
        },
        activeTab: {
            color: "#4361ee",
            borderBottom: "2px solid #4361ee",
        },
        controls: {
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "24px",
            gap: "16px",
            flexWrap: "wrap",
        },
        searchBox: {
            flex: 1,
            maxWidth: "400px",
            position: "relative",
        },
        searchInput: {
            width: "100%",
            padding: "12px 16px 12px 44px",
            borderRadius: "12px",
            border: "1px solid var(--color-border)",
            background: "var(--color-surface)",
            color: "var(--color-text)",
            fontSize: "14px",
            outline: "none",
        },
        searchIcon: {
            position: "absolute",
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--color-muted)",
        },
        filterGroup: {
            display: "flex",
            gap: "12px",
        },
        filterBtn: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "12px",
            color: "var(--color-text-secondary)",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
        },
        activeFilter: {
            background: "var(--color-primary)",
            color: "#ffffff",
            borderColor: "var(--color-primary)",
        },
        tableContainer: {
            background: "var(--color-surface)",
            borderRadius: "20px",
            border: "1px solid var(--color-border)",
            overflow: "hidden",
            boxShadow: "var(--shadow-sm)",
        },
        table: {
            width: "100%",
            borderCollapse: "collapse",
        },
        th: {
            textAlign: "left",
            padding: "16px 24px",
            borderBottom: "1px solid var(--color-border)",
            color: "var(--color-muted)",
            fontSize: "12px",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
        },
        tr: {
            borderBottom: "1px solid var(--color-border)",
            transition: "background-color 0.2s",
        },
        td: {
            padding: "20px 24px",
            fontSize: "14px",
            color: "var(--color-text)",
            verticalAlign: "middle",
        },
        descCell: {
            display: "flex",
            alignItems: "center",
            gap: "12px",
        },
        merchantIcon: {
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: "var(--color-bg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
        },
        descText: {
            display: "flex",
            flexDirection: "column",
            gap: "4px",
        },
        descTitle: {
            fontWeight: "600",
            color: "var(--color-text)",
        },
        descSub: {
            fontSize: "12px",
            color: "var(--color-muted)",
        },
        amount: {
            fontWeight: "600",
            fontSize: "15px",
        },
        credit: {
            color: "#10b981",
        },
        debit: {
            color: "var(--color-text)", // Default or red if preferred
        },
        statusBadge: {
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "600",
            textTransform: "capitalize",
        },
        statusCompleted: {
            background: "rgba(16, 185, 129, 0.1)",
            color: "#10b981",
        },
        statusPending: {
            background: "rgba(245, 158, 11, 0.1)",
            color: "#f59e0b",
        },
        actionBtn: {
            background: "none",
            border: "none",
            color: "var(--color-muted)",
            cursor: "pointer",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            transition: "background-color 0.2s",
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.titleSection}>
                    <h1 style={styles.title}>Transactions</h1>
                    <p style={styles.subtitle}>View and manage your financial activity</p>
                </div>
                <div style={styles.actionGroup}>
                    <button style={styles.downloadBtn}>
                        <FaDownload /> Export CSV
                    </button>
                </div>
            </div>

            {/* Tabs */}
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

            <div style={styles.tableContainer}>
                {loading ? (
                    <div style={{ padding: "40px", textAlign: "center", color: "var(--color-muted)" }}>Loading transactions...</div>
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
                                return (
                                    <tr key={trx.transactionId || index} style={styles.tr}>
                                        <td style={styles.td}>
                                            <span style={styles.descSub}>#{trx.transactionId}</span>
                                        </td>
                                        <td style={styles.td}>
                                            <div style={styles.descText}>
                                                <span style={{ color: "var(--color-text)" }}>{trx.dateOfTransaction}</span>
                                            </div>
                                        </td>
                                        <td style={styles.td}>
                                            <span style={{
                                                padding: "4px 10px",
                                                background: "var(--color-bg)",
                                                borderRadius: "8px",
                                                fontSize: "12px",
                                                color: "var(--color-text-secondary)"
                                            }}>
                                                {trx.transactionType}
                                            </span>
                                        </td>
                                        <td style={styles.td}>
                                            <span style={{
                                                ...styles.amount,
                                                ...(isCredit ? styles.credit : styles.debit)
                                            }}>
                                                {isCredit ? '+' : '-'}
                                                {trx.transactionedAmount ? formatCurrency(trx.transactionedAmount) : "₹0.00"}
                                            </span>
                                        </td>
                                        <td style={styles.td}>
                                            <span style={{ fontWeight: "500", color: "var(--color-text-secondary)" }}>
                                                {trx.closingBalance ? formatCurrency(trx.closingBalance) : "N/A"}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <div style={{ padding: "40px", textAlign: "center", color: "var(--color-muted)" }}>
                        No transactions found for {activeTab} account.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Transactions;
