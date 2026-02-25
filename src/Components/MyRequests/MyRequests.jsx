// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";

// // Create API instance
// const API = axios.create({
//   baseURL: "http://localhost:8077",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// const MyRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const [filteredRequests, setFilteredRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [accounts, setAccounts] = useState([]);
//   const [loadingAccounts, setLoadingAccounts] = useState(false);
//   const [customerId, setCustomerId] = useState(null);
//   const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  
//   // Refs for click outside detection
//   const accountDropdownRef = useRef(null);
  
//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
  
//   // Filter states
//   const [selectedAccount, setSelectedAccount] = useState("");
//   const [selectedAccountDetails, setSelectedAccountDetails] = useState(null);
//   const [selectedRequestType, setSelectedRequestType] = useState("ALL");

//   // Modal states for request details
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedRequest, setSelectedRequest] = useState(null);

//   // Get customer ID from localStorage
//   useEffect(() => {
//     const id = localStorage.getItem("customerId") || localStorage.getItem("userId") || "2";
//     setCustomerId(id);
//   }, []);

//   // Handle click outside for dropdown
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target)) {
//         setIsAccountDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // White and Orange Theme CSS Variables with enhanced contrast
//   useEffect(() => {
//     const styleSheet = document.createElement("style");
//     styleSheet.textContent = `
//       :root {
//         /* White and Orange Theme - Enhanced Contrast */
//         --bg-primary: #ffffff;
//         --bg-secondary: #f8f9fa;
//         --surface: #ffffff;
//         --surface-hover: #fff5f0;
//         --text-primary: #000000;
//         --text-secondary: #1e293b;
//         --text-muted: #475569;
//         --text-inverse: #ffffff;
//         --border: #e2e8f0;
//         --border-light: #f1f5f9;
//         --border-focus: #ff6e4a;
//         --primary: #ff6e4a;
//         --primary-light: #ff8b6e;
//         --primary-dark: #e65a3a;
//         --primary-soft: rgba(255, 110, 74, 0.1);
//         --primary-gradient: linear-gradient(135deg, #ff6e4a, #ff8b6e);
//         --success: #059669;
//         --success-soft: rgba(5, 150, 105, 0.1);
//         --danger: #dc2626;
//         --danger-soft: rgba(220, 38, 38, 0.1);
//         --warning: #d97706;
//         --warning-soft: rgba(217, 119, 6, 0.1);
//         --info: #2563eb;
//         --info-soft: rgba(37, 99, 235, 0.1);
//         --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
//         --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
//         --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
//         --shadow-hover: 0 20px 25px -5px rgba(255, 110, 74, 0.2);
//       }

//       * {
//         transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
//         box-sizing: border-box;
//       }

//       body {
//         background-color: var(--bg-primary);
//         color: var(--text-primary);
//         font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//         margin: 0;
//         padding: 0;
//       }

//       /* Account Dropdown Styles */
//       .account-dropdown-container {
//         position: relative;
//         width: 220px;
//       }

//       .account-dropdown-button {
//         width: 100%;
//         padding: 12px 16px;
//         background: var(--surface);
//         border: 2px solid var(--border);
//         border-radius: 16px;
//         display: flex;
//         align-items: center;
//         justify-content: space-between;
//         cursor: pointer;
//         transition: all 0.3s ease;
//         box-shadow: var(--shadow-sm);
//         animation: buttonPulse 2s infinite;
//       }

//       @keyframes buttonPulse {
//         0% { box-shadow: 0 0 0 0 rgba(255, 110, 74, 0.4); }
//         70% { box-shadow: 0 0 0 6px rgba(255, 110, 74, 0); }
//         100% { box-shadow: 0 0 0 0 rgba(255, 110, 74, 0); }
//       }

//       .account-dropdown-button:hover {
//         border-color: var(--primary);
//         transform: translateY(-2px);
//         box-shadow: var(--shadow);
//       }

//       .account-dropdown-button.active {
//         border-color: var(--primary);
//         box-shadow: 0 0 0 4px var(--primary-soft);
//       }

//       .selected-account-preview {
//         display: flex;
//         align-items: center;
//         gap: 12px;
//       }

//       .account-avatar {
//         width: 40px;
//         height: 40px;
//         border-radius: 12px;
//         background: var(--primary-gradient);
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         font-size: 20px;
//         color: white;
//         box-shadow: var(--shadow);
//       }

//       .account-info {
//         display: flex;
//         flex-direction: column;
//         gap: 2px;
//       }

//       .account-type {
//         font-size: 14px;
//         font-weight: 600;
//         color: var(--text-primary);
//       }

//       .account-number-preview {
//         display: flex;
//         align-items: center;
//         gap: 8px;
//       }

//       .account-masked {
//         font-size: 13px;
//         color: var(--text-muted);
//         font-family: 'SF Mono', monospace;
//       }

//       .dropdown-arrow {
//         color: var(--text-muted);
//         transition: transform 0.3s ease;
//         font-size: 18px;
//       }

//       .dropdown-arrow.open {
//         transform: rotate(180deg);
//         color: var(--primary);
//       }

//       .account-dropdown-menu {
//         position: absolute;
//         top: calc(100% + 8px);
//         left: 0;
//         right: 0;
//         background: var(--surface);
//         border: 2px solid var(--border);
//         border-radius: 16px;
//         box-shadow: var(--shadow-lg);
//         max-height: 350px;
//         overflow-y: auto;
//         z-index: 1000;
//         animation: dropdownSlide 0.3s ease;
//       }

//       @keyframes dropdownSlide {
//         from {
//           opacity: 0;
//           transform: translateY(-10px);
//         }
//         to {
//           opacity: 1;
//           transform: translateY(0);
//         }
//       }

//       .account-dropdown-item {
//         padding: 12px 16px;
//         cursor: pointer;
//         display: flex;
//         align-items: center;
//         gap: 12px;
//         border-bottom: 1px solid var(--border-light);
//         transition: all 0.2s ease;
//       }

//       .account-dropdown-item:last-child {
//         border-bottom: none;
//       }

//       .account-dropdown-item:hover {
//         background: var(--surface-hover);
//       }

//       .account-dropdown-item.selected {
//         background: var(--primary-soft);
//         border-left: 4px solid var(--primary);
//       }

//       .account-item-avatar {
//         width: 36px;
//         height: 36px;
//         border-radius: 10px;
//         background: var(--bg-secondary);
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         font-size: 18px;
//         color: var(--primary);
//       }

//       .account-item-details {
//         flex: 1;
//         display: flex;
//         flex-direction: column;
//         gap: 4px;
//       }

//       .account-item-type {
//         font-size: 14px;
//         font-weight: 600;
//         color: var(--text-primary);
//       }

//       .account-item-number {
//         display: flex;
//         align-items: center;
//         gap: 8px;
//       }

//       .account-item-masked {
//         font-size: 13px;
//         color: var(--text-muted);
//         font-family: 'SF Mono', monospace;
//       }

//       .loading-spinner {
//         width: 20px;
//         height: 20px;
//         border: 2px solid var(--border);
//         border-top-color: var(--primary);
//         border-radius: 50%;
//         animation: spin 1s linear infinite;
//       }

//       @keyframes spin {
//         0% { transform: rotate(0deg); }
//         100% { transform: rotate(360deg); }
//       }

//       .no-accounts {
//         padding: 24px;
//         text-align: center;
//         color: var(--text-muted);
//       }

//       /* Custom scrollbar */
//       .account-dropdown-menu::-webkit-scrollbar {
//         width: 6px;
//       }

//       .account-dropdown-menu::-webkit-scrollbar-track {
//         background: var(--border-light);
//         border-radius: 10px;
//       }

//       .account-dropdown-menu::-webkit-scrollbar-thumb {
//         background: var(--primary);
//         border-radius: 10px;
//       }

//       .account-dropdown-menu::-webkit-scrollbar-thumb:hover {
//         background: var(--primary-light);
//       }

//       /* Request type select */
//       .request-type-select {
//         padding: 12px 40px 12px 16px;
//         background: var(--surface);
//         border: 2px solid var(--border);
//         border-radius: 16px;
//         font-size: 14px;
//         font-weight: 500;
//         color: var(--text-primary);
//         cursor: pointer;
//         outline: none;
//         width: 220px;
//         appearance: none;
//         background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ff6e4a'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
//         background-repeat: no-repeat;
//         background-position: right 12px center;
//         background-size: 16px;
//         transition: all 0.2s ease;
//         animation: slideInRight 0.3s ease;
//       }

//       @keyframes slideInRight {
//         from {
//           opacity: 0;
//           transform: translateX(20px);
//         }
//         to {
//           opacity: 1;
//           transform: translateX(0);
//         }
//       }

//       .request-type-select:hover {
//         border-color: var(--primary);
//         transform: translateY(-2px);
//         box-shadow: var(--shadow);
//       }

//       .request-type-select:focus {
//         border-color: var(--primary);
//         box-shadow: 0 0 0 4px var(--primary-soft);
//       }

//       .request-type-select:disabled {
//         opacity: 0.5;
//         cursor: not-allowed;
//       }

//       .request-row {
//         transition: all 0.2s ease;
//         animation: fadeInRow 0.3s ease;
//       }

//       @keyframes fadeInRow {
//         from {
//           opacity: 0;
//           transform: translateX(-10px);
//         }
//         to {
//           opacity: 1;
//           transform: translateX(0);
//         }
//       }

//       .request-row:hover {
//         background-color: var(--surface-hover) !important;
//         transform: translateX(2px);
//       }

//       .pagination-button {
//         transition: all 0.2s ease;
//         color: var(--text-primary);
//         animation: bounceIn 0.3s ease;
//       }

//       @keyframes bounceIn {
//         0% { transform: scale(0.9); opacity: 0; }
//         50% { transform: scale(1.05); }
//         100% { transform: scale(1); opacity: 1; }
//       }

//       .pagination-button:hover:not(:disabled) {
//         background-color: var(--surface-hover);
//         border-color: var(--primary);
//         color: var(--primary);
//         transform: translateY(-2px);
//         box-shadow: var(--shadow);
//       }

//       .pagination-button.active {
//         background: var(--primary-gradient);
//         border-color: var(--primary);
//         color: white;
//         animation: pulseActive 2s infinite;
//       }

//       @keyframes pulseActive {
//         0% { box-shadow: 0 0 0 0 rgba(255, 110, 74, 0.4); }
//         70% { box-shadow: 0 0 0 6px rgba(255, 110, 74, 0); }
//         100% { box-shadow: 0 0 0 0 rgba(255, 110, 74, 0); }
//       }

//       .view-button {
//         transition: all 0.3s ease;
//         animation: slideInUp 0.3s ease;
//       }

//       @keyframes slideInUp {
//         from {
//           opacity: 0;
//           transform: translateY(10px);
//         }
//         to {
//           opacity: 1;
//           transform: translateY(0);
//         }
//       }

//       .view-button:hover {
//         background: var(--primary-gradient) !important;
//         transform: translateY(-3px) scale(1.05);
//         box-shadow: var(--shadow-hover);
//       }

//       .clear-button {
//         transition: all 0.3s ease;
//         animation: rotateIn 0.3s ease;
//       }

//       @keyframes rotateIn {
//         from {
//           opacity: 0;
//           transform: rotate(-90deg);
//         }
//         to {
//           opacity: 1;
//           transform: rotate(0);
//         }
//       }

//       .clear-button:hover {
//         transform: rotate(90deg) scale(1.1);
//         background-color: var(--danger) !important;
//         color: white !important;
//       }

//       @keyframes loaderPulse {
//         0%, 100% { transform: scaleY(1); opacity: 1; }
//         50% { transform: scaleY(1.5); opacity: 0.7; }
//       }
      
//       @keyframes progress {
//         0% { transform: translateX(-100%); }
//         50% { transform: translateX(0); }
//         100% { transform: translateX(100%); }
//       }

//       .loaderBar:nth-child(2) { animation-delay: 0.1s; }
//       .loaderBar:nth-child(3) { animation-delay: 0.2s; }
//       .loaderBar:nth-child(4) { animation-delay: 0.3s; }
      
//       /* Smooth scrolling */
//       * {
//         scroll-behavior: smooth;
//       }
//     `;
//     document.head.appendChild(styleSheet);
//   }, []);

//   // Request type options with colors
//   const requestTypeOptions = [
//     { value: "ALL", label: "All Requests", color: "var(--text-primary)" },
//     { value: "CHEQUE_LEAVES", label: "Cheque Leaves", color: "var(--primary)" },
//     { value: "CREDIT_LIMIT", label: "Credit Limit", color: "#8b5cf6" },
//     { value: "LOST_CARD", label: "Lost Card", color: "var(--danger)" },
//     { value: "GENERAL_QUERY", label: "General Query", color: "var(--success)" }
//   ];

//   // Function to get last 4 digits
//   const getLast4Digits = (accountNumber) => {
//     if (!accountNumber) return "";
//     const str = accountNumber.toString();
//     return str.slice(-4);
//   };

//   // Function to get account icon based on type
//   const getAccountIcon = (type) => {
//     if (type?.toLowerCase().includes('savings')) return '💰';
//     if (type?.toLowerCase().includes('current')) return '💳';
//     if (type?.toLowerCase().includes('salary')) return '💼';
//     return '🏦';
//   };

//   // Fetch accounts from API
//   const fetchAccounts = async () => {
//     if (!customerId) return;

//     setLoadingAccounts(true);
//     try {
//       const response = await API.get(`/abcbank/api/account/userAccounts/${customerId}`);
      
//       if (response.data && response.data.status && Array.isArray(response.data.data)) {
//         const fetchedAccounts = response.data.data.map(acc => ({
//           number: acc.accountNumber.toString(),
//           type: acc.accountTypeName,
//           icon: getAccountIcon(acc.accountTypeName),
//           last4: getLast4Digits(acc.accountNumber),
//           displayLabel: `${acc.accountTypeName} - ${getLast4Digits(acc.accountNumber)}`,
//           branchName: acc.branchName
//         }));

//         // Sort accounts: Savings first, then Current, then Salary
//         const sortedAccounts = fetchedAccounts.sort((a, b) => {
//           const typeOrder = {
//             'Savings Account': 1,
//             'Current Account': 2,
//             'Salary Account': 3
//           };
//           return (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99);
//         });

//         setAccounts(sortedAccounts);
        
//         // Auto-select first account if none selected
//         if (sortedAccounts.length > 0 && !selectedAccount) {
//           setSelectedAccount(sortedAccounts[0].number);
//           setSelectedAccountDetails(sortedAccounts[0]);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching accounts:", error);
//       setError("Failed to fetch accounts");
//     } finally {
//       setLoadingAccounts(false);
//     }
//   };

//   // Fetch accounts on mount and when customerId changes
//   useEffect(() => {
//     if (customerId) {
//       fetchAccounts();
//     }
//   }, [customerId]);

//   // Update selected account details when account changes
//   useEffect(() => {
//     if (selectedAccount && accounts.length > 0) {
//       const details = accounts.find(acc => acc.number === selectedAccount);
//       setSelectedAccountDetails(details);
//     }
//   }, [selectedAccount, accounts]);

//   // Fetch all requests when account changes
//   useEffect(() => {
//     if (selectedAccount) {
//       fetchAllRequests(selectedAccount);
//     }
//   }, [selectedAccount]);

//   // Apply filter whenever requests or selectedRequestType changes
//   useEffect(() => {
//     applyFilter();
//     setCurrentPage(1);
//   }, [requests, selectedRequestType]);

//   const fetchAllRequests = async (accountNumber) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const payload = { accountNumber: Number(accountNumber) };
      
//       // Fetch cards for this account
//       let accountCards = [];
//       try {
//         const cardsResponse = await API.get(`/abcbank/api/account/userCardsByStatus/${accountNumber}`);
//         if (cardsResponse.data?.status && Array.isArray(cardsResponse.data.data)) {
//           accountCards = cardsResponse.data.data;
//           console.log("Fetched cards:", accountCards);
//         }
//       } catch (error) {
//         console.log("Error fetching cards:", error);
//       }

//       // Prepare all API calls
//       const apiCalls = [
//         // Existing account-based APIs
//         API.post("/abcbank/api/chequeRequest/chequeRequestList", payload),
//         API.post("/abcbank/api/creditLimit/creditLimitListByAccount", payload),
//         API.post("/abcbank/api/lostCard/lostRequestList", payload),
//         API.post("/abcbank/api/queriesResponse/queriesList", payload)
//       ];

//       // Add card-based API calls if cards exist
//       if (accountCards.length > 0) {
//         accountCards.forEach(card => {
//           const cardNumber = card.cardNumber;
//           if (cardNumber) {
//             // Add credit limit by card
//             apiCalls.push(
//               API.post("/abcbank/api/creditLimit/creditLimitListByCard", { 
//                 cardNumber: Number(cardNumber) 
//               })
//             );
            
//             // Add lost card by card
//             apiCalls.push(
//               API.post("/abcbank/api/lostCard/lostRequestList", { 
//                 cardNumber: Number(cardNumber) 
//               })
//             );
//           }
//         });
//       }

//       // Execute all API calls
//       const responses = await Promise.allSettled(apiCalls);

//       // Process Cheque Requests (index 0)
//       const chequeRequests = responses[0]?.status === 'fulfilled' && responses[0].value.data?.status
//         ? (responses[0].value.data.data || []).map(req => ({
//             id: `chq-${req.chequeRequestId}`,
//             type: "CHEQUE_Leaves",
//             typeLabel: "Cheque Leaves",
//             description: `${req.noOfLeaves} leaves`,
//             requestDate: req.requestedDate,
//             status: req.status || "PENDING",
//             approvedDate: req.approvedDate || "-",
//             remarks: req.remarks || "-",
//             rejectReason: req.rejectReason || "-",
//             accountNumber: accountNumber,
//             fullDetails: {
//               requestType: "Cheque Leaves",
//               description: `${req.noOfLeaves} leaves`,
//               requestedDate: req.requestedDate,
//               status: req.status || "PENDING",
//               approvedDate: req.approvedDate || "-",
//               remarks: req.remarks || "-",
//               rejectReason: req.rejectReason || "-",
//               accountNumber: accountNumber,
//               noOfLeaves: req.noOfLeaves
//             }
//           }))
//         : [];

//       // Process Credit Limit Requests by Account (index 1)
//       const creditRequestsByAccount = responses[1]?.status === 'fulfilled' && responses[1].value.data?.status
//         ? (responses[1].value.data.data || []).map(req => ({
//             id: `crd-acc-${req.increaseCreditLimitId}`,
//             type: "CREDIT_LIMIT",
//             typeLabel: "Credit Limit",
//             description: `₹${req.requestedLimit?.toLocaleString()}`,
//             requestDate: req.requestDate,
//             status: req.status || "PENDING",
//             approvedDate: req.approvedDate || "-",
//             remarks: req.remarks || "-",
//             rejectReason: req.rejectReason || "-",
//             accountNumber: accountNumber,
//             cardNumber: req.cardNumber,
//             fullDetails: {
//               requestType: "Credit Limit",
//               description: `₹${req.requestedLimit?.toLocaleString()}`,
//               requestedDate: req.requestDate,
//               status: req.status || "PENDING",
//               approvedDate: req.approvedDate || "-",
//               remarks: req.remarks || "-",
//               rejectReason: req.rejectReason || "-",
//               accountNumber: accountNumber,
//               cardNumber: req.cardNumber,
//               requestedLimit: req.requestedLimit,
//               currentLimit: req.currentLimitAtRequest || req.currentLimit,
//               fullName: req.fullName,
//               mobileNumber: req.mobileNumber,
//               city: req.city,
//               email: req.email
//             }
//           }))
//         : [];

//       // Process Lost Card Requests by Account (index 2)
//       const lostCardRequestsByAccount = responses[2]?.status === 'fulfilled' && responses[2].value.data?.status
//         ? (responses[2].value.data.data || []).map(req => ({
//             id: `lst-acc-${req.lostCardId}`,
//             type: "LOST_CARD",
//             typeLabel: "Lost Card",
//             description: `Card ****${req.lostCardNumber?.toString().slice(-4)}`,
//             requestDate: req.createdDate,
//             status: req.status || "PENDING",
//             approvedDate: req.approvedDate || "-",
//             remarks: req.remarks || "-",
//             rejectReason: req.rejectReason || "-",
//             accountNumber: accountNumber,
//             cardNumber: req.cardNumber || req.lostCardNumber,
//             fullDetails: {
//               requestType: "Lost Card",
//               description: `Card Number: ****${req.lostCardNumber?.toString().slice(-4)}`,
//               requestedDate: req.createdDate,
//               status: req.status || "PENDING",
//               approvedDate: req.approvedDate || "-",
//               remarks: req.remarks || "-",
//               rejectReason: req.rejectReason || "-",
//               accountNumber: accountNumber,
//               cardNumber: req.cardNumber || req.lostCardNumber,
//               lostCardNumber: req.lostCardNumber,
//               lostCardStolenDate: req.lostCardStolenDate,
//               fullName: req.fullName,
//               mobileNumber: req.mobileNumber,
//               city: req.city,
//               email: req.email
//             }
//           }))
//         : [];

//       // Process General Queries (index 3)
//       const generalQueries = responses[3]?.status === 'fulfilled' && responses[3].value.data?.status
//         ? (responses[3].value.data.data || []).map(req => ({
//             id: `qry-${req.queriesId}`,
//             type: "GENERAL_QUERY",
//             typeLabel: "General Query",
//             description: req.customerQuery.length > 30 ? req.customerQuery.substring(0, 30) + '...' : req.customerQuery,
//             requestDate: req.queryRaisedDate,
//             status: req.status || "PENDING",
//             approvedDate: req.queryApprovedDate || "-",
//             remarks: req.queryResponse || "-",
//             rejectReason: req.rejectReason || "-",
//             accountNumber: accountNumber,
//             fullDetails: {
//               requestType: "General Query",
//               description: req.customerQuery,
//               requestedDate: req.queryRaisedDate,
//               status: req.status || "PENDING",
//               approvedDate: req.queryApprovedDate || "-",
//               remarks: req.queryResponse || "-",
//               rejectReason: req.rejectReason || "-",
//               accountNumber: accountNumber,
//               customerQuery: req.customerQuery,
//               queryResponse: req.queryResponse
//             }
//           }))
//         : [];

//       // Process Credit Limit Requests by Card (starting from index 4)
//       const creditRequestsByCard = [];
//       const lostCardRequestsByCard = [];
      
//       if (accountCards.length > 0) {
//         let cardIndex = 4; // Start after the 4 account-based APIs
        
//         for (let i = 0; i < accountCards.length; i++) {
//           // Credit limit by card
//           const creditResponse = responses[cardIndex];
//           if (creditResponse?.status === 'fulfilled' && creditResponse.value?.data?.status) {
//             const cardRequests = (creditResponse.value.data.data || []).map(req => ({
//               id: `crd-card-${req.increaseCreditLimitId}-${i}`,
//               type: "CREDIT_LIMIT",
//               typeLabel: "Credit Limit",
//               description: `₹${req.requestedLimit?.toLocaleString()}`,
//               requestDate: req.requestDate,
//               status: req.status || "PENDING",
//               approvedDate: req.approvedDate || "-",
//               remarks: req.remarks || "-",
//               rejectReason: req.rejectReason || "-",
//               accountNumber: req.accountNumber || accountNumber,
//               cardNumber: req.cardNumber,
//               fullDetails: {
//                 requestType: "Credit Limit",
//                 description: `₹${req.requestedLimit?.toLocaleString()}`,
//                 requestedDate: req.requestDate,
//                 status: req.status || "PENDING",
//                 approvedDate: req.approvedDate || "-",
//                 remarks: req.remarks || "-",
//                 rejectReason: req.rejectReason || "-",
//                 accountNumber: req.accountNumber || accountNumber,
//                 cardNumber: req.cardNumber,
//                 requestedLimit: req.requestedLimit,
//                 currentLimit: req.currentLimitAtRequest,
//                 fullName: req.fullName,
//                 mobileNumber: req.mobileNumber,
//                 city: req.city,
//                 email: req.email
//               }
//             }));
//             creditRequestsByCard.push(...cardRequests);
//           }
//           cardIndex++;

//           // Lost card by card
//           const lostResponse = responses[cardIndex];
//           if (lostResponse?.status === 'fulfilled' && lostResponse.value?.data?.status) {
//             const cardRequests = (lostResponse.value.data.data || []).map(req => ({
//               id: `lst-card-${req.lostCardId}-${i}`,
//               type: "LOST_CARD",
//               typeLabel: "Lost Card",
//               description: `Card ****${req.lostCardNumber?.toString().slice(-4)}`,
//               requestDate: req.createdDate,
//               status: req.status || "PENDING",
//               approvedDate: req.approvedDate || "-",
//               remarks: req.remarks || "-",
//               rejectReason: req.rejectReason || "-",
//               accountNumber: req.accountNumber || accountNumber,
//               cardNumber: req.cardNumber || req.lostCardNumber,
//               fullDetails: {
//                 requestType: "Lost Card",
//                 description: `Card Number: ****${req.lostCardNumber?.toString().slice(-4)}`,
//                 requestedDate: req.createdDate,
//                 status: req.status || "PENDING",
//                 approvedDate: req.approvedDate || "-",
//                 remarks: req.remarks || "-",
//                 rejectReason: req.rejectReason || "-",
//                 accountNumber: req.accountNumber || accountNumber,
//                 cardNumber: req.cardNumber || req.lostCardNumber,
//                 lostCardNumber: req.lostCardNumber,
//                 lostCardStolenDate: req.lostCardStolenDate,
//                 fullName: req.fullName,
//                 mobileNumber: req.mobileNumber,
//                 city: req.city,
//                 email: req.email
//               }
//             }));
//             lostCardRequestsByCard.push(...cardRequests);
//           }
//           cardIndex++;
//         }
//       }

//       // Combine all credit limit requests
//       const creditRequests = [...creditRequestsByAccount, ...creditRequestsByCard];
      
//       // Combine all lost card requests
//       const lostCardRequests = [...lostCardRequestsByAccount, ...lostCardRequestsByCard];

//       const allRequests = [
//         ...chequeRequests,
//         ...creditRequests,
//         ...lostCardRequests,
//         ...generalQueries
//       ].sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));

//       setRequests(allRequests);

//     } catch (error) {
//       console.error("Failed to fetch requests", error);
//       setError(
//         error.response?.data?.message || 
//         "Network error. Please check if backend is running."
//       );
//       setRequests([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Apply filter based on selected request type
//   const applyFilter = () => {
//     if (selectedRequestType === "ALL") {
//       setFilteredRequests(requests);
//     } else {
//       const filtered = requests.filter(req => req.type === selectedRequestType);
//       setFilteredRequests(filtered);
//     }
//   };

//   // Clear filter
//   const clearFilter = () => {
//     setSelectedRequestType("ALL");
//   };

//   // Open modal with request details
//   const openRequestDetails = (request) => {
//     setSelectedRequest(request);
//     setModalOpen(true);
//   };

//   // Close modal
//   const closeModal = () => {
//     setModalOpen(false);
//     setSelectedRequest(null);
//   };

//   // Get current page items
//   const getCurrentPageItems = () => {
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     return filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
//   };

//   // Change page
//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     const tableContainer = document.getElementById('requests-table-container');
//     if (tableContainer) {
//       tableContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   };

//   // Calculate total pages
//   const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

//   // Helper function for status colors
//   const getStatusStyle = (status) => {
//     const statusUpper = status?.toUpperCase() || "PENDING";
//     switch (statusUpper) {
//       case "APPROVED":
//         return {
//           background: "var(--success-soft)",
//           color: "var(--success)",
//           border: "1px solid var(--success)",
//         };
//       case "REJECTED":
//         return {
//           background: "var(--danger-soft)",
//           color: "var(--danger)",
//           border: "1px solid var(--danger)",
//         };
//       case "PENDING":
//         return {
//           background: "var(--warning-soft)",
//           color: "var(--warning)",
//           border: "1px solid var(--warning)",
//         };
//       default:
//         return {
//           background: "var(--hover-bg)",
//           color: "var(--text-secondary)",
//           border: "1px solid var(--border)",
//         };
//     }
//   };

//   // Get request type label
//   const getRequestTypeLabel = (type) => {
//     const option = requestTypeOptions.find(opt => opt.value === type);
//     return option ? option.label : type;
//   };

//   // Get request type color
//   const getTypeColor = (type) => {
//     const option = requestTypeOptions.find(opt => opt.value === type);
//     return option?.color || "var(--text-muted)";
//   };

//   // Format date to DD-MM-YYYY
//   const formatDate = (date) => {
//     if (!date || date === "-") return "-";
//     try {
//       const d = new Date(date);
//       const day = d.getDate().toString().padStart(2, '0');
//       const month = (d.getMonth() + 1).toString().padStart(2, '0');
//       const year = d.getFullYear();
//       return `${day}-${month}-${year}`;
//     } catch (e) {
//       return date;
//     }
//   };

//   // Loading animation
//   if (loading) {
//     return (
//       <div style={styles.loadingContainer}>
//         <div style={styles.bankLoader}>
//           <div style={styles.loaderWrapper}>
//             <div style={styles.loaderBar}></div>
//             <div style={styles.loaderBar}></div>
//             <div style={styles.loaderBar}></div>
//             <div style={styles.loaderBar}></div>
//           </div>
//           <h3 style={styles.loadingTitle}>ABC Bank</h3>
//           <p style={styles.loadingSubtitle}>Loading your requests...</p>
//           <div style={styles.progressBar}>
//             <div style={styles.progressFill}></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div style={styles.container}>
//         <div style={styles.error}>
//           <svg style={styles.errorIcon} viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" fill="none">
//             <circle cx="12" cy="12" r="10" strokeWidth="2"/>
//             <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2"/>
//             <circle cx="12" cy="16" r="1" fill="currentColor"/>
//           </svg>
//           <p style={styles.errorText}>{error}</p>
//           <button 
//             onClick={() => selectedAccount && fetchAllRequests(selectedAccount)} 
//             style={styles.retryButton}
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Get current page items
//   const currentItems = getCurrentPageItems();

//   return (
//     <div style={styles.container}>
//       {/* Request Details Modal - Enhanced with better contrast */}
//       {modalOpen && selectedRequest && (
//         <div style={styles.modalOverlay} onClick={closeModal}>
//           <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//             <div style={styles.modalHeader}>
//               <h2 style={styles.modalTitle}>Request Details</h2>
//               <button style={styles.modalCloseButton} onClick={closeModal}>×</button>
//             </div>
            
//             <div style={styles.modalBody}>
//               {/* Status Card */}
//               <div style={styles.modalStatusCard}>
//                 <div style={styles.modalStatusHeader}>
//                   <span style={styles.modalStatusLabel}>Current Status</span>
//                   <span style={{
//                     ...styles.modalStatusBadge,
//                     ...getStatusStyle(selectedRequest.status)
//                   }}>
//                     {selectedRequest.status || "PENDING"}
//                   </span>
//                 </div>
//               </div>

//               {/* Request Details Grid - Enhanced contrast */}
//               <div style={styles.modalDetailsGrid}>
//                 {/* Left Column - Request Information */}
//                 <div style={styles.modalDetailCard}>
//                   <h3 style={styles.modalCardTitle}>Request Information</h3>
//                   <div style={styles.modalDetailRow}>
//                     <span style={styles.modalDetailLabel}>Request Type</span>
//                     <span style={styles.modalDetailValueDark}>{selectedRequest.typeLabel}</span>
//                   </div>
//                   <div style={styles.modalDetailRow}>
//                     <span style={styles.modalDetailLabel}>Description</span>
//                     <span style={styles.modalDetailValueDark}>{selectedRequest.fullDetails?.description || selectedRequest.description}</span>
//                   </div>
//                   <div style={styles.modalDetailRow}>
//                     <span style={styles.modalDetailLabel}>Requested Date</span>
//                     <span style={styles.modalDetailValueDark}>{formatDate(selectedRequest.requestDate)}</span>
//                   </div>
//                   <div style={styles.modalDetailRow}>
//                     <span style={styles.modalDetailLabel}>Account Number</span>
//                     <span style={styles.modalDetailValueDark}>****{selectedRequest.accountNumber?.toString().slice(-4) || "****"}</span>
//                   </div>
                  
//                   {/* Show Card Number if available */}
//                   {selectedRequest.cardNumber && (
//                     <div style={styles.modalDetailRow}>
//                       <span style={styles.modalDetailLabel}>Card Number</span>
//                       <span style={styles.modalDetailValueDark}>****{selectedRequest.cardNumber?.toString().slice(-4)}</span>
//                     </div>
//                   )}
                  
//                   {/* Service-specific fields */}
//                   {selectedRequest.type === "CHEQUE_BOOK" && selectedRequest.fullDetails?.noOfLeaves && (
//                     <div style={styles.modalDetailRow}>
//                       <span style={styles.modalDetailLabel}>Number of Leaves</span>
//                       <span style={styles.modalDetailValueDark}>{selectedRequest.fullDetails.noOfLeaves}</span>
//                     </div>
//                   )}
                  
//                   {selectedRequest.type === "CREDIT_LIMIT" && (
//                     <>
//                       {selectedRequest.fullDetails?.currentLimit && (
//                         <div style={styles.modalDetailRow}>
//                           <span style={styles.modalDetailLabel}>Current Limit</span>
//                           <span style={styles.modalDetailValueDark}>₹{selectedRequest.fullDetails.currentLimit?.toLocaleString()}</span>
//                         </div>
//                       )}
//                       {selectedRequest.fullDetails?.requestedLimit && (
//                         <div style={styles.modalDetailRow}>
//                           <span style={styles.modalDetailLabel}>Requested Limit</span>
//                           <span style={styles.modalDetailValueDark}>₹{selectedRequest.fullDetails.requestedLimit?.toLocaleString()}</span>
//                         </div>
//                       )}
//                       {selectedRequest.fullDetails?.fullName && (
//                         <div style={styles.modalDetailRow}>
//                           <span style={styles.modalDetailLabel}>Customer Name</span>
//                           <span style={styles.modalDetailValueDark}>{selectedRequest.fullDetails.fullName}</span>
//                         </div>
//                       )}
//                       {selectedRequest.fullDetails?.mobileNumber && (
//                         <div style={styles.modalDetailRow}>
//                           <span style={styles.modalDetailLabel}>Mobile Number</span>
//                           <span style={styles.modalDetailValueDark}>{selectedRequest.fullDetails.mobileNumber}</span>
//                         </div>
//                       )}
//                     </>
//                   )}
                  
//                   {selectedRequest.type === "LOST_CARD" && (
//                     <>
//                       {selectedRequest.fullDetails?.lostCardNumber && (
//                         <div style={styles.modalDetailRow}>
//                           <span style={styles.modalDetailLabel}>Lost Card Number</span>
//                           <span style={styles.modalDetailValueDark}>****{selectedRequest.fullDetails.lostCardNumber?.toString().slice(-4)}</span>
//                         </div>
//                       )}
//                       {selectedRequest.fullDetails?.lostCardStolenDate && (
//                         <div style={styles.modalDetailRow}>
//                           <span style={styles.modalDetailLabel}>Lost/Stolen Date</span>
//                           <span style={styles.modalDetailValueDark}>{formatDate(selectedRequest.fullDetails.lostCardStolenDate)}</span>
//                         </div>
//                       )}
//                       {selectedRequest.fullDetails?.fullName && (
//                         <div style={styles.modalDetailRow}>
//                           <span style={styles.modalDetailLabel}>Customer Name</span>
//                           <span style={styles.modalDetailValueDark}>{selectedRequest.fullDetails.fullName}</span>
//                         </div>
//                       )}
//                     </>
//                   )}
                  
//                   {selectedRequest.type === "GENERAL_QUERY" && selectedRequest.fullDetails?.customerQuery && (
//                     <div style={styles.modalDetailRow}>
//                       <span style={styles.modalDetailLabel}>Query</span>
//                       <span style={styles.modalDetailValueDark}>{selectedRequest.fullDetails.customerQuery}</span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Right Column - Additional Information */}
//                 <div style={styles.modalDetailCard}>
//                   <h3 style={styles.modalCardTitle}>Additional Information</h3>
//                   <div style={styles.modalDetailRow}>
//                     <span style={styles.modalDetailLabel}>Approved Date</span>
//                     <span style={styles.modalDetailValueDark}>{formatDate(selectedRequest.approvedDate)}</span>
//                   </div>
//                   <div style={styles.modalDetailRow}>
//                     <span style={styles.modalDetailLabel}>Remarks</span>
//                     <span style={styles.modalDetailValueDark}>{selectedRequest.remarks || "-"}</span>
//                   </div>
//                   {selectedRequest.rejectReason && selectedRequest.rejectReason !== "-" && (
//                     <div style={styles.modalDetailRow}>
//                       <span style={styles.modalDetailLabel}>Reject Reason</span>
//                       <span style={{...styles.modalDetailValueDark, color: "var(--danger)"}}>{selectedRequest.rejectReason}</span>
//                     </div>
//                   )}
                  
//                   {selectedRequest.type === "GENERAL_QUERY" && selectedRequest.fullDetails?.queryResponse && (
//                     <div style={styles.modalDetailRow}>
//                       <span style={styles.modalDetailLabel}>Response</span>
//                       <span style={styles.modalDetailValueDark}>{selectedRequest.fullDetails.queryResponse}</span>
//                     </div>
//                   )}
                  
//                   {/* Show contact details for credit limit and lost card */}
//                   {(selectedRequest.type === "CREDIT_LIMIT" || selectedRequest.type === "LOST_CARD") && (
//                     <>
//                       {selectedRequest.fullDetails?.email && (
//                         <div style={styles.modalDetailRow}>
//                           <span style={styles.modalDetailLabel}>Email</span>
//                           <span style={styles.modalDetailValueDark}>{selectedRequest.fullDetails.email}</span>
//                         </div>
//                       )}
//                       {selectedRequest.fullDetails?.city && (
//                         <div style={styles.modalDetailRow}>
//                           <span style={styles.modalDetailLabel}>City</span>
//                           <span style={styles.modalDetailValueDark}>{selectedRequest.fullDetails.city}</span>
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div style={styles.modalFooter}>
//               <button style={styles.modalCloseBtn} onClick={closeModal}>
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Header with Filters - Clean layout */}
//       <div style={styles.headerContainer}>
//         <div style={styles.titleSection}>
//           <h1 style={styles.bankTitle}>ABC Bank</h1>
//           <h2 style={styles.title}>My Requests</h2>
//         </div>
        
