const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messageContent: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    isRead: {
        type: Boolean,
        default: false
    },
    attachments: [{
        fileName: String,
        fileUrl: String, // URL to the attachment
        fileType: String // e.g., 'image', 'pdf', 'text'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
