// import { useState, useEffect } from "react";
// import {
//     FaBook,
//     FaCreditCard,
//     FaShieldAlt,
//     FaQuestionCircle,
//     FaArrowRight,
//     FaCheckCircle,
//     FaExclamationTriangle,
//     FaFileInvoiceDollar,
//     FaHistory,
//     FaClock,
//     FaChevronRight,
//     FaSearch,
//     FaFilter,
//     FaRegCreditCard,
//     FaLock,
//     FaMobileAlt,
//     FaWallet,
//     FaUniversity,
//     FaExchangeAlt,
//     FaPercent,
//     FaPlus,
//     FaMinus,
//     FaPen,
//     FaFileAlt,
//     FaDownload,
//     FaPrint,
//     FaShare
// } from "react-icons/fa";
// import API from "../../api";
// import { useSnackbar } from "../../Context/SnackbarContext";

// const Services = () => {
//     const [selectedCategory, setSelectedCategory] = useState("all");
//     const [searchQuery, setSearchQuery] = useState("");
//     const [showServiceForm, setShowServiceForm] = useState(null);
//     const [appliedServices, setAppliedServices] = useState([]);

//     // Sample active requests
//     const [activeRequests] = useState([
//         {
//             id: "REQ001",
//             service: "Cheque Book",
//             status: "Processing",
//             appliedDate: "25 Mar 2026",
//             estimatedDate: "28 Mar 2026",
//             reference: "CHQ-2026-12345"
//         },
//         {
//             id: "REQ002",
//             service: "Credit Card Limit Increase",
//             status: "Under Review",
//             appliedDate: "23 Mar 2026",
//             estimatedDate: "30 Mar 2026",
//             reference: "CCL-2026-67890"
//         }
//     ]);

//     const serviceCategories = [
//         { id: "all", name: "All Services", icon: FaFileAlt },
//         { id: "cheque", name: "Cheque Services", icon: FaBook },
//         { id: "card", name: "Card Services", icon: FaCreditCard },
//         { id: "security", name: "Security & Fraud", icon: FaShieldAlt },
//         { id: "queries", name: "Queries & Support", icon: FaQuestionCircle }
//     ];

//     const services = [
//         // Cheque Services
//         {
//             id: "cheque-book",
//             category: "cheque",
//             title: "Cheque Book Request",
//             description: "Request a new cheque book for your savings or current account",
//             icon: FaBook,
//             color: "#3b82f6",
//             bgColor: "#eff6ff",
//             processingTime: "2-3 business days",
//             fee: "Free",
//             eligibility: "All account holders",
//             documents: ["None required"],
//             popular: true
//         },
//         {
//             id: "credit-limit",
//             category: "card",
//             title: "Increase Credit Card Limit",
//             description: "Request for enhancement of your credit card limit",
//             icon: FaPercent,
//             color: "#8b5cf6",
//             bgColor: "#f3e8ff",
//             processingTime: "24-48 hours",
//             fee: "Free",
//             eligibility: "Card active for 6+ months",
//             popular: true
//         },
//         {
//             id: "stolen-card",
//             category: "card",
//             title: "Report Stolen/Lost Card",
//             description: "Immediate blocking of lost or stolen debit/credit card",
//             icon: FaShieldAlt,
//             color: "#ef4444",
//             bgColor: "#fee2e2",
//             processingTime: "Immediate",
//             fee: "₹100 (Replacement fee)",
//             urgent: true
//         },

//         // Queries & Support
//         {
//             id: "general-query",
//             category: "queries",
//             title: "General Query",
//             description: "Ask questions about banking products and services",
//             icon: FaQuestionCircle,
//             color: "#64748b",
//             bgColor: "#f1f5f9",
//             processingTime: "24 hours",
//             fee: "Free"
//         },
//     ];

//     const filteredServices = services.filter(service => {
//         const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
//         const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             service.description.toLowerCase().includes(searchQuery.toLowerCase());
//         return matchesCategory && matchesSearch;
//     });

//     const getStatusColor = (status) => {
//         switch (status) {
//             case "Processing": return "#3b82f6";
//             case "Under Review": return "#f59e0b";
//             case "Completed": return "#10b981";
//             default: return "#64748b";
//         }
//     };

//     const ServiceForm = ({ service, onClose }) => {
//         const { showSnackbar } = useSnackbar();
//         const [formData, setFormData] = useState({
//             accountNumber: "",
//             reason: "",
//             urgent: false,
//             deliveryAddress: "Registered Address",
//             agreeTerms: false,
//             noOfLeaves: "",
//             dateLost: "",
//             selectedCardNumber: "",
//             requestedLimit: ""
//         });

//         const [accounts, setAccounts] = useState([]);
//         const [cards, setCards] = useState([]);
//         const [submitting, setSubmitting] = useState(false);

//         // Load accounts from localStorage
//         useEffect(() => {
//             const accs = [];
//             const savings = localStorage.getItem("savingsAccount");
//             const current = localStorage.getItem("currentAccount");

//             if (savings) accs.push({ type: "Savings", number: savings });
//             if (current) accs.push({ type: "Current", number: current });

//             setAccounts(accs);
//             if (accs.length > 0) {
//                 setFormData(prev => ({ ...prev, accountNumber: accs[0].number }));
//             }
//         }, []);

//         // Fetch cards for all accounts
//         useEffect(() => {
//             const fetchAllCards = async () => {
//                 if (accounts.length === 0) return;

//                 let allCards = [];
//                 for (const acc of accounts) {
//                     try {
//                         const response = await API.get(`account/userCardList/${acc.number}`);
//                         if (response.data && response.data.status && Array.isArray(response.data.data)) {
//                             const accCards = response.data.data.map(card => ({
//                                 ...card,
//                                 accountNumber: acc.number, // Link card to account
//                                 display: `${card.cardTypeName || "Card"} - ${String(card.cardNumber).slice(-4)}`
//                             }));
//                             allCards = [...allCards, ...accCards];
//                         }
//                     } catch (error) {
//                         console.error(`Error fetching cards for account ${acc.number}:`, error);
//                     }
//                 }
//                 setCards(allCards);
//             };

//             fetchAllCards();
//         }, [accounts]);

//         const handleSubmit = async () => {
//             if (service.id === "cheque-book") {
//                 setSubmitting(true);
//                 try {
//                     const payload = {
//                         noOfLeaves: Number(formData.noOfLeaves),
//                         accountNumber: Number(formData.accountNumber)
//                     };
//                     console.log("Sending Cheque Request:", payload);
//                     const response = await API.post("chequeRequest/save", payload);
//                     console.log("Cheque Request Response:", response.data);

//                     showSnackbar("success", "Cheque Book Requested Successfully!");

//                     setAppliedServices([...appliedServices, {
//                         ...service,
//                         id: Math.random().toString(),
//                         status: "Processing",
//                         date: new Date().toLocaleDateString()
//                     }]);
//                     onClose();
//                 } catch (error) {
//                     console.error("Error requesting cheque book:", error);
//                     showSnackbar("error", "Failed to request cheque book. Please try again.");
//                 } finally {
//                     setSubmitting(false);
//                 }

//             } else if (service.id === "general-query") {
//                 setSubmitting(true);
//                 try {
//                     const payload = {
//                         customerQuery: formData.queries,
//                         accountNumber: Number(formData.accountNumber)
//                     };
//                     console.log("Sending Query Request:", payload);
//                     const response = await API.post("queriesResponse/save", payload);
//                     console.log("Query Request Response:", response.data);

//                     showSnackbar("success", "Query Submitted Successfully!");

//                     setAppliedServices([...appliedServices, {
//                         ...service,
//                         id: Math.random().toString(),
//                         status: "Received",
//                         date: new Date().toLocaleDateString()
//                     }]);
//                     onClose();
//                 } catch (error) {
//                     console.error("Error submitting query:", error);
//                     showSnackbar("error", "Failed to submit query. Please try again.");
//                 } finally {
//                     setSubmitting(false);
//                 }
//             } else if (service.id === "stolen-card") {
//                 setSubmitting(true);
//                 try {
//                     // Find the full card object to get the account number
//                     const selectedCard = cards.find(c => String(c.cardNumber) === String(formData.selectedCardNumber));

