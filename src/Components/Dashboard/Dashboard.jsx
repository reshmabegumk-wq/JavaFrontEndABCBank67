
// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import {
//     FaUser,
//     FaCreditCard,
//     FaBook,
//     FaBell,
//     FaEye,
//     FaEyeSlash,
//     FaCopy,
//     FaArrowUp,
//     FaArrowDown,
//     FaArrowRight,
//     FaExchangeAlt,
//     FaFileInvoiceDollar,
//     FaShieldAlt,
//     FaMobileAlt,
//     FaClock,
//     FaCheckCircle,
//     FaPlus,
//     FaCog,
//     FaChartPie,
//     FaWallet,
//     FaUniversity,
//     FaRupeeSign,
//     FaCity,
//     FaCalendarAlt,
//     FaMapMarkerAlt,
//     FaCcVisa,
//     FaCcMastercard,
//     FaGooglePay,
//     FaApplePay,
//     FaLandmark,
//     FaBuilding,
//     FaBriefcase,
//     FaRegCircle,
//     FaRegCreditCard,
//     FaLock,
//     FaUnlock,
//     FaSync,
//     FaHome,
//     FaUserCircle
// } from "react-icons/fa";
// import API from "../../api";
// import { useSnackbar } from "../../Context/SnackbarContext";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//     const { showSnackbar } = useSnackbar();
//     const [showBalance, setShowBalance] = useState(true);
//     const [selectedAccount, setSelectedAccount] = useState(0);
//     const [cardFilter, setCardFilter] = useState("active");
//     const [accountFilter, setAccountFilter] = useState("active");
    
//     const [transactions, setTransactions] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [userData, setUserData] = useState(null);
//     const [userLoading, setUserLoading] = useState(true);
//     const [cards, setCards] = useState([]);
//     const [cardsLoading, setCardsLoading] = useState(false);
//     const [refreshing, setRefreshing] = useState(false);

//     const navigate = useNavigate();

//     // Memoized user ID
//     const userId = useMemo(() => localStorage.getItem("userId"), []);

//     // Optimized data fetching with caching
//     const fetchUserData = useCallback(async (showRefresh = false) => {
//         if (showRefresh) setRefreshing(true);
//         try {
//             if (userId) {
//                 const response = await API.get(`users/${userId}`);
//                 setUserData(response.data);
//                 if (response.data?.data?.accounts) {
//                     const accounts = response.data.data.accounts;
//                     accounts.forEach((acc, index) => {
//                         if (index === 0) {
//                             localStorage.setItem("savingsAccount", acc.accountNumber);
//                         } else if (index === 1) {
//                             localStorage.setItem("currentAccount", acc.accountNumber);
//                         } else if (index === 2) {
//                             localStorage.setItem("salaryAccount", acc.accountNumber);
//                         }
//                     });
//                 }
//             }
//         } catch (error) {
//             console.error("Error fetching user data:", error);
//             showSnackbar("error", "Failed to load user profile");
//         } finally {
//             setUserLoading(false);
//             if (showRefresh) setRefreshing(false);
//         }
//     }, [userId, showSnackbar]);

//     useEffect(() => {
//         fetchUserData();
//     }, [fetchUserData]);

//     // Filter accounts based on status
//     const filteredAccounts = useMemo(() => {
//         if (!userData?.data?.accounts) return [];
//         const accounts = userData.data.accounts;
//         if (accountFilter === "active") {
//             return accounts.filter(acc => acc.status?.toLowerCase() === "active");
//         }
//         return accounts.filter(acc => acc.status?.toLowerCase() !== "active");
//     }, [userData, accountFilter]);

//     // Auto-select first account when filter changes
//     useEffect(() => {
//         if (filteredAccounts.length > 0) {
//             setSelectedAccount(0);
//         }
//     }, [accountFilter, filteredAccounts.length]);

//     const fetchCards = useCallback(async () => {
//         if (filteredAccounts.length > 0 && filteredAccounts[selectedAccount]) {
//             setCardsLoading(true);
//             setCards([]);
//             try {
//                 const accountId = filteredAccounts[selectedAccount]?.accountNumber;
                
//                 if (!accountId) {
//                     setCards([]);
//                     setCardsLoading(false);
//                     return;
//                 }

//                 const response = await API.get(`account/userCardsByStatus/${accountId}`);

//                 if (response.data && response.data.status && Array.isArray(response.data.data)) {
//                     const mappedCards = response.data.data.map((card) => {
//                         const isDebit = card.cardTypeName?.toLowerCase() === 'debit';
//                         const cardNumberStr = String(card.cardNumber);
//                         const formattedCardNumber = cardNumberStr.replace(/(\d{4})(?=\d)/g, '$1 ');
                        
//                         let expiryFormatted = card.expiryDate;
//                         if (card.expiryDate && card.expiryDate.includes('-')) {
//                             const [year, month] = card.expiryDate.split('-');
//                             expiryFormatted = `${month}/${year.slice(-2)}`;
//                         }
                        
//                         // Canara Bank color scheme
//                         let cardColor;
//                         let chipColor;
//                         let pattern;
//                         let networkIcon;
                        
//                         if (card.status?.toLowerCase() === 'blocked') {
//                             cardColor = "linear-gradient(135deg, #6B7280, #4B5563)";
//                             chipColor = "#9CA3AF";
//                             pattern = "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 10px, transparent 10px, transparent 20px)";
//                         } else if (isDebit) {
//                             cardColor = "linear-gradient(135deg, #061153, #514607, #04155e)"; // Canara Blue
//                             chipColor = "#FFD700";
//                             pattern = "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 30%)";
//                         } else {
//                             cardColor = "linear-gradient(135deg, #f0680d, #34281f, #e36218)"; // Credit card green
//                             chipColor = "#fffbfb";
//                             pattern = "linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%)";
//                         }

//                         // Network icon based on card network
//                         if (card.cardNetwork?.toLowerCase().includes('visa')) {
//                             networkIcon = <FaCcVisa key={`visa-${card.cardNumber}`} size={24} color="#ffffff" />;
//                         } else if (card.cardNetwork?.toLowerCase().includes('master')) {
//                             networkIcon = <FaCcMastercard key={`master-${card.cardNumber}`} size={24} color="#ffffff" />;
//                         } else {
//                             networkIcon = <FaRegCreditCard key={`credit-${card.cardNumber}`} size={20} color="#ffffff" />;
//                         }
                        
//                         return {
//                             type: card.cardTypeName || (isDebit ? "Debit" : "Credit"),
//                             cardNumber: formattedCardNumber,
//                             cardHolder: userData?.data?.firstName ? `${userData.data.firstName.toUpperCase()} ${userData.data.lastName.toUpperCase()}` : "USER",
//                             expiry: expiryFormatted || "MM/YY",
//                             network: card.cardNetwork || "Visa",
//                             status: card.status || "Active",
//                             color: cardColor,
//                             chipColor: chipColor,
//                             pattern: pattern,
//                             isDebit: isDebit,
//                             currentLimit: card.currentLimit,
//                             maxLimit: card.maxLimit,
//                             networkIcon
//                         };
//                     });
                    
//                     setCards(mappedCards);
//                 } else {
//                     setCards([]);
//                 }
//             } catch (error) {
//                 console.error("Error fetching cards:", error);
//                 setCards([]);
//             } finally {
//                 setCardsLoading(false);
//             }
//         }
//     }, [filteredAccounts, selectedAccount, userData]);

//     useEffect(() => {
//         fetchCards();
//     }, [fetchCards]);

//     useEffect(() => {
//         setCardFilter("active");
//     }, [selectedAccount]);

//     const fetchTransactions = useCallback(async () => {
//         if (filteredAccounts.length > 0 && filteredAccounts[selectedAccount]) {
//             setLoading(true);
//             try {
//                 const accountId = filteredAccounts[selectedAccount].accountNumber;
//                 const response = await API.get(`account/transactions/${accountId}`);
//                 const txData = response.data && Array.isArray(response.data.data) ? response.data.data : [];
//                 setTransactions(txData);
//             } catch (error) {
//                 console.error("Error fetching transactions:", error);
//                 setTransactions([]);
//             } finally {
//                 setLoading(false);
//             }
//         }
//     }, [filteredAccounts, selectedAccount]);

//     useEffect(() => {
//         fetchTransactions();
//     }, [fetchTransactions]);

//     const handleRefresh = async () => {
//         await Promise.all([
//             fetchUserData(true),
//             fetchCards(),
//             fetchTransactions()
//         ]);
//         showSnackbar("success", "Dashboard updated successfully");
//     };

//     const formatDate = (dateString) => {
//         if (!dateString) return "N/A";
//         const options = { year: 'numeric', month: 'short', day: 'numeric' };
//         return new Date(dateString).toLocaleDateString('en-US', options);
//     };

//     const apiData = userData?.data || {};

//     const getAccountIcon = (type) => {
//         const typeLower = type?.toLowerCase() || '';
//         if (typeLower.includes('savings')) return <FaWallet key="savings" size={16} color="#1E3A8A" />;
//         if (typeLower.includes('current')) return <FaBuilding key="current" size={16} color="#1E3A8A" />;
//         if (typeLower.includes('salary')) return <FaBriefcase key="salary" size={16} color="#1E3A8A" />;
//         return <FaUniversity key="university" size={16} color="#1E3A8A" />;
//     };

//     // Filter cards based on selected filter
//     const filteredCards = useMemo(() => {
//         return cards.filter(card => {
//             if (cardFilter === "active") {
//                 return card.status?.toLowerCase() === "active";
//             } else if (cardFilter === "blocked") {
//                 return card.status?.toLowerCase() === "blocked";
//             }
//             return true;
//         });
//     }, [cards, cardFilter]);

