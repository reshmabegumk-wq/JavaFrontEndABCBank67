// import { useState, useEffect } from "react";
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
// } from "react-icons/fa";
// import API from "../../api";
// import { useSnackbar } from "../../Context/SnackbarContext";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//     const { showSnackbar } = useSnackbar();
//     const [showBalance, setShowBalance] = useState(true);
//     const [selectedAccount, setSelectedAccount] = useState(0);
//     console.log("selectedAccount", selectedAccount);

//     const [transactions, setTransactions] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [userData, setUserData] = useState(null);
//     const [userLoading, setUserLoading] = useState(true);

//     const [cards, setCards] = useState([]);
//     const [cardsLoading, setCardsLoading] = useState(false);

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const userId = localStorage.getItem("userId");
//                 if (userId) {
//                     const response = await API.get(`users/${userId}`);
//                     console.log("User Data fetched:", response.data);
//                     setUserData(response.data);
//                     // Store account numbers in localStorage for Transactions component
//                     if (response.data?.data?.accounts) {
//                         response.data.data.accounts.forEach(acc => {
//                             const type = acc.accountTypeName ? acc.accountTypeName.toLowerCase() : "savings"; // Default to savings if null
//                             console.log(`Processing Account: ${acc.accountNumber}, Type: ${acc.accountTypeName || "null (defaulting to savings)"}`);

//                             const savingsAccountId = response?.data?.data.accounts[0].accountNumber;
//                             const currentAccountId = response?.data?.data.accounts[1].accountNumber;
//                             localStorage.setItem("savingsAccount", savingsAccountId);
//                             localStorage.setItem("currentAccount", currentAccountId);
//                             console.log("savingsAccountId" , savingsAccountId);
//                             console.log("currentAccountId" , currentAccountId);
                            

//                             // if (type.includes("savings")) {
//                             //     localStorage.setItem("savingsAccount", acc.accountNumber);
//                             //     console.log("Savings Account set to:", acc.accountNumber);
//                             // } else if (type.includes("current")) {
//                             //     localStorage.setItem("currentAccount", acc.accountNumber);
//                             //     console.log("Current Account set to:", acc.accountNumber);
//                             // }
//                         });
//                     }
//                 }
//             } catch (error) {
//                 console.error("Error fetching user data:", error);
//                 showSnackbar("error", "Failed to load user profile");
//             } finally {
//                 setUserLoading(false);
//             }
//         };

//         fetchUserData();
//     }, []);


//     const fetchCards = async () => {
//         if (userData?.data?.accounts && userData.data.accounts.length > 0) {
//             setCardsLoading(true);
//             setCards([]); // Clear previous cards when account changes
//             try {
//                 // For now, let's just fetch cards for the first account as per the user's request example
//                 // In a real app, we might want to fetch for all accounts via Promise.all
//                 const savingsAccountId = userData.data.accounts[0].accountNumber;
//                 const currentAccountId = userData.data.accounts[1].accountNumber;

//                 let accountId;
//                 if (selectedAccount === 1) {
//                     accountId = currentAccountId;
//                 } else {
//                     accountId = savingsAccountId;
//                 }

//                 const response = await API.get(`account/userCardList/${accountId}`);
//                 console.log("Cards fetched:", response.data);

//                 if (!response?.data?.data) {
//                     console.log("No data returned from API");
//                     return;
//                 }

//                 if (response.data && response.data.status && Array.isArray(response.data.data)) {

//                     const mappedCards = !response?.data?.data ? [] : response.data.data.map((card, index) => ({
//                         type: card.cardTypeName || "Debit Card",
//                         cardNumber: card.cardNumber ? String(card.cardNumber).replace(/(\d{4})(?=\d)/g, '$1 ') : "**** **** **** ****", // Basic formatting
//                         cardHolder: userData.data.firstName ? `${userData.data.firstName.toUpperCase()} ${userData.data.lastName.toUpperCase()}` : "USER",
//                         expiry: card.expiryDate ? new Date(card.expiryDate).toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' }) : "MM/YY", // Simple format
//                         network: "Visa", // Hardcoded or derive if possible
//                         status: card.status || "Active",
//                         color: index % 2 === 0 ? "linear-gradient(135deg, #1a237e, #283593)" : "linear-gradient(135deg, #0f172a, #334155)", // Alternating colors
//                     }));
//                     console.log("Processing card:", response?.data?.data);

//                     setCards(mappedCards);
//                 }
//             } catch (error) {
//                 console.error("Error fetching cards:", error);
//                 showSnackbar("error", "Failed to load card details");
//             } finally {
//                 setCardsLoading(false);
//             }
//         }
//     };

//     console.log("cards", cards);


//     useEffect(() => {
//         fetchCards();
//     }, [userData, selectedAccount]);


//     useEffect(() => {
//         const fetchTransactions = async () => {
//             // Ensure userData is available and has the selected account
//             if (userData?.data?.accounts && userData.data.accounts[selectedAccount]) {
//                 setLoading(true);
//                 try {
//                     const accountId = userData.data.accounts[selectedAccount].accountNumber;
//                     console.log(`Fetching transactions for Account ID: ${accountId}`);
//                     const response = await API.get(`account/transactions/${accountId}`);
//                     console.log("Transactions fetched:", response.data);

//                     const txData = response.data && Array.isArray(response.data.data) ? response.data.data : [];
//                     setTransactions(txData);
//                 } catch (error) {
//                     console.error("Error fetching transactions:", error);
//                     showSnackbar("error", "Failed to load recent transactions");
//                     setTransactions([]);
//                 } finally {
//                     setLoading(false);
//                 }
//             }
//         };

//         fetchTransactions();
//     }, [selectedAccount, userData]);

//     // Sample user data (Fallback/Reference)
//     /*
//     const userData = {
//         name: "John Anderson",
//         customerId: "CUST-2024-12345",
//         memberSince: "2018",
//         accounts: [ ... ]
//     };
//     */

//     // Fallback data if API fails or is loading
//     const apiData = userData?.data || {}; // Access the nested 'data' object from the API response

//     const displayData = {
//         name: apiData.firstName ? `${apiData.firstName} ${apiData.lastName}` : "Guest User",
//         customerId: apiData.userId ? `ID: ${apiData.userId}` : "---",
//         memberSince: "2024", // Hardcoded as not in API
//         accounts: Array.isArray(apiData.accounts) ? apiData.accounts.map(acc => ({
//             id: acc.accountNumber,
//             type: acc.accountTypeName || "_", // Default if null
//             accountNumber: String(acc.accountNumber),
//             ifsc: acc.branchCode || "ABC0001234",
//             branch: acc.branchName || "Main Branch",
//             balance: acc.balance || 0,
//             currency: "INR",
//             // interestRate: "4.0%", // Hardcoded
//             openedDate: "N/A", // Hardcoded
//             status: acc.status || "Active",
//             cardLinked: true
//         })) : [],
//         cards: cards,
//         balanceStats: { // Calculated from accounts or defaults
//             income: 0,
//             expense: 0,
//             savings: Array.isArray(apiData.accounts) ? apiData.accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0) : 0
//         },
//         notifications: 3
//     };