//                     if (!selectedCard) {
//                         showSnackbar("error", "Please select a valid card.");
//                         setSubmitting(false);
//                         return;
//                     }

//                     const payload = {
//                         lostCardStolenDate: formData.dateLost,
//                         lostCardNumber: Number(formData.selectedCardNumber),
//                         accountNumber: Number(selectedCard.accountNumber)
//                     };
//                     console.log("Sending Lost Card Report:", payload);
//                     const response = await API.post("lostCard/save", payload);
//                     console.log("Lost Card Response:", response.data);

//                     showSnackbar("success", "Card Reported Lost Successfully!");

//                     setAppliedServices([...appliedServices, {
//                         ...service,
//                         id: Math.random().toString(),
//                         status: "Blocked",
//                         date: new Date().toLocaleDateString()
//                     }]);
//                     onClose();
//                 } catch (error) {
//                     console.error("Error reporting lost card:", error);
//                     showSnackbar("error", "Failed to report lost card. Please try again.");
//                 } finally {
//                     setSubmitting(false);
//                 }

//             } else if (service.id === "credit-limit") {
//                 setSubmitting(true);
//                 try {
//                     // Find the full card object to get the account number
//                     const selectedCard = cards.find(c => String(c.cardNumber) === String(formData.selectedCardNumber));

//                     if (!selectedCard) {
//                         showSnackbar("error", "Please select a valid card.");
//                         setSubmitting(false);
//                         return;
//                     }

//                     const payload = {
//                         requestedLimit: Number(formData.requestedLimit),
//                         accountNumber: Number(selectedCard.accountNumber)
//                     };
//                     console.log("Sending Credit Limit Request:", payload);
//                     const response = await API.post("creditLimit/save", payload);
//                     console.log("Credit Limit Response:", response.data);

//                     showSnackbar("success", "Credit Limit Increase Requested Successfully!");

//                     setAppliedServices([...appliedServices, {
//                         ...service,
//                         id: Math.random().toString(),
//                         status: "Under Review",
//                         date: new Date().toLocaleDateString()
//                     }]);
//                     onClose();
//                 } catch (error) {
//                     console.error("Error requesting credit limit:", error);
//                     showSnackbar("error", "Failed to request credit limit. Please try again.");
//                 } finally {
//                     setSubmitting(false);
//                 }
//             } else {
//                 // Mock submission for other services
//                 setAppliedServices([...appliedServices, { ...service, id: Math.random().toString() }]);
//                 onClose();
//                 showSnackbar("success", "Service requested successfully (Mock)");
//             }
//         };

//         return (
//             <div style={styles.formOverlay}>
//                 <div style={styles.formContainer}>
//                     <div style={styles.formHeader}>
//                         <div style={{ ...styles.formIcon, backgroundColor: service.bgColor, color: service.color }}>
//                             <service.icon size={24} />
//                         </div>
//                         <div style={styles.formTitleSection}>
//                             <h3 style={styles.formTitle}>{service.title}</h3>
//                             <p style={styles.formSubtitle}>{service.description}</p>
//                         </div>
//                         <button style={styles.formClose} onClick={onClose}>×</button>
//                     </div>

//                     <div style={styles.formContent}>
//                         <div style={styles.formInfoBar}>
//                             <div style={styles.formInfoItem}>
//                                 <span style={styles.formInfoLabel}>Processing Time</span>
//                                 <span style={styles.formInfoValue}>{service.processingTime}</span>
//                             </div>
//                             <div style={styles.formInfoItem}>
//                                 <span style={styles.formInfoLabel}>Fee</span>
//                                 <span style={styles.formInfoValue}>{service.fee}</span>
//                             </div>
//                             {service.urgent && (
//                                 <div style={styles.urgentBadge}>
//                                     <FaExclamationTriangle size={12} />
//                                     Urgent Service
//                                 </div>
//                             )}
//                         </div>

//                         {service.id === "cheque-book" && (
//                             <div style={styles.formGroup}>
//                                 <label style={styles.formLabel}>Select Account</label>
//                                 <select
//                                     style={styles.formSelect}
//                                     value={formData.accountNumber}
//                                     onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
//                                 >
//                                     {accounts.map(acc => (
//                                         <option key={acc.number} value={acc.number}>
//                                             {acc.type} Account - {acc.number}
//                                         </option>
//                                     ))}
//                                     {accounts.length === 0 && <option value="">No accounts found</option>}
//                                 </select>
//                             </div>
//                         )}

//                         {service.id === "credit-limit" && (
//                             <>
//                                 <div style={styles.formGroup}>
//                                     <label style={styles.formLabel}>Select Card</label>
//                                     <select
//                                         style={styles.formSelect}
//                                         value={formData.selectedCardNumber}
//                                         onChange={(e) => setFormData({ ...formData, selectedCardNumber: e.target.value })}
//                                     >
//                                         <option value="">Select a card</option>
//                                         {cards.map(card => (
//                                             <option key={card.cardNumber} value={card.cardNumber}>
//                                                 {card.cardTypeName || "Card"} - {String(card.cardNumber).slice(-4)}
//                                             </option>
//                                         ))}
//                                         {cards.length === 0 && <option value="" disabled>No cards found</option>}
//                                     </select>
//                                 </div>
//                                 <div style={styles.formGroup}>
//                                     <label style={styles.formLabel}>Requested New Limit</label>
//                                     <div style={styles.formInputGroup}>
//                                         <span style={styles.formCurrency}>₹</span>
//                                         <input
//                                             type="number"
//                                             style={styles.formInput}
//                                             value={formData.requestedLimit}
//                                             onChange={(e) => setFormData({ ...formData, requestedLimit: e.target.value })}
//                                             placeholder="Enter desired limit"
//                                             min="0"
//                                         />
//                                     </div>
//                                     <span style={styles.formHint}>Maximum limit: ₹10,00,000</span>
//                                 </div>
//                             </>
//                         )}

//                         {service.id === "cheque-book" && (
//                             <>
//                                 <div style={styles.formGroup}>
//                                     <label style={styles.formLabel}>Number of Leaves</label>
//                                     <input
//                                         type="number"
//                                         style={styles.formInput}
//                                         value={formData.noOfLeaves}
//                                         onChange={(e) => setFormData({ ...formData, noOfLeaves: e.target.value })}
//                                         placeholder="Enter number of leaves"
//                                         min="1"
//                                     />
//                                 </div>
//                                 <div style={styles.formGroup}>
//                                     <label style={styles.formLabel}>Queries (Optional)</label>
//                                     <textarea
//                                         style={styles.formTextarea}
//                                         value={formData.queries || ""}
//                                         onChange={(e) => setFormData({ ...formData, queries: e.target.value })}
//                                         placeholder="Any specific queries?"
//                                         rows="2"
//                                     />
//                                 </div>
//                             </>
//                         )}

//                         {service.id === "stolen-card" && (
//                             <>
//                                 <div style={styles.formGroup}>
//                                     <label style={styles.formLabel}>Select Lost Card</label>
//                                     <select
//                                         style={styles.formSelect}
//                                         value={formData.selectedCardNumber}
//                                         onChange={(e) => setFormData({ ...formData, selectedCardNumber: e.target.value })}
//                                     >
//                                         <option value="">Select a card</option>
//                                         {cards.map(card => (
//                                             <option key={card.cardNumber} value={card.cardNumber}>
//                                                 {card.cardTypeName || "Card"} - {String(card.cardNumber).slice(-4)}
//                                             </option>
//                                         ))}
//                                         {cards.length === 0 && <option value="" disabled>No cards found</option>}
//                                     </select>
//                                 </div>
//                                 <div style={styles.formGroup}>
//                                     <label style={styles.formLabel}>Date Lost</label>
//                                     <input
//                                         type="date"
//                                         style={styles.formInput}
//                                         value={formData.dateLost}
//                                         onChange={(e) => setFormData({ ...formData, dateLost: e.target.value })}
//                                         max={new Date().toISOString().split("T")[0]}
//                                     />
//                                 </div>
//                             </>
//                         )}

