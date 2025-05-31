const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/chatdb";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

const userSchema = new mongoose.Schema({ username: String, password: String });
const User = mongoose.model("User", userSchema);

const activeUsers = new Map();
io.on("connection", (socket) => {
    console.log("✅ New client connected:", socket.id);

    socket.on("register", (username) => {
        if (username) {
            activeUsers.set(username, socket.id);
            console.log("Active Users:", [...activeUsers.keys()]);
            io.emit("userList", [...activeUsers.keys()]); // Show only online users
        }
    });

    socket.on("message", ({ sender, recipient, message }) => {
        const recipientSocketId = activeUsers.get(recipient);

        if (recipientSocketId) {
            io.to(recipientSocketId).emit("message", { sender, message });
            console.log(`📩 Message sent from ${sender} to ${recipient}: ${message}`);
        } else {
            console.log(`⚠️ ${recipient} is offline, message not delivered.`);
        }

        // Ensure sender sees their own message too
        socket.emit("message", { sender, message });
    });

    socket.on("disconnect", () => {
        const disconnectedUser = [...activeUsers.entries()].find(([username, id]) => id === socket.id)?.[0];

        if (disconnectedUser) {
            activeUsers.delete(disconnectedUser);
            io.emit("userList", [...activeUsers.keys()]); // Update sidebar in real-time
        }

        console.log(`❌ Client disconnected: ${socket.id}`);
    });
});

// 🔹 **Signup Route**
app.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(409).json({ success: false, message: "⚠️ Username already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });

    try {
        await newUser.save();
        res.json({ success: true, message: "✅ Signup successful!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "❌ Signup failed! Please try again." });
    }
});

// 🔹 **Login Route**
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(401).json({ success: false, message: "⚠️ User not found! Please sign up first." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ success: false, message: "⚠️ Incorrect password!" });
    }

    res.json({ success: true, user: user.username });
});

server.listen(5000, () => console.log("✅ Server running on port 5000"));
