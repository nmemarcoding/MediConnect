const mongoose = require('mongoose');

const consultationNotesSchema = new mongoose.Schema({
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true
    },
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
    notes: {
        type: String,
        required: true
    },
    diagnosis: {
        type: String,
        default: ''
    },
    treatmentPlan: {
        type: String,
        default: ''
    },
    followUpInstructions: {
        type: String,
        default: ''
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('ConsultationNotes', consultationNotesSchema);