//                         {service.id === "general-query" && (
//                             <>
//                                 <div style={styles.formGroup}>
//                                     <label style={styles.formLabel}>Select Account</label>
//                                     <select
//                                         style={styles.formSelect}
//                                         value={formData.accountNumber}
//                                         onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
//                                     >
//                                         {accounts.map(acc => (
//                                             <option key={acc.number} value={acc.number}>
//                                                 {acc.type} Account - {acc.number}
//                                             </option>
//                                         ))}
//                                         {accounts.length === 0 && <option value="">No accounts found</option>}
//                                     </select>
//                                 </div>
//                                 <div style={styles.formGroup}>
//                                     <label style={styles.formLabel}>Your Query</label>
//                                     <textarea
//                                         style={styles.formTextarea}
//                                         value={formData.queries || ""}
//                                         onChange={(e) => setFormData({ ...formData, queries: e.target.value })}
//                                         placeholder="Type your question here..."
//                                         rows="4"
//                                     />
//                                 </div>
//                             </>
//                         )}

//                         <div style={styles.formGroup}>
//                             <label style={styles.checkboxLabel}>
//                                 <input
//                                     type="checkbox"
//                                     style={styles.checkbox}
//                                     checked={formData.agreeTerms}
//                                     onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
//                                 />
//                                 I confirm that the information provided is correct and I agree to the terms and conditions
//                             </label>
//                         </div>
//                     </div>

//                     <div style={styles.formFooter}>
//                         <button style={styles.cancelBtn} onClick={onClose}>Cancel</button>
//                         <button
//                             style={{
//                                 ...styles.submitBtn,
//                                 opacity: (formData.agreeTerms && !submitting &&
//                                     (service.id !== "cheque-book" || formData.noOfLeaves) &&
//                                     (service.id !== "general-query" || formData.queries) &&
//                                     (service.id !== "stolen-card" || formData.selectedCardNumber) &&
//                                     (service.id !== "credit-limit" || (formData.selectedCardNumber && formData.requestedLimit))
//                                 ) ? 1 : 0.5,
//                                 cursor: (formData.agreeTerms && !submitting &&
//                                     (service.id !== "cheque-book" || formData.noOfLeaves) &&
//                                     (service.id !== "general-query" || formData.queries) &&
//                                     (service.id !== "stolen-card" || formData.selectedCardNumber) &&
//                                     (service.id !== "credit-limit" || (formData.selectedCardNumber && formData.requestedLimit))
//                                 ) ? 'pointer' : 'not-allowed'
//                             }}
//                             disabled={
//                                 !formData.agreeTerms ||
//                                 submitting ||
//                                 (service.id === "cheque-book" && !formData.noOfLeaves) ||
//                                 (service.id === "general-query" && !formData.queries) ||
//                                 (service.id === "stolen-card" && !formData.selectedCardNumber) ||
//                                 (service.id === "credit-limit" && (!formData.selectedCardNumber || !formData.requestedLimit))
//                             }
//                             onClick={handleSubmit}
//                         >
//                             {submitting ? "Submitting..." : "Submit Request"}
//                             {!submitting && <FaArrowRight style={{ marginLeft: '8px' }} size={14} />}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     return (
//         <div style={styles.container}>
//             {/* Page Header */}
//             <div style={styles.header}>
//                 <div style={styles.headerLeft}>
//                     <h1 style={styles.title}>Services</h1>
//                     <p style={styles.subtitle}>
//                         Manage all your banking service requests from one place
//                     </p>
//                 </div>
//                 <div style={styles.statsCard}>
//                     <div style={styles.statItem}>
//                         <span style={styles.statLabel}>Active Requests</span>
//                         <span style={styles.statValue}>{activeRequests.length}</span>
//                     </div>
//                     <div style={styles.statDivider} />
//                     <div style={styles.statItem}>
//                         <span style={styles.statLabel}>Services Available</span>
//                         <span style={styles.statValue}>{services.length}</span>
//                     </div>
//                 </div>
//             </div>

//             <div style={styles.servicesGrid}>
//                 {filteredServices.map((service) => (
//                     <div key={service.id} style={styles.serviceCard}>
//                         {service.popular && (
//                             <span style={styles.popularBadge}>Most Popular</span>
//                         )}
//                         {service.urgent && (
//                             <span style={styles.urgentBadgeCard}>Urgent</span>
//                         )}
//                         <div style={styles.serviceIconWrapper}>
//                             <div style={{
//                                 ...styles.serviceIcon,
//                                 backgroundColor: service.bgColor,
//                                 color: service.color
//                             }}>
//                                 <service.icon size={24} />
//                             </div>
//                             <div style={styles.serviceCategory}>
//                                 {serviceCategories.find(cat => cat.id === service.category)?.name}
//                             </div>
//                         </div>

//                         <div style={styles.serviceContent}>
//                             <h3 style={styles.serviceTitle}>{service.title}</h3>
//                             <p style={styles.serviceDescription}>{service.description}</p>

//                             <div style={styles.serviceMeta}>
//                                 <div style={styles.metaItem}>
//                                     <FaClock size={12} color="#64748b" />
//                                     <span style={styles.metaText}>{service.processingTime}</span>
//                                 </div>
//                                 <div style={styles.metaItem}>
//                                     <span style={styles.metaText}>{service.fee}</span>
//                                 </div>
//                             </div>

//                             {service.documents && (
//                                 <div style={styles.documents}>
//                                     <span style={styles.documentsLabel}>Required:</span>
//                                     {service.documents.map((doc, idx) => (
//                                         <span key={idx} style={styles.documentTag}>{doc}</span>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>

//                         <button
//                             style={styles.applyBtn}
//                             onClick={() => setShowServiceForm(service)}
//                         >
//                             <span>Apply Now</span>
//                             <FaChevronRight size={12} />
//                         </button>
//                     </div>
//                 ))}
//             </div>

//             {/* Service Form Modal */}
//             {showServiceForm && (
//                 <ServiceForm
//                     service={showServiceForm}
//                     onClose={() => setShowServiceForm(null)}
//                 />
//             )}
//         </div>
//     );
// };

