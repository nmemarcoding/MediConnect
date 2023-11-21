const mongoose = require('mongoose');

const patientProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateOfBirth: {
        type: Date,
        default: Date.now
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'other'
    },
    contactNumber: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    medicalHistory: [{
        condition: { type: String, default: '' },
        diagnosisDate: { type: Date, default: Date.now },
        status: { type: String, default: '' }
    }],
    currentMedications: [{
        name: { type: String, default: '' },
        dosage: { type: String, default: '' },
        frequency: { type: String, default: '' }
    }],
    allergies: [{
        substance: { type: String, default: '' },
        reaction: { type: String, default: '' }
    }],
    emergencyContact: {
        name: { type: String, default: '' },
        relation: { type: String, default: '' },
        contactNumber: { type: String, default: '' }
    },
    profilePicture: {
        type: String, // URL to the image
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('PatientProfile', patientProfileSchema);
