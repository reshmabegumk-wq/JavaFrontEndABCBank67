// // import React, { useState, useEffect } from "react";
// // import {
// //     FaChevronLeft,
// //     FaChevronRight,
// //     FaAngleDoubleLeft,
// //     FaAngleDoubleRight,
// //     FaWallet,
// //     FaCreditCard,
// //     FaBriefcase,
// //     FaChevronDown
// // } from "react-icons/fa";
// // import API from "../../api"; // Import API utility
// // import { useSnackbar } from "../../Context/SnackbarContext";
// // import { useLocation } from "react-router-dom";

// // const Transactions = () => {
    
// //     const location = useLocation();
// //     const { showSnackbar } = useSnackbar();
    
// //     const [accounts, setAccounts] = useState([]);
// //     const [selectedAccount, setSelectedAccount] = useState(null);
// //     const [transactions, setTransactions] = useState([]);
// //     const [loading, setLoading] = useState(false);
// //     const [loadingAccounts, setLoadingAccounts] = useState(true);
// //     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
// //     // Pagination states
// //     const [currentPage, setCurrentPage] = useState(1);
// //     const [itemsPerPage] = useState(10);

// //     // Fetch all user accounts on component mount
// //     useEffect(() => {
// //         const fetchUserAccounts = async () => {
// //             setLoadingAccounts(true);
// //             try {
// //                 // Using the user ID 2 as per your API endpoint
// //                 const response = await API.get("account/userAccounts/2");
// //                 console.log("User accounts response:", response.data);
                
// //                 if (response.data && response.data.status === true && Array.isArray(response.data.data)) {
// //                     const userAccounts = response.data.data;
// //                     setAccounts(userAccounts);
                    
// //                     // Set default selected account if available
// //                     if (userAccounts.length > 0) {
// //                         setSelectedAccount(userAccounts[0]);
// //                     }
// //                 } else {
// //                     showSnackbar("error", "Failed to fetch accounts");
// //                 }
// //             } catch (error) {
// //                 console.error("Error fetching user accounts:", error);
// //                 showSnackbar("error", "Failed to fetch accounts");
// //             } finally {
// //                 setLoadingAccounts(false);
// //             }
// //         };

// //         fetchUserAccounts();
// //     }, []);

// //     // Fetch transactions when selected account changes
// //     useEffect(() => {
// //         const fetchTransactions = async () => {
// //             if (!selectedAccount) return;
            
// //             setLoading(true);
// //             try {
// //                 const accountNumber = selectedAccount.accountNumber;
// //                 console.log(`Fetching transactions for Account: ${accountNumber}`);
                
// //                 const response = await API.get(`account/transactions/${accountNumber}`);
// //                 console.log(`Transactions fetched:`, response.data);
                
// //                 const txData = response.data && Array.isArray(response.data.data) ? response.data.data : [];
// //                 setTransactions(txData);
// //                 setCurrentPage(1); // Reset to first page on new data
// //             } catch (error) {
// //                 console.error("Error fetching transactions:", error);
// //                 showSnackbar("error", "Failed to fetch transactions");
// //                 setTransactions([]);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchTransactions();
// //     }, [selectedAccount]);

// //     // Pagination calculations
// //     const indexOfLastItem = currentPage * itemsPerPage;
// //     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //     const currentTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem);
// //     const totalPages = Math.ceil(transactions.length / itemsPerPage);

// //     // Pagination handlers
// //     const goToFirstPage = () => setCurrentPage(1);
// //     const goToLastPage = () => setCurrentPage(totalPages);
// //     const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
// //     const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
// //     const goToPage = (pageNumber) => setCurrentPage(pageNumber);

// //     const formatCurrency = (amount) => {
// //         return new Intl.NumberFormat('en-IN', {
// //             style: 'currency',
// //             currency: 'INR',
// //             minimumFractionDigits: 0,
// //             maximumFractionDigits: 0,
// //         }).format(amount);
// //     };

// //     // Format date to DD-MM-YYYY
// //     const formatDate = (dateString) => {
// //         if (!dateString) return "N/A";
// //         const date = new Date(dateString);
// //         const day = String(date.getDate()).padStart(2, '0');
// //         const month = String(date.getMonth() + 1).padStart(2, '0');
// //         const year = date.getFullYear();
// //         return `${day}-${month}-${year}`;
// //     };

// //     // Get last 4 digits of account number
// //     const getLastFourDigits = (accountNumber) => {
// //         const accStr = accountNumber.toString();
// //         return accStr.slice(-4);
// //     };

// //     // Get account icon based on type
// //     const getAccountIcon = (accountType) => {
// //         if (accountType.toLowerCase().includes('savings')) {
// //             return <FaWallet style={{ color: 'var(--primary)', fontSize: '16px' }} />;
// //         } else if (accountType.toLowerCase().includes('current')) {
// //             return <FaCreditCard style={{ color: 'var(--warning)', fontSize: '16px' }} />;
// //         } else if (accountType.toLowerCase().includes('salary')) {
// //             return <FaBriefcase style={{ color: 'var(--success)', fontSize: '16px' }} />;
// //         }
// //         return <FaWallet style={{ color: 'var(--primary)', fontSize: '16px' }} />;
// //     };

// //     // Close dropdown when clicking outside
// //     useEffect(() => {
// //         const handleClickOutside = (event) => {
// //             if (!event.target.closest('.custom-dropdown')) {
// //                 setIsDropdownOpen(false);
// //             }
// //         };
// //         document.addEventListener('mousedown', handleClickOutside);
// //         return () => document.removeEventListener('mousedown', handleClickOutside);
// //     }, []);

// //     // Add CSS variables and enhanced animations
// //     useEffect(() => {
// //         const styleSheet = document.createElement("style");
// //         styleSheet.textContent = `
// //             :root {
// //                 /* ICICI Bank Theme - White and Orange */
// //                 --bg-primary: #ffffff;
// //                 --bg-secondary: #f8fafc;
// //                 --surface: #ffffff;
// //                 --surface-hover: #fff5f0;
// //                 --text-primary: #0f172a;
// //                 --text-secondary: #334155;
// //                 --text-muted: #64748b;
// //                 --border: #e2e8f0;
// //                 --border-light: #f1f5f9;
// //                 --border-focus: #ff6e4a;
// //                 --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
// //                 --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
// //                 --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
// //                 --primary: #ff6e4a;
// //                 --primary-light: #ff8b6e;
// //                 --primary-dark: #e65a3a;
// //                 --primary-soft: rgba(255, 110, 74, 0.1);
// //                 --primary-gradient: linear-gradient(135deg, #ff6e4a, #ff8b6e);
// //                 --success: #059669;
// //                 --success-soft: rgba(5, 150, 105, 0.1);
// //                 --danger: #dc2626;
// //                 --danger-soft: rgba(220, 38, 38, 0.1);
// //                 --warning: #d97706;
// //                 --warning-soft: rgba(217, 119, 6, 0.1);
// //                 --hover-bg: #fff5f0;
// //                 --row-hover: #fff5f0;
// //                 --pagination-hover: #ff6e4a;
// //             }

// //             * {
// //                 transition: all 0.2s ease;
// //                 box-sizing: border-box;
// //             }

// //             body {
// //                 background-color: var(--bg-primary);
// //                 color: var(--text-primary);
// //                 font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
// //                 margin: 0;
// //                 padding: 0;
// //             }

// //             @keyframes spin {
// //                 0% { transform: rotate(0deg); }
// //                 100% { transform: rotate(360deg); }
// //             }
            
// //             @keyframes pulse {
// //                 0%, 100% { transform: scale(1); opacity: 1; }
// //                 50% { transform: scale(1.05); opacity: 0.8; }
// //             }
            
// //             @keyframes shimmer {
// //                 0% { background-position: -1000px 0; }
// //                 100% { background-position: 1000px 0; }
// //             }

// //             @keyframes slideDown {
// //                 from {
// //                     opacity: 0;
// //                     transform: translateY(-10px);
// //                 }
// //                 to {
// //                     opacity: 1;
// //                     transform: translateY(0);
// //                 }
// //             }

// //             @keyframes fadeInUp {
// //                 from {
// //                     opacity: 0;
// //                     transform: translateY(20px);
// //                 }
// //                 to {
// //                     opacity: 1;
// //                     transform: translateY(0);
// //                 }
// //             }

// //             @keyframes bounceIn {
// //                 0% { transform: scale(0.9); opacity: 0; }
// //                 50% { transform: scale(1.05); }
// //                 100% { transform: scale(1); opacity: 1; }
// //             }

// //             @keyframes slideInLeft {
// //                 from {
// //                     opacity: 0;
// //                     transform: translateX(-20px);
// //                 }
// //                 to {
// //                     opacity: 1;
// //                     transform: translateX(0);
// //                 }
// //             }

// //             @keyframes slideInRight {
// //                 from {
// //                     opacity: 0;
// //                     transform: translateX(20px);
// //                 }
// //                 to {
// //                     opacity: 1;
// //                     transform: translateX(0);
// //                 }
// //             }

// //             @keyframes float {
// //                 0%, 100% { transform: translateY(0); }
// //                 50% { transform: translateY(-5px); }
// //             }

// //             @keyframes glow {
// //                 0%, 100% { box-shadow: 0 0 5px rgba(255, 110, 74, 0.2); }
// //                 50% { box-shadow: 0 0 20px rgba(255, 110, 74, 0.4); }
// //             }

// //             .transaction-row {
// //                 transition: all 0.3s ease;
// //                 animation: fadeInUp 0.4s ease;
// //             }

// //             .transaction-row:hover {
// //                 background-color: var(--row-hover) !important;
// //                 transform: translateX(4px) scale(1.01);
// //                 box-shadow: var(--shadow);
// //             }

// //             .pagination-button {
// //                 transition: all 0.3s ease;
// //                 animation: bounceIn 0.3s ease;
// //             }

// //             .pagination-button:hover:not(:disabled) {
// //                 background-color: var(--primary);
// //                 color: white;
// //                 border-color: var(--primary);
// //                 transform: translateY(-2px) scale(1.05);
// //                 box-shadow: var(--shadow);
// //             }

// //             .pagination-button.active {
// //                 background: var(--primary-gradient);
// //                 color: white;
// //                 border-color: var(--primary);
// //                 animation: glow 2s infinite;
// //             }

// //             .pagination-button:disabled {
// //                 opacity: 0.5;
// //                 cursor: not-allowed;
// //                 transform: none;
// //             }

// //             .type-badge {
// //                 transition: all 0.3s ease;
// //                 animation: slideInLeft 0.3s ease;
// //             }

// //             .type-badge:hover {
// //                 transform: translateY(-2px) scale(1.05);
// //                 box-shadow: var(--shadow);
// //             }

// //             .type-badge.deposit:hover {
// //                 background: var(--success-soft) !important;
// //                 border-color: var(--success) !important;
// //             }

// //             .type-badge.withdrawal:hover {
// //                 background: var(--danger-soft) !important;
// //                 border-color: var(--danger) !important;
// //             }

// //             /* Custom Dropdown Styles with animations */
// //             .custom-dropdown {
// //                 position: relative;
// //                 width: 350px;
// //                 cursor: pointer;
// //                 animation: slideInRight 0.4s ease;
// //             }

// //             .dropdown-selected {
// //                 display: flex;
// //                 align-items: center;
// //                 justify-content: space-between;
// //                 padding: 14px 20px;
// //                 background: var(--surface);
// //                 border: 2px solid var(--border);
// //                 border-radius: 16px;
// //                 font-size: 15px;
// //                 color: var(--text-primary);
// //                 transition: all 0.3s ease;
// //                 box-shadow: var(--shadow-sm);
// //             }