// const styles = {
//     container: {
//         padding: "24px",
//         maxWidth: "1400px",
//         margin: "0 auto",
//         fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
//     },
//     header: {
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "flex-start",
//         marginBottom: "32px",
//         flexWrap: "wrap",
//         gap: "20px",
//     },
//     headerLeft: {
//         flex: 1,
//     },
//     title: {
//         fontSize: "32px",
//         fontWeight: "700",
//         color: "var(--color-text)",
//         margin: "0 0 8px 0",
//         letterSpacing: "-0.02em",
//     },
//     subtitle: {
//         fontSize: "16px",
//         color: "var(--color-muted)",
//         margin: 0,
//     },
//     statsCard: {
//         display: "flex",
//         alignItems: "center",
//         gap: "24px",
//         padding: "16px 24px",
//         background: "var(--color-surface)",
//         borderRadius: "16px",
//         border: "1px solid var(--color-border)",
//         boxShadow: "var(--shadow-sm)",
//     },
//     statItem: {
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//     },
//     statLabel: {
//         fontSize: "12px",
//         color: "var(--color-muted)",
//         marginBottom: "4px",
//     },
//     statValue: {
//         fontSize: "24px",
//         fontWeight: "700",
//         color: "var(--color-text)",
//     },
//     statDivider: {
//         width: "1px",
//         height: "40px",
//         background: "var(--color-border)",
//     },
//     activeRequests: {
//         marginBottom: "40px",
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
//     sectionTitleWrapper: {
//         display: "flex",
//         alignItems: "center",
//         gap: "12px",
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
//     requestsGrid: {
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//         gap: "16px",
//     },
//     requestCard: {
//         padding: "20px",
//         background: "var(--color-bg)",
//         borderRadius: "16px",
//         border: "1px solid var(--color-border)",
//     },
//     requestHeader: {
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: "12px",
//     },
//     requestRef: {
//         fontSize: "12px",
//         color: "var(--color-text-secondary)",
//         fontWeight: "500",
//     },
//     requestStatus: {
//         fontSize: "11px",
//         fontWeight: "600",
//         padding: "4px 10px",
//         borderRadius: "20px",
//     },
//     requestService: {
//         fontSize: "16px",
//         fontWeight: "600",
//         color: "var(--color-text)",
//         margin: "0 0 12px 0",
//     },
//     requestDetails: {
//         display: "flex",
//         flexDirection: "column",
//         gap: "6px",
//         marginBottom: "12px",
//     },
//     requestDetail: {
//         display: "flex",
//         alignItems: "center",
//         gap: "8px",
//     },
//     requestDetailText: {
//         fontSize: "13px",
//         color: "var(--color-text-secondary)",
//     },
//     progressBar: {
//         width: "100%",
//         height: "4px",
//         background: "var(--color-border)",
//         borderRadius: "2px",
//         overflow: "hidden",
//     },
//     progressFill: {
//         height: "100%",
//         borderRadius: "2px",
//     },
//     categories: {
//         display: "flex",
//         gap: "12px",
//         marginBottom: "24px",
//         flexWrap: "wrap",
//     },
//     categoryBtn: {
//         display: "flex",
//         alignItems: "center",
//         gap: "8px",
//         padding: "10px 20px",
//         background: "var(--color-surface)",
//         border: "1px solid var(--color-border)",
//         borderRadius: "40px",
//         color: "var(--color-text-secondary)",
//         fontSize: "14px",
//         fontWeight: "500",
//         cursor: "pointer",
//         transition: "all 0.2s",
//     },
//     categoryBtnActive: {
//         background: "#4361ee",
//         color: "#ffffff",
//         borderColor: "#4361ee",
//     },
//     searchSection: {
//         display: "flex",
//         gap: "12px",
//         marginBottom: "32px",
//     },
//     searchContainer: {
//         flex: 1,
//         display: "flex",
//         alignItems: "center",
//         gap: "12px",
//         padding: "0 20px",
//         height: "50px",
//         background: "var(--color-surface)",
//         border: "1px solid var(--color-border)",
//         borderRadius: "14px",
//         transition: "all 0.2s",
//     },
//     searchIcon: {
//         flexShrink: 0,
//         color: "var(--color-muted)",
//     },
//     searchInput: {
//         flex: 1,
//         border: "none",
//         outline: "none",
//         fontSize: "15px",
//         color: "var(--color-text)",
//         background: "transparent",
//         padding: 0,
//     },
//     filterBtn: {
//         display: "flex",
//         alignItems: "center",
//         gap: "8px",
//         padding: "0 24px",
//         height: "50px",
//         background: "var(--color-surface)",
//         border: "1px solid var(--color-border)",
//         borderRadius: "14px",
//         color: "var(--color-text-secondary)",
//         fontSize: "14px",
//         fontWeight: "500",
//         cursor: "pointer",
//     },
//     servicesGrid: {
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
//         gap: "24px",
//         marginBottom: "40px",
//     },
//     serviceCard: {
//         position: "relative",
//         background: "var(--color-surface)",
//         borderRadius: "20px",
//         padding: "24px",
//         border: "1px solid var(--color-border)",
//         transition: "all 0.2s",
//         display: "flex",
//         flexDirection: "column",
//     },
//     popularBadge: {
//         position: "absolute",
//         top: "20px",
//         right: "24px",
//         padding: "4px 12px",
//         background: "#f59e0b",
//         color: "#ffffff",
//         fontSize: "11px",
//         fontWeight: "600",
//         borderRadius: "20px",
//     },
//     urgentBadgeCard: {
//         position: "absolute",
//         top: "20px",
//         right: "24px",
//         padding: "4px 12px",
//         background: "#ef4444",
//         color: "#ffffff",
//         fontSize: "11px",
//         fontWeight: "600",
//         borderRadius: "20px",
//     },
//     serviceIconWrapper: {
//         display: "flex",
//         alignItems: "center",
//         gap: "12px",
//         marginBottom: "16px",
//     },
//     serviceIcon: {
//         width: "56px",
//         height: "56px",
//         borderRadius: "16px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     serviceCategory: {
//         fontSize: "13px",
//         color: "var(--color-text-secondary)",
//         fontWeight: "500",
//         padding: "4px 12px",
//         background: "var(--color-bg)",
//         borderRadius: "20px",
//     },
//     serviceContent: {
//         flex: 1,
//     },
//     serviceTitle: {
//         fontSize: "18px",
//         fontWeight: "600",
//         color: "var(--color-text)",
//         margin: "0 0 8px 0",
//     },
//     serviceDescription: {
//         fontSize: "14px",
//         color: "var(--color-muted)",
//         lineHeight: "1.5",
//         margin: "0 0 16px 0",
//     },
//     serviceMeta: {
//         display: "flex",
//         gap: "16px",
//         marginBottom: "16px",
//     },
//     metaItem: {
//         display: "flex",
//         alignItems: "center",
//         gap: "6px",
//         fontSize: "13px",
//         color: "var(--color-text-secondary)",
//     },
//     metaText: {
//         fontSize: "13px",
//         fontWeight: "500",
//     },
//     documents: {
//         display: "flex",
//         alignItems: "center",
//         flexWrap: "wrap",
//         gap: "8px",
//         marginBottom: "20px",
//     },
//     documentsLabel: {
//         fontSize: "12px",
//         color: "var(--color-muted)",
//     },
//     documentTag: {
//         padding: "4px 10px",
//         background: "var(--color-bg)",
//         borderRadius: "20px",
//         fontSize: "11px",
//         fontWeight: "500",
//         color: "var(--color-text-secondary)",
//     },
//     applyBtn: {
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         width: "100%",
//         padding: "14px 20px",
//         background: "var(--color-bg)",
//         border: "1px solid var(--color-border)",
//         borderRadius: "12px",
//         color: "var(--color-text)",
//         fontSize: "14px",
//         fontWeight: "600",
//         cursor: "pointer",
//         transition: "all 0.2s",
//         marginTop: "auto",
//     },
//     // Form Styles
//     formOverlay: {
//         position: "fixed",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         background: "rgba(0,0,0,0.5)",
//         backdropFilter: "blur(4px)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         zIndex: 9999,
//         padding: "20px",
//     },
//     formContainer: {
//         width: "100%",
//         maxWidth: "600px",
//         maxHeight: "90vh",
//         overflowY: "auto",
//         background: "#ffffff",
//         borderRadius: "24px",
//         boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
//     },
//     formHeader: {
//         display: "flex",
//         alignItems: "center",
//         gap: "16px",
//         padding: "24px",
//         borderBottom: "1px solid #e2e8f0",
//         position: "relative",
//     },
//     formIcon: {
//         width: "56px",
//         height: "56px",
//         borderRadius: "16px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         flexShrink: 0,
//     },
//     formTitleSection: {
//         flex: 1,
//     },
//     formTitle: {
//         fontSize: "20px",
//         fontWeight: "700",
//         color: "#0f172a",
//         margin: "0 0 4px 0",
//     },
//     formSubtitle: {
//         fontSize: "14px",
//         color: "#64748b",
//         margin: 0,
//     },
//     formClose: {
//         position: "absolute",
//         top: "24px",
//         right: "24px",
//         width: "36px",
//         height: "36px",
//         borderRadius: "10px",
//         border: "1px solid #e2e8f0",
//         background: "#ffffff",
//         fontSize: "24px",
//         color: "#64748b",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         cursor: "pointer",
//     },
//     formContent: {
//         padding: "24px",
//     },
//     formInfoBar: {
//         display: "flex",
//         alignItems: "center",
//         gap: "20px",
//         padding: "16px",
//         background: "#f8fafc",
//         borderRadius: "12px",
//         marginBottom: "24px",
//         flexWrap: "wrap",
//     },
//     formInfoItem: {
//         display: "flex",
//         flexDirection: "column",
//         gap: "4px",
//     },
//     formInfoLabel: {
//         fontSize: "11px",
//         color: "#64748b",
//         textTransform: "uppercase",
//         letterSpacing: "0.5px",
//     },
//     formInfoValue: {
//         fontSize: "14px",
//         fontWeight: "600",
//         color: "#0f172a",
//     },
//     urgentBadge: {
//         display: "flex",
//         alignItems: "center",
//         gap: "6px",
//         padding: "6px 12px",
//         background: "#fee2e2",
//         color: "#ef4444",
//         borderRadius: "20px",
//         fontSize: "12px",
//         fontWeight: "600",
//     },
//     formGroup: {
//         marginBottom: "20px",
//     },
//     formLabel: {
//         display: "block",
//         fontSize: "14px",
//         fontWeight: "600",
//         color: "#0f172a",
//         marginBottom: "8px",
//     },
//     formInput: {
//         width: "100%",
//         padding: "12px 16px",
//         border: "1px solid #e2e8f0",
//         borderRadius: "12px",
//         fontSize: "15px",
//         color: "#0f172a",
//         background: "#ffffff",
//     },
//     formInputGroup: {
//         position: "relative",
//         display: "flex",
//         alignItems: "center",
//     },
//     formCurrency: {
//         position: "absolute",
//         left: "16px",
//         color: "#64748b",
//         fontWeight: "500",
//     },
//     formSelect: {
//         width: "100%",
//         padding: "12px 16px",
//         border: "1px solid #e2e8f0",
//         borderRadius: "12px",
//         fontSize: "15px",
//         color: "#0f172a",
//         background: "#ffffff",
//     },
//     formTextarea: {
//         width: "100%",
//         padding: "12px 16px",
//         border: "1px solid #e2e8f0",
//         borderRadius: "12px",
//         fontSize: "15px",
//         color: "#0f172a",
//         background: "#ffffff",
//         resize: "vertical",
//     },
//     formHint: {
//         display: "block",
//         fontSize: "12px",
//         color: "#64748b",
//         marginTop: "6px",
//     },
//     radioGroup: {
//         display: "flex",
//         flexDirection: "column",
//         gap: "12px",
//     },
//     radioLabel: {
//         display: "flex",
//         alignItems: "center",
//         gap: "8px",
//         fontSize: "15px",
//         color: "#0f172a",
//     },
//     checkboxLabel: {
//         display: "flex",
//         alignItems: "flex-start",
//         gap: "12px",
//         fontSize: "14px",
//         color: "#475569",
//         lineHeight: "1.5",
//     },
//     checkbox: {
//         marginTop: "2px",
//     },
//     formFooter: {
//         display: "flex",
//         gap: "12px",
//         padding: "24px",
//         borderTop: "1px solid #e2e8f0",
//     },
//     cancelBtn: {
//         flex: 1,
//         padding: "14px",
//         background: "#f1f5f9",
//         border: "1px solid #e2e8f0",
//         borderRadius: "12px",
//         color: "#475569",
//         fontSize: "15px",
//         fontWeight: "600",
//         cursor: "pointer",
//     },
//     submitBtn: {
//         flex: 2,
//         padding: "14px",
//         background: "linear-gradient(135deg, #4361ee, #3a0ca3)",
//         border: "none",
//         borderRadius: "12px",
//         color: "#ffffff",
//         fontSize: "15px",
//         fontWeight: "600",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         cursor: "pointer",
//     },
//     supportSection: {
//         marginTop: "40px",
//     },
//     supportCard: {
//         display: "flex",
//         alignItems: "center",
//         gap: "20px",
//         padding: "24px",
//         background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
//         borderRadius: "20px",
//         border: "1px solid #e2e8f0",
//         flexWrap: "wrap",
//     },
//     supportIcon: {
//         width: "56px",
//         height: "56px",
//         borderRadius: "16px",
//         background: "#ffffff",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     supportContent: {
//         flex: 1,
//     },
//     supportTitle: {
//         fontSize: "18px",
//         fontWeight: "600",
//         color: "#0f172a",
//         margin: "0 0 4px 0",
//     },
//     supportText: {
//         fontSize: "14px",
//         color: "#64748b",
//         margin: 0,
//     },
//     supportBtn: {
//         padding: "14px 28px",
//         background: "#4361ee",
//         border: "none",
//         borderRadius: "14px",
//         color: "#ffffff",
//         fontSize: "15px",
//         fontWeight: "600",
//         cursor: "pointer",
//     },
// };

