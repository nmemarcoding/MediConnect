const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    notificationType: {
        type: String,
        enum: ['appointmentReminder', 'prescriptionReminder', 'generalUpdate', 'messageAlert'],
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    notificationDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