//     if (userLoading || !displayData) {
//         return <div style={{ textAlign: "center", padding: "50px", fontSize: "20px", color: "var(--color-text)" }}>Loading user data...</div>;
//     }

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
//         // You can add a toast notification here
//     };

//     const handleNavigateTransaction = () => {
//        const accountNumber= selectedAccount === 0 ? "Savings" :"Current";
//         navigate("/transactions" , { state: { accountNumber:accountNumber } });
//     }

//     return (
//         <div style={styles.container}>
//             {/* Welcome Header */}
//             <div style={styles.header}>
//                 <div style={styles.welcomeSection}>
//                     <div style={styles.avatarContainer}>
//                         <span style={styles.avatarText}>{displayData.name ? displayData.name.charAt(0) : 'U'}</span>
//                     </div>
//                     <div style={styles.welcomeText}>
//                         <h1 style={styles.greeting}>Welcome back, {displayData.name ? displayData.name.split(' ')[0] : 'User'}! 👋</h1>
//                         <p style={styles.subGreeting}>
//                             <span style={styles.memberSince}>Since {displayData.memberSince}</span>
//                         </p>
//                     </div>
//                 </div>
//                 <div style={styles.headerActions}>
//                     <button style={styles.notificationBtn}>
//                         <FaBell size={18} />
//                         {displayData.notifications > 0 && (
//                             <span style={styles.notificationBadge}>
//                                 {displayData.notifications}
//                             </span>
//                         )}
//                     </button>
//                     <button style={styles.notificationBtn}>
//                         <FaCog size={18} />
//                     </button>
//                 </div>
//             </div>

//             {/* Main Grid */}
//             <div style={styles.mainGrid}>
//                 {/* Left Column - Accounts & Cards */}
//                 <div style={styles.leftColumn}>
//                     {/* Total Balance Card */}
//                     <div style={styles.totalBalanceCard}>
//                         <div style={styles.totalBalanceHeader}>
//                             <span style={styles.totalBalanceLabel}>Total Balance (All Accounts)</span>
//                             <button
//                                 style={styles.visibilityToggle}
//                                 onClick={() => setShowBalance(!showBalance)}
//                             >
//                                 {showBalance ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
//                             </button>
//                         </div>
//                         <h2 style={styles.totalBalanceAmount}>
//                             {showBalance ? formatCurrency(
//                                 displayData.accounts ? displayData.accounts.reduce((sum, acc) => sum + acc.balance, 0) : 0
//                             ) : '••••••••'}
//                         </h2>
//                         <div style={styles.totalBalanceFooter}>
//                             <span style={styles.totalBalanceChange}>
//                                 <FaArrowUp size={12} color="#10b981" /> +2.5% from last month
//                             </span>
//                         </div>
//                     </div>

//                     {/* Account Selector */}
//                     <div style={styles.accountSelector}>
//                         {displayData.accounts && displayData.accounts.map((account, index) => (
//                             <div
//                                 key={account.id}
//                                 style={{
//                                     ...styles.accountTab,
//                                     ...(selectedAccount === index ? styles.accountTabActive : {})
//                                 }}
//                                 onClick={() => setSelectedAccount(index)}
//                             >
//                                 <div style={styles.accountTabInfo}>
//                                     <span style={styles.accountTabType}>{account.type}</span>
//                                     <span style={styles.accountTabNumber}>
//                                         {account.accountNumber ? account.accountNumber.slice(-4) : '****'}
//                                     </span>
//                                 </div>
//                                 <span style={styles.accountTabBalance}>
//                                     {showBalance ? formatCurrency(account.balance) : '••••••'}
//                                 </span>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Selected Account Details */}
//                     {displayData.accounts && displayData.accounts[selectedAccount] && (
//                         <div style={styles.accountDetailsCard}>
//                             <div style={styles.accountDetailsHeader}>
//                                 <h3 style={styles.accountDetailsTitle}>
//                                     {displayData.accounts[selectedAccount].type}
//                                 </h3>
//                                 <span style={styles.accountStatus}>
//                                     <FaCheckCircle size={14} color="#10b981" />
//                                     {displayData.accounts[selectedAccount].status}
//                                 </span>
//                             </div>

//                             <div style={styles.accountNumberRow}>
//                                 <span style={styles.accountNumber}>
//                                     {displayData.accounts[selectedAccount].accountNumber}
//                                 </span>
//                                 <button
//                                     style={styles.copyBtn}
//                                     onClick={() => copyToClipboard(displayData.accounts[selectedAccount].accountNumber)}
//                                 >
//                                     <FaCopy size={14} />
//                                 </button>
//                             </div>

//                             <div style={styles.accountMetaGrid}>
//                                 <div style={styles.accountMetaItem}>
//                                     <span style={styles.metaLabel}>IFSC Code</span>
//                                     <div style={styles.metaValueRow}>
//                                         <span style={styles.metaValue}>{displayData.accounts[selectedAccount].ifsc}</span>
//                                         <button
//                                             style={styles.copyBtnSmall}
//                                             onClick={() => copyToClipboard(displayData.accounts[selectedAccount].ifsc)}
//                                         >
//                                             <FaCopy size={12} />
//                                         </button>
//                                     </div>
//                                 </div>
//                                 <div style={styles.accountMetaItem}>
//                                     <span style={styles.metaLabel}>Branch</span>
//                                     <span style={styles.metaValue}>{displayData.accounts[selectedAccount].branch}</span>
//                                 </div>
//                                 <div style={styles.accountMetaItem}>
//                                     <span style={styles.metaLabel}>Interest Rate</span>
//                                     <span style={styles.metaValue}>{displayData.accounts[selectedAccount].interestRate}</span>
//                                 </div>
//                                 <div style={styles.accountMetaItem}>
//                                     <span style={styles.metaLabel}>Opened On</span>
//                                     <span style={styles.metaValue}>{displayData.accounts[selectedAccount].openedDate || displayData.accounts[selectedAccount].maturityDate}</span>
//                                 </div>
//                             </div>