//     const displayData = {
//         name: apiData.firstName ? `${apiData.firstName} ${apiData.lastName}` : "Guest User",
//         memberSince: apiData.createdAt ? new Date(apiData.createdAt).getFullYear() : "2024",
//         accounts: filteredAccounts.map(acc => ({
//             id: acc.accountNumber,
//             type: acc.accountTypeName || "Account",
//             accountNumber: String(acc.accountNumber),
//             ifsc: acc.branchCode || "CNRB0001234",
//             branch: acc.branchName || "Main Branch",
//             city: acc.city || "Bengaluru",
//             balance: acc.balance || 0,
//             currency: "INR",
//             openedDate: acc.openedDate || "N/A",
//             status: acc.status || "Active",
//             cardLinked: true,
//             icon: getAccountIcon(acc.accountTypeName)
//         })),
//         cards: filteredCards,
//     };

//     const getCurrentAccountType = () => {
//         if (displayData.accounts && displayData.accounts[selectedAccount]) {
//             return displayData.accounts[selectedAccount].type;
//         }
//         return "Account";
//     };

//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat('en-IN', {
//             style: 'currency',
//             currency: 'INR',
//             minimumFractionDigits: 0,
//             maximumFractionDigits: 0,
//         }).format(amount);
//     };

//     const copyToClipboard = (text) => {
//         navigator.clipboard.writeText(text);
//         showSnackbar("success", "Copied to clipboard!");
//     };

//     const handleNavigateTransaction = () => {
//         navigate("/transactions");
//     };

//     const toggleBalanceVisibility = () => {
//         setShowBalance(!showBalance);
//     };

//     // Calculate total balance
//     const totalBalance = useMemo(() => {
//         return displayData.accounts ? displayData.accounts.reduce((sum, acc) => sum + acc.balance, 0) : 0;
//     }, [displayData.accounts]);

//     // Get active and blocked card counts
//     const activeCount = cards.filter(card => card.status?.toLowerCase() === "active").length;
//     const blockedCount = cards.filter(card => card.status?.toLowerCase() === "blocked").length;

//     // Canara Bank color scheme
//     const canaraBlue = "#1E3A8A";
//     const canaraGold = "#F59E0B";
//     const canaraLightBlue = "#EFF6FF";
//     const canaraGray = "#F3F4F6";

//     const styles = {
//         container: {
//             padding: "24px",
//             maxWidth: "1400px",
//             margin: "0 auto",
//             fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
//             minHeight: "100vh",
//             position: "relative",
//             color: "#111827",
//             backgroundColor: "#F9FAFB",
//         },
//         header: {
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "24px",
//             padding: "16px 24px",
//             background: "#FFFFFF",
//             borderRadius: "16px",
//             boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
//             border: "1px solid #E5E7EB",
//         },
//         welcomeSection: {
//             display: "flex",
//             flexDirection: "column",
//             gap: "4px",
//         },
//         greeting: {
//             fontSize: "28px",
//             fontWeight: "600",
//             color: "#111827",
//             margin: 0,
//             lineHeight: "1.2",
//             display: "flex",
//             alignItems: "center",
//             gap: "12px",
//         },
//         memberSince: {
//             fontSize: "14px",
//             color: "#6B7280",
//             margin: 0,
//             fontWeight: "400",
//         },
//         refreshButton: {
//             background: canaraLightBlue,
//             border: "1px solid #E5E7EB",
//             borderRadius: "12px",
//             padding: "10px 16px",
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//             cursor: "pointer",
//             color: canaraBlue,
//             fontWeight: "500",
//             fontSize: "14px",
//             transition: "all 200ms ease",
//         },
//         mainGrid: {
//             display: "grid",
//             gridTemplateColumns: "1fr 380px",
//             gap: "24px",
//         },
//         leftColumn: {
//             display: "flex",
//             flexDirection: "column",
//             gap: "24px",
//         },
//         rightColumn: {
//             display: "flex",
//             flexDirection: "column",
//             gap: "24px",
//         },
//         totalBalanceCard: {
//             background: "linear-gradient(135deg, #102c74, #063db4)",
//             borderRadius: "20px",
//             padding: "28px",
//             color: "#ffffff",
//             boxShadow: "0 10px 25px -5px rgba(30, 58, 138, 0.2)",
//             border: "none",
//             position: "relative",
//             overflow: "hidden",
//         },

//         totalBalanceHeader: {
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "12px",
//         },
//         totalBalanceLabel: {
//             fontSize: "16px",
//             color: "rgba(255,255,255,0.9)",
//             fontWeight: "500",
//             letterSpacing: "0.3px",
//         },
//         totalBalanceAmount: {
//             fontSize: "42px",
//             fontWeight: "700",
//             margin: "12px 0 0",
//             color: "#ffffff",
//             letterSpacing: "-0.02em",
//         },
//         eyeButton: {
//             background: "rgba(255,255,255,0.2)",
//             border: "none",
//             borderRadius: "12px",
//             width: "40px",
//             height: "40px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             cursor: "pointer",
//             color: "#ffffff",
//             transition: "all 200ms ease",
//             backdropFilter: "blur(4px)",
//         },
//         filterToggleContainer: {
//             display: "flex",
//             gap: "8px",
//             background: "#FFFFFF",
//             padding: "4px",
//             borderRadius: "40px",
//             border: "1px solid #E5E7EB",
//             marginTop: "16px",
//         },
//         filterToggleButton: {
//             flex: 1,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: "8px",
//             padding: "10px 16px",
//             borderRadius: "30px",
//             border: "none",
//             fontSize: "14px",
//             fontWeight: "500",
//             cursor: "pointer",
//             transition: "all 200ms ease",
//         },
//         activeToggle: {
//             background: canaraBlue,
//             color: "#FFFFFF",
//             boxShadow: "0 2px 8px rgba(30, 58, 138, 0.3)",
//         },
//         inactiveToggle: {
//             background: "transparent",
//             color: "#6B7280",
//         },
//         accountsRowContainer: {
//             width: "100%",
//             overflowX: "auto",
//             overflowY: "hidden",
//             scrollBehavior: "smooth",
//             WebkitOverflowScrolling: "touch",
//             paddingBottom: "12px",
//             marginBottom: "4px",
//         },
//         accountsRow: {
//             display: "flex",
//             flexDirection: "row",
//             flexWrap: "nowrap",
//             gap: "16px",
//             minWidth: "min-content",
//         },
//         accountCard: {
//             background: "#FFFFFF",
//             border: "1px solid #E5E7EB",
//             borderRadius: "16px",
//             padding: "20px",
//             cursor: "pointer",
//             transition: "all 200ms ease",
//             boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "space-between",
//             height: "140px",
//             width: "280px",
//             minWidth: "260px",
//             flexShrink: 0,
//         },
//         accountCardActive: {
//             borderColor: canaraBlue,
//             borderWidth: "2px",
//             background: canaraLightBlue,
//             boxShadow: "0 4px 12px rgba(30, 58, 138, 0.15)",
//         },
//         accountTabInfo: {
//             display: "flex",
//             flexDirection: "column",
//             gap: "8px",
//         },
//         accountTabHeader: {
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//         },
//         accountTabType: {
//             fontSize: "16px",
//             fontWeight: "600",
//             color: "#1F2937",
//         },
//         accountTabNumber: {
//             fontSize: "14px",
//             color: "#6B7280",
//             fontWeight: "500",
//             fontFamily: "'Roboto Mono', monospace",
//         },
//         accountTabBalance: {
//             fontSize: "24px",
//             fontWeight: "700",
//             color: canaraBlue,
//         },
//         accountDetailsCard: {
//             background: "#FFFFFF",
//             borderRadius: "20px",
//             padding: "24px",
//             boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
//             border: "1px solid #E5E7EB",
//             transition: "all 200ms ease",
//         },
//         accountDetailsHeader: {
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "20px",
//         },
//         accountDetailsTitle: {
//             fontSize: "18px",
//             fontWeight: "600",
//             color: "#111827",
//             margin: 0,
//         },
//         accountStatus: {
//             display: "flex",
//             alignItems: "center",
//             gap: "6px",
//             fontSize: "12px",
//             color: "#059669",
//             fontWeight: "600",
//             padding: "6px 14px",
//             background: "#D1FAE5",
//             borderRadius: "30px",
//         },
//         accountNumberRow: {
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//             marginBottom: "24px",
//             padding: "16px",
//             background: canaraGray,
//             borderRadius: "12px",
//             border: "1px solid #E5E7EB",
//         },
//         accountNumber: {
//             fontSize: "18px",
//             fontWeight: "600",
//             color: "#111827",
//             letterSpacing: "1px",
//             fontFamily: "'Roboto Mono', monospace",
//         },
//         copyBtn: {
//             background: "none",
//             border: "none",
//             cursor: "pointer",
//             padding: "8px",
//             borderRadius: "8px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             color: canaraBlue,
//             transition: "all 150ms ease",
//         },
//         accountMetaGrid: {
//             display: "grid",
//             gridTemplateColumns: "repeat(2, 1fr)",
//             gap: "20px",
//             padding: "20px 0 0",
//             borderTop: "1px solid #E5E7EB",
//         },
//         accountMetaItem: {
//             display: "flex",
//             flexDirection: "column",
//             gap: "6px",
//         },
//         metaLabel: {
//             fontSize: "12px",
//             color: "#6B7280",
//             textTransform: "uppercase",
//             letterSpacing: "0.5px",
//             display: "flex",
//             alignItems: "center",
//             gap: "4px",
//             fontWeight: "500",
//         },
//         metaValue: {
//             fontSize: "15px",
//             fontWeight: "600",
//             color: "#111827",
//         },
//         metaValueRow: {
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//         },
//         copyBtnSmall: {
//             background: "none",
//             border: "none",
//             cursor: "pointer",
//             padding: "4px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             color: canaraBlue,
//             transition: "all 150ms ease",
//         },
//         cardsSection: {
//             background: "#FFFFFF",
//             borderRadius: "20px",
//             padding: "24px",
//             border: "1px solid #E5E7EB",
//             boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
//             height: "440px",
//             display: "flex",
//             flexDirection: "column",
//             transition: "all 200ms ease",
//         },
//         cardsScrollableContainer: {
//             height: "360px",
//             overflowY: "auto",
//             paddingRight: "8px",
//             marginTop: "8px",
//         },
//         sectionHeader: {
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "16px",
//         },
//         sectionTitle: {
//             fontSize: "16px",
//             fontWeight: "600",
//             color: "#111827",
//             margin: 0,
//         },
//         filterContainer: {
//             display: "flex",
//             gap: "4px",
//             background: canaraGray,
//             padding: "4px",
//             borderRadius: "40px",
//             border: "1px solid #E5E7EB",
//         },
//         filterButton: {
//             display: "flex",
//             alignItems: "center",
//             gap: "6px",
//             padding: "8px 16px",
//             borderRadius: "30px",
//             border: "none",
//             fontSize: "13px",
//             fontWeight: "500",
//             cursor: "pointer",
//             transition: "all 200ms ease",
//             minWidth: "90px",
//             justifyContent: "center",
//         },
//         activeFilterButton: {
//             background: canaraBlue,
//             color: "#FFFFFF",
//             boxShadow: "0 2px 8px rgba(30, 58, 138, 0.3)",
//         },
//         inactiveFilterButton: {
//             background: "transparent",
//             color: "#6B7280",
//         },
//         blockedFilterButton: {
//             background: "#DC2626",
//             color: "#FFFFFF",
//             boxShadow: "0 2px 8px rgba(220, 38, 38, 0.3)",
//         },
//         filterBadge: {
//             background: "rgba(255,255,255,0.2)",
//             borderRadius: "50%",
//             width: "20px",
//             height: "20px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: "11px",
//             fontWeight: "600",
//         },
//         viewAllBtn: {
//             background: "none",
//             border: `1px solid ${canaraBlue}`,
//             color: canaraBlue,
//             fontSize: "13px",
//             fontWeight: "500",
//             cursor: "pointer",
//             transition: "all 200ms ease",
//             padding: "8px 20px",
//             borderRadius: "30px",
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//         },
//         card: {
//             padding: "20px",
//             borderRadius: "16px",
//             color: "#ffffff",
//             position: "relative",
//             minHeight: "190px",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "space-between",
//             boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
//             width: "100%",
//             transition: "all 200ms ease",
//             border: "none",
//             overflow: "hidden",
//             marginBottom: "16px",
//         },
//         cardLabel: {
//             fontSize: "10px",
//             opacity: 0.7,
//             textTransform: "uppercase",
//             letterSpacing: "0.5px",
//             fontWeight: "500",
//         },
//         cardValue: {
//             fontSize: "13px",
//             fontWeight: "600",
//             letterSpacing: "0.3px",
//         },
//         transactionHeader: {
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "16px",
//         },
//         transactionContainer: {
//             display: "flex",
//             flexDirection: "column",
//             gap: "12px",
//         },
//         transactionItem: {
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             padding: "16px 20px",
//             background: "#FFFFFF",
//             borderRadius: "16px",
//             border: "1px solid #E5E7EB",
//             boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
//             transition: "all 200ms ease",
//         },
//         transactionLeft: {
//             display: "flex",
//             alignItems: "center",
//             gap: "12px",
//         },
//         transactionIcon: {
//             width: "44px",
//             height: "44px",
//             borderRadius: "12px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontWeight: "600",
//         },
//         transactionInfo: {
//             display: "flex",
//             flexDirection: "column",
//             gap: "4px",
//         },
//         transactionType: {
//             fontSize: "15px",
//             fontWeight: "600",
//             color: "#111827",
//         },
//         transactionDate: {
//             fontSize: "12px",
//             color: "#6B7280",
//         },
//         transactionRight: {
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "flex-end",
//             gap: "4px",
//         },
//         transactionAmount: {
//             fontSize: "18px",
//             fontWeight: "700",
//         },
//         transactionBalance: {
//             fontSize: "12px",
//             color: "#6B7280",
//         },
//         emptyState: {
//             textAlign: "center",
//             padding: "32px",
//             color: "#6B7280",
//             background: canaraGray,
//             borderRadius: "12px",
//             border: `1px dashed #D1D5DB`,
//         },
//     };

