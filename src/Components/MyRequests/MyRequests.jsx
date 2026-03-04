// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import {
//   FaWallet,
//   FaCreditCard,
//   FaBriefcase,
//   FaUniversity,
//   FaShieldAlt,
//   FaClock,
//   FaChevronDown,
//   FaTimes,
//   FaEye,
//   FaFilter,
//   FaCheckCircle,
//   FaExclamationTriangle,
//   FaRegBuilding
// } from "react-icons/fa";

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

//   // Canara Bank color scheme
//   const canaraBlue = "#1E3A8A";
//   const canaraGold = "#F59E0B";
//   const canaraNavy = "#0A2472";
//   const canaraLightBlue = "#EFF6FF";
//   const canaraGray = "#F3F4F6";
//   const canaraBorder = "#E5E7EB";
//   const canaraText = "#111827";
//   const canaraTextLight = "#6B7280";
//   const canaraSuccess = "#10B981";
//   const canaraSuccessLight = "#D1FAE5";
//   const canaraDanger = "#EF4444";
//   const canaraDangerLight = "#FEE2E2";
//   const canaraWarning = "#F59E0B";
//   const canaraWarningLight = "#FEF3C7";

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

//   // Canara Bank Theme CSS Variables
//   useEffect(() => {
//     const styleSheet = document.createElement("style");
//     styleSheet.textContent = `
//       :root {
//         /* Canara Bank Theme - Blue and Gold */
//         --canara-blue: #1E3A8A;
//         --canara-navy: #0A2472;
//         --canara-gold: #F59E0B;
//         --canara-light-blue: #EFF6FF;
//         --canara-gray: #F3F4F6;
//         --canara-border: #E5E7EB;
//         --canara-text: #111827;
//         --canara-text-light: #6B7280;
//         --canara-success: #10B981;
//         --canara-success-light: #D1FAE5;
//         --canara-danger: #EF4444;
//         --canara-danger-light: #FEE2E2;
//         --canara-warning: #F59E0B;
//         --canara-warning-light: #FEF3C7;
        
//         /* Surface colors */
//         --bg-primary: #F9FAFB;
//         --bg-secondary: #FFFFFF;
//         --surface: #FFFFFF;
//         --surface-hover: #EFF6FF;
//         --text-primary: #111827;
//         --text-secondary: #4B5563;
//         --text-muted: #6B7280;
//         --border: #E5E7EB;
//         --border-light: #F3F4F6;
//         --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
//         --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
//         --shadow-lg: 0 10px 15px -3px rgba(30, 58, 138, 0.1);
//         --shadow-hover: 0 20px 25px -5px rgba(30, 58, 138, 0.2);
//         --primary: #1E3A8A;
//         --primary-light: #2563EB;
//         --primary-dark: #0A2472;
//         --primary-soft: #EFF6FF;
//         --primary-gradient: linear-gradient(135deg, #1E3A8A, #2563EB);
//         --success: #10B981;
//         --success-soft: #D1FAE5;
//         --danger: #EF4444;
//         --danger-soft: #FEE2E2;
//         --warning: #F59E0B;
//         --warning-soft: #FEF3C7;
//         --hover-bg: #EFF6FF;
//         --active-bg: #DBEAFE;
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

//       @keyframes fadeIn {
//         from { opacity: 0; }
//         to { opacity: 1; }
//       }

//       @keyframes slideUp {
//         from {
//           opacity: 0;
//           transform: translateY(20px);
//         }
//         to {
//           opacity: 1;
//           transform: translateY(0);
//         }
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

//       @keyframes pulse {
//         0%, 100% { transform: scale(1); }
//         50% { transform: scale(1.05); }
//       }

//       @keyframes shimmer {
//         0% { background-position: -1000px 0; }
//         100% { background-position: 1000px 0; }
//       }

//       @keyframes float {
//         0%, 100% { transform: translateY(0); }
//         50% { transform: translateY(-5px); }
//       }

//       @keyframes spin {
//         from { transform: rotate(0deg); }
//         to { transform: rotate(360deg); }
//       }

//       @keyframes bounceIn {
//         0% { transform: scale(0.9); opacity: 0; }
//         50% { transform: scale(1.05); }
//         100% { transform: scale(1); opacity: 1; }
//       }

//       /* Account Dropdown Styles */
//       .account-dropdown-container {
//         position: relative;
//         width: 260px;
//         animation: slideInRight 0.4s ease;
//       }

//       .account-dropdown-button {
//         width: 100%;
//         padding: 12px 16px;
//         background: white;
//         border: 2px solid var(--border);
//         border-radius: 12px;
//         display: flex;
//         align-items: center;
//         justify-content: space-between;
//         cursor: pointer;
//         transition: all 0.3s ease;
//         box-shadow: var(--shadow-sm);
//       }

//       .account-dropdown-button:hover {
//         border-color: var(--canara-blue);
//         transform: translateY(-2px);
//         box-shadow: 0 4px 12px rgba(30, 58, 138, 0.1);
//       }

//       .account-dropdown-button.active {
//         border-color: var(--canara-blue);
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
//         border-radius: 10px;
//         background: var(--primary-soft);
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         font-size: 20px;
//         color: var(--canara-blue);
//         transition: all 0.3s ease;
//       }

//       .account-dropdown-button:hover .account-avatar {
//         transform: scale(1.1) rotate(-4deg);
//         background: var(--canara-blue);
//         color: white;
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
//         font-family: 'Roboto Mono', monospace;
//         background: var(--border-light);
//         padding: 2px 8px;
//         border-radius: 12px;
//       }

//       .dropdown-arrow {
//         color: var(--text-muted);
//         transition: transform 0.3s ease;
//         font-size: 16px;
//       }

//       .dropdown-arrow.open {
//         transform: rotate(180deg);
//         color: var(--canara-blue);
//       }

//       .account-dropdown-menu {
//         position: absolute;
//         top: calc(100% + 8px);
//         left: 0;
//         right: 0;
//         background: white;
//         border: 1px solid var(--border);
//         border-radius: 12px;
//         box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
//         max-height: 350px;
//         overflow-y: auto;
//         z-index: 1000;
//         animation: slideUp 0.3s ease;
//       }

//       .account-dropdown-menu::-webkit-scrollbar {
//         width: 6px;
//       }

//       .account-dropdown-menu::-webkit-scrollbar-track {
//         background: var(--border-light);
//         border-radius: 10px;
//       }

//       .account-dropdown-menu::-webkit-scrollbar-thumb {
//         background: var(--canara-blue);
//         border-radius: 10px;
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
//         background: var(--primary-soft);
//       }

//       .account-dropdown-item.selected {
//         background: var(--primary-soft);
//         border-left: 4px solid var(--canara-blue);
//       }

//       .account-item-avatar {
//         width: 36px;
//         height: 36px;
//         border-radius: 8px;
//         background: var(--bg-primary);
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         font-size: 18px;
//         color: var(--canara-blue);
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
//         font-size: 12px;
//         color: var(--text-muted);
//         font-family: 'Roboto Mono', monospace;
//         background: var(--border-light);
//         padding: 2px 8px;
//         border-radius: 12px;
//       }

//       /* Request Type Select */
//       .request-type-select {
//         padding: 12px 40px 12px 16px;
//         background: white;
//         border: 2px solid var(--border);
//         border-radius: 12px;
//         font-size: 14px;
//         font-weight: 500;
//         color: var(--text-primary);
//         cursor: pointer;
//         outline: none;
//         width: 200px;
//         appearance: none;
//         background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231E3A8A'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
//         background-repeat: no-repeat;
//         background-position: right 12px center;
//         background-size: 16px;
//         transition: all 0.2s ease;
//       }

//       .request-type-select:hover {
//         border-color: var(--canara-blue);
//         transform: translateY(-2px);
//         box-shadow: 0 4px 12px rgba(30, 58, 138, 0.1);
//       }

//       .request-type-select:focus {
//         border-color: var(--canara-blue);
//         box-shadow: 0 0 0 4px var(--primary-soft);
//       }

//       /* Table Row Hover */
//       .request-row {
//         transition: all 0.3s ease;
//         animation: slideUp 0.4s ease;
//       }

//       .request-row:hover {
//         background-color: var(--primary-soft) !important;
//         transform: translateX(4px);
//         box-shadow: 0 2px 8px rgba(30, 58, 138, 0.08);
//       }

//       /* Pagination Buttons */
//       .pagination-button {
//         transition: all 0.3s ease;
//         border: 1px solid var(--border);
//         background: white;
//         color: var(--text-primary);
//         font-weight: 500;
//         cursor: pointer;
//         animation: bounceIn 0.3s ease;
//       }

//       .pagination-button:hover:not(:disabled) {
//         background: var(--canara-blue);
//         color: white;
//         border-color: var(--canara-blue);
//         transform: translateY(-2px);
//         box-shadow: 0 4px 12px rgba(30, 58, 138, 0.2);
//       }

//       .pagination-button.active {
//         background: var(--canara-blue);
//         color: white;
//         border-color: var(--canara-blue);
//       }

//       .pagination-button:disabled {
//         opacity: 0.5;
//         cursor: not-allowed;
//       }

//       /* View Button */
//       .view-button {
//         transition: all 0.3s ease;
//         animation: slideUp 0.3s ease;
//       }

//       .view-button:hover {
//         background: var(--canara-blue) !important;
//         transform: translateY(-2px) scale(1.05);
//         box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3);
//       }

//       /* Clear Button */
//       .clear-button {
//         transition: all 0.3s ease;
//         animation: bounceIn 0.3s ease;
//       }

//       .clear-button:hover {
//         transform: rotate(90deg) scale(1.1);
//         background-color: var(--canara-danger) !important;
//       }

//       /* Status Badges */
//       .status-badge {
//         transition: all 0.3s ease;
//         padding: 4px 12px;
//         border-radius: 30px;
//         font-size: 12px;
//         font-weight: 600;
//         display: inline-block;
//       }

//       .status-badge.approved {
//         background: var(--success-soft);
//         color: var(--success);
//         border: 1px solid var(--success);
//       }

//       .status-badge.rejected {
//         background: var(--danger-soft);
//         color: var(--danger);
//         border: 1px solid var(--danger);
//       }

//       .status-badge.pending {
//         background: var(--warning-soft);
//         color: var(--warning);
//         border: 1px solid var(--warning);
//       }

//       .status-badge:hover {
//         transform: translateY(-2px);
//         box-shadow: 0 2px 8px rgba(0,0,0,0.1);
//       }

//       /* Type Badge */
//       .type-badge {
//         transition: all 0.3s ease;
//         padding: 4px 12px;
//         border-radius: 30px;
//         font-size: 12px;
//         font-weight: 600;
//         display: inline-block;
//       }

//       .type-badge:hover {
//         transform: translateY(-2px);
//         box-shadow: 0 2px 8px rgba(0,0,0,0.1);
//       }

//       /* Loading Animations */
//       .loader-bar {
//         animation: pulse 1.5s ease-in-out infinite;
//       }

//       .progress-fill {
//         animation: shimmer 1.5s infinite;
//       }

//       /* Modal Animation */
//       .modal-content {
//         animation: slideUp 0.3s ease;
//       }

//       /* Focus States */
//       *:focus-visible {
//         outline: 2px solid var(--canara-blue);
//         outline-offset: 2px;
//       }
//     `;
//     document.head.appendChild(styleSheet);
    
//     return () => {
//       document.head.removeChild(styleSheet);
//     };
//   }, []);

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
//           branchName: acc.branchName,
//           status: acc.status
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
//             type: "CHEQUE_LEAVES",
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
//           background: canaraSuccessLight,
//           color: canaraSuccess,
//           border: `1px solid ${canaraSuccess}`,
//         };
//       case "REJECTED":
//         return {
//           background: canaraDangerLight,
//           color: canaraDanger,
//           border: `1px solid ${canaraDanger}`,
//         };
//       case "PENDING":
//         return {
//           background: canaraWarningLight,
//           color: canaraWarning,
//           border: `1px solid ${canaraWarning}`,
//         };
//       default:
//         return {
//           background: canaraGray,
//           color: canaraText,
//           border: `1px solid ${canaraBorder}`,
//         };
//     }
//   };

//   // Get request type label
//   const getRequestTypeLabel = (type) => {
//     const options = {
//       "ALL": "All Requests",
//       "CHEQUE_LEAVES": "Cheque Leaves",
//       "CREDIT_LIMIT": "Credit Limit",
//       "LOST_CARD": "Lost Card",
//       "GENERAL_QUERY": "General Query"
//     };
//     return options[type] || type;
//   };