//                             <div style={styles.accountActions}>
//                                 <button style={styles.accountActionBtn}>View Statement</button>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Right Column - Transactions & Insights */}
//                 <div style={styles.rightColumn}>
//                     {/* Cards Section */}
//                     <div style={styles.cardsSection}>
//                         <div style={styles.sectionHeader}>
//                             <h3 style={styles.sectionTitle}>Your Cards</h3>
//                         </div>

//                         <div style={styles.cardsGrid}>
//                             {displayData.cards && displayData.cards.map((card, index) => (
//                                 <div
//                                     key={index}
//                                     style={{
//                                         ...styles.card,
//                                         background: card.color,
//                                     }}
//                                 >
//                                     <div style={styles.cardHeader}>
//                                         <span style={styles.cardNetwork}>{card.network}</span>
//                                         <span style={styles.cardType}>{card.type}</span>
//                                     </div>
//                                     <div style={styles.cardNumber}>
//                                         {card.cardNumber}
//                                     </div>
//                                     <div style={styles.cardFooter}>
//                                         <div style={styles.cardHolder}>
//                                             <span style={styles.cardLabel}>Card Holder</span>
//                                             <span style={styles.cardValue}>{card.cardHolder}</span>
//                                         </div>
//                                         <div style={styles.cardExpiry}>
//                                             <span style={styles.cardLabel}>Expires</span>
//                                             <span style={styles.cardValue}>{card.expiry}</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Recent Transactions */}
//                     <div style={{ ...styles.sectionHeader, marginTop: '24px' }}>
//                         <h3 style={styles.sectionTitle}>Recent Transactions</h3>
//                         <button style={styles.viewAllBtn} onClick={handleNavigateTransaction}>View All</button>
//                     </div>

