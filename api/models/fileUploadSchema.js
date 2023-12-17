const mongoose = require('mongoose');

const fileUploadSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    fileSize: {
        type: Number, // Size in bytes
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    expiryDate: {
        type: Date
    },
    accessPermissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

module.exports = mongoose.model('FileUpload', fileUploadSchema);