//   // Get request type color
//   const getTypeColor = (type) => {
//     const colors = {
//       "CHEQUE_LEAVES": canaraBlue,
//       "CREDIT_LIMIT": "#8B5CF6",
//       "LOST_CARD": canaraDanger,
//       "GENERAL_QUERY": canaraSuccess
//     };
//     return colors[type] || canaraText;
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
//       <div style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh",
//         backgroundColor: "#F9FAFB",
//       }}>
//         <div style={{
//           textAlign: "center",
//           padding: "40px",
//           backgroundColor: "white",
//           borderRadius: "24px",
//           boxShadow: "0 10px 25px -5px rgba(30, 58, 138, 0.1)",
//           width: "350px",
//           border: "1px solid #E5E7EB",
//         }}>
//           {/* Bank Building Icon */}
//           <div style={{
//             width: "100px",
//             height: "100px",
//             margin: "0 auto 24px",
//             position: "relative",
//             animation: "float 3s ease-in-out infinite",
//           }}>
//             <div style={{
//               width: "0",
//               height: "0",
//               borderLeft: "50px solid transparent",
//               borderRight: "50px solid transparent",
//               borderBottom: "30px solid #1E3A8A",
//               margin: "0 auto",
//             }} />
//             <div style={{
//               width: "80px",
//               height: "50px",
//               backgroundColor: "#2563EB",
//               margin: "0 auto",
//               borderRadius: "8px 8px 0 0",
//               display: "flex",
//               justifyContent: "space-around",
//               alignItems: "center",
//               padding: "0 10px",
//             }}>
//               {[1,2,3].map(i => (
//                 <div key={i} style={{
//                   width: "12px",
//                   height: "35px",
//                   backgroundColor: "#EFF6FF",
//                   borderRadius: "4px 4px 0 0",
//                   animation: `pulse 1.5s ease-in-out infinite ${i * 0.2}s`,
//                 }} />
//               ))}
//             </div>
//             <div style={{
//               width: "100px",
//               height: "8px",
//               backgroundColor: "#F59E0B",
//               margin: "0 auto",
//               borderRadius: "4px",
//             }} />
//           </div>

//           {/* Loading Bars */}
//           <div style={{
//             display: "flex",
//             justifyContent: "center",
//             gap: "8px",
//             marginBottom: "24px",
//           }}>
//             {[1,2,3,4,5].map(i => (
//               <div key={i} style={{
//                 width: "8px",
//                 height: "40px",
//                 backgroundColor: "#1E3A8A",
//                 borderRadius: "4px",
//                 animation: `pulse 1s ease-in-out infinite ${i * 0.1}s`,
//               }} />
//             ))}
//           </div>

//           {/* Text */}
//           <div style={{ marginBottom: "24px" }}>
//             <div style={{
//               fontSize: "22px",
//               fontWeight: "700",
//               color: "#1E3A8A",
//               marginBottom: "8px",
//             }}>
//               ABC BANK
//             </div>
//             <div style={{
//               fontSize: "16px",
//               color: "#6B7280",
//             }}>
//               Loading your requests
//               <span style={{ display: "inline-block", animation: "pulse 1.5s infinite" }}>...</span>
//             </div>
//           </div>

//           {/* Progress Bar */}
//           <div style={{
//             width: "100%",
//             height: "4px",
//             backgroundColor: "#EFF6FF",
//             borderRadius: "2px",
//             overflow: "hidden",
//             marginBottom: "20px",
//           }}>
//             <div style={{
//               width: "70%",
//               height: "100%",
//               background: "linear-gradient(90deg, #1E3A8A, #2563EB)",
//               borderRadius: "2px",
//               animation: "shimmer 1.5s infinite",
//             }} />
//           </div>

//           {/* Security Badge */}
//           <div style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: "8px",
//             padding: "8px 16px",
//             backgroundColor: "#EFF6FF",
//             borderRadius: "30px",
//             width: "fit-content",
//             margin: "0 auto",
//           }}>
//             <FaShieldAlt size={12} color="#1E3A8A" />
//             <span style={{ fontSize: "13px", color: "#1E3A8A", fontWeight: "500" }}>
//               Secure Connection
//             </span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div style={{
//         maxWidth: "1400px",
//         margin: "0 auto",
//         padding: "24px",
//       }}>
//         <div style={{
//           textAlign: "center",
//           padding: "60px",
//           backgroundColor: "white",
//           borderRadius: "24px",
//           boxShadow: "0 10px 25px -5px rgba(30, 58, 138, 0.1)",
//           border: "1px solid #E5E7EB",
//           maxWidth: "500px",
//           margin: "40px auto",
//         }}>
//           <FaExclamationTriangle size={48} color="#EF4444" style={{ marginBottom: "20px" }} />
//           <p style={{
//             fontSize: "16px",
//             color: "#111827",
//             marginBottom: "24px",
//           }}>{error}</p>
//           <button 
//             onClick={() => selectedAccount && fetchAllRequests(selectedAccount)} 
//             style={{
//               padding: "14px 36px",
//               backgroundColor: "#1E3A8A",
//               color: "white",
//               border: "none",
//               borderRadius: "30px",
//               fontSize: "15px",
//               fontWeight: "600",
//               cursor: "pointer",
//               transition: "all 0.3s ease",
//               boxShadow: "0 4px 12px rgba(30, 58, 138, 0.3)",
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.transform = "translateY(-2px)";
//               e.target.style.boxShadow = "0 8px 20px rgba(30, 58, 138, 0.4)";
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.transform = "translateY(0)";
//               e.target.style.boxShadow = "0 4px 12px rgba(30, 58, 138, 0.3)";
//             }}
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
//     <div style={{
//       maxWidth: "1400px",
//       margin: "0 auto",
//       padding: "24px",
//       fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
//       backgroundColor: "#F9FAFB",
//       minHeight: "100vh",
//       height: "100%",
//       overflowY: "auto",
//       color: "#111827",
//     }}>
//       {/* Request Details Modal */}
//       {modalOpen && selectedRequest && (
//         <div style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: "rgba(0, 0, 0, 0.5)",
//           backdropFilter: "blur(4px)",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           zIndex: 1000,
//           padding: "20px",
//         }} onClick={closeModal}>
//           <div style={{
//             backgroundColor: "white",
//             borderRadius: "24px",
//             padding: "32px",
//             maxWidth: "800px",
//             width: "90%",
//             maxHeight: "90vh",
//             overflow: "auto",
//             boxShadow: "0 20px 25px -5px rgba(30, 58, 138, 0.2)",
//             border: "1px solid #E5E7EB",
//           }} className="modal-content" onClick={(e) => e.stopPropagation()}>
//             {/* Modal Header */}
//             <div style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginBottom: "24px",
//               paddingBottom: "16px",
//               borderBottom: "1px solid #E5E7EB",
//             }}>
//               <h2 style={{
//                 fontSize: "28px",
//                 fontWeight: "700",
//                 color: "#111827",
//                 margin: 0,
//               }}>Request Details</h2>
//               <button 
//                 onClick={closeModal}
//                 style={{
//                   background: "none",
//                   border: "none",
//                   fontSize: "24px",
//                   cursor: "pointer",
//                   color: "#6B7280",
//                   padding: "8px",
//                   borderRadius: "50%",
//                   width: "44px",
//                   height: "44px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   transition: "all 0.2s",
//                   backgroundColor: "#F3F4F6",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.backgroundColor = "#FEE2E2";
//                   e.target.style.color = "#EF4444";
//                   e.target.style.transform = "rotate(90deg)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.backgroundColor = "#F3F4F6";
//                   e.target.style.color = "#6B7280";
//                   e.target.style.transform = "rotate(0deg)";
//                 }}
//               >
//                 <FaTimes />
//               </button>
//             </div>
            
//             <div style={{ marginBottom: "24px" }}>
//               {/* Status Card */}
//               <div style={{
//                 backgroundColor: "#F9FAFB",
//                 borderRadius: "16px",
//                 padding: "24px",
//                 marginBottom: "24px",
//                 border: "1px solid #E5E7EB",
//               }}>
//                 <div style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}>
//                   <span style={{
//                     fontSize: "16px",
//                     fontWeight: "600",
//                     color: "#111827",
//                   }}>Current Status</span>
//                   <span style={{
//                     padding: "8px 20px",
//                     borderRadius: "30px",
//                     fontSize: "14px",
//                     fontWeight: "600",
//                     textTransform: "uppercase",
//                     ...getStatusStyle(selectedRequest.status)
//                   }}>
//                     {selectedRequest.status || "PENDING"}
//                   </span>
//                 </div>
//               </div>

//               {/* Request Details Grid */}
//               <div style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: "24px",
//               }}>
//                 {/* Left Column - Request Information */}
//                 <div style={{
//                   backgroundColor: "#F9FAFB",
//                   borderRadius: "16px",
//                   padding: "24px",
//                   border: "1px solid #E5E7EB",
//                   boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
//                 }}>
//                   <h3 style={{
//                     fontSize: "18px",
//                     fontWeight: "700",
//                     color: "#111827",
//                     margin: "0 0 16px 0",
//                     paddingBottom: "12px",
//                     borderBottom: "1px solid #E5E7EB",
//                   }}>Request Information</h3>
                  
//                   <div style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "flex-start",
//                     padding: "12px 0",
//                     borderBottom: "1px solid #F3F4F6",
//                   }}>
//                     <span style={{
//                       fontSize: "14px",
//                       color: "#6B7280",
//                       fontWeight: "600",
//                       flex: "0 0 120px",
//                     }}>Request Type</span>
//                     <span style={{
//                       fontSize: "14px",
//                       color: "#111827",
//                       fontWeight: "600",
//                       textAlign: "right",
//                       flex: 1,
//                     }}>{selectedRequest.typeLabel}</span>
//                   </div>
                  
//                   <div style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "flex-start",
//                     padding: "12px 0",
//                     borderBottom: "1px solid #F3F4F6",
//                   }}>
//                     <span style={{
//                       fontSize: "14px",
//                       color: "#6B7280",
//                       fontWeight: "600",
//                       flex: "0 0 120px",
//                     }}>Description</span>
//                     <span style={{
//                       fontSize: "14px",
//                       color: "#111827",
//                       fontWeight: "600",
//                       textAlign: "right",
//                       flex: 1,
//                       wordBreak: "break-word",
//                     }}>{selectedRequest.fullDetails?.description || selectedRequest.description}</span>
//                   </div>
                  
//                   <div style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "flex-start",
//                     padding: "12px 0",
//                     borderBottom: "1px solid #F3F4F6",
//                   }}>
//                     <span style={{
//                       fontSize: "14px",
//                       color: "#6B7280",
//                       fontWeight: "600",
//                       flex: "0 0 120px",
//                     }}>Requested Date</span>
//                     <span style={{
//                       fontSize: "14px",
//                       color: "#111827",
//                       fontWeight: "600",
//                       textAlign: "right",
//                       flex: 1,
//                     }}>{formatDate(selectedRequest.requestDate)}</span>
//                   </div>
                  
//                   <div style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "flex-start",
//                     padding: "12px 0",
//                     borderBottom: "1px solid #F3F4F6",
//                   }}>
//                     <span style={{
//                       fontSize: "14px",
//                       color: "#6B7280",
//                       fontWeight: "600",
//                       flex: "0 0 120px",
//                     }}>Account Number</span>
//                     <span style={{
//                       fontSize: "14px",
//                       color: "#111827",
//                       fontWeight: "600",
//                       textAlign: "right",
//                       flex: 1,
//                       fontFamily: "'Roboto Mono', monospace",
//                     }}>****{selectedRequest.accountNumber?.toString().slice(-4) || "****"}</span>
//                   </div>
                  
//                   {/* Show Card Number if available */}
//                   {selectedRequest.cardNumber && (
//                     <div style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "flex-start",
//                       padding: "12px 0",
//                       borderBottom: "1px solid #F3F4F6",
//                     }}>
//                       <span style={{
//                         fontSize: "14px",
//                         color: "#6B7280",
//                         fontWeight: "600",
//                         flex: "0 0 120px",
//                       }}>Card Number</span>
//                       <span style={{
//                         fontSize: "14px",
//                         color: "#111827",
//                         fontWeight: "600",
//                         textAlign: "right",
//                         flex: 1,
//                         fontFamily: "'Roboto Mono', monospace",
//                       }}>****{selectedRequest.cardNumber?.toString().slice(-4)}</span>
//                     </div>
//                   )}
                  