//     // Add global styles
//     useEffect(() => {
//         const styleSheet = document.createElement("style");
//         styleSheet.textContent = `
//             @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Mono&display=swap');

//             body {
//                 background-color: #F9FAFB;
//                 font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
//                 margin: 0;
//                 padding: 0;
//             }

//             /* Scrollbar Styles */
//             ::-webkit-scrollbar {
//                 width: 6px;
//                 height: 6px;
//             }

//             ::-webkit-scrollbar-track {
//                 background: #F1F4F9;
//                 border-radius: 4px;
//             }

//             ::-webkit-scrollbar-thumb {
//                 background: #9CA3AF;
//                 border-radius: 4px;
//             }

//             ::-webkit-scrollbar-thumb:hover {
//                 background: #6B7280;
//             }

//             /* Hover Effects */
//             .account-card:hover {
//                 transform: translateY(-4px);
//                 border-color: #1E3A8A !important;
//                 box-shadow: 0 10px 25px -5px rgba(30, 58, 138, 0.2) !important;
//             }

//             .account-card.active {
//                 border-color: #1E3A8A !important;
//                 border-width: 2px !important;
//                 background: #EFF6FF !important;
//             }

//             .transaction-item:hover {
//                 transform: translateX(4px);
//                 border-color: #1E3A8A !important;
//                 box-shadow: 0 4px 12px rgba(30, 58, 138, 0.1) !important;
//             }

//             .dashboard-card:hover {
//                 transform: translateY(-2px);
//                 box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1) !important;
//             }

//             .copy-btn:hover, .copy-btn-small:hover {
//                 background: #EFF6FF !important;
//                 transform: scale(1.1);
//             }

//             .eye-button:hover {
//                 background: rgba(255,255,255,0.3) !important;
//                 transform: scale(1.05);
//             }

//             .filter-button:hover {
//                 transform: translateY(-1px);
//             }

//             .view-all-btn:hover {
//                 background: #1E3A8A !important;
//                 color: #FFFFFF !important;
//                 transform: translateY(-2px);
//                 box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3);
//             }

//             .refresh-button:hover {
//                 background: #DBEAFE !important;
//                 transform: translateY(-2px);
//             }

//             .refresh-button:active {
//                 transform: translateY(0);
//             }

//             @keyframes spin {
//                 from { transform: rotate(0deg); }
//                 to { transform: rotate(360deg); }
//             }

//             .spinning {
//                 animation: spin 1s linear infinite;
//             }

//             /* Focus states */
//             *:focus-visible {
//                 outline: 2px solid #1E3A8A;
//                 outline-offset: 2px;
//             }

//             /* Loading animations */
//             @keyframes shimmer {
//                 0% { background-position: -1000px 0; }
//                 100% { background-position: 1000px 0; }
//             }

//             .shimmer {
//                 background: linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%);
//                 background-size: 1000px 100%;
//                 animation: shimmer 2s infinite;
//             }

//             /* Responsive */
//             @media (max-width: 1024px) {
//                 [style*="mainGrid"] {
//                     grid-template-columns: 1fr !important;
//                 }
//             }

//             @media (max-width: 768px) {
//                 [style*="container"] {
//                     padding: 16px !important;
//                 }
                
//                 [style*="greeting"] {
//                     font-size: 24px !important;
//                 }
                
//                 [style*="totalBalanceAmount"] {
//                     font-size: 32px !important;
//                 }
                
//                 [style*="accountMetaGrid"] {
//                     grid-template-columns: 1fr !important;
//                 }
//             }
//         `;
//         document.head.appendChild(styleSheet);

//         return () => {
//             document.head.removeChild(styleSheet);
//         };
//     }, []);

//     if (userLoading || !displayData) {
//         return (
//             <div style={styles.container}>
//                 <div style={styles.header}>
//                     <div style={styles.welcomeSection}>
//                         <div className="shimmer" style={{ width: "280px", height: "32px", borderRadius: "8px", marginBottom: "8px" }}></div>
//                         <div className="shimmer" style={{ width: "120px", height: "16px", borderRadius: "4px" }}></div>
//                     </div>
//                 </div>
//                 <div style={styles.mainGrid}>
//                     <div style={styles.leftColumn}>
//                         <div className="shimmer" style={{ height: "140px", borderRadius: "20px" }}></div>
//                         <div style={styles.accountsRowContainer}>
//                             <div style={styles.accountsRow}>
//                                 {[1, 2, 3].map((item) => (
//                                     <div key={item} className="shimmer" style={{ ...styles.accountCard, border: "none" }}></div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                     <div style={styles.rightColumn}>
//                         <div className="shimmer" style={{ height: "440px", borderRadius: "20px" }}></div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div style={styles.container}>
//             {/* Header with Refresh */}
//             <div style={styles.header}>
//                 <div style={styles.welcomeSection}>
//                     <h1 style={styles.greeting}>
//                         <FaUserCircle style={{ color: canaraBlue }} size={32} />
//                         Welcome back, {displayData.name ? displayData.name.split(' ')[0] : 'User'}!
//                     </h1>
//                     <p style={styles.Since}>Since {displayData.memberSince}</p>
//                 </div>
//                 <button 
//                     style={styles.refreshButton}
//                     onClick={handleRefresh}
//                     className="refresh-button"
//                     disabled={refreshing}
//                 >
//                     <FaSync className={refreshing ? "spinning" : ""} size={14} />
//                     {refreshing ? "Refreshing..." : "Refresh"}
//                 </button>
//             </div>
            
