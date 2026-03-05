import { useState, useEffect, useCallback } from "react";
import {
    FaBook,
    FaCreditCard,
    FaShieldAlt,
    FaQuestionCircle,
    FaArrowRight,
    FaSync,
    FaTimes,
    FaCheckCircle,
    FaExclamationTriangle,
    FaLock,
} from "react-icons/fa";
import API from "../../api";
import { useSnackbar } from "../../Context/SnackbarContext";

// ─── THEME — matches Dashboard & Login dark navy/gold ────────────────────────
const T = {
    navyDeep:    "#0B1829",
    navyDark:    "#0F2035",
    navyMid:     "#152845",
    navyLight:   "#1C3558",
    navyBorder:  "#1F3D5C",
    gold:        "#F5A623",
    goldLight:   "#FFD166",
    goldGlow:    "rgba(245,166,35,0.18)",
    white:       "#FFFFFF",
    offWhite:    "#E8EFF7",
    muted:       "#8AAAC8",
    mutedDark:   "#4A6B8A",
    success:     "#22C55E",
    successBg:   "rgba(34,197,94,0.12)",
    danger:      "#EF4444",
    dangerBg:    "rgba(239,68,68,0.12)",
    warn:        "#F59E0B",
    warnBg:      "rgba(245,158,11,0.12)",
};

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
    background: ${T.navyDeep};
    font-family: 'DM Sans', sans-serif;
    color: ${T.offWhite};
}

::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: ${T.navyDark}; }
::-webkit-scrollbar-thumb { background: ${T.navyLight}; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: ${T.gold}; }

/* Animations */
@keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
}
@keyframes cardIn {
    from { opacity: 0; transform: translateY(24px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
}
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes shimmerAnim {
    0%   { background-position: -700px 0; }
    100% { background-position:  700px 0; }
}
@keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(245,166,35,0.3); }
    50%       { box-shadow: 0 0 0 8px rgba(245,166,35,0); }
}

.fade-up { animation: fadeSlideUp 0.45s cubic-bezier(0.22,1,0.36,1) both; }
.shimmer-cell {
    background: linear-gradient(90deg, ${T.navyMid} 25%, ${T.navyLight} 50%, ${T.navyMid} 75%);
    background-size: 700px 100%;
    animation: shimmerAnim 1.4s infinite linear;
    border-radius: 10px;
}

/* ── Service cards ─────────────────────────────────────────────────────────── */
.svc-card {
    position: relative;
    background: ${T.navyDark};
    border: 1.5px solid ${T.navyBorder};
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    cursor: pointer;
    animation: cardIn 0.42s cubic-bezier(0.22,1,0.36,1) both;
    animation-delay: var(--delay, 0ms);
    transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
    will-change: transform;
}
.svc-card:hover {
    transform: translateY(-6px);
    border-color: var(--accent-color);
    box-shadow: 0 0 0 1px var(--accent-color), 0 20px 40px rgba(0,0,0,0.45);
}

.svc-gold-strip {
    height: 3px;
    width: 100%;
    flex-shrink: 0;
}

.svc-icon-wrap {
    width: 52px; height: 52px;
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: transform 0.22s ease;
    border: 1px solid rgba(255,255,255,0.06);
}
.svc-card:hover .svc-icon-wrap { transform: scale(1.1) rotate(-5deg); }

.svc-tag-badge {
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.1em;
    padding: 4px 10px;
    border-radius: 30px;
}

.svc-apply-btn {
    display: flex; align-items: center; justify-content: space-between;
    width: 100%; padding: 13px 20px;
    border: none; border-radius: 12px;
    color: #fff; font-size: 14px; font-weight: 700;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: filter 0.2s ease, transform 0.18s ease;
    letter-spacing: 0.03em;
}
.svc-apply-btn:hover { filter: brightness(1.1); transform: scale(1.015); }

.svc-arrow-icon { transition: transform 0.22s ease; }
.svc-card:hover .svc-arrow-icon { transform: translateX(6px); }