//                     <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//                         {loading ? (
//                             <p style={{ textAlign: "center", padding: "20px", color: "var(--color-muted)" }}>Loading transactions...</p>
//                         ) : transactions.length > 0 ? (
//                             transactions.map((transaction) => {
//                                 const isCredit = transaction.transactionType === "DEPOSIT"; // Based on User JSON
//                                 return (
//                                     <div key={transaction.transactionId || Math.random()} style={{
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'space-between',
//                                         padding: '16px',
//                                         background: 'var(--color-surface)',
//                                         borderRadius: '16px',
//                                         border: '1px solid var(--color-border)',
//                                     }}>
//                                         <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
//                                             <div style={{
//                                                 ...styles.transactionIcon,
//                                                 width: '40px',
//                                                 height: '40px',
//                                                 borderRadius: '12px',
//                                                 display: 'flex',
//                                                 alignItems: 'center',
//                                                 justifyContent: 'center',
//                                                 backgroundColor: isCredit ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
//                                                 color: isCredit ? '#10b981' : '#ef4444'
//                                             }}>
//                                                 {isCredit ? <FaArrowDown /> : <FaArrowUp />}
//                                             </div>
//                                             <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
//                                                 <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--color-text)' }}>
//                                                     {transaction.transactionType || "Transaction"}
//                                                 </span>
//                                                 <span style={{ fontSize: '12px', color: 'var(--color-muted)' }}>
//                                                     {transaction.dateOfTransaction || "N/A"}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
//                                             <span style={{
//                                                 fontSize: '15px',
//                                                 fontWeight: '600',
//                                                 color: isCredit ? '#10b981' : 'var(--color-text)'
//                                             }}>
//                                                 {isCredit ? '+' : '-'}
//                                                 {transaction.transactionedAmount ? formatCurrency(transaction.transactionedAmount) : "₹0.00"}
//                                             </span>
//                                             <span style={{ fontSize: '12px', color: 'var(--color-muted)' }}>
//                                                 {transaction.closingBalance ? `Bal: ${formatCurrency(transaction.closingBalance)}` : ""}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 );
//                             })
//                         ) : (
//                             <p style={{ textAlign: "center", padding: "20px", color: "var(--color-muted)" }}>No transactions found.</p>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const styles = {
//     container: {
//         padding: "24px",
//         maxWidth: "1600px",
//         margin: "0 auto",
//         fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
//     },
//     header: {
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: "28px",
//     },
//     welcomeSection: {
//         display: "flex",
//         alignItems: "center",
//         gap: "16px",
//     },
//     avatarContainer: {
//         width: "56px",
//         height: "56px",
//         borderRadius: "16px",
//         background: "linear-gradient(135deg, #4361ee, #3a0ca3)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         fontSize: "24px",
//         fontWeight: "600",
//         color: "#ffffff",
//         boxShadow: "0 8px 20px rgba(67, 97, 238, 0.2)",
//     },
//     welcomeText: {
//         display: "flex",
//         flexDirection: "column",
//         gap: "6px",
//     },
//     greeting: {
//         fontSize: "28px",
//         fontWeight: "700",
//         color: "var(--color-text)",
//         margin: 0,
//     },
//     subGreeting: {
//         display: "flex",
//         alignItems: "center",
//         gap: "16px",
//         margin: 0,
//         color: "var(--color-muted)",
//         fontSize: "14px",
//     },
//     customerId: {
//         color: "var(--color-text-secondary)",
//         fontWeight: "500",
//     },
//     badge: {
//         background: "linear-gradient(135deg, rgba(67, 97, 238, 0.15), rgba(58, 12, 163, 0.15))",
//         color: "#4361ee",
//         padding: "4px 12px",
//         borderRadius: "20px",
//         fontWeight: "600",
//     },
//     memberSince: {
//         color: "var(--color-muted)",
//     },
//     headerActions: {
//         display: "flex",
//         gap: "12px",
//     },
//     notificationBtn: {
//         position: "relative",
//         padding: "12px",
//         borderRadius: "12px",
//         border: "1px solid var(--color-border)",
//         background: "var(--color-surface)",
//         color: "var(--color-text-secondary)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         cursor: "pointer",
//         transition: "all 0.2s",
//     },
//     notificationBadge: {
//         position: "absolute",
//         top: "-6px",
//         right: "-6px",
//         background: "#ef4444",
//         color: "#ffffff",
//         fontSize: "11px",
//         fontWeight: "600",
//         width: "20px",
//         height: "20px",
//         borderRadius: "50%",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     settingsBtn: {
//         width: "44px",
//         height: "44px",
//         borderRadius: "12px",
//         border: "1px solid var(--color-border)",
//         background: "var(--color-surface)",
//         color: "var(--color-text-secondary)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         cursor: "pointer",
//         transition: "all 0.2s",
//     },
//     quickActions: {
//         display: "flex",
//         gap: "12px",
//         marginBottom: "32px",
//         flexWrap: "wrap",
//     },
//     actionBtn: {
//         display: "flex",
//         alignItems: "center",
//         gap: "10px",
//         padding: "12px 20px",
//         background: "var(--color-surface)",
//         border: "1px solid var(--color-border)",
//         borderRadius: "14px",
//         color: "var(--color-text)",
//         fontSize: "14px",
//         fontWeight: "600",
//         cursor: "pointer",
//         transition: "all 0.2s",
//     },
//     actionIcon: {
//         width: "32px",
//         height: "32px",
//         borderRadius: "10px",
//         background: "var(--color-bg)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         color: "#4361ee",
//     },
//     mainGrid: {
//         display: "grid",
//         gridTemplateColumns: "1.2fr 0.8fr",
//         gap: "24px",
//     },
//     leftColumn: {
//         display: "flex",
//         flexDirection: "column",
//         gap: "24px",
//     },
//     rightColumn: {
//         display: "flex",
//         flexDirection: "column",
//         gap: "24px",
//     },
//     totalBalanceCard: {
//         background: "linear-gradient(135deg, #0f172a, #1e293b)",
//         borderRadius: "24px",
//         padding: "24px",
//         color: "#ffffff",
//     },
//     totalBalanceHeader: {
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: "12px",
//     },
//     totalBalanceLabel: {
//         fontSize: "14px",
//         color: "#cbd5e1",
//         fontWeight: "500",
//     },
//     visibilityToggle: {
//         background: "rgba(255,255,255,0.1)",
//         border: "1px solid rgba(255,255,255,0.2)",
//         borderRadius: "10px",
//         width: "36px",
//         height: "36px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         color: "#ffffff",
//         cursor: "pointer",
//     },
//     totalBalanceAmount: {
//         fontSize: "42px",
//         fontWeight: "700",
//         margin: "0 0 8px 0",
//     },
//     totalBalanceFooter: {
//         fontSize: "13px",
//         color: "#94a3b8",
//     },
//     totalBalanceChange: {
//         display: "flex",
//         alignItems: "center",
//         gap: "4px",
//     },
//     accountSelector: {
//         display: "flex",
//         gap: "12px",
//         overflowX: "auto",
//         padding: "4px 0",
//     },
//     accountTab: {
//         flex: 1,
//         minWidth: "180px",
//         background: "var(--color-surface)",
//         border: "1px solid var(--color-border)",
//         borderRadius: "16px",
//         padding: "16px",
//         cursor: "pointer",
//         transition: "all 0.2s",
//     },
//     accountTabActive: {
//         borderColor: "#4361ee",
//         background: "var(--sidebar-active-bg)",
//         boxShadow: "0 4px 12px rgba(67,97,238,0.1)",
//     },
//     accountTabInfo: {
//         display: "flex",
//         flexDirection: "column",
//         gap: "4px",
//         marginBottom: "12px",
//     },
//     accountTabType: {
//         fontSize: "15px",
//         fontWeight: "600",
//         color: "var(--color-text)",
//     },
//     accountTabNumber: {
//         fontSize: "13px",
//         color: "var(--color-text-secondary)",
//     },
//     accountTabBalance: {
//         fontSize: "20px",
//         fontWeight: "700",
//         color: "var(--color-text)",
//     },
//     accountDetailsCard: {
//         background: "var(--color-surface)",
//         borderRadius: "20px",
//         padding: "24px",
//         boxShadow: "var(--shadow-sm)",
//         border: "1px solid var(--color-border)",
//     },
//     accountDetailsHeader: {
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: "16px",
//     },
//     accountDetailsTitle: {
//         fontSize: "18px",
//         fontWeight: "600",
//         color: "var(--color-text)",
//         margin: 0,
//     },
//     accountStatus: {
//         display: "flex",
//         alignItems: "center",
//         gap: "6px",
//         fontSize: "13px",
//         color: "#10b981",
//         fontWeight: "600",
//         padding: "6px 12px",
//         background: "rgba(16, 185, 129, 0.1)",
//         borderRadius: "20px",
//     },
//     accountNumberRow: {
//         display: "flex",
//         alignItems: "center",
//         gap: "10px",
//         marginBottom: "20px",
//     },
//     accountNumber: {
//         fontSize: "20px",
//         fontWeight: "600",
//         color: "var(--color-text)",
//         letterSpacing: "2px",
//     },
//     copyBtn: {
//         background: "none",
//         border: "none",
//         color: "var(--color-muted)",
//         cursor: "pointer",
//         padding: "8px",
//         borderRadius: "8px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     accountMetaGrid: {
//         display: "grid",
//         gridTemplateColumns: "repeat(2, 1fr)",
//         gap: "20px",
//         marginBottom: "24px",
//         padding: "20px 0",
//         borderTop: "1px solid var(--color-border)",
//         borderBottom: "1px solid var(--color-border)",
//     },
//     accountMetaItem: {
//         display: "flex",
//         flexDirection: "column",
//         gap: "4px",
//     },
//     metaLabel: {
//         fontSize: "12px",
//         color: "var(--color-muted)",
//         textTransform: "uppercase",
//         letterSpacing: "0.5px",
//     },
//     metaValue: {
//         fontSize: "15px",
//         fontWeight: "600",
//         color: "var(--color-text)",
//     },
//     metaValueRow: {
//         display: "flex",
//         alignItems: "center",
//         gap: "8px",
//     },
//     copyBtnSmall: {
//         background: "none",
//         border: "none",
//         color: "var(--color-muted)",
//         cursor: "pointer",
//         padding: "4px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     accountActions: {
//         display: "flex",
//         gap: "12px",
//     },
//     accountActionBtn: {
//         flex: 1,
//         padding: "14px",
//         background: "var(--color-bg)",
//         border: "1px solid #e2e8f0",
//         borderRadius: "12px",
//         color: "#475569",
//         fontSize: "14px",
//         fontWeight: "600",
//         cursor: "pointer",
//     },
//     accountActionBtnPrimary: {
//         flex: 1,
//         padding: "14px",
//         background: "linear-gradient(135deg, #4361ee, #3a0ca3)",
//         border: "none",
//         borderRadius: "12px",
//         color: "#ffffff",
//         fontSize: "14px",
//         fontWeight: "600",
//         cursor: "pointer",
//     },
//     cardsSection: {
//         background: "var(--color-surface)",
//         borderRadius: "20px",
//         padding: "24px",
//         border: "1px solid var(--color-border)",
//     },
//     sectionHeader: {
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: "20px",
//     },
//     sectionTitle: {
//         fontSize: "18px",
//         fontWeight: "600",
//         color: "var(--color-text)",
//         margin: 0,
//     },
//     viewAllBtn: {
//         background: "none",
//         border: "none",
//         color: "#4361ee",
//         fontSize: "14px",
//         fontWeight: "600",
//         cursor: "pointer",
//     },
//     cardsGrid: {
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
//         gap: "16px",
//     },
//     card: {
//         padding: "20px",
//         borderRadius: "16px",
//         color: "#ffffff",
//         position: "relative",
//         minHeight: "160px",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//     },
//     cardHeader: {
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//     },
//     cardNetwork: {
//         fontSize: "14px",
//         fontWeight: "600",
//         opacity: 0.9,
//     },
//     cardType: {
//         fontSize: "12px",
//         padding: "4px 10px",
//         background: "rgba(255,255,255,0.2)",
//         borderRadius: "20px",
//     },
//     cardNumber: {
//         fontSize: "16px",
//         letterSpacing: "2px",
//         fontWeight: "500",
//         margin: "12px 0",
//     },
//     cardFooter: {
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//     },
//     cardHolder: {
//         display: "flex",
//         flexDirection: "column",
//         gap: "2px",
//     },
//     cardExpiry: {
//         display: "flex",
//         flexDirection: "column",
//         gap: "2px",
//     },
//     cardLabel: {
//         fontSize: "10px",
//         opacity: 0.7,
//         textTransform: "uppercase",
//     },
//     cardValue: {
//         fontSize: "13px",
//         fontWeight: "600",
//     },
//     contactlessBadge: {
//         position: "absolute",
//         top: "20px",
//         right: "20px",
//         display: "flex",
//         alignItems: "center",
//         gap: "4px",
//         fontSize: "11px",
//         padding: "4px 8px",
//         background: "rgba(255,255,255,0.2)",
//         borderRadius: "20px",
//     },
//     transactionsCard: {
//         background: "var(--color-surface)",
//         borderRadius: "20px",
//         padding: "24px",
//         border: "1px solid var(--color-border)",
//     },
//     transactionsList: {
//         display: "flex",
//         flexDirection: "column",
//         gap: "16px",
//     },
//     transactionItem: {
//         display: "flex",
//         alignItems: "center",
//         gap: "14px",
//         padding: "8px 0",
//         borderBottom: "1px solid var(--color-border)",
//     },
//     transactionIconContainer: {
//         flexShrink: 0,
//     },
//     transactionIcon: {
//         width: "40px",
//         height: "40px",
//         borderRadius: "12px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     transactionDetails: {
//         flex: 1,
//     },
//     transactionMain: {
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: "4px",
//     },
//     transactionDesc: {
//         fontSize: "15px",
//         fontWeight: "600",
//         color: "var(--color-text)",
//     },
//     transactionAmount: {
//         fontSize: "15px",
//         fontWeight: "700",
//     },
//     transactionMeta: {
//         display: "flex",
//         alignItems: "center",
//         gap: "12px",
//         fontSize: "12px",
//         color: "var(--color-muted)",
//     },
//     transactionDate: {
//         display: "flex",
//         alignItems: "center",
//         gap: "4px",
//     },
//     transactionCategory: {
//         padding: "2px 8px",
//         background: "var(--sidebar-hover)",
//         borderRadius: "12px",
//     },
//     pendingBadge: {
//         padding: "2px 8px",
//         background: "#fff3cd",
//         color: "#856404",
//         borderRadius: "12px",
//         fontSize: "11px",
//         fontWeight: "600",
//     },
//     insightsCard: {
//         background: "var(--color-surface)",
//         borderRadius: "20px",
//         padding: "24px",
//         border: "1px solid var(--color-border)",
//     },
//     insightsContent: {
//         display: "flex",
//         flexDirection: "column",
//         gap: "20px",
//     },
//     insightItem: {
//         display: "flex",
//         flexDirection: "column",
//         gap: "8px",
//     },
//     insightLabel: {
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         fontSize: "14px",
//         color: "var(--color-text-secondary)",
//     },
//     insightValue: {
//         fontSize: "16px",
//         fontWeight: "700",
//         color: "var(--color-text)",
//     },
//     progressBar: {
//         width: "100%",
//         height: "8px",
//         background: "var(--color-border)",
//         borderRadius: "4px",
//         overflow: "hidden",
//     },
//     progressFill: {
//         height: "100%",
//         borderRadius: "4px",
//     },
//     insightSubtext: {
//         fontSize: "12px",
//         color: "var(--color-muted)",
//     },
//     spendingCategories: {
//         display: "flex",
//         flexDirection: "column",
//         gap: "12px",
//     },
//     categoryItem: {
//         display: "flex",
//         alignItems: "center",
//         gap: "10px",
//         fontSize: "14px",
//     },
//     categoryDot: {
//         width: "10px",
//         height: "10px",
//         borderRadius: "50%",
//     },
//     categoryName: {
//         flex: 1,
//         color: "var(--color-text-secondary)",
//     },
//     categoryAmount: {
//         fontWeight: "600",
//         color: "var(--color-text)",
//     },
//     securityCard: {
//         background: "var(--color-surface)",
//         borderRadius: "20px",
//         padding: "24px",
//         border: "1px solid var(--color-border)",
//     },
//     securityHeader: {
//         display: "flex",
//         alignItems: "center",
//         gap: "10px",
//         marginBottom: "16px",
//     },
//     securityTitle: {
//         fontSize: "16px",
//         fontWeight: "600",
//         color: "var(--color-text)",
//     },
//     securityGrid: {
//         display: "grid",
//         gridTemplateColumns: "repeat(2, 1fr)",
//         gap: "16px",
//     },
//     securityItem: {
//         display: "flex",
//         alignItems: "center",
//         gap: "8px",
//         fontSize: "13px",
//         color: "var(--color-text-secondary)",
//     },
// };

