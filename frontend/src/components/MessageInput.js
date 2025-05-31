import { useState } from "react";
import styles from "../styles/ChatWindow.module.css";

function MessageInput({ socket }) {
    const [input, setInput] = useState("");

    const sendMessage = () => {
        const username = localStorage.getItem("username") || "User"; // Use stored username
        socket.emit("message", { username, content: input }); // Attach username
        setInput("");
    };

    return (
        <div className={styles.inputContainer}>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default MessageInput;