// //             .dropdown-selected:hover {
// //                 border-color: var(--primary);
// //                 box-shadow: 0 4px 12px rgba(255, 110, 74, 0.15);
// //                 transform: translateY(-2px);
// //             }

// //             .dropdown-selected.open {
// //                 border-color: var(--primary);
// //                 box-shadow: 0 4px 16px rgba(255, 110, 74, 0.2);
// //             }

// //             .selected-content {
// //                 display: flex;
// //                 align-items: center;
// //                 gap: 12px;
// //             }

// //             .selected-icon {
// //                 display: flex;
// //                 align-items: center;
// //                 justify-content: center;
// //                 width: 32px;
// //                 height: 32px;
// //                 background: var(--primary-soft);
// //                 border-radius: 10px;
// //                 transition: all 0.3s ease;
// //                 animation: pulse 2s infinite;
// //             }

// //             .dropdown-selected:hover .selected-icon {
// //                 transform: scale(1.1);
// //                 background: var(--primary);
// //                 color: white;
// //             }

// //             .selected-icon svg {
// //                 transition: all 0.3s ease;
// //             }

// //             .dropdown-selected:hover .selected-icon svg {
// //                 color: white !important;
// //             }

// //             .selected-text {
// //                 font-weight: 600;
// //             }

// //             .selected-subtext {
// //                 font-size: 13px;
// //                 color: var(--text-muted);
// //                 margin-left: 4px;
// //                 font-weight: 400;
// //             }

// //             .dropdown-arrow {
// //                 color: var(--text-muted);
// //                 transition: transform 0.3s ease;
// //             }

// //             .dropdown-arrow.open {
// //                 transform: rotate(180deg);
// //                 color: var(--primary);
// //             }

// //             .dropdown-menu {
// //                 position: absolute;
// //                 top: calc(100% + 8px);
// //                 left: 0;
// //                 right: 0;
// //                 background: var(--surface);
// //                 border: 1px solid var(--border);
// //                 border-radius: 16px;
// //                 overflow: hidden;
// //                 z-index: 1000;
// //                 box-shadow: var(--shadow-lg);
// //                 animation: slideDown 0.3s ease;
// //                 max-height: 300px;
// //                 overflow-y: auto;
// //             }

// //             .dropdown-menu::-webkit-scrollbar {
// //                 width: 6px;
// //             }

// //             .dropdown-menu::-webkit-scrollbar-track {
// //                 background: var(--bg-secondary);
// //             }

// //             .dropdown-menu::-webkit-scrollbar-thumb {
// //                 background: var(--primary-light);
// //                 border-radius: 20px;
// //             }

// //             .dropdown-menu::-webkit-scrollbar-thumb:hover {
// //                 background: var(--primary);
// //             }

// //             .dropdown-item {
// //                 display: flex;
// //                 align-items: center;
// //                 gap: 12px;
// //                 padding: 14px 20px;
// //                 transition: all 0.3s ease;
// //                 border-bottom: 1px solid var(--border-light);
// //                 animation: slideInLeft 0.2s ease;
// //             }

// //             .dropdown-item:last-child {
// //                 border-bottom: none;
// //             }

// //             .dropdown-item:hover {
// //                 background: var(--primary-soft);
// //                 transform: translateX(4px);
// //             }

// //             .dropdown-item.selected {
// //                 background: var(--primary-soft);
// //                 border-left: 4px solid var(--primary);
// //             }

// //             .item-icon {
// //                 display: flex;
// //                 align-items: center;
// //                 justify-content: center;
// //                 width: 36px;
// //                 height: 36px;
// //                 background: var(--bg-primary);
// //                 border-radius: 12px;
// //                 border: 1px solid var(--border);
// //                 transition: all 0.3s ease;
// //             }

// //             .dropdown-item:hover .item-icon {
// //                 transform: scale(1.1) rotate(5deg);
// //                 border-color: var(--primary);
// //             }

// //             .item-details {
// //                 flex: 1;
// //                 display: flex;
// //                 align-items: center;
// //                 justify-content: space-between;
// //             }

// //             .item-type {
// //                 font-weight: 600;
// //                 color: var(--text-primary);
// //                 font-size: 14px;
// //             }

// //             .item-number {
// //                 font-size: 13px;
// //                 color: var(--text-muted);
// //                 font-family: 'SF Mono', monospace;
// //                 background: var(--bg-primary);
// //                 padding: 4px 8px;
// //                 border-radius: 20px;
// //                 border: 1px solid var(--border-light);
// //                 transition: all 0.3s ease;
// //             }

// //             .dropdown-item:hover .item-number {
// //                 background: var(--surface);
// //                 border-color: var(--primary);
// //                 color: var(--primary);
// //             }

// //             .date-text {
// //                 color: #000000 !important;
// //                 font-weight: 700 !important;
// //                 animation: slideInRight 0.3s ease;
// //             }

// //             .dropdown-label {
// //                 font-size: 14px;
// //                 font-weight: 600;
// //                 color: var(--text-secondary);
// //                 margin-bottom: 8px;
// //                 display: block;
// //                 animation: slideInLeft 0.3s ease;
// //             }

// //             .amount-positive {
// //                 animation: slideInRight 0.3s ease;
// //                 position: relative;
// //             }

// //             .amount-positive:hover {
// //                 transform: scale(1.05);
// //             }

// //             .amount-positive::after {
// //                 content: '';
// //                 position: absolute;
// //                 bottom: -2px;
// //                 left: 0;
// //                 width: 100%;
// //                 height: 2px;
// //                 background: var(--success);
// //                 transform: scaleX(0);
// //                 transition: transform 0.3s ease;
// //             }

// //             .amount-positive:hover::after {
// //                 transform: scaleX(1);
// //             }

// //             .amount-negative {
// //                 animation: slideInRight 0.3s ease;
// //                 position: relative;
// //             }

// //             .amount-negative:hover {
// //                 transform: scale(1.05);
// //             }

// //             .amount-negative::after {
// //                 content: '';
// //                 position: absolute;
// //                 bottom: -2px;
// //                 left: 0;
// //                 width: 100%;
// //                 height: 2px;
// //                 background: var(--danger);
// //                 transform: scaleX(0);
// //                 transition: transform 0.3s ease;
// //             }

// //             .amount-negative:hover::after {
// //                 transform: scaleX(1);
// //             }

// //             .balance-text {
// //                 transition: all 0.3s ease;
// //                 animation: slideInLeft 0.3s ease;
// //             }

// //             .balance-text:hover {
// //                 transform: scale(1.05);
// //                 color: var(--primary);
// //             }

// //             .serial-number {
// //                 transition: all 0.3s ease;
// //                 animation: bounceIn 0.3s ease;
// //             }

// //             .serial-number:hover {
// //                 transform: scale(1.2);
// //                 color: var(--primary);
// //             }

// //             .transaction-count {
// //                 animation: bounceIn 0.4s ease;
// //                 transition: all 0.3s ease;
// //             }

// //             .transaction-count:hover {
// //                 transform: translateY(-2px) scale(1.05);
// //                 box-shadow: var(--shadow);
// //             }
// //         `;
// //         document.head.appendChild(styleSheet);
// //     }, []);

