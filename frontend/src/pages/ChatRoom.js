import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "../components/Chat";
import styles from "../styles/Chat.module.css";

function ChatRoom() {
    const navigate = useNavigate();
    const currentUser = localStorage.getItem("username");

    useEffect(() => {
        if (!currentUser) {
            navigate("/login"); // Redirect to login if no user is found
        }
    }, [currentUser, navigate]);

    

    return currentUser ? (
        <div className={styles.chatContainer}> 
            <Chat currentUser={currentUser} />
        </div>
    ) : null; // Prevent rendering until authentication is confirmed
}

export default ChatRoom;
