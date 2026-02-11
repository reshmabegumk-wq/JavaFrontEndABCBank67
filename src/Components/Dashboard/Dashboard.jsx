import { useState } from "react";
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
} from "react-icons/fa";

const Dashboard = () => {
    const [showBalance, setShowBalance] = useState(true);
    const [selectedAccount, setSelectedAccount] = useState(0);

    // Sample user data
    const userData = {
        name: "John Anderson",
        customerId: "CUST-2024-12345",
        memberSince: "2018",
        accounts: [
            {
                id: 0,
                type: "Savings Account",
                accountNumber: "1234 5678 9012 3456",
                ifsc: "ABC0001234",
                branch: "Main Branch, NYC",
                balance: 245000.50,
                currency: "INR",
                interestRate: "4.25%",
                openedDate: "15 Jan 2018",
                status: "Active",
                cardLinked: true,
            },
            {
                id: 1,
                type: "Current Account",
                accountNumber: "9876 5432 1098 7654",
                ifsc: "ABC0005678",
                branch: "Downtown Branch, NYC",
                balance: 75000.75,
                currency: "INR",
                interestRate: "2.50%",
                openedDate: "22 Mar 2020",
                status: "Active",
                cardLinked: true,
            },
        ],
        cards: [
            {
                type: "Debit Card",
                cardNumber: "•••• •••• •••• 4567",
                cardHolder: "JOHN ANDERSON",
                expiry: "05/28",
                network: "Visa",
                status: "Active",
                dailyLimit: "₹50,000",
                contactless: true,
                color: "linear-gradient(135deg, #1a237e, #283593)",
            },
            {
                type: "Credit Card",
                cardNumber: "•••• •••• •••• 8901",
                cardHolder: "JOHN ANDERSON",
                expiry: "09/27",
                network: "Mastercard",
                status: "Active",
                creditLimit: "₹3,00,000",
                availableCredit: "₹1,85,000",
                color: "linear-gradient(135deg, #b71c1c, #c62828)",
            },
            {
                type: "Business Card",
                cardNumber: "•••• •••• •••• 2345",
                cardHolder: "JOHN ANDERSON",
                expiry: "11/26",
                network: "RuPay",
                status: "Active",
                dailyLimit: "₹1,00,000",
                contactless: true,
                color: "linear-gradient(135deg, #0f172a, #1e293b)",
            }
        ],
        recentTransactions: [
            { id: 1, description: "Amazon.in", amount: -3499.00, date: "Today", time: "10:23 AM", type: "debit", category: "Shopping", status: "completed" },
            { id: 2, description: "Salary Credit", amount: 125000.00, date: "Yesterday", time: "09:00 AM", type: "credit", category: "Income", status: "completed" },
            { id: 3, description: "Starbucks Coffee", amount: -450.50, date: "25 Mar 2026", time: "03:45 PM", type: "debit", category: "Food", status: "completed" },
            { id: 4, description: "Electricity Bill", amount: -2850.00, date: "24 Mar 2026", time: "11:15 AM", type: "debit", category: "Utilities", status: "completed" },
            { id: 5, description: "Netflix", amount: -649.00, date: "23 Mar 2026", time: "08:30 PM", type: "debit", category: "Entertainment", status: "pending" },
        ],
        notifications: 3
    };

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
        // You can add a toast notification here
    };

    return (
        <div style={styles.container}>
            {/* Welcome Header */}
            <div style={styles.header}>
                <div style={styles.welcomeSection}>
                    <div style={styles.avatarContainer}>
                        <span style={styles.avatarText}>{userData.name.charAt(0)}</span>
                    </div>
                    <div style={styles.welcomeText}>
                        <h1 style={styles.greeting}>Welcome back, {userData.name.split(' ')[0]}! 👋</h1>
                        <p style={styles.subGreeting}>
                            <span style={styles.memberSince}>Since {userData.memberSince}</span>
                        </p>
                    </div>
                </div>
                <div style={styles.headerActions}>

                    <button style={styles.notificationBtn}>
                        <FaBell size={18} />

                        {userData.notifications > 0 && (
                            <span style={styles.notificationBadge}>
                                {userData.notifications}
                            </span>
                        )}
                    </button>

                    <button style={styles.notificationBtn}>
                        <FaCog size={18} />
                    </button>

                </div>
            </div>

            {/* Quick Actions */}
            {/* <div style={styles.quickActions}>
                <button style={styles.actionBtn}>
                    <div style={styles.actionIcon}>
                        <FaArrowUp size={16} />
                    </div>
                    <span>Send Money</span>
                </button>
                <button style={styles.actionBtn}>
                    <div style={styles.actionIcon}>
                        <FaArrowDown size={16} />
                    </div>
                    <span>Request</span>
                </button>
                <button style={styles.actionBtn}>
                    <div style={styles.actionIcon}>
                        <FaExchangeAlt size={16} />
                    </div>
                    <span>Transfer</span>
                </button>
                <button style={styles.actionBtn}>
                    <div style={styles.actionIcon}>
                        <FaFileInvoiceDollar size={16} />
                    </div>
                    <span>Pay Bills</span>
                </button>
                <button style={styles.actionBtn}>
                    <div style={styles.actionIcon}>
                        <FaPlus size={16} />
                    </div>
                    <span>Add Money</span>
                </button>
            </div> */}

            {/* Main Grid */}
            <div style={styles.mainGrid}>
                {/* Left Column - Accounts & Cards */}
                <div style={styles.leftColumn}>
                    {/* Total Balance Card */}
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
                                userData.accounts.reduce((sum, acc) => sum + acc.balance, 0)
                            ) : '••••••••'}
                        </h2>
                        <div style={styles.totalBalanceFooter}>
                            <span style={styles.totalBalanceChange}>
                                <FaArrowUp size={12} color="#10b981" /> +2.5% from last month
                            </span>
                        </div>
                    </div>

                    {/* Account Selector */}
                    <div style={styles.accountSelector}>
                        {userData.accounts.map((account, index) => (
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
                                        {account.accountNumber.slice(-4)}
                                    </span>
                                </div>
                                <span style={styles.accountTabBalance}>
                                    {showBalance ? formatCurrency(account.balance) : '••••••'}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Selected Account Details */}
                    <div style={styles.accountDetailsCard}>
                        <div style={styles.accountDetailsHeader}>
                            <h3 style={styles.accountDetailsTitle}>
                                {userData.accounts[selectedAccount].type}
                            </h3>
                            <span style={styles.accountStatus}>
                                <FaCheckCircle size={14} color="#10b981" />
                                {userData.accounts[selectedAccount].status}
                            </span>
                        </div>

                        <div style={styles.accountNumberRow}>
                            <span style={styles.accountNumber}>
                                {userData.accounts[selectedAccount].accountNumber}
                            </span>
                            <button
                                style={styles.copyBtn}
                                onClick={() => copyToClipboard(userData.accounts[selectedAccount].accountNumber)}
                            >
                                <FaCopy size={14} />
                            </button>
                        </div>

                        <div style={styles.accountMetaGrid}>
                            <div style={styles.accountMetaItem}>
                                <span style={styles.metaLabel}>IFSC Code</span>
                                <div style={styles.metaValueRow}>
                                    <span style={styles.metaValue}>{userData.accounts[selectedAccount].ifsc}</span>
                                    <button
                                        style={styles.copyBtnSmall}
                                        onClick={() => copyToClipboard(userData.accounts[selectedAccount].ifsc)}
                                    >
                                        <FaCopy size={12} />
                                    </button>
                                </div>
                            </div>
                            <div style={styles.accountMetaItem}>
                                <span style={styles.metaLabel}>Branch</span>
                                <span style={styles.metaValue}>{userData.accounts[selectedAccount].branch}</span>
                            </div>
                            <div style={styles.accountMetaItem}>
                                <span style={styles.metaLabel}>Interest Rate</span>
                                <span style={styles.metaValue}>{userData.accounts[selectedAccount].interestRate}</span>
                            </div>
                            <div style={styles.accountMetaItem}>
                                <span style={styles.metaLabel}>Opened On</span>
                                <span style={styles.metaValue}>{userData.accounts[selectedAccount].openedDate || userData.accounts[selectedAccount].maturityDate}</span>
                            </div>
                        </div>

                        <div style={styles.accountActions}>
                            <button style={styles.accountActionBtn}>View Statement</button>
                            <button style={styles.accountActionBtnPrimary}>Transfer Money</button>
                        </div>
                    </div>

                    {/* Cards Section */}
                    <div style={styles.cardsSection}>
                        <div style={styles.sectionHeader}>
                            <h3 style={styles.sectionTitle}>Your Cards</h3>
                            <button style={styles.viewAllBtn}>View All</button>
                        </div>

                        <div style={styles.cardsGrid}>
                            {userData.cards.map((card, index) => (
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
                </div>

                {/* Right Column - Transactions & Insights */}
                <div style={styles.rightColumn}>
                    {/* Recent Transactions */}
                    <div style={styles.transactionsCard}>
                        <div style={styles.sectionHeader}>
                            <h3 style={styles.sectionTitle}>Recent Transactions</h3>
                            <button style={styles.viewAllBtn}>View All</button>
                        </div>

                        <div style={styles.transactionsList}>
                            {userData.recentTransactions.map((transaction) => (
                                <div key={transaction.id} style={styles.transactionItem}>
                                    <div style={styles.transactionIconContainer}>
                                        <div style={{
                                            ...styles.transactionIcon,
                                            backgroundColor: transaction.type === 'credit' ? '#e8f5e9' : '#fee2e2',
                                            color: transaction.type === 'credit' ? '#10b981' : '#ef4444'
                                        }}>
                                            {transaction.type === 'credit' ? <FaArrowUp size={14} /> : <FaArrowDown size={14} />}
                                        </div>
                                    </div>
                                    <div style={styles.transactionDetails}>
                                        <div style={styles.transactionMain}>
                                            <span style={styles.transactionDesc}>{transaction.description}</span>
                                            <span style={{
                                                ...styles.transactionAmount,
                                                color: transaction.type === 'credit' ? '#10b981' : '#ef4444'
                                            }}>
                                                {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                                            </span>
                                        </div>
                                        <div style={styles.transactionMeta}>
                                            <span style={styles.transactionDate}>
                                                <FaClock size={12} color="#94a3b8" />
                                                {transaction.date} at {transaction.time}
                                            </span>
                                            <span style={styles.transactionCategory}>{transaction.category}</span>
                                            {transaction.status === 'pending' && (
                                                <span style={styles.pendingBadge}>Pending</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Spending Insights */}
                    <div style={styles.insightsCard}>
                        <div style={styles.sectionHeader}>
                            <h3 style={styles.sectionTitle}>Spending Insights</h3>
                            <FaChartPie size={18} color="#64748b" />
                        </div>

                        <div style={styles.insightsContent}>
                            <div style={styles.insightItem}>
                                <div style={styles.insightLabel}>
                                    <span>Monthly Spending</span>
                                    <span style={styles.insightValue}>₹42,850</span>
                                </div>
                                <div style={styles.progressBar}>
                                    <div style={{
                                        ...styles.progressFill,
                                        width: '65%',
                                        background: 'linear-gradient(90deg, #4361ee, #3a0ca3)'
                                    }} />
                                </div>
                                <span style={styles.insightSubtext}>65% of ₹65,000 budget</span>
                            </div>

                            <div style={styles.spendingCategories}>
                                <div style={styles.categoryItem}>
                                    <div style={{ ...styles.categoryDot, backgroundColor: '#4361ee' }} />
                                    <span style={styles.categoryName}>Shopping</span>
                                    <span style={styles.categoryAmount}>₹15,200</span>
                                </div>
                                <div style={styles.categoryItem}>
                                    <div style={{ ...styles.categoryDot, backgroundColor: '#f59e0b' }} />
                                    <span style={styles.categoryName}>Food & Dining</span>
                                    <span style={styles.categoryAmount}>₹12,450</span>
                                </div>
                                <div style={styles.categoryItem}>
                                    <div style={{ ...styles.categoryDot, backgroundColor: '#10b981' }} />
                                    <span style={styles.categoryName}>Utilities</span>
                                    <span style={styles.categoryAmount}>₹8,300</span>
                                </div>
                                <div style={styles.categoryItem}>
                                    <div style={{ ...styles.categoryDot, backgroundColor: '#8b5cf6' }} />
                                    <span style={styles.categoryName}>Entertainment</span>
                                    <span style={styles.categoryAmount}>₹6,900</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Security Status */}
                    <div style={styles.securityCard}>
                        <div style={styles.securityHeader}>
                            <FaShieldAlt size={18} color="#10b981" />
                            <span style={styles.securityTitle}>Security Status</span>
                        </div>
                        <div style={styles.securityGrid}>
                            <div style={styles.securityItem}>
                                <FaCheckCircle size={14} color="#10b981" />
                                <span>2FA Enabled</span>
                            </div>
                            <div style={styles.securityItem}>
                                <FaCheckCircle size={14} color="#10b981" />
                                <span>Biometric Login</span>
                            </div>
                            <div style={styles.securityItem}>
                                <FaCheckCircle size={14} color="#10b981" />
                                <span>Transaction Alerts</span>
                            </div>
                            <div style={styles.securityItem}>
                                <FaCheckCircle size={14} color="#10b981" />
                                <span>Card Lock/Unlock</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: "24px",
        maxWidth: "1600px",
        margin: "0 auto",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "28px",
    },
    welcomeSection: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
    },
    avatarContainer: {
        width: "56px",
        height: "56px",
        borderRadius: "16px",
        background: "linear-gradient(135deg, #4361ee, #3a0ca3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        fontWeight: "600",
        color: "#ffffff",
        boxShadow: "0 8px 20px rgba(67, 97, 238, 0.2)",
    },
    welcomeText: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
    },
    greeting: {
        fontSize: "28px",
        fontWeight: "700",
        color: "#0f172a",
        margin: 0,
    },
    subGreeting: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
        margin: 0,
        color: "#64748b",
        fontSize: "14px",
    },
    customerId: {
        color: "#475569",
        fontWeight: "500",
    },
    badge: {
        background: "linear-gradient(135deg, #4361ee15, #3a0ca315)",
        color: "#4361ee",
        padding: "4px 12px",
        borderRadius: "20px",
        fontWeight: "600",
    },
    memberSince: {
        color: "#94a3b8",
    },
    headerActions: {
        display: "flex",
        gap: "12px",
    },
    notificationBtn: {
        position: "relative",
        padding: "12px",  
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        background: "#ffffff",
        color: "#475569",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
    },
    notificationBadge: {
        position: "absolute",
        top: "-6px",
        right: "-6px",
        background: "#ef4444",
        color: "#ffffff",
        fontSize: "11px",
        fontWeight: "600",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    settingsBtn: {
        width: "44px",
        height: "44px",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        background: "#ffffff",
        color: "#475569",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.2s",
    },
    quickActions: {
        display: "flex",
        gap: "12px",
        marginBottom: "32px",
        flexWrap: "wrap",
    },
    actionBtn: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "12px 20px",
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "14px",
        color: "#1e293b",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.2s",
    },
    actionIcon: {
        width: "32px",
        height: "32px",
        borderRadius: "10px",
        background: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#4361ee",
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
        borderRadius: "24px",
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
        borderRadius: "10px",
        width: "36px",
        height: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        cursor: "pointer",
    },
    totalBalanceAmount: {
        fontSize: "42px",
        fontWeight: "700",
        margin: "0 0 8px 0",
    },
    totalBalanceFooter: {
        fontSize: "13px",
        color: "#94a3b8",
    },
    totalBalanceChange: {
        display: "flex",
        alignItems: "center",
        gap: "4px",
    },
    accountSelector: {
        display: "flex",
        gap: "12px",
        overflowX: "auto",
        padding: "4px 0",
    },
    accountTab: {
        flex: 1,
        minWidth: "180px",
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "16px",
        padding: "16px",
        cursor: "pointer",
        transition: "all 0.2s",
    },
    accountTabActive: {
        borderColor: "#4361ee",
        background: "#f0f9ff",
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
        fontSize: "20px",
        fontWeight: "700",
        color: "#0f172a",
    },
    accountDetailsCard: {
        background: "#ffffff",
        borderRadius: "20px",
        padding: "24px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
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
        background: "#e8f5e9",
        borderRadius: "20px",
    },
    accountNumberRow: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "20px",
    },
    accountNumber: {
        fontSize: "20px",
        fontWeight: "600",
        color: "#0f172a",
        letterSpacing: "2px",
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
        marginBottom: "24px",
        padding: "20px 0",
        borderTop: "1px solid #e2e8f0",
        borderBottom: "1px solid #e2e8f0",
    },
    accountMetaItem: {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
    },
    metaLabel: {
        fontSize: "12px",
        color: "#64748b",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
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
        color: "#94a3b8",
        cursor: "pointer",
        padding: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    accountActions: {
        display: "flex",
        gap: "12px",
    },
    accountActionBtn: {
        flex: 1,
        padding: "14px",
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        color: "#475569",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
    },
    accountActionBtnPrimary: {
        flex: 1,
        padding: "14px",
        background: "linear-gradient(135deg, #4361ee, #3a0ca3)",
        border: "none",
        borderRadius: "12px",
        color: "#ffffff",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
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
    contactlessBadge: {
        position: "absolute",
        top: "20px",
        right: "20px",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        fontSize: "11px",
        padding: "4px 8px",
        background: "rgba(255,255,255,0.2)",
        borderRadius: "20px",
    },
    transactionsCard: {
        background: "#ffffff",
        borderRadius: "20px",
        padding: "24px",
        border: "1px solid #e2e8f0",
    },
    transactionsList: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    },
    transactionItem: {
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "8px 0",
        borderBottom: "1px solid #f1f5f9",
    },
    transactionIconContainer: {
        flexShrink: 0,
    },
    transactionIcon: {
        width: "40px",
        height: "40px",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    transactionDetails: {
        flex: 1,
    },
    transactionMain: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "4px",
    },
    transactionDesc: {
        fontSize: "15px",
        fontWeight: "600",
        color: "#0f172a",
    },
    transactionAmount: {
        fontSize: "15px",
        fontWeight: "700",
    },
    transactionMeta: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        fontSize: "12px",
        color: "#64748b",
    },
    transactionDate: {
        display: "flex",
        alignItems: "center",
        gap: "4px",
    },
    transactionCategory: {
        padding: "2px 8px",
        background: "#f1f5f9",
        borderRadius: "12px",
    },
    pendingBadge: {
        padding: "2px 8px",
        background: "#fff3cd",
        color: "#856404",
        borderRadius: "12px",
        fontSize: "11px",
        fontWeight: "600",
    },
    insightsCard: {
        background: "#ffffff",
        borderRadius: "20px",
        padding: "24px",
        border: "1px solid #e2e8f0",
    },
    insightsContent: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    insightItem: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },
    insightLabel: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "14px",
        color: "#475569",
    },
    insightValue: {
        fontSize: "16px",
        fontWeight: "700",
        color: "#0f172a",
    },
    progressBar: {
        width: "100%",
        height: "8px",
        background: "#e2e8f0",
        borderRadius: "4px",
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        borderRadius: "4px",
    },
    insightSubtext: {
        fontSize: "12px",
        color: "#64748b",
    },
    spendingCategories: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },
    categoryItem: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "14px",
    },
    categoryDot: {
        width: "10px",
        height: "10px",
        borderRadius: "50%",
    },
    categoryName: {
        flex: 1,
        color: "#475569",
    },
    categoryAmount: {
        fontWeight: "600",
        color: "#0f172a",
    },
    securityCard: {
        background: "#ffffff",
        borderRadius: "20px",
        padding: "24px",
        border: "1px solid #e2e8f0",
    },
    securityHeader: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "16px",
    },
    securityTitle: {
        fontSize: "16px",
        fontWeight: "600",
        color: "#0f172a",
    },
    securityGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "16px",
    },
    securityItem: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "13px",
        color: "#475569",
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
            font-size: 22px !important;
        }
        
        .total-balance-amount {
            font-size: 32px !important;
        }
        
        .cards-grid {
            grid-template-columns: 1fr !important;
        }
        
        .security-grid {
            grid-template-columns: 1fr !important;
        }
    }
    
    @media (max-width: 640px) {
        .quick-actions {
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            padding-bottom: 8px !important;
        }
        
        .account-meta-grid {
            grid-template-columns: 1fr !important;
        }
        
        .account-actions {
            flex-direction: column !important;
        }
    }
`;

// Inject responsive styles
const styleSheet = document.createElement("style");
styleSheet.textContent = responsiveStyles;
document.head.appendChild(styleSheet);

export default Dashboard;