// //     const styles = {
// //         container: {
// //             padding: "32px",
// //             maxWidth: "1400px",
// //             margin: "0 auto",
// //             fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
// //             color: "var(--text-primary)",
// //             backgroundColor: "var(--bg-primary)",
// //             minHeight: "100vh",
// //         },
// //         header: {
// //             marginBottom: "32px",
// //             display: "flex",
// //             justifyContent: "space-between",
// //             alignItems: "center",
// //             flexWrap: "wrap",
// //             gap: "16px",
// //             animation: "slideInLeft 0.4s ease",
// //         },
// //         titleSection: {
// //             display: "flex",
// //             flexDirection: "column",
// //             gap: "4px",
// //         },
// //         title: {
// //             fontSize: "32px",
// //             fontWeight: "700",
// //             margin: 0,
// //             color: "var(--text-primary)",
// //             letterSpacing: "-0.02em",
// //             background: "linear-gradient(135deg, #0f172a, #ff6e4a)",
// //             WebkitBackgroundClip: "text",
// //             WebkitTextFillColor: "transparent",
// //         },
// //         subtitle: {
// //             fontSize: "15px",
// //             color: "var(--text-muted)",
// //             margin: 0,
// //             fontWeight: "400",
// //         },
// //         transactionCount: {
// //             padding: "8px 16px",
// //             background: "var(--primary-gradient)",
// //             border: "none",
// //             borderRadius: "40px",
// //             fontSize: "14px",
// //             color: "white",
// //             fontWeight: "600",
// //             boxShadow: "var(--shadow)",
// //             cursor: "pointer",
// //             transition: "all 0.3s ease",
// //             animation: "bounceIn 0.4s ease",
// //             ':hover': {
// //                 transform: "translateY(-2px) scale(1.05)",
// //                 boxShadow: "var(--shadow-lg)",
// //             }
// //         },
// //         accountSelectorContainer: {
// //             marginBottom: "32px",
// //             animation: "slideInRight 0.4s ease",
// //         },
// //         dropdownLabel: {
// //             fontSize: "14px",
// //             fontWeight: "600",
// //             color: "var(--text-secondary)",
// //             marginBottom: "8px",
// //             display: "block",
// //             animation: "slideInLeft 0.3s ease",
// //         },
// //         tableWrapper: {
// //             background: "var(--surface)",
// //             borderRadius: "24px",
// //             border: "1px solid var(--border)",
// //             overflow: "hidden",
// //             boxShadow: "var(--shadow-lg)",
// //             marginBottom: "24px",
// //             animation: "fadeInUp 0.4s ease",
// //         },
// //         tableContainer: {
// //             overflowX: "auto",
// //         },
// //         table: {
// //             width: "100%",
// //             borderCollapse: "collapse",
// //             minWidth: "900px",
// //         },
// //         th: {
// //             textAlign: "left",
// //             padding: "20px 24px",
// //             borderBottom: "2px solid var(--border)",
// //             color: "#000000",
// //             fontSize: "13px",
// //             fontWeight: "700",
// //             textTransform: "uppercase",
// //             letterSpacing: "0.5px",
// //             backgroundColor: "var(--bg-secondary)",
// //             position: "sticky",
// //             top: 0,
// //             zIndex: 10,
// //         },
// //         tr: {
// //             borderBottom: "1px solid var(--border-light)",
// //             transition: "all 0.3s ease",
// //             cursor: "default",
// //         },
// //         td: {
// //             padding: "18px 24px",
// //             fontSize: "14px",
// //             color: "var(--text-primary)",
// //             verticalAlign: "middle",
// //         },
// //         serialNumber: {
// //             fontWeight: "700",
// //             color: "var(--primary)",
// //             fontFamily: "'SF Mono', 'Fira Code', monospace",
// //             fontSize: "14px",
// //             display: "inline-block",
// //             padding: "4px 8px",
// //             borderRadius: "20px",
// //             background: "var(--primary-soft)",
// //             minWidth: "40px",
// //             textAlign: "center",
// //         },
// //         amount: {
// //             fontWeight: "700",
// //             fontSize: "15px",
// //             fontFamily: "'SF Mono', 'Fira Code', monospace",
// //         },
// //         credit: {
// //             color: "var(--success)",
// //         },
// //         debit: {
// //             color: "var(--danger)",
// //         },
// //         typeBadge: {
// //             padding: "6px 14px",
// //             background: "var(--bg-primary)",
// //             borderRadius: "30px",
// //             fontSize: "12px",
// //             fontWeight: "600",
// //             color: "var(--text-secondary)",
// //             display: "inline-block",
// //             border: "1px solid var(--border)",
// //             textTransform: "uppercase",
// //             letterSpacing: "0.3px",
// //         },
// //         balanceText: {
// //             fontWeight: "700",
// //             color: "var(--text-primary)",
// //             fontFamily: "'SF Mono', 'Fira Code', monospace",
// //             fontSize: "15px",
// //         },
// //         dateText: {
// //             color: "#000000",
// //             fontWeight: "700",
// //             fontSize: "14px",
// //             fontFamily: "'SF Mono', 'Fira Code', monospace",
// //         },
// //         // Pagination styles
// //         paginationContainer: {
// //             display: "flex",
// //             flexDirection: "column",
// //             alignItems: "center",
// //             gap: "16px",
// //             marginTop: "24px",
// //             padding: "0 24px 24px 24px",
// //         },
// //         pagination: {
// //             display: "flex",
// //             alignItems: "center",
// //             gap: "8px",
// //             flexWrap: "wrap",
// //             justifyContent: "center",
// //         },
// //         pageButton: {
// //             minWidth: "40px",
// //             height: "40px",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             padding: "0 12px",
// //             backgroundColor: "var(--surface)",
// //             border: "1px solid var(--border)",
// //             borderRadius: "10px",
// //             color: "var(--text-secondary)",
// //             fontSize: "14px",
// //             fontWeight: "600",
// //             cursor: "pointer",
// //             transition: "all 0.2s ease",
// //         },
// //         pageNavButton: {
// //             padding: "0 16px",
// //             height: "40px",
// //             display: "flex",
// //             alignItems: "center",
// //             gap: "6px",
// //             backgroundColor: "var(--surface)",
// //             border: "1px solid var(--border)",
// //             borderRadius: "10px",
// //             color: "var(--text-secondary)",
// //             fontSize: "14px",
// //             fontWeight: "600",
// //             cursor: "pointer",
// //             transition: "all 0.2s ease",
// //         },
// //         paginationInfo: {
// //             fontSize: "14px",
// //             color: "var(--text-muted)",
// //             textAlign: "center",
// //         },
// //         pageNumbers: {
// //             display: "flex",
// //             gap: "4px",
// //         },
// //         // Empty state
// //         emptyState: {
// //             padding: "60px 40px",
// //             textAlign: "center",
// //             color: "var(--text-muted)",
// //             fontSize: "16px",
// //             background: "var(--surface)",
// //             borderRadius: "24px",
// //             border: "1px solid var(--border)",
// //             boxShadow: "var(--shadow)",
// //         },
// //         emptyStateIcon: {
// //             fontSize: "48px",
// //             marginBottom: "16px",
// //             opacity: 0.5,
// //         },
// //         emptyStateTitle: {
// //             fontSize: "18px",
// //             fontWeight: "600",
// //             color: "var(--text-primary)",
// //             margin: "0 0 8px 0",
// //         },
// //         emptyStateText: {
// //             fontSize: "14px",
// //             color: "var(--text-muted)",
// //             margin: 0,
// //         },
// //         // Loading animation styles
// //         loadingContainer: {
// //             padding: "60px 24px",
// //             display: "flex",
// //             flexDirection: "column",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             gap: "24px",
// //             minHeight: "500px",
// //             background: "var(--surface)",
// //             borderRadius: "24px",
// //         },
// //         loadingLogo: {
// //             fontSize: "32px",
// //             fontWeight: "700",
// //             background: "var(--primary-gradient)",
// //             WebkitBackgroundClip: "text",
// //             WebkitTextFillColor: "transparent",
// //             marginBottom: "8px",
// //             animation: "pulse 2s ease-in-out infinite",
// //         },
// //         loadingText: {
// //             fontSize: "16px",
// //             color: "var(--text-muted)",
// //             marginBottom: "16px",
// //             animation: "pulse 2s ease-in-out infinite",
// //         },
// //         loadingSecure: {
// //             display: "flex",
// //             alignItems: "center",
// //             gap: "8px",
// //             fontSize: "14px",
// //             color: "var(--primary)",
// //             marginBottom: "24px",
// //             animation: "float 3s ease-in-out infinite",
// //         },
// //         loadingDivider: {
// //             width: "100%",
// //             maxWidth: "300px",
// //             height: "1px",
// //             background: "var(--border)",
// //             margin: "16px 0",
// //         },
// //         loadingMenuItem: {
// //             width: "240px",
// //             height: "20px",
// //             background: "linear-gradient(90deg, var(--border) 25%, var(--primary-soft) 50%, var(--border) 75%)",
// //             backgroundSize: "200% 100%",
// //             borderRadius: "6px",
// //             animation: "shimmer 1.5s infinite",
// //             margin: "12px 0",
// //         },
// //         loadingFooter: {
// //             display: "flex",
// //             alignItems: "center",
// //             gap: "16px",
// //             marginTop: "24px",
// //             flexWrap: "wrap",
// //             justifyContent: "center",
// //         },
// //         loadingBadge: {
// //             padding: "6px 16px",
// //             background: "var(--border)",
// //             borderRadius: "30px",
// //             fontSize: "13px",
// //             color: "var(--text-muted)",
// //             animation: "pulse 2s ease-in-out infinite",
// //         }
// //     };

// //     // Calculate serial number for current page
// //     const getSerialNumber = (index) => {
// //         return indexOfFirstItem + index + 1;
// //     };

// //     return (
// //         <div style={styles.container}>
// //             <div style={styles.header}>
// //                 <div style={styles.titleSection}>
// //                     <h1 style={styles.title}>Transactions</h1>
// //                     <p style={styles.subtitle}>View and manage your financial activity</p>
// //                 </div>
// //                 {!loading && !loadingAccounts && transactions.length > 0 && (
// //                     <div style={styles.transactionCount} className="transaction-count">
// //                         {transactions.length} Transactions
// //                     </div>
// //                 )}
// //             </div>

// //             {/* Stylish Custom Dropdown - Only Account Type and Last 4 Digits */}
// //             <div style={styles.accountSelectorContainer}>
// //                 <span style={styles.dropdownLabel}>Select Account</span>
// //                 <div className="custom-dropdown">
// //                     <div 
// //                         className={`dropdown-selected ${isDropdownOpen ? 'open' : ''}`}
// //                         onClick={() => !loadingAccounts && setIsDropdownOpen(!isDropdownOpen)}
// //                     >
// //                         <div className="selected-content">
// //                             <div className="selected-icon">
// //                                 {selectedAccount ? getAccountIcon(selectedAccount.accountTypeName) : <FaWallet />}
// //                             </div>
// //                             {selectedAccount ? (
// //                                 <span className="selected-text">
// //                                     {selectedAccount.accountTypeName}
// //                                     <span className="selected-subtext">
// //                                         • •••• {getLastFourDigits(selectedAccount.accountNumber)}
// //                                     </span>
// //                                 </span>
// //                             ) : (
// //                                 <span className="selected-text">Choose an account</span>
// //                             )}
// //                         </div>
// //                         <FaChevronDown className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`} />
// //                     </div>

// //                     {isDropdownOpen && (
// //                         <div className="dropdown-menu">
// //                             {accounts.map((account) => (
// //                                 <div
// //                                     key={account.accountNumber}
// //                                     className={`dropdown-item ${selectedAccount?.accountNumber === account.accountNumber ? 'selected' : ''}`}
// //                                     onClick={() => {
// //                                         setSelectedAccount(account);
// //                                         setIsDropdownOpen(false);
// //                                     }}
// //                                 >
// //                                     <div className="item-icon">
// //                                         {getAccountIcon(account.accountTypeName)}
// //                                     </div>
// //                                     <div className="item-details">
// //                                         <span className="item-type">{account.accountTypeName}</span>
// //                                         <span className="item-number">•••• {getLastFourDigits(account.accountNumber)}</span>
// //                                     </div>
// //                                 </div>
// //                             ))}
// //                         </div>
// //                     )}
// //                 </div>
// //             </div>

// //             {/* Transactions Table */}
// //             <div style={styles.tableWrapper}>
// //                 {loadingAccounts ? (
// //                     <div style={styles.loadingContainer}>
// //                         <div style={styles.loadingLogo}>ABC Bank</div>
// //                         <div style={styles.loadingText}>Loading your accounts</div>
// //                         <div style={styles.loadingSecure}>
// //                             <span>🔒</span> Secure Connection
// //                         </div>
// //                         <div style={styles.loadingDivider}></div>
// //                         <div style={{ width: "100%", maxWidth: "320px" }}>
// //                             <div style={styles.loadingMenuItem}></div>
// //                             <div style={styles.loadingMenuItem}></div>
// //                             <div style={styles.loadingMenuItem}></div>
// //                             <div style={styles.loadingMenuItem}></div>
// //                             <div style={styles.loadingMenuItem}></div>
// //                         </div>
// //                     </div>
// //                 ) : loading ? (
// //                     <div style={styles.loadingContainer}>
// //                         <div style={styles.loadingLogo}>ABC Bank</div>
// //                         <div style={styles.loadingText}>Loading your transactions</div>
// //                         <div style={styles.loadingSecure}>
// //                             <span>🔒</span> Secure Connection
// //                         </div>
// //                         <div style={styles.loadingDivider}></div>
// //                         <div style={{ width: "100%", maxWidth: "320px" }}>
// //                             <div style={styles.loadingMenuItem}></div>
// //                             <div style={styles.loadingMenuItem}></div>
// //                             <div style={styles.loadingMenuItem}></div>
// //                             <div style={styles.loadingMenuItem}></div>
// //                             <div style={styles.loadingMenuItem}></div>
// //                         </div>
// //                     </div>
// //                 ) : !selectedAccount ? (
// //                     <div style={styles.emptyState}>
// //                         <div style={styles.emptyStateIcon}>🏦</div>
// //                         <h3 style={styles.emptyStateTitle}>Select an Account</h3>
// //                         <p style={styles.emptyStateText}>
// //                             Please select an account to view transactions
// //                         </p>
// //                     </div>
// //                 ) : transactions.length > 0 ? (
// //                     <>
// //                         <div style={styles.tableContainer}>
// //                             <table style={styles.table}>
// //                                 <thead>
// //                                     <tr>
// //                                         <th style={styles.th}>S.No.</th>
// //                                         <th style={styles.th}>Date & Time</th>
// //                                         <th style={styles.th}>Type</th>
// //                                         <th style={styles.th}>Amount</th>
// //                                         <th style={styles.th}>Balance</th>
// //                                     </tr>
// //                                 </thead>
// //                                 <tbody>
// //                                     {currentTransactions.map((trx, index) => {
// //                                         const isCredit = trx.transactionType === "DEPOSIT";
// //                                         const isDebit = trx.transactionType === "WITHDRAWAL" || trx.transactionType === "CREDITED";
// //                                         const rowStyle = index % 2 === 0 ? {} : { backgroundColor: "var(--bg-primary)" };
// //                                         const serialNumber = getSerialNumber(index);
                                        