.svc-glow-overlay {
    position: absolute; inset: 0;
    pointer-events: none; opacity: 0;
    transition: opacity 0.3s ease;
}
.svc-card:hover .svc-glow-overlay { opacity: 1; }

/* ── Modal ─────────────────────────────────────────────────────────────────── */
.modal-overlay {
    position: fixed; inset: 0;
    background: rgba(5, 12, 25, 0.75);
    backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    z-index: 9999; padding: 20px;
    animation: fadeIn 0.25s ease;
}
.modal-box {
    width: 100%; max-width: 490px; max-height: 92vh;
    overflow-y: auto;
    background: ${T.navyDark};
    border-radius: 22px;
    border: 1px solid ${T.navyBorder};
    box-shadow: 0 32px 64px rgba(0,0,0,0.6);
    animation: slideUp 0.3s cubic-bezier(0.22,1,0.36,1);
}

/* ── Form fields ────────────────────────────────────────────────────────────── */
.form-select, .form-input, .form-textarea {
    width: 100%;
    background: ${T.navyMid};
    border: 1.5px solid ${T.navyBorder};
    border-radius: 10px;
    color: ${T.offWhite};
    font-size: 13.5px;
    font-family: 'DM Sans', sans-serif;
    padding: 11px 14px;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    appearance: auto;
    -webkit-appearance: auto;
}
.form-select option { background: ${T.navyMid}; color: ${T.offWhite}; }
.form-select:focus, .form-input:focus, .form-textarea:focus {
    border-color: ${T.gold};
    box-shadow: 0 0 0 3px ${T.goldGlow};
}
.form-select:disabled, .form-input:disabled, .form-textarea:disabled {
    opacity: 0.45; cursor: not-allowed;
}
.form-textarea { resize: vertical; min-height: 100px; }

/* ── Buttons ──────────────────────────────────────────────────────────────── */
.modal-cancel-btn {
    flex: 1; padding: 12px 0; border-radius: 10px;
    border: 1.5px solid ${T.navyBorder};
    background: ${T.navyMid}; color: ${T.muted};
    font-size: 14px; font-weight: 600;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: border-color 0.18s ease, color 0.18s ease;
}
.modal-cancel-btn:hover { border-color: ${T.muted}; color: ${T.offWhite}; }

.modal-submit-btn {
    flex: 2; padding: 12px 0; border-radius: 10px;
    border: none; color: #fff;
    font-size: 14px; font-weight: 700;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: filter 0.2s ease, transform 0.15s ease, opacity 0.2s ease;
    box-shadow: 0 4px 16px rgba(0,0,0,0.3);
}
.modal-submit-btn:not(:disabled):hover { filter: brightness(1.1); transform: translateY(-1px); }
.modal-submit-btn:disabled { opacity: 0.45; cursor: not-allowed; }

.refresh-icon-btn {
    background: none; border: none; cursor: pointer;
    color: ${T.muted}; padding: 4px; border-radius: 6px;
    display: flex; align-items: center;
    transition: color 0.15s ease;
}
.refresh-icon-btn:hover { color: ${T.gold}; }

