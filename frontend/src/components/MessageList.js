import styles from "../styles/ChatWindow.module.css";

function MessageList({ messages }) {
    return (
        <div>
            {messages.map((msg, i) => (
                <p key={i}><strong>{msg.username}:</strong> {msg.content}</p> // Display username
            ))}
        </div>
    );
}

export default MessageList;