// //                                         return (
// //                                             <tr 
// //                                                 key={trx.transactionId || index} 
// //                                                 style={{ ...styles.tr, ...rowStyle }}
// //                                                 className="transaction-row"
// //                                             >
// //                                                 <td style={styles.td}>
// //                                                     <span style={styles.serialNumber} className="serial-number">{serialNumber}</span>
// //                                                 </td>
// //                                                 <td style={styles.td}>
// //                                                     <span style={styles.dateText} className="date-text">
// //                                                         {formatDate(trx.dateOfTransaction)}
// //                                                     </span>
// //                                                 </td>
// //                                                 <td style={styles.td}>
// //                                                     <span 
// //                                                         style={{
// //                                                             ...styles.typeBadge,
// //                                                             ...(isCredit ? { background: "var(--success-soft)", color: "var(--success)", borderColor: "var(--success)" } : 
// //                                                                isDebit ? { background: "var(--danger-soft)", color: "var(--danger)", borderColor: "var(--danger)" } : {})
// //                                                         }} 
// //                                                         className={`type-badge ${isCredit ? 'deposit' : isDebit ? 'withdrawal' : ''}`}
// //                                                     >
// //                                                         {isCredit ? "DEPOSIT" : isDebit ? "WITHDRAWAL" : trx.transactionType}
// //                                                     </span>
// //                                                 </td>
// //                                                 <td style={styles.td}>
// //                                                     <span style={{
// //                                                         ...styles.amount,
// //                                                         ...(isCredit ? styles.credit : styles.debit)
// //                                                     }} className={isCredit ? 'amount-positive' : 'amount-negative'}>
// //                                                         {isCredit ? '+' : '-'}
// //                                                         {trx.transactionedAmount ? formatCurrency(trx.transactionedAmount) : "₹0"}
// //                                                     </span>
// //                                                 </td>
// //                                                 <td style={styles.td}>
// //                                                     <span style={styles.balanceText} className="balance-text">
// //                                                         {trx.closingBalance ? formatCurrency(trx.closingBalance) : "N/A"}
// //                                                     </span>
// //                                                 </td>
// //                                             </tr>
// //                                         );
// //                                     })}
// //                                 </tbody>
// //                             </table>
// //                         </div>

// //                         {/* Pagination */}
// //                         {totalPages > 1 && (
// //                             <div style={styles.paginationContainer}>
// //                                 <div style={styles.pagination}>
// //                                     <button
// //                                         onClick={goToFirstPage}
// //                                         disabled={currentPage === 1}
// //                                         style={styles.pageNavButton}
// //                                         className="pagination-button"
// //                                     >
// //                                         <FaAngleDoubleLeft size={14} />
// //                                         <span>First</span>
// //                                     </button>
// //                                     <button
// //                                         onClick={goToPreviousPage}
// //                                         disabled={currentPage === 1}
// //                                         style={styles.pageNavButton}
// //                                         className="pagination-button"
// //                                     >
// //                                         <FaChevronLeft size={12} />
// //                                         <span>Prev</span>
// //                                     </button>

// //                                     <div style={styles.pageNumbers}>
// //                                         {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
// //                                             let pageNum;
// //                                             if (totalPages <= 5) {
// //                                                 pageNum = i + 1;
// //                                             } else if (currentPage <= 3) {
// //                                                 pageNum = i + 1;
// //                                             } else if (currentPage >= totalPages - 2) {
// //                                                 pageNum = totalPages - 4 + i;
// //                                             } else {
// //                                                 pageNum = currentPage - 2 + i;
// //                                             }
                                            
// //                                             return (
// //                                                 <button
// //                                                     key={pageNum}
// //                                                     onClick={() => goToPage(pageNum)}
// //                                                     style={{
// //                                                         ...styles.pageButton,
// //                                                         ...(currentPage === pageNum ? { 
// //                                                             background: "var(--primary-gradient)",
// //                                                             borderColor: "var(--primary)",
// //                                                             color: "white"
// //                                                         } : {})
// //                                                     }}
// //                                                     className={`pagination-button ${currentPage === pageNum ? 'active' : ''}`}
// //                                                 >
// //                                                     {pageNum}
// //                                                 </button>
// //                                             );
// //                                         })}
// //                                     </div>

// //                                     <button
// //                                         onClick={goToNextPage}
// //                                         disabled={currentPage === totalPages}
// //                                         style={styles.pageNavButton}
// //                                         className="pagination-button"
// //                                     >
// //                                         <span>Next</span>
// //                                         <FaChevronRight size={12} />
// //                                     </button>
// //                                     <button
// //                                         onClick={goToLastPage}
// //                                         disabled={currentPage === totalPages}
// //                                         style={styles.pageNavButton}
// //                                         className="pagination-button"
// //                                     >
// //                                         <span>Last</span>
// //                                         <FaAngleDoubleRight size={14} />
// //                                     </button>
// //                                 </div>

// //                                 <div style={styles.paginationInfo}>
// //                                     Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, transactions.length)} of {transactions.length} transactions
// //                                 </div>
// //                             </div>
// //                         )}
// //                     </>
// //                 ) : (
// //                     <div style={styles.emptyState}>
// //                         <div style={styles.emptyStateIcon}>📊</div>
// //                         <h3 style={styles.emptyStateTitle}>No Transactions Found</h3>
// //                         <p style={styles.emptyStateText}>
// //                             No transactions available for this account
// //                         </p>
// //                     </div>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// // export default Transactions;
// import React, { useState, useEffect } from "react";
// import {
//     FaChevronLeft,
//     FaChevronRight,
//     FaAngleDoubleLeft,
//     FaAngleDoubleRight,
//     FaWallet,
//     FaCreditCard,
//     FaBriefcase,
//     FaChevronDown,
//     FaShieldAlt,
//     FaClock
// } from "react-icons/fa";
// import API from "../../api";
// import { useSnackbar } from "../../Context/SnackbarContext";

// const Transactions = () => {
//     const { showSnackbar } = useSnackbar();
    
//     const [accounts, setAccounts] = useState([]);
//     const [selectedAccount, setSelectedAccount] = useState(null);
//     const [transactions, setTransactions] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [loadingAccounts, setLoadingAccounts] = useState(true);
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
//     // Pagination states
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(10);

//     // Canara Bank color scheme - defined at the top of component
//     const canaraBlue = "#1E3A8A";
//     const canaraGold = "#F59E0B";
//     const canaraLightBlue = "#EFF6FF";
//     const canaraGray = "#F3F4F6";
//     const canaraText = "#111827";
//     const canaraTextLight = "#6B7280";
//     const canaraBorder = "#E5E7EB";

//     // Fetch all user accounts on component mount
//     useEffect(() => {
//         const fetchUserAccounts = async () => {
//             setLoadingAccounts(true);
//             try {
//                 // Using the user ID 2 as per your API endpoint
//                 const response = await API.get("account/userAccounts/2");
//                 console.log("User accounts response:", response.data);
                
//                 if (response.data && response.data.status === true && Array.isArray(response.data.data)) {
//                     const userAccounts = response.data.data;
//                     setAccounts(userAccounts);
                    
//                     // Set default selected account if available
//                     if (userAccounts.length > 0) {
//                         setSelectedAccount(userAccounts[0]);
//                     }
//                 } else {
//                     showSnackbar("error", "Failed to fetch accounts");
//                 }
//             } catch (error) {
//                 console.error("Error fetching user accounts:", error);
//                 showSnackbar("error", "Failed to fetch accounts");
//             } finally {
//                 setLoadingAccounts(false);
//             }
//         };

//         fetchUserAccounts();
//     }, [showSnackbar]);

//     // Fetch transactions when selected account changes
//     useEffect(() => {
//         const fetchTransactions = async () => {
//             if (!selectedAccount) return;
            
//             setLoading(true);
//             try {
//                 const accountNumber = selectedAccount.accountNumber;
//                 console.log(`Fetching transactions for Account: ${accountNumber}`);
                
//                 const response = await API.get(`account/transactions/${accountNumber}`);
//                 console.log(`Transactions fetched:`, response.data);
                
//                 const txData = response.data && Array.isArray(response.data.data) ? response.data.data : [];
//                 setTransactions(txData);
//                 setCurrentPage(1); // Reset to first page on new data
//             } catch (error) {
//                 console.error("Error fetching transactions:", error);
//                 showSnackbar("error", "Failed to fetch transactions");
//                 setTransactions([]);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchTransactions();
//     }, [selectedAccount, showSnackbar]);

//     // Pagination calculations
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem);
//     const totalPages = Math.ceil(transactions.length / itemsPerPage);

//     // Pagination handlers
//     const goToFirstPage = () => setCurrentPage(1);
//     const goToLastPage = () => setCurrentPage(totalPages);
//     const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
//     const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
//     const goToPage = (pageNumber) => setCurrentPage(pageNumber);

//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat('en-IN', {
//             style: 'currency',
//             currency: 'INR',
//             minimumFractionDigits: 0,
//             maximumFractionDigits: 0,
//         }).format(amount);
//     };

//     // Format date to DD-MM-YYYY
//     const formatDate = (dateString) => {
//         if (!dateString) return "N/A";
//         const date = new Date(dateString);
//         const day = String(date.getDate()).padStart(2, '0');
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const year = date.getFullYear();
//         return `${day}-${month}-${year}`;
//     };

//     // Get last 4 digits of account number
//     const getLastFourDigits = (accountNumber) => {
//         const accStr = accountNumber.toString();
//         return accStr.slice(-4);
//     };

//     // Get account icon based on type
//     const getAccountIcon = (accountType) => {
//         if (accountType?.toLowerCase().includes('savings')) {
//             return <FaWallet style={{ color: canaraBlue, fontSize: '16px' }} />;
//         } else if (accountType?.toLowerCase().includes('current')) {
//             return <FaCreditCard style={{ color: canaraGold, fontSize: '16px' }} />;
//         } else if (accountType?.toLowerCase().includes('salary')) {
//             return <FaBriefcase style={{ color: '#10B981', fontSize: '16px' }} />;
//         }
//         return <FaWallet style={{ color: canaraBlue, fontSize: '16px' }} />;
//     };

//     // Close dropdown when clicking outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (!event.target.closest('.custom-dropdown')) {
//                 setIsDropdownOpen(false);
//             }
//         };
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, []);

//     // Add CSS variables and enhanced animations
//     useEffect(() => {
//         const styleSheet = document.createElement("style");
//         styleSheet.textContent = `
//             :root {
//                 --canara-blue: #1E3A8A;
//                 --canara-gold: #F59E0B;
//                 --canara-light-blue: #EFF6FF;
//                 --canara-gray: #F3F4F6;
//                 --canara-border: #E5E7EB;
//                 --canara-text: #111827;
//                 --canara-text-light: #6B7280;
//                 --canara-success: #10B981;
//                 --canara-success-light: #D1FAE5;
//                 --canara-danger: #EF4444;
//                 --canara-danger-light: #FEE2E2;
//             }

//             @keyframes fadeIn {
//                 from { opacity: 0; }
//                 to { opacity: 1; }
//             }

//             @keyframes slideUp {
//                 from {
//                     opacity: 0;
//                     transform: translateY(20px);
//                 }
//                 to {
//                     opacity: 1;
//                     transform: translateY(0);
//                 }
//             }

//             @keyframes slideInRight {
//                 from {
//                     opacity: 0;
//                     transform: translateX(-20px);
//                 }
//                 to {
//                     opacity: 1;
//                     transform: translateX(0);
//                 }
//             }

//             @keyframes pulse {
//                 0%, 100% { transform: scale(1); }
//                 50% { transform: scale(1.05); }
//             }

//             @keyframes shimmer {
//                 0% { background-position: -1000px 0; }
//                 100% { background-position: 1000px 0; }
//             }

//             @keyframes float {
//                 0%, 100% { transform: translateY(0); }
//                 50% { transform: translateY(-5px); }
//             }