// // Responsive styles
// const responsiveStyles = `
//     @media (max-width: 768px) {
//         .services-grid {
//             grid-template-columns: 1fr !important;
//         }
        
//         .header {
//             flex-direction: column !important;
//         }
        
//         .stats-card {
//             width: 100% !important;
//         }
        
//         .search-section {
//             flex-direction: column !important;
//         }
        
//         .filter-btn {
//             width: 100% !important;
//         }
        
//         .form-container {
//             margin: 0 !important;
//             max-height: 100vh !important;
//             border-radius: 0 !important;
//         }
        
//         .support-card {
//             flex-direction: column !important;
//             text-align: center !important;
//         }
//     }
// `;

// // Inject responsive styles
// const styleSheet = document.createElement("style");
// styleSheet.textContent = responsiveStyles;
// document.head.appendChild(styleSheet);

// export default Services;



import { useState, useEffect } from "react";
import {
    FaBook,
    FaCreditCard,
    FaShieldAlt,
    FaQuestionCircle,
    FaArrowRight,
    FaCheckCircle,
    FaExclamationTriangle,
    FaFileInvoiceDollar,
    FaHistory,
    FaClock,
    FaChevronRight,
    FaSearch,
    FaFilter,
    FaRegCreditCard,
    FaLock,
    FaMobileAlt,
    FaWallet,
    FaUniversity,
    FaExchangeAlt,
    FaPercent,
    FaPlus,
    FaMinus,
    FaPen,
    FaFileAlt,
    FaDownload,
    FaPrint,
    FaShare
} from "react-icons/fa";
import API from "../../api";
import { useSnackbar } from "../../Context/SnackbarContext";

