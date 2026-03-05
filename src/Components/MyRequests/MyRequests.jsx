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