//                   {/* Service-specific fields */}
//                   {selectedRequest.type === "CHEQUE_LEAVES" && selectedRequest.fullDetails?.noOfLeaves && (
//                     <div style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "flex-start",
//                       padding: "12px 0",
//                       borderBottom: "1px solid #F3F4F6",
//                     }}><span style={{
//                         fontSize: "14px",
//                         color: "#6B7280",
//                         fontWeight: "600",
//                         flex: "0 0 120px",
//                       }}>Number of Leaves</span>
//                       <span style={{
//                         fontSize: "14px",
//                         color: "#111827",
//                         fontWeight: "600",
//                         textAlign: "right",
//                         flex: 1,
//                       }}>{selectedRequest.fullDetails.noOfLeaves}</span>
//                     </div>
//                   )}
                  
//                   {selectedRequest.type === "CREDIT_LIMIT" && (
//                     <>
//                       {selectedRequest.fullDetails?.currentLimit && (
//                         <div style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           alignItems: "flex-start",
//                           padding: "12px 0",
//                           borderBottom: "1px solid #F3F4F6",
//                         }}>
//                           <span style={{
//                             fontSize: "14px",
//                             color: "#6B7280",
//                             fontWeight: "600",
//                             flex: "0 0 120px",
//                           }}>Current Limit</span>
//                           <span style={{
//                             fontSize: "14px",
//                             color: "#111827",
//                             fontWeight: "600",
//                             textAlign: "right",
//                             flex: 1,
//                           }}>₹{selectedRequest.fullDetails.currentLimit?.toLocaleString()}</span>
//                         </div>
//                       )}
//                       {selectedRequest.fullDetails?.requestedLimit && (
//                         <div style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           alignItems: "flex-start",
//                           padding: "12px 0",
//                           borderBottom: "1px solid #F3F4F6",
//                         }}>
//                           <span style={{
//                             fontSize: "14px",
//                             color: "#6B7280",
//                             fontWeight: "600",
//                             flex: "0 0 120px",
//                           }}>Requested Limit</span>
//                           <span style={{
//                             fontSize: "14px",
//                             color: "#111827",
//                             fontWeight: "600",
//                             textAlign: "right",
//                             flex: 1,
//                           }}>₹{selectedRequest.fullDetails.requestedLimit?.toLocaleString()}</span>
//                         </div>
//                       )}
//                       {selectedRequest.fullDetails?.fullName && (
//                         <div style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           alignItems: "flex-start",
//                           padding: "12px 0",
//                           borderBottom: "1px solid #F3F4F6",
//                         }}>
//                           <span style={{
//                             fontSize: "14px",
//                             color: "#6B7280",
//                             fontWeight: "600",
//                             flex: "0 0 120px",
//                           }}>Customer Name</span>
//                           <span style={{
//                             fontSize: "14px",
//                             color: "#111827",
//                             fontWeight: "600",
//                             textAlign: "right",
//                             flex: 1,
//                           }}>{selectedRequest.fullDetails.fullName}</span>
//                         </div>
//                       )}
//                       {selectedRequest.fullDetails?.mobileNumber && (
//                         <div style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           alignItems: "flex-start",
//                           padding: "12px 0",
//                           borderBottom: "1px solid #F3F4F6",
//                         }}>
//                           <span style={{
//                             fontSize: "14px",
//                             color: "#6B7280",
//                             fontWeight: "600",
//                             flex: "0 0 120px",
//                           }}>Mobile Number</span>
//                           <span style={{
//                             fontSize: "14px",
//                             color: "#111827",
//                             fontWeight: "600",
//                             textAlign: "right",
//                             flex: 1,
//                           }}>{selectedRequest.fullDetails.mobileNumber}</span>
//                         </div>
//                       )}
//                     </>
//                   )}
                  
//                   {selectedRequest.type === "LOST_CARD" && (
//                     <>
//                       {selectedRequest.fullDetails?.lostCardNumber && (
//                         <div style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           alignItems: "flex-start",
//                           padding: "12px 0",
//                           borderBottom: "1px solid #F3F4F6",
//                         }}>
//                           <span style={{
//                             fontSize: "14px",
//                             color: "#6B7280",
//                             fontWeight: "600",
//                             flex: "0 0 120px",
//                           }}>Lost Card Number</span>
//                           <span style={{
//                             fontSize: "14px",
//                             color: "#111827",
//                             fontWeight: "600",
//                             textAlign: "right",
//                             flex: 1,
//                             fontFamily: "'Roboto Mono', monospace",
//                           }}>****{selectedRequest.fullDetails.lostCardNumber?.toString().slice(-4)}</span>
//                         </div>
//                       )}
//                       {selectedRequest.fullDetails?.lostCardStolenDate && (
//                         <div style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           alignItems: "flex-start",
//                           padding: "12px 0",
//                           borderBottom: "1px solid #F3F4F6",
//                         }}>
//                           <span style={{
//                             fontSize: "14px",
//                             color: "#6B7280",
//                             fontWeight: "600",
//                             flex: "0 0 120px",
//                           }}>Lost/Stolen Date</span>
//                           <span style={{
//                             fontSize: "14px",
//                             color: "#111827",
//                             fontWeight: "600",
//                             textAlign: "right",
//                             flex: 1,
//                           }}>{formatDate(selectedRequest.fullDetails.lostCardStolenDate)}</span>
//                         </div>
//                       )}
//                       {selectedRequest.fullDetails?.fullName && (
//                         <div style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           alignItems: "flex-start",
//                           padding: "12px 0",
//                           borderBottom: "1px solid #F3F4F6",
//                         }}>
//                           <span style={{
//                             fontSize: "14px",
//                             color: "#6B7280",
//                             fontWeight: "600",
//                             flex: "0 0 120px",
//                           }}>Customer Name</span>
//                           <span style={{
//                             fontSize: "14px",
//                             color: "#111827",
//                             fontWeight: "600",
//                             textAlign: "right",
//                             flex: 1,
//                           }}>{selectedRequest.fullDetails.fullName}</span>
//                         </div>
//                       )}
//                     </>
//                   )}
                  
//                   {selectedRequest.type === "GENERAL_QUERY" && selectedRequest.fullDetails?.customerQuery && (
//                     <div style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "flex-start",
//                       padding: "12px 0",
//                       borderBottom: "1px solid #F3F4F6",
//                     }}>
//                       <span style={{
//                         fontSize: "14px",
//                         color: "#6B7280",
//                         fontWeight: "600",
//                         flex: "0 0 120px",
//                       }}>Query</span>
//                       <span style={{
//                         fontSize: "14px",
//                         color: "#111827",
//                         fontWeight: "600",
//                         textAlign: "right",
//                         flex: 1,
//                         wordBreak: "break-word",
//                       }}>{selectedRequest.fullDetails.customerQuery}</span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Right Column - Additional Information */}
//                 <div style={{
//                   backgroundColor: "#F9FAFB",
//                   borderRadius: "16px",
//                   padding: "24px",
//                   border: "1px solid #E5E7EB",
//                   boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
//                 }}>
//                   <h3 style={{
//                     fontSize: "18px",
//                     fontWeight: "700",
//                     color: "#111827",
//                     margin: "0 0 16px 0",
//                     paddingBottom: "12px",
//                     borderBottom: "1px solid #E5E7EB",
//                   }}>Additional Information</h3>
                  
//                   <div style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "flex-start",
//                     padding: "12px 0",
//                     borderBottom: "1px solid #F3F4F6",
//                   }}>
//                     <span style={{
//                       fontSize: "14px",
//                       color: "#6B7280",
//                       fontWeight: "600",
//                       flex: "0 0 120px",
//                     }}>Approved Date</span>
//                     <span style={{
//                       fontSize: "14px",
//                       color: "#111827",
//                       fontWeight: "600",
//                       textAlign: "right",
//                       flex: 1,
//                     }}>{formatDate(selectedRequest.approvedDate)}</span>
//                   </div>
                  
//                   <div style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "flex-start",
//                     padding: "12px 0",
//                     borderBottom: "1px solid #F3F4F6",
//                   }}>
//                     <span style={{
//                       fontSize: "14px",
//                       color: "#6B7280",
//                       fontWeight: "600",
//                       flex: "0 0 120px",
//                     }}>Remarks</span>
//                     <span style={{
//                       fontSize: "14px",
//                       color: "#111827",
//                       fontWeight: "600",
//                       textAlign: "right",
//                       flex: 1,
//                       wordBreak: "break-word",
//                     }}>{selectedRequest.remarks || "-"}</span>
//                   </div>
                  
//                   {selectedRequest.rejectReason && selectedRequest.rejectReason !== "-" && (
//                     <div style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "flex-start",
//                       padding: "12px 0",
//                       borderBottom: "1px solid #F3F4F6",
//                     }}>
//                       <span style={{
//                         fontSize: "14px",
//                         color: "#6B7280",
//                         fontWeight: "600",
//                         flex: "0 0 120px",
//                       }}>Reject Reason</span>
//                       <span style={{
//                         fontSize: "14px",
//                         color: "#EF4444",
//                         fontWeight: "600",
//                         textAlign: "right",
//                         flex: 1,
//                         wordBreak: "break-word",
//                       }}>{selectedRequest.rejectReason}</span>
//                     </div>
//                   )}
                  
//                   {selectedRequest.type === "GENERAL_QUERY" && selectedRequest.fullDetails?.queryResponse && (
//                     <div style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "flex-start",
//                       padding: "12px 0",
//                       borderBottom: "1px solid #F3F4F6",
//                     }}>
//                       <span style={{
//                         fontSize: "14px",
//                         color: "#6B7280",
//                         fontWeight: "600",
//                         flex: "0 0 120px",
//                       }}>Response</span>
//                       <span style={{
//                         fontSize: "14px",
//                         color: "#111827",
//                         fontWeight: "600",
//                         textAlign: "right",
//                         flex: 1,
//                         wordBreak: "break-word",
//                       }}>{selectedRequest.fullDetails.queryResponse}</span>
//                     </div>
//                   )}
                  
//                   {/* Show contact details for credit limit and lost card */}
//                   {(selectedRequest.type === "CREDIT_LIMIT" || selectedRequest.type === "LOST_CARD") && (
//                     <>
//                       {selectedRequest.fullDetails?.email && (
//                         <div style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           alignItems: "flex-start",
//                           padding: "12px 0",
//                           borderBottom: "1px solid #F3F4F6",
//                         }}>
//                           <span style={{
//                             fontSize: "14px",
//                             color: "#6B7280",
//                             fontWeight: "600",
//                             flex: "0 0 120px",
//                           }}>Email</span>
//                           <span style={{
//                             fontSize: "14px",
//                             color: "#111827",
//                             fontWeight: "600",
//                             textAlign: "right",
//                             flex: 1,
//                             wordBreak: "break-word",
//                           }}>{selectedRequest.fullDetails.email}</span>
//                         </div>
//                       )}
//                       {selectedRequest.fullDetails?.city && (
//                         <div style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           alignItems: "flex-start",
//                           padding: "12px 0",
//                           borderBottom: "1px solid #F3F4F6",
//                         }}>
//                           <span style={{
//                             fontSize: "14px",
//                             color: "#6B7280",
//                             fontWeight: "600",
//                             flex: "0 0 120px",
//                           }}>City</span>
//                           <span style={{
//                             fontSize: "14px",
//                             color: "#111827",
//                             fontWeight: "600",
//                             textAlign: "right",
//                             flex: 1,
//                           }}>{selectedRequest.fullDetails.city}</span>
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Modal Footer */}
//             <div style={{
//               display: "flex",
//               justifyContent: "flex-end",
//               paddingTop: "24px",
//               borderTop: "1px solid #E5E7EB",
//             }}>
//               <button 
//                 onClick={closeModal}
//                 style={{
//                   padding: "12px 32px",
//                   backgroundColor: "#1E3A8A",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "12px",
//                   fontSize: "14px",
//                   fontWeight: "600",
//                   cursor: "pointer",
//                   transition: "all 0.3s ease",
//                   boxShadow: "0 4px 12px rgba(30, 58, 138, 0.3)",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.backgroundColor = "#2563EB";
//                   e.target.style.transform = "translateY(-2px)";
//                   e.target.style.boxShadow = "0 8px 20px rgba(30, 58, 138, 0.4)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.backgroundColor = "#1E3A8A";
//                   e.target.style.transform = "translateY(0)";
//                   e.target.style.boxShadow = "0 4px 12px rgba(30, 58, 138, 0.3)";
//                 }}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Bank Logo Bar */}
//       <div style={{
//         display: "flex",
//         alignItems: "center",
//         gap: "8px",
//         marginBottom: "24px",
//         padding: "12px 20px",
//         background: "white",
//         borderRadius: "12px",
//         border: "1px solid #E5E7EB",
//         boxShadow: "0 2px 4px rgba(0, 0, 0, 0.02)",
//         maxWidth: "fit-content",
//         animation: "fadeIn 0.4s ease"
//       }}>
//         <div style={{
//           display: "flex",
//           alignItems: "center",
//           background: "#EFF6FF",
//           padding: "8px",
//           borderRadius: "8px"
//         }}>
//           <FaRegBuilding size={16} color="#1E3A8A" />
//         </div>
//         <span style={{
//           fontSize: "18px",
//           fontWeight: "700",
//           color: "#1E3A8A",
//           letterSpacing: "0.5px"
//         }}>ABC BANK</span>
//       </div>