//             .transaction-row {
//                 transition: all 0.3s ease;
//                 animation: slideUp 0.4s ease;
//             }

//             .transaction-row:hover {
//                 background-color: var(--canara-light-blue) !important;
//                 transform: translateX(4px);
//                 box-shadow: 0 2px 8px rgba(30, 58, 138, 0.08);
//             }

//             .pagination-button {
//                 transition: all 0.3s ease;
//                 border: 1px solid var(--canara-border);
//                 background: white;
//                 color: var(--canara-text);
//                 font-weight: 500;
//                 cursor: pointer;
//             }

//             .pagination-button:hover:not(:disabled) {
//                 background: var(--canara-blue);
//                 color: white;
//                 border-color: var(--canara-blue);
//                 transform: translateY(-2px);
//                 box-shadow: 0 4px 12px rgba(30, 58, 138, 0.2);
//             }

//             .pagination-button.active {
//                 background: var(--canara-blue);
//                 color: white;
//                 border-color: var(--canara-blue);
//             }

//             .pagination-button:disabled {
//                 opacity: 0.5;
//                 cursor: not-allowed;
//             }

//             .type-badge {
//                 transition: all 0.3s ease;
//                 padding: 4px 12px;
//                 border-radius: 30px;
//                 font-size: 12px;
//                 font-weight: 600;
//                 display: inline-block;
//             }

//             .type-badge.deposit {
//                 background: var(--canara-success-light);
//                 color: var(--canara-success);
//                 border: 1px solid var(--canara-success);
//             }

//             .type-badge.withdrawal {
//                 background: var(--canara-danger-light);
//                 color: var(--canara-danger);
//                 border: 1px solid var(--canara-danger);
//             }

//             .type-badge:hover {
//                 transform: translateY(-2px);
//                 box-shadow: 0 2px 8px rgba(0,0,0,0.1);
//             }

//             /* Custom Dropdown Styles */
//             .custom-dropdown {
//                 position: relative;
//                 width: 380px;
//                 animation: slideInRight 0.4s ease;
//             }

//             .dropdown-selected {
//                 display: flex;
//                 align-items: center;
//                 justify-content: space-between;
//                 padding: 14px 20px;
//                 background: white;
//                 border: 2px solid var(--canara-border);
//                 border-radius: 12px;
//                 font-size: 15px;
//                 color: var(--canara-text);
//                 transition: all 0.3s ease;
//                 cursor: pointer;
//             }

//             .dropdown-selected:hover {
//                 border-color: var(--canara-blue);
//                 box-shadow: 0 4px 12px rgba(30, 58, 138, 0.1);
//             }

//             .dropdown-selected.open {
//                 border-color: var(--canara-blue);
//                 box-shadow: 0 4px 16px rgba(30, 58, 138, 0.15);
//             }

//             .selected-content {
//                 display: flex;
//                 align-items: center;
//                 gap: 12px;
//             }

//             .selected-icon {
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//                 width: 36px;
//                 height: 36px;
//                 background: var(--canara-light-blue);
//                 border-radius: 10px;
//                 transition: all 0.3s ease;
//             }

//             .dropdown-selected:hover .selected-icon {
//                 transform: scale(1.1);
//             }

//             .selected-text {
//                 font-weight: 600;
//             }

//             .selected-subtext {
//                 font-size: 13px;
//                 color: var(--canara-text-light);
//                 margin-left: 4px;
//                 font-family: 'Roboto Mono', monospace;
//             }

//             .dropdown-arrow {
//                 color: var(--canara-text-light);
//                 transition: transform 0.3s ease;
//             }

//             .dropdown-arrow.open {
//                 transform: rotate(180deg);
//                 color: var(--canara-blue);
//             }

//             .dropdown-menu {
//                 position: absolute;
//                 top: calc(100% + 8px);
//                 left: 0;
//                 right: 0;
//                 background: white;
//                 border: 1px solid var(--canara-border);
//                 border-radius: 12px;
//                 overflow: hidden;
//                 z-index: 1000;
//                 box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
//                 animation: slideUp 0.3s ease;
//                 max-height: 320px;
//                 overflow-y: auto;
//             }

//             .dropdown-menu::-webkit-scrollbar {
//                 width: 6px;
//             }

//             .dropdown-menu::-webkit-scrollbar-track {
//                 background: var(--canara-gray);
//             }

//             .dropdown-menu::-webkit-scrollbar-thumb {
//                 background: var(--canara-blue);
//                 border-radius: 20px;
//             }

//             .dropdown-item {
//                 display: flex;
//                 align-items: center;
//                 gap: 12px;
//                 padding: 14px 20px;
//                 transition: all 0.3s ease;
//                 border-bottom: 1px solid var(--canara-border);
//                 cursor: pointer;
//             }

//             .dropdown-item:last-child {
//                 border-bottom: none;
//             }

//             .dropdown-item:hover {
//                 background: var(--canara-light-blue);
//             }

//             .dropdown-item.selected {
//                 background: var(--canara-light-blue);
//                 border-left: 4px solid var(--canara-blue);
//             }

//             .item-icon {
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//                 width: 40px;
//                 height: 40px;
//                 background: white;
//                 border-radius: 10px;
//                 border: 1px solid var(--canara-border);
//                 transition: all 0.3s ease;
//             }

//             .dropdown-item:hover .item-icon {
//                 transform: scale(1.1);
//                 border-color: var(--canara-blue);
//             }

//             .item-details {
//                 flex: 1;
//                 display: flex;
//                 align-items: center;
//                 justify-content: space-between;
//             }

//             .item-type {
//                 font-weight: 600;
//                 color: var(--canara-text);
//                 font-size: 14px;
//             }

//             .item-number {
//                 font-size: 13px;
//                 color: var(--canara-text-light);
//                 font-family: 'Roboto Mono', monospace;
//                 background: var(--canara-gray);
//                 padding: 4px 10px;
//                 border-radius: 30px;
//             }

//             .dropdown-item:hover .item-number {
//                 background: white;
//                 color: var(--canara-blue);
//             }

//             /* Loading animations */
//             .shimmer {
//                 background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
//                 background-size: 1000px 100%;
//                 animation: shimmer 2s infinite;
//             }

//             /* Focus states */
//             *:focus-visible {
//                 outline: 2px solid var(--canara-blue);
//                 outline-offset: 2px;
//             }

//             /* Responsive */
//             @media (max-width: 768px) {
//                 .custom-dropdown {
//                     width: 100%;
//                 }
//             }
//         `;
//         document.head.appendChild(styleSheet);

//         return () => {
//             document.head.removeChild(styleSheet);
//         };
//     }, []);

//     const styles = {
//         container: {
//             padding: "32px",
//             maxWidth: "1400px",
//             margin: "0 auto",
//             fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
//             color: canaraText,
//             backgroundColor: "#F9FAFB",
//             minHeight: "100vh",
//         },
//         header: {
//             marginBottom: "32px",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             flexWrap: "wrap",
//             gap: "16px",
//         },
//         titleSection: {
//             display: "flex",
//             flexDirection: "column",
//             gap: "4px",
//         },
//         title: {
//             fontSize: "32px",
//             fontWeight: "700",
//             margin: 0,
//             color: canaraBlue,
//             letterSpacing: "-0.02em",
//         },
//         subtitle: {
//             fontSize: "15px",
//             color: canaraTextLight,
//             margin: 0,
//             fontWeight: "400",
//         },
//         transactionCount: {
//             padding: "10px 20px",
//             background: canaraBlue,
//             border: "none",
//             borderRadius: "40px",
//             fontSize: "14px",
//             color: "white",
//             fontWeight: "600",
//             boxShadow: "0 4px 12px rgba(30, 58, 138, 0.2)",
//             transition: "all 0.3s ease",
//             cursor: "default",
//             animation: "pulse 2s infinite",
//         },
//         accountSelectorContainer: {
//             marginBottom: "32px",
//         },
//         dropdownLabel: {
//             fontSize: "14px",
//             fontWeight: "600",
//             color: canaraText,
//             marginBottom: "8px",
//             display: "block",
//         },
//         tableWrapper: {
//             background: "white",
//             borderRadius: "20px",
//             border: `1px solid ${canaraBorder}`,
//             overflow: "hidden",
//             boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
//             marginBottom: "24px",
//         },
//         tableContainer: {
//             overflowX: "auto",
//         },
//         table: {
//             width: "100%",
//             borderCollapse: "collapse",
//             minWidth: "900px",
//         },
//         th: {
//             textAlign: "left",
//             padding: "20px 24px",
//             borderBottom: `2px solid ${canaraBorder}`,
//             color: canaraText,
//             fontSize: "13px",
//             fontWeight: "700",
//             textTransform: "uppercase",
//             letterSpacing: "0.5px",
//             backgroundColor: canaraGray,
//             position: "sticky",
//             top: 0,
//             zIndex: 10,
//         },
//         td: {
//             padding: "18px 24px",
//             fontSize: "14px",
//             color: canaraText,
//             verticalAlign: "middle",
//         },
//         serialNumber: {
//             fontWeight: "700",
//             color: canaraBlue,
//             fontFamily: "'Roboto Mono', monospace",
//             fontSize: "14px",
//             display: "inline-block",
//             padding: "4px 10px",
//             borderRadius: "30px",
//             background: canaraLightBlue,
//             minWidth: "45px",
//             textAlign: "center",
//         },
//         amount: {
//             fontWeight: "700",
//             fontSize: "15px",
//             fontFamily: "'Roboto Mono', monospace",
//         },
//         credit: {
//             color: "#10B981",
//         },
//         debit: {
//             color: "#EF4444",
//         },
//         balanceText: {
//             fontWeight: "700",
//             color: canaraText,
//             fontFamily: "'Roboto Mono', monospace",
//             fontSize: "15px",
//         },
//         dateText: {
//             color: canaraText,
//             fontWeight: "600",
//             fontSize: "14px",
//             fontFamily: "'Roboto Mono', monospace",
//         },
//         // Pagination styles
//         paginationContainer: {
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: "16px",
//             marginTop: "24px",
//             padding: "0 24px 24px 24px",
//         },
//         pagination: {
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//             flexWrap: "wrap",
//             justifyContent: "center",
//         },
//         pageButton: {
//             minWidth: "40px",
//             height: "40px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             padding: "0 12px",
//             backgroundColor: "white",
//             border: `1px solid ${canaraBorder}`,
//             borderRadius: "8px",
//             color: canaraText,
//             fontSize: "14px",
//             fontWeight: "600",
//             cursor: "pointer",
//             transition: "all 0.2s ease",
//         },
//         pageNavButton: {
//             padding: "0 16px",
//             height: "40px",
//             display: "flex",
//             alignItems: "center",
//             gap: "6px",
//             backgroundColor: "white",
//             border: `1px solid ${canaraBorder}`,
//             borderRadius: "8px",
//             color: canaraText,
//             fontSize: "14px",
//             fontWeight: "600",
//             cursor: "pointer",
//             transition: "all 0.2s ease",
//         },
//         paginationInfo: {
//             fontSize: "14px",
//             color: canaraTextLight,
//             textAlign: "center",
//         },
//         pageNumbers: {
//             display: "flex",
//             gap: "4px",
//         },
//         // Empty state
//         emptyState: {
//             padding: "60px 40px",
//             textAlign: "center",
//             color: canaraTextLight,
//             fontSize: "16px",
//             background: "white",
//             borderRadius: "20px",
//             border: `1px solid ${canaraBorder}`,
//         },
//         emptyStateIcon: {
//             fontSize: "48px",
//             marginBottom: "16px",
//             opacity: 0.5,
//         },
//         emptyStateTitle: {
//             fontSize: "18px",
//             fontWeight: "600",
//             color: canaraText,
//             margin: "0 0 8px 0",
//         },
//         emptyStateText: {
//             fontSize: "14px",
//             color: canaraTextLight,
//             margin: 0,
//         },
//         // Loading animation styles
//         loadingContainer: {
//             padding: "60px 24px",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: "24px",
//             minHeight: "500px",
//             background: "white",
//             borderRadius: "20px",
//         },
//         loadingLogo: {
//             fontSize: "32px",
//             fontWeight: "700",
//             color: canaraBlue,
//             marginBottom: "8px",
//             animation: "pulse 2s ease-in-out infinite",
//         },
//         loadingText: {
//             fontSize: "16px",
//             color: canaraTextLight,
//             marginBottom: "16px",
//         },
//         loadingSecure: {
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//             fontSize: "14px",
//             color: canaraBlue,
//             marginBottom: "24px",
//             animation: "float 3s ease-in-out infinite",
//         },
//         loadingDivider: {
//             width: "100%",
//             maxWidth: "300px",
//             height: "1px",
//             background: canaraBorder,
//             margin: "16px 0",
//         },
//         loadingMenuItem: {
//             width: "240px",
//             height: "20px",
//             background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
//             backgroundSize: "200% 100%",
//             borderRadius: "6px",
//             animation: "shimmer 1.5s infinite",
//             margin: "12px 0",
//         },
//         loadingFooter: {
//             display: "flex",
//             alignItems: "center",
//             gap: "16px",
//             marginTop: "24px",
//             flexWrap: "wrap",
//             justifyContent: "center",
//         },
//         loadingBadge: {
//             padding: "6px 16px",
//             background: canaraGray,
//             borderRadius: "30px",
//             fontSize: "13px",
//             color: canaraTextLight,
//             animation: "pulse 2s ease-in-out infinite",
//         }
//     };

