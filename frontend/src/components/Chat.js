import { useState, useEffect } from "react";
import socket from "../socket";
import styles from "../styles/Chat.module.css";

function Chat({ currentUser }) {
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);
    const [input, setInput] = useState("");
    const [typingUser, setTypingUser] = useState(null);

    useEffect(() => {
        socket.emit("register", currentUser);

        const handleUserList = (userList) => {
            setUsers(userList.filter(user => user !== currentUser)); // Exclude self
        };

        const handleMessage = ({ sender, message }) => {
            setMessages((prev) => ({
                ...prev,
                [sender]: [...(prev[sender] || []), { sender, message }]
            }));
        };

        const handleTyping = ({ sender }) => {
            setTypingUser(sender);
            setTimeout(() => setTypingUser(null), 2000); // Remove after 2 sec
        };

        socket.on("userList", handleUserList);
        socket.on("message", handleMessage);
        socket.on("typing", handleTyping);

        return () => {
            socket.off("userList", handleUserList);
            socket.off("message", handleMessage);
            socket.off("typing", handleTyping);
        };
    }, [currentUser]);

    useEffect(() => {
        if (selectedUser && input.trim()) {
            socket.emit("typing", { sender: currentUser, recipient: selectedUser });
        }
    }, [input, selectedUser, currentUser]);

    const sendMessage = () => {
        if (input.trim() && selectedUser) {
            socket.emit("message", { sender: currentUser, recipient: selectedUser, message: input });

            setMessages((prev) => ({
                ...prev,
                [selectedUser]: [...(prev[selectedUser] || []), { sender: currentUser, message: input }]
            }));

            setInput("");
        }
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.userList}>
                <h3>Online Users</h3>
                {users.length > 0 ? (
                    users.map((user) => (
                        <div key={user} className={styles.userItem} onClick={() => setSelectedUser(user)}>
                            {user}
                        </div>
                    ))
                ) : (
                    <p>No users online</p>
                )}
            </div>

            <div className={styles.chatBox}>
                <div className={styles.messageArea}>
                    {(messages[selectedUser] || []).map((msg, index) => (
                        <p key={index} className={msg.sender === currentUser ? styles.sent : styles.received}>
                            {msg.message}
                        </p>
                    ))}
                    {typingUser && selectedUser === typingUser && (
                        <p className={styles.typingIndicator}>{typingUser} is typing...</p>
                    )}
                </div>

                {selectedUser && (
                    <>
                        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
                        <button onClick={sendMessage}>Send</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Chat;