//       {/* Header with Filters */}
//       <div style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: "24px",
//         flexWrap: "wrap",
//         gap: "16px",
//       }}>
//         <div style={{ flex: 1 }}>
//           <h1 style={{
//             fontSize: "28px",
//             fontWeight: "700",
//             color: "#1E3A8A",
//             margin: 0,
//             letterSpacing: "-0.02em",
//           }}>My Requests</h1>
//           <p style={{
//             fontSize: "15px",
//             color: "#6B7280",
//             margin: "4px 0 0 0",
//             fontWeight: "400",
//           }}>Track and manage your service requests</p>
//         </div>
        
//         {/* Filter Section */}
//         <div style={{
//           display: "flex",
//           gap: "16px",
//           alignItems: "center",
//           flexWrap: "wrap",
//         }}>
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
//               <FaChevronDown className={`dropdown-arrow ${isAccountDropdownOpen ? 'open' : ''}`} />
//             </div>

//             {isAccountDropdownOpen && (
//               <div className="account-dropdown-menu">
//                 {loadingAccounts ? (
//                   <div style={{
//                     padding: "24px",
//                     textAlign: "center",
//                     color: "#6B7280",
//                   }}>
//                     <div style={{
//                       width: "20px",
//                       height: "20px",
//                       border: "2px solid #E5E7EB",
//                       borderTopColor: "#1E3A8A",
//                       borderRadius: "50%",
//                       animation: "spin 1s linear infinite",
//                       margin: "0 auto 10px",
//                     }}></div>
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
//                   <div style={{
//                     padding: "24px",
//                     textAlign: "center",
//                     color: "#6B7280",
//                   }}>
//                     <p>No accounts found</p>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Request Type Filter */}
//           <div style={{
//             display: "flex",
//             gap: "8px",
//             alignItems: "center",
//           }}>
//             <select
//               value={selectedRequestType}
//               onChange={(e) => setSelectedRequestType(e.target.value)}
//               className="request-type-select"
//               disabled={!selectedAccount}
//             >
//               <option value="ALL">All Requests</option>
//               <option value="CHEQUE_LEAVES">Cheque Leaves</option>
//               <option value="CREDIT_LIMIT">Credit Limit</option>
//               <option value="LOST_CARD">Lost Card</option>
//               <option value="GENERAL_QUERY">General Query</option>
//             </select>

//             {selectedRequestType !== "ALL" && (
//               <button 
//                 onClick={clearFilter} 
//                 style={{
//                   width: "44px",
//                   height: "44px",
//                   backgroundColor: "#EF4444",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "12px",
//                   fontSize: "18px",
//                   fontWeight: "600",
//                   cursor: "pointer",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   transition: "all 0.3s",
//                   boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
//                 }}
//                 className="clear-button"
//                 title="Clear Filter"
//                 onMouseEnter={(e) => {
//                   e.target.style.backgroundColor = "#DC2626";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.backgroundColor = "#EF4444";
//                 }}
//               >
//                 <FaTimes />
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* No Account Selected */}
//       {!selectedAccount && (
//         <div style={{
//           textAlign: "center",
//           padding: "80px 40px",
//           backgroundColor: "white",
//           borderRadius: "24px",
//           boxShadow: "0 10px 25px -5px rgba(30, 58, 138, 0.1)",
//           border: "1px solid #E5E7EB",
//           maxWidth: "500px",
//           margin: "40px auto",
//         }}>
//           <div style={{ fontSize: "64px", marginBottom: "24px", opacity: 0.7 }}>🏦</div>
//           <h3 style={{
//             fontSize: "24px",
//             fontWeight: "600",
//             color: "#111827",
//             margin: "0 0 8px 0",
//           }}>Select an Account</h3>
//           <p style={{
//             fontSize: "14px",
//             color: "#6B7280",
//             marginBottom: "20px",
//           }}>Please select an account to view your requests</p>
//         </div>
//       )}

//       {/* Requests Table */}
//       {selectedAccount && filteredRequests.length > 0 && (
//         <>
//           {/* Request Count and Pagination Info */}
//           <div id="requests-table-container" style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "16px",
//             padding: "12px 0",
//           }}>
//             <div style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "16px",
//             }}>
//               <span style={{
//                 fontSize: "16px",
//                 fontWeight: "600",
//                 color: "#111827",
//               }}>{filteredRequests.length} Total Requests</span>
//             </div>
//           </div>