//     // Calculate serial number for current page
//     const getSerialNumber = (index) => {
//         return indexOfFirstItem + index + 1;
//     };

//     return (
//         <div style={styles.container}>
//             {/* Bank Logo Bar */}
//             <div style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//                 marginBottom: "24px",
//                 padding: "12px 20px",
//                 background: "white",
//                 borderRadius: "12px",
//                 border: `1px solid ${canaraBorder}`,
//                 boxShadow: "0 2px 4px rgba(0, 0, 0, 0.02)",
//                 maxWidth: "fit-content"
//             }}>
//                 <div style={{
//                     display: "flex",
//                     alignItems: "center",
//                     background: canaraLightBlue,
//                     padding: "6px",
//                     borderRadius: "8px"
//                 }}>
//                     <FaWallet size={16} color={canaraBlue} />
//                 </div>
//                 <span style={{
//                     fontSize: "18px",
//                     fontWeight: "700",
//                     color: canaraBlue,
//                     letterSpacing: "0.5px"
//                 }}>ABC BANK</span>
//             </div>

//             <div style={styles.header}>
//                 <div style={styles.titleSection}>
//                     <h1 style={styles.title}>Transactions</h1>
//                     <p style={styles.subtitle}>View and manage your financial activity</p>
//                 </div>
//                 {!loading && !loadingAccounts && transactions.length > 0 && (
//                     <div style={styles.transactionCount} className="transaction-count">
//                         {transactions.length} Transactions
//                     </div>
//                 )}
//             </div>

//             {/* Stylish Custom Dropdown */}
//             <div style={styles.accountSelectorContainer}>
//                 <span style={styles.dropdownLabel}>Select Account</span>
//                 <div className="custom-dropdown">
//                     <div 
//                         className={`dropdown-selected ${isDropdownOpen ? 'open' : ''}`}
//                         onClick={() => !loadingAccounts && setIsDropdownOpen(!isDropdownOpen)}
//                     >
//                         <div className="selected-content">
//                             <div className="selected-icon">
//                                 {selectedAccount ? getAccountIcon(selectedAccount.accountTypeName) : <FaWallet />}
//                             </div>
//                             {selectedAccount ? (
//                                 <span className="selected-text">
//                                     {selectedAccount.accountTypeName}
//                                     <span className="selected-subtext">
//                                         •••• {getLastFourDigits(selectedAccount.accountNumber)}
//                                     </span>
//                                 </span>
//                             ) : (
//                                 <span className="selected-text">Choose an account</span>
//                             )}
//                         </div>
//                         <FaChevronDown className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`} />
//                     </div>

//                     {isDropdownOpen && (
//                         <div className="dropdown-menu">
//                             {accounts.map((account) => (
//                                 <div
//                                     key={account.accountNumber}
//                                     className={`dropdown-item ${selectedAccount?.accountNumber === account.accountNumber ? 'selected' : ''}`}
//                                     onClick={() => {
//                                         setSelectedAccount(account);
//                                         setIsDropdownOpen(false);
//                                     }}
//                                 >
//                                     <div className="item-icon">
//                                         {getAccountIcon(account.accountTypeName)}
//                                     </div>
//                                     <div className="item-details">
//                                         <span className="item-type">{account.accountTypeName}</span>
//                                         <span className="item-number">•••• {getLastFourDigits(account.accountNumber)}</span>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Transactions Table */}
//             <div style={styles.tableWrapper}>
//                 {loadingAccounts ? (
//                     <div style={styles.loadingContainer}>
//                         <div style={styles.loadingLogo}>ABC BANK</div>
//                         <div style={styles.loadingText}>Loading your accounts</div>
//                         <div style={styles.loadingSecure}>
//                             <FaShieldAlt size={14} /> Secure Connection
//                         </div>
//                         <div style={styles.loadingDivider}></div>
//                         <div style={{ width: "100%", maxWidth: "320px" }}>
//                             <div style={styles.loadingMenuItem}></div>
//                             <div style={styles.loadingMenuItem}></div>
//                             <div style={styles.loadingMenuItem}></div>
//                             <div style={styles.loadingMenuItem}></div>
//                             <div style={styles.loadingMenuItem}></div>
//                         </div>
//                         <div style={styles.loadingFooter}>
//                             <span style={styles.loadingBadge}>
//                                 <FaClock style={{ marginRight: "4px" }} /> Real-time
//                             </span>
//                         </div>
//                     </div>
//                 ) : loading ? (
//                     <div style={styles.loadingContainer}>
//                         <div style={styles.loadingLogo}>ABC BANK</div>
//                         <div style={styles.loadingText}>Loading your transactions</div>
//                         <div style={styles.loadingSecure}>
//                             <FaShieldAlt size={14} /> Secure Connection
//                         </div>
//                         <div style={styles.loadingDivider}></div>
//                         <div style={{ width: "100%", maxWidth: "320px" }}>
//                             <div style={styles.loadingMenuItem}></div>
//                             <div style={styles.loadingMenuItem}></div>
//                             <div style={styles.loadingMenuItem}></div>
//                             <div style={styles.loadingMenuItem}></div>
//                             <div style={styles.loadingMenuItem}></div>
//                         </div>
//                         <div style={styles.loadingFooter}>
//                             <span style={styles.loadingBadge}>
//                                 <FaClock style={{ marginRight: "4px" }} /> Real-time
//                             </span>
//                         </div>
//                     </div>
//                 ) : !selectedAccount ? (
//                     <div style={styles.emptyState}>
//                         <div style={styles.emptyStateIcon}>🏦</div>
//                         <h3 style={styles.emptyStateTitle}>Select an Account</h3>
//                         <p style={styles.emptyStateText}>
//                             Please select an account to view transactions
//                         </p>
//                     </div>
//                 ) : transactions.length === 0 ? (
//                     <div style={styles.emptyState}>
//                         <div style={styles.emptyStateIcon}>📊</div>
//                         <h3 style={styles.emptyStateTitle}>No Transactions Found</h3>
//                         <p style={styles.emptyStateText}>
//                             No transactions available for this account
//                         </p>
//                     </div>
//                 ) : (
//                     <>
//                         <div style={styles.tableContainer}>
//                             <table style={styles.table}>
//                                 <thead>
//                                     <tr>
//                                         <th style={styles.th}>S.No.</th>
//                                         <th style={styles.th}>Date & Time</th>
//                                         <th style={styles.th}>Type</th>
//                                         <th style={styles.th}>Amount</th>
//                                         <th style={styles.th}>Balance</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {currentTransactions.map((trx, index) => {
//                                         const isCredit = trx.transactionType === "DEPOSIT";
//                                         const isDebit = trx.transactionType === "WITHDRAWAL" || trx.transactionType === "CREDITED";
//                                         const rowStyle = index % 2 === 0 ? { backgroundColor: "white" } : { backgroundColor: canaraGray };
//                                         const serialNumber = getSerialNumber(index);
                                        
//                                         return (
//                                             <tr 
//                                                 key={trx.transactionId || index} 
//                                                 style={{ ...styles.tr, ...rowStyle }}
//                                                 className="transaction-row"
//                                             >
//                                                 <td style={styles.td}>
//                                                     <span style={styles.serialNumber} className="serial-number">{serialNumber}</span>
//                                                 </td>
//                                                 <td style={styles.td}>
//                                                     <span style={styles.dateText} className="date-text">
//                                                         {formatDate(trx.dateOfTransaction)}
//                                                     </span>
//                                                 </td>
//                                                 <td style={styles.td}>
//                                                     <span 
//                                                         className={`type-badge ${isCredit ? 'deposit' : isDebit ? 'withdrawal' : ''}`}
//                                                     >
//                                                         {isCredit ? "DEPOSIT" : isDebit ? "WITHDRAWAL" : trx.transactionType || "TRANSACTION"}
//                                                     </span>
//                                                 </td>
//                                                 <td style={styles.td}>
//                                                     <span style={{
//                                                         ...styles.amount,
//                                                         ...(isCredit ? styles.credit : styles.debit)
//                                                     }}>
//                                                         {isCredit ? '+' : '-'}
//                                                         {trx.transactionedAmount ? formatCurrency(trx.transactionedAmount) : "₹0"}
//                                                     </span>
//                                                 </td>
//                                                 <td style={styles.td}>
//                                                     <span style={styles.balanceText}>
//                                                         {trx.closingBalance ? formatCurrency(trx.closingBalance) : "N/A"}
//                                                     </span>
//                                                 </td>
//                                             </tr>
//                                         );
//                                     })}
//                                 </tbody>
//                             </table>
//                         </div>

//                         {/* Pagination */}
//                         {totalPages > 1 && (
//                             <div style={styles.paginationContainer}>
//                                 <div style={styles.pagination}>
//                                     <button
//                                         onClick={goToFirstPage}
//                                         disabled={currentPage === 1}
//                                         style={styles.pageNavButton}
//                                         className="pagination-button"
//                                     >
//                                         <FaAngleDoubleLeft size={14} />
//                                         <span>First</span>
//                                     </button>
//                                     <button
//                                         onClick={goToPreviousPage}
//                                         disabled={currentPage === 1}
//                                         style={styles.pageNavButton}
//                                         className="pagination-button"
//                                     >
//                                         <FaChevronLeft size={12} />
//                                         <span>Prev</span>
//                                     </button>

//                                     <div style={styles.pageNumbers}>
//                                         {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                                             let pageNum;
//                                             if (totalPages <= 5) {
//                                                 pageNum = i + 1;
//                                             } else if (currentPage <= 3) {
//                                                 pageNum = i + 1;
//                                             } else if (currentPage >= totalPages - 2) {
//                                                 pageNum = totalPages - 4 + i;
//                                             } else {
//                                                 pageNum = currentPage - 2 + i;
//                                             }
                                            