//             {/* Main Grid */}
//             <div style={styles.mainGrid}>
//                 {/* Left Column */}
//                 <div style={styles.leftColumn}>
//                     {/* Total Balance Card */}
//                     <div style={styles.totalBalanceCard} className="dashboard-card">
//                         <div style={styles.totalBalanceHeader}>
//                             <span style={styles.totalBalanceLabel}>Total Balance (All Accounts)</span>
//                             <button 
//                                 style={styles.eyeButton} 
//                                 onClick={toggleBalanceVisibility}
//                                 className="eye-button"
//                             >
//                                 {showBalance ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
//                             </button>
//                         </div>
//                         <h2 style={styles.totalBalanceAmount}>
//                             {showBalance ? formatCurrency(totalBalance) : '••••••••'}
//                         </h2>

//                         {/* Account Filter Toggle */}
//                         <div style={styles.filterToggleContainer}>
//                             <button
//                                 onClick={() => setAccountFilter("active")}
//                                 style={{
//                                     ...styles.filterToggleButton,
//                                     ...(accountFilter === "active" ? styles.activeToggle : styles.inactiveToggle)
//                                 }}
//                             >
//                                 <FaUnlock size={12} />
//                                 Active Accounts
//                             </button>
//                             <button
//                                 onClick={() => setAccountFilter("inactive")}
//                                 style={{
//                                     ...styles.filterToggleButton,
//                                     ...(accountFilter === "inactive" ? styles.activeToggle : styles.inactiveToggle)
//                                 }}
//                             >
//                                 <FaLock size={12} />
//                                 Inactive Accounts
//                             </button>
//                         </div>
//                     </div>

//                     {/* Accounts Row */}
//                     {displayData.accounts.length > 0 ? (
//                         <>
//                             <div style={styles.accountsRowContainer} className="accounts-row-container">
//                                 <div style={styles.accountsRow} className="accounts-row">
//                                     {displayData.accounts.map((account, index) => (
//                                         <div
//                                             key={account.id}
//                                             className={`account-card ${selectedAccount === index ? 'active' : ''}`}
//                                             style={{
//                                                 ...styles.accountCard,
//                                                 ...(selectedAccount === index ? styles.accountCardActive : {}),
//                                             }}
//                                             onClick={() => setSelectedAccount(index)}
//                                         >
//                                             <div style={styles.accountTabInfo}>
//                                                 <div style={styles.accountTabHeader}>
//                                                     {account.icon}
//                                                     <span style={styles.accountTabType}>{account.type}</span>
//                                                 </div>
//                                                 <span style={styles.accountTabNumber}>
//                                                     {showBalance ? `••••${account.accountNumber.slice(-4)}` : '••••'}
//                                                 </span>
//                                             </div>
//                                             <span style={styles.accountTabBalance}>
//                                                 {showBalance ? formatCurrency(account.balance) : '••••••'}
//                                             </span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Selected Account Details */}
//                             {displayData.accounts[selectedAccount] && (
//                                 <div style={styles.accountDetailsCard} className="dashboard-card">
//                                     <div style={styles.accountDetailsHeader}>
//                                         <h3 style={styles.accountDetailsTitle}>
//                                             {displayData.accounts[selectedAccount].type} Details
//                                         </h3>
//                                         <span style={styles.accountStatus}>
//                                             <FaCheckCircle size={12} color="#059669" />
//                                             {displayData.accounts[selectedAccount].status}
//                                         </span>
//                                     </div>

//                                     <div style={styles.accountNumberRow}>
//                                         <span style={styles.accountNumber}>
//                                             {showBalance ? displayData.accounts[selectedAccount].accountNumber : '••••••••••••'}
//                                         </span>
//                                         <button
//                                             style={styles.copyBtn}
//                                             onClick={() => copyToClipboard(displayData.accounts[selectedAccount].accountNumber)}
//                                             className="copy-btn"
//                                             disabled={!showBalance}
//                                         >
//                                             <FaCopy size={14} color={canaraBlue} />
//                                         </button>
//                                     </div>

//                                     <div style={styles.accountMetaGrid}>
//                                         <div style={styles.accountMetaItem}>
//                                             <span style={styles.metaLabel}>
//                                                 <FaCity size={10} style={{ marginRight: '4px', color: canaraBlue }} />
//                                                 CITY
//                                             </span>
//                                             <span style={styles.metaValue}>
//                                                 {showBalance ? displayData.accounts[selectedAccount].city : '••••••'}
//                                             </span>
//                                         </div>
//                                         <div style={styles.accountMetaItem}>
//                                             <span style={styles.metaLabel}>
//                                                 <FaUniversity size={10} style={{ marginRight: '4px', color: canaraBlue }} />
//                                                 IFSC CODE
//                                             </span>
//                                             <div style={styles.metaValueRow}>
//                                                 <span style={styles.metaValue}>
//                                                     {showBalance ? displayData.accounts[selectedAccount].ifsc : '••••••••••'}
//                                                 </span>
//                                                 <button
//                                                     style={styles.copyBtnSmall}
//                                                     onClick={() => copyToClipboard(displayData.accounts[selectedAccount].ifsc)}
//                                                     className="copy-btn-small"
//                                                     disabled={!showBalance}
//                                                 >
//                                                     <FaCopy size={10} color={canaraBlue} />
//                                                 </button>
//                                             </div>
//                                         </div>
//                                         <div style={styles.accountMetaItem}>
//                                             <span style={styles.metaLabel}>
//                                                 <FaMapMarkerAlt size={10} style={{ marginRight: '4px', color: canaraBlue }} />
//                                                 BRANCH
//                                             </span>
//                                             <span style={styles.metaValue}>
//                                                 {showBalance ? displayData.accounts[selectedAccount].branch : '••••••'}
//                                             </span>
//                                         </div>
//                                         <div style={styles.accountMetaItem}>
//                                             <span style={styles.metaLabel}>
//                                                 <FaCalendarAlt size={10} style={{ marginRight: '4px', color: canaraBlue }} />
//                                                 OPENED ON
//                                             </span>
//                                             <span style={styles.metaValue}>
//                                                 {showBalance ? formatDate(displayData.accounts[selectedAccount].openedDate) : '••/••/••••'}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                         </>
//                     ) : (
//                         <div style={styles.emptyState}>
//                             <p>No {accountFilter} accounts found</p>
//                         </div>
//                     )}
//                 </div>

//                 {/* Right Column */}
//                 <div style={styles.rightColumn}>
//                     {/* Cards Section */}
//                     <div style={styles.cardsSection} className="dashboard-card">
//                         <div style={styles.sectionHeader}>
//                             <h3 style={styles.sectionTitle}>
//                                 {getCurrentAccountType()} Cards
//                             </h3>
//                             <div style={styles.filterContainer}>
//                                 <button
//                                     onClick={() => setCardFilter("active")}
//                                     style={{
//                                         ...styles.filterButton,
//                                         ...(cardFilter === "active" ? styles.activeFilterButton : styles.inactiveFilterButton)
//                                     }}
//                                     className="filter-button"
//                                 >
//                                     <FaUnlock size={12} />
//                                     Active
//                                     {activeCount > 0 && (
//                                         <span style={cardFilter === "active" ? styles.filterBadge : {}}>{activeCount}</span>
//                                     )}
//                                 </button>
//                                 <button
//                                     onClick={() => setCardFilter("blocked")}
//                                     style={{
//                                         ...styles.filterButton,
//                                         ...(cardFilter === "blocked" ? styles.blockedFilterButton : styles.inactiveFilterButton)
//                                     }}
//                                     className="filter-button"
//                                 >
//                                     <FaLock size={12} />
//                                     Blocked
//                                     {blockedCount > 0 && (
//                                         <span style={cardFilter === "blocked" ? styles.filterBadge : {}}>{blockedCount}</span>
//                                     )}
//                                 </button>
//                             </div>
//                         </div>

//                         <div className="cards-scrollable" style={styles.cardsScrollableContainer}>
//                             {cardsLoading ? (
//                                 [1, 2].map((item) => (
//                                     <div key={item} className="shimmer" style={{ ...styles.card, border: "none" }}></div>
//                                 ))
//                             ) : displayData.cards && displayData.cards.length > 0 ? (
//                                 displayData.cards.map((card, index) => (
//                                     <div
//                                         key={index}
//                                         style={{
//                                             ...styles.card,
//                                             background: card.color,
//                                         }}
//                                         className="dashboard-card"
//                                     >
//                                         <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: card.pattern, opacity: 0.1 }}></div>

//                                         <div style={{
//                                             position: "absolute",
//                                             top: "12px",
//                                             right: "16px",
//                                             background: "rgba(255,255,255,0.15)",
//                                             padding: "4px 12px",
//                                             borderRadius: "20px",
//                                             fontSize: "11px",
//                                             fontWeight: "600",
//                                             color: "#ffffff",
//                                             backdropFilter: "blur(4px)",
//                                             border: "1px solid rgba(255,255,255,0.2)"
//                                         }}>
//                                             {card.type}
//                                         </div>

//                                         <div style={{
//                                             position: "absolute",
//                                             top: "45px",
//                                             left: "20px",
//                                             width: "40px",
//                                             height: "28px",
//                                             background: `linear-gradient(135deg, ${card.chipColor}, ${card.isDebit ? '#B8860B' : '#A0A0A0'})`,
//                                             borderRadius: "6px",
//                                             boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
//                                         }}>
//                                             <div style={{ width: "30px", height: "20px", margin: "4px auto", background: "rgba(0,0,0,0.2)", borderRadius: "2px" }}></div>
//                                         </div>

//                                         <div style={{
//                                             position: "absolute",
//                                             top: "90px",
//                                             left: "20px",
//                                             right: "20px",
//                                             fontSize: "18px",
//                                             letterSpacing: "2.5px",
//                                             fontWeight: "500",
//                                             color: "#ffffff",
//                                             fontFamily: "'Roboto Mono', monospace",
//                                         }}>
//                                             {showBalance ? card.cardNumber : '•••• •••• •••• ••••'}
//                                         </div>