//         {/* Filter Section - Both dropdowns same size (220px) */}
//         <div style={styles.filterSection}>
//           {/* Account Dropdown */}
//           <div ref={accountDropdownRef} className="account-dropdown-container">
//             <div 
//               className={`account-dropdown-button ${isAccountDropdownOpen ? 'active' : ''}`}
//               onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
//             >
//               {selectedAccountDetails ? (
//                 <div className="selected-account-preview">
//                   <div className="account-avatar">
//                     {selectedAccountDetails.icon}
//                   </div>
//                   <div className="account-info">
//                     <span className="account-type">{selectedAccountDetails.type}</span>
//                     <div className="account-number-preview">
//                       <span className="account-masked">****{selectedAccountDetails.last4}</span>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="selected-account-preview">
//                   <div className="account-avatar">🏦</div>
//                   <div className="account-info">
//                     <span className="account-type">Select Account</span>
//                   </div>
//                 </div>
//               )}
//               <span className={`dropdown-arrow ${isAccountDropdownOpen ? 'open' : ''}`}>▼</span>
//             </div>

//             {isAccountDropdownOpen && (
//               <div className="account-dropdown-menu">
//                 {loadingAccounts ? (
//                   <div className="no-accounts">
//                     <div className="loading-spinner" style={{ margin: '0 auto 10px' }}></div>
//                     <p>Loading accounts...</p>
//                   </div>
//                 ) : accounts.length > 0 ? (
//                   accounts.map(account => (
//                     <div
//                       key={account.number}
//                       className={`account-dropdown-item ${selectedAccount === account.number ? 'selected' : ''}`}
//                       onClick={() => {
//                         setSelectedAccount(account.number);
//                         setIsAccountDropdownOpen(false);
//                       }}
//                     >
//                       <div className="account-item-avatar">{account.icon}</div>
//                       <div className="account-item-details">
//                         <div className="account-item-type">{account.type}</div>
//                         <div className="account-item-number">
//                           <span className="account-item-masked">****{account.last4}</span>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="no-accounts">
//                     <p>No accounts found</p>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Request Type Filter - Same size as account dropdown */}
//           <div style={styles.requestTypeWrapper}>
//             <select
//               value={selectedRequestType}
//               onChange={(e) => setSelectedRequestType(e.target.value)}
//               className="request-type-select"
//               disabled={!selectedAccount}
//             >
//               {requestTypeOptions.map(option => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>