//                                             return (
//                                                 <button
//                                                     key={pageNum}
//                                                     onClick={() => goToPage(pageNum)}
//                                                     style={{
//                                                         ...styles.pageButton,
//                                                         ...(currentPage === pageNum ? { 
//                                                             background: canaraBlue,
//                                                             borderColor: canaraBlue,
//                                                             color: "white"
//                                                         } : {})
//                                                     }}
//                                                     className={`pagination-button ${currentPage === pageNum ? 'active' : ''}`}
//                                                 >
//                                                     {pageNum}
//                                                 </button>
//                                             );
//                                         })}
//                                     </div>

//                                     <button
//                                         onClick={goToNextPage}
//                                         disabled={currentPage === totalPages}
//                                         style={styles.pageNavButton}
//                                         className="pagination-button"
//                                     >
//                                         <span>Next</span>
//                                         <FaChevronRight size={12} />
//                                     </button>
//                                     <button
//                                         onClick={goToLastPage}
//                                         disabled={currentPage === totalPages}
//                                         style={styles.pageNavButton}
//                                         className="pagination-button"
//                                     >
//                                         <span>Last</span>
//                                         <FaAngleDoubleRight size={14} />
//                                     </button>
//                                 </div>

//                                 <div style={styles.paginationInfo}>
//                                     Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, transactions.length)} of {transactions.length} transactions
//                                 </div>
//                             </div>
//                         )}
//                     </>
//                 )}
//             </div>

//         </div>
//     );
// };

