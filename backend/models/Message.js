const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender: String,
    recipient: String,
    content: String,
    timestamp: { type: Date, default: Date.now }
});

messageSchema.index({ sender: 1, recipient: 1, timestamp: -1 });

module.exports = mongoose.model("Message", messageSchema);