//             {selectedRequestType !== "ALL" && (
//               <button onClick={clearFilter} style={styles.compactClearButton} className="clear-button" title="Clear Filter">
//                 ✕
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Account Info - REMOVED as requested */}
      
//       {/* No Account Selected */}
//       {!selectedAccount && (
//         <div style={styles.empty}>
//           <div style={styles.emptyIconContainer}>🏦</div>
//           <h3 style={styles.emptyTitle}>Select an Account</h3>
//           <p style={styles.emptyText}>Please select an account to view your requests</p>
//         </div>
//       )}

//       {/* Requests Table */}
//       {selectedAccount && filteredRequests.length > 0 && (
//         <>
//           {/* Request Count and Pagination Info */}
//           <div id="requests-table-container" style={styles.statsBar}>
//             <div style={styles.statsLeft}>
//               <span style={styles.requestCount}>{filteredRequests.length} Total Requests</span>
//               <span style={styles.pageInfo}>
//                 Page {currentPage} of {totalPages}
//               </span>
//             </div>
//           </div>

//           {/* Table Container - 4 Columns with Dark Headings */}
//           <div style={styles.tableContainer}>
//             <table style={styles.table}>
//               <thead>
//                 <tr>
//                   <th style={styles.th}>Request Type</th>
//                   <th style={styles.th}>Requested Date</th>
//                   <th style={styles.th}>Status</th>
//                   <th style={styles.th}>View</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentItems.map((item, index) => (
//                   <tr key={item.id} style={{
//                     ...styles.tr,
//                     backgroundColor: index % 2 === 0 ? 'var(--surface)' : 'var(--bg-secondary)',
//                   }} className="request-row">
//                     <td style={styles.td}>
//                       <span style={{
//                         ...styles.typeBadge,
//                         backgroundColor: `${getTypeColor(item.type)}20`,
//                         color: getTypeColor(item.type),
//                         borderColor: getTypeColor(item.type),
//                       }} className="type-badge">
//                         {item.typeLabel}
//                       </span>
//                     </td>
//                     <td style={styles.td}>
//                       <span style={styles.dateDark}>{formatDate(item.requestDate)}</span>
//                     </td>
//                     <td style={styles.td}>
//                       <span style={{
//                         ...styles.statusBadge,
//                         ...getStatusStyle(item.status)
//                       }}>
//                         {item.status}
//                       </span>
//                     </td>
//                     <td style={styles.td}>
//                       <button 
//                         style={styles.viewButton}
//                         onClick={() => openRequestDetails(item)}
//                         className="view-button"
//                       >
//                         View Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div style={styles.paginationContainer}>
//               <div style={styles.pagination}>
//                 <button
//                   onClick={() => paginate(1)}
//                   disabled={currentPage === 1}
//                   style={styles.pageNavButton}
//                   className="pagination-button"
//                 >
//                   « First
//                 </button>
//                 <button
//                   onClick={() => paginate(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   style={styles.pageNavButton}
//                   className="pagination-button"
//                 >
//                   ← Prev
//                 </button>
                