// export default Transactions;
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
    FaClock
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

    // Canara Bank color scheme - defined at the top of component
    const canaraBlue = "#1E3A8A";
    const canaraGold = "#F59E0B";
    const canaraLightBlue = "#EFF6FF";
    const canaraGray = "#F3F4F6";
    const canaraText = "#111827";
    const canaraTextLight = "#6B7280";
    const canaraBorder = "#E5E7EB";

    // Fetch all user accounts on component mount
    useEffect(() => {
        const fetchUserAccounts = async () => {
            setLoadingAccounts(true);
            try {
                // Using the user ID 2 as per your API endpoint
                const response = await API.get("account/userAccounts/2");
                console.log("User accounts response:", response.data);
                
                if (response.data && response.data.status === true && Array.isArray(response.data.data)) {
                    const userAccounts = response.data.data;
                    setAccounts(userAccounts);
                    
                    // Set default selected account if available
                    if (userAccounts.length > 0) {
                        setSelectedAccount(userAccounts[0]);
                    }
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
                console.log(`Fetching transactions for Account: ${accountNumber}`);
                
                const response = await API.get(`account/transactions/${accountNumber}`);
                console.log(`Transactions fetched:`, response.data);
                
                const txData = response.data && Array.isArray(response.data.data) ? response.data.data : [];
                setTransactions(txData);
                setCurrentPage(1); // Reset to first page on new data
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

    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(transactions.length / itemsPerPage);

    // Pagination handlers
    const goToFirstPage = () => setCurrentPage(1);
    const goToLastPage = () => setCurrentPage(totalPages);
    const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const goToPage = (pageNumber) => setCurrentPage(pageNumber);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // Format date to DD-MM-YYYY
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Get last 4 digits of account number
    const getLastFourDigits = (accountNumber) => {
        const accStr = accountNumber.toString();
        return accStr.slice(-4);
    };

    // Get account icon based on type
    const getAccountIcon = (accountType) => {
        if (accountType?.toLowerCase().includes('savings')) {
            return <FaWallet style={{ color: canaraBlue, fontSize: '16px' }} />;
        } else if (accountType?.toLowerCase().includes('current')) {
            return <FaCreditCard style={{ color: canaraGold, fontSize: '16px' }} />;
        } else if (accountType?.toLowerCase().includes('salary')) {
            return <FaBriefcase style={{ color: '#10B981', fontSize: '16px' }} />;
        }
        return <FaWallet style={{ color: canaraBlue, fontSize: '16px' }} />;
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.custom-dropdown')) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Add CSS variables and enhanced animations
    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.textContent = `
            :root {
                --canara-blue: #1E3A8A;
                --canara-gold: #F59E0B;
                --canara-light-blue: #EFF6FF;
                --canara-gray: #F3F4F6;
                --canara-border: #E5E7EB;
                --canara-text: #111827;
                --canara-text-light: #6B7280;
                --canara-success: #10B981;
                --canara-success-light: #D1FAE5;
                --canara-danger: #EF4444;
                --canara-danger-light: #FEE2E2;
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }

            @keyframes shimmer {
                0% { background-position: -1000px 0; }
                100% { background-position: 1000px 0; }
            }

            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
            }

            .transaction-row {
                transition: all 0.3s ease;
                animation: slideUp 0.4s ease;
            }

            .transaction-row:hover {
                background-color: var(--canara-light-blue) !important;
                transform: translateX(4px);
                box-shadow: 0 2px 8px rgba(30, 58, 138, 0.08);
            }

            .pagination-button {
                transition: all 0.3s ease;
                border: 1px solid var(--canara-border);
                background: white;
                color: var(--canara-text);
                font-weight: 500;
                cursor: pointer;
            }

            .pagination-button:hover:not(:disabled) {
                background: var(--canara-blue);
                color: white;
                border-color: var(--canara-blue);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(30, 58, 138, 0.2);
            }

            .pagination-button.active {
                background: var(--canara-blue);
                color: white;
                border-color: var(--canara-blue);
            }

            .pagination-button:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            .type-badge {
                transition: all 0.3s ease;
                padding: 4px 12px;
                border-radius: 30px;
                font-size: 12px;
                font-weight: 600;
                display: inline-block;
            }

            .type-badge.deposit {
                background: var(--canara-success-light);
                color: var(--canara-success);
                border: 1px solid var(--canara-success);
            }

            .type-badge.withdrawal {
                background: var(--canara-danger-light);
                color: var(--canara-danger);
                border: 1px solid var(--canara-danger);
            }

            .type-badge:hover {
                transform: translateY(-2px);
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }

            /* Custom Dropdown Styles */
            .custom-dropdown {
                position: relative;
                width: 380px;
                animation: slideInRight 0.4s ease;
            }

            .dropdown-selected {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 14px 20px;
                background: white;
                border: 2px solid var(--canara-border);
                border-radius: 12px;
                font-size: 15px;
                color: var(--canara-text);
                transition: all 0.3s ease;
                cursor: pointer;
            }

            .dropdown-selected:hover {
                border-color: var(--canara-blue);
                box-shadow: 0 4px 12px rgba(30, 58, 138, 0.1);
            }

            .dropdown-selected.open {
                border-color: var(--canara-blue);
                box-shadow: 0 4px 16px rgba(30, 58, 138, 0.15);
            }

            .selected-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .selected-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 36px;
                height: 36px;
                background: var(--canara-light-blue);
                border-radius: 10px;
                transition: all 0.3s ease;
            }

            .dropdown-selected:hover .selected-icon {
                transform: scale(1.1);
            }

            .selected-text {
                font-weight: 600;
            }

            .selected-subtext {
                font-size: 13px;
                color: var(--canara-text-light);
                margin-left: 4px;
                font-family: 'Roboto Mono', monospace;
            }

            .dropdown-arrow {
                color: var(--canara-text-light);
                transition: transform 0.3s ease;
            }

            .dropdown-arrow.open {
                transform: rotate(180deg);
                color: var(--canara-blue);
            }

            .dropdown-menu {
                position: absolute;
                top: calc(100% + 8px);
                left: 0;
                right: 0;
                background: white;
                border: 1px solid var(--canara-border);
                border-radius: 12px;
                overflow: hidden;
                z-index: 1000;
                box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
                animation: slideUp 0.3s ease;
                max-height: 320px;
                overflow-y: auto;
            }

            .dropdown-menu::-webkit-scrollbar {
                width: 6px;
            }

            .dropdown-menu::-webkit-scrollbar-track {
                background: var(--canara-gray);
            }

            .dropdown-menu::-webkit-scrollbar-thumb {
                background: var(--canara-blue);
                border-radius: 20px;
            }

            .dropdown-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 14px 20px;
                transition: all 0.3s ease;
                border-bottom: 1px solid var(--canara-border);
                cursor: pointer;
            }

            .dropdown-item:last-child {
                border-bottom: none;
            }

            .dropdown-item:hover {
                background: var(--canara-light-blue);
            }

            .dropdown-item.selected {
                background: var(--canara-light-blue);
                border-left: 4px solid var(--canara-blue);
            }

            .item-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                background: white;
                border-radius: 10px;
                border: 1px solid var(--canara-border);
                transition: all 0.3s ease;
            }

            .dropdown-item:hover .item-icon {
                transform: scale(1.1);
                border-color: var(--canara-blue);
            }

            .item-details {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .item-type {
                font-weight: 600;
                color: var(--canara-text);
                font-size: 14px;
            }

            .item-number {
                font-size: 13px;
                color: var(--canara-text-light);
                font-family: 'Roboto Mono', monospace;
                background: var(--canara-gray);
                padding: 4px 10px;
                border-radius: 30px;
            }

            .dropdown-item:hover .item-number {
                background: white;
                color: var(--canara-blue);
            }

            /* Loading animations */
            .shimmer {
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 1000px 100%;
                animation: shimmer 2s infinite;
            }

            /* Focus states */
            *:focus-visible {
                outline: 2px solid var(--canara-blue);
                outline-offset: 2px;
            }

            /* Responsive */
            @media (max-width: 768px) {
                .custom-dropdown {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(styleSheet);

        return () => {
            document.head.removeChild(styleSheet);
        };
    }, []);

    const styles = {
        container: {
            padding: "32px",
            maxWidth: "1400px",
            margin: "0 auto",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            color: canaraText,
            backgroundColor: "#F9FAFB",
            minHeight: "100vh",
        },
        header: {
            marginBottom: "32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
        },
        titleSection: {
            display: "flex",
            flexDirection: "column",
            gap: "4px",
        },
        title: {
            fontSize: "32px",
            fontWeight: "700",
            margin: 0,
            color: canaraBlue,
            letterSpacing: "-0.02em",
        },
        subtitle: {
            fontSize: "15px",
            color: canaraTextLight,
            margin: 0,
            fontWeight: "400",
        },
        transactionCount: {
            padding: "10px 20px",
            background: canaraBlue,
            border: "none",
            borderRadius: "40px",
            fontSize: "14px",
            color: "white",
            fontWeight: "600",
            boxShadow: "0 4px 12px rgba(30, 58, 138, 0.2)",
            transition: "all 0.3s ease",
            cursor: "default",
            animation: "pulse 2s infinite",
        },
        accountSelectorContainer: {
            marginBottom: "32px",
        },
        dropdownLabel: {
            fontSize: "14px",
            fontWeight: "600",
            color: canaraText,
            marginBottom: "8px",
            display: "block",
        },
        tableWrapper: {
            background: "white",
            borderRadius: "20px",
            border: `1px solid ${canaraBorder}`,
            overflow: "hidden",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            marginBottom: "24px",
        },
        tableContainer: {
            overflowX: "auto",
        },
        table: {
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "900px",
        },
        th: {
            textAlign: "left",
            padding: "20px 24px",
            borderBottom: `2px solid ${canaraBorder}`,
            color: canaraText,
            fontSize: "13px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            backgroundColor: canaraGray,
            position: "sticky",
            top: 0,
            zIndex: 10,
        },
        td: {
            padding: "18px 24px",
            fontSize: "14px",
            color: canaraText,
            verticalAlign: "middle",
        },
        serialNumber: {
            fontWeight: "700",
            color: canaraBlue,
            fontFamily: "'Roboto Mono', monospace",
            fontSize: "14px",
            display: "inline-block",
            padding: "4px 10px",
            borderRadius: "30px",
            background: canaraLightBlue,
            minWidth: "45px",
            textAlign: "center",
        },
        amount: {
            fontWeight: "700",
            fontSize: "15px",
            fontFamily: "'Roboto Mono', monospace",
        },
        credit: {
            color: "#10B981",
        },
        debit: {
            color: "#EF4444",
        },
        balanceText: {
            fontWeight: "700",
            color: canaraText,
            fontFamily: "'Roboto Mono', monospace",
            fontSize: "15px",
        },
        dateText: {
            color: canaraText,
            fontWeight: "600",
            fontSize: "14px",
            fontFamily: "'Roboto Mono', monospace",
        },
        // Pagination styles
        paginationContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            marginTop: "24px",
            padding: "0 24px 24px 24px",
        },
        pagination: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
            justifyContent: "center",
        },
        pageButton: {
            minWidth: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 12px",
            backgroundColor: "white",
            border: `1px solid ${canaraBorder}`,
            borderRadius: "8px",
            color: canaraText,
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s ease",
        },
        pageNavButton: {
            padding: "0 16px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "white",
            border: `1px solid ${canaraBorder}`,
            borderRadius: "8px",
            color: canaraText,
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s ease",
        },
        paginationInfo: {
            fontSize: "14px",
            color: canaraTextLight,
            textAlign: "center",
        },
        pageNumbers: {
            display: "flex",
            gap: "4px",
        },
        // Empty state
        emptyState: {
            padding: "60px 40px",
            textAlign: "center",
            color: canaraTextLight,
            fontSize: "16px",
            background: "white",
            borderRadius: "20px",
            border: `1px solid ${canaraBorder}`,
        },
        emptyStateIcon: {
            fontSize: "48px",
            marginBottom: "16px",
            opacity: 0.5,
        },
        emptyStateTitle: {
            fontSize: "18px",
            fontWeight: "600",
            color: canaraText,
            margin: "0 0 8px 0",
        },
        emptyStateText: {
            fontSize: "14px",
            color: canaraTextLight,
            margin: 0,
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
            background: "white",
            borderRadius: "20px",
        },
        loadingLogo: {
            fontSize: "32px",
            fontWeight: "700",
            color: canaraBlue,
            marginBottom: "8px",
            animation: "pulse 2s ease-in-out infinite",
        },
        loadingText: {
            fontSize: "16px",
            color: canaraTextLight,
            marginBottom: "16px",
        },
        loadingSecure: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            color: canaraBlue,
            marginBottom: "24px",
            animation: "float 3s ease-in-out infinite",
        },
        loadingDivider: {
            width: "100%",
            maxWidth: "300px",
            height: "1px",
            background: canaraBorder,
            margin: "16px 0",
        },
        loadingMenuItem: {
            width: "240px",
            height: "20px",
            background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
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
            background: canaraGray,
            borderRadius: "30px",
            fontSize: "13px",
            color: canaraTextLight,
            animation: "pulse 2s ease-in-out infinite",
        }
    };

    // Calculate serial number for current page
    const getSerialNumber = (index) => {
        return indexOfFirstItem + index + 1;
    };

    return (
        <div style={styles.container}>
            {/* Bank Logo Bar */}
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "24px",
                padding: "12px 20px",
                background: "white",
                borderRadius: "12px",
                border: `1px solid ${canaraBorder}`,
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.02)",
                maxWidth: "fit-content"
            }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    background: canaraLightBlue,
                    padding: "6px",
                    borderRadius: "8px"
                }}>
                    <FaWallet size={16} color={canaraBlue} />
                </div>
                <span style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: canaraBlue,
                    letterSpacing: "0.5px"
                }}>ABC BANK</span>
            </div>

            <div style={styles.header}>
                <div style={styles.titleSection}>
                    <h1 style={styles.title}>Transactions</h1>
                    <p style={styles.subtitle}>View and manage your financial activity</p>
                </div>
                {!loading && !loadingAccounts && transactions.length > 0 && (
                    <div style={styles.transactionCount} className="transaction-count">
                        {transactions.length} Transactions
                    </div>
                )}
            </div>

            {/* Stylish Custom Dropdown */}
            <div style={styles.accountSelectorContainer}>
                <span style={styles.dropdownLabel}>Select Account</span>
                <div className="custom-dropdown">
                    <div 
                        className={`dropdown-selected ${isDropdownOpen ? 'open' : ''}`}
                        onClick={() => !loadingAccounts && setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <div className="selected-content">
                            <div className="selected-icon">
                                {selectedAccount ? getAccountIcon(selectedAccount.accountTypeName) : <FaWallet />}
                            </div>
                            {selectedAccount ? (
                                <span className="selected-text">
                                    {selectedAccount.accountTypeName}
                                    <span className="selected-subtext">
                                        •••• {getLastFourDigits(selectedAccount.accountNumber)}
                                    </span>
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
                                    onClick={() => {
                                        setSelectedAccount(account);
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    <div className="item-icon">
                                        {getAccountIcon(account.accountTypeName)}
                                    </div>
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

            {/* Transactions Table */}
            <div style={styles.tableWrapper}>
                {loadingAccounts ? (
                    <div style={styles.loadingContainer}>
                        <div style={styles.loadingLogo}>ABC BANK</div>
                        <div style={styles.loadingText}>Loading your accounts</div>
                        <div style={styles.loadingSecure}>
                            <FaShieldAlt size={14} /> Secure Connection
                        </div>
                        <div style={styles.loadingDivider}></div>
                        <div style={{ width: "100%", maxWidth: "320px" }}>
                            <div style={styles.loadingMenuItem}></div>
                            <div style={styles.loadingMenuItem}></div>
                            <div style={styles.loadingMenuItem}></div>
                            <div style={styles.loadingMenuItem}></div>
                            <div style={styles.loadingMenuItem}></div>
                        </div>
                        <div style={styles.loadingFooter}>
                            <span style={styles.loadingBadge}>
                                <FaClock style={{ marginRight: "4px" }} /> Real-time
                            </span>
                        </div>
                    </div>
                ) : loading ? (
                    <div style={styles.loadingContainer}>
                        <div style={styles.loadingLogo}>ABC BANK</div>
                        <div style={styles.loadingText}>Loading your transactions</div>
                        <div style={styles.loadingSecure}>
                            <FaShieldAlt size={14} /> Secure Connection
                        </div>
                        <div style={styles.loadingDivider}></div>
                        <div style={{ width: "100%", maxWidth: "320px" }}>
                            <div style={styles.loadingMenuItem}></div>
                            <div style={styles.loadingMenuItem}></div>
                            <div style={styles.loadingMenuItem}></div>
                            <div style={styles.loadingMenuItem}></div>
                            <div style={styles.loadingMenuItem}></div>
                        </div>
                        <div style={styles.loadingFooter}>
                            <span style={styles.loadingBadge}>
                                <FaClock style={{ marginRight: "4px" }} /> Real-time
                            </span>
                        </div>
                    </div>
                ) : !selectedAccount ? (
                    <div style={styles.emptyState}>
                        <div style={styles.emptyStateIcon}>🏦</div>
                        <h3 style={styles.emptyStateTitle}>Select an Account</h3>
                        <p style={styles.emptyStateText}>
                            Please select an account to view transactions
                        </p>
                    </div>
                ) : transactions.length === 0 ? (
                    <div style={styles.emptyState}>
                        <div style={styles.emptyStateIcon}>📊</div>
                        <h3 style={styles.emptyStateTitle}>No Transactions Found</h3>
                        <p style={styles.emptyStateText}>
                            No transactions available for this account
                        </p>
                    </div>
                ) : (
                    <>
                        <div style={styles.tableContainer}>
                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        <th style={styles.th}>S.No.</th>
                                        <th style={styles.th}>Date & Time</th>
                                        <th style={styles.th}>Type</th>
                                        <th style={styles.th}>Amount</th>
                                        <th style={styles.th}>Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentTransactions.map((trx, index) => {
                                        const isCredit = trx.transactionType === "DEPOSIT";
                                        const isDebit = trx.transactionType === "WITHDRAWAL" || trx.transactionType === "CREDITED";
                                        const rowStyle = index % 2 === 0 ? { backgroundColor: "white" } : { backgroundColor: canaraGray };
                                        const serialNumber = getSerialNumber(index);
                                        
                                        return (
                                            <tr 
                                                key={trx.transactionId || index} 
                                                style={{ ...styles.tr, ...rowStyle }}
                                                className="transaction-row"
                                            >
                                                <td style={styles.td}>
                                                    <span style={styles.serialNumber} className="serial-number">{serialNumber}</span>
                                                </td>
                                                <td style={styles.td}>
                                                    <span style={styles.dateText} className="date-text">
                                                        {formatDate(trx.dateOfTransaction)}
                                                    </span>
                                                </td>
                                                <td style={styles.td}>
                                                    <span 
                                                        className={`type-badge ${isCredit ? 'deposit' : isDebit ? 'withdrawal' : ''}`}
                                                    >
                                                        {isCredit ? "DEPOSIT" : isDebit ? "WITHDRAWAL" : trx.transactionType || "TRANSACTION"}
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
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div style={styles.paginationContainer}>
                                <div style={styles.pagination}>
                                    <button
                                        onClick={goToFirstPage}
                                        disabled={currentPage === 1}
                                        style={styles.pageNavButton}
                                        className="pagination-button"
                                    >
                                        <FaAngleDoubleLeft size={14} />
                                        <span>First</span>
                                    </button>
                                    <button
                                        onClick={goToPreviousPage}
                                        disabled={currentPage === 1}
                                        style={styles.pageNavButton}
                                        className="pagination-button"
                                    >
                                        <FaChevronLeft size={12} />
                                        <span>Prev</span>
                                    </button>

                                    <div style={styles.pageNumbers}>
                                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                            let pageNum;
                                            if (totalPages <= 5) {
                                                pageNum = i + 1;
                                            } else if (currentPage <= 3) {
                                                pageNum = i + 1;
                                            } else if (currentPage >= totalPages - 2) {
                                                pageNum = totalPages - 4 + i;
                                            } else {
                                                pageNum = currentPage - 2 + i;
                                            }
                                            
                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => goToPage(pageNum)}
                                                    style={{
                                                        ...styles.pageButton,
                                                        ...(currentPage === pageNum ? { 
                                                            background: canaraBlue,
                                                            borderColor: canaraBlue,
                                                            color: "white"
                                                        } : {})
                                                    }}
                                                    className={`pagination-button ${currentPage === pageNum ? 'active' : ''}`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <button
                                        onClick={goToNextPage}
                                        disabled={currentPage === totalPages}
                                        style={styles.pageNavButton}
                                        className="pagination-button"
                                    >
                                        <span>Next</span>
                                        <FaChevronRight size={12} />
                                    </button>
                                    <button
                                        onClick={goToLastPage}
                                        disabled={currentPage === totalPages}
                                        style={styles.pageNavButton}
                                        className="pagination-button"
                                    >
                                        <span>Last</span>
                                        <FaAngleDoubleRight size={14} />
                                    </button>
                                </div>

                                <div style={styles.paginationInfo}>
                                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, transactions.length)} of {transactions.length} transactions
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