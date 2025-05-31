import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/LoginPage.module.css";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

   const handleLogin = async () => {
    try {
        const response = await axios.post("http://localhost:5000/login", { username, password });
        if (response.data.success) {
            localStorage.setItem("username", username);
            navigate("/chat"); // Redirect upon successful login
        } else {
            setError(response.data.message || "⚠️ Login failed! Try again.");
        }
    } catch (err) {
        setError("⚠️ Server error! Try again.");
    }
};

    return (
        <div className={styles.formContainer}>
            {error && <p className={styles.error}>{error}</p>}
            
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />

            <div className={styles.passwordContainer}>
                <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button onClick={() => setShowPassword(!showPassword)} className={styles.toggleButton}>
                    {showPassword ? "🙈" : "👀"}
                </button>
            </div>

            <button onClick={handleLogin} className={styles.submitButton}>Login</button>

            <p>New user? <a href="/signup">Sign up here</a></p>
        </div>
    );
}

export default LoginForm;