//                 <div style={styles.pageNumbers}>
//                   {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                     let pageNum;
//                     if (totalPages <= 5) {
//                       pageNum = i + 1;
//                     } else if (currentPage <= 3) {
//                       pageNum = i + 1;
//                     } else if (currentPage >= totalPages - 2) {
//                       pageNum = totalPages - 4 + i;
//                     } else {
//                       pageNum = currentPage - 2 + i;
//                     }
                    
//                     return (
//                       <button
//                         key={pageNum}
//                         onClick={() => paginate(pageNum)}
//                         className={`pagination-button ${currentPage === pageNum ? 'active' : ''}`}
//                         style={{
//                           ...styles.pageNumber,
//                           ...(currentPage === pageNum ? styles.pageNumberActive : {})
//                         }}
//                       >
//                         {pageNum}
//                       </button>
//                     );
//                   })}
//                 </div>
                
//                 <button
//                   onClick={() => paginate(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   style={styles.pageNavButton}
//                   className="pagination-button"
//                 >
//                   Next →
//                 </button>
//                 <button
//                   onClick={() => paginate(totalPages)}
//                   disabled={currentPage === totalPages}
//                   style={styles.pageNavButton}
//                   className="pagination-button"
//                 >
//                   Last »
//                 </button>
//               </div>

//               <div style={styles.paginationInfo}>
//                 Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredRequests.length)} of {filteredRequests.length} requests
//               </div>
//             </div>
//           )}
//         </>
//       )}

//       {/* Empty State - No Results */}
//       {selectedAccount && filteredRequests.length === 0 && (
//         <div style={styles.noResults}>
//           <div style={styles.noResultsIcon}>📋</div>
//           <h3 style={styles.noResultsTitle}>No Requests Found</h3>
//           <p style={styles.noResultsText}>
//             {requests.length === 0 
//               ? "You haven't submitted any requests yet." 
//               : `No ${selectedRequestType !== "ALL" ? getRequestTypeLabel(selectedRequestType) : ""} requests found.`}
//           </p>
//           {selectedRequestType !== "ALL" && requests.length > 0 && (
//             <button onClick={clearFilter} style={styles.clearAllButton}>
//               View All Requests
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// // Professional styles with enhanced contrast and dark headings
// const styles = {
//   container: {
//     maxWidth: "1400px",
//     margin: "0 auto",
//     padding: "24px",
//     fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
//     backgroundColor: "var(--bg-primary)",
//     minHeight: "100vh",
//     height: "100%",
//     overflowY: "auto",
//     color: "var(--text-primary)",
//   },
//   headerContainer: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "24px",
//     flexWrap: "wrap",
//     gap: "16px",
//   },
//   titleSection: {
//     flex: 1,
//   },
//   bankTitle: {
//     fontSize: "20px",
//     fontWeight: "600",
//     color: "var(--primary)",
//     margin: "0 0 4px 0",
//     letterSpacing: "0.5px",
//   },
//   title: {
//     fontSize: "28px",
//     fontWeight: "700",
//     color: "#000000",
//     margin: 0,
//     letterSpacing: "-0.02em",
//   },
//   filterSection: {
//     display: "flex",
//     gap: "16px",
//     alignItems: "center",
//     flexWrap: "wrap",
//   },
//   requestTypeWrapper: {
//     display: "flex",
//     gap: "8px",
//     alignItems: "center",
//   },
//   compactClearButton: {
//     width: "44px",
//     height: "44px",
//     backgroundColor: "var(--danger)",
//     color: "white",
//     border: "none",
//     borderRadius: "14px",
//     fontSize: "18px",
//     fontWeight: "600",
//     cursor: "pointer",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     transition: "all 0.2s",
//     boxShadow: "var(--shadow-sm)",
//     ':hover': {
//       transform: "rotate(90deg)",
//       backgroundColor: "var(--danger-soft)",
//       color: "var(--danger)",
//     }
//   },
//   viewButton: {
//     padding: "8px 20px",
//     backgroundColor: "var(--primary)",
//     color: "white",
//     border: "none",
//     borderRadius: "30px",
//     fontSize: "13px",
//     fontWeight: "600",
//     cursor: "pointer",
//     transition: "all 0.2s",
//     boxShadow: "var(--shadow-sm)",
//     minWidth: "100px",
//     ':hover': {
//       backgroundColor: "var(--primary-light)",
//       transform: "translateY(-2px)",
//       boxShadow: "var(--shadow-lg)",
//     },
//   },
//   loadingContainer: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     minHeight: "100vh",
//     backgroundColor: "var(--bg-primary)",
//   },
//   bankLoader: {
//     textAlign: "center",
//     padding: "40px",
//     backgroundColor: "var(--surface)",
//     borderRadius: "24px",
//     boxShadow: "var(--shadow-lg)",
//     width: "300px",
//     border: "1px solid var(--border)",
//   },
//   loaderWrapper: {
//     display: "flex",
//     justifyContent: "center",
//     gap: "8px",
//     marginBottom: "24px",
//   },
//   loaderBar: {
//     width: "8px",
//     height: "40px",
//     backgroundColor: "var(--primary)",
//     borderRadius: "4px",
//     animation: "loaderPulse 1s ease-in-out infinite",
//   },
//   loadingTitle: {
//     fontSize: "24px",
//     fontWeight: "600",
//     color: "var(--primary)",
//     marginBottom: "8px",
//   },
//   loadingSubtitle: {
//     fontSize: "14px",
//     color: "var(--text-muted)",
//     marginBottom: "20px",
//   },
//   progressBar: {
//     width: "100%",
//     height: "4px",
//     backgroundColor: "var(--border)",
//     borderRadius: "2px",
//     overflow: "hidden",
//   },
//   progressFill: {
//     width: "70%",
//     height: "100%",
//     background: "var(--primary-gradient)",
//     animation: "progress 1.5s ease-in-out infinite",
//   },
//   statsBar: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "16px",
//     padding: "12px 0",
//   },
//   statsLeft: {
//     display: "flex",
//     alignItems: "center",
//     gap: "16px",
//   },
//   requestCount: {
//     fontSize: "16px",
//     fontWeight: "600",
//     color: "#000000",
//   },
//   pageInfo: {
//     fontSize: "14px",
//     color: "var(--text-muted)",
//     padding: "4px 12px",
//     backgroundColor: "var(--surface)",
//     borderRadius: "20px",
//     border: "1px solid var(--border)",
//   },
//   tableContainer: {
//     backgroundColor: "var(--surface)",
//     borderRadius: "20px",
//     border: "1px solid var(--border)",
//     overflow: "auto",
//     maxHeight: "600px",
//     boxShadow: "var(--shadow-lg)",
//     marginBottom: "24px",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     minWidth: "600px",
//   },
//   th: {
//     textAlign: "left",
//     padding: "16px 20px",
//     borderBottom: "2px solid var(--border)",
//     color: "#000000",
//     fontSize: "14px",
//     fontWeight: "700",
//     textTransform: "uppercase",
//     letterSpacing: "0.5px",
//     backgroundColor: "var(--bg-primary)",
//     whiteSpace: "nowrap",
//     position: "sticky",
//     top: 0,
//     zIndex: 10,
//   },
//   tr: {
//     borderBottom: "1px solid var(--border)",
//     transition: "background-color 0.2s",
//   },
//   td: {
//     padding: "16px 20px",
//     fontSize: "14px",
//     color: "var(--text-primary)",
//     verticalAlign: "middle",
//   },
//   typeBadge: {
//     padding: "6px 14px",
//     borderRadius: "30px",
//     fontSize: "13px",
//     fontWeight: "600",
//     border: "1px solid",
//     display: "inline-block",
//     whiteSpace: "nowrap",
//   },
//   dateDark: {
//     fontFamily: "'SF Mono', 'Fira Code', monospace",
//     fontSize: "13px",
//     color: "#000000",
//     fontWeight: "600",
//     whiteSpace: "nowrap",
//   },
//   statusBadge: {
//     padding: "6px 14px",
//     borderRadius: "30px",
//     fontSize: "12px",
//     fontWeight: "600",
//     textTransform: "uppercase",
//     display: "inline-block",
//     whiteSpace: "nowrap",
//   },
//   paginationContainer: {
//     marginTop: "24px",
//     marginBottom: "24px",
//   },
//   pagination: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: "8px",
//     flexWrap: "wrap",
//   },
//   pageNavButton: {
//     padding: "10px 18px",
//     backgroundColor: "var(--surface)",
//     border: "1px solid var(--border)",
//     borderRadius: "12px",
//     color: "var(--text-primary)",
//     fontSize: "14px",
//     fontWeight: "500",
//     cursor: "pointer",
//     transition: "all 0.2s",
//     ':disabled': {
//       opacity: 0.5,
//       cursor: "not-allowed",
//     }
//   },
//   pageNumbers: {
//     display: "flex",
//     gap: "4px",
//   },
//   pageNumber: {
//     width: "44px",
//     height: "44px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "var(--surface)",
//     border: "1px solid var(--border)",
//     borderRadius: "12px",
//     color: "var(--text-primary)",
//     fontSize: "14px",
//     fontWeight: "500",
//     cursor: "pointer",
//     transition: "all 0.2s",
//   },
//   pageNumberActive: {
//     background: "var(--primary-gradient)",
//     color: "white",
//     borderColor: "var(--primary)",
//   },
//   paginationInfo: {
//     textAlign: "center",
//     fontSize: "13px",
//     color: "var(--text-muted)",
//     marginTop: "16px",
//   },
//   error: {
//     textAlign: "center",
//     padding: "60px",
//     backgroundColor: "var(--surface)",
//     borderRadius: "24px",
//     boxShadow: "var(--shadow-lg)",
//     border: "1px solid var(--border)",
//     maxWidth: "500px",
//     margin: "40px auto",
//   },
//   errorIcon: {
//     color: "var(--danger)",
//     marginBottom: "20px",
//   },
//   errorText: {
//     fontSize: "16px",
//     color: "var(--text-secondary)",
//     marginBottom: "24px",
//   },
//   retryButton: {
//     padding: "14px 36px",
//     backgroundColor: "var(--primary)",
//     color: "white",
//     border: "none",
//     borderRadius: "30px",
//     fontSize: "15px",
//     fontWeight: "600",
//     cursor: "pointer",
//     transition: "all 0.2s",
//     ':hover': {
//       backgroundColor: "var(--primary-light)",
//       transform: "translateY(-2px)",
//       boxShadow: "var(--shadow)",
//     },
//   },
//   empty: {
//     textAlign: "center",
//     padding: "80px 40px",
//     backgroundColor: "var(--surface)",
//     borderRadius: "24px",
//     boxShadow: "var(--shadow-lg)",
//     border: "1px solid var(--border)",
//     maxWidth: "500px",
//     margin: "40px auto",
//   },
//   emptyIconContainer: {
//     fontSize: "64px",
//     marginBottom: "24px",
//     opacity: 0.7,
//   },
//   emptyTitle: {
//     fontSize: "24px",
//     fontWeight: "600",
//     color: "#000000",
//     margin: "0 0 8px 0",
//   },
//   emptyText: {
//     fontSize: "14px",
//     color: "var(--text-muted)",
//     marginBottom: "20px",
//   },
//   noResults: {
//     textAlign: "center",
//     padding: "80px 40px",
//     backgroundColor: "var(--surface)",
//     borderRadius: "24px",
//     boxShadow: "var(--shadow-lg)",
//     border: "1px solid var(--border)",
//     maxWidth: "600px",
//     margin: "40px auto",
//   },
//   noResultsIcon: {
//     fontSize: "64px",
//     marginBottom: "24px",
//     opacity: 0.7,
//   },
//   noResultsTitle: {
//     fontSize: "24px",
//     fontWeight: "600",
//     color: "#000000",
//     margin: "0 0 8px 0",
//   },
//   noResultsText: {
//     fontSize: "14px",
//     color: "var(--text-muted)",
//     marginBottom: "24px",
//   },
//   clearAllButton: {
//     padding: "14px 36px",
//     backgroundColor: "var(--primary)",
//     color: "white",
//     border: "none",
//     borderRadius: "30px",
//     fontSize: "14px",
//     fontWeight: "600",
//     cursor: "pointer",
//     transition: "all 0.2s",
//     ':hover': {
//       backgroundColor: "var(--primary-light)",
//       transform: "translateY(-2px)",
//       boxShadow: "var(--shadow)",
//     },
//   },
//   // Modal Styles - Enhanced with better contrast
//   modalOverlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     backdropFilter: "blur(4px)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 1000,
//     padding: "20px",
//   },
//   modalContent: {
//     backgroundColor: "var(--surface)",
//     borderRadius: "24px",
//     padding: "32px",
//     maxWidth: "800px",
//     width: "90%",
//     maxHeight: "90vh",
//     overflow: "auto",
//     boxShadow: "var(--shadow-hover)",
//     border: "1px solid var(--border)",
//   },
//   modalHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "24px",
//     paddingBottom: "16px",
//     borderBottom: "1px solid var(--border)",
//   },
//   modalTitle: {
//     fontSize: "28px",
//     fontWeight: "700",
//     color: "#000000",
//     margin: 0,
//   },
//   modalCloseButton: {
//     background: "none",
//     border: "none",
//     fontSize: "32px",
//     cursor: "pointer",
//     color: "var(--text-muted)",
//     padding: "0 8px",
//     borderRadius: "50%",
//     width: "48px",
//     height: "48px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     transition: "all 0.2s",
//     ':hover': {
//       backgroundColor: "var(--surface-hover)",
//       color: "var(--text-primary)",
//     },
//   },
//   modalBody: {
//     marginBottom: "24px",
//   },
//   modalStatusCard: {
//     backgroundColor: "var(--bg-primary)",
//     borderRadius: "16px",
//     padding: "24px",
//     marginBottom: "24px",
//     border: "1px solid var(--border)",
//   },
//   modalStatusHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   modalStatusLabel: {
//     fontSize: "16px",
//     fontWeight: "600",
//     color: "#000000",
//   },
//   modalStatusBadge: {
//     padding: "8px 20px",
//     borderRadius: "30px",
//     fontSize: "14px",
//     fontWeight: "600",
//     textTransform: "uppercase",
//   },
//   modalDetailsGrid: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: "24px",
//   },
//   modalDetailCard: {
//     backgroundColor: "var(--bg-primary)",
//     borderRadius: "16px",
//     padding: "24px",
//     border: "1px solid var(--border)",
//     boxShadow: "var(--shadow)",
//   },
//   modalCardTitle: {
//     fontSize: "18px",
//     fontWeight: "700",
//     color: "#000000",
//     margin: "0 0 16px 0",
//     paddingBottom: "12px",
//     borderBottom: "1px solid var(--border)",
//   },
//   modalDetailRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     padding: "12px 0",
//     borderBottom: "1px solid var(--border-light)",
//     ':last-child': {
//       borderBottom: "none",
//     },
//   },
//   modalDetailLabel: {
//     fontSize: "14px",
//     color: "var(--text-muted)",
//     fontWeight: "600",
//     flex: "0 0 120px",
//   },
//   modalDetailValueDark: {
//     fontSize: "14px",
//     color: "#000000",
//     fontWeight: "600",
//     textAlign: "right",
//     flex: 1,
//     wordBreak: "break-word",
//   },
//   modalFooter: {
//     display: "flex",
//     justifyContent: "flex-end",
//     paddingTop: "24px",
//     borderTop: "1px solid var(--border)",
//   },
//   modalCloseBtn: {
//     padding: "12px 32px",
//     backgroundColor: "var(--primary)",
//     color: "white",
//     border: "none",
//     borderRadius: "12px",
//     fontSize: "14px",
//     fontWeight: "600",
//     cursor: "pointer",
//     transition: "all 0.2s",
//     ':hover': {
//       backgroundColor: "var(--primary-light)",
//       transform: "translateY(-2px)",
//       boxShadow: "var(--shadow)",
//     },
//   },
// };