//                                         <div style={{
//                                             position: "absolute",
//                                             bottom: "16px",
//                                             left: "20px",
//                                             display: "flex",
//                                             flexDirection: "column",
//                                             gap: "2px"
//                                         }}>
//                                             <span style={styles.cardLabel}>Card Holder</span>
//                                             <span style={styles.cardValue}>
//                                                 {showBalance ? card.cardHolder : '•••• ••••'}
//                                             </span>
//                                         </div>

//                                         <div style={{
//                                             position: "absolute",
//                                             bottom: "16px",
//                                             right: "20px",
//                                             display: "flex",
//                                             flexDirection: "column",
//                                             gap: "2px",
//                                             alignItems: "flex-end"
//                                         }}>
//                                             <span style={styles.cardLabel}>Expires</span>
//                                             <span style={styles.cardValue}>
//                                                 {showBalance ? card.expiry : '••/••'}
//                                             </span>
//                                         </div>

//                                         <div style={{
//                                             position: "absolute",
//                                             bottom: "50px",
//                                             right: "20px",
//                                         }}>
//                                             {card.networkIcon}
//                                         </div>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <div style={styles.emptyState}>
//                                     No {cardFilter} cards found for this account.
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* Recent Transactions */}
//                     <div style={styles.transactionHeader}>
//                         <h3 style={styles.sectionTitle}>Recent Transactions</h3>
//                         <button style={styles.viewAllBtn} onClick={handleNavigateTransaction} className="view-all-btn">
//                             View All <FaArrowRight size={12} />
//                         </button>
//                     </div>

//                     <div style={styles.transactionContainer}>
//                         {loading ? (
//                             <div className="shimmer" style={{ height: "80px", borderRadius: "16px" }}></div>
//                         ) : transactions.length > 0 ? (
//                             transactions.slice(0, 2).map((transaction) => {
//                                 const isCredit = transaction.transactionType === "DEPOSIT";
//                                 return (
//                                     <div key={transaction.transactionId || Math.random()} 
//                                          style={styles.transactionItem}
//                                          className="transaction-item">
//                                         <div style={styles.transactionLeft}>
//                                             <div style={{
//                                                 ...styles.transactionIcon,
//                                                 backgroundColor: isCredit ? '#D1FAE5' : '#FEE2E2',
//                                                 color: isCredit ? '#059669' : '#DC2626'
//                                             }}>
//                                                 {isCredit ? <FaArrowDown size={16} /> : <FaArrowUp size={16} />}
//                                             </div>
//                                             <div style={styles.transactionInfo}>
//                                                 <span style={styles.transactionType}>
//                                                     {showBalance ? (transaction.transactionType || "Transaction") : '••••••••'}
//                                                 </span>
//                                                 <span style={styles.transactionDate}>
//                                                     {showBalance ? formatDate(transaction.dateOfTransaction) : '••/••/••••'}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                         <div style={styles.transactionRight}>
//                                             <span style={{
//                                                 ...styles.transactionAmount,
//                                                 color: isCredit ? '#059669' : '#DC2626'
//                                             }}>
//                                                 {showBalance ? (isCredit ? '+' : '-') : '••'}
//                                                 {showBalance && transaction.transactionedAmount ? formatCurrency(transaction.transactionedAmount) : ''}
//                                             </span>
//                                             <span style={styles.transactionBalance}>
//                                                 {showBalance && transaction.closingBalance ? `Bal: ${formatCurrency(transaction.closingBalance)}` : ''}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 );
//                             })
//                         ) : (
//                             <div style={styles.emptyState}>
//                                 No transactions found.
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
    FaUser,
    FaCreditCard,
    FaBook,
    FaBell,
    FaEye,
    FaEyeSlash,
    FaCopy,
    FaArrowUp,
    FaArrowDown,
    FaArrowRight,
    FaExchangeAlt,
    FaFileInvoiceDollar,
    FaShieldAlt,
    FaMobileAlt,
    FaClock,
    FaCheckCircle,
    FaPlus,
    FaCog,
    FaChartPie,
    FaWallet,
    FaUniversity,
    FaRupeeSign,
    FaCity,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaCcVisa,
    FaCcMastercard,
    FaGooglePay,
    FaApplePay,
    FaLandmark,
    FaBuilding,
    FaBriefcase,
    FaRegCircle,
    FaRegCreditCard,
    FaLock,
    FaUnlock,
    FaSync,
    FaHome,
    FaUserCircle
} from "react-icons/fa";
import API from "../../api";
import { useSnackbar } from "../../Context/SnackbarContext";
import { useNavigate } from "react-router-dom";

// ─── THEME ────────────────────────────────────────────────────────────────────
const T = {
    navyDeep:   "#0B1829",
    navyDark:   "#0F2035",
    navyMid:    "#152845",
    navyLight:  "#1C3558",
    navyBorder: "#1F3D5C",
    gold:       "#F5A623",
    goldLight:  "#FFD166",
    goldDark:   "#C47D0E",
    goldGlow:   "rgba(245,166,35,0.18)",
    white:      "#FFFFFF",
    offWhite:   "#E8EFF7",
    muted:      "#8AAAC8",
    mutedDark:  "#4A6B8A",
    success:    "#22C55E",
    successBg:  "rgba(34,197,94,0.12)",
    danger:     "#EF4444",
    dangerBg:   "rgba(239,68,68,0.12)",
    cardBlue:   "linear-gradient(135deg, #0F2744 0%, #1A3A62 50%, #0D2040 100%)",
    cardGold:   "linear-gradient(135deg, #7A4A00 0%, #B8720A 50%, #6B3F00 100%)",
};

// ─── GLOBAL STYLES ─────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
    background: ${T.navyDeep};
    font-family: 'DM Sans', sans-serif;
    color: ${T.offWhite};
    min-height: 100vh;
}

/* Scrollbar */
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: ${T.navyDark}; }
::-webkit-scrollbar-thumb { background: ${T.navyLight}; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: ${T.gold}; }

/* Animations */
@keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
}
@keyframes shimmerAnim {
    0%   { background-position: -700px 0; }
    100% { background-position: 700px 0; }
}
@keyframes spin {
    from { transform: rotate(0deg); } to { transform: rotate(360deg); }
}
@keyframes pulseGold {
    0%, 100% { box-shadow: 0 0 0 0 rgba(245,166,35,0.4); }
    50%       { box-shadow: 0 0 0 8px rgba(245,166,35,0); }
}
@keyframes borderGlow {
    0%, 100% { border-color: ${T.navyBorder}; }
    50%       { border-color: ${T.gold}; }
}

.fade-slide-up  { animation: fadeSlideUp 0.45s cubic-bezier(0.22,1,0.36,1) both; }
.fade-in        { animation: fadeIn 0.35s ease both; }
.shimmer-cell {
    background: linear-gradient(90deg, ${T.navyMid} 25%, ${T.navyLight} 50%, ${T.navyMid} 75%);
    background-size: 700px 100%;
    animation: shimmerAnim 1.4s infinite linear;
    border-radius: 10px;
}
.spinning { animation: spin 0.9s linear infinite; }

/* Hover lift */
.lift { transition: transform 0.2s ease, box-shadow 0.2s ease; }
.lift:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.35); }

/* Account card hover */
.acc-card {
    cursor: pointer;
    border: 1.5px solid ${T.navyBorder};
    border-radius: 16px;
    padding: 20px;
    background: ${T.navyDark};
    transition: all 0.22s ease;
    width: 270px;
    min-width: 250px;
    height: 148px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.acc-card:hover {
    border-color: ${T.gold};
    box-shadow: 0 0 0 1px ${T.gold}, 0 8px 24px rgba(245,166,35,0.12);
    transform: translateY(-2px);
}
.acc-card.acc-active {
    border-color: ${T.gold};
    background: linear-gradient(135deg, ${T.navyMid}, ${T.navyLight});
    box-shadow: 0 0 0 1px ${T.gold}, 0 8px 28px rgba(245,166,35,0.18);
}

/* Transaction row hover */
.tx-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px;
    background: ${T.navyDark};
    border: 1px solid ${T.navyBorder};
    border-radius: 14px;
    transition: all 0.2s ease;
    cursor: default;
}
.tx-row:hover {
    border-color: ${T.gold};
    background: ${T.navyMid};
    transform: translateX(3px);
    box-shadow: -3px 0 0 ${T.gold};
}

/* Btn resets */
button { font-family: 'DM Sans', sans-serif; cursor: pointer; }

/* Gold divider */
.gold-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, ${T.gold}, transparent);
    margin: 0;
    opacity: 0.35;
}

/* Card chip shine */
.chip-shine {
    background: linear-gradient(135deg, #D4A017 0%, #F5CB5C 30%, #C8860A 60%, #F0C040 100%);
    border-radius: 5px;
    width: 38px;
    height: 28px;
    position: relative;
    box-shadow: 0 2px 6px rgba(0,0,0,0.4);
}
.chip-shine::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0; right: 0;
    height: 1px;
    background: rgba(0,0,0,0.25);
}
.chip-shine::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0; bottom: 0;
    width: 1px;
    background: rgba(0,0,0,0.2);
}

/* Filter pill group */
.pill-group {
    display: flex;
    gap: 4px;
    background: rgba(255,255,255,0.04);
    padding: 4px;
    border-radius: 40px;
    border: 1px solid ${T.navyBorder};
}
.pill-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 7px 16px;
    border-radius: 30px;
    border: none;
    font-size: 13px;
    font-weight: 500;
    transition: all 0.2s ease;
    color: ${T.muted};
    background: transparent;
}
.pill-btn:hover { color: ${T.offWhite}; }
.pill-btn.active-blue {
    background: ${T.gold};
    color: ${T.navyDeep};
    font-weight: 600;
    box-shadow: 0 2px 12px rgba(245,166,35,0.4);
}
.pill-btn.active-red {
    background: ${T.danger};
    color: #fff;
    font-weight: 600;
    box-shadow: 0 2px 12px rgba(239,68,68,0.4);
}

