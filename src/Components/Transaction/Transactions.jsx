import React, { useState, useEffect } from "react";
import {
    FaChevronLeft,
    FaChevronRight,
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
    FaWallet,
    FaCreditCard,
    FaBriefcase,
    FaChevronDown,
    FaShieldAlt,
    FaClock,
    FaArrowDown,
    FaArrowUp
} from "react-icons/fa";
import API from "../../api";
import { useSnackbar } from "../../Context/SnackbarContext";

const Transactions = () => {
    const { showSnackbar } = useSnackbar();
    
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingAccounts, setLoadingAccounts] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // ── Canara Bank Official Colour Palette ──────────────────────────────────
    const canaraBlue       = "#003087";   // deep navy blue (primary)
    const canaraBlueLight  = "#0044B4";   // mid blue (hover / accent)
    const canaraBlueDark   = "#001F5B";   // darkest navy (header bar)
    const canaraGold       = "#F5A800";   // golden yellow (primary accent)
    const canaraGoldDark   = "#D48F00";   // dark gold (hover)
    const canaraGoldLight  = "#FFF3CC";   // pale gold (badge bg)
    const canaraPageBg     = "#F0F4FF";   // cool off-white page bg
    const canaraCardBg     = "#FFFFFF";
    const canaraBorder     = "#C9D6F0";
    const canaraText       = "#0D1F4C";
    const canaraTextLight  = "#5A6F99";
    const successGreen     = "#0D8A4E";
    const successLight     = "#D4F4E7";
    const dangerRed        = "#C0392B";
    const dangerLight      = "#FDECEA";
    // ────────────────────────────────────────────────────────────────────────

    // Fetch all user accounts on component mount
    useEffect(() => {
        const fetchUserAccounts = async () => {
            setLoadingAccounts(true);
            try {
                const userId = localStorage.getItem("userId") || "2";
                const response = await API.get(`account/userAccounts/${userId}`);
                console.log("User accounts response:", response.data);
                
                if (response.data && response.data.status === true && Array.isArray(response.data.data)) {
                    const userAccounts = response.data.data;
                    setAccounts(userAccounts);
                    if (userAccounts.length > 0) setSelectedAccount(userAccounts[0]);
                } else {
                    showSnackbar("error", "Failed to fetch accounts");
                }
            } catch (error) {
                console.error("Error fetching user accounts:", error);
                showSnackbar("error", "Failed to fetch accounts");
            } finally {
                setLoadingAccounts(false);
            }
        };
        fetchUserAccounts();
    }, [showSnackbar]);

    // Fetch transactions when selected account changes
    useEffect(() => {
        const fetchTransactions = async () => {
            if (!selectedAccount) return;
            setLoading(true);
            try {
                const accountNumber = selectedAccount.accountNumber;
                const response = await API.get(`account/transactions/${accountNumber}`);
                const txData = response.data && Array.isArray(response.data.data) ? response.data.data : [];
                setTransactions(txData);
                setCurrentPage(1);
            } catch (error) {
                console.error("Error fetching transactions:", error);
                showSnackbar("error", "Failed to fetch transactions");
                setTransactions([]);
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, [selectedAccount, showSnackbar]);

    const getTransactionDetails = (transaction) => {
        const type = transaction.transactionType?.toUpperCase() || '';
        if (type === 'CREDITED') {
            return {
                displayType: 'CREDITED',
                badgeClass: 'credited',
                badgeColor: successGreen,
                badgeBg: successLight,
                icon: <FaArrowDown size={12} style={{ marginRight: '4px' }} />,
                sign: '+',
                amountColor: successGreen,
                isCredit: true
            };
        } else if (type === 'DEBITED') {
            return {
                displayType: 'DEBITED',
                badgeClass: 'debited',
                badgeColor: dangerRed,
                badgeBg: dangerLight,
                icon: <FaArrowUp size={12} style={{ marginRight: '4px' }} />,
                sign: '-',
                amountColor: dangerRed,
                isCredit: false
            };
        } else {
            return {
                displayType: type || 'TRANSACTION',
                badgeClass: '',
                badgeColor: canaraTextLight,
                badgeBg: '#EEF1FA',
                icon: null,
                sign: '',
                amountColor: canaraText,
                isCredit: false
            };
        }
    };

    // Pagination calculations
    const indexOfLastItem  = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(transactions.length / itemsPerPage);

    const goToFirstPage    = () => setCurrentPage(1);
    const goToLastPage     = () => setCurrentPage(totalPages);
    const goToNextPage     = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const goToPage         = (pageNumber) => setCurrentPage(pageNumber);

    const formatCurrency = (amount) =>
        new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return `${String(date.getDate()).padStart(2,'0')}-${String(date.getMonth()+1).padStart(2,'0')}-${date.getFullYear()}`;
    };

    const getLastFourDigits = (accountNumber) => accountNumber.toString().slice(-4);

    const getAccountIcon = (accountType) => {
        if (accountType?.toLowerCase().includes('savings'))
            return <FaWallet style={{ color: canaraBlue, fontSize: '16px' }} />;
        if (accountType?.toLowerCase().includes('current'))
            return <FaCreditCard style={{ color: canaraGold, fontSize: '16px' }} />;
        if (accountType?.toLowerCase().includes('salary'))
            return <FaBriefcase style={{ color: successGreen, fontSize: '16px' }} />;
        return <FaWallet style={{ color: canaraBlue, fontSize: '16px' }} />;
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.custom-dropdown')) setIsDropdownOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // ── Global Styles ────────────────────────────────────────────────────────
    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.id = "canara-txn-styles";
        styleSheet.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');

            :root {
                --cb: #003087;
                --cb-light: #0044B4;
                --cb-dark: #001F5B;
                --cg: #F5A800;
                --cg-dark: #D48F00;
                --cg-light: #FFF3CC;
                --page-bg: #F0F4FF;
                --card-bg: #FFFFFF;
                --border: #C9D6F0;
                --text: #0D1F4C;
                --text-light: #5A6F99;
                --green: #0D8A4E;
                --green-light: #D4F4E7;
                --red: #C0392B;
                --red-light: #FDECEA;
            }

            /* ── Skeleton / shimmer animation ── */
            @keyframes shimmer {
                0%   { background-position: -800px 0; }
                100% { background-position:  800px 0; }
            }
            @keyframes fadeSlideUp {
                from { opacity: 0; transform: translateY(16px); }
                to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes pulseDot {
                0%, 100% { opacity: 1; }
                50%       { opacity: 0.3; }
            }
            @keyframes spinRing {
                to { transform: rotate(360deg); }
            }
            @keyframes badgePop {
                0%   { transform: scale(0.8); opacity: 0; }
                60%  { transform: scale(1.08); }
                100% { transform: scale(1); opacity: 1; }
            }
            @keyframes rowIn {
                from { opacity: 0; transform: translateX(-10px); }
                to   { opacity: 1; transform: translateX(0); }
            }
            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50%       { transform: translateY(-6px); }
            }

            /* ── Skeleton bars ── */
            .skel-bar {
                border-radius: 6px;
                background: linear-gradient(90deg, #dce6f8 25%, #c8d8f0 50%, #dce6f8 75%);
                background-size: 800px 100%;
                animation: shimmer 1.6s infinite linear;
            }

            /* ── Transaction rows ── */
            .transaction-row {
                animation: rowIn 0.35s ease both;
                transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
            }
            .transaction-row:hover {
                background: #EBF0FF !important;
                transform: translateX(5px);
                box-shadow: inset 4px 0 0 var(--cg);
            }

            /* ── Badges ── */
            .type-badge {
                display: inline-flex;
                align-items: center;
                gap: 5px;
                padding: 5px 13px;
                border-radius: 30px;
                font-size: 12px;
                font-weight: 700;
                letter-spacing: 0.5px;
                text-transform: uppercase;
                border: 1.5px solid transparent;
                animation: badgePop 0.4s ease both;
                transition: transform 0.2s, box-shadow 0.2s;
            }
            .type-badge:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 10px rgba(0,0,0,0.12);
            }
            .type-badge.credited {
                background: var(--green-light);
                color: var(--green);
                border-color: var(--green);
            }
            .type-badge.debited {
                background: var(--red-light);
                color: var(--red);
                border-color: var(--red);
            }

            /* ── Pagination buttons ── */
            .pagination-button {
                border: 1.5px solid var(--border);
                background: white;
                color: var(--text);
                font-weight: 600;
                cursor: pointer;
                transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s;
                font-family: 'DM Sans', sans-serif;
            }
            .pagination-button:hover:not(:disabled) {
                background: var(--cb);
                color: white;
                border-color: var(--cb);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,48,135,0.25);
            }
            .pagination-button.active {
                background: var(--cb);
                color: white;
                border-color: var(--cb);
                box-shadow: 0 4px 12px rgba(0,48,135,0.25);
            }
            .pagination-button:disabled {
                opacity: 0.4;
                cursor: not-allowed;
            }

            /* ── Custom Dropdown ── */
            .custom-dropdown { position: relative; width: 400px; }

            .dropdown-selected {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 13px 18px;
                background: white;
                border: 2px solid var(--border);
                border-radius: 12px;
                font-size: 15px;
                color: var(--text);
                cursor: pointer;
                transition: border-color 0.25s, box-shadow 0.25s;
                font-family: 'DM Sans', sans-serif;
            }
            .dropdown-selected:hover,
            .dropdown-selected.open {
                border-color: var(--cg);
                box-shadow: 0 4px 16px rgba(245,168,0,0.18);
            }

            .selected-content { display: flex; align-items: center; gap: 12px; }

            .selected-icon {
                display: flex; align-items: center; justify-content: center;
                width: 36px; height: 36px;
                background: var(--cg-light);
                border-radius: 10px;
                transition: transform 0.3s;
            }
            .dropdown-selected:hover .selected-icon { transform: scale(1.1); }

            .selected-text { font-weight: 600; color: var(--text); }
            .selected-subtext {
                font-size: 13px; color: var(--text-light);
                margin-left: 6px;
                font-family: 'JetBrains Mono', monospace;
            }

            .dropdown-arrow { color: var(--text-light); transition: transform 0.3s, color 0.3s; }
            .dropdown-arrow.open { transform: rotate(180deg); color: var(--cg); }

            .dropdown-menu {
                position: absolute; top: calc(100% + 8px);
                left: 0; right: 0;
                background: white;
                border: 1.5px solid var(--border);
                border-radius: 12px;
                overflow: hidden;
                z-index: 1000;
                box-shadow: 0 12px 32px rgba(0,48,135,0.12);
                animation: fadeSlideUp 0.25s ease;
                max-height: 320px; overflow-y: auto;
            }
            .dropdown-menu::-webkit-scrollbar { width: 5px; }
            .dropdown-menu::-webkit-scrollbar-track { background: var(--page-bg); }
            .dropdown-menu::-webkit-scrollbar-thumb { background: var(--cg); border-radius: 20px; }

            .dropdown-item {
                display: flex; align-items: center; gap: 12px;
                padding: 13px 18px;
                transition: background 0.2s;
                border-bottom: 1px solid var(--border);
                cursor: pointer;
            }
            .dropdown-item:last-child { border-bottom: none; }
            .dropdown-item:hover { background: var(--cg-light); }
            .dropdown-item.selected {
                background: #EBF0FF;
                border-left: 4px solid var(--cb);
            }

            .item-icon {
                display: flex; align-items: center; justify-content: center;
                width: 40px; height: 40px;
                background: var(--page-bg);
                border-radius: 10px;
                border: 1px solid var(--border);
                transition: transform 0.2s, border-color 0.2s;
            }
            .dropdown-item:hover .item-icon { transform: scale(1.08); border-color: var(--cg); }

            .item-details { flex: 1; display: flex; align-items: center; justify-content: space-between; }
            .item-type { font-weight: 600; color: var(--text); font-size: 14px; }
            .item-number {
                font-size: 13px; color: var(--cb);
                font-family: 'JetBrains Mono', monospace;
                background: var(--cg-light);
                padding: 4px 10px; border-radius: 30px;
                font-weight: 600;
            }

            /* ── Loading spinner ring ── */
            .spinner-ring {
                width: 52px; height: 52px;
                border: 4px solid var(--cg-light);
                border-top-color: var(--cg);
                border-radius: 50%;
                animation: spinRing 0.9s linear infinite;
            }

            /* ── Pulse dots ── */
            .dot-1 { animation: pulseDot 1.2s ease-in-out 0s   infinite; }
            .dot-2 { animation: pulseDot 1.2s ease-in-out 0.2s infinite; }
            .dot-3 { animation: pulseDot 1.2s ease-in-out 0.4s infinite; }

            /* ── Logo float ── */
            .logo-float { animation: float 3s ease-in-out infinite; }

            @media (max-width: 768px) {
                .custom-dropdown { width: 100%; }
            }
        `;
        document.head.appendChild(styleSheet);
        return () => document.getElementById("canara-txn-styles")?.remove();
    }, []);
    // ────────────────────────────────────────────────────────────────────────

    const getSerialNumber = (index) => indexOfFirstItem + index + 1;

    // ── Inline styles ────────────────────────────────────────────────────────
    const S = {
        page: {
            padding: "28px 32px",
            maxWidth: "1400px",
            margin: "0 auto",
            fontFamily: "'DM Sans', sans-serif",
            color: canaraText,
            backgroundColor: canaraPageBg,
            minHeight: "100vh",
        },

        /* Top branded bar */
        brandBar: {
            display: "flex",
            alignItems: "center",
            gap: "0",
            marginBottom: "28px",
            background: `linear-gradient(135deg, ${canaraBlueDark} 0%, ${canaraBlue} 60%, ${canaraBlueLight} 100%)`,
            borderRadius: "14px",
            padding: "0",
            overflow: "hidden",
            boxShadow: "0 6px 24px rgba(0,48,135,0.3)",
        },
        brandBarGold: {
            width: "8px",
            alignSelf: "stretch",
            background: `linear-gradient(180deg, ${canaraGold} 0%, ${canaraGoldDark} 100%)`,
            flexShrink: 0,
        },
        brandBarInner: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
            padding: "14px 22px",
        },
        brandLeft: { display: "flex", alignItems: "center", gap: "14px" },
        brandIconWrap: {
            background: "rgba(245,168,0,0.18)",
            borderRadius: "10px",
            padding: "8px 10px",
            display: "flex",
            alignItems: "center",
        },
        brandName: {
            fontSize: "20px",
            fontWeight: "700",
            color: "white",
            letterSpacing: "1px",
        },
        brandTagline: {
            fontSize: "11px",
            color: "rgba(255,255,255,0.6)",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontWeight: "500",
        },
        brandRight: { display: "flex", alignItems: "center", gap: "10px" },
        brandBadge: {
            background: "rgba(245,168,0,0.15)",
            border: "1px solid rgba(245,168,0,0.4)",
            borderRadius: "30px",
            padding: "5px 14px",
            fontSize: "12px",
            color: canaraGold,
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "6px",
        },

        /* Page header */
        header: {
            marginBottom: "28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
        },
        titleSection: { display: "flex", flexDirection: "column", gap: "4px" },
        title: {
            fontSize: "28px",
            fontWeight: "700",
            margin: 0,
            color: canaraBlue,
            letterSpacing: "-0.02em",
        },
        subtitle: {
            fontSize: "14px",
            color: canaraTextLight,
            margin: 0,
            fontWeight: "500",
        },
        txnCountBadge: {
            padding: "10px 22px",
            background: `linear-gradient(135deg, ${canaraGold} 0%, ${canaraGoldDark} 100%)`,
            border: "none",
            borderRadius: "40px",
            fontSize: "14px",
            color: canaraBlueDark,
            fontWeight: "700",
            boxShadow: "0 4px 14px rgba(245,168,0,0.35)",
            cursor: "default",
            letterSpacing: "0.3px",
        },

        /* Account selector */
        accountSelectorContainer: { marginBottom: "28px" },
        dropdownLabel: {
            fontSize: "13px",
            fontWeight: "700",
            color: canaraBlue,
            marginBottom: "8px",
            display: "block",
            textTransform: "uppercase",
            letterSpacing: "0.8px",
        },

        /* Table card */
        tableWrapper: {
            background: canaraCardBg,
            borderRadius: "18px",
            border: `1px solid ${canaraBorder}`,
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(0,48,135,0.08)",
            marginBottom: "24px",
        },
        tableContainer: { overflowX: "auto" },
        table: { width: "100%", borderCollapse: "collapse", minWidth: "860px" },

        th: {
            textAlign: "left",
            padding: "16px 22px",
            borderBottom: `2px solid ${canaraBorder}`,
            color: "white",
            fontSize: "12px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.8px",
            background: `linear-gradient(90deg, ${canaraBlueDark} 0%, ${canaraBlue} 100%)`,
            position: "sticky",
            top: 0,
            zIndex: 10,
        },
        /* Gold accent on first TH */
        thFirst: {
            textAlign: "left",
            padding: "16px 22px",
            borderBottom: `2px solid ${canaraBorder}`,
            color: "white",
            fontSize: "12px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.8px",
            background: `linear-gradient(90deg, ${canaraBlueDark} 0%, ${canaraBlue} 100%)`,
            position: "sticky",
            top: 0,
            zIndex: 10,
            borderLeft: `4px solid ${canaraGold}`,
        },

        td: { padding: "16px 22px", fontSize: "14px", color: canaraText, verticalAlign: "middle" },

        serialNumber: {
            fontWeight: "700",
            color: canaraBlueDark,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "13px",
            display: "inline-block",
            padding: "4px 10px",
            borderRadius: "30px",
            background: canaraGoldLight,
            border: `1px solid ${canaraGold}`,
            minWidth: "42px",
            textAlign: "center",
        },
        amount: {
            fontWeight: "700",
            fontSize: "15px",
            fontFamily: "'JetBrains Mono', monospace",
        },
        balanceText: {
            fontWeight: "600",
            color: canaraBlue,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "14px",
        },
        dateText: {
            color: canaraText,
            fontWeight: "600",
            fontSize: "13px",
            fontFamily: "'JetBrains Mono', monospace",
        },

        /* Pagination */
        paginationContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "14px",
            padding: "20px 22px 24px",
            background: "#F7F9FF",
            borderTop: `1px solid ${canaraBorder}`,
        },
        pagination: {
            display: "flex",
            alignItems: "center",
            gap: "6px",
            flexWrap: "wrap",
            justifyContent: "center",
        },
        pageButton: {
            minWidth: "38px",
            height: "38px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 10px",
            backgroundColor: "white",
            border: `1.5px solid ${canaraBorder}`,
            borderRadius: "8px",
            color: canaraText,
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
        },
        pageNavButton: {
            padding: "0 14px",
            height: "38px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "white",
            border: `1.5px solid ${canaraBorder}`,
            borderRadius: "8px",
            color: canaraText,
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer",
        },
        paginationInfo: {
            fontSize: "13px",
            color: canaraTextLight,
            fontWeight: "600",
        },
        pageNumbers: { display: "flex", gap: "4px" },

        /* Empty state */
        emptyState: {
            padding: "70px 40px",
            textAlign: "center",
            background: "white",
        },
        emptyStateIcon: { fontSize: "52px", marginBottom: "16px", opacity: 0.6 },
        emptyStateTitle: { fontSize: "18px", fontWeight: "700", color: canaraBlue, margin: "0 0 8px" },
        emptyStateText: { fontSize: "14px", color: canaraTextLight, margin: 0 },

        /* Loading */
        loadingContainer: {
            padding: "60px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            minHeight: "480px",
            background: "white",
        },
    };
    // ────────────────────────────────────────────────────────────────────────

    // ── Loading skeleton rows (table-style) ─────────────────────────────────
    const LoadingState = ({ message = "Loading transactions" }) => (
        <div style={S.loadingContainer}>
            {/* Animated logo */}
            <div className="logo-float" style={{ textAlign: "center" }}>
                <div style={{
                    fontSize: "22px",
                    fontWeight: "700",
                    color: canaraBlue,
                    letterSpacing: "2px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                }}>
                    <div style={{
                        background: `linear-gradient(135deg, ${canaraBlue}, ${canaraBlueLight})`,
                        borderRadius: "10px",
                        padding: "7px 9px",
                    }}>
                        <FaWallet color={canaraGold} size={18} />
                    </div>
                    ABC BANK
                </div>
            </div>

            {/* Spinner */}
            <div className="spinner-ring" />

            {/* Label with dots */}
            <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "15px", color: canaraTextLight, fontWeight: "600" }}>
                {message}
                <span className="dot-1" style={{ color: canaraGold, fontSize: "20px", lineHeight: 1 }}>●</span>
                <span className="dot-2" style={{ color: canaraGold, fontSize: "20px", lineHeight: 1 }}>●</span>
                <span className="dot-3" style={{ color: canaraGold, fontSize: "20px", lineHeight: 1 }}>●</span>
            </div>

            {/* Secure badge */}
            <div style={{
                display: "flex", alignItems: "center", gap: "7px",
                padding: "7px 18px",
                borderRadius: "30px",
                background: "#EBF0FF",
                border: `1px solid ${canaraBorder}`,
                fontSize: "13px",
                color: canaraBlue,
                fontWeight: "600",
            }}>
                <FaShieldAlt size={13} color={canaraGold} /> Secure Connection
            </div>

            {/* Divider */}
            <div style={{ width: "100%", maxWidth: "360px", height: "1px", background: canaraBorder }} />

            {/* Skeleton rows */}
            <div style={{ width: "100%", maxWidth: "560px", display: "flex", flexDirection: "column", gap: "14px" }}>
                {[1,2,3,4,5].map(i => (
                    <div key={i} style={{ display: "flex", gap: "12px", alignItems: "center", opacity: 1 - (i - 1) * 0.15 }}>
                        <div className="skel-bar" style={{ width: "42px", height: "28px", borderRadius: "30px", flexShrink: 0 }} />
                        <div className="skel-bar" style={{ width: "100px", height: "18px" }} />
                        <div className="skel-bar" style={{ width: "80px", height: "24px", borderRadius: "30px" }} />
                        <div className="skel-bar" style={{ width: "90px", height: "18px", marginLeft: "auto" }} />
                        <div className="skel-bar" style={{ width: "90px", height: "18px" }} />
                    </div>
                ))}
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <div style={{ padding: "5px 14px", background: canaraGoldLight, borderRadius: "30px", fontSize: "12px", color: canaraGoldDark, fontWeight: "600", display: "flex", alignItems: "center", gap: "5px" }}>
                    <FaClock size={11} /> Real-time data
                </div>
                <div style={{ padding: "5px 14px", background: "#EBF0FF", borderRadius: "30px", fontSize: "12px", color: canaraBlue, fontWeight: "600" }}>
                    256-bit encrypted
                </div>
            </div>
        </div>
    );
    // ────────────────────────────────────────────────────────────────────────

    return (
        <div style={S.page}>

            {/* ── Branded top bar ── */}
            <div style={S.brandBar}>
                <div style={S.brandBarGold} />
                <div style={S.brandBarInner}>
                    <div style={S.brandLeft}>
                        <div style={S.brandIconWrap}>
                            <FaWallet color={canaraGold} size={20} />
                        </div>
                        <div>
                            <div style={S.brandName}>ABC BANK</div>
                            <div style={S.brandTagline}>Trusted · Secure · Yours</div>
                        </div>
                    </div>
                    <div style={S.brandRight}>
                        <div style={S.brandBadge}>
                            <FaShieldAlt size={11} /> Secured Portal
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Page header ── */}
            <div style={S.header}>
                <div style={S.titleSection}>
                    <h1 style={S.title}>Transaction History</h1>
                    <p style={S.subtitle}>View and manage your financial activity</p>
                </div>
                {!loading && !loadingAccounts && transactions.length > 0 && (
                    <div style={S.txnCountBadge}>
                        {transactions.length} Transactions
                    </div>
                )}
            </div>

            {/* ── Account selector ── */}
            <div style={S.accountSelectorContainer}>
                <span style={S.dropdownLabel}>Select Account</span>
                <div className="custom-dropdown">
                    <div
                        className={`dropdown-selected ${isDropdownOpen ? 'open' : ''}`}
                        onClick={() => !loadingAccounts && setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <div className="selected-content">
                            <div className="selected-icon">
                                {selectedAccount ? getAccountIcon(selectedAccount.accountTypeName) : <FaWallet color={canaraBlue} />}
                            </div>
                            {selectedAccount ? (
                                <span className="selected-text">
                                    {selectedAccount.accountTypeName}
                                    <span className="selected-subtext">•••• {getLastFourDigits(selectedAccount.accountNumber)}</span>
                                </span>
                            ) : (
                                <span className="selected-text">Choose an account</span>
                            )}
                        </div>
                        <FaChevronDown className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`} />
                    </div>

                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            {accounts.map((account) => (
                                <div
                                    key={account.accountNumber}
                                    className={`dropdown-item ${selectedAccount?.accountNumber === account.accountNumber ? 'selected' : ''}`}
                                    onClick={() => { setSelectedAccount(account); setIsDropdownOpen(false); }}
                                >
                                    <div className="item-icon">{getAccountIcon(account.accountTypeName)}</div>
                                    <div className="item-details">
                                        <span className="item-type">{account.accountTypeName}</span>
                                        <span className="item-number">•••• {getLastFourDigits(account.accountNumber)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Transactions table card ── */}
            <div style={S.tableWrapper}>
                {loadingAccounts ? (
                    <LoadingState message="Loading your accounts" />
                ) : loading ? (
                    <LoadingState message="Loading transactions" />
                ) : !selectedAccount ? (
                    <div style={S.emptyState}>
                        <div style={S.emptyStateIcon}>🏦</div>
                        <h3 style={S.emptyStateTitle}>Select an Account</h3>
                        <p style={S.emptyStateText}>Please select an account to view transactions</p>
                    </div>
                ) : transactions.length === 0 ? (
                    <div style={S.emptyState}>
                        <div style={S.emptyStateIcon}>📊</div>
                        <h3 style={S.emptyStateTitle}>No Transactions Found</h3>
                        <p style={S.emptyStateText}>No transactions available for this account</p>
                    </div>
                ) : (
                    <>
                        <div style={S.tableContainer}>
                            <table style={S.table}>
                                <thead>
                                    <tr>
                                        <th style={S.thFirst}>S.No.</th>
                                        <th style={S.th}>Date</th>
                                        <th style={S.th}>Type</th>
                                        <th style={S.th}>Amount</th>
                                        <th style={S.th}>Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentTransactions.map((trx, index) => {
                                        const details = getTransactionDetails(trx);
                                        const isEven = index % 2 === 0;
                                        const rowBg = isEven ? "white" : "#F7F9FF";

                                        return (
                                            <tr
                                                key={trx.transactionId || index}
                                                style={{ backgroundColor: rowBg, animationDelay: `${index * 40}ms` }}
                                                className="transaction-row"
                                            >
                                                <td style={{ ...S.td, borderLeft: `3px solid transparent` }}>
                                                    <span style={S.serialNumber}>{getSerialNumber(index)}</span>
                                                </td>
                                                <td style={S.td}>
                                                    <span style={S.dateText}>{formatDate(trx.dateOfTransaction)}</span>
                                                </td>
                                                <td style={S.td}>
                                                    <span
                                                        className={`type-badge ${details.badgeClass}`}
                                                        style={{
                                                            background: details.badgeBg,
                                                            color: details.badgeColor,
                                                            borderColor: details.badgeColor,
                                                        }}
                                                    >
                                                        {details.icon}
                                                        {details.displayType}
                                                    </span>
                                                </td>
                                                <td style={S.td}>
                                                    <span style={{ ...S.amount, color: details.amountColor }}>
                                                        {details.sign}{formatCurrency(Math.abs(trx.transactionedAmount || 0))}
                                                    </span>
                                                </td>
                                                <td style={S.td}>
                                                    <span style={S.balanceText}>
                                                        {trx.closingBalance ? formatCurrency(trx.closingBalance) : "N/A"}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* ── Pagination ── */}
                        {totalPages > 1 && (
                            <div style={S.paginationContainer}>
                                <div style={S.pagination}>
                                    <button onClick={goToFirstPage} disabled={currentPage === 1} style={S.pageNavButton} className="pagination-button">
                                        <FaAngleDoubleLeft size={13} /><span>First</span>
                                    </button>
                                    <button onClick={goToPreviousPage} disabled={currentPage === 1} style={S.pageNavButton} className="pagination-button">
                                        <FaChevronLeft size={11} /><span>Prev</span>
                                    </button>

                                    <div style={S.pageNumbers}>
                                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                            let pageNum;
                                            if (totalPages <= 5) pageNum = i + 1;
                                            else if (currentPage <= 3) pageNum = i + 1;
                                            else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                                            else pageNum = currentPage - 2 + i;

                                            const isActive = currentPage === pageNum;
                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => goToPage(pageNum)}
                                                    style={{
                                                        ...S.pageButton,
                                                        ...(isActive ? {
                                                            background: `linear-gradient(135deg, ${canaraBlue}, ${canaraBlueLight})`,
                                                            borderColor: canaraBlue,
                                                            color: "white",
                                                            boxShadow: "0 4px 12px rgba(0,48,135,0.25)",
                                                        } : {})
                                                    }}
                                                    className={`pagination-button ${isActive ? 'active' : ''}`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <button onClick={goToNextPage} disabled={currentPage === totalPages} style={S.pageNavButton} className="pagination-button">
                                        <span>Next</span><FaChevronRight size={11} />
                                    </button>
                                    <button onClick={goToLastPage} disabled={currentPage === totalPages} style={S.pageNavButton} className="pagination-button">
                                        <span>Last</span><FaAngleDoubleRight size={13} />
                                    </button>
                                </div>
                                <div style={S.paginationInfo}>
                                    Showing {indexOfFirstItem + 1}–{Math.min(indexOfLastItem, transactions.length)} of {transactions.length} transactions
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

        </div>
    );
};

export default Transactions;
