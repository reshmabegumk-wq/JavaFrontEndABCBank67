const DebitCard = () => {
    return (
        <div>
            <h1>Debit Card Service</h1>
            <p style={{ marginBottom: "20px", color: "#6b7280" }}>
                Apply for a new debit card or manage existing card services
            </p>

            <div style={cardStyle}>
                <div style={rowStyle}>
                    <span>Card Status</span>
                    <strong>Active</strong>
                </div>

                <div style={rowStyle}>
                    <span>Card Type</span>
                    <strong>Visa Platinum</strong>
                </div>

                <div style={rowStyle}>
                    <span>Daily Limit</span>
                    <strong>₹50,000</strong>
                </div>

                <div style={{ marginTop: "20px" }}>
                    <button>Request New Debit Card</button>
                    <button style={{ marginLeft: "10px", background: "#6b7280" }}>
                        Block Card
                    </button>
                </div>
            </div>
        </div>
    );
};

const cardStyle = {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    maxWidth: "600px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
};

const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #e5e7eb"
};

export default DebitCard;
