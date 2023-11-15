const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DoctorProfile',
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PatientProfile',
        required: true
    },
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true
    },
    medications: [{
        name: String,
        dosage: String,
        frequency: String,
        duration: String // For example, '10 days', '1 month', etc.
    }],
    instructions: {
        type: String,
        default: ''
    },
    issueDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);
