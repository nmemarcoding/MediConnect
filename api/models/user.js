const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    lastName: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 1,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    },
    userType: {
        type: String,
        enum: ['doctor', 'patient'],
        default: 'patient'
    },
    profileCreated: {
        type: Boolean,
        default: false
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PatientProfile',
        default: null
    },
    
}, { timestamps: true });



module.exports = mongoose.model('User', userSchema);