// export default MyRequests;
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  FaWallet,
  FaCreditCard,
  FaBriefcase,
  FaUniversity,
  FaShieldAlt,
  FaClock,
  FaChevronDown,
  FaTimes,
  FaEye,
  FaFilter,
  FaCheckCircle,
  FaExclamationTriangle,
  FaRegBuilding
} from "react-icons/fa";

// Create API instance
const API = axios.create({
  baseURL: "http://localhost:8077",
  headers: {
    "Content-Type": "application/json",
  },
});

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  
  // Refs for click outside detection
  const accountDropdownRef = useRef(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Filter states
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedAccountDetails, setSelectedAccountDetails] = useState(null);
  const [selectedRequestType, setSelectedRequestType] = useState("ALL");

  // Modal states for request details
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Canara Bank color scheme
  const canaraBlue = "#1E3A8A";
  const canaraGold = "#F59E0B";
  const canaraNavy = "#0A2472";
  const canaraLightBlue = "#EFF6FF";
  const canaraGray = "#F3F4F6";
  const canaraBorder = "#E5E7EB";
  const canaraText = "#111827";
  const canaraTextLight = "#6B7280";
  const canaraSuccess = "#10B981";
  const canaraSuccessLight = "#D1FAE5";
  const canaraDanger = "#EF4444";
  const canaraDangerLight = "#FEE2E2";
  const canaraWarning = "#F59E0B";
  const canaraWarningLight = "#FEF3C7";

  // Get customer ID from localStorage
  useEffect(() => {
    const id = localStorage.getItem("customerId") || localStorage.getItem("userId") || "2";
    setCustomerId(id);
  }, []);

  // Handle click outside for dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target)) {
        setIsAccountDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Canara Bank Theme CSS Variables
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      :root {
        /* Canara Bank Theme - Blue and Gold */
        --canara-blue: #1E3A8A;
        --canara-navy: #0A2472;
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
        --canara-warning: #F59E0B;
        --canara-warning-light: #FEF3C7;
        
        /* Surface colors */
        --bg-primary: #F9FAFB;
        --bg-secondary: #FFFFFF;
        --surface: #FFFFFF;
        --surface-hover: #EFF6FF;
        --text-primary: #111827;
        --text-secondary: #4B5563;
        --text-muted: #6B7280;
        --border: #E5E7EB;
        --border-light: #F3F4F6;
        --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        --shadow-lg: 0 10px 15px -3px rgba(30, 58, 138, 0.1);
        --shadow-hover: 0 20px 25px -5px rgba(30, 58, 138, 0.2);
        --primary: #1E3A8A;
        --primary-light: #2563EB;
        --primary-dark: #0A2472;
        --primary-soft: #EFF6FF;
        --primary-gradient: linear-gradient(135deg, #1E3A8A, #2563EB);
        --success: #10B981;
        --success-soft: #D1FAE5;
        --danger: #EF4444;
        --danger-soft: #FEE2E2;
        --warning: #F59E0B;
        --warning-soft: #FEF3C7;
        --hover-bg: #EFF6FF;
        --active-bg: #DBEAFE;
      }

      * {
        transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        box-sizing: border-box;
      }

      body {
        background-color: var(--bg-primary);
        color: var(--text-primary);
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        margin: 0;
        padding: 0;
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
          transform: translateX(20px);
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

      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      @keyframes bounceIn {
        0% { transform: scale(0.9); opacity: 0; }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); opacity: 1; }
      }

      /* Account Dropdown Styles */
      .account-dropdown-container {
        position: relative;
        width: 260px;
        animation: slideInRight 0.4s ease;
      }

      .account-dropdown-button {
        width: 100%;
        padding: 12px 16px;
        background: white;
        border: 2px solid var(--border);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: var(--shadow-sm);
      }

      .account-dropdown-button:hover {
        border-color: var(--canara-blue);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(30, 58, 138, 0.1);
      }

      .account-dropdown-button.active {
        border-color: var(--canara-blue);
        box-shadow: 0 0 0 4px var(--primary-soft);
      }

      .selected-account-preview {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .account-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background: var(--primary-soft);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color: var(--canara-blue);
        transition: all 0.3s ease;
      }

      .account-dropdown-button:hover .account-avatar {
        transform: scale(1.1) rotate(-4deg);
        background: var(--canara-blue);
        color: white;
      }

      .account-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .account-type {
        font-size: 14px;
        font-weight: 600;
        color: var(--text-primary);
      }

      .account-number-preview {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .account-masked {
        font-size: 13px;
        color: var(--text-muted);
        font-family: 'Roboto Mono', monospace;
        background: var(--border-light);
        padding: 2px 8px;
        border-radius: 12px;
      }

      .dropdown-arrow {
        color: var(--text-muted);
        transition: transform 0.3s ease;
        font-size: 16px;
      }

      .dropdown-arrow.open {
        transform: rotate(180deg);
        color: var(--canara-blue);
      }

      .account-dropdown-menu {
        position: absolute;
        top: calc(100% + 8px);
        left: 0;
        right: 0;
        background: white;
        border: 1px solid var(--border);
        border-radius: 12px;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        max-height: 350px;
        overflow-y: auto;
        z-index: 1000;
        animation: slideUp 0.3s ease;
      }

      .account-dropdown-menu::-webkit-scrollbar {
        width: 6px;
      }

      .account-dropdown-menu::-webkit-scrollbar-track {
        background: var(--border-light);
        border-radius: 10px;
      }

      .account-dropdown-menu::-webkit-scrollbar-thumb {
        background: var(--canara-blue);
        border-radius: 10px;
      }

      .account-dropdown-item {
        padding: 12px 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 12px;
        border-bottom: 1px solid var(--border-light);
        transition: all 0.2s ease;
      }

      .account-dropdown-item:last-child {
        border-bottom: none;
      }

      .account-dropdown-item:hover {
        background: var(--primary-soft);
      }

      .account-dropdown-item.selected {
        background: var(--primary-soft);
        border-left: 4px solid var(--canara-blue);
      }

      .account-item-avatar {
        width: 36px;
        height: 36px;
        border-radius: 8px;
        background: var(--bg-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        color: var(--canara-blue);
      }

      .account-item-details {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .account-item-type {
        font-size: 14px;
        font-weight: 600;
        color: var(--text-primary);
      }

      .account-item-number {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .account-item-masked {
        font-size: 12px;
        color: var(--text-muted);
        font-family: 'Roboto Mono', monospace;
        background: var(--border-light);
        padding: 2px 8px;
        border-radius: 12px;
      }

      /* Request Type Select */
      .request-type-select {
        padding: 12px 40px 12px 16px;
        background: white;
        border: 2px solid var(--border);
        border-radius: 12px;
        font-size: 14px;
        font-weight: 500;
        color: var(--text-primary);
        cursor: pointer;
        outline: none;
        width: 200px;
        appearance: none;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231E3A8A'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right 12px center;
        background-size: 16px;
        transition: all 0.2s ease;
      }

      .request-type-select:hover {
        border-color: var(--canara-blue);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(30, 58, 138, 0.1);
      }

      .request-type-select:focus {
        border-color: var(--canara-blue);
        box-shadow: 0 0 0 4px var(--primary-soft);
      }

      /* Table Row Hover */
      .request-row {
        transition: all 0.3s ease;
        animation: slideUp 0.4s ease;
      }

      .request-row:hover {
        background-color: var(--primary-soft) !important;
        transform: translateX(4px);
        box-shadow: 0 2px 8px rgba(30, 58, 138, 0.08);
      }

      /* Pagination Buttons */
      .pagination-button {
        transition: all 0.3s ease;
        border: 1px solid var(--border);
        background: white;
        color: var(--text-primary);
        font-weight: 500;
        cursor: pointer;
        animation: bounceIn 0.3s ease;
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

      /* View Button */
      .view-button {
        transition: all 0.3s ease;
        animation: slideUp 0.3s ease;
      }

      .view-button:hover {
        background: var(--canara-blue) !important;
        transform: translateY(-2px) scale(1.05);
        box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3);
      }

      /* Clear Button */
      .clear-button {
        transition: all 0.3s ease;
        animation: bounceIn 0.3s ease;
      }

      .clear-button:hover {
        transform: rotate(90deg) scale(1.1);
        background-color: var(--canara-danger) !important;
      }

      /* Status Badges */
      .status-badge {
        transition: all 0.3s ease;
        padding: 4px 12px;
        border-radius: 30px;
        font-size: 12px;
        font-weight: 600;
        display: inline-block;
      }

      .status-badge.approved {
        background: var(--success-soft);
        color: var(--success);
        border: 1px solid var(--success);
      }

      .status-badge.rejected {
        background: var(--danger-soft);
        color: var(--danger);
        border: 1px solid var(--danger);
      }

      .status-badge.pending {
        background: var(--warning-soft);
        color: var(--warning);
        border: 1px solid var(--warning);
      }

      .status-badge:hover {
        transform: translateY(-2px);
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }

      /* Type Badge */
      .type-badge {
        transition: all 0.3s ease;
        padding: 4px 12px;
        border-radius: 30px;
        font-size: 12px;
        font-weight: 600;
        display: inline-block;
      }

      .type-badge:hover {
        transform: translateY(-2px);
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }

      /* Loading Animations */
      .loader-bar {
        animation: pulse 1.5s ease-in-out infinite;
      }

      .progress-fill {
        animation: shimmer 1.5s infinite;
      }

      /* Modal Animation */
      .modal-content {
        animation: slideUp 0.3s ease;
      }

      /* Focus States */
      *:focus-visible {
        outline: 2px solid var(--canara-blue);
        outline-offset: 2px;
      }
    `;
    document.head.appendChild(styleSheet);
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Function to get last 4 digits
  const getLast4Digits = (accountNumber) => {
    if (!accountNumber) return "";
    const str = accountNumber.toString();
    return str.slice(-4);
  };

  // Function to get account icon based on type
  const getAccountIcon = (type) => {
    if (type?.toLowerCase().includes('savings')) return '💰';
    if (type?.toLowerCase().includes('current')) return '💳';
    if (type?.toLowerCase().includes('salary')) return '💼';
    return '🏦';
  };

  // Fetch accounts from API
  const fetchAccounts = async () => {
    if (!customerId) return;

    setLoadingAccounts(true);
    try {
      const response = await API.get(`/abcbank/api/account/userAccounts/${customerId}`);
      
      if (response.data && response.data.status && Array.isArray(response.data.data)) {
        const fetchedAccounts = response.data.data.map(acc => ({
          number: acc.accountNumber.toString(),
          type: acc.accountTypeName,
          icon: getAccountIcon(acc.accountTypeName),
          last4: getLast4Digits(acc.accountNumber),
          displayLabel: `${acc.accountTypeName} - ${getLast4Digits(acc.accountNumber)}`,
          branchName: acc.branchName,
          status: acc.status
        }));

        // Sort accounts: Savings first, then Current, then Salary
        const sortedAccounts = fetchedAccounts.sort((a, b) => {
          const typeOrder = {
            'Savings Account': 1,
            'Current Account': 2,
            'Salary Account': 3
          };
          return (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99);
        });

        setAccounts(sortedAccounts);
        
        // Auto-select first account if none selected
        if (sortedAccounts.length > 0 && !selectedAccount) {
          setSelectedAccount(sortedAccounts[0].number);
          setSelectedAccountDetails(sortedAccounts[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
      setError("Failed to fetch accounts");
    } finally {
      setLoadingAccounts(false);
    }
  };

  // Fetch accounts on mount and when customerId changes
  useEffect(() => {
    if (customerId) {
      fetchAccounts();
    }
  }, [customerId]);

  // Update selected account details when account changes
  useEffect(() => {
    if (selectedAccount && accounts.length > 0) {
      const details = accounts.find(acc => acc.number === selectedAccount);
      setSelectedAccountDetails(details);
    }
  }, [selectedAccount, accounts]);

  // Fetch all requests when account changes
  useEffect(() => {
    if (selectedAccount) {
      fetchAllRequests(selectedAccount);
    }
  }, [selectedAccount]);

  // Apply filter whenever requests or selectedRequestType changes
  useEffect(() => {
    applyFilter();
    setCurrentPage(1);
  }, [requests, selectedRequestType]);

  const fetchAllRequests = async (accountNumber) => {
    setLoading(true);
    setError(null);
    
    try {
      const payload = { accountNumber: Number(accountNumber) };
      
      // Fetch cards for this account
      let accountCards = [];
      try {
        const cardsResponse = await API.get(`/abcbank/api/account/userCardsByStatus/${accountNumber}`);
        if (cardsResponse.data?.status && Array.isArray(cardsResponse.data.data)) {
          accountCards = cardsResponse.data.data;
          console.log("Fetched cards:", accountCards);
        }
      } catch (error) {
        console.log("Error fetching cards:", error);
      }

      // Prepare all API calls
      const apiCalls = [
        // Existing account-based APIs
        API.post("/abcbank/api/chequeRequest/chequeRequestList", payload),
        API.post("/abcbank/api/creditLimit/creditLimitListByAccount", payload),
        API.post("/abcbank/api/lostCard/lostRequestList", payload),
        API.post("/abcbank/api/queriesResponse/queriesList", payload)
      ];

      // Add card-based API calls if cards exist
      if (accountCards.length > 0) {
        accountCards.forEach(card => {
          const cardNumber = card.cardNumber;
          if (cardNumber) {
            // Add credit limit by card
            apiCalls.push(
              API.post("/abcbank/api/creditLimit/creditLimitListByCard", { 
                cardNumber: Number(cardNumber) 
              })
            );
            
            // Add lost card by card
            apiCalls.push(
              API.post("/abcbank/api/lostCard/lostRequestList", { 
                cardNumber: Number(cardNumber) 
              })
            );
          }
        });
      }

      // Execute all API calls
      const responses = await Promise.allSettled(apiCalls);

      // Process Cheque Requests (index 0)
      const chequeRequests = responses[0]?.status === 'fulfilled' && responses[0].value.data?.status
        ? (responses[0].value.data.data || []).map(req => ({
            id: `chq-${req.chequeRequestId}`,
            type: "CHEQUE_LEAVES",
            typeLabel: "Cheque Leaves",
            description: `${req.noOfLeaves} leaves`,
            requestDate: req.requestedDate,
            status: req.status || "PENDING",
            approvedDate: req.approvedDate || "-",
            remarks: req.remarks || "-",
            rejectReason: req.rejectReason || "-",
            accountNumber: accountNumber,
            fullDetails: {
              requestType: "Cheque Leaves",
              description: `${req.noOfLeaves} leaves`,
              requestedDate: req.requestedDate,
              status: req.status || "PENDING",
              approvedDate: req.approvedDate || "-",
              remarks: req.remarks || "-",
              rejectReason: req.rejectReason || "-",
              accountNumber: accountNumber,
              noOfLeaves: req.noOfLeaves
            }
          }))
        : [];

      // Process Credit Limit Requests by Account (index 1)
      const creditRequestsByAccount = responses[1]?.status === 'fulfilled' && responses[1].value.data?.status
        ? (responses[1].value.data.data || []).map(req => ({
            id: `crd-acc-${req.increaseCreditLimitId}`,
            type: "CREDIT_LIMIT",
            typeLabel: "Credit Limit",
            description: `₹${req.requestedLimit?.toLocaleString()}`,
            requestDate: req.requestDate,
            status: req.status || "PENDING",
            approvedDate: req.approvedDate || "-",
            remarks: req.remarks || "-",
            rejectReason: req.rejectReason || "-",
            accountNumber: accountNumber,
            cardNumber: req.cardNumber,
            fullDetails: {
              requestType: "Credit Limit",
              description: `₹${req.requestedLimit?.toLocaleString()}`,
              requestedDate: req.requestDate,
              status: req.status || "PENDING",
              approvedDate: req.approvedDate || "-",
              remarks: req.remarks || "-",
              rejectReason: req.rejectReason || "-",
              accountNumber: accountNumber,
              cardNumber: req.cardNumber,
              requestedLimit: req.requestedLimit,
              currentLimit: req.currentLimitAtRequest || req.currentLimit,
              fullName: req.fullName,
              mobileNumber: req.mobileNumber,
              city: req.city,
              email: req.email
            }
          }))
        : [];

      // Process Lost Card Requests by Account (index 2)
      const lostCardRequestsByAccount = responses[2]?.status === 'fulfilled' && responses[2].value.data?.status
        ? (responses[2].value.data.data || []).map(req => ({
            id: `lst-acc-${req.lostCardId}`,
            type: "LOST_CARD",
            typeLabel: "Lost Card",
            description: `Card ****${req.lostCardNumber?.toString().slice(-4)}`,
            requestDate: req.createdDate,
            status: req.status || "PENDING",
            approvedDate: req.approvedDate || "-",
            remarks: req.remarks || "-",
            rejectReason: req.rejectReason || "-",
            accountNumber: accountNumber,
            cardNumber: req.cardNumber || req.lostCardNumber,
            fullDetails: {
              requestType: "Lost Card",
              description: `Card Number: ****${req.lostCardNumber?.toString().slice(-4)}`,
              requestedDate: req.createdDate,
              status: req.status || "PENDING",
              approvedDate: req.approvedDate || "-",
              remarks: req.remarks || "-",
              rejectReason: req.rejectReason || "-",
              accountNumber: accountNumber,
              cardNumber: req.cardNumber || req.lostCardNumber,
              lostCardNumber: req.lostCardNumber,
              lostCardStolenDate: req.lostCardStolenDate,
              fullName: req.fullName,
              mobileNumber: req.mobileNumber,
              city: req.city,
              email: req.email
            }
          }))
        : [];

      // Process General Queries (index 3)
      const generalQueries = responses[3]?.status === 'fulfilled' && responses[3].value.data?.status
        ? (responses[3].value.data.data || []).map(req => ({
            id: `qry-${req.queriesId}`,
            type: "GENERAL_QUERY",
            typeLabel: "General Query",
            description: req.customerQuery.length > 30 ? req.customerQuery.substring(0, 30) + '...' : req.customerQuery,
            requestDate: req.queryRaisedDate,
            status: req.status || "PENDING",
            approvedDate: req.queryApprovedDate || "-",
            remarks: req.queryResponse || "-",
            rejectReason: req.rejectReason || "-",
            accountNumber: accountNumber,
            fullDetails: {
              requestType: "General Query",
              description: req.customerQuery,
              requestedDate: req.queryRaisedDate,
              status: req.status || "PENDING",
              approvedDate: req.queryApprovedDate || "-",
              remarks: req.queryResponse || "-",
              rejectReason: req.rejectReason || "-",
              accountNumber: accountNumber,
              customerQuery: req.customerQuery,
              queryResponse: req.queryResponse
            }
          }))
        : [];

      // Process Credit Limit Requests by Card (starting from index 4)
      const creditRequestsByCard = [];
      const lostCardRequestsByCard = [];
      
      if (accountCards.length > 0) {
        let cardIndex = 4; // Start after the 4 account-based APIs
        
        for (let i = 0; i < accountCards.length; i++) {
          // Credit limit by card
          const creditResponse = responses[cardIndex];
          if (creditResponse?.status === 'fulfilled' && creditResponse.value?.data?.status) {
            const cardRequests = (creditResponse.value.data.data || []).map(req => ({
              id: `crd-card-${req.increaseCreditLimitId}-${i}`,
              type: "CREDIT_LIMIT",
              typeLabel: "Credit Limit",
              description: `₹${req.requestedLimit?.toLocaleString()}`,
              requestDate: req.requestDate,
              status: req.status || "PENDING",
              approvedDate: req.approvedDate || "-",
              remarks: req.remarks || "-",
              rejectReason: req.rejectReason || "-",
              accountNumber: req.accountNumber || accountNumber,
              cardNumber: req.cardNumber,
              fullDetails: {
                requestType: "Credit Limit",
                description: `₹${req.requestedLimit?.toLocaleString()}`,
                requestedDate: req.requestDate,
                status: req.status || "PENDING",
                approvedDate: req.approvedDate || "-",
                remarks: req.remarks || "-",
                rejectReason: req.rejectReason || "-",
                accountNumber: req.accountNumber || accountNumber,
                cardNumber: req.cardNumber,
                requestedLimit: req.requestedLimit,
                currentLimit: req.currentLimitAtRequest,
                fullName: req.fullName,
                mobileNumber: req.mobileNumber,
                city: req.city,
                email: req.email
              }
            }));
            creditRequestsByCard.push(...cardRequests);
          }
          cardIndex++;

          // Lost card by card
          const lostResponse = responses[cardIndex];
          if (lostResponse?.status === 'fulfilled' && lostResponse.value?.data?.status) {
            const cardRequests = (lostResponse.value.data.data || []).map(req => ({
              id: `lst-card-${req.lostCardId}-${i}`,
              type: "LOST_CARD",
              typeLabel: "Lost Card",
              description: `Card ****${req.lostCardNumber?.toString().slice(-4)}`,
              requestDate: req.createdDate,
              status: req.status || "PENDING",
              approvedDate: req.approvedDate || "-",
              remarks: req.remarks || "-",
              rejectReason: req.rejectReason || "-",
              accountNumber: req.accountNumber || accountNumber,
              cardNumber: req.cardNumber || req.lostCardNumber,
              fullDetails: {
                requestType: "Lost Card",
                description: `Card Number: ****${req.lostCardNumber?.toString().slice(-4)}`,
                requestedDate: req.createdDate,
                status: req.status || "PENDING",
                approvedDate: req.approvedDate || "-",
                remarks: req.remarks || "-",
                rejectReason: req.rejectReason || "-",
                accountNumber: req.accountNumber || accountNumber,
                cardNumber: req.cardNumber || req.lostCardNumber,
                lostCardNumber: req.lostCardNumber,
                lostCardStolenDate: req.lostCardStolenDate,
                fullName: req.fullName,
                mobileNumber: req.mobileNumber,
                city: req.city,
                email: req.email
              }
            }));
            lostCardRequestsByCard.push(...cardRequests);
          }
          cardIndex++;
        }
      }

      // Combine all credit limit requests
      const creditRequests = [...creditRequestsByAccount, ...creditRequestsByCard];
      
      // Combine all lost card requests
      const lostCardRequests = [...lostCardRequestsByAccount, ...lostCardRequestsByCard];

      const allRequests = [
        ...chequeRequests,
        ...creditRequests,
        ...lostCardRequests,
        ...generalQueries
      ].sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));

      setRequests(allRequests);

    } catch (error) {
      console.error("Failed to fetch requests", error);
      setError(
        error.response?.data?.message || 
        "Network error. Please check if backend is running."
      );
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  // Apply filter based on selected request type
  const applyFilter = () => {
    if (selectedRequestType === "ALL") {
      setFilteredRequests(requests);
    } else {
      const filtered = requests.filter(req => req.type === selectedRequestType);
      setFilteredRequests(filtered);
    }
  };

  // Clear filter
  const clearFilter = () => {
    setSelectedRequestType("ALL");
  };

  // Open modal with request details
  const openRequestDetails = (request) => {
    setSelectedRequest(request);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedRequest(null);
  };

  // Get current page items
  const getCurrentPageItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
  };

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const tableContainer = document.getElementById('requests-table-container');
    if (tableContainer) {
      tableContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  // Helper function for status colors
  const getStatusStyle = (status) => {
    const statusUpper = status?.toUpperCase() || "PENDING";
    switch (statusUpper) {
      case "APPROVED":
        return {
          background: canaraSuccessLight,
          color: canaraSuccess,
          border: `1px solid ${canaraSuccess}`,
        };
      case "REJECTED":
        return {
          background: canaraDangerLight,
          color: canaraDanger,
          border: `1px solid ${canaraDanger}`,
        };
      case "PENDING":
        return {
          background: canaraWarningLight,
          color: canaraWarning,
          border: `1px solid ${canaraWarning}`,
        };
      default:
        return {
          background: canaraGray,
          color: canaraText,
          border: `1px solid ${canaraBorder}`,
        };
    }
  };

  // Get request type label
  const getRequestTypeLabel = (type) => {
    const options = {
      "ALL": "All Requests",
      "CHEQUE_LEAVES": "Cheque Leaves",
      "CREDIT_LIMIT": "Credit Limit",
      "LOST_CARD": "Lost Card",
      "GENERAL_QUERY": "General Query"
    };
    return options[type] || type;
  };

  // Get request type color
  const getTypeColor = (type) => {
    const colors = {
      "CHEQUE_LEAVES": canaraBlue,
      "CREDIT_LIMIT": "#8B5CF6",
      "LOST_CARD": canaraDanger,
      "GENERAL_QUERY": canaraSuccess
    };
    return colors[type] || canaraText;
  };

  // Format date to DD-MM-YYYY
  const formatDate = (date) => {
    if (!date || date === "-") return "-";
    try {
      const d = new Date(date);
      const day = d.getDate().toString().padStart(2, '0');
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    } catch (e) {
      return date;
    }
  };

  // Loading animation
  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#F9FAFB",
      }}>
        <div style={{
          textAlign: "center",
          padding: "40px",
          backgroundColor: "white",
          borderRadius: "24px",
          boxShadow: "0 10px 25px -5px rgba(30, 58, 138, 0.1)",
          width: "350px",
          border: "1px solid #E5E7EB",
        }}>
          {/* Bank Building Icon */}
          <div style={{
            width: "100px",
            height: "100px",
            margin: "0 auto 24px",
            position: "relative",
            animation: "float 3s ease-in-out infinite",
          }}>
            <div style={{
              width: "0",
              height: "0",
              borderLeft: "50px solid transparent",
              borderRight: "50px solid transparent",
              borderBottom: "30px solid #1E3A8A",
              margin: "0 auto",
            }} />
            <div style={{
              width: "80px",
              height: "50px",
              backgroundColor: "#2563EB",
              margin: "0 auto",
              borderRadius: "8px 8px 0 0",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "0 10px",
            }}>
              {[1,2,3].map(i => (
                <div key={i} style={{
                  width: "12px",
                  height: "35px",
                  backgroundColor: "#EFF6FF",
                  borderRadius: "4px 4px 0 0",
                  animation: `pulse 1.5s ease-in-out infinite ${i * 0.2}s`,
                }} />
              ))}
            </div>
            <div style={{
              width: "100px",
              height: "8px",
              backgroundColor: "#F59E0B",
              margin: "0 auto",
              borderRadius: "4px",
            }} />
          </div>

          {/* Loading Bars */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "24px",
          }}>
            {[1,2,3,4,5].map(i => (
              <div key={i} style={{
                width: "8px",
                height: "40px",
                backgroundColor: "#1E3A8A",
                borderRadius: "4px",
                animation: `pulse 1s ease-in-out infinite ${i * 0.1}s`,
              }} />
            ))}
          </div>

          {/* Text */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#1E3A8A",
              marginBottom: "8px",
            }}>
              ABC BANK
            </div>
            <div style={{
              fontSize: "16px",
              color: "#6B7280",
            }}>
              Loading your requests
              <span style={{ display: "inline-block", animation: "pulse 1.5s infinite" }}>...</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{
            width: "100%",
            height: "4px",
            backgroundColor: "#EFF6FF",
            borderRadius: "2px",
            overflow: "hidden",
            marginBottom: "20px",
          }}>
            <div style={{
              width: "70%",
              height: "100%",
              background: "linear-gradient(90deg, #1E3A8A, #2563EB)",
              borderRadius: "2px",
              animation: "shimmer 1.5s infinite",
            }} />
          </div>

          {/* Security Badge */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "8px 16px",
            backgroundColor: "#EFF6FF",
            borderRadius: "30px",
            width: "fit-content",
            margin: "0 auto",
          }}>
            <FaShieldAlt size={12} color="#1E3A8A" />
            <span style={{ fontSize: "13px", color: "#1E3A8A", fontWeight: "500" }}>
              Secure Connection
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "24px",
      }}>
        <div style={{
          textAlign: "center",
          padding: "60px",
          backgroundColor: "white",
          borderRadius: "24px",
          boxShadow: "0 10px 25px -5px rgba(30, 58, 138, 0.1)",
          border: "1px solid #E5E7EB",
          maxWidth: "500px",
          margin: "40px auto",
        }}>
          <FaExclamationTriangle size={48} color="#EF4444" style={{ marginBottom: "20px" }} />
          <p style={{
            fontSize: "16px",
            color: "#111827",
            marginBottom: "24px",
          }}>{error}</p>
          <button 
            onClick={() => selectedAccount && fetchAllRequests(selectedAccount)} 
            style={{
              padding: "14px 36px",
              backgroundColor: "#1E3A8A",
              color: "white",
              border: "none",
              borderRadius: "30px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(30, 58, 138, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 20px rgba(30, 58, 138, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 12px rgba(30, 58, 138, 0.3)";
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Get current page items
  const currentItems = getCurrentPageItems();

  return (
    <div style={{
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "24px",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      backgroundColor: "#F9FAFB",
      minHeight: "100vh",
      height: "100%",
      overflowY: "auto",
      color: "#111827",
    }}>
      {/* Request Details Modal */}
      {modalOpen && selectedRequest && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(4px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
          padding: "20px",
        }} onClick={closeModal}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "24px",
            padding: "32px",
            maxWidth: "800px",
            width: "90%",
            maxHeight: "90vh",
            overflow: "auto",
            boxShadow: "0 20px 25px -5px rgba(30, 58, 138, 0.2)",
            border: "1px solid #E5E7EB",
          }} className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
              paddingBottom: "16px",
              borderBottom: "1px solid #E5E7EB",
            }}>
              <h2 style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#111827",
                margin: 0,
              }}>Request Details</h2>
              <button 
                onClick={closeModal}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#6B7280",
                  padding: "8px",
                  borderRadius: "50%",
                  width: "44px",
                  height: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                  backgroundColor: "#F3F4F6",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#FEE2E2";
                  e.target.style.color = "#EF4444";
                  e.target.style.transform = "rotate(90deg)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#F3F4F6";
                  e.target.style.color = "#6B7280";
                  e.target.style.transform = "rotate(0deg)";
                }}
              >
                <FaTimes />
              </button>
            </div>
            
            <div style={{ marginBottom: "24px" }}>
              {/* Status Card */}
              <div style={{
                backgroundColor: "#F9FAFB",
                borderRadius: "16px",
                padding: "24px",
                marginBottom: "24px",
                border: "1px solid #E5E7EB",
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <span style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#111827",
                  }}>Current Status</span>
                  <span style={{
                    padding: "8px 20px",
                    borderRadius: "30px",
                    fontSize: "14px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    ...getStatusStyle(selectedRequest.status)
                  }}>
                    {selectedRequest.status || "PENDING"}
                  </span>
                </div>
              </div>

              {/* Request Details Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
              }}>
                {/* Left Column - Request Information */}
                <div style={{
                  backgroundColor: "#F9FAFB",
                  borderRadius: "16px",
                  padding: "24px",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}>
                  <h3 style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#111827",
                    margin: "0 0 16px 0",
                    paddingBottom: "12px",
                    borderBottom: "1px solid #E5E7EB",
                  }}>Request Information</h3>
                  
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: "12px 0",
                    borderBottom: "1px solid #F3F4F6",
                  }}>
                    <span style={{
                      fontSize: "14px",
                      color: "#6B7280",
                      fontWeight: "600",
                      flex: "0 0 120px",
                    }}>Request Type</span>
                    <span style={{
                      fontSize: "14px",
                      color: "#111827",
                      fontWeight: "600",
                      textAlign: "right",
                      flex: 1,
                    }}>{selectedRequest.typeLabel}</span>
                  </div>
                  
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: "12px 0",
                    borderBottom: "1px solid #F3F4F6",
                  }}>
                    <span style={{
                      fontSize: "14px",
                      color: "#6B7280",
                      fontWeight: "600",
                      flex: "0 0 120px",
                    }}>Description</span>
                    <span style={{
                      fontSize: "14px",
                      color: "#111827",
                      fontWeight: "600",
                      textAlign: "right",
                      flex: 1,
                      wordBreak: "break-word",
                    }}>{selectedRequest.fullDetails?.description || selectedRequest.description}</span>
                  </div>
                  
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: "12px 0",
                    borderBottom: "1px solid #F3F4F6",
                  }}>
                    <span style={{
                      fontSize: "14px",
                      color: "#6B7280",
                      fontWeight: "600",
                      flex: "0 0 120px",
                    }}>Requested Date</span>
                    <span style={{
                      fontSize: "14px",
                      color: "#111827",
                      fontWeight: "600",
                      textAlign: "right",
                      flex: 1,
                    }}>{formatDate(selectedRequest.requestDate)}</span>
                  </div>
                  
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: "12px 0",
                    borderBottom: "1px solid #F3F4F6",
                  }}>
                    <span style={{
                      fontSize: "14px",
                      color: "#6B7280",
                      fontWeight: "600",
                      flex: "0 0 120px",
                    }}>Account Number</span>
                    <span style={{
                      fontSize: "14px",
                      color: "#111827",
                      fontWeight: "600",
                      textAlign: "right",
                      flex: 1,
                      fontFamily: "'Roboto Mono', monospace",
                    }}>****{selectedRequest.accountNumber?.toString().slice(-4) || "****"}</span>
                  </div>
                  
                  {/* Show Card Number if available */}
                  {selectedRequest.cardNumber && (
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      padding: "12px 0",
                      borderBottom: "1px solid #F3F4F6",
                    }}>
                      <span style={{
                        fontSize: "14px",
                        color: "#6B7280",
                        fontWeight: "600",
                        flex: "0 0 120px",
                      }}>Card Number</span>
                      <span style={{
                        fontSize: "14px",
                        color: "#111827",
                        fontWeight: "600",
                        textAlign: "right",
                        flex: 1,
                        fontFamily: "'Roboto Mono', monospace",
                      }}>****{selectedRequest.cardNumber?.toString().slice(-4)}</span>
                    </div>
                  )}
                  
                  {/* Service-specific fields */}
                  {selectedRequest.type === "CHEQUE_LEAVES" && selectedRequest.fullDetails?.noOfLeaves && (
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      padding: "12px 0",
                      borderBottom: "1px solid #F3F4F6",
                    }}>
                      <span style={{
                        fontSize: "14px",
                        color: "#6B7280",
                        fontWeight: "600",
                        flex: "0 0 120px",
                      }}>Number of Leaves</span>
                      <span style={{
                        fontSize: "14px",
                        color: "#111827",
                        fontWeight: "600",
                        textAlign: "right",
                        flex: 1,
                      }}>{selectedRequest.fullDetails.noOfLeaves}</span>
                    </div>
                  )}
                  
                  {selectedRequest.type === "CREDIT_LIMIT" && (
                    <>
                      {selectedRequest.fullDetails?.currentLimit && (
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          padding: "12px 0",
                          borderBottom: "1px solid #F3F4F6",
                        }}>
                          <span style={{
                            fontSize: "14px",
                            color: "#6B7280",
                            fontWeight: "600",
                            flex: "0 0 120px",
                          }}>Current Limit</span>
                          <span style={{
                            fontSize: "14px",
                            color: "#111827",
                            fontWeight: "600",
                            textAlign: "right",
                            flex: 1,
                          }}>₹{selectedRequest.fullDetails.currentLimit?.toLocaleString()}</span>
                        </div>
                      )}
                      {selectedRequest.fullDetails?.requestedLimit && (
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          padding: "12px 0",
                          borderBottom: "1px solid #F3F4F6",
                        }}>
                          <span style={{
                            fontSize: "14px",
                            color: "#6B7280",
                            fontWeight: "600",
                            flex: "0 0 120px",
                          }}>Requested Limit</span>
                          <span style={{
                            fontSize: "14px",
                            color: "#111827",
                            fontWeight: "600",
                            textAlign: "right",
                            flex: 1,
                          }}>₹{selectedRequest.fullDetails.requestedLimit?.toLocaleString()}</span>
                        </div>
                      )}
                      {selectedRequest.fullDetails?.fullName && (
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          padding: "12px 0",
                          borderBottom: "1px solid #F3F4F6",
                        }}>
                          <span style={{
                            fontSize: "14px",
                            color: "#6B7280",
                            fontWeight: "600",
                            flex: "0 0 120px",
                          }}>Customer Name</span>
                          <span style={{
                            fontSize: "14px",
                            color: "#111827",
                            fontWeight: "600",
                            textAlign: "right",
                            flex: 1,
                          }}>{selectedRequest.fullDetails.fullName}</span>
                        </div>
                      )}
                      {selectedRequest.fullDetails?.mobileNumber && (
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          padding: "12px 0",
                          borderBottom: "1px solid #F3F4F6",
                        }}>
                          <span style={{
                            fontSize: "14px",
                            color: "#6B7280",
                            fontWeight: "600",
                            flex: "0 0 120px",
                          }}>Mobile Number</span>
                          <span style={{
                            fontSize: "14px",
                            color: "#111827",
                            fontWeight: "600",
                            textAlign: "right",
                            flex: 1,
                          }}>{selectedRequest.fullDetails.mobileNumber}</span>
                        </div>
                      )}
                    </>
                  )}
                  
                  {selectedRequest.type === "LOST_CARD" && (
                    <>
                      {selectedRequest.fullDetails?.lostCardNumber && (
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          padding: "12px 0",
                          borderBottom: "1px solid #F3F4F6",
                        }}>
                          <span style={{
                            fontSize: "14px",
                            color: "#6B7280",
                            fontWeight: "600",
                            flex: "0 0 120px",
                          }}>Lost Card Number</span>
                          <span style={{
                            fontSize: "14px",
                            color: "#111827",
                            fontWeight: "600",
                            textAlign: "right",
                            flex: 1,
                            fontFamily: "'Roboto Mono', monospace",
                          }}>****{selectedRequest.fullDetails.lostCardNumber?.toString().slice(-4)}</span>
                        </div>
                      )}
                      {selectedRequest.fullDetails?.lostCardStolenDate && (
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          padding: "12px 0",
                          borderBottom: "1px solid #F3F4F6",
                        }}>
                          <span style={{
                            fontSize: "14px",
                            color: "#6B7280",
                            fontWeight: "600",
                            flex: "0 0 120px",
                          }}>Lost/Stolen Date</span>
                          <span style={{
                            fontSize: "14px",
                            color: "#111827",
                            fontWeight: "600",
                            textAlign: "right",
                            flex: 1,
                          }}>{formatDate(selectedRequest.fullDetails.lostCardStolenDate)}</span>
                        </div>
                      )}
                      {selectedRequest.fullDetails?.fullName && (
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          padding: "12px 0",
                          borderBottom: "1px solid #F3F4F6",
                        }}>
                          <span style={{
                            fontSize: "14px",
                            color: "#6B7280",
                            fontWeight: "600",
                            flex: "0 0 120px",
                          }}>Customer Name</span>
                          <span style={{
                            fontSize: "14px",
                            color: "#111827",
                            fontWeight: "600",
                            textAlign: "right",
                            flex: 1,
                          }}>{selectedRequest.fullDetails.fullName}</span>
                        </div>
                      )}
                    </>
                  )}
                  
                  {selectedRequest.type === "GENERAL_QUERY" && selectedRequest.fullDetails?.customerQuery && (
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      padding: "12px 0",
                      borderBottom: "1px solid #F3F4F6",
                    }}>
                      <span style={{
                        fontSize: "14px",
                        color: "#6B7280",
                        fontWeight: "600",
                        flex: "0 0 120px",
                      }}>Query</span>
                      <span style={{
                        fontSize: "14px",
                        color: "#111827",
                        fontWeight: "600",
                        textAlign: "right",
                        flex: 1,
                        wordBreak: "break-word",
                      }}>{selectedRequest.fullDetails.customerQuery}</span>
                    </div>
                  )}
                </div>

                {/* Right Column - Additional Information */}
                <div style={{
                  backgroundColor: "#F9FAFB",
                  borderRadius: "16px",
                  padding: "24px",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}>
                  <h3 style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#111827",
                    margin: "0 0 16px 0",
                    paddingBottom: "12px",
                    borderBottom: "1px solid #E5E7EB",
                  }}>Additional Information</h3>
                  
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: "12px 0",
                    borderBottom: "1px solid #F3F4F6",
                  }}>
                    <span style={{
                      fontSize: "14px",
                      color: "#6B7280",
                      fontWeight: "600",
                      flex: "0 0 120px",
                    }}>Approved Date</span>
                    <span style={{
                      fontSize: "14px",
                      color: "#111827",
                      fontWeight: "600",
                      textAlign: "right",
                      flex: 1,
                    }}>{formatDate(selectedRequest.approvedDate)}</span>
                  </div>
                  
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: "12px 0",
                    borderBottom: "1px solid #F3F4F6",
                  }}>
                    <span style={{
                      fontSize: "14px",
                      color: "#6B7280",
                      fontWeight: "600",
                      flex: "0 0 120px",
                    }}>Remarks</span>
                    <span style={{
                      fontSize: "14px",
                      color: "#111827",
                      fontWeight: "600",
                      textAlign: "right",
                      flex: 1,
                      wordBreak: "break-word",
                    }}>{selectedRequest.remarks || "-"}</span>
                  </div>
                  
                  {selectedRequest.rejectReason && selectedRequest.rejectReason !== "-" && (
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      padding: "12px 0",
                      borderBottom: "1px solid #F3F4F6",
                    }}>
                      <span style={{
                        fontSize: "14px",
                        color: "#6B7280",
                        fontWeight: "600",
                        flex: "0 0 120px",
                      }}>Reject Reason</span>
                      <span style={{
                        fontSize: "14px",
                        color: "#EF4444",
                        fontWeight: "600",
                        textAlign: "right",
                        flex: 1,
                        wordBreak: "break-word",
                      }}>{selectedRequest.rejectReason}</span>
                    </div>
                  )}
                  
                  {selectedRequest.type === "GENERAL_QUERY" && selectedRequest.fullDetails?.queryResponse && (
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      padding: "12px 0",
                      borderBottom: "1px solid #F3F4F6",
                    }}>
                      <span style={{
                        fontSize: "14px",
                        color: "#6B7280",
                        fontWeight: "600",
                        flex: "0 0 120px",
                      }}>Response</span>
                      <span style={{
                        fontSize: "14px",
                        color: "#111827",
                        fontWeight: "600",
                        textAlign: "right",
                        flex: 1,
                        wordBreak: "break-word",
                      }}>{selectedRequest.fullDetails.queryResponse}</span>
                    </div>
                  )}
                  
                  {/* Show contact details for credit limit and lost card */}
                  {(selectedRequest.type === "CREDIT_LIMIT" || selectedRequest.type === "LOST_CARD") && (
                    <>
                      {selectedRequest.fullDetails?.email && (
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          padding: "12px 0",
                          borderBottom: "1px solid #F3F4F6",
                        }}>
                          <span style={{
                            fontSize: "14px",
                            color: "#6B7280",
                            fontWeight: "600",
                            flex: "0 0 120px",
                          }}>Email</span>
                          <span style={{
                            fontSize: "14px",
                            color: "#111827",
                            fontWeight: "600",
                            textAlign: "right",
                            flex: 1,
                            wordBreak: "break-word",
                          }}>{selectedRequest.fullDetails.email}</span>
                        </div>
                      )}
                      {selectedRequest.fullDetails?.city && (
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          padding: "12px 0",
                          borderBottom: "1px solid #F3F4F6",
                        }}>
                          <span style={{
                            fontSize: "14px",
                            color: "#6B7280",
                            fontWeight: "600",
                            flex: "0 0 120px",
                          }}>City</span>
                          <span style={{
                            fontSize: "14px",
                            color: "#111827",
                            fontWeight: "600",
                            textAlign: "right",
                            flex: 1,
                          }}>{selectedRequest.fullDetails.city}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingTop: "24px",
              borderTop: "1px solid #E5E7EB",
            }}>
              <button 
                onClick={closeModal}
                style={{
                  padding: "12px 32px",
                  backgroundColor: "#1E3A8A",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(30, 58, 138, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#2563EB";
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 20px rgba(30, 58, 138, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#1E3A8A";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 12px rgba(30, 58, 138, 0.3)";
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bank Logo Bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "24px",
        padding: "12px 20px",
        background: "white",
        borderRadius: "12px",
        border: "1px solid #E5E7EB",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.02)",
        maxWidth: "fit-content",
        animation: "fadeIn 0.4s ease"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          background: "#EFF6FF",
          padding: "8px",
          borderRadius: "8px"
        }}>
          <FaRegBuilding size={16} color="#1E3A8A" />
        </div>
        <span style={{
          fontSize: "18px",
          fontWeight: "700",
          color: "#1E3A8A",
          letterSpacing: "0.5px"
        }}>ABC BANK</span>
      </div>

      {/* Header with Filters */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px",
        flexWrap: "wrap",
        gap: "16px",
      }}>
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#1E3A8A",
            margin: 0,
            letterSpacing: "-0.02em",
          }}>My Requests</h1>
          <p style={{
            fontSize: "15px",
            color: "#6B7280",
            margin: "4px 0 0 0",
            fontWeight: "400",
          }}>Track and manage your service requests</p>
        </div>
        
        {/* Filter Section */}
        <div style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
          flexWrap: "wrap",
        }}>
          {/* Account Dropdown */}
          <div ref={accountDropdownRef} className="account-dropdown-container">
            <div 
              className={`account-dropdown-button ${isAccountDropdownOpen ? 'active' : ''}`}
              onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
            >
              {selectedAccountDetails ? (
                <div className="selected-account-preview">
                  <div className="account-avatar">
                    {selectedAccountDetails.icon}
                  </div>
                  <div className="account-info">
                    <span className="account-type">{selectedAccountDetails.type}</span>
                    <div className="account-number-preview">
                      <span className="account-masked">****{selectedAccountDetails.last4}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="selected-account-preview">
                  <div className="account-avatar">🏦</div>
                  <div className="account-info">
                    <span className="account-type">Select Account</span>
                  </div>
                </div>
              )}
              <FaChevronDown className={`dropdown-arrow ${isAccountDropdownOpen ? 'open' : ''}`} />
            </div>

            {isAccountDropdownOpen && (
              <div className="account-dropdown-menu">
                {loadingAccounts ? (
                  <div style={{
                    padding: "24px",
                    textAlign: "center",
                    color: "#6B7280",
                  }}>
                    <div style={{
                      width: "20px",
                      height: "20px",
                      border: "2px solid #E5E7EB",
                      borderTopColor: "#1E3A8A",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                      margin: "0 auto 10px",
                    }}></div>
                    <p>Loading accounts...</p>
                  </div>
                ) : accounts.length > 0 ? (
                  accounts.map(account => (
                    <div
                      key={account.number}
                      className={`account-dropdown-item ${selectedAccount === account.number ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedAccount(account.number);
                        setIsAccountDropdownOpen(false);
                      }}
                    >
                      <div className="account-item-avatar">{account.icon}</div>
                      <div className="account-item-details">
                        <div className="account-item-type">{account.type}</div>
                        <div className="account-item-number">
                          <span className="account-item-masked">****{account.last4}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{
                    padding: "24px",
                    textAlign: "center",
                    color: "#6B7280",
                  }}>
                    <p>No accounts found</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Request Type Filter */}
          <div style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}>
            <select
              value={selectedRequestType}
              onChange={(e) => setSelectedRequestType(e.target.value)}
              className="request-type-select"
              disabled={!selectedAccount}
            >
              <option value="ALL">All Requests</option>
              <option value="CHEQUE_LEAVES">Cheque Leaves</option>
              <option value="CREDIT_LIMIT">Credit Limit</option>
              <option value="LOST_CARD">Lost Card</option>
              <option value="GENERAL_QUERY">General Query</option>
            </select>

            {selectedRequestType !== "ALL" && (
              <button 
                onClick={clearFilter} 
                style={{
                  width: "44px",
                  height: "44px",
                  backgroundColor: "#EF4444",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "18px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s",
                  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                }}
                className="clear-button"
                title="Clear Filter"
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#DC2626";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#EF4444";
                }}
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* No Account Selected */}
      {!selectedAccount && (
        <div style={{
          textAlign: "center",
          padding: "80px 40px",
          backgroundColor: "white",
          borderRadius: "24px",
          boxShadow: "0 10px 25px -5px rgba(30, 58, 138, 0.1)",
          border: "1px solid #E5E7EB",
          maxWidth: "500px",
          margin: "40px auto",
        }}>
          <div style={{ fontSize: "64px", marginBottom: "24px", opacity: 0.7 }}>🏦</div>
          <h3 style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#111827",
            margin: "0 0 8px 0",
          }}>Select an Account</h3>
          <p style={{
            fontSize: "14px",
            color: "#6B7280",
            marginBottom: "20px",
          }}>Please select an account to view your requests</p>
        </div>
      )}

      {/* Requests Table */}
      {selectedAccount && filteredRequests.length > 0 && (
        <>
          {/* Request Count and Pagination Info */}
          <div id="requests-table-container" style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
            padding: "12px 0",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}>
              <span style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#111827",
              }}>{filteredRequests.length} Total Requests</span>
            </div>
          </div>

          {/* Table Container */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "20px",
            border: "1px solid #E5E7EB",
            overflow: "auto",
            maxHeight: "600px",
            boxShadow: "0 10px 15px -3px rgba(30, 58, 138, 0.1)",
            marginBottom: "24px",
          }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "600px",
            }}>
              <thead>
                <tr>
                  <th style={{
                    textAlign: "left",
                    padding: "16px 20px",
                    borderBottom: "2px solid #E5E7EB",
                    color: "#111827",
                    fontSize: "14px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    backgroundColor: "#F9FAFB",
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                  }}>Request Type</th>
                  <th style={{
                    textAlign: "left",
                    padding: "16px 20px",
                    borderBottom: "2px solid #E5E7EB",
                    color: "#111827",
                    fontSize: "14px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    backgroundColor: "#F9FAFB",
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                  }}>Requested Date</th>
                  <th style={{
                    textAlign: "left",
                    padding: "16px 20px",
                    borderBottom: "2px solid #E5E7EB",
                    color: "#111827",
                    fontSize: "14px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    backgroundColor: "#F9FAFB",
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                  }}>Status</th>
                  <th style={{
                    textAlign: "left",
                    padding: "16px 20px",
                    borderBottom: "2px solid #E5E7EB",
                    color: "#111827",
                    fontSize: "14px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    backgroundColor: "#F9FAFB",
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                  }}>View</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={item.id} style={{
                    borderBottom: "1px solid #E5E7EB",
                    transition: "all 0.3s ease",
                    backgroundColor: index % 2 === 0 ? 'white' : '#F9FAFB',
                  }} className="request-row">
                    <td style={{
                      padding: "16px 20px",
                      fontSize: "14px",
                      color: "#111827",
                      verticalAlign: "middle",
                    }}>
                      <span style={{
                        padding: "6px 14px",
                        borderRadius: "30px",
                        fontSize: "13px",
                        fontWeight: "600",
                        border: "1px solid",
                        display: "inline-block",
                        whiteSpace: "nowrap",
                        backgroundColor: `${getTypeColor(item.type)}20`,
                        color: getTypeColor(item.type),
                        borderColor: getTypeColor(item.type),
                      }} className="type-badge">
                        {item.typeLabel}
                      </span>
                    </td>
                    <td style={{
                      padding: "16px 20px",
                      fontSize: "14px",
                      color: "#111827",
                      verticalAlign: "middle",
                    }}>
                      <span style={{
                        fontFamily: "'Roboto Mono', monospace",
                        fontSize: "13px",
                        color: "#111827",
                        fontWeight: "600",
                        whiteSpace: "nowrap",
                      }}>
                        {formatDate(item.requestDate)}
                      </span>
                    </td>
                    <td style={{
                      padding: "16px 20px",
                      fontSize: "14px",
                      color: "#111827",
                      verticalAlign: "middle",
                    }}>
                      <span style={{
                        padding: "6px 14px",
                        borderRadius: "30px",
                        fontSize: "12px",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        display: "inline-block",
                        whiteSpace: "nowrap",
                        ...getStatusStyle(item.status)
                      }} className="status-badge">
                        {item.status}
                      </span>
                    </td>
                    <td style={{
                      padding: "16px 20px",
                      fontSize: "14px",
                      color: "#111827",
                      verticalAlign: "middle",
                    }}>
                      <button 
                        style={{
                          padding: "8px 20px",
                          backgroundColor: "#1E3A8A",
                          color: "white",
                          border: "none",
                          borderRadius: "30px",
                          fontSize: "13px",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "all 0.3s",
                          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                          minWidth: "100px",
                        }}
                        onClick={() => openRequestDetails(item)}
                        className="view-button"
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#2563EB";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "#1E3A8A";
                        }}
                      >
                        <FaEye style={{ marginRight: "6px" }} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{
              marginTop: "24px",
              marginBottom: "24px",
            }}>
              <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                flexWrap: "wrap",
              }}>
                <button
                  onClick={() => paginate(1)}
                  disabled={currentPage === 1}
                  style={{
                    padding: "10px 18px",
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "12px",
                    color: "#111827",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  className="pagination-button"
                >
                  « First
                </button>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{
                    padding: "10px 18px",
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "12px",
                    color: "#111827",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  className="pagination-button"
                >
                  ← Prev
                </button>
                
                <div style={{
                  display: "flex",
                  gap: "4px",
                }}>
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
                        onClick={() => paginate(pageNum)}
                        className={`pagination-button ${currentPage === pageNum ? 'active' : ''}`}
                        style={{
                          width: "44px",
                          height: "44px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "white",
                          border: "1px solid #E5E7EB",
                          borderRadius: "12px",
                          color: "#111827",
                          fontSize: "14px",
                          fontWeight: "500",
                          cursor: "pointer",
                          transition: "all 0.3s",
                          ...(currentPage === pageNum ? {
                            backgroundColor: "#1E3A8A",
                            color: "white",
                            borderColor: "#1E3A8A",
                          } : {})
                        }}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: "10px 18px",
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "12px",
                    color: "#111827",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  className="pagination-button"
                >
                  Next →
                </button>
                <button
                  onClick={() => paginate(totalPages)}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: "10px 18px",
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "12px",
                    color: "#111827",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  className="pagination-button"
                >
                  Last »
                </button>
              </div>

              <div style={{
                textAlign: "center",
                fontSize: "13px",
                color: "#6B7280",
                marginTop: "16px",
              }}>
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredRequests.length)} of {filteredRequests.length} requests
              </div>
            </div>
          )}
        </>
      )}

      {/* Empty State - No Results */}
      {selectedAccount && filteredRequests.length === 0 && (
        <div style={{
          textAlign: "center",
          padding: "80px 40px",
          backgroundColor: "white",
          borderRadius: "24px",
          boxShadow: "0 10px 25px -5px rgba(30, 58, 138, 0.1)",
          border: "1px solid #E5E7EB",
          maxWidth: "600px",
          margin: "40px auto",
        }}>
          <div style={{ fontSize: "64px", marginBottom: "24px", opacity: 0.7 }}>📋</div>
          <h3 style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#111827",
            margin: "0 0 8px 0",
          }}>No Requests Found</h3>
          <p style={{
            fontSize: "14px",
            color: "#6B7280",
            marginBottom: "24px",
          }}>
            {requests.length === 0 
              ? "You haven't submitted any requests yet." 
              : `No ${selectedRequestType !== "ALL" ? getRequestTypeLabel(selectedRequestType) : ""} requests found.`}
          </p>
          {selectedRequestType !== "ALL" && requests.length > 0 && (
            <button 
              onClick={clearFilter}
              style={{
                padding: "14px 36px",
                backgroundColor: "#1E3A8A",
                color: "white",
                border: "none",
                borderRadius: "30px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s",
                boxShadow: "0 4px 12px rgba(30, 58, 138, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#2563EB";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 20px rgba(30, 58, 138, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#1E3A8A";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 12px rgba(30, 58, 138, 0.3)";
              }}
            >
              View All Requests
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MyRequests;