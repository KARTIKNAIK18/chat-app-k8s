import SignupForm from "../components/SignupForm";
import styles from "../styles/SignupPage.module.css";

function SignupPage() {
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h2>Create a New Account</h2>
                <SignupForm />
            </div>
        </div>
    );
}

export default SignupPage;
