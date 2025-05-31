import styles from "../styles/LoginForm.module.css";

function SocialLogin() {
    return (
        <button className={styles.googleButton}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Logo" />
            Continue with Google
        </button>
    );
}

export default SocialLogin;