/* ── Focus rings ──────────────────────────────────────────────────────────── */
*:focus-visible { outline: 2px solid ${T.gold}; outline-offset: 2px; }
`;

// ─── Service definitions ─────────────────────────────────────────────────────────
const SERVICES = [
    {
        id: "cheque-book",
        category: "cheque",
        categoryName: "Cheque Services",
        title: "Cheque Leaves Request",
        description: "Request a new cheque book for your savings or current account",
        icon: FaBook,
        accent: T.gold,
        accentDim: "rgba(245,166,35,0.12)",
        accentBorder: "rgba(245,166,35,0.3)",
        gradient: `linear-gradient(135deg, #8A5E00, #C47D0E, #F5A623)`,
        tag: "CHEQUE SERVICES",
    },
    {
        id: "credit-limit",
        category: "card",
        categoryName: "Card Services",
        title: "Increase Card Limit",
        description: "Request an enhancement of your credit card spending limit",
        icon: FaCreditCard,
        accent: "#60A5FA",
        accentDim: "rgba(96,165,250,0.12)",
        accentBorder: "rgba(96,165,250,0.3)",
        gradient: `linear-gradient(135deg, #0F2744, #1A4070, #2563EB)`,
        tag: "CARD SERVICES",
    },
    {
        id: "stolen-card",
        category: "security",
        categoryName: "Security & Fraud",
        title: "Report Lost Card",
        description: "Immediately block and report a lost or stolen debit/credit card",
        icon: FaShieldAlt,
        accent: "#F87171",
        accentDim: "rgba(248,113,113,0.12)",
        accentBorder: "rgba(248,113,113,0.3)",
        gradient: `linear-gradient(135deg, #4B0000, #991B1B, #EF4444)`,
        tag: "SECURITY & FRAUD",
    },
    {
        id: "general-query",
        category: "queries",
        categoryName: "Queries & Support",
        title: "General Query",
        description: "Submit enquiries about banking products and get expert assistance",
        icon: FaQuestionCircle,
        accent: "#34D399",
        accentDim: "rgba(52,211,153,0.12)",
        accentBorder: "rgba(52,211,153,0.3)",
        gradient: `linear-gradient(135deg, #064E3B, #065F46, #10B981)`,
        tag: "QUERIES & SUPPORT",
    },
];

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
const Services = () => {
    const { showSnackbar } = useSnackbar();
    const [showServiceForm, setShowServiceForm] = useState(null);
    const [appliedServices, setAppliedServices] = useState([]);
    const [customerId, setCustomerId]           = useState(null);

    // Inject global styles
    useEffect(() => {
        const tag = document.createElement("style");
        tag.id = "services-global-css";
        tag.textContent = GLOBAL_CSS;
        if (!document.getElementById("services-global-css")) document.head.appendChild(tag);
        return () => { const el = document.getElementById("services-global-css"); if (el) el.remove(); };
    }, []);

    useEffect(() => {
        const id = localStorage.getItem("customerId") || localStorage.getItem("userId") || "2";
        setCustomerId(id);
    }, []);

    // ── Service Form Modal ──────────────────────────────────────────────────
    const ServiceForm = ({ service, onClose }) => {
        const [formData, setFormData] = useState({
            accountNumber: "", noOfLeaves: "", dateLost: "",
            selectedCardNumber: "", requestedLimit: "", queries: "",
        });
        const [accounts,            setAccounts]            = useState([]);
        const [cards,               setCards]               = useState([]);
        const [selectedCardDetails, setSelectedCardDetails] = useState(null);
        const [submitting,          setSubmitting]          = useState(false);
        const [loadingAccounts,     setLoadingAccounts]     = useState(false);
        const [loadingCards,        setLoadingCards]        = useState(false);
        const [limitError,          setLimitError]          = useState("");

        const getLast4 = n => n ? String(n).slice(-4) : "";

        const fetchAccounts = useCallback(async () => {
            if (!customerId) return;
            setLoadingAccounts(true);
            try {
                const res = await API.get(`account/userAccounts/${customerId}`);
                if (res.data?.status && Array.isArray(res.data.data)) {
                    const allAccounts = res.data.data.map(acc => {
                        let icon = "🏦";
                        const n = acc.accountTypeName?.toLowerCase() || "";
                        if (n.includes("savings")) icon = "💰";
                        else if (n.includes("current")) icon = "💳";
                        else if (n.includes("salary"))  icon = "💼";
                        const isActive = acc.status?.toLowerCase() === "active";
                        return {
                            number: String(acc.accountNumber),
                            type: acc.accountTypeName,
                            icon,
                            status: acc.status,
                            isActive,
                            displayLabel: `${acc.accountTypeName} — ****${getLast4(acc.accountNumber)}${!isActive ? ' (Inactive)' : ''}`,
                        };
                    });
                    setAccounts(allAccounts);
                } else showSnackbar("error", "Failed to fetch accounts");
            } catch { showSnackbar("error", "Failed to fetch accounts. Please try again."); }
            finally { setLoadingAccounts(false); }
        }, [customerId]);

        useEffect(() => { if (customerId) fetchAccounts(); }, [fetchAccounts, customerId]);

        // Fetch cards when account changes
        useEffect(() => {
            const fetchCards = async () => {
                if (!formData.accountNumber) { setCards([]); setSelectedCardDetails(null); return; }
                setLoadingCards(true);
                try {
                    const res = await API.get(`cards/account/${formData.accountNumber}`);
                    if (res.data?.status && Array.isArray(res.data.data)) {
                        let filtered = res.data.data.filter(c => c.status === "Active" || c.status === "ACTIVE");
                        if (service.id === "credit-limit")
                            filtered = filtered.filter(c => c.cardTypeName?.toLowerCase().includes("credit"));
                        setCards(filtered.map(c => ({
                            ...c,
                            display: `${c.cardTypeName} — ****${getLast4(c.cardNumber)}`,
                        })));
                    }
                } catch { showSnackbar("error", "Failed to fetch cards for this account"); setCards([]); }
                finally { setLoadingCards(false); }
            };
            if (service.id === "stolen-card" || service.id === "credit-limit") fetchCards();
        }, [formData.accountNumber]);

        useEffect(() => {
            if (formData.selectedCardNumber && cards.length) {
                const c = cards.find(c => String(c.cardNumber) === String(formData.selectedCardNumber));
                setSelectedCardDetails(c || null);
                setLimitError("");
                setFormData(p => ({ ...p, requestedLimit: "" }));
            } else setSelectedCardDetails(null);
        }, [formData.selectedCardNumber, cards]);

        const validateLimit = v => {
            if (!selectedCardDetails) return "";
            const val = Number(v), cur = Number(selectedCardDetails.currentLimit);
            if (isNaN(val) || val <= 0) return "Please enter a valid amount";
            if (val <= cur) return `Amount must exceed current limit (₹${cur.toLocaleString()})`;
            return "";
        };

        const isCreditLimitValid = () =>
            !!(formData.accountNumber && formData.selectedCardNumber && formData.requestedLimit && !limitError);

        const selectedAccount = accounts.find(acc => acc.number === formData.accountNumber);
        const isSelectedAccountInactive = selectedAccount && !selectedAccount.isActive;

        const isSubmitDisabled = () => {
            if (submitting) return true;
            if (isSelectedAccountInactive) return true;
            if (service.id === "cheque-book")   return !formData.accountNumber || !formData.noOfLeaves;
            if (service.id === "general-query") return !formData.accountNumber || !formData.queries;
            if (service.id === "stolen-card")   return !formData.accountNumber || !formData.selectedCardNumber || !formData.dateLost;
            if (service.id === "credit-limit")  return !isCreditLimitValid();
            return false;
        };

        const handleSubmit = async () => {
            if (isSubmitDisabled()) return;
            if (isSelectedAccountInactive) {
                showSnackbar("error", "Cannot raise request with inactive account");
                return;
            }
            setSubmitting(true);
            try {
                let response, msg;
                if (service.id === "cheque-book") {
                    response = await API.post("chequeRequest/save", { noOfLeaves: Number(formData.noOfLeaves), accountNumber: Number(formData.accountNumber) });
                    msg = "Cheque Book Requested Successfully!";
                } else if (service.id === "general-query") {
                    response = await API.post("queriesResponse/save", { customerQuery: formData.queries, accountNumber: Number(formData.accountNumber) });
                    msg = "Query Submitted Successfully!";
                } else if (service.id === "stolen-card") {
                    response = await API.post("lostCard/save", { lostCardStolenDate: formData.dateLost, cardNumber: Number(formData.selectedCardNumber) });
                    msg = "Card Reported Lost & Blocked Successfully!";
                } else if (service.id === "credit-limit") {
                    const error = validateLimit(formData.requestedLimit);
                    if (error) { setLimitError(error); showSnackbar("error", error); setSubmitting(false); return; }
                    response = await API.post("creditLimit/save", { cardNumber: Number(formData.selectedCardNumber), requestedLimit: Number(formData.requestedLimit) });
                    msg = "Credit Limit Increase Requested!";
                }
                if (response?.data?.status) {
                    showSnackbar("success", msg);
                    setAppliedServices(p => [...p, { ...service, id: Math.random().toString(), status: "Processing", date: new Date().toLocaleDateString() }]);
                    onClose();
                } else showSnackbar("error", response?.data?.message || "Request failed. Please try again.");
            } catch (e) {
                showSnackbar("error", e.response?.data?.message || "An error occurred. Please try again.");
            } finally { setSubmitting(false); }
        };

        const fieldBorderColor = val => val ? service.accent : T.navyBorder;

        return (
            <div className="modal-overlay">
                <div className="modal-box">
                    {/* Gold top accent line */}
                    <div style={{ height: 3, background: service.gradient, borderRadius: "22px 22px 0 0" }} />

                    {/* Header */}
                    <div style={{
                        display: "flex", alignItems: "center", gap: 14,
                        padding: "22px 22px 18px",
                        borderBottom: `1px solid ${T.navyBorder}`,
                        position: "relative",
                    }}>
                        <div style={{
                            width: 50, height: 50, borderRadius: 14,
                            background: service.accentDim,
                            border: `1px solid ${service.accentBorder}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0,
                        }}>
                            <service.icon size={22} color={service.accent} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3 style={{
                                margin: "0 0 4px", fontSize: 17, fontWeight: 700,
                                color: T.white, fontFamily: "'Playfair Display', serif",
                            }}>{service.title}</h3>
                            <p style={{ margin: 0, fontSize: 12.5, color: T.muted, lineHeight: 1.5 }}>
                                {service.description}
                            </p>
                        </div>
                        <button
                            style={{
                                position: "absolute", top: 16, right: 16,
                                width: 32, height: 32, borderRadius: 10,
                                border: `1px solid ${T.navyBorder}`,
                                background: T.navyMid, color: T.muted,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                cursor: "pointer", transition: "all 0.15s ease",
                            }}
                            onClick={onClose}
                            onMouseEnter={e => { e.currentTarget.style.background = T.navyLight; e.currentTarget.style.color = T.offWhite; }}
                            onMouseLeave={e => { e.currentTarget.style.background = T.navyMid; e.currentTarget.style.color = T.muted; }}
                        >
                            <FaTimes size={13} />
                        </button>
                    </div>

                    {/* Body */}
                    <div style={{ padding: "22px 22px 8px" }}>

                        {/* Account select */}
                        <div style={{ marginBottom: 18 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                                <label style={{ fontSize: 13, fontWeight: 600, color: service.accent }}>Select Account</label>
                                <button className="refresh-icon-btn" onClick={fetchAccounts} disabled={loadingAccounts} title="Refresh">
                                    <FaSync size={11} style={{ animation: loadingAccounts ? "spin 1s linear infinite" : "none" }} />
                                </button>
                            </div>
                            {loadingAccounts ? (
                                <LoadingField />
                            ) : (
                                <select
                                    className="form-select"
                                    style={{ borderColor: fieldBorderColor(formData.accountNumber) }}
                                    value={formData.accountNumber}
                                    onChange={e => setFormData({ ...formData, accountNumber: e.target.value, selectedCardNumber: "" })}
                                >
                                    <option value="">— Choose account —</option>
                                    {accounts.map(a => (
                                        <option key={a.number} value={a.number}>{a.icon} {a.displayLabel}</option>
                                    ))}
                                    {!accounts.length && <option disabled>No accounts found</option>}
                                </select>
                            )}
                            {isSelectedAccountInactive && (
                                <div style={{
                                    display: "flex", alignItems: "center", gap: 6,
                                    marginTop: 8, padding: "8px 12px", borderRadius: 8,
                                    background: T.warnBg, color: T.warn,
                                    border: `1px solid rgba(245,158,11,0.25)`,
                                    fontSize: 12.5, fontWeight: 500,
                                }}>
                                    <FaLock size={11} />
                                    <span>This account is inactive. You cannot raise requests with inactive accounts.</span>
                                </div>
                            )}
                        </div>

                        {/* Cheque leaves */}
                        {service.id === "cheque-book" && (
                            <div style={{ marginBottom: 18 }}>
                                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: service.accent, marginBottom: 7 }}>
                                    Number of Leaves
                                </label>
                                <select
                                    className="form-select"
                                    style={{ borderColor: fieldBorderColor(formData.noOfLeaves) }}
                                    value={formData.noOfLeaves}
                                    disabled={isSelectedAccountInactive}
                                    onChange={e => setFormData({ ...formData, noOfLeaves: e.target.value })}
                                >
                                    <option value="">— Select leaves —</option>
                                    <option value="20">20 Leaves</option>
                                    <option value="50">50 Leaves</option>
                                    <option value="100">100 Leaves</option>
                                </select>
                            </div>
                        )}

                        {/* Credit limit fields */}
                        {service.id === "credit-limit" && (<>
                            <div style={{ marginBottom: 18 }}>
                                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: service.accent, marginBottom: 7 }}>
                                    Select Credit Card
                                </label>
                                {loadingCards ? <LoadingField text="Loading cards…" /> : (
                                    <select
                                        className="form-select"
                                        style={{ borderColor: fieldBorderColor(formData.selectedCardNumber) }}
                                        value={formData.selectedCardNumber}
                                        disabled={!formData.accountNumber || !cards.length || isSelectedAccountInactive}
                                        onChange={e => setFormData({ ...formData, selectedCardNumber: e.target.value })}
                                    >
                                        <option value="">{!formData.accountNumber ? "First select an account" : !cards.length ? "No credit cards found" : "— Select card —"}</option>
                                        {cards.map(c => <option key={c.cardNumber} value={c.cardNumber}>{c.display}</option>)}
                                    </select>
                                )}
                            </div>
                            {selectedCardDetails && (
                                <div style={{
                                    display: "flex", justifyContent: "space-between", alignItems: "center",
                                    padding: "12px 16px", borderRadius: 10,
                                    border: `1px solid ${service.accentBorder}`,
                                    background: service.accentDim, marginBottom: 18,
                                }}>
                                    <span style={{ color: T.muted, fontSize: 13 }}>Current Limit</span>
                                    <span style={{ color: service.accent, fontWeight: 700, fontSize: 16, fontFamily: "'JetBrains Mono', monospace" }}>
                                        ₹{Number(selectedCardDetails.currentLimit || 0).toLocaleString()}
                                    </span>
                                </div>
                            )}
                            <div style={{ marginBottom: 18 }}>
                                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: service.accent, marginBottom: 7 }}>
                                    Requested New Limit (₹)
                                </label>
                                <input
                                    type="number" min="0" step="1000"
                                    className="form-input"
                                    style={{ borderColor: limitError ? T.danger : fieldBorderColor(formData.requestedLimit) }}
                                    value={formData.requestedLimit}
                                    disabled={!selectedCardDetails || isSelectedAccountInactive}
                                    placeholder="Enter desired limit"
                                    onChange={e => { setFormData({ ...formData, requestedLimit: e.target.value }); setLimitError(validateLimit(e.target.value)); }}
                                />
                                {limitError && (
                                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, padding: "8px 12px", borderRadius: 8, background: T.dangerBg, color: T.danger, border: `1px solid rgba(239,68,68,0.25)`, fontSize: 12.5, fontWeight: 500 }}>
                                        <FaExclamationTriangle size={11} /> {limitError}
                                    </div>
                                )}
                                {!limitError && formData.requestedLimit && Number(formData.requestedLimit) > Number(selectedCardDetails?.currentLimit || 0) && (
                                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, padding: "8px 12px", borderRadius: 8, background: T.successBg, color: T.success, border: `1px solid rgba(34,197,94,0.25)`, fontSize: 12.5, fontWeight: 500 }}>
                                        <FaCheckCircle size={11} /> Valid amount
                                    </div>
                                )}
                            </div>
                        </>)}

                        {/* Lost card fields */}
                        {service.id === "stolen-card" && (<>
                            <div style={{ marginBottom: 18 }}>
                                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: service.accent, marginBottom: 7 }}>
                                    Select Lost Card
                                </label>
                                {loadingCards ? <LoadingField text="Loading cards…" /> : (
                                    <select
                                        className="form-select"
                                        style={{ borderColor: fieldBorderColor(formData.selectedCardNumber) }}
                                        value={formData.selectedCardNumber}
                                        disabled={!formData.accountNumber || !cards.length || isSelectedAccountInactive}
                                        onChange={e => setFormData({ ...formData, selectedCardNumber: e.target.value })}
                                    >
                                        <option value="">{!formData.accountNumber ? "First select an account" : !cards.length ? "No active cards found" : "— Select card —"}</option>
                                        {cards.map(c => <option key={c.cardNumber} value={c.cardNumber}>{c.display}</option>)}
                                    </select>
                                )}
                            </div>
                            <div style={{ marginBottom: 18 }}>
                                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: service.accent, marginBottom: 7 }}>
                                    Date Lost
                                </label>
                                <input
                                    type="date"
                                    className="form-input"
                                    style={{ borderColor: fieldBorderColor(formData.dateLost), colorScheme: "dark" }}
                                    value={formData.dateLost}
                                    max={new Date().toISOString().split("T")[0]}
                                    disabled={isSelectedAccountInactive}
                                    onChange={e => setFormData({ ...formData, dateLost: e.target.value })}
                                />
                            </div>
                        </>)}

                        {/* General query */}
                        {service.id === "general-query" && (
                            <div style={{ marginBottom: 18 }}>
                                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: service.accent, marginBottom: 7 }}>
                                    Your Query
                                </label>
                                <textarea
                                    rows={4}
                                    className="form-textarea"
                                    placeholder={isSelectedAccountInactive ? "Cannot submit query with inactive account" : "Type your question here…"}
                                    style={{ borderColor: fieldBorderColor(formData.queries) }}
                                    value={formData.queries}
                                    disabled={isSelectedAccountInactive}
                                    onChange={e => setFormData({ ...formData, queries: e.target.value })}
                                />
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div style={{
                        display: "flex", gap: 10,
                        padding: "16px 22px 22px",
                        borderTop: `1px solid ${T.navyBorder}`,
                    }}>
                        <button className="modal-cancel-btn" onClick={onClose} disabled={submitting}>
                            Cancel
                        </button>
                        {isSelectedAccountInactive ? (
                            <button className="modal-submit-btn" style={{ background: service.gradient }} disabled>
                                <FaLock size={12} /> Inactive Account
                            </button>
                        ) : (
                            <button
                                className="modal-submit-btn"
                                style={{ background: service.gradient }}
                                disabled={isSubmitDisabled()}
                                onClick={handleSubmit}
                            >
                                {submitting
                                    ? <><Spinner />&nbsp;Processing…</>
                                    : <>Submit Request &nbsp;<FaArrowRight size={12} /></>
                                }
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    // ── Render ──────────────────────────────────────────────────────────────
    return (
        <div style={{
            minHeight: "100vh",
            background: T.navyDeep,
            padding: "40px 32px 60px",
            fontFamily: "'DM Sans', sans-serif",
            maxWidth: 1180,
            margin: "0 auto",
            color: T.offWhite,
        }}>

            {/* ── Page Header ─────────────────────────────────────────────── */}
            <div className="fade-up" style={{ textAlign: "center", marginBottom: 44 }}>
                {/* Badge */}
                <div style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: T.navyMid,
                    border: `1px solid ${T.navyBorder}`,
                    color: T.gold,
                    fontSize: 11, fontWeight: 700,
                    letterSpacing: "0.12em",
                    padding: "5px 16px",
                    borderRadius: 30,
                    marginBottom: 18,
                }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.gold, animation: "pulseGlow 2s infinite" }} />
                    SELF-SERVICE PORTAL
                </div>

                <h1 style={{
                    margin: "0 0 12px",
                    fontSize: 40,
                    fontWeight: 700,
                    color: T.white,
                    fontFamily: "'Playfair Display', serif",
                    letterSpacing: "-0.02em",
                }}>
                    Banking <span style={{ color: T.gold }}>Services</span>
                </h1>

                <p style={{ margin: 0, color: T.muted, fontSize: 15 }}>
                    Manage your banking requests securely from one place
                </p>

                {/* Gold divider */}
                <div style={{
                    height: 1,
                    background: `linear-gradient(90deg, transparent, ${T.gold}, transparent)`,
                    maxWidth: 300, margin: "24px auto 0", opacity: 0.4,
                }} />
            </div>

            {/* ── Grid ────────────────────────────────────────────────────── */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 24,
            }}>
                {SERVICES.map((svc, i) => (
                    <ServiceCard key={svc.id} svc={svc} index={i} onClick={() => setShowServiceForm(svc)} />
                ))}
            </div>

            {/* Modal */}
            {showServiceForm && (
                <ServiceForm service={showServiceForm} onClose={() => setShowServiceForm(null)} />
            )}
        </div>
    );
};

// ─── Service Card ─────────────────────────────────────────────────────────────
const ServiceCard = ({ svc, index, onClick }) => (
    <div
        className="svc-card"
        style={{ "--delay": `${index * 80}ms`, "--accent-color": svc.accent }}
        onClick={onClick}
    >
        {/* Gradient top strip */}
        <div className="svc-gold-strip" style={{ background: svc.gradient }} />

        <div style={{ padding: "24px 24px 20px" }}>
            {/* Icon + tag */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <div
                    className="svc-icon-wrap"
                    style={{ background: svc.accentDim, border: `1px solid ${svc.accentBorder}` }}
                >
                    <svc.icon size={22} color={svc.accent} />
                </div>
                <span
                    className="svc-tag-badge"
                    style={{ color: svc.accent, background: svc.accentDim, border: `1px solid ${svc.accentBorder}` }}
                >
                    {svc.tag}
                </span>
            </div>

            <h3 style={{
                margin: "0 0 10px", fontSize: 19, fontWeight: 700,
                color: T.white, fontFamily: "'Playfair Display', serif",
                letterSpacing: "-0.01em",
            }}>
                {svc.title}
            </h3>
            <p style={{ margin: 0, fontSize: 13.5, color: T.muted, lineHeight: 1.65 }}>
                {svc.description}
            </p>
        </div>

        {/* CTA button */}
        <div style={{ padding: "0 24px 24px", marginTop: "auto" }}>
            {/* Thin gold divider above button */}
            <div style={{
                height: 1,
                background: `linear-gradient(90deg, transparent, ${svc.accent}40, transparent)`,
                marginBottom: 16,
            }} />
            <button className="svc-apply-btn" style={{ background: svc.gradient }}>
                <span>Apply Now</span>
                <FaArrowRight size={13} className="svc-arrow-icon" />
            </button>
        </div>

        {/* Hover glow overlay */}
        <div
            className="svc-glow-overlay"
            style={{ background: `radial-gradient(circle at 50% 0%, ${svc.accent}14 0%, transparent 70%)` }}
        />
    </div>
);

// ─── Helpers ──────────────────────────────────────────────────────────────────
const LoadingField = ({ text = "Loading accounts…" }) => (
    <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "12px 14px", borderRadius: 10,
        border: `1.5px solid ${T.navyBorder}`,
        background: T.navyMid,
    }}>
        <Spinner />
        <span style={{ fontSize: 13, color: T.muted }}>{text}</span>
    </div>
);

const Spinner = ({ size = 18 }) => (
    <span style={{
        display: "inline-block", width: size, height: size, minWidth: size,
        border: `2px solid rgba(245,166,35,0.2)`,
        borderTopColor: T.gold,
        borderRadius: "50%",
        animation: "spin 0.75s linear infinite",
    }} />
);

export default Services;