/* View all btn */
.view-all-btn {
    background: transparent;
    border: 1px solid ${T.gold};
    color: ${T.gold};
    font-size: 13px;
    font-weight: 500;
    padding: 8px 20px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
}
.view-all-btn:hover {
    background: ${T.gold};
    color: ${T.navyDeep};
    box-shadow: 0 4px 16px rgba(245,166,35,0.35);
    transform: translateY(-1px);
}

/* Refresh btn */
.refresh-btn {
    background: rgba(245,166,35,0.1);
    border: 1px solid rgba(245,166,35,0.3);
    color: ${T.gold};
    font-size: 13px;
    font-weight: 500;
    padding: 10px 18px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
}
.refresh-btn:hover:not(:disabled) {
    background: rgba(245,166,35,0.2);
    border-color: ${T.gold};
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(245,166,35,0.2);
}

/* Copy btn */
.copy-btn-icon {
    background: none;
    border: none;
    padding: 6px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${T.muted};
    transition: all 0.15s ease;
}
.copy-btn-icon:hover {
    color: ${T.gold};
    background: ${T.goldGlow};
    transform: scale(1.1);
}

/* Eye btn */
.eye-btn {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    width: 38px; height: 38px;
    display: flex; align-items: center; justify-content: center;
    color: ${T.offWhite};
    transition: all 0.18s ease;
}
.eye-btn:hover {
    background: ${T.goldGlow};
    border-color: ${T.gold};
    color: ${T.gold};
}

/* Section card */
.section-card {
    background: ${T.navyDark};
    border: 1px solid ${T.navyBorder};
    border-radius: 20px;
    padding: 24px;
    transition: border-color 0.2s ease;
}
.section-card:hover { border-color: rgba(245,166,35,0.2); }

/* Stagger delays */
.delay-1 { animation-delay: 0.05s; }
.delay-2 { animation-delay: 0.1s; }
.delay-3 { animation-delay: 0.15s; }
.delay-4 { animation-delay: 0.2s; }
.delay-5 { animation-delay: 0.25s; }

/* meta label */
.meta-label {
    font-size: 11px;
    color: ${T.mutedDark};
    text-transform: uppercase;
    letter-spacing: 0.7px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 5px;
}
.meta-value {
    font-size: 15px;
    font-weight: 600;
    color: ${T.offWhite};
    font-family: 'JetBrains Mono', monospace;
}

/* Gold accent line on left of section-card */
.accent-left {
    border-left: 3px solid ${T.gold};
}