const Services = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [showServiceForm, setShowServiceForm] = useState(null);
    const [appliedServices, setAppliedServices] = useState([]);

    // Sample active requests
    const [activeRequests] = useState([
        {
            id: "REQ001",
            service: "Cheque Book",
            status: "Processing",
            appliedDate: "25 Mar 2026",
            estimatedDate: "28 Mar 2026",
            reference: "CHQ-2026-12345"
        },
        {
            id: "REQ002",
            service: "Credit Card Limit Increase",
            status: "Under Review",
            appliedDate: "23 Mar 2026",
            estimatedDate: "30 Mar 2026",
            reference: "CCL-2026-67890"
        }
    ]);

    const serviceCategories = [
        { id: "all", name: "All Services", icon: FaFileAlt },
        { id: "cheque", name: "Cheque Services", icon: FaBook },
        { id: "card", name: "Card Services", icon: FaCreditCard },
        { id: "security", name: "Security & Fraud", icon: FaShieldAlt },
        { id: "queries", name: "Queries & Support", icon: FaQuestionCircle }
    ];

    const services = [
        // Cheque Services
        {
            id: "cheque-book",
            category: "cheque",
            title: "Cheque Book Request",
            description: "Request a new cheque book for your savings or current account",
            icon: FaBook,
            color: "#3b82f6",
            bgColor: "#eff6ff",
            processingTime: "2-3 business days",
            fee: "Free",
            eligibility: "All account holders",
            documents: [] // Empty array - no documents required
        },
        {
            id: "credit-limit",
            category: "card",
            title: "Increase Credit Card Limit",
            description: "Request for enhancement of your credit card limit",
            icon: FaPercent,
            color: "#8b5cf6",
            bgColor: "#f3e8ff",
            processingTime: "24-48 hours",
            fee: "Free",
            eligibility: "Card active for 6+ months"
        },
        {
            id: "stolen-card",
            category: "card",
            title: "Report Stolen/Lost Card",
            description: "Immediate blocking of lost or stolen debit/credit card",
            icon: FaShieldAlt,
            color: "#ef4444",
            bgColor: "#fee2e2",
            processingTime: "Immediate",
            fee: "₹100 (Replacement fee)"
        },

        // Queries & Support
        {
            id: "general-query",
            category: "queries",
            title: "General Query",
            description: "Ask questions about banking products and services",
            icon: FaQuestionCircle,
            color: "#64748b",
            bgColor: "#f1f5f9",
            processingTime: "24 hours",
            fee: "Free"
        },
    ];

    const filteredServices = services.filter(service => {
        const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
        const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "Processing": return "#3b82f6";
            case "Under Review": return "#f59e0b";
            case "Completed": return "#10b981";
            default: return "#64748b";
        }
    };

    const ServiceForm = ({ service, onClose }) => {
        const { showSnackbar } = useSnackbar();
        const [formData, setFormData] = useState({
            accountNumber: "",
            reason: "",
            urgent: false,
            deliveryAddress: "Registered Address",
            agreeTerms: false,
            noOfLeaves: "",
            dateLost: "",
            selectedCardNumber: "",
            requestedLimit: ""
        });

        const [accounts, setAccounts] = useState([]);
        const [cards, setCards] = useState([]);
        const [submitting, setSubmitting] = useState(false);

        // Load accounts from localStorage
        useEffect(() => {
            const accs = [];
            const savings = localStorage.getItem("savingsAccount");
            const current = localStorage.getItem("currentAccount");

            if (savings) accs.push({ type: "Savings", number: savings });
            if (current) accs.push({ type: "Current", number: current });

            setAccounts(accs);
            if (accs.length > 0) {
                setFormData(prev => ({ ...prev, accountNumber: accs[0].number }));
            }
        }, []);

        // Fetch cards for all accounts
        useEffect(() => {
            const fetchAllCards = async () => {
                if (accounts.length === 0) return;

                let allCards = [];
                for (const acc of accounts) {
                    try {
                        const response = await API.get(`account/userCardList/${acc.number}`);
                        if (response.data && response.data.status && Array.isArray(response.data.data)) {
                            const accCards = response.data.data.map(card => ({
                                ...card,
                                accountNumber: acc.number, // Link card to account
                                display: `${card.cardTypeName || "Card"} - ${String(card.cardNumber).slice(-4)}`
                            }));
                            allCards = [...allCards, ...accCards];
                        }
                    } catch (error) {
                        console.error(`Error fetching cards for account ${acc.number}:`, error);
                    }
                }
                setCards(allCards);
            };

            fetchAllCards();
        }, [accounts]);

        const handleSubmit = async () => {
            if (service.id === "cheque-book") {
                setSubmitting(true);
                try {
                    const payload = {
                        noOfLeaves: Number(formData.noOfLeaves),
                        accountNumber: Number(formData.accountNumber)
                    };
                    console.log("Sending Cheque Request:", payload);
                    const response = await API.post("chequeRequest/save", payload);
                    console.log("Cheque Request Response:", response.data);

                    showSnackbar("success", "Cheque Book Requested Successfully!");

                    setAppliedServices([...appliedServices, {
                        ...service,
                        id: Math.random().toString(),
                        status: "Processing",
                        date: new Date().toLocaleDateString()
                    }]);
                    onClose();
                } catch (error) {
                    console.error("Error requesting cheque book:", error);
                    showSnackbar("error", "Failed to request cheque book. Please try again.");
                } finally {
                    setSubmitting(false);
                }

            } else if (service.id === "general-query") {
                setSubmitting(true);
                try {
                    const payload = {
                        customerQuery: formData.queries,
                        accountNumber: Number(formData.accountNumber)
                    };
                    console.log("Sending Query Request:", payload);
                    const response = await API.post("queriesResponse/save", payload);
                    console.log("Query Request Response:", response.data);

                    showSnackbar("success", "Query Submitted Successfully!");

                    setAppliedServices([...appliedServices, {
                        ...service,
                        id: Math.random().toString(),
                        status: "Received",
                        date: new Date().toLocaleDateString()
                    }]);
                    onClose();
                } catch (error) {
                    console.error("Error submitting query:", error);
                    showSnackbar("error", "Failed to submit query. Please try again.");
                } finally {
                    setSubmitting(false);
                }
            } else if (service.id === "stolen-card") {
                setSubmitting(true);
                try {
                    // Find the full card object to get the account number
                    const selectedCard = cards.find(c => String(c.cardNumber) === String(formData.selectedCardNumber));

                    if (!selectedCard) {
                        showSnackbar("error", "Please select a valid card.");
                        setSubmitting(false);
                        return;
                    }

                    const payload = {
                        lostCardStolenDate: formData.dateLost,
                        lostCardNumber: Number(formData.selectedCardNumber),
                        accountNumber: Number(selectedCard.accountNumber)
                    };
                    console.log("Sending Lost Card Report:", payload);
                    const response = await API.post("lostCard/save", payload);
                    console.log("Lost Card Response:", response.data);

                    showSnackbar("success", "Card Reported Lost Successfully!");

                    setAppliedServices([...appliedServices, {
                        ...service,
                        id: Math.random().toString(),
                        status: "Blocked",
                        date: new Date().toLocaleDateString()
                    }]);
                    onClose();
                } catch (error) {
                    console.error("Error reporting lost card:", error);
                    showSnackbar("error", "Failed to report lost card. Please try again.");
                } finally {
                    setSubmitting(false);
                }

            } else if (service.id === "credit-limit") {
                setSubmitting(true);
                try {
                    // Find the full card object to get the account number
                    const selectedCard = cards.find(c => String(c.cardNumber) === String(formData.selectedCardNumber));

                    if (!selectedCard) {
                        showSnackbar("error", "Please select a valid card.");
                        setSubmitting(false);
                        return;
                    }

                    const payload = {
                        requestedLimit: Number(formData.requestedLimit),
                        accountNumber: Number(selectedCard.accountNumber)
                    };
                    console.log("Sending Credit Limit Request:", payload);
                    const response = await API.post("creditLimit/save", payload);
                    console.log("Credit Limit Response:", response.data);

                    showSnackbar("success", "Credit Limit Increase Requested Successfully!");

                    setAppliedServices([...appliedServices, {
                        ...service,
                        id: Math.random().toString(),
                        status: "Under Review",
                        date: new Date().toLocaleDateString()
                    }]);
                    onClose();
                } catch (error) {
                    console.error("Error requesting credit limit:", error);
                    showSnackbar("error", "Failed to request credit limit. Please try again.");
                } finally {
                    setSubmitting(false);
                }
            } else {
                // Mock submission for other services
                setAppliedServices([...appliedServices, { ...service, id: Math.random().toString() }]);
                onClose();
                showSnackbar("success", "Service requested successfully (Mock)");
            }
        };

        return (
            <div style={styles.formOverlay}>
                <div style={styles.formContainer}>
                    <div style={styles.formHeader}>
                        <div style={{ ...styles.formIcon, backgroundColor: service.bgColor, color: service.color }}>
                            <service.icon size={24} />
                        </div>
                        <div style={styles.formTitleSection}>
                            <h3 style={styles.formTitle}>{service.title}</h3>
                            <p style={styles.formSubtitle}>{service.description}</p>
                        </div>
                        <button style={styles.formClose} onClick={onClose}>×</button>
                    </div>

                    <div style={styles.formContent}>
                        <div style={styles.formInfoBar}>
                            <div style={styles.formInfoItem}>
                                <span style={styles.formInfoLabel}>Processing Time</span>
                                <span style={styles.formInfoValue}>{service.processingTime}</span>
                            </div>
                            <div style={styles.formInfoItem}>
                                <span style={styles.formInfoLabel}>Fee</span>
                                <span style={styles.formInfoValue}>{service.fee}</span>
                            </div>
                        </div>

                        {service.id === "cheque-book" && (
                            <>
                                <div style={styles.formGroup}>
                                    <label style={styles.formLabel}>Select Account</label>
                                    <select
                                        style={styles.formSelect}
                                        value={formData.accountNumber}
                                        onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                                    >
                                        {accounts.map(acc => (
                                            <option key={acc.number} value={acc.number}>
                                                {acc.type} Account - {acc.number}
                                            </option>
                                        ))}
                                        {accounts.length === 0 && <option value="">No accounts found</option>}
                                    </select>
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.formLabel}>Number of Leaves</label>
                                    <select
                                        style={styles.formSelect}
                                        value={formData.noOfLeaves}
                                        onChange={(e) => setFormData({ ...formData, noOfLeaves: e.target.value })}
                                        required
                                    >
                                        <option value="">Select number of leaves</option>
                                        <option value="0">20 Leaves</option>
                                        <option value="50">50 Leaves</option>
                                        <option value="100">100 Leaves</option>
                                    </select>
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.formLabel}>Queries (Optional)</label>
                                    <textarea
                                        style={styles.formTextarea}
                                        value={formData.queries || ""}
                                        onChange={(e) => setFormData({ ...formData, queries: e.target.value })}
                                        placeholder="Any specific queries?"
                                        rows="2"
                                    />
                                </div>
                            </>
                        )}

                        {service.id === "credit-limit" && (
                            <>
                                <div style={styles.formGroup}>
                                    <label style={styles.formLabel}>Select Card</label>
                                    <select
                                        style={styles.formSelect}
                                        value={formData.selectedCardNumber}
                                        onChange={(e) => setFormData({ ...formData, selectedCardNumber: e.target.value })}
                                    >
                                        <option value="">Select a card</option>
                                        {cards.map(card => (
                                            <option key={card.cardNumber} value={card.cardNumber}>
                                                {card.cardTypeName || "Card"} - {String(card.cardNumber).slice(-4)}
                                            </option>
                                        ))}
                                        {cards.length === 0 && <option value="" disabled>No cards found</option>}
                                    </select>
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.formLabel}>Requested New Limit</label>
                                    <div style={styles.formInputGroup}>
                                        <span style={styles.formCurrency}>₹</span>
                                        <input
                                            type="number"
                                            style={styles.formInput}
                                            value={formData.requestedLimit}
                                            onChange={(e) => setFormData({ ...formData, requestedLimit: e.target.value })}
                                            placeholder="Enter desired limit"
                                            min="0"
                                        />
                                    </div>
                                    <span style={styles.formHint}>Maximum limit: ₹10,00,000</span>
                                </div>
                            </>
                        )}

                        {service.id === "stolen-card" && (
                            <>
                                <div style={styles.formGroup}>
                                    <label style={styles.formLabel}>Select Lost Card</label>
                                    <select
                                        style={styles.formSelect}
                                        value={formData.selectedCardNumber}
                                        onChange={(e) => setFormData({ ...formData, selectedCardNumber: e.target.value })}
                                    >
                                        <option value="">Select a card</option>
                                        {cards.map(card => (
                                            <option key={card.cardNumber} value={card.cardNumber}>
                                                {card.cardTypeName || "Card"} - {String(card.cardNumber).slice(-4)}
                                            </option>
                                        ))}
                                        {cards.length === 0 && <option value="" disabled>No cards found</option>}
                                    </select>
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.formLabel}>Date Lost</label>
                                    <input
                                        type="date"
                                        style={styles.formInput}
                                        value={formData.dateLost}
                                        onChange={(e) => setFormData({ ...formData, dateLost: e.target.value })}
                                        max={new Date().toISOString().split("T")[0]}
                                    />
                                </div>
                            </>
                        )}

                        {service.id === "general-query" && (
                            <>
                                <div style={styles.formGroup}>
                                    <label style={styles.formLabel}>Select Account</label>
                                    <select
                                        style={styles.formSelect}
                                        value={formData.accountNumber}
                                        onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                                    >
                                        {accounts.map(acc => (
                                            <option key={acc.number} value={acc.number}>
                                                {acc.type} Account - {acc.number}
                                            </option>
                                        ))}
                                        {accounts.length === 0 && <option value="">No accounts found</option>}
                                    </select>
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.formLabel}>Your Query</label>
                                    <textarea
                                        style={styles.formTextarea}
                                        value={formData.queries || ""}
                                        onChange={(e) => setFormData({ ...formData, queries: e.target.value })}
                                        placeholder="Type your question here..."
                                        rows="4"
                                    />
                                </div>
                            </>
                        )}

                        <div style={styles.formGroup}>
                            <label style={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    style={styles.checkbox}
                                    checked={formData.agreeTerms}
                                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                                />
                                I confirm that the information provided is correct and I agree to the terms and conditions
                            </label>
                        </div>
                    </div>

                    <div style={styles.formFooter}>
                        <button style={styles.cancelBtn} onClick={onClose}>Cancel</button>
                        <button
                            style={{
                                ...styles.submitBtn,
                                opacity: (formData.agreeTerms && !submitting &&
                                    (service.id !== "cheque-book" || formData.noOfLeaves) &&
                                    (service.id !== "general-query" || formData.queries) &&
                                    (service.id !== "stolen-card" || formData.selectedCardNumber) &&
                                    (service.id !== "credit-limit" || (formData.selectedCardNumber && formData.requestedLimit))
                                ) ? 1 : 0.5,
                                cursor: (formData.agreeTerms && !submitting &&
                                    (service.id !== "cheque-book" || formData.noOfLeaves) &&
                                    (service.id !== "general-query" || formData.queries) &&
                                    (service.id !== "stolen-card" || formData.selectedCardNumber) &&
                                    (service.id !== "credit-limit" || (formData.selectedCardNumber && formData.requestedLimit))
                                ) ? 'pointer' : 'not-allowed'
                            }}
                            disabled={
                                !formData.agreeTerms ||
                                submitting ||
                                (service.id === "cheque-book" && !formData.noOfLeaves) ||
                                (service.id === "general-query" && !formData.queries) ||
                                (service.id === "stolen-card" && !formData.selectedCardNumber) ||
                                (service.id === "credit-limit" && (!formData.selectedCardNumber || !formData.requestedLimit))
                            }
                            onClick={handleSubmit}
                        >
                            {submitting ? "Submitting..." : "Submit Request"}
                            {!submitting && <FaArrowRight style={{ marginLeft: '8px' }} size={14} />}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div style={styles.container}>
            {/* Page Header - Simplified */}
            <div style={styles.header}>
                <h1 style={styles.title}>Services</h1>
                <p style={styles.subtitle}>
                    Manage all your banking service requests from one place
                </p>
            </div>

            {/* Services Grid - 2x2 Layout - Scrollable */}
            <div style={styles.servicesGrid}>
                {filteredServices.map((service) => (
                    <div key={service.id} style={styles.serviceCard}>
                        <div style={styles.serviceIconWrapper}>
                            <div style={{
                                ...styles.serviceIcon,
                                backgroundColor: service.bgColor,
                                color: service.color
                            }}>
                                <service.icon size={22} />
                            </div>
                            <div style={styles.serviceCategory}>
                                {serviceCategories.find(cat => cat.id === service.category)?.name}
                            </div>
                        </div>

                        <div style={styles.serviceContent}>
                            <h3 style={styles.serviceTitle}>{service.title}</h3>
                            <p style={styles.serviceDescription}>{service.description}</p>

                            <div style={styles.serviceMeta}>
                                <div style={styles.metaItem}>
                                    <FaClock size={11} color="#64748b" />
                                    <span style={styles.metaText}>{service.processingTime}</span>
                                </div>
                            </div>

                            {service.documents && service.documents.length > 0 && (
                                <div style={styles.documents}>
                                    <span style={styles.documentsLabel}>Required:</span>
                                    {service.documents.map((doc, idx) => (
                                        <span key={idx} style={styles.documentTag}>{doc}</span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            style={styles.applyBtn}
                            onClick={() => setShowServiceForm(service)}
                        >
                            <span>Apply Now</span>
                            <FaChevronRight size={11} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Service Form Modal */}
            {showServiceForm && (
                <ServiceForm
                    service={showServiceForm}
                    onClose={() => setShowServiceForm(null)}
                />
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: "24px",
        maxWidth: "1100px",
        margin: "0 auto",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        backgroundColor: "var(--bg-primary)",
        minHeight: "100vh",
        overflowY: "auto", // Enable vertical scrolling
    },
    header: {
        marginBottom: "20px",
    },
    title: {
        fontSize: "28px",
        fontWeight: "700",
        color: "var(--text-primary)",
        margin: "0 0 4px 0",
        letterSpacing: "-0.02em",
    },
    subtitle: {
        fontSize: "14px",
        color: "var(--text-muted)",
        margin: 0,
    },
    servicesGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "16px",
    },
    serviceCard: {
        position: "relative",
        background: "var(--surface)",
        borderRadius: "16px",
        padding: "18px",
        border: "1px solid var(--border)",
        transition: "all 0.2s ease",
        display: "flex",
        flexDirection: "column",
        boxShadow: "var(--shadow-sm)",
        height: "fit-content",
        ':hover': {
            transform: "translateY(-2px)",
            boxShadow: "var(--shadow)",
            borderColor: "var(--primary)",
        }
    },
    serviceIconWrapper: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "12px",
    },
    serviceIcon: {
        width: "48px",
        height: "48px",
        borderRadius: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    serviceCategory: {
        fontSize: "12px",
        color: "var(--text-secondary)",
        fontWeight: "500",
        padding: "4px 10px",
        background: "var(--bg-primary)",
        borderRadius: "20px",
        border: "1px solid var(--border)",
    },
    serviceContent: {
        flex: 1,
    },
    serviceTitle: {
        fontSize: "16px",
        fontWeight: "600",
        color: "var(--text-primary)",
        margin: "0 0 6px 0",
    },
    serviceDescription: {
        fontSize: "13px",
        color: "var(--text-muted)",
        lineHeight: "1.4",
        margin: "0 0 12px 0",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
    },
    serviceMeta: {
        display: "flex",
        gap: "12px",
        marginBottom: "12px",
    },
    metaItem: {
        display: "flex",
        alignItems: "center",
        gap: "5px",
        fontSize: "12px",
        color: "var(--text-secondary)",
    },
    metaText: {
        fontSize: "12px",
        fontWeight: "500",
    },
    documents: {
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "6px",
        marginBottom: "16px",
    },
    documentsLabel: {
        fontSize: "11px",
        color: "var(--text-muted)",
    },
    documentTag: {
        padding: "3px 8px",
        background: "var(--bg-primary)",
        borderRadius: "20px",
        fontSize: "10px",
        fontWeight: "500",
        color: "var(--text-secondary)",
        border: "1px solid var(--border)",
    },
    applyBtn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "10px 16px",
        background: "linear-gradient(135deg, var(--primary), #1e40af)",
        border: "none",
        borderRadius: "10px",
        color: "#ffffff",
        fontSize: "13px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.2s",
        marginTop: "auto",
        boxShadow: "0 2px 4px -1px rgba(37, 99, 235, 0.2)",
        ':hover': {
            transform: "translateY(-1px)",
            boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.3)",
        }
    },
    // Form Styles
    formOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "20px",
    },
    formContainer: {
        width: "100%",
        maxWidth: "600px",
        maxHeight: "90vh",
        overflowY: "auto",
        background: "#ffffff",
        borderRadius: "24px",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
    },
    formHeader: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "20px 24px",
        borderBottom: "1px solid #e2e8f0",
        position: "relative",
    },
    formIcon: {
        width: "48px",
        height: "48px",
        borderRadius: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    formTitleSection: {
        flex: 1,
    },
    formTitle: {
        fontSize: "18px",
        fontWeight: "700",
        color: "#0f172a",
        margin: "0 0 2px 0",
    },
    formSubtitle: {
        fontSize: "13px",
        color: "#64748b",
        margin: 0,
    },
    formClose: {
        position: "absolute",
        top: "20px",
        right: "20px",
        width: "32px",
        height: "32px",
        borderRadius: "8px",
        border: "1px solid #e2e8f0",
        background: "#ffffff",
        fontSize: "20px",
        color: "#64748b",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
    },
    formContent: {
        padding: "20px 24px",
    },
    formInfoBar: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "12px 16px",
        background: "#f8fafc",
        borderRadius: "10px",
        marginBottom: "20px",
        flexWrap: "wrap",
    },
    formInfoItem: {
        display: "flex",
        flexDirection: "column",
        gap: "2px",
    },
    formInfoLabel: {
        fontSize: "10px",
        color: "#64748b",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
    },
    formInfoValue: {
        fontSize: "13px",
        fontWeight: "600",
        color: "#0f172a",
    },
    formGroup: {
        marginBottom: "16px",
    },
    formLabel: {
        display: "block",
        fontSize: "13px",
        fontWeight: "600",
        color: "#0f172a",
        marginBottom: "6px",
    },
    formInput: {
        width: "100%",
        padding: "10px 14px",
        border: "1px solid #e2e8f0",
        borderRadius: "10px",
        fontSize: "14px",
        color: "#0f172a",
        background: "#ffffff",
    },
    formInputGroup: {
        position: "relative",
        display: "flex",
        alignItems: "center",
    },
    formCurrency: {
        position: "absolute",
        left: "14px",
        color: "#64748b",
        fontWeight: "500",
        fontSize: "14px",
    },
    formSelect: {
        width: "100%",
        padding: "10px 14px",
        border: "1px solid #e2e8f0",
        borderRadius: "10px",
        fontSize: "14px",
        color: "#0f172a",
        background: "#ffffff",
    },
    formTextarea: {
        width: "100%",
        padding: "10px 14px",
        border: "1px solid #e2e8f0",
        borderRadius: "10px",
        fontSize: "14px",
        color: "#0f172a",
        background: "#ffffff",
        resize: "vertical",
    },
    formHint: {
        display: "block",
        fontSize: "11px",
        color: "#64748b",
        marginTop: "4px",
    },
    checkboxLabel: {
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        fontSize: "13px",
        color: "#475569",
        lineHeight: "1.4",
    },
    checkbox: {
        marginTop: "2px",
    },
    formFooter: {
        display: "flex",
        gap: "12px",
        padding: "16px 24px",
        borderTop: "1px solid #e2e8f0",
    },
    cancelBtn: {
        flex: 1,
        padding: "12px",
        background: "#f1f5f9",
        border: "1px solid #e2e8f0",
        borderRadius: "10px",
        color: "#475569",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
    },
    submitBtn: {
        flex: 2,
        padding: "12px",
        background: "linear-gradient(135deg, #4361ee, #3a0ca3)",
        border: "none",
        borderRadius: "10px",
        color: "#ffffff",
        fontSize: "14px",
        fontWeight: "600",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
    },
};

// Responsive styles
const responsiveStyles = `
    @media (max-width: 768px) {
        .services-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
        }
        
        .container {
            padding: 16px !important;
        }
        
        .form-container {
            margin: 0 !important;
            max-height: 100vh !important;
            border-radius: 0 !important;
        }
    }
`;

// Inject responsive styles
const styleSheet = document.createElement("style");
styleSheet.textContent = responsiveStyles;
document.head.appendChild(styleSheet);

export default Services;