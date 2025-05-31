import LoginForm from "../components/LoginForm";
import styles from "../styles/LoginPage.module.css";

function LoginPage() {
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h2>Login to Your Account</h2>
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;