// // Add responsive styles
// const responsiveStyles = `
//     @media (max-width: 1200px) {
//         .main-grid {
//             grid-template-columns: 1fr !important;
//         }
//     }
    
//     @media (max-width: 768px) {
//         .container {
//             padding: 16px !important;
//         }
        
//         .greeting {
//             font-size: 22px !important;
//         }
        
//         .total-balance-amount {
//             font-size: 32px !important;
//         }
        
//         .cards-grid {
//             grid-template-columns: 1fr !important;
//         }
        
//         .security-grid {
//             grid-template-columns: 1fr !important;
//         }
//     }
    
//     @media (max-width: 640px) {
//         .quick-actions {
//             flex-wrap: nowrap !important;
//             overflow-x: auto !important;
//             padding-bottom: 8px !important;
//         }
        
//         .account-meta-grid {
//             grid-template-columns: 1fr !important;
//         }
        
//         .account-actions {
//             flex-direction: column !important;
//         }
//     }
// `;

// // Inject responsive styles
// const styleSheet = document.createElement("style");
// styleSheet.textContent = responsiveStyles;
// document.head.appendChild(styleSheet);

// export default Dashboard;

import { useState, useEffect } from "react";
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
    FaMapMarkerAlt
} from "react-icons/fa";
import API from "../../api";
import { useSnackbar } from "../../Context/SnackbarContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { showSnackbar } = useSnackbar();
    const [showBalance, setShowBalance] = useState(true);
    const [selectedAccount, setSelectedAccount] = useState(0);
    console.log("selectedAccount", selectedAccount);

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [userLoading, setUserLoading] = useState(true);

    const [cards, setCards] = useState([]);
    const [cardsLoading, setCardsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (userId) {
                    const response = await API.get(`users/${userId}`);
                    console.log("User Data fetched:", response.data);
                    setUserData(response.data);
                    // Store account numbers in localStorage for Transactions component
                    if (response.data?.data?.accounts) {
                        response.data.data.accounts.forEach(acc => {
                            const type = acc.accountTypeName ? acc.accountTypeName.toLowerCase() : "savings";
                            console.log(`Processing Account: ${acc.accountNumber}, Type: ${acc.accountTypeName || "null (defaulting to savings)"}`);

                            const savingsAccountId = response?.data?.data.accounts[0].accountNumber;
                            const currentAccountId = response?.data?.data.accounts[1].accountNumber;
                            localStorage.setItem("savingsAccount", savingsAccountId);
                            localStorage.setItem("currentAccount", currentAccountId);
                            console.log("savingsAccountId" , savingsAccountId);
                            console.log("currentAccountId" , currentAccountId);
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                showSnackbar("error", "Failed to load user profile");
            } finally {
                setUserLoading(false);
            }
        };

        fetchUserData();
    }, []);


    const fetchCards = async () => {
        if (userData?.data?.accounts && userData.data.accounts.length > 0) {
            setCardsLoading(true);
            setCards([]);
            try {
                const savingsAccountId = userData.data.accounts[0].accountNumber;
                const currentAccountId = userData.data.accounts[1].accountNumber;

                let accountId;
                if (selectedAccount === 1) {
                    accountId = currentAccountId;
                } else {
                    accountId = savingsAccountId;
                }

                const response = await API.get(`account/userCardList/${accountId}`);
                console.log("Cards fetched:", response.data);

                if (!response?.data?.data) {
                    console.log("No data returned from API");
                    return;
                }

                if (response.data && response.data.status && Array.isArray(response.data.data)) {

                    const mappedCards = !response?.data?.data ? [] : response.data.data.map((card, index) => ({
                        type: card.cardTypeName || "Debit Card",
                        cardNumber: card.cardNumber ? String(card.cardNumber).replace(/(\d{4})(?=\d)/g, '$1 ') : "**** **** **** ****",
                        cardHolder: userData.data.firstName ? `${userData.data.firstName.toUpperCase()} ${userData.data.lastName.toUpperCase()}` : "USER",
                        expiry: card.expiryDate ? new Date(card.expiryDate).toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' }) : "MM/YY",
                        network: "Visa",
                        status: card.status || "Active",
                        color: index % 2 === 0 ? "linear-gradient(135deg, #1a237e, #283593)" : "linear-gradient(135deg, #0f172a, #334155)",
                    }));
                    console.log("Processing card:", response?.data?.data);

                    setCards(mappedCards);
                }
            } catch (error) {
                console.error("Error fetching cards:", error);
                showSnackbar("error", "Failed to load card details");
            } finally {
                setCardsLoading(false);
            }
        }
    };

    console.log("cards", cards);


    useEffect(() => {
        fetchCards();
    }, [userData, selectedAccount]);


    useEffect(() => {
        const fetchTransactions = async () => {
            if (userData?.data?.accounts && userData.data.accounts[selectedAccount]) {
                setLoading(true);
                try {
                    const accountId = userData.data.accounts[selectedAccount].accountNumber;
                    console.log(`Fetching transactions for Account ID: ${accountId}`);
                    const response = await API.get(`account/transactions/${accountId}`);
                    console.log("Transactions fetched:", response.data);

                    const txData = response.data && Array.isArray(response.data.data) ? response.data.data : [];
                    setTransactions(txData);
                } catch (error) {
                    console.error("Error fetching transactions:", error);
                    showSnackbar("error", "Failed to load recent transactions");
                    setTransactions([]);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchTransactions();
    }, [selectedAccount, userData]);

    // Format date function
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Fallback data if API fails or is loading
    const apiData = userData?.data || {};

    const displayData = {
        name: apiData.firstName ? `${apiData.firstName} ${apiData.lastName}` : "Guest User",
        customerId: apiData.userId ? `ID: ${apiData.userId}` : "---",
        memberSince: "2024",
        accounts: Array.isArray(apiData.accounts) ? apiData.accounts.map(acc => ({
            id: acc.accountNumber,
            type: acc.accountTypeName || "_",
            accountNumber: String(acc.accountNumber),
            ifsc: acc.branchCode || "ABC0001234",
            branch: acc.branchName || "Main Branch",
            city: acc.city || "Chennai",
            balance: acc.balance || 0,
            currency: "INR",
            openedDate: acc.openedDate || "N/A",
            status: acc.status || "Active",
            cardLinked: true
        })) : [],
        cards: cards,
        balanceStats: {
            income: 0,
            expense: 0,
            savings: Array.isArray(apiData.accounts) ? apiData.accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0) : 0
        },
        notifications: 3
    };

    if (userLoading || !displayData) {
        return <div style={{ textAlign: "center", padding: "50px", fontSize: "20px", color: "var(--color-text)" }}>Loading user data...</div>;
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    const handleNavigateTransaction = () => {
       const accountNumber= selectedAccount === 0 ? "Savings" :"Current";
        navigate("/transactions" , { state: { accountNumber:accountNumber } });
    }

    return (
        <div style={styles.container}>
            {/* Welcome Header - Simplified */}
            <div style={styles.header}>
                <div style={styles.welcomeSection}>
                    <h1 style={styles.greeting}>Welcome back, {displayData.name ? displayData.name.split(' ')[0] : 'User'}! 🎉</h1>
                    <p style={styles.memberSince}>Since {displayData.memberSince}</p>
                </div>
            </div>

            {/* Main Grid */}
            <div style={styles.mainGrid}>
                {/* Left Column - Accounts & Cards */}
                <div style={styles.leftColumn}>
                    {/* Total Balance Card - Removed +2.5% text */}
                    <div style={styles.totalBalanceCard}>
                        <div style={styles.totalBalanceHeader}>
                            <span style={styles.totalBalanceLabel}>Total Balance (All Accounts)</span>
                            <button
                                style={styles.visibilityToggle}
                                onClick={() => setShowBalance(!showBalance)}
                            >
                                {showBalance ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                            </button>
                        </div>
                        <h2 style={styles.totalBalanceAmount}>
                            {showBalance ? formatCurrency(
                                displayData.accounts ? displayData.accounts.reduce((sum, acc) => sum + acc.balance, 0) : 0
                            ) : '••••••••'}
                        </h2>
                    </div>

                    {/* Account Selector */}
                    <div style={styles.accountSelector}>
                        {displayData.accounts && displayData.accounts.map((account, index) => (
                            <div
                                key={account.id}
                                style={{
                                    ...styles.accountTab,
                                    ...(selectedAccount === index ? styles.accountTabActive : {})
                                }}
                                onClick={() => setSelectedAccount(index)}
                            >
                                <div style={styles.accountTabInfo}>
                                    <span style={styles.accountTabType}>{account.type}</span>
                                    <span style={styles.accountTabNumber}>
                                        {account.accountNumber ? account.accountNumber.slice(-4) : '****'}
                                    </span>
                                </div>
                                <span style={styles.accountTabBalance}>
                                    {showBalance ? formatCurrency(account.balance) : '••••••'}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Selected Account Details */}
                    {displayData.accounts && displayData.accounts[selectedAccount] && (
                        <div style={styles.accountDetailsCard}>
                            <div style={styles.accountDetailsHeader}>
                                <h3 style={styles.accountDetailsTitle}>
                                    {displayData.accounts[selectedAccount].type}
                                </h3>
                                <span style={styles.accountStatus}>
                                    <FaCheckCircle size={14} color="#10b981" />
                                    {displayData.accounts[selectedAccount].status}
                                </span>
                            </div>

                            <div style={styles.accountNumberRow}>
                                <span style={styles.accountNumber}>
                                    {displayData.accounts[selectedAccount].accountNumber}
                                </span>
                                <button
                                    style={styles.copyBtn}
                                    onClick={() => copyToClipboard(displayData.accounts[selectedAccount].accountNumber)}
                                >
                                    <FaCopy size={14} />
                                </button>
                            </div>

                            {/* Account Meta Grid */}
                            <div style={styles.accountMetaGrid}>
                                <div style={styles.accountMetaItem}>
                                    <span style={styles.metaLabel}>
                                        <FaMapMarkerAlt size={12} style={{ marginRight: '4px' }} />
                                        CITY
                                    </span>
                                    <span style={styles.metaValue}>{displayData.accounts[selectedAccount].city}</span>
                                </div>
                                <div style={styles.accountMetaItem}>
                                    <span style={styles.metaLabel}>
                                        <FaUniversity size={12} style={{ marginRight: '4px' }} />
                                        IFSC CODE
                                    </span>
                                    <div style={styles.metaValueRow}>
                                        <span style={styles.metaValue}>{displayData.accounts[selectedAccount].ifsc}</span>
                                        <button
                                            style={styles.copyBtnSmall}
                                            onClick={() => copyToClipboard(displayData.accounts[selectedAccount].ifsc)}
                                        >
                                            <FaCopy size={12} />
                                        </button>
                                    </div>
                                </div>
                                <div style={styles.accountMetaItem}>
                                    <span style={styles.metaLabel}>
                                        <FaMapMarkerAlt size={12} style={{ marginRight: '4px' }} />
                                        BRANCH
                                    </span>
                                    <span style={styles.metaValue}>{displayData.accounts[selectedAccount].branch}</span>
                                </div>
                                <div style={styles.accountMetaItem}>
                                    <span style={styles.metaLabel}>
                                        <FaCalendarAlt size={12} style={{ marginRight: '4px' }} />
                                        OPENED ON
                                    </span>
                                    <span style={styles.metaValue}>
                                        {formatDate(displayData.accounts[selectedAccount].openedDate)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column - Cards & Transactions */}
                <div style={styles.rightColumn}>
                    {/* Cards Section */}
                    <div style={styles.cardsSection}>
                        <div style={styles.sectionHeader}>
                            <h3 style={styles.sectionTitle}>Your Cards</h3>
                        </div>

                        <div style={styles.cardsGrid}>
                            {displayData.cards && displayData.cards.map((card, index) => (
                                <div
                                    key={index}
                                    style={{
                                        ...styles.card,
                                        background: card.color,
                                    }}
                                >
                                    <div style={styles.cardHeader}>
                                        <span style={styles.cardNetwork}>{card.network}</span>
                                        <span style={styles.cardType}>{card.type}</span>
                                    </div>
                                    <div style={styles.cardNumber}>
                                        {card.cardNumber}
                                    </div>
                                    <div style={styles.cardFooter}>
                                        <div style={styles.cardHolder}>
                                            <span style={styles.cardLabel}>Card Holder</span>
                                            <span style={styles.cardValue}>{card.cardHolder}</span>
                                        </div>
                                        <div style={styles.cardExpiry}>
                                            <span style={styles.cardLabel}>Expires</span>
                                            <span style={styles.cardValue}>{card.expiry}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div style={{ ...styles.sectionHeader, marginTop: '24px' }}>
                        <h3 style={styles.sectionTitle}>Recent Transactions</h3>
                        <button style={styles.viewAllBtn} onClick={handleNavigateTransaction}>View All</button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {loading ? (
                            <p style={{ textAlign: "center", padding: "20px", color: "var(--color-muted)" }}>Loading transactions...</p>
                        ) : transactions.length > 0 ? (
                            transactions.slice(0, 3).map((transaction) => {
                                const isCredit = transaction.transactionType === "DEPOSIT";
                                return (
                                    <div key={transaction.transactionId || Math.random()} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '16px',
                                        background: 'var(--color-surface)',
                                        borderRadius: '16px',
                                        border: '1px solid var(--color-border)',
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                            <div style={{
                                                ...styles.transactionIcon,
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: isCredit ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                                color: isCredit ? '#10b981' : '#ef4444'
                                            }}>
                                                {isCredit ? <FaArrowDown /> : <FaArrowUp />}
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--color-text)' }}>
                                                    {transaction.transactionType || "Transaction"}
                                                </span>
                                                <span style={{ fontSize: '12px', color: 'var(--color-muted)' }}>
                                                    {transaction.dateOfTransaction || "N/A"}
                                                </span>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                                            <span style={{
                                                fontSize: '15px',
                                                fontWeight: '600',
                                                color: isCredit ? '#10b981' : 'var(--color-text)'
                                            }}>
                                                {isCredit ? '+' : '-'}
                                                {transaction.transactionedAmount ? formatCurrency(transaction.transactionedAmount) : "₹0.00"}
                                            </span>
                                            <span style={{ fontSize: '12px', color: 'var(--color-muted)' }}>
                                                {transaction.closingBalance ? `Bal: ${formatCurrency(transaction.closingBalance)}` : ""}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p style={{ textAlign: "center", padding: "20px", color: "var(--color-muted)" }}>No transactions found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: "24px",
        maxWidth: "1400px",
        margin: "0 auto",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        backgroundColor: "#f8fafc",
    },
    header: {
        marginBottom: "28px",
    },
    welcomeSection: {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
    },
    greeting: {
        fontSize: "28px",
        fontWeight: "700",
        color: "#0f172a",
        margin: 0,
    },
    memberSince: {
        fontSize: "14px",
        color: "#64748b",
        margin: 0,
    },
    mainGrid: {
        display: "grid",
        gridTemplateColumns: "1.2fr 0.8fr",
        gap: "24px",
    },
    leftColumn: {
        display: "flex",
        flexDirection: "column",
        gap: "24px",
    },
    rightColumn: {
        display: "flex",
        flexDirection: "column",
        gap: "24px",
    },
    totalBalanceCard: {
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        borderRadius: "20px",
        padding: "24px",
        color: "#ffffff",
    },
    totalBalanceHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "12px",
    },
    totalBalanceLabel: {
        fontSize: "14px",
        color: "#cbd5e1",
        fontWeight: "500",
    },
    visibilityToggle: {
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: "8px",
        width: "36px",
        height: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        cursor: "pointer",
    },
    totalBalanceAmount: {
        fontSize: "36px",
        fontWeight: "700",
        margin: 0,
    },
    accountSelector: {
        display: "flex",
        gap: "12px",
        overflowX: "auto",
        padding: "4px 0",
    },
    accountTab: {
        flex: 1,
        minWidth: "160px",
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "16px",
        padding: "16px",
        cursor: "pointer",
        transition: "all 0.2s",
        boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
    },
    accountTabActive: {
        borderColor: "#4361ee",
        boxShadow: "0 4px 12px rgba(67,97,238,0.1)",
    },
    accountTabInfo: {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        marginBottom: "12px",
    },
    accountTabType: {
        fontSize: "15px",
        fontWeight: "600",
        color: "#0f172a",
    },
    accountTabNumber: {
        fontSize: "13px",
        color: "#64748b",
    },
    accountTabBalance: {
        fontSize: "18px",
        fontWeight: "700",
        color: "#0f172a",
    },
    accountDetailsCard: {
        background: "#ffffff",
        borderRadius: "20px",
        padding: "24px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e2e8f0",
    },
    accountDetailsHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px",
    },
    accountDetailsTitle: {
        fontSize: "18px",
        fontWeight: "600",
        color: "#0f172a",
        margin: 0,
    },
    accountStatus: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "13px",
        color: "#10b981",
        fontWeight: "600",
        padding: "6px 12px",
        background: "rgba(16, 185, 129, 0.1)",
        borderRadius: "20px",
    },
    accountNumberRow: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "20px",
    },
    accountNumber: {
        fontSize: "18px",
        fontWeight: "600",
        color: "#0f172a",
        letterSpacing: "1px",
    },
    copyBtn: {
        background: "none",
        border: "none",
        color: "#64748b",
        cursor: "pointer",
        padding: "8px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    accountMetaGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "20px",
        padding: "20px 0",
        borderTop: "1px solid #e2e8f0",
    },
    accountMetaItem: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
    },
    metaLabel: {
        fontSize: "11px",
        color: "#64748b",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        display: "flex",
        alignItems: "center",
        gap: "4px",
    },
    metaValue: {
        fontSize: "15px",
        fontWeight: "600",
        color: "#0f172a",
    },
    metaValueRow: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    copyBtnSmall: {
        background: "none",
        border: "none",
        color: "#64748b",
        cursor: "pointer",
        padding: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    cardsSection: {
        background: "#ffffff",
        borderRadius: "20px",
        padding: "24px",
        border: "1px solid #e2e8f0",
    },
    sectionHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
    },
    sectionTitle: {
        fontSize: "18px",
        fontWeight: "600",
        color: "#0f172a",
        margin: 0,
    },
    viewAllBtn: {
        background: "none",
        border: "none",
        color: "#4361ee",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
    },
    cardsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "16px",
    },
    card: {
        padding: "20px",
        borderRadius: "16px",
        color: "#ffffff",
        position: "relative",
        minHeight: "160px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    cardHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardNetwork: {
        fontSize: "14px",
        fontWeight: "600",
        opacity: 0.9,
    },
    cardType: {
        fontSize: "12px",
        padding: "4px 10px",
        background: "rgba(255,255,255,0.2)",
        borderRadius: "20px",
    },
    cardNumber: {
        fontSize: "16px",
        letterSpacing: "2px",
        fontWeight: "500",
        margin: "12px 0",
    },
    cardFooter: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardHolder: {
        display: "flex",
        flexDirection: "column",
        gap: "2px",
    },
    cardExpiry: {
        display: "flex",
        flexDirection: "column",
        gap: "2px",
    },
    cardLabel: {
        fontSize: "10px",
        opacity: 0.7,
        textTransform: "uppercase",
    },
    cardValue: {
        fontSize: "13px",
        fontWeight: "600",
    },
    transactionIcon: {
        width: "40px",
        height: "40px",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
};

// Add responsive styles
const responsiveStyles = `
    @media (max-width: 1200px) {
        .main-grid {
            grid-template-columns: 1fr !important;
        }
    }
    
    @media (max-width: 768px) {
        .container {
            padding: 16px !important;
        }
        
        .greeting {
            font-size: 24px !important;
        }
        
        .total-balance-amount {
            font-size: 28px !important;
        }
        
        .cards-grid {
            grid-template-columns: 1fr !important;
        }
    }
    
    @media (max-width: 640px) {
        .account-meta-grid {
            grid-template-columns: 1fr !important;
        }
        
        .account-selector {
            flex-direction: column !important;
        }
        
        .account-tab {
            min-width: 100% !important;
        }
    }
`;

// Inject responsive styles
const styleSheet = document.createElement("style");
styleSheet.textContent = responsiveStyles;
document.head.appendChild(styleSheet);

export default Dashboard;