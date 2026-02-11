import { useState } from "react";
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
            documents: ["None required"],
            popular: true
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
            eligibility: "Card active for 6+ months",
            popular: true
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
            fee: "₹100 (Replacement fee)",
            urgent: true
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
        switch(status) {
            case "Processing": return "#3b82f6";
            case "Under Review": return "#f59e0b";
            case "Completed": return "#10b981";
            default: return "#64748b";
        }
    };

    const ServiceForm = ({ service, onClose }) => {
        const [formData, setFormData] = useState({
            accountType: "savings",
            reason: "",
            urgent: false,
            deliveryAddress: "Registered Address",
            agreeTerms: false
        });

        return (
            <div style={styles.formOverlay}>
                <div style={styles.formContainer}>
                    <div style={styles.formHeader}>
                        <div style={{...styles.formIcon, backgroundColor: service.bgColor, color: service.color}}>
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
                            {service.urgent && (
                                <div style={styles.urgentBadge}>
                                    <FaExclamationTriangle size={12} />
                                    Urgent Service
                                </div>
                            )}
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.formLabel}>Select Account</label>
                            <select 
                                style={styles.formSelect}
                                value={formData.accountType}
                                onChange={(e) => setFormData({...formData, accountType: e.target.value})}
                            >
                                <option value="savings">Savings Account (••••3456)</option>
                                <option value="current">Current Account (••••7890)</option>
                                <option value="salary">Salary Account (••••2345)</option>
                            </select>
                        </div>

                        {service.id === "credit-limit" && (
                            <>
                                <div style={styles.formGroup}>
                                    <label style={styles.formLabel}>Current Credit Limit</label>
                                    <div style={styles.formInputGroup}>
                                        <span style={styles.formCurrency}>₹</span>
                                        <input 
                                            type="text" 
                                            style={styles.formInput} 
                                            value="3,00,000"
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.formLabel}>Requested Credit Limit</label>
                                    <div style={styles.formInputGroup}>
                                        <span style={styles.formCurrency}>₹</span>
                                        <input 
                                            type="text" 
                                            style={styles.formInput} 
                                            placeholder="Enter desired limit"
                                        />
                                    </div>
                                    <span style={styles.formHint}>Maximum limit: ₹10,00,000</span>
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.formLabel}>Reason for Limit Increase</label>
                                    <select style={styles.formSelect}>
                                        <option value="">Select reason</option>
                                        <option value="travel">International Travel</option>
                                        <option value="purchase">High Value Purchase</option>
                                        <option value="business">Business Expenses</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </>
                        )}

                        {service.id === "cheque-book" && (
                            <>
                                <div style={styles.formGroup}>
                                    <label style={styles.formLabel}>Cheque Book Type</label>
                                    <div style={styles.radioGroup}>
                                        <label style={styles.radioLabel}>
                                            <input type="radio" name="chequeType" defaultChecked /> Standard (25 leaves)
                                        </label>
                                        <label style={styles.radioLabel}>
                                            <input type="radio" name="chequeType" /> Standard (50 leaves)
                                        </label>
                                        <label style={styles.radioLabel}>
                                            <input type="radio" name="chequeType" /> Premium (100 leaves)
                                        </label>
                                    </div>
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.formLabel}>Delivery Address</label>
                                    <select style={styles.formSelect}>
                                        <option>Registered Office Address</option>
                                        <option>Residential Address</option>
                                        <option>Branch Pickup</option>
                                    </select>
                                </div>
                            </>
                        )}

                        {service.id === "stolen-card" && (
                            <>
                                <div style={styles.formGroup}>
                                    <label style={styles.formLabel}>Card Type</label>
                                    <select style={styles.formSelect}>
                                        <option value="">Select card</option>
                                        <option value="debit">Debit Card (••••4567)</option>
                                        <option value="credit">Credit Card (••••8901)</option>
                                        <option value="business">Business Card (••••2345)</option>
                                    </select>
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.formLabel}>Last Transaction Amount</label>
                                    <input 
                                        type="text" 
                                        style={styles.formInput} 
                                        placeholder="Enter last transaction amount if known"
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.formLabel}>Additional Comments</label>
                                    <textarea 
                                        style={styles.formTextarea}
                                        placeholder="Please provide details of when and where the card was lost/stolen"
                                        rows="3"
                                    />
                                </div>
                            </>
                        )}

                        {service.id === "general-query" && (
                            <div style={styles.formGroup}>
                                <label style={styles.formLabel}>Your Query</label>
                                <textarea 
                                    style={styles.formTextarea}
                                    placeholder="Type your question here..."
                                    rows="4"
                                />
                            </div>
                        )}

                        <div style={styles.formGroup}>
                            <label style={styles.checkboxLabel}>
                                <input 
                                    type="checkbox" 
                                    style={styles.checkbox}
                                    checked={formData.agreeTerms}
                                    onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
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
                                opacity: formData.agreeTerms ? 1 : 0.5,
                                cursor: formData.agreeTerms ? 'pointer' : 'not-allowed'
                            }}
                            disabled={!formData.agreeTerms}
                            onClick={() => {
                                setAppliedServices([...appliedServices, { ...service, id: Math.random().toString() }]);
                                onClose();
                            }}
                        >
                            Submit Request
                            <FaArrowRight style={{ marginLeft: '8px' }} size={14} />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div style={styles.container}>
            {/* Page Header */}
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <h1 style={styles.title}>Services</h1>
                    <p style={styles.subtitle}>
                        Manage all your banking service requests from one place
                    </p>
                </div>
                <div style={styles.statsCard}>
                    <div style={styles.statItem}>
                        <span style={styles.statLabel}>Active Requests</span>
                        <span style={styles.statValue}>{activeRequests.length}</span>
                    </div>
                    <div style={styles.statDivider} />
                    <div style={styles.statItem}>
                        <span style={styles.statLabel}>Services Available</span>
                        <span style={styles.statValue}>{services.length}</span>
                    </div>
                </div>
            </div>

            <div style={styles.servicesGrid}>
                {filteredServices.map((service) => (
                    <div key={service.id} style={styles.serviceCard}>
                        {service.popular && (
                            <span style={styles.popularBadge}>Most Popular</span>
                        )}
                        {service.urgent && (
                            <span style={styles.urgentBadgeCard}>Urgent</span>
                        )}
                        <div style={styles.serviceIconWrapper}>
                            <div style={{
                                ...styles.serviceIcon,
                                backgroundColor: service.bgColor,
                                color: service.color
                            }}>
                                <service.icon size={24} />
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
                                    <FaClock size={12} color="#64748b" />
                                    <span style={styles.metaText}>{service.processingTime}</span>
                                </div>
                                <div style={styles.metaItem}>
                                    <span style={styles.metaText}>{service.fee}</span>
                                </div>
                            </div>

                            {service.documents && (
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
                            <FaChevronRight size={12} />
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

            {/* Quick Support */}
            <div style={styles.supportSection}>
                <div style={styles.supportCard}>
                    <div style={styles.supportIcon}>
                        <FaQuestionCircle size={24} color="#4361ee" />
                    </div>
                    <div style={styles.supportContent}>
                        <h3 style={styles.supportTitle}>Need immediate assistance?</h3>
                        <p style={styles.supportText}>
                            Our customer support is available 24/7 for urgent requests
                        </p>
                    </div>
                    <button style={styles.supportBtn}>
                        Contact Support
                    </button>
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
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "32px",
        flexWrap: "wrap",
        gap: "20px",
    },
    headerLeft: {
        flex: 1,
    },
    title: {
        fontSize: "32px",
        fontWeight: "700",
        color: "#0f172a",
        margin: "0 0 8px 0",
        letterSpacing: "-0.02em",
    },
    subtitle: {
        fontSize: "16px",
        color: "#64748b",
        margin: 0,
    },
    statsCard: {
        display: "flex",
        alignItems: "center",
        gap: "24px",
        padding: "16px 24px",
        background: "#ffffff",
        borderRadius: "16px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
    },
    statItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    statLabel: {
        fontSize: "12px",
        color: "#64748b",
        marginBottom: "4px",
    },
    statValue: {
        fontSize: "24px",
        fontWeight: "700",
        color: "#0f172a",
    },
    statDivider: {
        width: "1px",
        height: "40px",
        background: "#e2e8f0",
    },
    activeRequests: {
        marginBottom: "40px",
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
    sectionTitleWrapper: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
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
    requestsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "16px",
    },
    requestCard: {
        padding: "20px",
        background: "#f8fafc",
        borderRadius: "16px",
        border: "1px solid #e2e8f0",
    },
    requestHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "12px",
    },
    requestRef: {
        fontSize: "12px",
        color: "#64748b",
        fontWeight: "500",
    },
    requestStatus: {
        fontSize: "11px",
        fontWeight: "600",
        padding: "4px 10px",
        borderRadius: "20px",
    },
    requestService: {
        fontSize: "16px",
        fontWeight: "600",
        color: "#0f172a",
        margin: "0 0 12px 0",
    },
    requestDetails: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        marginBottom: "12px",
    },
    requestDetail: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    requestDetailText: {
        fontSize: "13px",
        color: "#475569",
    },
    progressBar: {
        width: "100%",
        height: "4px",
        background: "#e2e8f0",
        borderRadius: "2px",
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        borderRadius: "2px",
    },
    categories: {
        display: "flex",
        gap: "12px",
        marginBottom: "24px",
        flexWrap: "wrap",
    },
    categoryBtn: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 20px",
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "40px",
        color: "#475569",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
        transition: "all 0.2s",
    },
    categoryBtnActive: {
        background: "#4361ee",
        color: "#ffffff",
        borderColor: "#4361ee",
    },
    searchSection: {
        display: "flex",
        gap: "12px",
        marginBottom: "32px",
    },
    searchContainer: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "0 20px",
        height: "50px",
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "14px",
        transition: "all 0.2s",
    },
    searchIcon: {
        flexShrink: 0,
    },
    searchInput: {
        flex: 1,
        border: "none",
        outline: "none",
        fontSize: "15px",
        color: "#0f172a",
        background: "transparent",
        padding: 0,
    },
    filterBtn: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "0 24px",
        height: "50px",
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "14px",
        color: "#475569",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
    },
    servicesGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
        gap: "24px",
        marginBottom: "40px",
    },
    serviceCard: {
        position: "relative",
        background: "#ffffff",
        borderRadius: "20px",
        padding: "24px",
        border: "1px solid #e2e8f0",
        transition: "all 0.2s",
        display: "flex",
        flexDirection: "column",
    },
    popularBadge: {
        position: "absolute",
        top: "20px",
        right: "24px",
        padding: "4px 12px",
        background: "#f59e0b",
        color: "#ffffff",
        fontSize: "11px",
        fontWeight: "600",
        borderRadius: "20px",
    },
    urgentBadgeCard: {
        position: "absolute",
        top: "20px",
        right: "24px",
        padding: "4px 12px",
        background: "#ef4444",
        color: "#ffffff",
        fontSize: "11px",
        fontWeight: "600",
        borderRadius: "20px",
    },
    serviceIconWrapper: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "16px",
    },
    serviceIcon: {
        width: "56px",
        height: "56px",
        borderRadius: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    serviceCategory: {
        fontSize: "13px",
        color: "#64748b",
        fontWeight: "500",
        padding: "4px 12px",
        background: "#f8fafc",
        borderRadius: "20px",
    },
    serviceContent: {
        flex: 1,
    },
    serviceTitle: {
        fontSize: "18px",
        fontWeight: "600",
        color: "#0f172a",
        margin: "0 0 8px 0",
    },
    serviceDescription: {
        fontSize: "14px",
        color: "#64748b",
        lineHeight: "1.5",
        margin: "0 0 16px 0",
    },
    serviceMeta: {
        display: "flex",
        gap: "16px",
        marginBottom: "16px",
    },
    metaItem: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "13px",
        color: "#475569",
    },
    metaText: {
        fontSize: "13px",
        fontWeight: "500",
    },
    documents: {
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "8px",
        marginBottom: "20px",
    },
    documentsLabel: {
        fontSize: "12px",
        color: "#64748b",
    },
    documentTag: {
        padding: "4px 10px",
        background: "#f1f5f9",
        borderRadius: "20px",
        fontSize: "11px",
        fontWeight: "500",
        color: "#475569",
    },
    applyBtn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "14px 20px",
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        color: "#0f172a",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.2s",
        marginTop: "auto",
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
        padding: "24px",
        borderBottom: "1px solid #e2e8f0",
        position: "relative",
    },
    formIcon: {
        width: "56px",
        height: "56px",
        borderRadius: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    formTitleSection: {
        flex: 1,
    },
    formTitle: {
        fontSize: "20px",
        fontWeight: "700",
        color: "#0f172a",
        margin: "0 0 4px 0",
    },
    formSubtitle: {
        fontSize: "14px",
        color: "#64748b",
        margin: 0,
    },
    formClose: {
        position: "absolute",
        top: "24px",
        right: "24px",
        width: "36px",
        height: "36px",
        borderRadius: "10px",
        border: "1px solid #e2e8f0",
        background: "#ffffff",
        fontSize: "24px",
        color: "#64748b",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
    },
    formContent: {
        padding: "24px",
    },
    formInfoBar: {
        display: "flex",
        alignItems: "center",
        gap: "20px",
        padding: "16px",
        background: "#f8fafc",
        borderRadius: "12px",
        marginBottom: "24px",
        flexWrap: "wrap",
    },
    formInfoItem: {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
    },
    formInfoLabel: {
        fontSize: "11px",
        color: "#64748b",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
    },
    formInfoValue: {
        fontSize: "14px",
        fontWeight: "600",
        color: "#0f172a",
    },
    urgentBadge: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px 12px",
        background: "#fee2e2",
        color: "#ef4444",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
    },
    formGroup: {
        marginBottom: "20px",
    },
    formLabel: {
        display: "block",
        fontSize: "14px",
        fontWeight: "600",
        color: "#0f172a",
        marginBottom: "8px",
    },
    formInput: {
        width: "100%",
        padding: "12px 16px",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        fontSize: "15px",
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
        left: "16px",
        color: "#64748b",
        fontWeight: "500",
    },
    formSelect: {
        width: "100%",
        padding: "12px 16px",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        fontSize: "15px",
        color: "#0f172a",
        background: "#ffffff",
    },
    formTextarea: {
        width: "100%",
        padding: "12px 16px",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        fontSize: "15px",
        color: "#0f172a",
        background: "#ffffff",
        resize: "vertical",
    },
    formHint: {
        display: "block",
        fontSize: "12px",
        color: "#64748b",
        marginTop: "6px",
    },
    radioGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },
    radioLabel: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "15px",
        color: "#0f172a",
    },
    checkboxLabel: {
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        fontSize: "14px",
        color: "#475569",
        lineHeight: "1.5",
    },
    checkbox: {
        marginTop: "2px",
    },
    formFooter: {
        display: "flex",
        gap: "12px",
        padding: "24px",
        borderTop: "1px solid #e2e8f0",
    },
    cancelBtn: {
        flex: 1,
        padding: "14px",
        background: "#f1f5f9",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        color: "#475569",
        fontSize: "15px",
        fontWeight: "600",
        cursor: "pointer",
    },
    submitBtn: {
        flex: 2,
        padding: "14px",
        background: "linear-gradient(135deg, #4361ee, #3a0ca3)",
        border: "none",
        borderRadius: "12px",
        color: "#ffffff",
        fontSize: "15px",
        fontWeight: "600",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
    },
    supportSection: {
        marginTop: "40px",
    },
    supportCard: {
        display: "flex",
        alignItems: "center",
        gap: "20px",
        padding: "24px",
        background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
        borderRadius: "20px",
        border: "1px solid #e2e8f0",
        flexWrap: "wrap",
    },
    supportIcon: {
        width: "56px",
        height: "56px",
        borderRadius: "16px",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    supportContent: {
        flex: 1,
    },
    supportTitle: {
        fontSize: "18px",
        fontWeight: "600",
        color: "#0f172a",
        margin: "0 0 4px 0",
    },
    supportText: {
        fontSize: "14px",
        color: "#64748b",
        margin: 0,
    },
    supportBtn: {
        padding: "14px 28px",
        background: "#4361ee",
        border: "none",
        borderRadius: "14px",
        color: "#ffffff",
        fontSize: "15px",
        fontWeight: "600",
        cursor: "pointer",
    },
};

// Responsive styles
const responsiveStyles = `
    @media (max-width: 768px) {
        .services-grid {
            grid-template-columns: 1fr !important;
        }
        
        .header {
            flex-direction: column !important;
        }
        
        .stats-card {
            width: 100% !important;
        }
        
        .search-section {
            flex-direction: column !important;
        }
        
        .filter-btn {
            width: 100% !important;
        }
        
        .form-container {
            margin: 0 !important;
            max-height: 100vh !important;
            border-radius: 0 !important;
        }
        
        .support-card {
            flex-direction: column !important;
            text-align: center !important;
        }
    }
`;

// Inject responsive styles
const styleSheet = document.createElement("style");
styleSheet.textContent = responsiveStyles;
document.head.appendChild(styleSheet);

export default Services;