//           {/* Table Container */}
//           <div style={{
//             backgroundColor: "white",
//             borderRadius: "20px",
//             border: "1px solid #E5E7EB",
//             overflow: "auto",
//             maxHeight: "600px",
//             boxShadow: "0 10px 15px -3px rgba(30, 58, 138, 0.1)",
//             marginBottom: "24px",
//           }}>
//             <table style={{
//               width: "100%",
//               borderCollapse: "collapse",
//               minWidth: "600px",
//             }}>
//               <thead>
//                 <tr>
//                   <th style={{
//                     textAlign: "left",
//                     padding: "16px 20px",
//                     borderBottom: "2px solid #E5E7EB",
//                     color: "#111827",
//                     fontSize: "14px",
//                     fontWeight: "700",
//                     textTransform: "uppercase",
//                     letterSpacing: "0.5px",
//                     backgroundColor: "#F9FAFB",
//                     position: "sticky",
//                     top: 0,
//                     zIndex: 10,
//                   }}>Request Type</th>
//                   <th style={{
//                     textAlign: "left",
//                     padding: "16px 20px",
//                     borderBottom: "2px solid #E5E7EB",
//                     color: "#111827",
//                     fontSize: "14px",
//                     fontWeight: "700",
//                     textTransform: "uppercase",
//                     letterSpacing: "0.5px",
//                     backgroundColor: "#F9FAFB",
//                     position: "sticky",
//                     top: 0,
//                     zIndex: 10,
//                   }}>Requested Date</th>
//                   <th style={{
//                     textAlign: "left",
//                     padding: "16px 20px",
//                     borderBottom: "2px solid #E5E7EB",
//                     color: "#111827",
//                     fontSize: "14px",
//                     fontWeight: "700",
//                     textTransform: "uppercase",
//                     letterSpacing: "0.5px",
//                     backgroundColor: "#F9FAFB",
//                     position: "sticky",
//                     top: 0,
//                     zIndex: 10,
//                   }}>Status</th>
//                   <th style={{
//                     textAlign: "left",
//                     padding: "16px 20px",
//                     borderBottom: "2px solid #E5E7EB",
//                     color: "#111827",
//                     fontSize: "14px",
//                     fontWeight: "700",
//                     textTransform: "uppercase",
//                     letterSpacing: "0.5px",
//                     backgroundColor: "#F9FAFB",
//                     position: "sticky",
//                     top: 0,
//                     zIndex: 10,
//                   }}>View</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentItems.map((item, index) => (
//                   <tr key={item.id} style={{
//                     borderBottom: "1px solid #E5E7EB",
//                     transition: "all 0.3s ease",
//                     backgroundColor: index % 2 === 0 ? 'white' : '#F9FAFB',
//                   }} className="request-row">
//                     <td style={{
//                       padding: "16px 20px",
//                       fontSize: "14px",
//                       color: "#111827",
//                       verticalAlign: "middle",
//                     }}>
//                       <span style={{
//                         padding: "6px 14px",
//                         borderRadius: "30px",
//                         fontSize: "13px",
//                         fontWeight: "600",
//                         border: "1px solid",
//                         display: "inline-block",
//                         whiteSpace: "nowrap",
//                         backgroundColor: `${getTypeColor(item.type)}20`,
//                         color: getTypeColor(item.type),
//                         borderColor: getTypeColor(item.type),
//                       }} className="type-badge">
//                         {item.typeLabel}
//                       </span>
//                     </td>
//                     <td style={{
//                       padding: "16px 20px",
//                       fontSize: "14px",
//                       color: "#111827",
//                       verticalAlign: "middle",
//                     }}>
//                       <span style={{
//                         fontFamily: "'Roboto Mono', monospace",
//                         fontSize: "13px",
//                         color: "#111827",
//                         fontWeight: "600",
//                         whiteSpace: "nowrap",
//                       }}>
//                         {formatDate(item.requestDate)}
//                       </span>
//                     </td>
//                     <td style={{
//                       padding: "16px 20px",
//                       fontSize: "14px",
//                       color: "#111827",
//                       verticalAlign: "middle",
//                     }}>
//                       <span style={{
//                         padding: "6px 14px",
//                         borderRadius: "30px",
//                         fontSize: "12px",
//                         fontWeight: "600",
//                         textTransform: "uppercase",
//                         display: "inline-block",
//                         whiteSpace: "nowrap",
//                         ...getStatusStyle(item.status)
//                       }} className="status-badge">
//                         {item.status}
//                       </span>
//                     </td>
//                     <td style={{
//                       padding: "16px 20px",
//                       fontSize: "14px",
//                       color: "#111827",
//                       verticalAlign: "middle",
//                     }}>
//                       <button 
//                         style={{
//                           padding: "8px 20px",
//                           backgroundColor: "#1E3A8A",
//                           color: "white",
//                           border: "none",
//                           borderRadius: "30px",
//                           fontSize: "13px",
//                           fontWeight: "600",
//                           cursor: "pointer",
//                           transition: "all 0.3s",
//                           boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
//                           minWidth: "100px",
//                         }}
//                         onClick={() => openRequestDetails(item)}
//                         className="view-button"
//                         onMouseEnter={(e) => {
//                           e.target.style.backgroundColor = "#2563EB";
//                         }}
//                         onMouseLeave={(e) => {
//                           e.target.style.backgroundColor = "#1E3A8A";
//                         }}
//                       >
//                         <FaEye style={{ marginRight: "6px" }} /> View
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div style={{
//               marginTop: "24px",
//               marginBottom: "24px",
//             }}>
//               <div style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 gap: "8px",
//                 flexWrap: "wrap",
//               }}>
//                 <button
//                   onClick={() => paginate(1)}
//                   disabled={currentPage === 1}
//                   style={{
//                     padding: "10px 18px",
//                     backgroundColor: "white",
//                     border: "1px solid #E5E7EB",
//                     borderRadius: "12px",
//                     color: "#111827",
//                     fontSize: "14px",
//                     fontWeight: "500",
//                     cursor: "pointer",
//                     transition: "all 0.3s",
//                   }}
//                   className="pagination-button"
//                 >
//                   « First
//                 </button>
//                 <button
//                   onClick={() => paginate(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   style={{
//                     padding: "10px 18px",
//                     backgroundColor: "white",
//                     border: "1px solid #E5E7EB",
//                     borderRadius: "12px",
//                     color: "#111827",
//                     fontSize: "14px",
//                     fontWeight: "500",
//                     cursor: "pointer",
//                     transition: "all 0.3s",
//                   }}
//                   className="pagination-button"
//                 >
//                   ← Prev
//                 </button>
                
//                 <div style={{
//                   display: "flex",
//                   gap: "4px",
//                 }}>
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
//                           width: "44px",
//                           height: "44px",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           backgroundColor: "white",
//                           border: "1px solid #E5E7EB",
//                           borderRadius: "12px",
//                           color: "#111827",
//                           fontSize: "14px",
//                           fontWeight: "500",
//                           cursor: "pointer",
//                           transition: "all 0.3s",
//                           ...(currentPage === pageNum ? {
//                             backgroundColor: "#1E3A8A",
//                             color: "white",
//                             borderColor: "#1E3A8A",
//                           } : {})
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
//                   style={{
//                     padding: "10px 18px",
//                     backgroundColor: "white",
//                     border: "1px solid #E5E7EB",
//                     borderRadius: "12px",
//                     color: "#111827",
//                     fontSize: "14px",
//                     fontWeight: "500",
//                     cursor: "pointer",
//                     transition: "all 0.3s",
//                   }}
//                   className="pagination-button"
//                 >
//                   Next →
//                 </button>
//                 <button
//                   onClick={() => paginate(totalPages)}
//                   disabled={currentPage === totalPages}
//                   style={{
//                     padding: "10px 18px",
//                     backgroundColor: "white",
//                     border: "1px solid #E5E7EB",
//                     borderRadius: "12px",
//                     color: "#111827",
//                     fontSize: "14px",
//                     fontWeight: "500",
//                     cursor: "pointer",
//                     transition: "all 0.3s",
//                   }}
//                   className="pagination-button"
//                 >
//                   Last »
//                 </button>
//               </div>

//               <div style={{
//                 textAlign: "center",
//                 fontSize: "13px",
//                 color: "#6B7280",
//                 marginTop: "16px",
//               }}>
//                 Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredRequests.length)} of {filteredRequests.length} requests
//               </div>
//             </div>
//           )}
//         </>
//       )}

//       {/* Empty State - No Results */}
//       {selectedAccount && filteredRequests.length === 0 && (
//         <div style={{
//           textAlign: "center",
//           padding: "80px 40px",
//           backgroundColor: "white",
//           borderRadius: "24px",
//           boxShadow: "0 10px 25px -5px rgba(30, 58, 138, 0.1)",
//           border: "1px solid #E5E7EB",
//           maxWidth: "600px",
//           margin: "40px auto",
//         }}>
//           <div style={{ fontSize: "64px", marginBottom: "24px", opacity: 0.7 }}>📋</div>
//           <h3 style={{
//             fontSize: "24px",
//             fontWeight: "600",
//             color: "#111827",
//             margin: "0 0 8px 0",
//           }}>No Requests Found</h3>
//           <p style={{
//             fontSize: "14px",
//             color: "#6B7280",
//             marginBottom: "24px",
//           }}>
//             {requests.length === 0 
//               ? "You haven't submitted any requests yet." 
//               : `No ${selectedRequestType !== "ALL" ? getRequestTypeLabel(selectedRequestType) : ""} requests found.`}
//           </p>
//           {selectedRequestType !== "ALL" && requests.length > 0 && (
//             <button 
//               onClick={clearFilter}
//               style={{
//                 padding: "14px 36px",
//                 backgroundColor: "#1E3A8A",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "30px",
//                 fontSize: "14px",
//                 fontWeight: "600",
//                 cursor: "pointer",
//                 transition: "all 0.3s",
//                 boxShadow: "0 4px 12px rgba(30, 58, 138, 0.3)",
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style.backgroundColor = "#2563EB";
//                 e.target.style.transform = "translateY(-2px)";
//                 e.target.style.boxShadow = "0 8px 20px rgba(30, 58, 138, 0.4)";
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.backgroundColor = "#1E3A8A";
//                 e.target.style.transform = "translateY(0)";
//                 e.target.style.boxShadow = "0 4px 12px rgba(30, 58, 138, 0.3)";
//               }}
//             >
//               View All Requests
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
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

  const accountDropdownRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedAccountDetails, setSelectedAccountDetails] = useState(null);
  const [selectedRequestType, setSelectedRequestType] = useState("ALL");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // ── Canara Bank Official Colour Palette ──────────────────────────────────
  const CB       = "#003087";   // deep navy blue
  const CB_LIGHT = "#0044B4";   // mid blue
  const CB_DARK  = "#001F5B";   // darkest navy
  const CG       = "#F5A800";   // golden yellow
  const CG_DARK  = "#D48F00";   // dark gold
  const CG_LIGHT = "#FFF3CC";   // pale gold
  const PAGE_BG  = "#F0F4FF";
  const BORDER   = "#C9D6F0";
  const TEXT     = "#0D1F4C";
  const TEXT_LT  = "#5A6F99";
  const SUCCESS  = "#0D8A4E";
  const SUC_LT   = "#D4F4E7";
  const DANGER   = "#C0392B";
  const DAN_LT   = "#FDECEA";
  const WARN     = "#D48F00";
  const WARN_LT  = "#FFF3CC";
  // ────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const id = localStorage.getItem("customerId") || localStorage.getItem("userId") || "2";
    setCustomerId(id);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target)) {
        setIsAccountDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Global Styles ────────────────────────────────────────────────────────
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.id = "canara-req-styles";
    styleSheet.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');

      :root {
        --cb:       #003087;
        --cb-light: #0044B4;
        --cb-dark:  #001F5B;
        --cg:       #F5A800;
        --cg-dark:  #D48F00;
        --cg-light: #FFF3CC;
        --page-bg:  #F0F4FF;
        --border:   #C9D6F0;
        --text:     #0D1F4C;
        --text-lt:  #5A6F99;
        --success:  #0D8A4E;
        --suc-lt:   #D4F4E7;
        --danger:   #C0392B;
        --dan-lt:   #FDECEA;
        --warn:     #D48F00;
        --warn-lt:  #FFF3CC;
      }

      /* ── Keyframes ── */
      @keyframes shimmer {
        0%   { background-position: -800px 0; }
        100% { background-position:  800px 0; }
      }
      @keyframes fadeSlideUp {
        from { opacity: 0; transform: translateY(14px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes spinRing {
        to { transform: rotate(360deg); }
      }
      @keyframes pulseDot {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.25; }
      }
      @keyframes floatY {
        0%, 100% { transform: translateY(0); }
        50%       { transform: translateY(-7px); }
      }
      @keyframes rowIn {
        from { opacity: 0; transform: translateX(-8px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes badgePop {
        0%   { transform: scale(0.8); opacity: 0; }
        60%  { transform: scale(1.06); }
        100% { transform: scale(1);   opacity: 1; }
      }
      @keyframes barPulse {
        0%, 100% { transform: scaleY(0.6); }
        50%       { transform: scaleY(1.2); }
      }
      @keyframes progressSlide {
        0%   { transform: translateX(-100%); }
        100% { transform: translateX(250%); }
      }

      /* ── Skeleton bar ── */
      .skel {
        border-radius: 6px;
        background: linear-gradient(90deg, #dce6f8 25%, #bfd0ee 50%, #dce6f8 75%);
        background-size: 800px 100%;
        animation: shimmer 1.6s infinite linear;
      }

      /* ── Account Dropdown ── */
      .account-dropdown-container {
        position: relative;
        width: 270px;
        animation: fadeSlideUp 0.4s ease;
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
        transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        font-family: 'DM Sans', sans-serif;
      }
      .account-dropdown-button:hover {
        border-color: var(--cg);
        transform: translateY(-2px);
        box-shadow: 0 4px 14px rgba(245,168,0,0.18);
      }
      .account-dropdown-button.active {
        border-color: var(--cg);
        box-shadow: 0 0 0 4px var(--cg-light);
      }
      .selected-account-preview { display: flex; align-items: center; gap: 12px; }
      .account-avatar {
        width: 40px; height: 40px;
        border-radius: 10px;
        background: var(--cg-light);
        display: flex; align-items: center; justify-content: center;
        font-size: 20px;
        transition: all 0.3s;
      }
      .account-dropdown-button:hover .account-avatar {
        transform: scale(1.1) rotate(-4deg);
        background: var(--cb);
      }
      .account-info { display: flex; flex-direction: column; gap: 2px; }
      .account-type { font-size: 14px; font-weight: 600; color: var(--text); }
      .account-number-preview { display: flex; align-items: center; gap: 8px; }
      .account-masked {
        font-size: 12px; color: var(--cb);
        font-family: 'JetBrains Mono', monospace;
        background: var(--cg-light);
        padding: 2px 8px; border-radius: 12px;
        font-weight: 600;
      }
      .dropdown-arrow { color: var(--text-lt); transition: transform 0.3s, color 0.3s; }
      .dropdown-arrow.open { transform: rotate(180deg); color: var(--cg); }

      .account-dropdown-menu {
        position: absolute;
        top: calc(100% + 8px);
        left: 0; right: 0;
        background: white;
        border: 1.5px solid var(--border);
        border-radius: 12px;
        box-shadow: 0 12px 32px rgba(0,48,135,0.13);
        max-height: 350px; overflow-y: auto;
        z-index: 1000;
        animation: fadeSlideUp 0.25s ease;
      }
      .account-dropdown-menu::-webkit-scrollbar { width: 5px; }
      .account-dropdown-menu::-webkit-scrollbar-track { background: var(--page-bg); }
      .account-dropdown-menu::-webkit-scrollbar-thumb { background: var(--cg); border-radius: 20px; }

      .account-dropdown-item {
        padding: 12px 16px; cursor: pointer;
        display: flex; align-items: center; gap: 12px;
        border-bottom: 1px solid var(--border);
        transition: background 0.2s;
      }
      .account-dropdown-item:last-child { border-bottom: none; }
      .account-dropdown-item:hover { background: var(--cg-light); }
      .account-dropdown-item.selected { background: #EBF0FF; border-left: 4px solid var(--cb); }

      .account-item-avatar {
        width: 36px; height: 36px; border-radius: 8px;
        background: var(--page-bg);
        display: flex; align-items: center; justify-content: center;
        font-size: 18px;
      }
      .account-item-details { flex: 1; display: flex; flex-direction: column; gap: 4px; }
      .account-item-type { font-size: 14px; font-weight: 600; color: var(--text); }
      .account-item-masked {
        font-size: 12px; color: var(--cb);
        font-family: 'JetBrains Mono', monospace;
        background: var(--cg-light);
        padding: 2px 8px; border-radius: 12px;
        font-weight: 600; width: fit-content;
      }

      /* ── Request type select ── */
      .request-type-select {
        padding: 12px 40px 12px 16px;
        background: white;
        border: 2px solid var(--border);
        border-radius: 12px;
        font-size: 14px; font-weight: 600;
        color: var(--text);
        cursor: pointer; outline: none; width: 200px;
        appearance: none;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23003087'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right 12px center;
        background-size: 16px;
        transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        font-family: 'DM Sans', sans-serif;
      }
      .request-type-select:hover {
        border-color: var(--cg);
        transform: translateY(-2px);
        box-shadow: 0 4px 14px rgba(245,168,0,0.15);
      }
      .request-type-select:focus {
        border-color: var(--cb);
        box-shadow: 0 0 0 4px var(--cg-light);
      }

      /* ── Table rows ── */
      .request-row {
        animation: rowIn 0.35s ease both;
        transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
      }
      .request-row:hover {
        background: #EBF0FF !important;
        transform: translateX(5px);
        box-shadow: inset 4px 0 0 var(--cg);
      }

      /* ── Pagination ── */
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
        background: linear-gradient(135deg, var(--cb), var(--cb-light));
        color: white;
        border-color: var(--cb);
        box-shadow: 0 4px 12px rgba(0,48,135,0.25);
      }
      .pagination-button:disabled { opacity: 0.4; cursor: not-allowed; }

      /* ── Badges ── */
      .status-badge {
        transition: transform 0.2s, box-shadow 0.2s;
        padding: 5px 13px; border-radius: 30px;
        font-size: 12px; font-weight: 700;
        display: inline-block;
        text-transform: uppercase;
        animation: badgePop 0.4s ease both;
      }
      .status-badge:hover { transform: translateY(-2px); box-shadow: 0 3px 8px rgba(0,0,0,0.12); }
      .status-badge.approved { background: var(--suc-lt); color: var(--success); border: 1.5px solid var(--success); }
      .status-badge.rejected { background: var(--dan-lt); color: var(--danger); border: 1.5px solid var(--danger); }
      .status-badge.pending  { background: var(--warn-lt); color: var(--warn);   border: 1.5px solid var(--warn); }

      .type-badge {
        transition: transform 0.2s, box-shadow 0.2s;
        padding: 5px 13px; border-radius: 30px;
        font-size: 12px; font-weight: 700;
        display: inline-block;
        animation: badgePop 0.4s ease both;
      }
      .type-badge:hover { transform: translateY(-2px); box-shadow: 0 3px 8px rgba(0,0,0,0.12); }

      /* ── View button ── */
      .view-button { transition: all 0.25s ease; }
      .view-button:hover {
        background: var(--cb-light) !important;
        transform: translateY(-2px) scale(1.04);
        box-shadow: 0 4px 14px rgba(0,48,135,0.3) !important;
      }

      /* ── Clear button ── */
      .clear-button { transition: all 0.3s ease; }
      .clear-button:hover { transform: rotate(90deg) scale(1.1); background-color: var(--danger) !important; }

      /* ── Modal ── */
      .modal-content { animation: fadeSlideUp 0.3s ease; }

      /* ── Logo float ── */
      .logo-float { animation: floatY 3s ease-in-out infinite; }

      /* ── Loading bars ── */
      .load-bar {
        width: 8px; border-radius: 4px;
        background: var(--cb);
        transform-origin: bottom;
      }
      .load-bar-1 { animation: barPulse 0.9s ease-in-out 0.0s infinite; }
      .load-bar-2 { animation: barPulse 0.9s ease-in-out 0.1s infinite; }
      .load-bar-3 { animation: barPulse 0.9s ease-in-out 0.2s infinite; }
      .load-bar-4 { animation: barPulse 0.9s ease-in-out 0.3s infinite; }
      .load-bar-5 { animation: barPulse 0.9s ease-in-out 0.4s infinite; }

      /* ── Pulse dots ── */
      .dot-1 { animation: pulseDot 1.2s ease-in-out 0.0s infinite; }
      .dot-2 { animation: pulseDot 1.2s ease-in-out 0.2s infinite; }
      .dot-3 { animation: pulseDot 1.2s ease-in-out 0.4s infinite; }

      *:focus-visible { outline: 2px solid var(--cb); outline-offset: 2px; }

      @media (max-width: 768px) {
        .account-dropdown-container { width: 100%; }
        .request-type-select { width: 100%; }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => document.getElementById("canara-req-styles")?.remove();
  }, []);
  // ────────────────────────────────────────────────────────────────────────

  const getLast4Digits = (accountNumber) => {
    if (!accountNumber) return "";
    return accountNumber.toString().slice(-4);
  };

  const getAccountIcon = (type) => {
    if (type?.toLowerCase().includes('savings')) return '💰';
    if (type?.toLowerCase().includes('current')) return '💳';
    if (type?.toLowerCase().includes('salary'))  return '💼';
    return '🏦';
  };

  const fetchAccounts = async () => {
    if (!customerId) return;
    setLoadingAccounts(true);
    try {
      const response = await API.get(`/abcbank/api/account/userAccounts/${customerId}`);
      if (response.data?.status && Array.isArray(response.data.data)) {
        const fetchedAccounts = response.data.data.map(acc => ({
          number: acc.accountNumber.toString(),
          type: acc.accountTypeName,
          icon: getAccountIcon(acc.accountTypeName),
          last4: getLast4Digits(acc.accountNumber),
          displayLabel: `${acc.accountTypeName} - ${getLast4Digits(acc.accountNumber)}`,
          branchName: acc.branchName,
          status: acc.status
        }));
        const sortedAccounts = fetchedAccounts.sort((a, b) => {
          const order = { 'Savings Account': 1, 'Current Account': 2, 'Salary Account': 3 };
          return (order[a.type] || 99) - (order[b.type] || 99);
        });
        setAccounts(sortedAccounts);
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

  useEffect(() => { if (customerId) fetchAccounts(); }, [customerId]);

  useEffect(() => {
    if (selectedAccount && accounts.length > 0) {
      const details = accounts.find(acc => acc.number === selectedAccount);
      setSelectedAccountDetails(details);
    }
  }, [selectedAccount, accounts]);

  useEffect(() => { if (selectedAccount) fetchAllRequests(selectedAccount); }, [selectedAccount]);

  useEffect(() => { applyFilter(); setCurrentPage(1); }, [requests, selectedRequestType]);

  const fetchAllRequests = async (accountNumber) => {
    setLoading(true);
    setError(null);
    try {
      const payload = { accountNumber: Number(accountNumber) };
      let accountCards = [];
      try {
        const cardsResponse = await API.get(`/abcbank/api/account/userCardsByStatus/${accountNumber}`);
        if (cardsResponse.data?.status && Array.isArray(cardsResponse.data.data)) {
          accountCards = cardsResponse.data.data;
        }
      } catch (error) { console.log("Error fetching cards:", error); }

      const apiCalls = [
        API.post("/abcbank/api/chequeRequest/chequeRequestList", payload),
        API.post("/abcbank/api/creditLimit/creditLimitListByAccount", payload),
        API.post("/abcbank/api/lostCard/lostRequestList", payload),
        API.post("/abcbank/api/queriesResponse/queriesList", payload)
      ];

      if (accountCards.length > 0) {
        accountCards.forEach(card => {
          const cardNumber = card.cardNumber;
          if (cardNumber) {
            apiCalls.push(API.post("/abcbank/api/creditLimit/creditLimitListByCard", { cardNumber: Number(cardNumber) }));
            apiCalls.push(API.post("/abcbank/api/lostCard/lostRequestList", { cardNumber: Number(cardNumber) }));
          }
        });
      }

      const responses = await Promise.allSettled(apiCalls);

      const chequeRequests = responses[0]?.status === 'fulfilled' && responses[0].value.data?.status
        ? (responses[0].value.data.data || []).map(req => ({
            id: `chq-${req.chequeRequestId}`, type: "CHEQUE_LEAVES", typeLabel: "Cheque Leaves",
            description: `${req.noOfLeaves} leaves`, requestDate: req.requestedDate,
            status: req.status || "PENDING", approvedDate: req.approvedDate || "-",
            remarks: req.remarks || "-", rejectReason: req.rejectReason || "-",
            accountNumber: accountNumber,
            fullDetails: { requestType: "Cheque Leaves", description: `${req.noOfLeaves} leaves`, requestedDate: req.requestedDate, status: req.status || "PENDING", approvedDate: req.approvedDate || "-", remarks: req.remarks || "-", rejectReason: req.rejectReason || "-", accountNumber: accountNumber, noOfLeaves: req.noOfLeaves }
          })) : [];

      const creditRequestsByAccount = responses[1]?.status === 'fulfilled' && responses[1].value.data?.status
        ? (responses[1].value.data.data || []).map(req => ({
            id: `crd-acc-${req.increaseCreditLimitId}`, type: "CREDIT_LIMIT", typeLabel: "Credit Limit",
            description: `₹${req.requestedLimit?.toLocaleString()}`, requestDate: req.requestDate,
            status: req.status || "PENDING", approvedDate: req.approvedDate || "-",
            remarks: req.remarks || "-", rejectReason: req.rejectReason || "-",
            accountNumber: accountNumber, cardNumber: req.cardNumber,
            fullDetails: { requestType: "Credit Limit", description: `₹${req.requestedLimit?.toLocaleString()}`, requestedDate: req.requestDate, status: req.status || "PENDING", approvedDate: req.approvedDate || "-", remarks: req.remarks || "-", rejectReason: req.rejectReason || "-", accountNumber: accountNumber, cardNumber: req.cardNumber, requestedLimit: req.requestedLimit, currentLimit: req.currentLimitAtRequest || req.currentLimit, fullName: req.fullName, mobileNumber: req.mobileNumber, city: req.city, email: req.email }
          })) : [];

      const lostCardRequestsByAccount = responses[2]?.status === 'fulfilled' && responses[2].value.data?.status
        ? (responses[2].value.data.data || []).map(req => ({
            id: `lst-acc-${req.lostCardId}`, type: "LOST_CARD", typeLabel: "Lost Card",
            description: `Card ****${req.lostCardNumber?.toString().slice(-4)}`, requestDate: req.createdDate,
            status: req.status || "PENDING", approvedDate: req.approvedDate || "-",
            remarks: req.remarks || "-", rejectReason: req.rejectReason || "-",
            accountNumber: accountNumber, cardNumber: req.cardNumber || req.lostCardNumber,
            fullDetails: { requestType: "Lost Card", description: `Card Number: ****${req.lostCardNumber?.toString().slice(-4)}`, requestedDate: req.createdDate, status: req.status || "PENDING", approvedDate: req.approvedDate || "-", remarks: req.remarks || "-", rejectReason: req.rejectReason || "-", accountNumber: accountNumber, cardNumber: req.cardNumber || req.lostCardNumber, lostCardNumber: req.lostCardNumber, lostCardStolenDate: req.lostCardStolenDate, fullName: req.fullName, mobileNumber: req.mobileNumber, city: req.city, email: req.email }
          })) : [];

      const generalQueries = responses[3]?.status === 'fulfilled' && responses[3].value.data?.status
        ? (responses[3].value.data.data || []).map(req => ({
            id: `qry-${req.queriesId}`, type: "GENERAL_QUERY", typeLabel: "General Query",
            description: req.customerQuery.length > 30 ? req.customerQuery.substring(0, 30) + '...' : req.customerQuery,
            requestDate: req.queryRaisedDate, status: req.status || "PENDING",
            approvedDate: req.queryApprovedDate || "-", remarks: req.queryResponse || "-",
            rejectReason: req.rejectReason || "-", accountNumber: accountNumber,
            fullDetails: { requestType: "General Query", description: req.customerQuery, requestedDate: req.queryRaisedDate, status: req.status || "PENDING", approvedDate: req.queryApprovedDate || "-", remarks: req.queryResponse || "-", rejectReason: req.rejectReason || "-", accountNumber: accountNumber, customerQuery: req.customerQuery, queryResponse: req.queryResponse }
          })) : [];

      const creditRequestsByCard = [];
      const lostCardRequestsByCard = [];
      if (accountCards.length > 0) {
        let cardIndex = 4;
        for (let i = 0; i < accountCards.length; i++) {
          const creditResponse = responses[cardIndex];
          if (creditResponse?.status === 'fulfilled' && creditResponse.value?.data?.status) {
            const cardRequests = (creditResponse.value.data.data || []).map(req => ({
              id: `crd-card-${req.increaseCreditLimitId}-${i}`, type: "CREDIT_LIMIT", typeLabel: "Credit Limit",
              description: `₹${req.requestedLimit?.toLocaleString()}`, requestDate: req.requestDate,
              status: req.status || "PENDING", approvedDate: req.approvedDate || "-",
              remarks: req.remarks || "-", rejectReason: req.rejectReason || "-",
              accountNumber: req.accountNumber || accountNumber, cardNumber: req.cardNumber,
              fullDetails: { requestType: "Credit Limit", description: `₹${req.requestedLimit?.toLocaleString()}`, requestedDate: req.requestDate, status: req.status || "PENDING", approvedDate: req.approvedDate || "-", remarks: req.remarks || "-", rejectReason: req.rejectReason || "-", accountNumber: req.accountNumber || accountNumber, cardNumber: req.cardNumber, requestedLimit: req.requestedLimit, currentLimit: req.currentLimitAtRequest, fullName: req.fullName, mobileNumber: req.mobileNumber, city: req.city, email: req.email }
            }));
            creditRequestsByCard.push(...cardRequests);
          }
          cardIndex++;
          const lostResponse = responses[cardIndex];
          if (lostResponse?.status === 'fulfilled' && lostResponse.value?.data?.status) {
            const cardRequests = (lostResponse.value.data.data || []).map(req => ({
              id: `lst-card-${req.lostCardId}-${i}`, type: "LOST_CARD", typeLabel: "Lost Card",
              description: `Card ****${req.lostCardNumber?.toString().slice(-4)}`, requestDate: req.createdDate,
              status: req.status || "PENDING", approvedDate: req.approvedDate || "-",
              remarks: req.remarks || "-", rejectReason: req.rejectReason || "-",
              accountNumber: req.accountNumber || accountNumber, cardNumber: req.cardNumber || req.lostCardNumber,
              fullDetails: { requestType: "Lost Card", description: `Card Number: ****${req.lostCardNumber?.toString().slice(-4)}`, requestedDate: req.createdDate, status: req.status || "PENDING", approvedDate: req.approvedDate || "-", remarks: req.remarks || "-", rejectReason: req.rejectReason || "-", accountNumber: req.accountNumber || accountNumber, cardNumber: req.cardNumber || req.lostCardNumber, lostCardNumber: req.lostCardNumber, lostCardStolenDate: req.lostCardStolenDate, fullName: req.fullName, mobileNumber: req.mobileNumber, city: req.city, email: req.email }
            }));
            lostCardRequestsByCard.push(...cardRequests);
          }
          cardIndex++;
        }
      }

      const allRequests = [
        ...chequeRequests,
        ...[...creditRequestsByAccount, ...creditRequestsByCard],
        ...[...lostCardRequestsByAccount, ...lostCardRequestsByCard],
        ...generalQueries
      ].sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));

      setRequests(allRequests);
    } catch (error) {
      console.error("Failed to fetch requests", error);
      setError(error.response?.data?.message || "Network error. Please check if backend is running.");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = () => {
    setFilteredRequests(selectedRequestType === "ALL" ? requests : requests.filter(req => req.type === selectedRequestType));
  };
  const clearFilter = () => setSelectedRequestType("ALL");
  const openRequestDetails = (request) => { setSelectedRequest(request); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setSelectedRequest(null); };

  const getCurrentPageItems = () => {
    const last = currentPage * itemsPerPage;
    const first = last - itemsPerPage;
    return filteredRequests.slice(first, last);
  };
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    document.getElementById('requests-table-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  const getStatusStyle = (status) => {
    switch (status?.toUpperCase()) {
      case "APPROVED": return { background: SUC_LT, color: SUCCESS, border: `1.5px solid ${SUCCESS}` };
      case "REJECTED": return { background: DAN_LT, color: DANGER, border: `1.5px solid ${DANGER}` };
      case "PENDING":  return { background: WARN_LT, color: WARN,   border: `1.5px solid ${WARN}` };
      default:         return { background: "#EEF1FA", color: TEXT_LT, border: `1.5px solid ${BORDER}` };
    }
  };

  const getRequestTypeLabel = (type) => ({
    "ALL": "All Requests", "CHEQUE_LEAVES": "Cheque Leaves",
    "CREDIT_LIMIT": "Credit Limit", "LOST_CARD": "Lost Card", "GENERAL_QUERY": "General Query"
  }[type] || type);

  const getTypeColor = (type) => ({
    "CHEQUE_LEAVES": CB,
    "CREDIT_LIMIT":  "#6D28D9",
    "LOST_CARD":     DANGER,
    "GENERAL_QUERY": SUCCESS
  }[type] || TEXT);

  const formatDate = (date) => {
    if (!date || date === "-") return "-";
    try {
      const d = new Date(date);
      return `${String(d.getDate()).padStart(2,'0')}-${String(d.getMonth()+1).padStart(2,'0')}-${d.getFullYear()}`;
    } catch { return date; }
  };

  // ── Detail row helper ────────────────────────────────────────────────────
  const DetailRow = ({ label, value, mono = false, danger = false }) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "11px 0", borderBottom: `1px solid #EEF1FA` }}>
      <span style={{ fontSize: "13px", color: TEXT_LT, fontWeight: "600", flex: "0 0 130px" }}>{label}</span>
      <span style={{ fontSize: "13px", color: danger ? DANGER : TEXT, fontWeight: "600", textAlign: "right", flex: 1, wordBreak: "break-word", fontFamily: mono ? "'JetBrains Mono', monospace" : "inherit" }}>{value}</span>
    </div>
  );

  // ── Loading screen ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: PAGE_BG }}>
        <div style={{ textAlign: "center", padding: "44px 36px", backgroundColor: "white", borderRadius: "24px", boxShadow: "0 12px 32px rgba(0,48,135,0.12)", width: "360px", border: `1px solid ${BORDER}` }}>

          {/* Branded logo floating */}
          <div className="logo-float" style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
              <div style={{ background: `linear-gradient(135deg, ${CB_DARK}, ${CB})`, borderRadius: "10px", padding: "8px 10px", display: "flex", alignItems: "center" }}>
                <FaRegBuilding color={CG} size={20} />
              </div>
              <span style={{ fontSize: "20px", fontWeight: "700", color: CB, letterSpacing: "1.5px", fontFamily: "'DM Sans', sans-serif" }}>ABC BANK</span>
            </div>
          </div>

          {/* Gold accent bar */}
          <div style={{ width: "60px", height: "4px", background: `linear-gradient(90deg, ${CG}, ${CG_DARK})`, borderRadius: "2px", margin: "0 auto 28px" }} />

          {/* Animated bar chart loader */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: "6px", height: "48px", marginBottom: "28px" }}>
            {["load-bar-1","load-bar-2","load-bar-3","load-bar-4","load-bar-5"].map((cls, i) => (
              <div key={i} className={`load-bar ${cls}`} style={{ height: `${28 + i * 4}px` }} />
            ))}
          </div>

          {/* Label with pulse dots */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", fontSize: "15px", color: TEXT_LT, fontWeight: "600", marginBottom: "24px", fontFamily: "'DM Sans', sans-serif" }}>
            Loading your requests
            <span className="dot-1" style={{ color: CG, fontSize: "18px", lineHeight: 1 }}>●</span>
            <span className="dot-2" style={{ color: CG, fontSize: "18px", lineHeight: 1 }}>●</span>
            <span className="dot-3" style={{ color: CG, fontSize: "18px", lineHeight: 1 }}>●</span>
          </div>

          {/* Progress track */}
          <div style={{ width: "100%", height: "5px", background: "#EEF1FA", borderRadius: "3px", overflow: "hidden", marginBottom: "22px" }}>
            <div style={{ width: "40%", height: "100%", background: `linear-gradient(90deg, ${CB}, ${CG})`, borderRadius: "3px", animation: "progressSlide 1.6s ease-in-out infinite" }} />
          </div>

          {/* Skeleton rows preview */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "22px" }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ display: "flex", gap: "10px", alignItems: "center", opacity: 1 - (i-1)*0.25 }}>
                <div className="skel" style={{ width: "80px", height: "22px", borderRadius: "30px", flexShrink: 0 }} />
                <div className="skel" style={{ width: "70px", height: "16px" }} />
                <div className="skel" style={{ width: "60px", height: "22px", borderRadius: "30px", marginLeft: "auto" }} />
                <div className="skel" style={{ width: "54px", height: "28px", borderRadius: "30px" }} />
              </div>
            ))}
          </div>

          {/* Secure badge */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", padding: "7px 18px", background: "#EBF0FF", borderRadius: "30px", fontSize: "12px", color: CB, fontWeight: "600", width: "fit-content", margin: "0 auto", fontFamily: "'DM Sans', sans-serif" }}>
            <FaShieldAlt size={11} color={CG} /> Secure Connection
          </div>
        </div>
      </div>
    );
  }

  // ── Error screen ─────────────────────────────────────────────────────────
  if (error) {
    return (
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "24px" }}>
        <div style={{ textAlign: "center", padding: "60px", backgroundColor: "white", borderRadius: "24px", boxShadow: `0 10px 25px -5px rgba(0,48,135,0.1)`, border: `1px solid ${BORDER}`, maxWidth: "500px", margin: "40px auto" }}>
          <FaExclamationTriangle size={48} color={DANGER} style={{ marginBottom: "20px" }} />
          <p style={{ fontSize: "15px", color: TEXT, marginBottom: "24px" }}>{error}</p>
          <button onClick={() => selectedAccount && fetchAllRequests(selectedAccount)} style={{ padding: "13px 36px", background: `linear-gradient(135deg, ${CB}, ${CB_LIGHT})`, color: "white", border: "none", borderRadius: "30px", fontSize: "14px", fontWeight: "700", cursor: "pointer", boxShadow: `0 4px 14px rgba(0,48,135,0.28)`, fontFamily: "'DM Sans', sans-serif" }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 8px 20px rgba(0,48,135,0.36)`; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = `0 4px 14px rgba(0,48,135,0.28)`; }}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentItems = getCurrentPageItems();

  // ── Shared modal detail panel style ─────────────────────────────────────
  const panelStyle = {
    backgroundColor: "#F7F9FF",
    borderRadius: "14px",
    padding: "22px",
    border: `1px solid ${BORDER}`,
    boxShadow: "0 2px 8px rgba(0,48,135,0.06)",
  };

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "24px", fontFamily: "'DM Sans', sans-serif", backgroundColor: PAGE_BG, minHeight: "100vh", color: TEXT }}>

      {/* ── Modal ── */}
      {modalOpen && selectedRequest && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.48)", backdropFilter: "blur(4px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" }} onClick={closeModal}>
          <div style={{ backgroundColor: "white", borderRadius: "22px", padding: "30px", maxWidth: "820px", width: "90%", maxHeight: "90vh", overflow: "auto", boxShadow: `0 20px 40px rgba(0,48,135,0.2)`, border: `1px solid ${BORDER}` }} className="modal-content" onClick={e => e.stopPropagation()}>

            {/* Modal header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px", paddingBottom: "16px", borderBottom: `2px solid ${BORDER}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "5px", alignSelf: "stretch", background: `linear-gradient(180deg, ${CG}, ${CG_DARK})`, borderRadius: "3px" }} />
                <h2 style={{ fontSize: "22px", fontWeight: "700", color: CB, margin: 0 }}>Request Details</h2>
              </div>
              <button onClick={closeModal} style={{ background: "#EEF1FA", border: "none", fontSize: "18px", cursor: "pointer", color: TEXT_LT, padding: "8px", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = DAN_LT; e.currentTarget.style.color = DANGER; e.currentTarget.style.transform = "rotate(90deg)"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#EEF1FA"; e.currentTarget.style.color = TEXT_LT; e.currentTarget.style.transform = "rotate(0deg)"; }}>
                <FaTimes />
              </button>
            </div>

            {/* Status card */}
            <div style={{ ...panelStyle, marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "14px", fontWeight: "700", color: CB, textTransform: "uppercase", letterSpacing: "0.5px" }}>Current Status</span>
                <span style={{ padding: "7px 20px", borderRadius: "30px", fontSize: "13px", fontWeight: "700", textTransform: "uppercase", ...getStatusStyle(selectedRequest.status) }} className="status-badge">
                  {selectedRequest.status || "PENDING"}
                </span>
              </div>
            </div>

            {/* Details grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div style={panelStyle}>
                <h3 style={{ fontSize: "15px", fontWeight: "700", color: CB, margin: "0 0 14px 0", paddingBottom: "10px", borderBottom: `1px solid ${BORDER}`, textTransform: "uppercase", letterSpacing: "0.5px" }}>Request Information</h3>
                <DetailRow label="Request Type" value={selectedRequest.typeLabel} />
                <DetailRow label="Description"  value={selectedRequest.fullDetails?.description || selectedRequest.description} />
                <DetailRow label="Requested Date" value={formatDate(selectedRequest.requestDate)} mono />
                <DetailRow label="Account Number" value={`****${selectedRequest.accountNumber?.toString().slice(-4) || "****"}`} mono />
                {selectedRequest.cardNumber && <DetailRow label="Card Number" value={`****${selectedRequest.cardNumber?.toString().slice(-4)}`} mono />}
                {selectedRequest.type === "CHEQUE_LEAVES" && selectedRequest.fullDetails?.noOfLeaves && <DetailRow label="No. of Leaves" value={selectedRequest.fullDetails.noOfLeaves} />}
                {selectedRequest.type === "CREDIT_LIMIT" && (<>
                  {selectedRequest.fullDetails?.currentLimit   && <DetailRow label="Current Limit"   value={`₹${selectedRequest.fullDetails.currentLimit?.toLocaleString()}`} />}
                  {selectedRequest.fullDetails?.requestedLimit && <DetailRow label="Requested Limit" value={`₹${selectedRequest.fullDetails.requestedLimit?.toLocaleString()}`} />}
                  {selectedRequest.fullDetails?.fullName       && <DetailRow label="Customer Name"   value={selectedRequest.fullDetails.fullName} />}
                  {selectedRequest.fullDetails?.mobileNumber   && <DetailRow label="Mobile Number"   value={selectedRequest.fullDetails.mobileNumber} mono />}
                </>)}
                {selectedRequest.type === "LOST_CARD" && (<>
                  {selectedRequest.fullDetails?.lostCardNumber    && <DetailRow label="Lost Card No." value={`****${selectedRequest.fullDetails.lostCardNumber?.toString().slice(-4)}`} mono />}
                  {selectedRequest.fullDetails?.lostCardStolenDate && <DetailRow label="Lost/Stolen Date" value={formatDate(selectedRequest.fullDetails.lostCardStolenDate)} mono />}
                  {selectedRequest.fullDetails?.fullName           && <DetailRow label="Customer Name"    value={selectedRequest.fullDetails.fullName} />}
                </>)}
                {selectedRequest.type === "GENERAL_QUERY" && selectedRequest.fullDetails?.customerQuery && <DetailRow label="Query" value={selectedRequest.fullDetails.customerQuery} />}
              </div>

              <div style={panelStyle}>
                <h3 style={{ fontSize: "15px", fontWeight: "700", color: CB, margin: "0 0 14px 0", paddingBottom: "10px", borderBottom: `1px solid ${BORDER}`, textTransform: "uppercase", letterSpacing: "0.5px" }}>Additional Information</h3>
                <DetailRow label="Approved Date" value={formatDate(selectedRequest.approvedDate)} mono />
                <DetailRow label="Remarks" value={selectedRequest.remarks || "-"} />
                {selectedRequest.rejectReason && selectedRequest.rejectReason !== "-" && <DetailRow label="Reject Reason" value={selectedRequest.rejectReason} danger />}
                {selectedRequest.type === "GENERAL_QUERY" && selectedRequest.fullDetails?.queryResponse && <DetailRow label="Response" value={selectedRequest.fullDetails.queryResponse} />}
                {(selectedRequest.type === "CREDIT_LIMIT" || selectedRequest.type === "LOST_CARD") && (<>
                  {selectedRequest.fullDetails?.email && <DetailRow label="Email" value={selectedRequest.fullDetails.email} />}
                  {selectedRequest.fullDetails?.city  && <DetailRow label="City"  value={selectedRequest.fullDetails.city} />}
                </>)}
              </div>
            </div>

            {/* Modal footer */}
            <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "22px", borderTop: `1px solid ${BORDER}`, marginTop: "20px" }}>
              <button onClick={closeModal} style={{ padding: "11px 30px", background: `linear-gradient(135deg, ${CB}, ${CB_LIGHT})`, color: "white", border: "none", borderRadius: "10px", fontSize: "14px", fontWeight: "700", cursor: "pointer", boxShadow: `0 4px 12px rgba(0,48,135,0.28)`, fontFamily: "'DM Sans', sans-serif", transition: "all 0.25s" }}
                onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 8px 20px rgba(0,48,135,0.36)`; }}
                onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = `0 4px 12px rgba(0,48,135,0.28)`; }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Branded top bar ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "0", marginBottom: "24px", background: `linear-gradient(135deg, ${CB_DARK} 0%, ${CB} 60%, ${CB_LIGHT} 100%)`, borderRadius: "14px", overflow: "hidden", boxShadow: `0 6px 24px rgba(0,48,135,0.28)`, animation: "fadeSlideUp 0.4s ease" }}>
        <div style={{ width: "7px", alignSelf: "stretch", background: `linear-gradient(180deg, ${CG}, ${CG_DARK})`, flexShrink: 0 }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flex: 1, padding: "13px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ background: "rgba(245,168,0,0.18)", borderRadius: "10px", padding: "7px 9px", display: "flex", alignItems: "center" }}>
              <FaRegBuilding color={CG} size={18} />
            </div>
            <div>
              <div style={{ fontSize: "19px", fontWeight: "700", color: "white", letterSpacing: "1px" }}>ABC BANK</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", letterSpacing: "2px", textTransform: "uppercase" }}>Trusted · Secure · Yours</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "7px", background: "rgba(245,168,0,0.14)", border: `1px solid rgba(245,168,0,0.36)`, borderRadius: "30px", padding: "5px 14px", fontSize: "12px", color: CG, fontWeight: "600" }}>
            <FaShieldAlt size={11} /> Secured Portal
          </div>
        </div>
      </div>

      {/* ── Page header + filters ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "26px", fontWeight: "700", color: CB, margin: 0, letterSpacing: "-0.02em" }}>My Requests</h1>
          <p style={{ fontSize: "14px", color: TEXT_LT, margin: "4px 0 0", fontWeight: "500" }}>Track and manage your service requests</p>
        </div>

        <div style={{ display: "flex", gap: "14px", alignItems: "center", flexWrap: "wrap" }}>
          {/* Account dropdown */}
          <div ref={accountDropdownRef} className="account-dropdown-container">
            <div className={`account-dropdown-button ${isAccountDropdownOpen ? 'active' : ''}`} onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}>
              {selectedAccountDetails ? (
                <div className="selected-account-preview">
                  <div className="account-avatar">{selectedAccountDetails.icon}</div>
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
                  <div className="account-info"><span className="account-type">Select Account</span></div>
                </div>
              )}
              <FaChevronDown className={`dropdown-arrow ${isAccountDropdownOpen ? 'open' : ''}`} />
            </div>

            {isAccountDropdownOpen && (
              <div className="account-dropdown-menu">
                {loadingAccounts ? (
                  <div style={{ padding: "24px", textAlign: "center", color: TEXT_LT }}>
                    <div style={{ width: "22px", height: "22px", border: `3px solid ${CG_LIGHT}`, borderTopColor: CG, borderRadius: "50%", animation: "spinRing 0.9s linear infinite", margin: "0 auto 10px" }} />
                    <p style={{ fontSize: "13px", margin: 0 }}>Loading accounts...</p>
                  </div>
                ) : accounts.length > 0 ? accounts.map(account => (
                  <div key={account.number} className={`account-dropdown-item ${selectedAccount === account.number ? 'selected' : ''}`}
                    onClick={() => { setSelectedAccount(account.number); setIsAccountDropdownOpen(false); }}>
                    <div className="account-item-avatar">{account.icon}</div>
                    <div className="account-item-details">
                      <div className="account-item-type">{account.type}</div>
                      <div><span className="account-item-masked">****{account.last4}</span></div>
                    </div>
                  </div>
                )) : (
                  <div style={{ padding: "24px", textAlign: "center", color: TEXT_LT, fontSize: "13px" }}>No accounts found</div>
                )}
              </div>
            )}
          </div>

          {/* Type filter */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <select value={selectedRequestType} onChange={e => setSelectedRequestType(e.target.value)} className="request-type-select" disabled={!selectedAccount}>
              <option value="ALL">All Requests</option>
              <option value="CHEQUE_LEAVES">Cheque Leaves</option>
              <option value="CREDIT_LIMIT">Credit Limit</option>
              <option value="LOST_CARD">Lost Card</option>
              <option value="GENERAL_QUERY">General Query</option>
            </select>
            {selectedRequestType !== "ALL" && (
              <button onClick={clearFilter} style={{ width: "44px", height: "44px", backgroundColor: DANGER, color: "white", border: "none", borderRadius: "12px", fontSize: "17px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} className="clear-button" title="Clear Filter">
                <FaTimes />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── No account selected ── */}
      {!selectedAccount && (
        <div style={{ textAlign: "center", padding: "80px 40px", backgroundColor: "white", borderRadius: "22px", boxShadow: `0 10px 25px rgba(0,48,135,0.08)`, border: `1px solid ${BORDER}`, maxWidth: "500px", margin: "40px auto" }}>
          <div style={{ fontSize: "60px", marginBottom: "20px", opacity: 0.65 }}>🏦</div>
          <h3 style={{ fontSize: "22px", fontWeight: "700", color: CB, margin: "0 0 8px" }}>Select an Account</h3>
          <p style={{ fontSize: "14px", color: TEXT_LT, margin: 0 }}>Please select an account to view your requests</p>
        </div>
      )}

      {/* ── Requests table ── */}
      {selectedAccount && filteredRequests.length > 0 && (
        <>
          <div id="requests-table-container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <span style={{ fontSize: "15px", fontWeight: "700", color: CB }}>
              {filteredRequests.length} Total Requests
            </span>
          </div>

          <div style={{ backgroundColor: "white", borderRadius: "18px", border: `1px solid ${BORDER}`, overflow: "auto", maxHeight: "600px", boxShadow: `0 4px 24px rgba(0,48,135,0.08)`, marginBottom: "24px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "580px" }}>
              <thead>
                <tr>
                  {["Request Type", "Requested Date", "Status", "View"].map((col, i) => (
                    <th key={col} style={{ textAlign: "left", padding: "15px 20px", borderBottom: `2px solid ${BORDER}`, color: "white", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.7px", background: `linear-gradient(90deg, ${CB_DARK}, ${CB})`, position: "sticky", top: 0, zIndex: 10, ...(i === 0 ? { borderLeft: `4px solid ${CG}` } : {}) }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={item.id} style={{ borderBottom: `1px solid ${BORDER}`, backgroundColor: index % 2 === 0 ? "white" : "#F7F9FF", animationDelay: `${index * 40}ms` }} className="request-row">
                    <td style={{ padding: "15px 20px", verticalAlign: "middle" }}>
                      <span style={{ padding: "5px 13px", borderRadius: "30px", fontSize: "12px", fontWeight: "700", border: "1.5px solid", display: "inline-block", whiteSpace: "nowrap", backgroundColor: `${getTypeColor(item.type)}18`, color: getTypeColor(item.type), borderColor: getTypeColor(item.type) }} className="type-badge">
                        {item.typeLabel}
                      </span>
                    </td>
                    <td style={{ padding: "15px 20px", verticalAlign: "middle" }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: TEXT, fontWeight: "600", whiteSpace: "nowrap" }}>{formatDate(item.requestDate)}</span>
                    </td>
                    <td style={{ padding: "15px 20px", verticalAlign: "middle" }}>
                      <span style={{ padding: "5px 13px", borderRadius: "30px", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", display: "inline-block", whiteSpace: "nowrap", ...getStatusStyle(item.status) }} className="status-badge">
                        {item.status}
                      </span>
                    </td>
                    <td style={{ padding: "15px 20px", verticalAlign: "middle" }}>
                      <button style={{ padding: "8px 20px", background: `linear-gradient(135deg, ${CB}, ${CB_LIGHT})`, color: "white", border: "none", borderRadius: "30px", fontSize: "13px", fontWeight: "700", cursor: "pointer", boxShadow: `0 2px 8px rgba(0,48,135,0.2)`, minWidth: "96px", fontFamily: "'DM Sans', sans-serif" }}
                        onClick={() => openRequestDetails(item)} className="view-button">
                        <FaEye style={{ marginRight: "6px" }} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                {[
                  { label: "« First", action: () => paginate(1), disabled: currentPage === 1 },
                  { label: "← Prev",  action: () => paginate(currentPage - 1), disabled: currentPage === 1 },
                ].map(btn => (
                  <button key={btn.label} onClick={btn.action} disabled={btn.disabled} style={{ padding: "10px 16px", backgroundColor: "white", border: `1.5px solid ${BORDER}`, borderRadius: "10px", color: TEXT, fontSize: "13px", fontWeight: "600", cursor: "pointer" }} className="pagination-button">{btn.label}</button>
                ))}

                <div style={{ display: "flex", gap: "4px" }}>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) pageNum = i + 1;
                    else if (currentPage <= 3) pageNum = i + 1;
                    else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                    else pageNum = currentPage - 2 + i;
                    const isActive = currentPage === pageNum;
                    return (
                      <button key={pageNum} onClick={() => paginate(pageNum)}
                        style={{ width: "42px", height: "42px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "white", border: `1.5px solid ${BORDER}`, borderRadius: "10px", color: TEXT, fontSize: "14px", fontWeight: "600", cursor: "pointer", ...(isActive ? { background: `linear-gradient(135deg, ${CB}, ${CB_LIGHT})`, borderColor: CB, color: "white", boxShadow: `0 4px 12px rgba(0,48,135,0.25)` } : {}) }}
                        className={`pagination-button ${isActive ? 'active' : ''}`}>
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                {[
                  { label: "Next →", action: () => paginate(currentPage + 1), disabled: currentPage === totalPages },
                  { label: "Last »", action: () => paginate(totalPages),       disabled: currentPage === totalPages },
                ].map(btn => (
                  <button key={btn.label} onClick={btn.action} disabled={btn.disabled} style={{ padding: "10px 16px", backgroundColor: "white", border: `1.5px solid ${BORDER}`, borderRadius: "10px", color: TEXT, fontSize: "13px", fontWeight: "600", cursor: "pointer" }} className="pagination-button">{btn.label}</button>
                ))}
              </div>
              <div style={{ textAlign: "center", fontSize: "13px", color: TEXT_LT, marginTop: "14px", fontWeight: "600" }}>
                Showing {((currentPage - 1) * itemsPerPage) + 1}–{Math.min(currentPage * itemsPerPage, filteredRequests.length)} of {filteredRequests.length} requests
              </div>
            </div>
          )}
        </>
      )}

      {/* ── Empty state ── */}
      {selectedAccount && filteredRequests.length === 0 && (
        <div style={{ textAlign: "center", padding: "80px 40px", backgroundColor: "white", borderRadius: "22px", boxShadow: `0 10px 25px rgba(0,48,135,0.08)`, border: `1px solid ${BORDER}`, maxWidth: "600px", margin: "40px auto" }}>
          <div style={{ fontSize: "58px", marginBottom: "20px", opacity: 0.65 }}>📋</div>
          <h3 style={{ fontSize: "22px", fontWeight: "700", color: CB, margin: "0 0 8px" }}>No Requests Found</h3>
          <p style={{ fontSize: "14px", color: TEXT_LT, marginBottom: "24px" }}>
            {requests.length === 0 ? "You haven't submitted any requests yet." : `No ${selectedRequestType !== "ALL" ? getRequestTypeLabel(selectedRequestType) : ""} requests found.`}
          </p>
          {selectedRequestType !== "ALL" && requests.length > 0 && (
            <button onClick={clearFilter} style={{ padding: "13px 36px", background: `linear-gradient(135deg, ${CB}, ${CB_LIGHT})`, color: "white", border: "none", borderRadius: "30px", fontSize: "14px", fontWeight: "700", cursor: "pointer", boxShadow: `0 4px 14px rgba(0,48,135,0.28)`, fontFamily: "'DM Sans', sans-serif" }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.target.style.transform = "translateY(0)"; }}>
              View All Requests
            </button>
          )}
        </div>
      )}

    </div>
  );
};

export default MyRequests;
