const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PatientProfile',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DoctorProfile',
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String, // could be in HH:mm format
        required: true
    },
    consultationType: {
        type: String,
        enum: ['video', 'audio', 'chat'],
        required: true
    },
    appointmentStatus: {
        type: String,
        enum: ['booked', 'completed', 'cancelled', 'rescheduled'],
        default: 'booked'
    },
    notes: {
        type: String,
        default: ''
    },
    prescription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prescription',
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
