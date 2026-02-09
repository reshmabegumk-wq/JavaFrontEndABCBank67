import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        // Later you can add validation / API call here
        navigate("/dashboard");
    };

    const handleReset = () => {
        // Optional: clear fields later using useState
        navigate("/");
    };

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h2>Login</h2>

            <input type="text" placeholder="Username" />
            <br /><br />

            <input type="password" placeholder="Password" />
            <br /><br />

            <button onClick={handleLogin}>Login</button>
            <button onClick={handleReset} style={{ marginLeft: "10px" }}>
                Reset
            </button>
        </div>
    );
};

export default Login;
