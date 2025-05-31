import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/SignupPage.module.css";

function SignupForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async () => {
    try {
        const response = await axios.post("http://localhost:5000/signup", { username, password });
        if (response.data.success) {
            localStorage.setItem("username", username); // Store username
            navigate("/chat"); // Redirect to chat immediately after signup
        }
    } catch (err) {
        setError(err.response?.data?.message || "⚠️ Signup failed! Try again.");
        setTimeout(() => setError(""), 3000);
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

            <div className={styles.passwordContainer}>
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                />
                <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className={styles.toggleButton}>
                    {showConfirmPassword ? "🙈" : "👀"}
                </button>
            </div>

            <button onClick={handleSignup} className={styles.submitButton}>Sign Up</button>

            <p>Already have an account? <a href="/">Login here</a></p>
        </div>
    );
}

export default SignupForm;