/* Status badge */
.status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border-radius: 30px;
    font-size: 12px;
    font-weight: 600;
    background: rgba(34,197,94,0.12);
    color: #22C55E;
    border: 1px solid rgba(34,197,94,0.25);
}
`;

// ─── COMPONENT ────────────────────────────────────────────────────────────────
const Dashboard = () => {
    const { showSnackbar } = useSnackbar();
    const [showBalance, setShowBalance] = useState(true);
    const [selectedAccount, setSelectedAccount] = useState(0);
    const [cardFilter, setCardFilter] = useState("active");
    const [accountFilter, setAccountFilter] = useState("active");

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    const [cards, setCards] = useState([]);
    const [cardsLoading, setCardsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const navigate = useNavigate();
    const userId = useMemo(() => localStorage.getItem("userId"), []);

    // Inject global styles once
    useEffect(() => {
        const tag = document.createElement("style");
        tag.id = "dashboard-global-css";
        tag.textContent = GLOBAL_CSS;
        if (!document.getElementById("dashboard-global-css")) {
            document.head.appendChild(tag);
        }
        return () => { const el = document.getElementById("dashboard-global-css"); if (el) el.remove(); };
    }, []);

    // ── Fetch user ────────────────────────────────────────────────────────────
    const fetchUserData = useCallback(async (showRefresh = false) => {
        if (showRefresh) setRefreshing(true);
        try {
            if (userId) {
                const response = await API.get(`users/${userId}`);
                setUserData(response.data);
                if (response.data?.data?.accounts) {
                    const accounts = response.data.data.accounts;
                    accounts.forEach((acc, index) => {
                        if (index === 0) localStorage.setItem("savingsAccount", acc.accountNumber);
                        else if (index === 1) localStorage.setItem("currentAccount", acc.accountNumber);
                        else if (index === 2) localStorage.setItem("salaryAccount", acc.accountNumber);
                    });
                }
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            showSnackbar("error", "Failed to load user profile");
        } finally {
            setUserLoading(false);
            if (showRefresh) setRefreshing(false);
        }
    }, [userId, showSnackbar]);

    useEffect(() => { fetchUserData(); }, [fetchUserData]);

    // ── Filtered accounts ─────────────────────────────────────────────────────
    const filteredAccounts = useMemo(() => {
        if (!userData?.data?.accounts) return [];
        const accounts = userData.data.accounts;
        return accountFilter === "active"
            ? accounts.filter(acc => acc.status?.toLowerCase() === "active")
            : accounts.filter(acc => acc.status?.toLowerCase() !== "active");
    }, [userData, accountFilter]);

    useEffect(() => {
        if (filteredAccounts.length > 0) setSelectedAccount(0);
    }, [accountFilter, filteredAccounts.length]);

    // ── Fetch cards (parallel-ready) ──────────────────────────────────────────
    const fetchCards = useCallback(async () => {
        if (!filteredAccounts.length || !filteredAccounts[selectedAccount]) return;
        setCardsLoading(true);
        setCards([]);
        try {
            const accountId = filteredAccounts[selectedAccount]?.accountNumber;
            if (!accountId) { setCards([]); return; }

            const response = await API.get(`account/userCardsByStatus/${accountId}`);
            if (response.data?.status && Array.isArray(response.data.data)) {
                const mappedCards = response.data.data.map((card) => {
                    const isDebit = card.cardTypeName?.toLowerCase() === 'debit';
                    const cardNumberStr = String(card.cardNumber);
                    const formattedCardNumber = cardNumberStr.replace(/(\d{4})(?=\d)/g, '$1 ');
                    let expiryFormatted = card.expiryDate;
                    if (card.expiryDate?.includes('-')) {
                        const [year, month] = card.expiryDate.split('-');
                        expiryFormatted = `${month}/${year.slice(-2)}`;
                    }
                    const isBlocked = card.status?.toLowerCase() === 'blocked';
                    let cardColor, chipColor, networkIcon;
                    if (isBlocked) {
                        cardColor = "linear-gradient(135deg, #2A2A2A, #1A1A1A)";
                        chipColor = "#555";
                    } else if (isDebit) {
                        cardColor = `linear-gradient(135deg, ${T.navyMid} 0%, #1A4070 50%, ${T.navyLight} 100%)`;
                        chipColor = T.gold;
                    } else {
                        cardColor = `linear-gradient(135deg, #3D1F00 0%, #7A4500 50%, #3A1B00 100%)`;
                        chipColor = "#D4A017";
                    }
                    if (card.cardNetwork?.toLowerCase().includes('visa')) {
                        networkIcon = <FaCcVisa key={`v-${card.cardNumber}`} size={26} color="rgba(255,255,255,0.85)" />;
                    } else if (card.cardNetwork?.toLowerCase().includes('master')) {
                        networkIcon = <FaCcMastercard key={`m-${card.cardNumber}`} size={26} color="rgba(255,255,255,0.85)" />;
                    } else {
                        networkIcon = <FaRegCreditCard key={`c-${card.cardNumber}`} size={22} color="rgba(255,255,255,0.85)" />;
                    }
                    return {
                        type: card.cardTypeName || (isDebit ? "Debit" : "Credit"),
                        cardNumber: formattedCardNumber,
                        cardHolder: userData?.data?.firstName
                            ? `${userData.data.firstName.toUpperCase()} ${userData.data.lastName.toUpperCase()}`
                            : "USER",
                        expiry: expiryFormatted || "MM/YY",
                        network: card.cardNetwork || "Visa",
                        status: card.status || "Active",
                        color: cardColor,
                        chipColor,
                        isDebit,
                        isBlocked,
                        networkIcon,
                    };
                });
                setCards(mappedCards);
            } else { setCards([]); }
        } catch (error) {
            console.error("Error fetching cards:", error);
            setCards([]);
        } finally { setCardsLoading(false); }
    }, [filteredAccounts, selectedAccount, userData]);

    useEffect(() => { fetchCards(); }, [fetchCards]);
    useEffect(() => { setCardFilter("active"); }, [selectedAccount]);

    // ── Fetch transactions ────────────────────────────────────────────────────
    const fetchTransactions = useCallback(async () => {
        if (!filteredAccounts.length || !filteredAccounts[selectedAccount]) return;
        setLoading(true);
        try {
            const accountId = filteredAccounts[selectedAccount].accountNumber;
            const response = await API.get(`account/transactions/${accountId}`);
            const txData = Array.isArray(response.data?.data) ? response.data.data : [];
            setTransactions(txData);
        } catch (error) {
            console.error("Error fetching transactions:", error);
            setTransactions([]);
        } finally { setLoading(false); }
    }, [filteredAccounts, selectedAccount]);

    useEffect(() => { fetchTransactions(); }, [fetchTransactions]);

    // ── Refresh all in parallel ───────────────────────────────────────────────
    const handleRefresh = async () => {
        await Promise.all([fetchUserData(true), fetchCards(), fetchTransactions()]);
        showSnackbar("success", "Dashboard refreshed successfully");
    };

    // ── Helpers ───────────────────────────────────────────────────────────────
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', {
        style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(amount);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        showSnackbar("success", "Copied to clipboard!");
    };

    const getAccountIcon = (type) => {
        const t = type?.toLowerCase() || '';
        if (t.includes('savings')) return <FaWallet size={14} color={T.gold} />;
        if (t.includes('current')) return <FaBuilding size={14} color={T.gold} />;
        if (t.includes('salary')) return <FaBriefcase size={14} color={T.gold} />;
        return <FaUniversity size={14} color={T.gold} />;
    };

    const apiData = userData?.data || {};

    const filteredCards = useMemo(() => cards.filter(card => {
        if (cardFilter === "active") return card.status?.toLowerCase() === "active";
        if (cardFilter === "blocked") return card.status?.toLowerCase() === "blocked";
        return true;
    }), [cards, cardFilter]);

    const displayData = {
        name: apiData.firstName ? `${apiData.firstName} ${apiData.lastName}` : "Guest User",
        memberSince: apiData.createdAt ? new Date(apiData.createdAt).getFullYear() : "2024",
        accounts: filteredAccounts.map(acc => ({
            id: acc.accountNumber,
            type: acc.accountTypeName || "Account",
            accountNumber: String(acc.accountNumber),
            ifsc: acc.branchCode || "CNRB0001234",
            branch: acc.branchName || "Main Branch",
            city: acc.city || "Bengaluru",
            balance: acc.balance || 0,
            status: acc.status || "Active",
            openedDate: acc.openedDate || "N/A",
            icon: getAccountIcon(acc.accountTypeName),
        })),
        cards: filteredCards,
    };

    const totalBalance = useMemo(() =>
        displayData.accounts ? displayData.accounts.reduce((s, a) => s + a.balance, 0) : 0,
        [displayData.accounts]);

    const activeCount  = cards.filter(c => c.status?.toLowerCase() === "active").length;
    const blockedCount = cards.filter(c => c.status?.toLowerCase() === "blocked").length;
    const getCurrentAccountType = () => displayData.accounts?.[selectedAccount]?.type || "Account";

    // ── Loading skeleton ──────────────────────────────────────────────────────
    if (userLoading) return (
        <div style={{ padding: 24, maxWidth: 1400, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, padding: "18px 24px", background: T.navyDark, borderRadius: 16, border: `1px solid ${T.navyBorder}` }}>
                <div>
                    <div className="shimmer-cell" style={{ width: 260, height: 28, marginBottom: 10 }} />
                    <div className="shimmer-cell" style={{ width: 120, height: 14 }} />
                </div>
                <div className="shimmer-cell" style={{ width: 100, height: 38, borderRadius: 12 }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 370px", gap: 24 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div className="shimmer-cell" style={{ height: 160, borderRadius: 20 }} />
                    <div style={{ display: "flex", gap: 16 }}>
                        {[1,2,3].map(i => <div key={i} className="shimmer-cell" style={{ width: 260, height: 148, borderRadius: 16, flexShrink: 0 }} />)}
                    </div>
                    <div className="shimmer-cell" style={{ height: 200, borderRadius: 20 }} />
                </div>
                <div>
                    <div className="shimmer-cell" style={{ height: 440, borderRadius: 20 }} />
                </div>
            </div>
        </div>
    );

    // ── MAIN RENDER ───────────────────────────────────────────────────────────
    return (
        <div style={{
            padding: "24px",
            maxWidth: 1400,
            margin: "0 auto",
            fontFamily: "'DM Sans', sans-serif",
            minHeight: "100vh",
            color: T.offWhite,
            background: T.navyDeep,
        }}>

            {/* ── HEADER ──────────────────────────────────────────────────── */}
            <div className="fade-slide-up" style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
                padding: "18px 28px",
                background: T.navyDark,
                borderRadius: 18,
                border: `1px solid ${T.navyBorder}`,
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                position: "relative",
                overflow: "hidden",
            }}>
                {/* gold top-line accent */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${T.gold}, transparent)`, opacity: 0.8 }} />

                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{
                        width: 48, height: 48, borderRadius: 14,
                        background: `linear-gradient(135deg, ${T.navyMid}, ${T.navyLight})`,
                        border: `1.5px solid ${T.gold}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: `0 0 16px ${T.goldGlow}`,
                    }}>
                        <FaUserCircle size={24} color={T.gold} />
                    </div>
                    <div>
                        <h1 style={{
                            fontSize: 22, fontWeight: 600, color: T.white, margin: 0,
                            fontFamily: "'Playfair Display', serif", letterSpacing: "0.2px",
                        }}>
                            Welcome back, <span style={{ color: T.gold }}>{displayData.name.split(' ')[0]}</span>
                        </h1>
                        <p style={{ fontSize: 13, color: T.muted, margin: "3px 0 0", fontWeight: 400 }}>
                            Member Since {displayData.memberSince} &nbsp;·&nbsp; ABC Bank Customer Portal
                        </p>
                    </div>
                </div>

                <button
                    className="refresh-btn"
                    onClick={handleRefresh}
                    disabled={refreshing}
                >
                    <FaSync className={refreshing ? "spinning" : ""} size={13} />
                    {refreshing ? "Refreshing…" : "Refresh"}
                </button>
            </div>

            {/* ── MAIN GRID ────────────────────────────────────────────────── */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 370px", gap: 24 }}>

                {/* LEFT COLUMN */}
                <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>

                    {/* Total Balance Hero Card */}
                    <div className="fade-slide-up delay-1" style={{
                        background: `linear-gradient(135deg, ${T.navyMid} 0%, ${T.navyLight} 60%, #1A3D6B 100%)`,
                        borderRadius: 20,
                        padding: "28px 32px",
                        border: `1px solid ${T.navyBorder}`,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
                        position: "relative",
                        overflow: "hidden",
                    }}>
                        {/* Decorative circles */}
                        <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", border: `1px solid rgba(245,166,35,0.12)`, pointerEvents: "none" }} />
                        <div style={{ position: "absolute", top: -10, right: -10, width: 100, height: 100, borderRadius: "50%", border: `1px solid rgba(245,166,35,0.08)`, pointerEvents: "none" }} />
                        <div style={{ position: "absolute", bottom: -30, left: 60, width: 130, height: 130, borderRadius: "50%", background: "rgba(245,166,35,0.04)", pointerEvents: "none" }} />

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                            <div>
                                <span style={{ fontSize: 12, color: T.muted, textTransform: "uppercase", letterSpacing: "1px", fontWeight: 500 }}>
                                    Total Balance
                                </span>
                                <div style={{ fontSize: 12, color: T.mutedDark, marginTop: 2 }}>Across all accounts</div>
                            </div>
                            <button className="eye-btn" onClick={() => setShowBalance(v => !v)}>
                                {showBalance ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
                            </button>
                        </div>

                        <h2 style={{
                            fontSize: 40, fontWeight: 700, color: T.gold,
                            margin: "8px 0 20px",
                            fontFamily: "'Playfair Display', serif",
                            letterSpacing: "-0.5px",
                            textShadow: `0 0 24px rgba(245,166,35,0.25)`,
                        }}>
                            {showBalance ? formatCurrency(totalBalance) : "••••••••••"}
                        </h2>

                        {/* Account Filter Toggle */}
                        <div className="pill-group" style={{ display: "inline-flex" }}>
                            <button
                                className={`pill-btn ${accountFilter === "active" ? "active-blue" : ""}`}
                                onClick={() => setAccountFilter("active")}
                            >
                                <FaUnlock size={11} /> Active Accounts
                            </button>
                            <button
                                className={`pill-btn ${accountFilter === "inactive" ? "active-blue" : ""}`}
                                onClick={() => setAccountFilter("inactive")}
                            >
                                <FaLock size={11} /> Inactive Accounts
                            </button>
                        </div>
                    </div>

                    {/* Accounts Scroll Row */}
                    {displayData.accounts.length > 0 ? (<>
                        <div className="fade-slide-up delay-2" style={{
                            overflowX: "auto", overflowY: "hidden",
                            scrollBehavior: "smooth", WebkitOverflowScrolling: "touch",
                            paddingBottom: 6,
                        }}>
                            <div style={{ display: "flex", gap: 16, minWidth: "min-content" }}>
                                {displayData.accounts.map((account, index) => (
                                    <div
                                        key={account.id}
                                        className={`acc-card ${selectedAccount === index ? "acc-active" : ""}`}
                                        onClick={() => setSelectedAccount(index)}
                                    >
                                        <div>
                                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                                <div style={{
                                                    width: 28, height: 28, borderRadius: 8,
                                                    background: `rgba(245,166,35,0.12)`,
                                                    border: `1px solid rgba(245,166,35,0.25)`,
                                                    display: "flex", alignItems: "center", justifyContent: "center"
                                                }}>
                                                    {account.icon}
                                                </div>
                                                <span style={{ fontSize: 14, fontWeight: 600, color: T.offWhite }}>{account.type}</span>
                                            </div>
                                            <span style={{
                                                fontSize: 12, color: T.muted,
                                                fontFamily: "'JetBrains Mono', monospace", letterSpacing: "1px"
                                            }}>
                                                {showBalance ? `••••${account.accountNumber.slice(-4)}` : '••••'}
                                            </span>
                                        </div>
                                        <span style={{
                                            fontSize: 20, fontWeight: 700,
                                            color: selectedAccount === index ? T.gold : T.offWhite,
                                            fontFamily: "'JetBrains Mono', monospace",
                                        }}>
                                            {showBalance ? formatCurrency(account.balance) : '••••••'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Account Details */}
                        {displayData.accounts[selectedAccount] && (
                            <div className="section-card fade-slide-up delay-3 accent-left">
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                                    <h3 style={{
                                        fontSize: 17, fontWeight: 600, color: T.white,
                                        fontFamily: "'Playfair Display', serif",
                                    }}>
                                        {displayData.accounts[selectedAccount].type} Details
                                    </h3>
                                    <span className="status-badge">
                                        <FaCheckCircle size={11} />
                                        {displayData.accounts[selectedAccount].status}
                                    </span>
                                </div>

                                {/* Account number */}
                                <div style={{
                                    display: "flex", alignItems: "center", gap: 10,
                                    padding: "14px 18px",
                                    background: T.navyMid,
                                    borderRadius: 12,
                                    border: `1px solid ${T.navyBorder}`,
                                    marginBottom: 20,
                                }}>
                                    <span style={{
                                        flex: 1, fontSize: 17, fontWeight: 600,
                                        color: T.offWhite, letterSpacing: "1.5px",
                                        fontFamily: "'JetBrains Mono', monospace",
                                    }}>
                                        {showBalance ? displayData.accounts[selectedAccount].accountNumber : '•••• •••• •••• ••••'}
                                    </span>
                                    <button
                                        className="copy-btn-icon"
                                        onClick={() => copyToClipboard(displayData.accounts[selectedAccount].accountNumber)}
                                        disabled={!showBalance}
                                    >
                                        <FaCopy size={14} />
                                    </button>
                                </div>

                                <div className="gold-divider" style={{ marginBottom: 20 }} />

                                {/* Meta grid */}
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "18px 28px" }}>
                                    {[
                                        { label: "City", icon: <FaCity size={10} />, value: displayData.accounts[selectedAccount].city, copy: false },
                                        { label: "IFSC Code", icon: <FaUniversity size={10} />, value: displayData.accounts[selectedAccount].ifsc, copy: true },
                                        { label: "Branch", icon: <FaMapMarkerAlt size={10} />, value: displayData.accounts[selectedAccount].branch, copy: false },
                                        { label: "Opened On", icon: <FaCalendarAlt size={10} />, value: formatDate(displayData.accounts[selectedAccount].openedDate), copy: false },
                                    ].map(({ label, icon, value, copy }) => (
                                        <div key={label}>
                                            <div className="meta-label">{icon} {label}</div>
                                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                <span className="meta-value">
                                                    {showBalance ? value : '••••••'}
                                                </span>
                                                {copy && showBalance && (
                                                    <button className="copy-btn-icon" onClick={() => copyToClipboard(value)}>
                                                        <FaCopy size={10} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>) : (
                        <div style={{
                            textAlign: "center", padding: 40,
                            background: T.navyDark, borderRadius: 16,
                            border: `1px dashed ${T.navyBorder}`, color: T.muted,
                        }}>
                            No {accountFilter} accounts found
                        </div>
                    )}
                </div>

                {/* RIGHT COLUMN */}
                <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>

                    {/* Cards Section */}
                    <div className="section-card fade-slide-up delay-2" style={{ height: 440, display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                            <h3 style={{ fontSize: 16, fontWeight: 600, color: T.white }}>
                                {getCurrentAccountType()} Cards
                            </h3>
                            <div className="pill-group">
                                <button
                                    className={`pill-btn ${cardFilter === "active" ? "active-blue" : ""}`}
                                    onClick={() => setCardFilter("active")}
                                >
                                    <FaUnlock size={11} /> Active
                                    {activeCount > 0 && (
                                        <span style={{
                                            background: cardFilter === "active" ? "rgba(11,24,41,0.3)" : T.navyLight,
                                            borderRadius: "50%", width: 18, height: 18,
                                            display: "inline-flex", alignItems: "center", justifyContent: "center",
                                            fontSize: 11, fontWeight: 700,
                                        }}>{activeCount}</span>
                                    )}
                                </button>
                                <button
                                    className={`pill-btn ${cardFilter === "blocked" ? "active-red" : ""}`}
                                    onClick={() => setCardFilter("blocked")}
                                >
                                    <FaLock size={11} /> Blocked
                                    {blockedCount > 0 && (
                                        <span style={{
                                            background: cardFilter === "blocked" ? "rgba(255,255,255,0.2)" : T.navyLight,
                                            borderRadius: "50%", width: 18, height: 18,
                                            display: "inline-flex", alignItems: "center", justifyContent: "center",
                                            fontSize: 11, fontWeight: 700,
                                        }}>{blockedCount}</span>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div style={{ flex: 1, overflowY: "auto", paddingRight: 4, marginTop: 4 }}>
                            {cardsLoading ? (
                                [1, 2].map(i => (
                                    <div key={i} className="shimmer-cell" style={{ height: 185, borderRadius: 16, marginBottom: 14 }} />
                                ))
                            ) : displayData.cards.length > 0 ? (
                                displayData.cards.map((card, index) => (
                                    <div key={index} className="lift" style={{
                                        position: "relative",
                                        minHeight: 185,
                                        borderRadius: 18,
                                        background: card.color,
                                        marginBottom: 14,
                                        padding: 20,
                                        overflow: "hidden",
                                        border: `1px solid rgba(255,255,255,0.08)`,
                                        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                                    }}>
                                        {/* shimmer line */}
                                        <div style={{ position: "absolute", top: 0, left: "-50%", width: "200%", height: "100%", background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)", pointerEvents: "none" }} />

                                        {/* Type badge */}
                                        <div style={{
                                            position: "absolute", top: 14, right: 16,
                                            background: "rgba(255,255,255,0.12)",
                                            backdropFilter: "blur(6px)",
                                            border: "1px solid rgba(255,255,255,0.18)",
                                            padding: "3px 12px", borderRadius: 20,
                                            fontSize: 11, fontWeight: 700,
                                            color: card.isBlocked ? "#9CA3AF" : T.goldLight,
                                            letterSpacing: "0.5px",
                                        }}>
                                            {card.type.toUpperCase()}
                                            {card.isBlocked && " · BLOCKED"}
                                        </div>

                                        {/* Chip */}
                                        <div className="chip-shine" style={{
                                            position: "absolute", top: 44, left: 20,
                                            background: card.isBlocked
                                                ? "linear-gradient(135deg,#555,#333)"
                                                : `linear-gradient(135deg, ${card.chipColor}, #B8860B, ${card.chipColor})`,
                                        }} />

                                        {/* Card number */}
                                        <div style={{
                                            position: "absolute", top: 88, left: 20, right: 20,
                                            fontSize: 17, letterSpacing: "2.5px",
                                            fontWeight: 500, color: "rgba(255,255,255,0.9)",
                                            fontFamily: "'JetBrains Mono', monospace",
                                        }}>
                                            {showBalance ? card.cardNumber : '•••• •••• •••• ••••'}
                                        </div>

                                        {/* Bottom left */}
                                        <div style={{ position: "absolute", bottom: 16, left: 20 }}>
                                            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 2 }}>Card Holder</div>
                                            <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.9)", letterSpacing: "0.3px" }}>
                                                {showBalance ? card.cardHolder : '•••• ••••'}
                                            </div>
                                        </div>

                                        {/* Bottom right */}
                                        <div style={{ position: "absolute", bottom: 16, right: 20, textAlign: "right" }}>
                                            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 2 }}>Expires</div>
                                            <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>
                                                {showBalance ? card.expiry : '••/••'}
                                            </div>
                                        </div>

                                        {/* Network icon */}
                                        <div style={{ position: "absolute", bottom: 46, right: 20 }}>
                                            {card.networkIcon}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div style={{
                                    textAlign: "center", padding: "32px 20px",
                                    color: T.muted,
                                    background: T.navyMid,
                                    borderRadius: 14,
                                    border: `1px dashed ${T.navyBorder}`,
                                    fontSize: 14,
                                }}>
                                    No {cardFilter} cards found for this account.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="fade-slide-up delay-3">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                            <h3 style={{
                                fontSize: 16, fontWeight: 600, color: T.white,
                                display: "flex", alignItems: "center", gap: 8
                            }}>
                                <span style={{
                                    display: "inline-block", width: 4, height: 18,
                                    background: T.gold, borderRadius: 4,
                                }} />
                                Recent Transactions
                            </h3>
                            <button className="view-all-btn" onClick={() => navigate("/transactions")}>
                                View All <FaArrowRight size={11} />
                            </button>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            {loading ? (
                                [1, 2].map(i => (
                                    <div key={i} className="shimmer-cell" style={{ height: 72, borderRadius: 14 }} />
                                ))
                            ) : transactions.length > 0 ? (
                                transactions.slice(0, 2).map((transaction) => {
                                    const isCredit = transaction.transactionType === "DEPOSIT";
                                    return (
                                        <div key={transaction.transactionId || Math.random()} className="tx-row">
                                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                                <div style={{
                                                    width: 42, height: 42, borderRadius: 12,
                                                    background: isCredit ? T.successBg : T.dangerBg,
                                                    border: `1px solid ${isCredit ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                }}>
                                                    {isCredit
                                                        ? <FaArrowDown size={15} color={T.success} />
                                                        : <FaArrowUp size={15} color={T.danger} />
                                                    }
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: 14, fontWeight: 600, color: T.offWhite }}>
                                                        {showBalance ? (transaction.transactionType || "Transaction") : '••••••••'}
                                                    </div>
                                                    <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>
                                                        {showBalance ? formatDate(transaction.dateOfTransaction) : '••/••/••••'}
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ textAlign: "right" }}>
                                                <div style={{
                                                    fontSize: 16, fontWeight: 700,
                                                    color: isCredit ? T.success : T.danger,
                                                    fontFamily: "'JetBrains Mono', monospace",
                                                }}>
                                                    {showBalance
                                                        ? `${isCredit ? '+' : '-'}${transaction.transactionedAmount ? formatCurrency(transaction.transactionedAmount) : ''}`
                                                        : '••••••'
                                                    }
                                                </div>
                                                <div style={{ fontSize: 11, color: T.mutedDark, marginTop: 2 }}>
                                                    {showBalance && transaction.closingBalance
                                                        ? `Bal: ${formatCurrency(transaction.closingBalance)}`
                                                        : ''}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div style={{
                                    textAlign: "center", padding: 32,
                                    color: T.muted, background: T.navyDark,
                                    borderRadius: 14, border: `1px dashed ${T.navyBorder}`,
                                    fontSize: 14,
                                }}>
                                    No transactions found.
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
